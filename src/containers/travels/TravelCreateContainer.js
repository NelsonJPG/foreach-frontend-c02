import React, { Component } from 'react';
import FormCreateTravel from '../../components/travels/FormCreateTravel';
import axios from 'axios';
import swal from 'sweetalert';
import { withRouter } from "react-router";
import {Grid, Card, CardHeader, CardContent, IconButton} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

class TravelCreateContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            transports: []
        }   
    }

    componentDidMount(){
        this.getTransports();
    }

    getTransports = async () => {

        let {data:{transports},status} = await axios.get("http://localhost:3010/v1/transport");
        if(status === 200) this.setState({transports});  
    }

    handleCreateTravel = async (form, onSubmitProps) => {
        let {
            startAddress,
            endAddress,
            transport,
            kmTraveled,
            nameOfPerson,
            roundtrip,
        } = form;

        let{data:{travel, message}, status} = await axios.post("http://localhost:3010/v1/travels", {
            "startAddress": startAddress,
            "endAddress": endAddress,
            "kmTraveled": +kmTraveled,
            "nameOfPerson":nameOfPerson,
            "roundtrip": roundtrip,
            "transport":transport
        });
        
        console.log(travel)
        if(status === 201){
            
            swal("Exito!", message, "success");
            onSubmitProps.setSubmitting(false); // stop submit formik
            onSubmitProps.resetForm(); // reset form formik  
            return this.props.history.push("/");

        }
        
        return onSubmitProps.setSubmitting(false); // stop submit formik
        //this.props.beforeAction();
    }

    render(){
        return(
            <Grid container spacing={3} justify="center">
                <Grid item md={8} >
                    <Card>
                        <CardHeader 
                            action={
                                <IconButton variant="contained" style={{background: "#3f51b5", color: "#fff"}} color="dark" aria-label="settings"  onClick={() => this.props.history.push("/")}>
                                  <ArrowBack />
                                </IconButton>
                              }
                        />
                        <CardContent>
                            <FormCreateTravel {...this.state} handleCreateTravel={this.handleCreateTravel} />
                        </CardContent>
                       
                    </Card>
                </Grid>
            </Grid>      
        )
    }
}

export default withRouter(TravelCreateContainer);