const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const validateInputs = require("../errors/validateInputs")
const validateDateTime =require("../errors/validateDateTime")
const validateTime = require("../errors/validateTime")
const reservationExists = require("../errors/reservationExists")
const validateStatus = require("../errors/validateStatus")

async function read(req, res){
  const reservation = res.locals.reservation
  res.json({data: reservation})
}

async function list(req, res) {
  const date = req.query.date
  
  if(date){
    try {
      const results = await service.listActiveByDate(date)
      res.json({data: results}) 
    } catch (err) {
      console.error(err)
    }
  } 
  const mobile_number = req.query.mobile_number
  if(mobile_number){
    try{
      const results = await service.listActiveByMobile(mobile_number)
      res.json({data: results})
    } catch(err){
      console.error(err)
    }
  }
}

async function create(req, res, next){
  const {data} = req.body
  
  try{
    const results = await service.create(data)
    res.status(201).json({data: results})
  } catch(err){
    console.error(err)
  }
}

async function updateStatus(req, res, next){
  const {status} = req.body.data
  
  try{
    const results = await service.updateReservationStatus(status, res.locals.reservation.reservation_id)
    res.json({data: results})
  } catch (err){
    console.error(err)
  }
}

async function update(req, res, next){
  const {data} = req.body
  try{
    const results = await service.update(data)
    res.json({data: results})
  } catch (err){
    console.error(err)
  }
}



module.exports = {
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  list: [asyncErrorBoundary(list)],
  create: [validateInputs, validateTime, validateDateTime, asyncErrorBoundary(create)],
  updateStatus: [asyncErrorBoundary(reservationExists), validateStatus, asyncErrorBoundary(updateStatus)],
  update: [asyncErrorBoundary(reservationExists), validateTime, validateDateTime, validateInputs, asyncErrorBoundary(update)]
}