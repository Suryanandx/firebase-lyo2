import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import MachineList from './MachineList';
import {Link} from 'react-router-dom';
import Machine from './Machine';
import {db} from '../../firebase';
import {firebaseLooper} from '../../utils/tools';
const useStyles = makeStyles((theme) =>( {
    add: {
     
    background:'#141256',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),
 
    }
}))
const Machines = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [machines, setMachines] = useState([]);
    const [error, setError] = useState(null)
    
    useEffect(() => {

        db.collection('machines').get().then(snapshot => {
            const machine = firebaseLooper(snapshot);
            setMachines(machine)
            setIsLoading(false);
            console.log(machine)
            
        }).catch(err => {
            setIsLoading(false)
            setError(err.message);
            console.log(err)
        })
      
    }, [])


   
    return (
        <Container maxWidth>
        {error && <Typography variant="h6">{error}</Typography>}
        {isLoading && <Typography variant="h3">Loading...</Typography>}
           <Button 
            variant="contained"
            color="primary" className={classes.add}>
               <Link style={{color: "white" ,textDecoration: "none"}} to="/add-machine">
                    Add Machine
               </Link>
               </Button>
         <Machine />
        
        </Container>
    )
}

export default Machines
