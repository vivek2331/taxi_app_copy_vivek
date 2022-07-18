import React, { useEffect, useState } from "react";
import Header from "../Components/header";
import { useLocalState } from "../util/useLocalStorage";

const DriverDetails = () => {
  const [jwt, setjwt] = useLocalState("", "jwt");
  const [driverDetails, setDriverDetails] = new useState(null);
  useEffect(() => {
    fetch("api/driverDetails", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((driversData) => {
        setDriverDetails(driversData);
      });
  }, []);
  return (
    <div className="wrapper">
      <Header/>
      {driverDetails ? (
        driverDetails.map((driver) => (
          <Card
            img="https://images.unsplash.com/photo-1630717285906-29364ffacea0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
            description1={driver.id}
            description={driver.name}
            description2={driver.phoneNumber}
            description3={driver.status}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

const Card = (props) => {
  return (
    <div className="card">
      <div className="card__body">
        <img src={props.img} alt={props.img} class="card__image" />
        <p className="card__description">
          <h4>Driver Id:</h4>
          {props.description1}
        </p>
        <p className="card__description">
          <h4>Driver Name:</h4>
          {props.description}
        </p>
        <p className="card__description">
          <h4>Phone Number:</h4>
          {props.description2}
        </p>
        <p className="card__description">
          <h4>Ride Status:</h4>
          {props.description3}
        </p>
      </div>
    </div>
  );
};

export default DriverDetails;
