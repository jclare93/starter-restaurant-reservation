function validateTablesUpdate(req, res, next){
    const {data} = req.body
    const table = data
    
    if(!table){
        return next({
            status: 400,
            message: 'please send data with your request'
        })
    }

    if (!table.reservation_id){
        return next({
            status: 400,
            message:  "please enter a valid reservation_id"
        })
    }

    return next()
}

module.exports = validateTablesUpdate;