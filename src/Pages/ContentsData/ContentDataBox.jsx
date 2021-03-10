import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import {db} from '../../firebase'

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottomColor: "black",
    backgroundColor: theme.palette.background.dark,
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  dataBox:{
      borderRadius: "20px",
      boxShadow: "10px 20px 30px whitesmoke",
      marginBottom: "50px",
      alignItems: "center"
  },
  divButton: {
      backgroundColor: "#A68BA5",
      marginRight: "20px",
      color: "white",
      borderRadius: "10px"

  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
      border: "#141256",
      borderRadius: '20px',
      margin: theme.spacing(3, 0, 2),
  }
}));

const ContentDataBox = ({data}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [title, setContentName] = useState(data.title)
    const [desc, setContentDescription] = useState(data.desc);
    const [createdAt, setCreatedAt] = useState();
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState()
   const history = useHistory();

   const handleEdit = () => {
      setOpenEdit(true)
    }
    const handleEditClose = () => {
      setOpenEdit(false)
    }

    const handleClickOpen = () => {
    setOpen(true);
  };

   const handleClose = () => {
    setOpen(false);
  };

        

  
  const handleDelete = (id) => {
    db.collection('contents').doc(id).delete()
}

  const updateContent=(id) => {
    setLoading(true)
    db.collection('contents').doc(id).update({title, desc}).then((data) => {
        console.log(data)
        window.location.reload()
        setLoading(false)
    })
    
  }


    return (
        <div>
             <div className={classes.dataBox}>
            <Grid xs={12}>
                 <Typography align="center" variant="subtitle1">{data.title}</Typography>
                 <Typography align="center" variant="body2">{data.desc}</Typography> 
                 <Grid
                className={classes.statsItem}
                item
                 >
                  
                {/* <AccessTimeIcon
                className={classes.statsIcon}
                color="action"
                /> */}
                <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
                >
                </Typography>
          </Grid>   
            </Grid>
            
            <Button onClick={handleEdit}  color="primary">Edit</Button>
            <Button  variant="contained" className={classes.divButton}><Link to={`/machine-data/${data.mid}/${data.title}/${data.id}/steps`} style={{color: "white" ,textDecoration: "none"}}> Steps</Link></Button>
            <Button onClick={handleClickOpen} variant="contained" color="secondary">Delete</Button>
            
                {/* Dialogs */}

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Disagree
                    </Button>
                    <Button   onClick={(e)=>{
                        handleDelete(data.id);
                         handleClose()}} color="primary" autoFocus>
                        Agree
                    </Button>
                    
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openEdit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Edit Content"}</DialogTitle>
                    <DialogContent>
                    
                    <form className={classes.form}  >
                        <TextField
                        defaultValue={title}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="title"
                          name="title"
                          autoFocus
                          onChange={(e) => setContentName(e.target.value)}
                        />
                        <TextField
                        defaultValue={desc}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="desc"
                          onChange={(e) => setContentDescription(e.target.value)}
                          id="desc"
                          multiline
                        />
                    
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Cancel</Button>
                       {!loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                          className={classes.submit}
                          onClick={(e)=> updateContent(data.id)}
                        >
                          Update
                          </Button>}
                      {
                        loading && <Button
                          type="submit"
                          fullWidth
                          variant="outlined"
                          color="primary"
                          disabled
                          className={classes.submit}
                        >Updating values...</Button>
                      }   
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}

export default ContentDataBox
