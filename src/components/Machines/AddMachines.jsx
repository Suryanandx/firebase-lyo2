import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import {db} from '../../firebase'
import {firebaseLooper} from '../../utils/tools'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#141256',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
      background: "#141256",
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  }
}));





const AddMachines = () => {

  const [title, setMachineName] = useState('')
  const [location, setMachineLocation] = useState('');
  const [createdAt, setCreatedAt] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

    const handleSubmit = (e) => {
    e.preventDefault();
    const machine = {title, location, createdAt}
    db.collection('machines').add(machine).then(
      data => {
        console.log(data)
      }
    ).then(() => {
      setLoading(false);
      history.push('/machine-data')
    })

    }



  const classes= useStyles();
    return (
        <Container maxWidth="xs" component="main">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
          Add Machine
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
          value={title}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="machine_name"
            label="Machine Name"
            name="machine_name"
            autoFocus
            onChange={(e) => setMachineName(e.target.value)}
          />
          <TextField
          value={location}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="location"
            label="Location"
            onChange={(e) => setMachineLocation(e.target.value)}
            id="machine_location"
            
          />
           <TextField
           value={createdAt}
            id="date"
            label="Created At"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
          
         {!loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Machine
            </Button>}
         {
           loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled
            className={classes.submit}
          >Adding Machine...</Button>
         }   
          </form>
          </div>
        </Container>
    )
}

export default AddMachines
