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
  console.log(date)
  if(date){
    const results = await service.listActiveByDate(date)
    console.log("data:", results)
    res.json({data: results})
  } 
  const mobile_number = req.query.mobile_number
  if(mobile_number){
    const results= await service.listActiveByMobile(mobile_number)
    res.json({data: results})
  }
}

async function create(req, res, next){
  const {data} = req.body
  console.log("req.body", data)
    const results = await service.create(data)
    console.log("data:", { results })
    res.status(201).json({data: results})

}

async function updateStatus(req, res, next){
  const {status} = req.body.data
  console.log("status:", status)
  console.log("reservation_id:", res.locals.reservation.reservation_id)
  const results = await service.updateReservationStatus(status, res.locals.reservation.reservation_id)
  console.log("data:", results)
  res.json({data: results})
}

async function update(req, res, next){
  const {data} = req.body
  console.log("update data:", data)
  const results = await service.update(data)
  console.log("update:", results)
  res.json({data: results})
}



module.exports = {
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  list: [asyncErrorBoundary(list)],
  create: [validateInputs, validateTime, validateDateTime, asyncErrorBoundary(create)],
  updateStatus: [asyncErrorBoundary(reservationExists), validateStatus, asyncErrorBoundary(updateStatus)],
  update: [asyncErrorBoundary(reservationExists), validateTime, validateDateTime, validateInputs, asyncErrorBoundary(update)]
}