const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const { reset } = require("nodemon")
const validateInputs = require("../errors/validateInputs")
const validateDateTime =require("../errors/validateDateTime")

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

/*function validateInputs(req, res, next){
  const {data} = req.body
  console.log("data:", data)
  const reservation = data
  console.log("reservation:", reservation )
  if (!reservation.first_name ||reservation.first_name.length<1){
      return next({
          status: 400,
          message:  "please enter a valid first_name"
      })
  }

  if(reservation.people < 1 || isNaN(reservation.people) || !reservation.people){
      return next({
          status: 400,
          message: 'please enter a valid number for people'
      })
  }

  var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(reservation.reservation_time);

  if(!reservation.reservation_time|| !isValid || reservation.reservation_time.length < 1){
      return next({
          status: 400,
          message: "please enter a valid reservation_time"
      })
  }

  if(!reservation.reservation_date ||reservation.reservation_date.length < 1|| !reservation.reservation_date instanceof Date){
      return next({
          status: 400,
          message: "please enter a valid registration_date"
      })
  }
  if(!reservation.mobile_phone ||reservation.mobile_phone.length<1){
      return next({
          status: 400,
          message: "please enter a valid mobile_number"
      })
  }
  if(!reservation.last_name || reservation.last_name.length<1){
      return next({
          status: 400,
          message: "please enter a valid last_name"
      })
  }
  next()

}*/

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
  const {data} = req.body
  console.log("req.body", data)
    const results = await service.create(data)
    console.log("data:", { results })
    res.status(201).json({data: results})

}

module.exports = {
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  list: [asyncErrorBoundary(list)],
  create: [validateDateTime, validateInputs, asyncErrorBoundary(create)]
}