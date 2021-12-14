import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { updateReservationStatus } from "../utils/api";


function ReservationFormat({reservation = []}){
    
    const [reservationStatusError, setReservationStatusError] = useState(null)
    
    const handleCancelClick = async(reservation_id) => {
        const abortController = new AbortController()
        setReservationStatusError(null)
        if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
            
            setReservationStatus(reservation)
            try{
                await updateReservationStatus(reservation, reservation_id)
                
            } catch(err){
                setReservationStatusError(err)
                console.error(err)
                return;
            }
            window.location.reload();
          }
        return () => abortController.abort();
    }
    
    return (
    <>
        <ErrorAlert error = {reservationStatusError} />
        <div className= "container-fluid">
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
            <div className= "row">
                <p data-reservation-id-status={reservation.reservation_id}>{reservation.status}</p>
            </div>
            
            
            {reservation.status ===  "booked" && 
            <>
                <a className="btn btn-primary" href={`/reservations/${reservation.reservation_id}/edit`} role="button">Edit</a>
                <a className="btn btn-primary" href={`/reservations/${reservation.reservation_id}/seat`} role="button">Seat</a>
                <button className= "btn btn-warning" data-reservation-id-cancel={reservation.reservation_id} type ="button"
                 onClick = {()=> handleCancelClick(reservation.reservation_id)}>Cancel</button>
            </>
            }
        </div>
    </>
    )
}

export default ReservationFormat;