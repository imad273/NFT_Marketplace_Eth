import React from 'react';
import { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import boxicons from 'boxicons';
import Web3 from 'web3';

function Navbar() {

  const [Account, setAccount] = useState(0);

  useEffect(async () => {
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    }
  }, [Account]);

  const connectToMetamask = async () => {
    const requestAccount = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAccount(requestAccount);
  }

  return (
    <nav className='py-3 flex justify-between items-center flex-col sm:flex-row'>
      <div>
        <Link to='/' className='font-header font-semibold uppercase text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-primary '>Sphere <span className='font-semibold'>Art</span></Link>
      </div>
      <div className='font-body'>
        <Link className='mx-3 text-gray-300 font-semibold duration-300 hover:text-white' to='/explore'>Explore</Link>
        <a className='mx-3 text-gray-300 font-semibold duration-300 hover:text-white' href='#'>State</a>
        <Link className='mx-3 text-gray-300 font-semibold duration-300 hover:text-white' to='/Create'>Create</Link>
      </div>
      <div>
        { Account === 0 ?
          <div className='cursor-pointer' onClick={() => { connectToMetamask() }}>
            <box-icon type='solid' name='wallet-alt' color='rgb(209 213 219 / 1)' />
          </div>
          : 
          Account.slice(0, 6) + `...` + Account.slice(-5)
        }
      </div>
    </nav>
  );
}

export default Navbar;