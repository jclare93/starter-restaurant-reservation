function validateDateTime(req, res, next){
    const {data} = req.body
    const reservation = data
    const formatDate = new Date(reservation.reservation_date)
    
    const reservationDay = formatDate.getDay()
    
    const now = new Date()
    if(reservationDay == 1){
        return next({
            status: 400,
            message: "sorry. closed on tuesdays."
        })
    }
    if(formatDate<now){
        return next({
            status: 400, 
            message: "sorry. reservations must be in the future."
        })
    }
    next()
}

module.exports= validateDateTime