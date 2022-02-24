import React from 'react';
import homeIMG from '../img/home.png';
import nft1 from '../img/nft1.png';
import nft2 from '../img/nft2.jpg';

function Home() {

   return (
      <div>
         <div className='font-body flex justify-center items-center flex-wrap md:flex-nowrap py-6'>
            <div>
               <h1 className='font-header font-semibold text-5xl py-2 leading-tight'>Get ready to buy extraordinary NFTs</h1>
               <p className='text-sm text-gray-200 py-2 md:w-5/6'>Is the easiets way to keep track of your NFT collection and discover new assets from the world's first and largest.</p>
               <div className='flex flex-wrap md:flex-nowrap mt-8'>
                  <div className='flex w-full md:mr-2'>
                     <img src={nft1} className="w-28 h-24 rounded-2xl" alt="" />
                     <div className='w-full ml-4 flex flex-col justify-between'>
                        <h3 className='text-sm'>Grablazzerial</h3>
                        <div className='flex justify-between items-center py-1.5 px-4 rounded-3xl border border-[rgba(255,255,255,.3)] bg-[rgba(255,255,255,.05)] backdrop-blur-sm'>
                           <div>
                              <span className="text-xs text-gray-400">last Price</span>
                              <p className="text-xs">1.0 ETH</p>
                           </div>
                           <a href='#' className='ml-3.5 rounded-full px-3 py-1 border border-white text-sm text-white bg-primary'>Bid</a>
                        </div>
                     </div>
                  </div>
                  <div className='w-full flex mt-4 md:ml-2 md:mt-0'>
                     <img src={nft2} className="w-28 h-24 rounded-2xl" alt="" />
                     <div className='w-full ml-4 flex flex-col justify-between'>
                        <h3 className='text-sm'>Drove no.7</h3>
                        <div className='flex justify-between items-center py-1.5 px-4 rounded-3xl border border-[rgba(255,255,255,.3)] bg-[rgba(255,255,255,.05)] backdrop-blur-sm'>
                           <div>
                              <span className="text-xs text-gray-400">last Price</span>
                              <p className="text-xs">1.0 ETH</p>
                           </div>
                           <a href='#' className='ml-3.5 font-semibold rounded-full px-3 py-1 border border-white text-sm text-white bg-primary'>Bid</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div>
               <img src={homeIMG} className='w-full my-5' />
            </div>
         </div>
         <div className=''>
            <h1 className='font-header text-center font-semibold text-4xl py-2'>Create and sell your NFTs</h1>
            <div className='flex flex-wrap md:flex-nowrap py-8'>
               <div className='m-2 flex flex-col justify-center items-center py-1.5 px-4 rounded-3xl border border-[rgba(255,255,255,.3)] bg-[rgba(255,255,255,.05)] backdrop-blur-sm'>
                  <div className='pt-2'>
                     <box-icon type='solid' name='wallet-alt' size='md' color='#12f0ed' />
                  </div>
                  <h3 className='font-semibold text-center text-xl my-1'>Set up your wallet</h3>
                  <p className='text-center text-white/60 text-sm py-2'>Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the <a href='#' className='text-primary font-bold'>wallets we support</a>.</p>
               </div>
               <div className='m-2 flex flex-col justify-center items-center py-1.5 px-4 rounded-3xl border border-[rgba(255,255,255,.3)] bg-[rgba(255,255,255,.05)] backdrop-blur-sm'>
                  <div className='pt-2'>
                     <box-icon type='solid' name='collection' size='md' color='#12f0ed'></box-icon>
                  </div>
                  <h3 className='font-semibold text-center text-xl my-1'>Create your collection</h3>
                  <p className='text-center text-white/60 text-sm py-2'>Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.</p>
               </div>
               <div className='m-2 flex flex-col justify-center items-center py-1.5 px-4 rounded-3xl border border-[rgba(255,255,255,.3)] bg-[rgba(255,255,255,.05)] backdrop-blur-sm'>
                  <div className='pt-2'>
                     <box-icon type='solid' name='image-alt' size='md' color='#12f0ed' />
                  </div>
                  <h3 className='font-semibold text-center text-xl my-1'>Add your NFTs</h3>
                  <p className='text-center text-white/60 text-sm py-2'>Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content.</p>
               </div>
               <div className='m-2 flex flex-col justify-center items-center py-1.5 px-4 rounded-3xl border border-[rgba(255,255,255,.3)] bg-[rgba(255,255,255,.05)] backdrop-blur-sm'>
                  <div className='pt-2'>
                     <box-icon type='solid' name='purchase-tag' size='md' color='#12f0ed' />
                  </div>
                  <h3 className='font-semibold text-center text-xl my-1'>List them for sale</h3>
                  <p className='text-center text-white/60 text-sm py-2'>Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!</p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Home;