import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {
  const [count, setCount] = useState(0);
  const [IP,setIP]=useState("192.168.4.1")
  const [fdata, setData] = useState({status:"No Connection"});
  async function getData (cmd){
          await fetch("https://the-trivia-api.com/v2/questions?limit=1").then((res=>res.json())).then(data=>{console.log(data);setData(data[0])});
          // set state when the data received
        
  };
  return (
    <>
      <input id="ip"/> <br></br>
      <button onClick={()=>{getData("/checkConnection")}}> Check Data</button><br/>
      {fdata.hasOwnProperty("status")?fdata.status:fdata["question"]["text"]}
      </>
  );
}

export default App
