import React, {useState, useEffect} from "react"
import {useHistory, useParams} from "react-router-dom"
import ErrorAlert from "../layout/ErrorAlert"
import { listTables, updateTable } from "../utils/api"


function ReservationSeat(){

const [newSeatError, setNewSeatError] = useState(null)
const [selectedTable, setSelectedTable] = useState('')
const history = useHistory()
const [tablesError, setTablesError] = useState(null)
const [tables, setTables] = useState([])

const {reservation_id} = useParams()
console.log("reservationId", reservation_id)



useEffect(() => {
    const abortController = new AbortController();

    async function loadTables() {
      setTablesError(null);
      try {
        const data = await listTables(abortController.signal);
        setTables(data);
      } catch (error) {
        setTablesError(error);
      }
    }
    loadTables();
    return () => abortController.abort();
  }, []);

    const handleSubmit = async(event) => {
        event.preventDefault()
        const abortController = new AbortController();
        setNewSeatError(null)
        try{
            await updateTable(selectedTable, {"reservation_id": reservation_id}, abortController.signal)
            
        }catch(err){
            setNewSeatError(err)
            return;
        }
        history.push(`/dashboard`);
    }

    const handleChange = (event) => {
        event.preventDefault()
        console.log("selectedTable:", event.target.value)
        setSelectedTable(event.target.value)
    }

    const handleCancel = (event) => {
        event.preventDefault()
        history.goBack()
    }


    return(
        <>
        <ErrorAlert error={newSeatError} />
        <ErrorAlert error={tablesError}/>
    {tables && <form onSubmit= {handleSubmit}>
        <div className="form-group">
            <label htmlFor="table_id">Table Number:</label>
            <select className="form-control" name="table_id" id="table_id" onChange = {handleChange} value = {selectedTable} required>
             {tables.map((table, index) => {
                return <option name={table.table_id} id={table.table_id} key = {index} value={table.table_id}>
                    {table.table_name} - {table.capacity}</option>
                })}
            </select>
            <button class="btn btn-primary" type="submit" value="Submit" >Submit</button>
            <button type="button" onClick={handleCancel} className="btn btn-dark"> Cancel </button>
        </div>
    </form>}
    </>
    )
}
export default ReservationSeat;