import React from "react";


function ReservationFormat({reservation = []}){
    
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
            <button type = "button">Seat</button>

            }
        </div>
    </>
    )
}

export default ReservationFormat;