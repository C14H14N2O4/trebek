import React, { useState } from 'react';
import { useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {v4 as uuidv4 } from 'uuid';



export default function Moderator() {
    const client = new W3CWebSocket('ws://127.0.0.1:8000');
    const [result, setResult] = useState("");
    const [user, setUser] = useState("SecretModeratorName");
    const [id, setId] = useState(uuidv4());
    useEffect(() => {
        client.onopen = () => {
            var joinMsg = {"type": "join", "player":{id: id, user: user}}
            client.send(JSON.stringify(joinMsg));
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (message) => {
            var signal = JSON.parse(message.data);
            if (signal.type === "winner") {
                setResult("The winner is " + signal.content);
            }
        };
    })

    const start = () => {
        var message = {"type": "start"}
        client.send(JSON.stringify(message))
    }

    const reset = () => {
        var message = {"type": "reset"}
        setResult("");
        client.send(JSON.stringify(message))
    }

    return (
        <div> 
            <button onClick = {start}>
                Start
            </button>
           <button onClick = {reset}>
                Reset
           </button>
           <div style={{color: "white"}}>
                {`${result}`}
            </div>
        </div>
    );
}