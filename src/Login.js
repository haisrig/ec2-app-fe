import React, { useState } from 'react'
import {Grid, TextField, Button, makeStyles} from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const styles = makeStyles({
    btnRoot: {
        minWidth: 230
    }
})

function Alert(props) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = (props) => {
    const classes = styles()
    const {history} = props
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [valid, setValid] = useState(true)
    const onLogin = () => {
        const user = {
            username, password
        };
        console.log(user)
        axios.post(`http://localhost:8000/login`, { username, password })
        .then(res => {            
            history.push("/ec2/"+username)
        })
        .catch(err => {
            console.log("exception....")
            setValid(false)
        })       
    }
    
    return (
        <Grid container style={{minHeight: '100vh'}}>
            <Grid item sm={6}>
                <img src="https://cdn.helpsystems.com/styles/crop_general/storage-api-public/media/060518-am-blog-the-efficiency-perks-of-cloud-automation-1200x628_0.jpg?itok=sZvAhfqk" alt="automation"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </Grid>
            <Grid container item xs={12} sm={6} alignItems="center" direction="column" justify="space-between" style={{padding: 10}}>
                <div/>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 300, maxWidth: 400 }}>
                <Grid container justify="center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png" 
                    alt="ec2" 
                    width={100}/>
                </Grid>
            <TextField label="Username" margin="normal" autoComplete="off"
                onChange={(event) =>  { setUserName(event.target.value); setValid(true) }}
                error = {!valid}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <AccountBoxIcon color="secondary"/>
                        </InputAdornment>
                    ),
            }}/>
            <TextField label="Password" margin="normal" type="password" 
                onChange={(event) =>  { setPassword(event.target.value); setValid(true) }}
                error = {!valid}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <LockIcon  color="secondary" />
                    </InputAdornment>
                ),
            }}/>
            <div style={{ height: "20px"}}></div>
            <Button color="primary" variant="contained" classes={{ root: classes.btnRoot}} onClick={onLogin}>
                     Log In   
            </Button>
            </div>
            <Snackbar open={!valid} autoHideDuration={6000}>
                <Alert severity="error">
                    Invalid Username and Password
                </Alert>
            </Snackbar>
            <div/>
            </Grid>
            
        </Grid>
    )
}

export default Login