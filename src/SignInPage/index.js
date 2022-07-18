import { Grid, Paper, Link } from '@material-ui/core';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useLocalState } from '../util/useLocalStorage';
const SignInPage = () => {
  const regal = React.useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setjwt] = useLocalState("", "jwt");
    const paperStyle = {
        padding: 20,
        height: '64vh',
        width: 300,
        margin: "20px auto"
    }
    const avatarStyle={
        backgroundColor:'green'
    }
    const passwordStyle={
        paddingbottom: 20
    }

    function sendLoginRequest(){
            
        const data = {
          username: username,
          password: password,
        }
        if(regal.current.reportValidity()){
        fetch("api/auth/login",{
          headers:{
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify(data)
        }).then(response => {
          if(response.status === 200)
           return Promise.all([response.json(), response.headers]);
          else
                console.log(username+"--"+password);
              return Promise.reject("Invalid Login attempt");  
          })
          .then(([body,headers]) => {
            setjwt(headers.get("authorization"));
            // console.log(body.);
            window.location.href = "dashboard";
          }).catch((message) => {
              alert(message);
          });
        }
        
       }
    return (
        <Paper elevation={10} style={paperStyle}>
          <form ref={regal}>
        <Grid container direction={"column"} spacing={5}>
                <Grid item align='center'>
                <h2> SignIn </h2>
                </Grid>
                <Grid item> <TextField label='Email' placeholder='Enter Email' fullWidth required onChange={(event) => setUsername(event.target.value)}></TextField> </Grid>
                <Grid item> <TextField label='Password' placeholder='Enter Password' type='password' fullWidth required style={passwordStyle} onChange={(event) => setPassword(event.target.value)}></TextField> </Grid>
                <Grid item> <Button color='primary' variant='contained' fullWidth onClick={() => { regal.current.reportValidity(); sendLoginRequest();}}> Sign In</Button> </Grid>
                <Grid container direction={"column"} spacing={1.8}>
                <Grid item align='center'> <Typography> Didn't have an account? <Link href ="/signup">  SignUp </Link></Typography> </Grid>
                </Grid>
        </Grid>
        </form>
        </Paper> 
    );
};

export default SignInPage;