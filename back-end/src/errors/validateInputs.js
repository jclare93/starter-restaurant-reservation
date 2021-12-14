function validateInputs(req, res, next){
    
    const {data} = req.body
    const reservation = data
    
    if(!reservation){
        return next({
            status: 400,
            message: 'please send data with your request'
        })
    }

    if (!reservation.first_name ||reservation.first_name.length<1){
        return next({
            status: 400,
            message:  "please enter a valid first_name"
        })
    }

    if(!Number.isInteger(reservation.people) || reservation.people < 1 || !reservation.people){
        return next({
            status: 400,
            message: 'please enter a valid number for people'
        })
    }

    var isValidTime = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(reservation.reservation_time);

    if(!reservation.reservation_time||!isValidTime || reservation.reservation_time.length < 1){
        return next({
            status: 400,
            message: "please enter a valid reservation_time"
        })
    }
    if(!reservation.last_name || reservation.last_name.length<1){
        return next({
            status: 400,
            message: "please enter a valid last_name"
        })
    }
    if(!reservation.mobile_number ||reservation.mobile_number.length<1){
        return next({
            status: 400,
            message: "please enter a valid mobile_number"
        })
    }

    if(reservation.status==="seated"||reservation.status === "finished"){
        return next({
            status:400,
            message: "status seated and finished are not valid statuses for POST or PUT"
        })
    }

    if(!reservation.reservation_date ||reservation.reservation_date.length < 1){
        return next({
            status: 400,
            message: "please enter a valid reservation_date"
        })
    }

    function isValidDate(){
        let validDate = new Date(reservation.reservation_date)
        if(validDate.toString() == 'Invalid Date'){
          return next({
            status: 400,
            message: "please enter a valid reservation_date"
        })
        } 
      };

    isValidDate()
    
    return next()
}

module.exports = validateInputs;