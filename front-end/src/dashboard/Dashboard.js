import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import {Link} from "react-router-dom"
import useQuery from "../utils/useQuery";
import ReservationFormat from "../reservations/ReservationsFormat";
import TablesFormat from "../reservations/TablesFormat";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({date}) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const dateQuery = useQuery().get("date")
  if (dateQuery) date = dateQuery;
  if (!date) date = today()


  useEffect(() => {
    const abortController = new AbortController();

    async function loadReservations() {
      setReservationsError(null);
      try {
        const data = await listReservations({ date }, abortController.signal);
        setReservations(data);
      } catch (error) {
        setReservationsError(error);
      }
    }
    loadReservations();
    return () => abortController.abort();
  }, [date]);

  const reservationList = reservations.map((reservation) => {
      return <ReservationFormat reservation = {reservation} date = {date} key = {reservation.reservation_id}/> 
  }) 

  return (
    <main>
      <div className = "container-fluid">
      <div className = "row justify-content-center">
        <h1 className = "text-primary">Restaurant Rez Dashboard</h1>
      </div>
      <div className="d-md-flex mb-3 justify-content-center">
        <h4 className="mb-0">Reservations for: {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      
      <div className = "row justify-content-center">
        <Link to={`/dashboard?date=${previous(date)}`}> 
          <button className="btn btn-secondary" type="button">Previous</button>
        </Link>
        <Link to={`/dashboard?date=${today()}`}> 
          <button className="btn btn-primary" type="button">Today</button>
        </Link>
        <Link to={`/dashboard?date=${next(date)}`}> 
          <button className="btn btn-secondary" type="button">Next</button>
        </Link>
      </div>
      {reservations.length>0? reservationList: <h5 className="text-danger"> No reservations found </h5>}
      <TablesFormat />
      </div>
    </main>
  );
}

export default Dashboard;
