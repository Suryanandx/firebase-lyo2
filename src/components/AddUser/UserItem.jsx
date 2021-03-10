import React, { useState } from 'react';
import { Avatar, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputLabel, makeStyles, Select, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

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
      justifyContent: "flex-end",

  },
  del:{
    backgroundColor: "red",
    color: "white",
    borderRadius:"15px"
  }
}));

export default function UserItem({ users}) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [openView, setOpenView] = useState(false)
    const [firstName, setFirstName] = useState(users.firstName)
    const [lastName, setLastName] = useState(users.lastName)
    const [password, setPassword] = useState(users.password)
    const [email, setEmail] = useState(users.email);
    const [phone, setPhone] = useState(users.phone)
    const [role, setRole] = useState(users.role)
    const [loading, setLoading] = useState(false);
    const history = useHistory()

    const handleView = () => {
      setOpenView(true)
    }
    const handleViewClose = () => {
      setOpenView(false)
    }
    const handleClickOpen = () => {
    setOpen(true);
  };

   const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
      setOpenEdit(true)
    }
  const handleEditClose = () => {
      setOpenEdit(false)
    }

  const handleDelete = (id) => {
      fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE'
      }).then(() => {
        window.location.reload();
        history.push('/machine-content/users')
      })
}

const updateUser=(id) => {
    setLoading(true)
    const data = {firstName, lastName, password, phone, email, role}
      fetch(`http://localhost:5000/users/${id}`,{
        method: 'PUT',
         headers: {
         'Accept': 'application/json',
         "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then((res) => {
        res.json().then((resp) => {
        setLoading(false)
        window.location.reload()
        history.push('/users')
        })
       })
  }
    

    return (
        
        <Container xs>
            <div className={classes.dataBox}>
            <Grid xs={12}>
                 <Typography align="center" variant="h6"><Avatar></Avatar>{users.firstName} {users.lastName}</Typography>
                 <Typography align="center" variant="body2">{users.email} ||  {users.phone}</Typography>
                 
                 <Grid
                className={classes.statsItem}
                item
                 >
                <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
                >
               {users.role}
                </Typography>
                
          </Grid>   
            </Grid>
            <div className={classes.divButton}>
            <Button onClick={handleEdit}  color="primary">Edit</Button>
            <Button color="default" onClick={handleView}>View</Button>

            <Button onClick={handleClickOpen} variant="contained" className={classes.del}>Delete</Button>
            </div>

              <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are You Sure You Want To Delete?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deleting will be a permanent action and data pervailing will be permanently deleted and can not be retrieved back.                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Disagree
                    </Button>
                    <Button   onClick={(e)=>{
                        handleDelete(users.id);
                         handleClose()}} color="primary" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>

                {/* Edit dialog */}
                <Dialog
                    open={openEdit}
                    onClose={handleEditClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Edit Details of ${users.firstName}`}</DialogTitle>
                    <DialogContent>
                    
                    <form className={classes.form}  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        value={firstName}
                          autoComplete="fname"
                          name="firstName"
                          variant="outlined"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        value={lastName}
                          variant="outlined"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="lname"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                        value={email}
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                        value={phone}
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Phone Number"
                          type="Number"
                          id="phone"
                          autoComplete="current-password"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                        value={password}
                          variant="outlined"
                          required
                          fullWidth
                          id="password"
                          label="Password"
                          name="Password"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel htmlFor="role-native-simple">Role</InputLabel>
                  <Select
                    native
                    value={role}
                    onChange={(e)=> setRole(e.target.value)}
                    inputProps={{
                      name: 'roles',
                      id: 'role-native-simple',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value="Admin">Admin</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Manager">Manager</option>
                  </Select>
                      </Grid>
                      
                    </Grid>
                    <DialogActions>
                      <Button color="secondary" onClick={handleEditClose}>Close</Button>
                      {!loading && <Button
                          type="submit"
                          variant="outlined"
                          color="primary"
                          onClick={(e)=> updateUser(users.id)}
                        >
                          Update
                          </Button>}
                      {
                        loading && <Alert severity="success">User Updated !</Alert>
                      }   
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>
                    {/* Edit Dialog close */}

                    {/* View Dialog */}
            <Dialog
                    open={openView}
                    onClose={handleViewClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Details for ${users.firstName}`}</DialogTitle>
                    <DialogContent>
                    
                    <form className={classes.form}  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        value={firstName}
                          autoComplete="fname"
                          name="firstName"
                          variant="outlined"
                          required
                          fullWidth
                          id="firstName"
                          label="First Name"
                          autoFocus
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                        value={lastName}
                          variant="outlined"
                          required
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          autoComplete="lname"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                        value={email}
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                        value={phone}
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Phone Number"
                          type="Number"
                          id="phone"
                          autoComplete="current-password"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                        value={password}
                          variant="outlined"
                          required
                          fullWidth
                          id="password"
                          label="Password"
                          name="Password"
                          type="password"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel htmlFor="role-native-simple">Role</InputLabel>
                  <Select
                    native
                    value={role}
                    disabled
                    inputProps={{
                      name: 'roles',
                      id: 'role-native-simple',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value="Admin">Admin</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Manager">Manager</option>
                  </Select>
                      </Grid>
                      
                    </Grid>
                    <DialogActions>
                      <Button color="secondary" onClick={handleViewClose}>Cancel</Button>
                    
                    </DialogActions>
                     
                  </form>
                    </DialogContent>
                </Dialog>

            </div>
            
        </Container>
    )
}

