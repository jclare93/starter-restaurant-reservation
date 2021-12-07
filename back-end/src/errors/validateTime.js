function validateTime(req, res, next){
    let {data} = req.body
    let reservation = data
    
    let reservationTime = reservation.reservation_time.split('')
    let reservationHours = reservationTime.slice(0,2)
    reservationHours = parseInt(reservationHours.join(''))
    
    let reservationMinutes = reservationTime.slice(3)
    reservationMinutes = reservationMinutes.join('')
    reservationMinutes = reservationMinutes/100
    const reservationTimeFormat = reservationHours+reservationMinutes
    

    if(10.3 > reservationTimeFormat ||  reservationTimeFormat > 21.3){
        return next({
            status: 400,
            message: "sorry. we only take reservations between 10:30AM to 9:30PM."
        })
    }
    next()
}
module.exports = validateTime