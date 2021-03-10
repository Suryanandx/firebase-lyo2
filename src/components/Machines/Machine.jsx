import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import {db} from '../../firebase'
import {firebaseLooper} from '../../utils/tools'

import {
  
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
  Avatar,
  
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: "100%",
    backgroundColor: theme.palette.background.dark,
    marginLeft: "50px",
    marginBottom: "50px"
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Machine= () => {



  const classes = useStyles();
   const [isLoading, setIsLoading] = useState(true);
    const [machines, setMachines] = useState();
    const [error, setError] = useState(null)

  
   useEffect(() => {
        db.collection('machines').get().then(snapshot => {
            const machine = firebaseLooper(snapshot);
            setMachines(machine)
            setIsLoading(false);
            handleData(machine)
            console.log(machine)
            
        }).catch(err => {
            setIsLoading(false)
            setError(err.message);
            console.log(err)
        })
      
    }, [])

    const handleDelete = (id) => {

    }

    const handleData = (machine) => (
        machine? 
        machine.map((data, i) =>(
            <div key={i}>
        <Box  mt={3}>  
            
            <Grid className={classes.root} >
                
            <Card
              key={i}
                lg={4}
                md={6}
                xs={12}
                
            >
              <CardContent>
                <Avatar>M</Avatar>
                <Typography
                  align="center"
                  color="textPrimary"
                  gutterBottom
                  variant="h4"
                >
                  {data.title} 
                
                </Typography>
                <Typography
                  align="center"
                  color="textPrimary"
                  variant="body1"
                >
                  {data.location}
                </Typography>
              </CardContent>
              
              <Box flexGrow={1} />
              <Divider />
              <Box p={2}>
                <Grid
                  container
                  justify="space-between"
                  spacing={2}
                >
                  <Grid
                    className={classes.statsItem}
                    item
                  >
                    <AccessTimeIcon
                      className={classes.statsIcon}
                      color="action"
                    />
                    <Typography
                      color="textSecondary"
                      display="inline"
                      variant="body2"
                    >
                     {new Date(data.createdAt.seconds * 1000).toLocaleDateString("en-US")}
                    </Typography>
                  </Grid>
                <Button variant="contained" style={{backgroundColor: "blue", color:"white"}}><Link style={{color: "white" ,textDecoration: "none"}} to={`/machine-data/${data.id}/Content`}>Open</Link></Button>
               <Button variant="contained" style={{backgroundColor: "#4a47a3", color:"white"}}>Edit</Button>
               <Button variant="contained" style={{backgroundColor: "#e40017", color:"white"}}>Delete</Button>
                </Grid>
              </Box>
            
            </Card>
            </Grid>  
         </Box>
         
            </div>
        ))
        :null
    )

  return (
      <div className={classes.root}>
      
    {handleData(machines)}
    </div>
  );
};
 


export default Machine;