pragma solidity ^0.4.13;
import './AbstractENS.sol';


/// @title HappyEns contract that maps ens domain names to ipfs hashes
/// @author Collin Chin

 contract HappyEns {

     AbstractENS ens;
     //Hardcoded NameHash of .eth
     bytes32 rootNode = 0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae;
     mapping (string => Website) websites;

     struct Website {
         address owner;
         string ipfsHash;
     }

     event LogNewRegister(address ensOwner, string domain, string ipfsHash);

     /// @dev Constructor
     /// @param ensAddr address of deployed ens contracts
     function HappyEns(AbstractENS ensAddr) public {
         ens = ensAddr;
     }


     /// @dev sets ens domain name to struct of domain owner and ipfs hash
     /// @param _domain ens domain name ex: vitalik (no ".eth" !)
     /// @param _hash ipfs hash of website
     /// `msg.sender = owner of domain`
     function set(string _domain, string _hash)
     public
     {
        /*address ensAddress = 0x314159265dD8dbb310642f98f50C066173C1259b;*/
        var node = sha3(rootNode, _domain);
        var currentOwner = ens.owner(node);
        // if the owner of the ENS domain is the function caller, store the hash
        if (currentOwner == msg.sender) {
            websites[_domain] = Website({
                owner : msg.sender,
                ipfsHash : _hash
            });
            LogNewRegister(msg.sender, _domain, _hash);
        }
     }

     /// @dev gets external account from ens domain name
     /// @param _domain ens domain name
     /// @return bytes32 address of owner
     function getOwner(string _domain) public constant returns(address){
         //Hardcoded NameHash of .eth
         bytes32 node = sha3(rootNode, sha3(_domain));
         return ens.owner(node);
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
