// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./CustomDAI.sol";
import "./ORK Token.sol";

contract Bank{
    CustomDAI public customDAI;
    ORKToken public orkToken;
    address public owner;

    address[] public stackers;

    mapping(address =>uint)public stackAmt;

    mapping(address =>bool)public isStacked;

    constructor(CustomDAI _customDAI,ORKToken _orkToken){
        customDAI = _customDAI;
        orkToken =_orkToken;
        owner=msg.sender;
    }

    function stack(uint _amt)public{
        require(_amt >0, "Less amount !");
        stackAmt[msg.sender]+= _amt;
        isStacked[msg.sender]=true;
        stackers.push(msg.sender);
        customDAI.transferFrom(msg.sender, address(this), _amt);
    }

    function unStack()public{
        require(isStacked[msg.sender],"Not stacker !");
        uint value =stackAmt[msg.sender];
        stackAmt[msg.sender]=0;
        isStacked[msg.sender]=false;
        customDAI.transfer(msg.sender,value);

    }

    function issueTocken()public {
        require(msg.sender == owner, "Not a Owner");
        for(uint i=0; i<stackers.length;i++){
            address stacker = stackers[i];
            uint amt = stackAmt[stacker];
            orkToken.transfer(stacker,amt);
        }
    }
}