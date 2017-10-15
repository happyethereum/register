pragma solidity ^0.4.13;
import './AbstractENS.sol';

/// @title EnsRelay contract that maps ens domain names to ipfs hashes
/// @author Collin Chin

 contract EnsRelay {
     AbstractENS ens;
     mapping (string => Website) websites;

     struct Website {
         address owner;
         string ipfsHash;
     }

     event LogNameHash(address accountAddress);

     event LogSuccess(bool meh);

     /// @dev Constructor
     /// @param ensAddr address of deployed ens contracts
     function EnsRelay(AbstractENS ensAddr) public {
         ens = ensAddr;
     }


     /// @dev sets ens domain name to struct of domain owner and ipfs hash
     /// @param _domain ens domain name ex: vitalik (no ".eth" !)
     /// @param _hash ipfs hash of website
     /// `msg.sender = owner of domain`
     function set(string _domain, string _hash) public returns (address){
        /*address ensAddress = 0xAAb0c0DC13bFF409642230eF70fd3532461022ce;*/

        //Hardcoded NameHash
        bytes32 namehash = 0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae;
        bytes32 subnode = sha3(namehash, sha3(_domain));
        address ensOwner = ens.owner(subnode);
        /*bytes32 remainder = sha3('eth');
        bytes32 domain = sha3(_domain);
        bytes32 node = sha3(remainder, domain);
        address ensOwner = ens.owner(node);
        LogNameHash(ensOwner);*/

        // if the owner of the ENS domain is the function caller, store the hash
        if (ensOwner == msg.sender) {
            websites[_domain] = Website({
                owner : msg.sender,
                ipfsHash : _hash
            });
            LogSuccess(true);
        }
        return ensOwner;
     }

     function getOwner(string _domain) public constant returns(address){
         //Hardcoded NameHash
         bytes32 namehash = 0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae;
         bytes32 subnode = sha3(namehash, sha3(_domain));
         address ensOwner = ens.owner(subnode);
         return ensOwner;
     }

    /// @dev gets ipfsHash from ens domain name
    /// @param _domain ens domain name
    /// @return ipfsHash
     function get(string _domain)
     public
     constant
     returns (string)
     {
         return websites[_domain].ipfsHash;
     }
 }
