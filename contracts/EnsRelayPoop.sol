pragma solidity ^0.4.13;

/// @title EnsRelay contract that maps ens domain names to ipfs hashes

 contract EnsRelayPoop {

     mapping (string => Website) websites;

     struct Website {
         address owner;
         string ipfsHash;
     }

     event LogSuccess(bool meh);

     /// @dev sets ens domain name to struct of domain owner and ipfs hash
     /// @param _domain ens domain name ex: vitalik (no ".eth" !)
     /// @param _hash ipfs hash of website
     /// `msg.sender = owner of domain`
     function set(string _domain, string _hash) public {

        // if the owner of the ENS domain is the function caller, store the hash
        websites[_domain] = Website({
            owner : msg.sender,
            ipfsHash : _hash
        });

        LogSuccess(true);
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
