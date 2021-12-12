import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import {createReservation} from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";



function NewReservations(){
    const [newReservation, setNewReservation] = useState({first_name: '', last_name: '', mobile_number: '', 
                                            reservation_date: '', reservation_time: '', people: 0})
    const [newReservationError, setNewReservationError] = useState(null)
    const history = useHistory()
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        const abortController = new AbortController();
        setNewReservationError(null)
        const reservation = {
            ...newReservation,
            people: Number(newReservation.people),
        };

        try {
            await createReservation(reservation, abortController.signal);
          } catch (err) {
            setNewReservationError(err)
            console.error(err)
            return;
          }
        history.push(`/dashboard?date=${newReservation.reservation_date}`);
        
    }

    return (
        <>
            <ErrorAlert error = {newReservationError} />
            <ReservationForm reservation = {newReservation} setReservation = {setNewReservation} handleSubmit = {handleSubmit}/>
        </>
    )
}

export default NewReservations;