import React from 'react';
import { useState } from 'react';
import Web3 from 'web3';
import { create } from 'ipfs-http-client';


function Create() {

  const [ImgName, setImgName] = useState("");
  const [File, setFile] = useState("");
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");

  const contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  async function showInputImgName(e) {
    setImgName(e.target.files[0].name);
    setFile(e.target.files[0]);
  }

  const showErr = (Msg = null) => {
    let errMsg = document.getElementById("errorMsg");
    if (Msg !== null) {
      errMsg.classList.add("py-1.5");
      errMsg.innerHTML = Msg;
    } else {
      errMsg.classList.remove("py-1.5");
      errMsg.innerHTML = "";
    }
  }

  const showSucc = (Msg = null) => {
    let succMsg = document.getElementById("succMsg");
    if (Msg !== null) {
      succMsg.classList.add("py-1.5");
      succMsg.innerHTML = Msg;
    } else {
      succMsg.classList.remove("py-1.5");
      succMsg.innerHTML = "";
    }
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

  const Mint = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts();

    if (accounts.length > 0) {
      const account = accounts[0];
      const abiJSON = await getAbi();
      const contract = new web3.eth.Contract(abiJSON, contract_address);

      if (Name !== "" && Description !== "") {
        var _title = web3.utils.asciiToHex(Name);
        var _description = web3.utils.asciiToHex(Description);

        if (ImgName !== "") {
          try {
            const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
            const cid = await ipfs.add(File);
            let _image = `https://ipfs.infura.io/ipfs/${cid.path}`;
            let _price = web3.utils.toWei("0.2", "ether");
            const mint = await contract.methods.Mint(_title, _description, _price, _image).send({ from: account });
            // hide error messages if there's any one
            showErr();
            // Show success messages
            showSucc("Success upload");
            console.log(mint);
          } catch (err) {
            showErr("Something happen! Try again");
            console.log(err);
          }
        } else {
          // hide success messages if there's any one
          showErr();
          showErr("Please! select an image");
        }
      } else {
        // hide success messages if there's any one
        showErr();
        showErr("Please! Complete the Form");
      }
    } else {
      // hide success messages if there's any one
      showErr();
      showErr("Connect to your wallet first");
    }
  }

  return (

    <div className='py-4'>
      <h1 className='font-header text-center font-semibold text-4xl py-3'>Create New Item</h1>

      <div id="errorMsg" className='bg-red-600 px-3 my-3 rounded-lg'></div>
      <div id="succMsg" className='bg-green-500 px-3 my-3 rounded-lg'></div>

      <form onSubmit={(e) => { e.preventDefault() }} >
        <div className='flex flex-col'>
          <label>Name <span className='text-red-500'>*</span></label>
          <input value={Name} type="text" className='outline-none px-2 py-1 my-2 rounded-lg border border-[rgba(255,255,255,.3)] bg-[rgba(255,255,255,.05)] backdrop-blur-sm' placeholder='Item name' onChange={(e) => { setName(e.target.value) }} />
        </div>
        <div className='flex flex-col'>
          <label>Description <span className='text-red-500'>*</span></label>
          <textarea value={Description} rows="5" className='outline-none px-2 py-1 my-2 rounded-lg border border-[rgba(255,255,255,.3)] bg-[rgba(255,255,255,.05)] backdrop-blur-sm' placeholder='Provide a detailed description of your item' onChange={(e) => { setDescription(e.target.value) }} />
        </div>
        <div className='flex flex-col'>
          <label>Image or 3D Model</label>
          <p className='py-2 text-sm'>{ImgName}</p>
          <div className="my-4">
            <div className="flex items-center justify-center">
              <label className="flex flex-col cursor-pointer rounded-lg border border-[rgba(255,255,255,.3)] bg-[rgba(255,255,255,.05)] backdrop-blur-sm">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinecap="round" strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Attach a file</p>
                </div>
                <input type="file" id='img' onChange={showInputImgName} className="opacity-0" />
              </label>
            </div>
          </div>
        </div>
        <div className='flex justify-end mt-2'>
          <button onClick={() => { Mint() }} className='bg-primary py-2 px-3 font-semibold rounded-lg border border-[rgba(255,255,255,.3)]'>Create</button>
        </div>
      </form>
    </div>
  )
}

export default Create