import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import App from './App';
import Player from './routes/Player'
import About from './routes/About'
import Buzzer from './routes/Buzzer'
import Moderator from './routes/Moderator'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/player" element={<Player/>}/>
      <Route path="/moderator" element={<Moderator/>}/>
      <Route path="/about" element={<About />} />
      <Route path="/buzzer" element={<Buzzer />} />
    </Routes>
  </BrowserRouter>
);

