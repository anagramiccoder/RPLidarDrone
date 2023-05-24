import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {
  const [count, setCount] = useState(0);
  var dataList=[];
  const [IP,setIP]=useState("http://192.168.4.1")
  const [fdata, setData] = useState({status:"No Connection"});
  const[motor,setMotor]=useState(0);
  const [gather, setgather] = useState(false);
  const toCsv = function (table) {
    // Query all rows
    const rows = table.querySelectorAll('tr');

    return [].slice
        .call(rows)
        .map(function (row) {
            // Query all cells
            const cells = row.querySelectorAll('th,td');
            return [].slice
                .call(cells)
                .map(function (cell) {
                    return cell.textContent;
                })
                .join(',');
        })
        .join('\n');
};
const table = document.getElementById('datatable');


const download = function (text, fileName) {
  const link = document.createElement('a');
  link.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`);
  link.setAttribute('download', fileName);

  link.style.display = 'none';
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

  return (
    <>
      <input id="ip"/> <br></br>
      <button onClick={()=>{
        fetch(IP+"/checkConnection").then((res=>{console.log(res); return res.json();})).then(data=>{
          console.log(data);
          setData(data[0]);
        });
      }}> Check Data</button>
      <button onClick={()=>{
      fetch(IP+"/turnMotor").then((res=>{console.log(res); return res.json();})).then(data=>{
          console.log(data);
          setMotor(data[0]["motor"]);
        });
      }
      }>
        Turn {motor==0?"on":"off"} motor
      </button>
      <br/>
      <button disabled={fdata.status=="No Connection"?true:false}>
        {gather?"Stop":"Start"} Gathering
      </button><br/>
      Connection Status:{fdata.status}<br/>
      Motor Status:{motor}
      <table id="datatable">
        <tr><th>Row</th><th>Time</th><th>Altitude</th><th>Distance</th><th>Angle</th></tr>
      </table>
      <button onClick={()=>{
         const csv = toCsv(document.getElementById('datatable'));

         // Download it
         download(csv, 'download.csv');
      }}>Export HTML Table To CSV File</button>
      </>
  );
}

export default App
