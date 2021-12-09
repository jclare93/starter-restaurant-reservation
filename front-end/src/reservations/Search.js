import { listReservations } from "../utils/api"
import ReservationFormat from "./ReservationsFormat"
import React, {useState, useEffect} from "react"
import ErrorAlert from "../layout/ErrorAlert"

function Search() {
    const [searchText, setSearchText] = useState("")
    const [reservations, setReservations] = useState(null)
    const [searchError, setSearchError] = useState('')
    const [searchResults, setSearchResults] = useState(null)

    useEffect(() => {
        setSearchResults(reservations)
      }, [reservations]);

    const handleSeachChange = (event) => {
        event.preventDefault()
        setSearchText(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const abortController = new AbortController();
        setSearchError(null)
        try {
            const results = await listReservations({mobile_number: searchText}, abortController.signal);
            setReservations(results)
          } catch (err) {
            setSearchError(err)
            console.error(err)
            return;
          }
          
          return () => abortController.abort();
    }

    return (
    <div className = "container-fluid">
        <ErrorAlert error ={searchError} />
        <form onSubmit= {handleSubmit}>
            
            <label htmlFor="mobile_number"> Search By Mobile Number: </label>
            <div className="form-group">
                <input name="mobile_number" onChange ={handleSeachChange} id="mobile_number" value = {searchText}
                placeholder="Enter a customer's phone number" />
            </div>
            <button type="submit" className="btn btn-primary">Find</button>
        </form>
        <br />
        {searchResults && reservations.length > 0 &&  
        <ReservationFormat reservations = {reservations}/>}
        {searchResults && reservations.length < 1 && 
        <h6>No reservations found for {searchText}</h6>
        }
    </div>
    )
}

export default Search;