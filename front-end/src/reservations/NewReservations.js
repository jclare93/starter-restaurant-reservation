import React from "react"
import {useState, useEffect} from "react-router-dom"

function NewReservation(){
    //name="first_name"
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
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default NewReservation;