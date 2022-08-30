import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreenComponent from "./screen/loginScreen";
import MainScreen from "./screen/mainScreen";
import RegsisterComponent from './screen/register';
import { io } from "socket.io-client";
const socket = io("http://localhost:3001/",{ autoConnect: false });


function App() {
  

  

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreenComponent />} />
          <Route path="/register" element={<RegsisterComponent />} />
          <Route path="/home" element={<MainScreen socket={socket} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
