import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import {createReservation} from "../utils/api"


function NewReservations(){
    const [newReservation, setNewReservation] = useState({first_name: '', last_name: '', mobile_number: '', 
                                            reservation_date: null, reservation_time: null, people: null})
    const [newReservationError, setNewReservationError] = useState(null)
    const history = useHistory()
    
    const handleSubmit = async(event) => {
        event.preventDefault()
        const abortController = new AbortController();
        setNewReservationError(null)
        try {
            await createReservation(newReservation, abortController.signal);
          } catch (err) {
            setNewReservationError(err)
            console.error(err)
          }
        history.push(`/dashboard?date=${newReservation.reservation_date}`);
    }
    const handleCancel = (event) => {
        event.preventDefault()
        history.goBack()
    }
    const handleFirstChange = (event) => {
        event.preventDefault()
        setNewReservation({
            ...newReservation,
            first_name: event.target.value
        })
    }

    const handleLastChange = (event) => {
        event.preventDefault()
        setNewReservation({
            ...newReservation,
            last_name: event.target.value
        })
    }

    const handleNumberChange = (event) => {
        event.preventDefault()
        setNewReservation({
            ...newReservation,
            mobile_number: event.target.value
        })
    }

    const handleDateChange = (event) => {
        event.preventDefault()
        setNewReservation({
            ...newReservation,
            reservation_date: event.target.value
        })
    }

    const handleTimeChange = (event) => {
        event.preventDefault()
        setNewReservation({
            ...newReservation,
            reservation_time: event.target.value
        })
    }

    const handlePartyChange = (event) => {
        event.preventDefault()
       setNewReservation({ 
           ...newReservation,
           people: event.target.value
        }) 

    }

// add minimum party size

    return (
        <form onSubmit= {handleSubmit}>
            <div className="form-group">
                <label for="first_name">First Name</label>
                <input type="text" onChange= {handleFirstChange} className="form-control" id="first_name" name="first_name" required/>
            </div>
            <div className="form-group">
                <label for="last_name">Last Name</label>
                <input type="text" onChange = {handleLastChange} className="form-control" id="last_name" name="last_name" required/>
            </div>
            <div className="form-group">
                <label for="mobile_number">Mobile Number</label>
                <input type="text" onChange = {handleNumberChange} className="form-control" id="mobile_number" name="mobile_number" required/>
            </div>
            <div className="form-group">
                <label for="reservation_date">Reservation Date</label>
                <input type="date" onChange = {handleDateChange} className="form-control" id="reservation_date" name="reservation_date" required/>
            </div>
            <div className="form-group">
                <label for="reservation_time">Reservation Time</label>
                <input type="time" onChange = {handleTimeChange} className="form-control" id="reservation_time" name="reservation_time" required/>
            </div>
            <div className="form-group">
                <label for="people">Party Size</label>
                <input type="number" onChange = {handlePartyChange} className="form-control" id="people" name="people" required/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary" onClick = {handleCancel}>Cancel</button>
        </form>
    )
}

export default NewReservations;