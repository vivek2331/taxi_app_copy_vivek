import { useLocalState } from "../util/useLocalStorage";
import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import "./RideDetails.css";


const RideDetailsPage = () => {
  const [jwt, setjwt] = useLocalState("", "jwt");
  const [rideId, setRideId] = useState(0);
  const [pickupLoc, setPickupLoc] = useState("", "pl");
  const [destination, setDestination] = useState("", "d");
  const [vehicleType, setVehicleType] = useState("", "vt");
  const [update, setUpdate] = useState(false);
  let obj = null;

  useEffect(() => {
    fetch("/api/rideDetails", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((ridedetailsData) => {
        obj = ridedetailsData;
        setRideId(obj.rideId);
        setPickupLoc(obj.pickupLoc);
        setDestination(obj.destination);
        setVehicleType(obj.vehicleType);
        console.log(obj);
        // console.log(rideId);

        setUpdate(true);
      });
  }, [obj]);

  return (
    <div className="wrapper">
      {pickupLoc !== null ? (
        <Card
          //img="https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          img="https://images.unsplash.com/photo-1630717285906-29364ffacea0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
          //title={rideDetails.restaurantname}
          description1={rideId}
          description={pickupLoc}
          description2={destination}
          description3={vehicleType}
        />
      ) : (
        <div>no details</div>
      )}
    </div>
  );
};

const Card = (props) => {
  const [jwt, setjwt] = useLocalState("", "jwt");

  function DriverDetails() {
    window.location.href = "/driverdetails";
  }

  return (
    <>
    <Header/>
    <div className="card">
      
      <div className="card__body">
        <img src={props.img} alt={props.img} class="card__image" />
        <h2 className="card__title">{props.title}</h2>
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
      <button className="card__btn" onClick={(e) => DriverDetails(e)}>
        Driver Details
      </button>
    </div>
    </>
  );
};

export default RideDetailsPage;
