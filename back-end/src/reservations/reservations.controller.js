const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const { reset } = require("nodemon")

/**
 * List handler for reservation resources
 */
async function reservationExists(req, res, next) {
  const {reservation_id} = req.params
  try{
    const reservation = await service.read(reservation_id)
    if (reservation){
      res.locals.reservation = reservation
      next()
    } else{
      next({status: 404, message: `reservation id: ${reservation_id} does not exist`})
    }
  }catch(err){
    console.error(err)
  }
}

function read(req, res){
  const reservation = res.locals.reservation
  console.log("reservation:", reservation)
  res.json(reservation)
}

async function list(req, res) {
  const {date} = req.query
  console.log("date:", date)
  if (date){
    try {
      const data = await service.listByDate(date)
      res.json({ data })
    } catch (err){
      console.error(err)
    }
  } 
  return;
}

async function create(req, res, next){
  const data = req.body.data
  console.log("req.body.data:", req.body.data)
  try{
    const results = await service.create(data)
    console.log("results:", results)
    res.status(201).json({ results })
  } catch(err){
    console.error(err)
    res.sendStatus()
  }
}

module.exports = {
  read: [asyncErrorBoundary(reservationExists), read],
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)]
}
