const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const validateTablesInputs = require("../errors/validateTablesInputs")
const validateTablesUpdate = require("../errors/validateTablesUpdate")
const reservationService = require("../reservations/reservations.service")

async function update(req, res, next){
    const newTable = {
        ...res.locals.table,
        reservation_id: res.locals.reservation.reservation_id,
      };
    
    const results = await service.update(newTable)
    console.log("data:", results)
    next()
}

async function list(req, res, next){
    const results = await service.list()
    res.json({data: results})
}

async function tableExists (req, res, next){
    const table_id = req.params.table_id
    const table = await service.read(table_id)
    
    if(table){
        
        res.locals.table = table
        return next()
    }
    return next({
    status: 404,
    message:`${table_id} is not a valid table`})
}

async function create(req, res, next){
    const {data} = req.body
    
    const results = await service.create(data)
    
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
    } else {
        return next({
      status: 404,
      message: `${reservation_id} is not a valid reservation id.`,
    })
    }
  }

async function finishReservation(req, res, next){
    let {reservation_id} = res.locals.table
    if(!reservation_id) reservation_id = req.params.reservation_id ;
    if(!reservation_id) return next({status: 400, message: `this table is not occupied`})
    const updatedReservation= await service.finishReservation(reservation_id)
    console.log("updatedReservation:", updatedReservation)
    next()
}

async function finishTable(req, res, next){
    const updatedTables = await service.finishTable(res.locals.table.table_id)
    res.status(200).json({data: updatedTables})
}


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

async function updateReservationStatus(req, res, next){
    const {reservation_id} = res.locals.reservation
    const results = await service.seatReservation(reservation_id)
    
    res.json({data: results})
}

function checkIfSeated(req, res, next) {
    const { status } = res.locals.reservation;
  
    if (status === "seated") {
      return next({
        status: 400,
        message: `Reservation status cannot be seated if already seated`,
      });
    }
  
    next();
  }

module.exports = {
    update: [ asyncErrorBoundary(tableExists), validateTablesUpdate, checkIfOccupied, asyncErrorBoundary(reservationIdExists), 
        checkCapacity, checkIfSeated, asyncErrorBoundary(update), asyncErrorBoundary(updateReservationStatus)],
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(tableExists), read],
    create: [validateTablesInputs, asyncErrorBoundary(create)],
    finishReservation:[asyncErrorBoundary(tableExists), asyncErrorBoundary(finishReservation), asyncErrorBoundary(finishTable)]
}