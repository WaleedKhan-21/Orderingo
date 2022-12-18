import './App.css';
import "../src/Components/css/bootstrap.min.css"
import "../src/Components/css/layout.css"
import {BrowserRouter  } from "react-router-dom"
import Paths from './Components/Routes/Paths';


function App() {
  return (
    <>
 <BrowserRouter>
 <Paths/>
 </BrowserRouter>
    </>
  );
}

export default App;
