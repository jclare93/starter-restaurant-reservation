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

/*function reservationTableData(reservationId){
    return knex("tables")
    .select("*")
    .fullOuterJoin("reservations", "tables.reservation_id", "reservations.reservation_id")
    .where({'tables.reservation_id': reservationId})
    .first()
}*/

module.exports = {
    update,
    list,
    read,
    create,
}