import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import {Link} from "react-router-dom"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  if (!date) date = today()

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date:</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <Link to={`/dashboard?date=${previous(date)}`}> 
        <button onClick = {() => {date = previous(date)}}className="btn btn-secondary" type="button">Previous</button>
      </Link>
      <Link to={`/dashboard?date=${today()}`}> 
        <button onClick= {() => {date = today()}} className="btn btn-primary" type="button">Today</button>
      </Link>
      <Link to={`/dashboard?date=${next(date)}`}> 
        <button onClick = {() => {date = next(date)}}className="btn btn-secondary" type="button">Next</button>
      </Link>
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
