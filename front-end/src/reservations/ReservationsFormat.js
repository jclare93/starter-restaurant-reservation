import React, { useState } from "react";
import { updateReservationStatus } from "../utils/api";


function ReservationFormat({reservation = []}){
    const [reservationStatus, setReservationStatus] = useState('')
    const [reservationStatusError, setReservationStatusError] = useState(null)

    const seatClickHandler = (event) => {
        event.preventDefault()
        const abortController = new AbortController();
        setReservationStatusError(null)
        setReservationStatus({status: 'seated'})
        try{
            updateReservationStatus(reservationStatus)
        }catch(err){
        setReservationStatusError(err)
        }
    }
    
    return (
    <>
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
            <a class="btn btn-primary" href={`/reservations/${reservation.reservation_id}/seat`} role="button">Seat</a>
            {reservation.status ===  "booked" && 
            <button className="btn btn-primary" onClick = {seatClickHandler} type = "button">Seat</button>
            }
        </div>
    </>
    )
}

export default ReservationFormat;