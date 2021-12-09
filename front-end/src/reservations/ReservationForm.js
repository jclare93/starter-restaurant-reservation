import React from 'react'
import {useHistory} from 'react-router-dom'

function ReservationForm({reservation, setReservation, handleSubmit}){
    const history = useHistory()

    const handleCancel = (event) => {
        event.preventDefault()
        history.goBack()
    }
    const handleFirstChange = (event) => {
        event.preventDefault()
        setReservation({
            ...reservation,
            first_name: event.target.value
        })
    }

    const handleLastChange = (event) => {
        event.preventDefault()
        setReservation({
            ...reservation,
            last_name: event.target.value
        })
    }

    const handleNumberChange = (event) => {
        event.preventDefault()
        setReservation({
            ...reservation,
            mobile_number: event.target.value
        })
    }

    const handleDateChange = (event) => {
        event.preventDefault()
        setReservation({
            ...reservation,
            reservation_date: event.target.value
        })
    }

    const handleTimeChange = (event) => {
        event.preventDefault()
        setReservation({
            ...reservation,
            reservation_time: event.target.value
        })
    }

    const handlePartyChange = (event) => {
        event.preventDefault()
        setReservation({ 
           ...reservation,
           people: event.target.value
        }) 

    }
 return (
     <>
        <form onSubmit= {handleSubmit}>
        <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input type="text" onChange= {handleFirstChange} className="form-control" id="first_name" name="first_name" value= {reservation?.first_name} required/>
        </div>
        <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input type="text" onChange = {handleLastChange} className="form-control" id="last_name" name="last_name" value= {reservation?.last_name} required/>
        </div>
        <div className="form-group">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input type="text" onChange = {handleNumberChange} className="form-control" id="mobile_number" name="mobile_number" value= {reservation?.mobile_number} required/>
        </div>
        <div className="form-group">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input type="date" onChange = {handleDateChange} className="form-control" id="reservation_date" name="reservation_date" value= {reservation?.reservation_date} required/>
        </div>
        <div className="form-group">
            <label htmlFor="reservation_time">Reservation Time</label>
            <input type="time" onChange = {handleTimeChange} className="form-control" id="reservation_time" name="reservation_time" value= {reservation?.reservation_time} required/>
        </div>
        <div className="form-group">
            <label htmlFor="people">Party Size</label>
            <input type="number" onChange = {handlePartyChange} className="form-control" id="people" name="people" value= {reservation?.people} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-secondary" onClick = {handleCancel}>Cancel</button>
        </form>
    </>
 )
}

export default ReservationForm