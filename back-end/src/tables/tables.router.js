/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

 const router = require("express").Router({mergeParams: true});
 const controller = require("./tables.controller");
 const methodNotAllowed = require("../errors/methodNotAllowed")
 
router
    .route("/").get(controller.list).post(controller.create).all(methodNotAllowed)

router
     .route("/:table_id/seat").put(controller.update).delete(controller.finishReservation).all(methodNotAllowed)

router 
    .route("/:table_id").get(controller.read).all(methodNotAllowed)
 
 
 
 
 
 module.exports = router;