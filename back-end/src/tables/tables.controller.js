const service = require("./tables.service")
const reservationService = require("../reservations/reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const validateTablesInputs = require("../errors/validateTablesInputs")
const validateTablesUpdate = require("../errors/validateTablesUpdate")

async function update(req, res, next){
    const newTable = {
        ...res.locals.table,
        reservation_id: res.locals.reservation.reservation_id,
      };
    
    const results = await service.update(newTable)
    res.json({data: results})
}

async function list(req, res, next){
    const results = await service.list()
    res.json({data: results})
}

async function tableExists (req, res, next){
    const table_id = req.params.table_id
    const table = await service.read(table_id)
    console.log("table:", table)
    if(table){
        console.log("table:", table)
        res.locals.table = table
        return next()
    }
    return next({
    status: 404,
    message:`${table_id} is not a valid table`})
}

async function create(req, res, next){
    const {data} = req.body
    console.log("req.body", data)
    const results = await service.create(data)
    console.log("data:", { results })
    res.status(201).json({data: results})
}

function read(req, res, next) {
    res.json({data: res.locals.table})
}

async function reservationIdExists(req, res, next) {
    let reservation_id = null
    if (req.body.data) {
      reservation_id = req.body.data.reservation_id
    } 

    const reservation = await reservationService.read(reservation_id);

    if (reservation) {
      res.locals.reservation = reservation;
      return next();
    }
  
    return next({
      status: 404,
      message: `${reservation_id} is not a valid reservation id.`,
    });
  }
//use res.locals to compare capacity vs party size
function checkCapacity(req, res, next){
    
    if(res.locals.reservation.people > res.locals.table.capacity){
        return next({
            status:400, message: "this table does not have adequate capacity"
        })
    }
    return next()
}

function checkIfOccupied(req, res, next){
    if (res.locals.table.reservation_id){
        return next({status: 400, message:"This table is occupied"})
    }
    return next()
}

//moved checkIfOccupied ahead of reservation id exists

module.exports = {
    update: [ asyncErrorBoundary(tableExists), validateTablesUpdate,checkIfOccupied, asyncErrorBoundary(reservationIdExists), 
        checkCapacity, asyncErrorBoundary(update)],
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(tableExists), read],
    create: [validateTablesInputs, asyncErrorBoundary(create)]
}