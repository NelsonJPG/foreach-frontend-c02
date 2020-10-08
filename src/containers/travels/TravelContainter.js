import React, { Component } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table'
import {Grid, Paper, Button} from '@material-ui/core';
import { withRouter } from "react-router";

class TravelContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            travels: []
        }   
    }

    componentDidMount(){
        this.getTravels();
    }

    getTravels = async () => {

        let {data:{travels},status} = await axios.get("http://localhost:3010/v1/travels");
        if(status === 200) this.setState({travels});  
    }

    render(){
        const { travels } = this.state; 
        return(
            <Grid container spacing={3} justify="center">
                <Grid item md={11} >
                    <Button style={{marginLeft: "auto"}} variant="contained" color="primary" onClick={() => this.props.history.push("/crear")}>Crear Viaje</Button>
                    <Paper elevation={1}>
                          
                        <MaterialTable
                            columns={[
                                { title: 'Fecha y Hora', field: 'createdAt' },
                                { title: 'Origen', field: 'endAddress' },
                                { title: 'Destino', field: 'startAddress' },
                                { title: 'Km recorrido', field: 'kmTraveled', type: 'numeric' },
                                { title: 'Ida y Vuelta', field: 'roundtrip'},
                                { title: 'Personas', field: 'qtyPerson'},
                                { title: 'Km por Persona', field: 'totalPerPerson'},
                            ]}
                            data={travels}
                            title="Travels"
                        />
                    </Paper>
                </Grid>
            </Grid>

        )
    }
}

export default withRouter(TravelContainer);