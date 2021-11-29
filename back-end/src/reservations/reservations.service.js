const knex = require("../db/connection");

function list(){
    return knex('reservations')
        .select('*')
        .orderBy('reservation_time')
}

function listByDate(date) {
    return knex('reservations')
        .select('*')
        .where({ reservation_date: date})
        .orderBy('reservation_time')
}

function create(newReservation){
    return knex('reservations')
        .insert(newReservation)
        .returning('*')
        .then(createdRecords => createdRecords[0])
        .catch(err => console.error(err))
}

function read(reservationId){
    return knex('reservations')
        .select('*')
        .where({reservation_id: reservationId})
        .first()
}

module.exports = {
    list,
    create,
    listByDate,
    read,
}