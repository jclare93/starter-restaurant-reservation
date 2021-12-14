import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import ErrorAlert from "../layout/ErrorAlert"
import ReservationForm from "./ReservationForm"
import { updateReservation, readReservation } from "../utils/api"
import formatReservationDate from "../utils/format-reservation-date"
import "../layout/Layout.css";
 
function EditReservation(){
    const history = useHistory()
    const {reservation_id}= useParams()
    const [reservationError, setReservationError] = useState(null)
    const [reservation, setReservation] = useState({first_name: '', last_name: '', mobile_number: '', 
    reservation_date: '', reservation_time: '', people: '',})

    useEffect(() => {
        const abortController = new AbortController();
    
        async function getReservation() {
          setReservationError(null);
          try {
            const data = await readReservation(reservation_id, abortController.signal);
            const formattedData = formatReservationDate(data)
            const newReservation = {...formattedData, reservation_id: reservation_id}
            setReservation(newReservation);
          } catch (error) {
            setReservationError(error);
          }
        }
        getReservation();
        return () => abortController.abort();
      }, [reservation_id]);

      const handleSubmit = async(event) => {
          event.preventDefault()
          const abortController = new AbortController();
            setReservationError(null)

            try {
                await updateReservation(reservation, abortController.signal);
            } catch (err) {
                setReservationError(err)
                console.error(err)
                return;
            }
            history.push(`/dashboard?date=${reservation.reservation_date}`)

            return () => abortController.abort();
        }

    return (
        <>
            <ErrorAlert error ={reservationError} />
            <div className= "container-fluid" >
                <div className= "row">
                    <h3 className = "center">Edit Reservation</h3>
                </div>
                {reservation && 
                <div className = "row">
                    <ReservationForm reservation = {reservation} setReservation={setReservation} handleSubmit={handleSubmit}/>
                </div>}
            </div>
        </>
    )
}
export default EditReservation;