import { useLocation } from "react-router";
import { React, useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import { Button } from "@mui/material";

export default function Buzzer() {
    const {state} = useLocation()
    const {id} = state;
    const {user} = state;
    const [background, setBackground] = useState("#000000");
    const [cooldown, setCooldown] = useState(true);
    const [result, setResult] = useState("");
    const client = new W3CWebSocket('ws://127.0.0.1:8000');
    useEffect(() => {
        client.onopen = () => {
          var joinMsg = {"type": "join", "player":state}
          client.send(JSON.stringify(joinMsg));
          console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
          var signal = JSON.parse(message.data);
          if (signal.type === "congratulations") {
            setBackground("green");
            setResult("The winner is " + user);
          } else if (signal.type === "err") {
            setCooldown(false);
            setBackground("#e5f505")
            setResult("Too Early!")
            setTimeout(() => {
              setResult("");
              setBackground("#000000");
            }, 500)
            // setTimeout(() => {
            //   setBackground("#000000")
            // }, 500);
            setTimeout(()=> {
              setCooldown(true);
            })
          } else if (signal.type === "winner") {
            setBackground("red");
            setResult("The winner is " + signal.content)
          } else if(signal.type === "reset") {
            // console.log("received restet")
            setBackground("#000000")
            setResult("")
          }
        };  
      }) 
    const buzzer = () => {
        var message = {"type": "buzz", "player": state}
        client.send(JSON.stringify(message))  
    }
    return (
        <div style={{backgroundColor: `${background}`, textAlign: "center", height:"100vh"}}> 
         {cooldown && <Button
          style={{backgroundColor: '#2a4269', color: '#ffffff'}}
            onClick = {buzzer}
          >Buzz</Button> }
            <div style={{color: "black"}}>
                {`${result}`}
            </div>
        </div>
    );
}