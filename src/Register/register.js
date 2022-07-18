import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Grid, Paper, Link } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const paperStyle = {
  padding: 20,
  height: '70vh',
  width: 300,
  margin: "20px auto"
}

const passwordStyle={
  paddingbottom: 20
}
const Register = () => {
  const regal= React.useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jwt, setjwt] = useLocalState("", "jwt");

  function signUpRequest() {
    if(regal.current.reportValidity()){
      
    
    const data = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    };

    fetch("/api/auth/signup", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else return Promise.reject("Invalid SignUp attempt");
      })
      .then(([body, headers]) => {
        setjwt(headers.get("authorization"));
        // console.log(body.city);
        window.location.href = "/signinpage";
      })
      .catch((message) => {
        alert(message);
      });
    }
  }

  return (
    <>
      <Paper elevation={10} style={paperStyle}>
        <form ref={regal}>
        <Grid container direction={"column"} spacing={5}>
                <Grid item align='center'>
                <h2> Register </h2>
                </Grid>
                <Grid item> <TextField label='Email' placeholder='Enter Email' fullWidth required onChange={(event) => setUsername(event.target.value)}></TextField> </Grid>
                <Grid item> <TextField label='Password' placeholder='Enter Passddword' type='password' fullWidth required style={passwordStyle} onChange={(event) => setPassword(event.target.value)}></TextField> </Grid>
                <Grid item> <TextField label='First Name' placeholder='Enter First Name' fullWidth required onChange={(event) => setFirstName(event.target.value)}></TextField> </Grid>
                <Grid item> <TextField label='Last Name' placeholder='Enter Last Name' fullWidth required onChange={(event) => setLastName(event.target.value)}></TextField> </Grid>
                <Grid item> <Button color='primary' variant='contained' fullWidth onClick={() => { regal.current.reportValidity(); signUpRequest();}}> Sign Up</Button> </Grid>
                <Grid container direction={"column"} spacing={1.8}>
                <Grid item align='center'> <Typography> Already have an account? <Link href ="/signinpage">  SignIn </Link></Typography> </Grid>
                </Grid>
        </Grid>
        </form>
        </Paper> 
    </>
  );
};

export default Register;
