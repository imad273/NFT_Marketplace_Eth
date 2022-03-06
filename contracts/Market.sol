// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Market is ERC721 {

   struct Listing {
      uint tokenId;
      address owner;
      bytes32 title;
      bytes32 description;
      uint price;
      string image;
   }

   Listing[] public listingsArr;

   uint listingId = 0;

   mapping(uint => Listing) Listings;

   constructor (string memory name, string memory symbol) ERC721(name, symbol) {}

   function Mint(bytes32 _title, bytes32 _description, uint _price, string memory _image) public {
      Listing memory listing = Listing(
         listingId,
         msg.sender,
         _title,
         _description,
         _price,
         _image
      );

      Listings[listingId] = listing;

      listingsArr.push(listing);

      _safeMint(msg.sender, listingId);
      
      listingId++;
   }

   function buyToken(uint _tokenId, address payable _to) payable public {
      Listing storage listing = Listings[_tokenId];

      require(msg.value >= listing.price);
      require(msg.sender != listing.owner);

      _safeTransfer(listing.owner, msg.sender, _tokenId, "");

      _to.transfer(msg.value);

      listingsArr[_tokenId].owner = payable(msg.sender);

      listing.owner = msg.sender;
   }

   function findToken(uint _tokenId) public view returns (uint, bytes32, bytes32, uint, address, string memory) {
      Listing memory listing = Listings[_tokenId];
      
      return (
         listing.tokenId, 
         listing.title, 
         listing.description, 
         listing.price, 
         listing.owner, 
         listing.image
      ); 
   }
   
   
   function findAllToken() public view returns(Listing[] memory)  {
      return listingsArr; 
   }

   function findMyToken()  public view returns (uint256[] memory _myArts) {
      require(msg.sender != address(0));
      uint numOftokens = balanceOf(msg.sender);
       
      uint[] memory myArts = new uint[](numOftokens);
      
      uint256 idx = 0;
      uint256 arrLength = listingsArr.length;

      for (uint256 i = 0; i < arrLength; i++) {
         if (ownerOf(i) == msg.sender) {
            myArts[idx] = i;
            idx++;
         }
      }

      return myArts;
   }
}
