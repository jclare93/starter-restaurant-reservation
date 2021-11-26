const service = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const {date} = req.query
  if (date){
    try {
      const data = await service.listByDate(date)
      res.json({ data })
    } catch (err){
      console.error(err)
    }
}
}

async function create(req, res, next){
  try{
    const data = await service.create(req.body.data)
    res.status(201).json({ data })
  } catch(err){
    console.error(err)
    return;
  }
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)]
}
