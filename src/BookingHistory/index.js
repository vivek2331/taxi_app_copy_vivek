import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import { useLocalState } from "../util/useLocalStorage";

const BookingHistory = () => {
  const [jwt, setjwt] = useLocalState("", "jwt");
  const [bookinghistory, setBookingHistory] = new useState(null);
  useEffect(() => {
    fetch("api/history", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((bookinghistoryData) => {
        setBookingHistory(bookinghistoryData);
      });
  }, []);
  return (
    <>
    <Header/>
    <div className="wrapper">
      {bookinghistory ? (
        bookinghistory.map((ride) => (
          <Card
            img="https://images.unsplash.com/photo-1630717285906-29364ffacea0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
            description1={ride.rideId}
            description={ride.pickupLoc}
            description2={ride.destination}
            description3={ride.vehicleType}
          />
        ))
      ) : (
        <></>
      )}
    </div>
    </>
  );
};

const Card = (props) => {
  return (
    <div className="card">
      <div className="card__body">
        <img src={props.img} alt={props.img} class="card__image" />
        <p className="card__description">
          <h4>Ride Id:</h4>
          {props.description1}
        </p>
        <p className="card__description">
          <h4>Pick-Up Location:</h4>
          {props.description}
        </p>
        <p className="card__description">
          <h4>Destination:</h4>
          {props.description2}
        </p>
        <p className="card__description">
          <h4>Vehicle Type:</h4>
          {props.description3}
        </p>
      </div>
    </div>
  );
};

export default BookingHistory;
