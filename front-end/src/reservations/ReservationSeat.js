import React, {useState, useEffect} from "react"
import {useHistory} from "react-router-dom"

function ReservationSeat(){
const [newSeat, setNewSeat] = useState({})
const [newSeatError, setNewSeatError] = useState(null)
const [selectedTable, setNewSelectedTable] = useState(null)
const history = useHistory()
//make api for list tables
//handlesubmit
    const handleSubmit = async(event) => {
        event.preventDefault()
        const abortController = new AbortController();
        setNewSeatError(null)
        setNewSeat({ta})
    }

    const handleChange = (event) => {
        event.preventDefault()
        setNewSelectedTable(event.target.value)
    }

    const handleCancel = (event) => {
        event.preventDefault()
        history.goBack()
    }


    return(
        <>
    {tables && <form onSubmit= {handleSubmit}>
        <div class="form-group">
            <label htmlFor="table_id">Table Number:</label>
            <select className="form-control" name="table_id" id="table_id" onChange = {handleChange} value = {selectedTable} required>
             {tables.map((table, index) => {
                return <option name={table.table_id} id={table.table_id} key = {index} value={table.table_id}>
                    {table.table_name} - {table.capacity}</option>
                })}
            </select>
            <button class="btn btn-primary" type="submit" value="Submit">Submit</button>
            <button type="button" onClick={handleCancel} className="btn btn-dark"> Cancel </button>
        </div>
    </form>}
    </>
    )
}
export default ReservationSeat;