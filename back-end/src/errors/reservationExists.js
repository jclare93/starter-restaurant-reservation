const service = require("../reservations/reservations.service")

async function reservationExists(req, res, next) {
  
    let {reservation_id} = req.params
  
      const reservation = await service.read(reservation_id)
      
      if (reservation){
        res.locals.reservation = reservation
        return next()
      } else{
        return next({status: 404, message: `reservation_id: ${reservation_id} does not exist`})
      }
    
  }

module.exports= reservationExists;