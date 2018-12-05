import React, { Component } from 'react'
import ReactTable from "react-table";
import 'react-table/react-table.css'
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import Trainings from './Trainings';



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


    saveCustomer =(customer) => {
      fetch('https://customerrest.herokuapp.com/api/customers', 
      {method: 'POST', 
      headers:{'Content-Type': 'application/json'}, 
      body: JSON.stringify(customer)
      })
      .then(response=> {
        this.setState({showSnack: true, msg: "Customer Added"})
        this.listCustomer();
      })
      .catch(err => {
        console.error(err);
        this.setState({msg: "Error"})
      })
    }

    deleteCustomer = (link) => {
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure you want to delete?',
        buttons: [
          {
            label: 'Yes',
            onClick:() => {
              fetch(link, {method: 'DELETE'})
              .then(response => {
                this.listCustomer();
                this.setState({showSnack: true, msg: "Customer deleted"})
              })
            .catch(err => {
              console.error(err);
              this.setState({msg: "Error"})
            })
            }
          },
          {
            label: 'No',
            onClick: () => alert('Cancelled')
          }
        ]
      })
    } 

    addTraining =(training)=> {
      
      fetch('https://customerrest.herokuapp.com/api/trainings', 
      {method: 'POST', 
      headers:{'Content-Type': 'application/json'}, 
      body: JSON.stringify(training)
      })
      .then(response=> {
        this.setState({showSnack: true, msg: "Training Added"})
        this.listCustomer();
      })
      .catch(err => {
        console.error(err);
        this.setState({msg: "Error"})
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
        },{

          Header: 'Training',
          filterable: false,
          sortable: false,
          accessor: 'links[2].href',
          Cell: ({value}) => (
            <AddTraining addTraining={this.addTraining} loadTrainings={this.loadTrainings} />)

        },{  
          Header: '',
          filterable: false,
          sortable: false,
          accessor: 'links[0].href',
          Cell: ({value}) => (<Tooltip title="Delete" placement="right-end" ><IconButton size="small" color="secondary" onClick={() => this.deleteCustomer(value)} aria-lable="Delete"><DeleteIcon/></IconButton></Tooltip>)
        }] 
      
      return (
        <div>
    
    <AddCustomer saveCustomer={this.saveCustomer} />  
     <ReactTable defaultPageSize={10} filterable={true} data={this.state.customers}
      columns={columns}/>
       <Snackbar message ={this.state.msg} open={this.state.showSnack} onClose={this.state.handleClose} autoHideDuration={2000} />
      
   
        </div>
      );
    }
  }
  