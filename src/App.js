import React, { Component } from 'react'
import EnsRelayContract from '../build/contracts/EnsRelayPoop.json'
// import getWeb3 from './utils/getWeb3'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Connect } from 'uport-connect'
import Web3 from 'web3'
const ENS = require('ethereum-ens');

import { Input, Label, Grid, Rail, Segment} from 'semantic-ui-react';

import './App.css';


const styles = {
  main: {
    textAlign: 'center',
    fontFamily: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
  },
  submit:{
    margin: '20px'
  },
  content: {
    margin: '20px'
  },
  title: {

  }
}

class App extends Component {
  constructor(props) {
    super(props)
    const self = this;
    self.state = {
      storageValue: 0,
      web3: null,
      account: '',
      EnsRelay:null
    };
    self.handleChange = self.handleChange.bind(self);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined' && typeof web3 !== null) {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      console.log('Injected web3 detected.');
      // Instantiate contract once web3 provided.

    //   this.setState({account: web3.eth.accounts[0], web3: web3})
    //   this.setState({web3: web3})
      this.state.web3 = web3
    }
    this.instantiateContract();

    /*
    getWeb3
    .then(results => {
      console.log("results", results);

      this.setState({
        web3: results.web3,
        account: results.web3.eth.accounts[0]
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')

    })
    */
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */



    const contract = require('truffle-contract')
    const EnsRelay = contract(EnsRelayContract)

    EnsRelay.setProvider(this.state.web3.currentProvider)

    console.log(EnsRelay.at('0x7c2e1876b8bC73Ad3571a9Ae07E034cBbD8B4386'))
    this.setState({EnsRelay : EnsRelay})
    // Declaring this for later so we can chain functions on SimpleStorage.
    // var EnsRelayInstance
    //
    // // Get accounts.
    // this.state.web3.eth.getAccounts((error, accounts) => {
    //   simpleStorage.deployed().then((instance) => {
    //     EnsRelayInstance = instance
    //
    //     // Stores a given value, 5 by default.
    //     return simpleStorageInstance.set(5, {from: accounts[0]})
    //   }).then((result) => {
    //     // Get the value from the contract to prove it worked.
    //     return simpleStorageInstance.get.call(accounts[0])
    //   }).then((result) => {
    //     // Update state with the result.
    //     return this.setState({ storageValue: result.c[0] })
    //   })
    // })
  }

  handleChange(event){
    this.setState({[event.target.id]: event.target.value});
    //console.log(event.target.value);
  }

  setDomain(){
    console.log(this.state.domainName);
    console.log(this.state.web3.eth.accounts[0]);
    const ens = new ENS(this.state.web3);
    console.log(ens);
    var ensOwner = ens.owner(this.state.domainName + '.eth')
    .then((address) => {
      console.log(address);

    console.log(address.toLowerCase() === this.state.web3.eth.accounts[0].toLowerCase())
    //check to see if owner matches web3.eth.accounts[0]
    if (address.toLowerCase() === this.state.web3.eth.accounts[0].toLowerCase()) {
      // store the ensAddress to a struct with the owner and ipfsHash
      var EnsRelayInstance

      // Get accounts.
      this.state.web3.eth.getAccounts((error, accounts) => {
        this.state.EnsRelay.at('0xb9518C7fF807B7B1b30Ea05735237D739E27550d').then((instance) => {
          EnsRelayInstance = instance

          // Stores a given value, 5 by default.
          return EnsRelayInstance.set(this.state.domainName, this.state.ipfsHash,{from: accounts[0]})
        }).then((result) => {
          console.log(result)
          // Get the value from the contract to prove it worked.
          return EnsRelayInstance.get(this.state.domainName, {from: accounts[0]})
        }).then((result) => {

          // Update state with the result.
          return result
        })
      })
    }

	})
  }

  checkDomain(){

    console.log(this.state.getDomainName);
    var EnsRelayInstance;
    console.log(this.state.EnsRelay);
    this.state.EnsRelay.at('0xb9518C7fF807B7B1b30Ea05735237D739E27550d').then((instance) => {
      EnsRelayInstance = instance

      // Gets the IPFS Hash stored at that domainName
      var ipfsHash = EnsRelayInstance.get(this.state.getDomainName, {from: this.state.web3.eth.accounts[0]})
      console.log(ipfsHash)
      return true
    }).then((result) => {
      console.log(result)
    })
  }

  render() {
    return (
      <div style={styles.main}>
        <h1><img src='https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg'  height='3%' width='3%'/>
          {this.state.account}
        </h1>
        <h1 className='fancy'>HAPPY - ENS</h1>
				<h3 className = 'stepOne' > Step 1: Update your computers DNS server < /h3>
				<p className = 'stepOneDetails' > * Set your computers DNS server < /p>
				<p className = 'stepOneDetails' > to address 138.197 .150 .21 < /p>
				<h3 className = 'stepTwo' > Step 2: Register your.eth domain with HappyEthereum < /h3>
				<p className = 'stepTwoDetails' > * Associate a mapping of your.eth domain < /p>
				<p className = 'stepTwoDetails' > to a resource such as IPFS, URL, IP < /p>

        <TextField
          hintText="pegasys"
          floatingLabelText="ENS"
          type="text"
          id="domainName"
          onChange={this.handleChange}
        />
        <Label>.eth</Label>
        <br />
        <TextField
          hintText="QmYDb8vr7GvxbbbirgJuU2TmZk2Y"
          floatingLabelText="IPFS Hash"
          type="text"
          id="ipfsHash"
          onChange={this.handleChange}
        />
        <br />
      </div>
    );
  }
}
export default App
