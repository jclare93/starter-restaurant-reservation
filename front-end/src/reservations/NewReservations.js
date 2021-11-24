import React from "react"
import {useState, useEffect} from "react-router-dom"

function NewReservation(){
    //name="people"
    return (
        <form>
            <div className="form-group">
                <label for="firstName">First Name</label>
                <input type="text" className="form-control" id="firstName" name="first_name" required/>
            </div>
            <div className="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" class="form-control" id="lastName" name="last_name" required/>
            </div>
            <div className="form-group">
                <label for="mobileNumber">Mobile Number</label>
                <input type="number" class="form-control" id="mobileNumber" name="mobile_number" required/>
            </div>
            <div className="form-group">
                <label for="reservationDate">Reservation Date</label>
                <input type="date" class="form-control" id="reservationDate" name="reservation_date" required/>
            </div>
            <div className="form-group">
                <label for="reservationTime">Reservation Time</label>
                <input type="time" class="form-control" id="reservationTime" name="reservation_time" required/>
            </div>
            <div className="form-group">
                <label for="partySize">Party Size</label>
                <input type="number" class="form-control" id="partySize" name="people" required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary">Cancel</button>
        </form>
    )
}

export default NewReservations;