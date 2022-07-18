import React, { useState, useEffect } from "react";
import { useLocalState } from '../util/useLocalStorage';
import Logo from '../images/taxi-svgrepo-com.svg';


import {
  AppBar,
  Button,
  Tab,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Tabs } from "@material-ui/core";

const logo = {
  width: "50px",
  height: "50px",
}
const Header = () => {

    const [jwt, setjwt] = useLocalState("", "jwt");
    useEffect(()=> {
      setValue(window.location.pathname)
    })
    function handleChange(event){
     console.log(event.target.id, '--')
    //  setValue(event.target.id)
     if(event.target.id==="dashboard"){
      DashboardRequest();
     }
     else if(event.target.id==="bookingHistory"){
      BookingHistoryRequest();
     }
     else{
      UpdateProfileRequest();
     }
    }
    function LogOutRequest(){
        setjwt(null);
        window.location.pathname="/signinpage";
    }
    function BookingHistoryRequest() {
        window.location.pathname = "/bookinghistory";
    }
    function UpdateProfileRequest() {
        window.location.pathname = "/editprofile";
      }
    function DashboardRequest(){
        window.location.pathname = "/dashboard"
    }
  const [value, setValue] = useState("dashboard");
  const theme = useTheme();
  // console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(isMatch);
  // console.log(window.location.pathname);
  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
            <>
              <img style={logo} src = {Logo} alt="logo"/>
              <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              >
                <Tab value="/dashboard" id="dashboard" label="Dashboard" sx={{ marginLeft: "20px" }} />
                <Tab value="/bookinghistory" id="bookingHistory" label="Booking History" sx={{ marginLeft: "20px" }}/>
                <Tab value="/editprofile" id="updateProfile" label="Update Profile" sx={{ marginLeft: "20px" }}/>
              </Tabs>
              <Button sx={{ marginLeft: "auto" }} variant="contained" onClick={() => LogOutRequest()}>
              LogOut
              </Button>
            </>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;