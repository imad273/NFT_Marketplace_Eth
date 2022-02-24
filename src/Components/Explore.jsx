import React from 'react';
import { useState, useEffect } from 'react';
import Web3 from 'web3';

function Explore() {

  const [Tokens, setToken] = useState([]);
  const [Account, setAccount] = useState(0);

  var web3 = new Web3(Web3.givenProvider);
  const contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  useEffect(async () => {
    const getAccount = await web3.eth.getAccounts();
    if (getAccount.length > 0) {
      setAccount(getAccount[0]);
    }
    FindTokens();
  }, []);

  const connectToMetamask = async () => {
    const requestAccount = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAccount(requestAccount);
  }

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

  const FindTokens = async () => {
    let p = document.createElement("p");
    p.innerHTML = "Waite";
    let tokensHtml = document.getElementById('tokens');
    tokensHtml.appendChild(p);
    const abiJSON = await getAbi();
    const contract = new web3.eth.Contract(abiJSON, contract_address);
    const getTokens = await contract.methods.findAllToken().call();

    if (getTokens.length > 0) {
      setToken(getTokens);
    } else {
      setToken(["No Token"]);
    }
    tokensHtml.removeChild(p)
  }

  const buyToken = async (_id) => {
    const abiJSON = await getAbi();
    const contract = new web3.eth.Contract(abiJSON, contract_address);
    const buyFunc = await contract.methods.buyToken(_id, Account).send({ from: Account, value: 2e17 });
    console.log(buyFunc);
  }

  return (
    <div>
      <div className='py-4 flex flex-wrap justify-center' id='tokens'>
        { Tokens[0] === "No Token" ?
          <p>There's No tokens to show</p> :
          Tokens.map((token, i) => {
            return (
              <div className='m-2 flex flex-col justify-center items-center py-1.5 px-4 rounded-3xl border border-[rgba(255,255,255,.3)] bg-[rgba(255,255,255,.05)] backdrop-blur-sm' key={i}>
                <img src={token.image} className="w-48 h-36 rounded-3xl" alt={`image n=${i}`} />
                <h1 className='font-bold text-2xl py-2'>{web3.utils.hexToUtf8(token.title)}</h1>
                <p className='w-48 py-2 truncate'>{web3.utils.hexToUtf8(token.description)}</p>
                <p>{token.price / 1e18} ETH</p>
                {Account !== 0 ?
                  <button onClick={() => { buyToken(token.tokenId) }} className='bg-primary w-full rounded-3xl py-1.5 my-2'>Buy</button>
                  :
                  <button onClick={() => { connectToMetamask() }} className='bg-primary w-full rounded-3xl py-1.5 my-2'>Conect to wallet</button>
                }
              </div>
          )})
        }
      </div>
    </div>
  )
}

export default Explore;