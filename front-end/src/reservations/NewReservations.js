import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import {createReservation} from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";



function NewReservations(){
    const [newReservation, setNewReservation] = useState({first_name: '', last_name: '', mobile_number: '', 
                                            reservation_date: '', reservation_time: '', people: ''})
    const [newReservationError, setNewReservationError] = useState(null)
    const history = useHistory()
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const abortController = new AbortController();
        setNewReservationError(null)
        try {
            await createReservation(newReservation, abortController.signal);
          } catch (err) {
            setNewReservationError(err)
            console.error(err)
            return;
          }
        history.push(`/dashboard?date=${newReservation.reservation_date}`);
        
    }/*
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



    return (
        <>
            <ErrorAlert className ="alert alert-danger" error={newReservationError} />
            <form onSubmit= {handleSubmit}>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text" onChange= {handleFirstChange} className="form-control" id="first_name" name="first_name" value= {newReservation?.first_name} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="text" onChange = {handleLastChange} className="form-control" id="last_name" name="last_name" value= {newReservation?.last_name} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="mobile_number">Mobile Number</label>
                    <input type="text" onChange = {handleNumberChange} className="form-control" id="mobile_number" name="mobile_number" value= {newReservation?.mobile_number} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="reservation_date">Reservation Date</label>
                    <input type="date" onChange = {handleDateChange} className="form-control" id="reservation_date" name="reservation_date" value= {newReservation?.reservation_date} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="reservation_time">Reservation Time</label>
                    <input type="time" onChange = {handleTimeChange} className="form-control" id="reservation_time" name="reservation_time" value= {newReservation?.reservation_time} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="people">Party Size</label>
                    <input type="number" minimum = {1} onChange = {handlePartyChange} className="form-control" id="people" name="people" value= {newReservation?.people} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick = {handleCancel}>Cancel</button>
            </form>
        </>
    )*/

    return (
        <>
            <ErrorAlert error = {newReservationError} />
            <ReservationForm reservation = {newReservation} setReservation = {setNewReservation} handleSubmit = {handleSubmit}/>
        </>
    )
}

export default NewReservations;