import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import {useDropzone} from 'react-dropzone';
import {db} from '../../firebase'
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
  },
  drag: {
  width: "500px",
  height: "200px",
  border: "4px dashed #fff",
  }
}));


const AddSteps = ({match}) => {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [cid, setCid] = useState(match.params.id)
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false);
  const history = useHistory();

    const {getRootProps, getInputProps} = useDropzone({
      
      onDrop: (acceptedFiles) => {
        setFiles(acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })))
      }
    })

    const images = files.map((file) => (
      <div key={file.name}>
        <div>
          <img src={file.preview} style={{width: "200px"}} alt="preview"/>
        </div>
      </div>
    ))
  
    const handleSubmit = (e) => {
    e.preventDefault();
    const steps = {title, desc, createdAt, cid};
    setLoading(true);
    db.collection('steps').add(steps).then(()=>{
      setLoading(false)
      history.go(-1)
    })


  }

  const classes= useStyles();
    return (
        <Container maxWidth="xs" component="main">
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
          Add Step
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField value={cid}
          variant='outlined'
          margin='normal'
          fullWidth
          disabled
          onChange={(e) => setCid(e.target.value)}
          />
          <TextField
          value={title}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Step Title"
            name="title"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
          value={desc}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="step_description"
            label="Description"
            onChange={(e) => setDesc(e.target.value)}
            id="step_description"
            multiline
            
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

          <div className={classes.drag} {...getRootProps()}>
              <input {...getInputProps()}/>
              <Typography variant="subtitle1">Drag and Drop Files</Typography>
          </div>

          <div>
            {images}
          </div>
          
         {!loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add Step
            </Button>}
         {
           loading && <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled
            className={classes.submit}
          >Adding Step...</Button>
         }   
          </form>
          </div>
        </Container>
    )
}

export default AddSteps
