import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import firebase, {db} from '../../firebase'
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





const AddContent = ({match}) => {

  const [title, setContentName] = useState('')
  const [desc, setContentDescription] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(false);
  const [mid, setMid] = useState(match.params.id)
  const history = useHistory();

    const handleSubmit = (e) => {
    e.preventDefault();
    const content = {title, desc, mid};
    setLoading(true);
      db.collection('contents').add(content).then((data) =>{
        console.log(data)
        history.go(-1)
      })

  }


  const classes= useStyles();
    return (
        <Container maxWidth="xs" component="main">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
          Add Content
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField value={mid}
           fullWidth
           variant="outlined"
           margin="normal"
           label="Machine id"
           disabled
           onChange ={(e) => setMid(e.target.value)}
           />
          <TextField
          value={title}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="content_name"
            label="Content Name"
            name="content_name"
            autoFocus
            onChange={(e) => setContentName(e.target.value)}
          />
          <TextField
          value={desc}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="content_description"
            label="Description"
            onChange={(e) => setContentDescription(e.target.value)}
            id="content_description"
            multiline
            
          />
           
          
         {!loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Content
            </Button>}
         {
           loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled
            className={classes.submit}
          >Adding Content...</Button>
         }   
          </form>
          </div>
        </Container>
    )
}

export default AddContent
