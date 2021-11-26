import React from "react"
import {useState, useEffect, useHistory} from "react-router-dom"


function NewReservations(){
    const [reservation, setReservation] = useState({firstName: '', lastName: '', mobileNumber: '', 
                                                            reservationDate: null, reservationTime: null, partySize: null})
    const history = useHistory()
    
    const handleSubmit = async(event) => {
        event.preventDefault()
    }
    const handleCancel = (event) => {
        event.preventDefault()
        history.goBack()
    }
    const handleFirstChange = (event) => {
        setReservation({
            ...reservation,
            firstName: event.target.value
        })
    }

    const handleLastChange = (event) => {
        setReservation({
            ...reservation,
            LastName: event.target.value
        })
    }

    const handleNumberChange = (event) => {
        setReservation({
            ...reservation,
            mobileNumber: event.target.value
        })
    }

    const handleDateChange = (event) => {
        setReservation({
            ...reservation,
            reservationDate: event.target.value
        })
    }

    const handlePartyChange = (event) => {
       setReservation({ 
           ...reservation,
           partySize: event.target.value
        }) 

    }


    return (
        <form onSubmit= {handleSubmit}>
            <div className="form-group">
                <label for="firstName">First Name</label>
                <input type="text" onChange= {handleFirstChange} className="form-control" id="firstName" name="first_name" required/>
            </div>
            <div className="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" onChange = {handleLastChange} className="form-control" id="lastName" name="last_name" required/>
            </div>
            <div className="form-group">
                <label for="mobileNumber">Mobile Number</label>
                <input type="number" onChange = {handleNumberChange} className="form-control" id="mobileNumber" name="mobile_number" required/>
            </div>
            <div className="form-group">
                <label for="reservationDate">Reservation Date</label>
                <input type="date" onChange = {handleDateChange} className="form-control" id="reservationDate" name="reservation_date" required/>
            </div>
            <div className="form-group">
                <label for="reservationTime">Reservation Time</label>
                <input type="time" className="form-control" id="reservationTime" name="reservation_time" required/>
            </div>
            <div className="form-group">
                <label for="partySize">Party Size</label>
                <input type="number" onChange = {handlePartyChange} className="form-control" id="partySize" name="people" required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary" onClick = {handleCancel}>Cancel</button>
        </form>
    )
}

export default NewReservations;