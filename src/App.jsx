import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {
  const [count, setCount] = useState(0);
  var dataList=[];
  const [IP,setIP]=useState("192.168.4.1")
  const [fdata, setData] = useState({status:"No Connection"});
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
  function getData (cmd){
            fetch("https://the-trivia-api.com/v2/questions?limit=1").then((res=>res.json())).then(data=>{
              console.log(dataList.length);
              dataList.push(data[0]);
              document.getElementById("datatable").innerHTML+='<tr><td>'+data[0]["question"]["text"]+'</td><td>'+ data[0]["correctAnswer"]+'</td></tr>'});
            
            // set state when the data received
        
  };
  return (
    <>
      <input id="ip"/> <br></br>
      <button onClick={()=>{getData("/checkConnection")}}> Check Data</button>
      <button onClick={()=>{
         const csv = toCsv(document.getElementById('datatable'));

         // Download it
         download(csv, 'download.csv');
      }}>Export HTML Table To CSV File</button>
      {dataList.length}
      <table id="datatable">
        <tr><th>R1</th><th>r2</th></tr>
      </table>
      
      </>
  );
}

export default App
