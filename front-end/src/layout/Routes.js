import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservations from "../reservations/NewReservations";
import NewTables from "../tables/NewTables";
import ReservationSeat from "../reservations/ReservationSeat";
import Search from "../reservations/Search"
import EditReservation from "../reservations/EditReservation"

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route exact = {true} path = "/reservations/new">
        <NewReservations />
      </Route>
      <Route exact = {true} path = "/reservations/:reservation_id/edit" >
        <EditReservation />
      </Route>
      <Route exact path="/reservations/:reservation_id/seat">
        <ReservationSeat />
      </Route>
      <Route exact={true} path ="/tables/new">
        <NewTables />
      </Route>
      <Route exact={true} path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
      
    </Switch>
  );
}

export default Routes;
