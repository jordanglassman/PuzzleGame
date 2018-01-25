pragma solidity ^0.4.18;


contract Bytes {
    bytes32 a;
    bytes32[] b;

    function getA() public view returns(bytes32)  {
        return a;
    }

    function setA(bytes32 someA) public {
        a = someA;
        b.push(a);
    }

    function setB() public view returns(bytes32[]){
        return b;
    }
}