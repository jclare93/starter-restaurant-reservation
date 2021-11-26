import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import {createReservation} from "../utils/api"


function NewReservations(){
    const [newReservation, setNewReservation] = useState({firstName: '', lastName: '', mobileNumber: '', 
                                            reservationDate: null, reservationTime: null, partySize: null})
    const history = useHistory()
    
    const handleSubmit = async(event) => {
        event.preventDefault()
        const abortController = new AbortController();
        try {
            await createReservation(newReservation, abortController.signal);
          } catch (err) {
            console.error(err)
            return;
          }
        history.push(`/dashboard?date=${newReservation.reservationDate}`);
    }
    const handleCancel = (event) => {
        event.preventDefault()
        history.goBack()
    }
    const handleFirstChange = (event) => {
        setNewReservation({
            ...newReservation,
            firstName: event.target.value
        })
    }

    const handleLastChange = (event) => {
        setNewReservation({
            ...newReservation,
            LastName: event.target.value
        })
    }

    const handleNumberChange = (event) => {
        setNewReservation({
            ...newReservation,
            mobileNumber: event.target.value
        })
    }

    const handleDateChange = (event) => {
        setNewReservation({
            ...newReservation,
            reservationDate: event.target.value
        })
    }

    const handlePartyChange = (event) => {
       setNewReservation({ 
           ...newReservation,
           partySize: event.target.value
        }) 

    }

// add minimum party size

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