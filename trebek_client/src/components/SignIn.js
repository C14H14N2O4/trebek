import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {v4 as uuidv4 } from 'uuid';
import { Button, Stack } from '@mui/material';

export default function SignIn() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [id, setId] = useState(uuidv4());
    const [redirect, setRedirect] = useState(false);
    function handleSubmit(evt) {
        evt.preventDefault();
        navigate('/buzzer', {state: {id: id, user: user}});
    }
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            style = {{textAlign: 'center'}}>
            <Stack spacing = {2}>
            <div></div>
            <TextField 
            sx={{input : {color: 'white', textAlign: 'center'}}}
            onChange={e => setUser(e.target.value)}
            id='outlined-basic' 
            label="Name" 
            variant='outlined' 
            color="success" 
            focused style={{backgroundColor: '#2a4269', color: '#ffffff', maxWidth: '100%'}}/>
            <Button onClick={handleSubmit} style={{textAlign: "center", backgroundColor: '#2a4269', color: "#ffffff"}}>Play</Button>
            </Stack>
            </Box>
    )
}