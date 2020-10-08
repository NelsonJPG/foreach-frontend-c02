import React from 'react'
import { Formik, Form as FormContent } from 'formik';
import * as Yup from 'yup';
import {TextField, Button, CircularProgress, Select, MenuItem, FormControl, InputLabel, FormHelperText, InputAdornment, Chip, Switch , FormControlLabel } from '@material-ui/core';
import {Save} from '@material-ui/icons'
import Autocomplete from '@material-ui/lab/Autocomplete';

const validationSchema = Yup.object({

    startAddress: Yup.string().required("required"),
    endAddress: Yup.string().required("required"),
    transport: Yup.string().required("required"),
    kmTraveled: Yup.string().required("required").matches(/\d+(\.\d{1,2})?/ , 'format invalid'),
    nameOfPerson: Yup.array().required("required"),
    roundtrip: Yup.bool()
})

const FormCreateTravel = (props) => {
    const { handleCreateTravel, transports } = props;
    
    const initialValues = {  
        startAddress: "",
        endAddress: "",
        transport: "",
        kmTraveled: "",
        nameOfPerson: [],
        roundtrip: false
    }
    
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={handleCreateTravel}
        validationSchema={validationSchema}
        >
            {({ setFieldValue, errors, touched, values, isValid, isSubmitting }) => {
                return (
                <FormContent>
                    <FormControlLabel
                        control={<Switch checked={values.roundtrip} onChange={(event)=> setFieldValue("roundtrip",event.target.checked)} />}
                        label="Viaje Ida y Vuelta"
                    />
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            error={touched.startAddress && errors.startAddress? true: false}
                            id="punto-partida"
                            label="Punto de Partida"
                            onChange={(event) => setFieldValue("startAddress", event.target.value)} 
                            value={values.startAddress}
                            helperText={touched.startAddress && errors.startAddress? errors.startAddress: ""}
                            />
                    </div>
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            error={touched.endAddress && errors.endAddress? true: false}
                            id="punto-llegada"
                            label="Punto de Termino"
                            onChange={(event) => setFieldValue("endAddress", event.target.value)} 
                            value={values.endAddress}
                            helperText={touched.endAddress && errors.endAddress? errors.endAddress: ""}
                            />
                    </div>
                    <FormControl error={touched.endAddress && errors.endAddress? true: false} fullWidth>
                        <InputLabel id="medios-transporte-label">Medio de Transporte</InputLabel>
                        <Select
                            variant="outlined"
                            labelId="medios-transporte"
                            //</FormControl>id="medios-transporte"
                            value={values.transport}
                            onChange={(event) => setFieldValue("transport", event.target.value)}                       
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {transports && transports.length?
                                transports.map( transport =>  <MenuItem key={transport._id} value={transport._id}>{`${transport.name} - ${transport.factor}`}</MenuItem>)
                            : null}
                        </Select>
                        {touched.transport && errors.transport?  <FormHelperText>{errors.transport}</FormHelperText>: null}
                    </FormControl>
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            options={[]}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                    ))
                                }
                                onChange={(event, newValue) => setFieldValue("nameOfPerson",newValue)}
                                renderInput={(params) => (
                                    
                                    <TextField {...params} variant="outlined" label="Trabajadores en el viaje" placeholder="Ejm: Nelson Gonzalez"
                                    error={touched.nameOfPerson && errors.nameOfPerson? true: false} 
                                    helperText={touched.nameOfPerson && errors.nameOfPerson? errors.nameOfPerson: ""}
                                    />
                                )}
                            />
                    </div>
                    
                    <div style={{marginTop:"10px", marginBottom:"10px"}}>
                        <TextField
                            fullWidth
                            label="Km Recorrido"
                            error={touched.endAddress && errors.endAddress? true: false}
                            id="km-recorrido"
                            variant="outlined"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">Km</InputAdornment>
                            }}
                            onChange={(event) => setFieldValue("kmTraveled", event.target.value)} 
                            value={values.kmTraveled}
                            helperText={touched.kmTraveled && errors.kmTraveled? errors.kmTraveled: ""}
                        />
                    </div>



                    <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={isSubmitting?  <CircularProgress /> : <Save />}
                    > Save
                    </Button>

                </FormContent>
            )}}
        </Formik>
    )
    }
    
export default FormCreateTravel;