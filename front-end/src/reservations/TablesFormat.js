import React, {useState, useEffect} from "react"
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { finishTable } from "../utils/api";
import {useHistory} from "react-router-dom"
 
function TablesFormat(){   
    const [tablesError, setTablesError] = useState(null)
    const [deleteSeatError, setDeleteSeatError] = useState(null)
    const [tables, setTables] = useState([])
    const history = useHistory()

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

    const finishClickHandler = async(event) => {
        event.preventDefault()
        const abortController = new AbortController();
        const table = event.target.value
        console.log("table:", table)
        setDeleteSeatError(null)
        if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
        try{
            await finishTable(table, abortController.signal)
        } catch(err){
            setDeleteSeatError(err)
            return;
        }
        return history.go(0)
    }
    }

    return (
    <>
    <ErrorAlert error={tablesError} />
    <ErrorAlert error={deleteSeatError} />
        <div className="container-fluid">
            <h3 className = "text-primary">Seats</h3>
            {tables && tables.map((table, index) => {
                return (
                    <div key = {index} className= "row">
                        <div className = "col-4">
                            <h5>Table Name: {table.table_name}</h5>
                        </div>
                        <div className = "col-4">
                            <h6 data-table-id-status= {table.table_id}> Status: {table.reservation_id? "Occupied": "Free"} </h6>
                            </div>
                        <div className = "col-4">
                            {table.reservation_id && 
                            <button type="button" className="btn btn-primary" data-table-id-finish={table.table_id} 
                            value={table.table_id} onClick={finishClickHandler}>Finish</button>}
                        </div>
                    </div>
                )
            })}
    
        </div>
    </>
)
}

export default TablesFormat