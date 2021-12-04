import React, {useState, useEffect} from "react"
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { finishTable } from "../utils/api";

function TablesFormat(){   
    const [tablesError, setTablesError] = useState(null)
    const [deleteSeatError, setDeleteSeatError] = useState(null)
    const [tables, setTables] = useState([])
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
        setDeleteSeatError(null)
        try{
            await finishTable(table, abortController.signal)
        } catch(err){
            setDeleteSeatError(err)
            return;
        }
        return history.go(0)
    }

    return (
    <>
    <ErrorAlert error={tablesError} />
    <ErrorAlert error={deleteSeatError} />
        <div className="container-fluid">
            <h3>Seats</h3>
            {tables && tables.map((table, index) => {
                return (
                    <div key = {index} className= "row">
                            <h5>Table Name: {table.table_name}</h5>
                            <h6 data-table-id-status= {table.table_id}> {table.reservation_id? "Occupied": "Free"} </h6>
                            {table.reservation_id && 
                            <button type="button" className="btn btn-primary" data-table-id-finish={table.table_id} 
                            value={table.table_id} onClick={finishClickHandler}>Finish</button>}
                    </div>
                )
            })}
    
        </div>
    </>
)
}

export default TablesFormat