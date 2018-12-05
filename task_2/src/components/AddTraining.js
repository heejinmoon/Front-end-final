import React, { Component } from 'react'
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

export default class AddTraining extends Component {
    constructor(props) {
        super(props);
        this.state={ activity: '',
        duration: '',
        date: ''};

        this.addModal = React.createRef();
    }

    handleChance =(event)=> {
        this.setState({[event.target.name]:event.target.value});
    }

    addTraining= () => {
        const newTraining= {activity: this.state.activity,
        duration: this.state.duration,
        date: this.state.date}
        this.props.addTraining(newTraining);
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
        <SkyLight dialogStyles={addDialog} hideOnOverlayClicked ref={this.addModal} title="New Training" >
        <TextField placeholder="Activity" name="activity" onChange={this.handleChance} value={this.state.activity} /> <br/>
        <TextField placeholder="Duration" name="duration" onChange={this.handleChance} value={this.state.duration} /> <br/>
        <TextField placeholder="Date" name="date" onChange={this.handleChance} value={this.state.date} /> <br/>
        <Button onClick={this.addTraining} variant="contained" color="default"><SaveIcon />SAVE</Button>
        </SkyLight>
      </div>
    )
  } 

}
