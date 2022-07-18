// import * as React from 'react';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocalState } from "../util/useLocalStorage";
import "./Dashboard.css";

import Header from "../Components/header";
import { Paper, Typography } from "@material-ui/core";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';
import { color } from "@mui/system";



const Dashboard = () => {
  const regal = React.useRef();
  const [pickupLoc, setPickupLoc] = useState("", "pl");
  const [destination, setDestination] = useState("", "d");
  // const [vehicleType, setVehicleType] = useState("", "vt");

  const [jwt, setjwt] = useLocalState("", "jwt");

  
  const [vehicleType, setVehicleType] = React.useState('Car')

  const handleChange = (event) => {
    setVehicleType(event.target.value);
  }
  const paperStyle = {
    width: 380,
    margin: "90px auto",
    minHeight: "30vh"

  };
  function RidenowRequest() {
    const data = {
      pickupLoc: pickupLoc,
      destination: destination,
      vehicleType: vehicleType,
    };
    if(regal.current.reportValidity()){
    fetch("/api/newRide", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((window.location.href = "rideDetails"));
    }
  } 
  
  return (
    <>
    <Header/>
        <Paper style={paperStyle}>
        <form ref={regal}>
      <Typography variant='h2'>
        {/* Book a Ride */}
      </Typography>
       <FormControl sx={{ m: 1, minWidth: 170 }}>
        <InputLabel id="demo-controlled-open-select-label">Pick-Up Location</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={pickupLoc}
          onChange={(e) => setPickupLoc(e.target.value)}
          autoWidth
          label="pickupLoc"
          required
        >
          <MenuItem value={"Richmond Circle"}>Richmond Circle</MenuItem>
          <MenuItem value={"Bangalore"}>Bangalore</MenuItem>
          <MenuItem value={"Koramangala"}>Koramangala</MenuItem>
        </Select>
       </FormControl>

    <FormControl sx={{ m: 1, minWidth: 160 }}>
        <InputLabel id="demo-controlled-open-select-label">Destination</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          autoWidth
          label="destination"
          required
        >
          <MenuItem value={"Garuda Mall"}>Garuda Mall</MenuItem>
          <MenuItem value={"Hyderabad"}>Hyderabad</MenuItem>
          <MenuItem value={"Electronic City"}>Electronic City</MenuItem>
        </Select>
      </FormControl>
        
      <FormControl sx={{ m: 1, minWidth: 160 }}>
      <FormLabel id="demo-row-radio-buttons-group-label">Vehicle Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={vehicleType}
        onChange={ handleChange}
        // setVehicleType(e.target.value);
      >
        <FormControlLabel value="Car" control={<Radio />} label="Car" />
        <FormControlLabel value="Auto" control={<Radio />} label="Auto" />
        <FormControlLabel value="Bike" control={<Radio />} label="Bike" />
      </RadioGroup>
    </FormControl>
    
      <div className="buttonclass">
      <button id="newRide" type="button" class="button" onClick={() => { regal.current.reportValidity(); RidenowRequest();}}>
          {" "}
          Ridenow{" "}
        </button>
      </div>
      </form>
      </Paper>
    </>
  );
};

export default Dashboard;
