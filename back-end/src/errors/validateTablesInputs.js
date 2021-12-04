function validateTablesInputs(req, res, next){
    const {data} = req.body
    const table = data

    if(!table){
        return next({
            status: 400,
            message: 'please send data with your request'
        })
    }

    if (!table.table_name ||table.table_name.length<2){
        return next({
            status: 400,
            message:  "please enter a valid table_name"
        })
    }

    
    if(!table.capacity || table.capacity<1 || !Number.isInteger(table.capacity)){
        return next({
            status: 400,
            message: "please enter a valid capacity"
        })
    }
    
    next()
}

module.exports = validateTablesInputs;