const knex = require("../db/connection");

function update(newTable){
    return knex("tables")
    .select("*")
    .where({ table_id: newTable.table_id })
    .update(newTable, "*")
    .then((updatedRecords) => updatedRecords[0])

}

function read(tableId) {
    return knex("tables")
    .select("*")
    .where({"table_id": tableId})
    .first()
}

function create(newTable){
    return knex("tables")
    .returning("*")
    .insert(newTable)
    .then(createdRecords => createdRecords[0])
}

function list(){
    return knex("tables")
    .select("*")
    .orderBy("table_name")
}

function finishReservation(reservationId){
    return knex("reservations")
    .where({"reservation_id": reservationId})
    .update({"status": "finished"})
    .then((updatedRecords) => updatedRecords[0])

}

function seatReservation(reservationId){
    return knex("reservations")
    .where({"reservation_id": reservationId})
    .update({"status": "seated"})
    .then((updatedRecords) => updatedRecords[0])
}

function finishTable(tableId){
    return knex("tables")
    .returning("*")
    .where({"table_id": tableId})
    .update({"reservation_id": null})
}

module.exports = {
    update,
    list,
    read,
    create,
    finishReservation,
    finishTable,
    seatReservation
}