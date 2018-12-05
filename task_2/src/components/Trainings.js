import React, { Component } from 'react'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import moment from 'moment';
import AddTraining from './AddTraining';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


export default class Trainings extends Component {
    constructor(params){
      super(params);
      this.state={trainings: []};
      
    }
  
    componentDidMount() {
      this.listTraining();
    }
  
    listTraining =() => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(reponseData => {
      this.setState({trainings: reponseData })
      })
    }

    addTraining =(training) => {
      fetch('https://customerrest.herokuapp.com/api/trainings/', 
      {method: 'POST', 
      headers:{'Content-Type': 'application/json'}, 
      body: JSON.stringify(training)
      })
      .then(response=> {
        this.setState({showSnack: true, msg: "Training Added"})
        this.listTraining();
      })
      .catch(err => {
        console.error(err);
        this.setState({msg: "Error"})
      })
    }

    deleteTraining = (link) => {
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Are you sure you want to delete?',
        buttons: [
          {
            label: 'Yes',
            onClick:() => {
              fetch(`https://customerrest.herokuapp.com/api/trainings/${link}`, {method: 'DELETE'})
              .then(response => {
                this.listTraining();
                this.setState({showSnack: true, msg: "Training deleted"})
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
      


  
    render() {
      const columns = [{
        Header: 'Activity',
        accessor: 'activity'
      
      }, {
        Header: 'Duration',
        accessor: 'duration',
     
      },{
        id:'trainingdate',
        Header: 'Date',
        accessor: d =>{
          return moment(d.date).format("YYYY-MM-DD")
        }
        
      }, {id:'customername',
          Header: 'Customer',
          accessor: c =>{
            if(c.customer != null) {
              return c.customer.firstname+' '+c.customer.lastname 
            }
            else return (c.customer)
          }
  
        }, {
          Header: '',
          filterable: false,
          sortable: false,
          accessor: 'id',
          Cell: ({value}) => (<Tooltip title="Delete" placement="right-end" ><IconButton size="small" color="secondary" onClick={() => this.deleteTraining(value)} aria-lable="Delete"><DeleteIcon/></IconButton></Tooltip>)
        }] 
      
      return (
        <div>
    <AddTraining addTraining={this.addTraining} loadTrainings={this.loadTrainings} />
     <ReactTable defaultPageSize={10} filterable={true} data={this.state.trainings}
      columns={columns}/>
       <Snackbar message ={this.state.msg} open={this.state.showSnack} onClose={this.state.handleClose} autoHideDuration={2000} />
      
      
   
        </div>
      );
    }
  }
  