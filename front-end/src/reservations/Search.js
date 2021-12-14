import { listReservations } from "../utils/api"
import ReservationFormat from "./ReservationsFormat"
import React, {useState, useEffect} from "react"
import ErrorAlert from "../layout/ErrorAlert"

function Search() {
    const [searchText, setSearchText] = useState("")
    const [reservations, setReservations] = useState([])
    const [searchError, setSearchError] = useState('')

    //rerender once reservations changes
    useEffect(() => {
      }, [reservations]);

    const handleSearchChange = (event) => {
        event.preventDefault()
        setSearchText(event.target.value)
    }

    //search  the reservations for the phone number
    const handleSubmit = async (event) => {

        event.preventDefault()
        const abortController = new AbortController();
        setSearchError(null)
        try {
            const results = await listReservations({mobile_number: searchText}, abortController.signal);
            setReservations(results)
            console.log(reservations)
          } catch (err) {
            setSearchError(err)
            console.error(err)
            return;
          }
          
          return () => abortController.abort();
    }

    //map reservations into a nice formatted list
    const reservationList = reservations.map((reservation, index) => {
        return <ReservationFormat reservation = {reservation} key = {index}/> 
    }) 

    return (
    <div className = "container-fluid">
        <ErrorAlert error ={searchError} />
        <form onSubmit= {handleSubmit}>
            <label htmlFor="mobile_number"> Search By Mobile Number: </label>
            <div className="form-group">
                <input name="mobile_number" onChange ={handleSearchChange} id="mobile_number" value = {searchText}
                placeholder="Enter a customer's phone" />
            </div>
            <button type="submit" className="btn btn-primary">Find</button>
        </form>
        <br />
        {reservations.length>0?  reservationList :
        <h6>No reservations found.</h6>
        }
    </div>
    )
}

export default Search;