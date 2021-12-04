import { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import {useHistory} from "react-router-dom"
import {createReservation} from "../utils/api"

function NewTables(){
    const [newTable, setNewTable] = useState({table_name: '', capacity: ''})
    const [newTableError, setNewTableError] = useState(null)
    const history = useHistory()


    const handleCapacityChange = (event) => {
        event.preventDefault()
       setNewTable({ 
           ...newTable,
           capacity: event.target.value
        }) 

    }

    const handleTableChange = (event) => {
        event.preventDefault()
        setNewTable({
            ...newTable,
            table_name: event.target.value
        })
    }

    const handleCancel = (event) => {
        event.preventDefault()
        history.goBack()
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const abortController = new AbortController();
        setNewTableError(null)
        try {
            await createReservation(newTable, abortController.signal);
          } catch (err) {
            setNewTableError(err)
            console.error(err)
            return;
          }
        history.push(`/dashboard`);
    }

    return (
        <>
            <ErrorAlert className ="alert alert-danger" error={newTableError} />
            <form onSubmit= {handleSubmit}>
                <div className="form-group">
                    <label htmlFor="table_name">Table Name</label>
                    <input type="text" onChange= {handleTableChange} className="form-control" id="table_name" name="table_name" value= {newTable.table_name} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Capacity</label>
                    <input type="number" onChange = {handleCapacityChange} className="form-control" id="capacity" name="capacity" value= {newTable?.capacity} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick = {handleCancel}>Cancel</button>
            </form>
        </>
    )
}
export default NewTables;