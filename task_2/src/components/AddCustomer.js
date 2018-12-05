import React, { Component } from 'react'
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

export default class AddCustomer extends Component {
    constructor(props) {
        super(props);
        this.state={ firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''};

        this.addModal = React.createRef();
    }

    handleChance =(event)=> {
        this.setState({[event.target.name]:event.target.value});
    }

    saveCustomer= () => {
        const customer= {firstname: this.state.firstname,
        lastname: this.state.lastname,
        streetaddress: this.state.streetaddress,
        postcode: this.state.postcode,
        city: this.state.city,
        email: this.state.email,
        phone: this.state.phone}
        this.props.saveCustomer(customer);
        this.addModal.current.hide();
    }

   

    
  render() {
    var addDialog = {  
        width: '30%',
        height: '300px',
        marginLeft: '-15%'

      };

    return (
      <div>
       <Button variant="contained" color="primary"  onClick={()=> this.addModal.current.show()}><AddIcon />New</Button>
        <SkyLight dialogStyles={addDialog} hideOnOverlayClicked ref={this.addModal} title="New Customer" >
        <TextField placeholder="First Name" name="firstname" onChange={this.handleChance} value={this.state.firstname} /> <br/>
        <TextField placeholder="Last Name" name="lastname" onChange={this.handleChance} value={this.state.lastname} /> <br/>
        <TextField placeholder="Street Address" name="streetaddress" onChange={this.handleChance} value={this.state.streetaddress} /> <br/>
        <TextField placeholder="Post Code" name="postcode" onChange={this.handleChance} value={this.state.postcode} /> <br/>
        <TextField placeholder="City" name="city" onChange={this.handleChance} value={this.state.city} /> <br/>
        <TextField placeholder="Email" name="email" onChange={this.handleChance} value={this.state.email} /> <br/>
        <TextField placeholder="Phone" name="phone" onChange={this.handleChance} value={this.state.phone} /> <br/>
        <Button onClick={this.saveCustomer} variant="contained" color="default"><SaveIcon />SAVE</Button>
        </SkyLight>
      </div>
    )
  } 

}
