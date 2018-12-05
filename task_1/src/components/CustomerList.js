import React, { Component } from 'react'
import ReactTable from "react-table";
import 'react-table/react-table.css'


export default class CustomerList extends Component {
    constructor(params){
      super(params);
      this.state={customers: []};
      
    }
  
    componentDidMount() {
      this.listCustomer();
    }
  
    listCustomer =() => {
      fetch('https://customerrest.herokuapp.com/api/customers')
      .then(response => response.json())
      .then(reponseData => {
      this.setState({customers: reponseData.content })
      })
    }

    


  
    render() {
      const columns = [{
        Header: 'First Name',
        accessor: 'firstname'
      
      }, {
        Header: 'Last Name',
        accessor: 'lastname'
     
      },{
        Header: 'Street Address',
        accessor: 'streetaddress'
   
      }, {
          Header: 'Post Code',
          accessor: 'postcode'
   
      }, {
          Header: 'City',
          accessor: 'city'
   
      }, {
          Header: 'email',
          accessor: 'email'
  
        }, {
          Header: 'Phone Number',
          accessor: 'phone'
        }] 
      
      return (
        <div>
    
     <ReactTable defaultPageSize={10} filterable={true} data={this.state.customers}
      columns={columns}/>
      
   
        </div>
      );
    }
  }
  