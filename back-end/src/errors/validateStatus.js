function  validateStatus (req, res, next){
    const {status} = req.body.data
    
    
    if(res.locals.reservation.status === "finished"){
        return next({
            status:400,
            message:"a finished reservation cannot be updated"
        })
    }
    if(status !== "booked" && status !== "seated"){
        if(status !== "finished" && status !== "cancelled"){
            return next({
                status: 400,
                message: `sorry, ${status} is an unknown status`
            })
        }
    }
    
    return next()
}

module.exports = validateStatus;