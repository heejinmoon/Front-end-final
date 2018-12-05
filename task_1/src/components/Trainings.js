import React, { Component } from 'react'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import moment from 'moment';


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
          return moment(d.date).format("YYYY/MM/DD")
        }
        
      }, {id:'customername',
          Header: 'Customer',
          accessor: c =>{
            return c.customer.firstname+' '+c.customer.lastname
          }
  
        }] 
      
      return (
        <div>
    
     <ReactTable defaultPageSize={10} filterable={true} data={this.state.trainings}
      columns={columns}/>
      
   
        </div>
      );
    }
  }
  