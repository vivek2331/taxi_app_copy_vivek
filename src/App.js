
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Homepage from './Homepage';

import PrivateRoute from './PrivateRoute/PrivateRoute';
import EditProfile from './EditProfile';
import RideDetailsPage from './RideDetailsPage';
import BookingHistory from './BookingHistory';
import DriverDetails from './DriverDetails';
import Register from './Register/register';
import SignInPage from './SignInPage';
function App() {
  
  return (
   <Routes>
    <Route exact path="/dashboard"element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
    <Route exact path="/rideDetails" element={<PrivateRoute><RideDetailsPage/></PrivateRoute>}/>
    <Route exact path="/bookinghistory" element={<PrivateRoute><BookingHistory/></PrivateRoute>} />
    <Route exact path="/driverdetails" element={<PrivateRoute><DriverDetails/></PrivateRoute>} />
    <Route exact path= "/" element={<Homepage />} />
    
    <Route exact path="/signup" element={<Register />}/>
    <Route exact path="/signinpage" element={<SignInPage/>} />
    <Route exact path="/editprofile" element={<EditProfile/>} />
   </Routes>
  );
  
}

export default App;
