import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Create from './Components/Create';
import Explore from './Components/Explore';
import { Routes, Route } from "react-router-dom";
import Web3 from 'web3';

function App() {

  const contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [Account, setAccount] = useState(0);
  const web3 = new Web3(Web3.givenProvider);

  useEffect(async () => {
    const accounts = await web3.eth.getAccounts();
    if(accounts.length > 0){
      setAccount(accounts[0]);
    }
    connectToContract();
  }, [Account]);

  const getAbi = async () => {
    var request = await fetch("./market.json", {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    });

    var response = await request.json();
    
    return response;
  }

  const connectToContract = async () => {
    const abiJSON = await getAbi();
    const contract = new web3.eth.Contract(abiJSON, contract_address);

    if(Account !== 0) {
      const balance = await contract.methods.balanceOf(Account).call();
      const token = await contract.methods.findToken(0).call();
      const allToken = await contract.methods.findAllToken().call();
      console.log(allToken);

      /* if(balance > 0) {
        console.log(token);
      } else {
        console.log("you dont't have any balance");
      } */
    } else {
      console.log("Please Connect to your wallet")
    }
  }

  return (
    <div className="App">
      <div className='container text-white px-2'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;