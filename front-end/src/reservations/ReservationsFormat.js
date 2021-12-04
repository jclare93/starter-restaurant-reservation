import React, {useState, useEffect} from "react";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationFormat({reservation = [], date}){
    const [tablesError, setTablesError] = useState(null)
    const [tables, setTables] = useState([])
    useEffect(() => {
        const abortController = new AbortController();
    
        async function loadTables() {
          setTablesError(null);
          try {
            const data = await listTables({ date }, abortController.signal);
            setTables(data);
          } catch (error) {
            setTablesError(error);
          }
        }
        loadTables();
        return () => abortController.abort();
      }, []);


    return (
    <>
        <ErrorAlert error={tablesError} />
        <div className= "row">
            <div className= "row">
                <h3>Reservation Name: </h3>
                <h3> {reservation.first_name} {reservation.last_name}</h3>
            </div>
            <div className= "row">
                <h4>Reservation Time and Date: </h4>
                <h4> {reservation.reservation_time} -- {reservation.reservation_date}</h4>
            </div>
            <div className= "row">
                <h6>Mobile Phone Number: </h6>
            <h6> {reservation.mobile_number}</h6>
            </div>
            <div className= "row">
                <h6>Party Size: </h6>
                <h6> {reservation.people}</h6>
            </div>
            <a class="btn btn-primary" href={`/reservations/${reservation.reservation_id}/seat`} role="button">Seat</a>
        </div>
        <div className="row">
            <h3>Seats</h3>
            {tables && tables.map((table, index) => {
                return (
                    <>
                        <div className = "row" key = {index}>
                            <h5>Table Name: {table.table_name}</h5>
                        </div>
                        <div className="row">
                            <h6 data-table-id-status= {table.table_id}>Status: </h6>
                        </div>
                    </>
                )
            })}
        </div>
    </>
    )
}

export default ReservationFormat;