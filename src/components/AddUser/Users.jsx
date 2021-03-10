import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import UserList from './UserList';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) =>( {
    add: {
     
    background:'#141256',
    borderRadius: '20px',
    margin: theme.spacing(3, 0, 2),
 
    },
    backButton: {
        backgroundColor: "#A997DF",
        color: "white",
        borderRadius: "20px",
        marginRight: "30px",
        marginLeft: "20px",
    }
}))
const Users = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null)
    useEffect(() => {
        fetch("http://localhost:5000/users")
        .then(res => {
            if(!res.ok){
                throw Error("Could not fetch the data for that resource!")
            }
           return res.json();
        })
        .then(data => {
            setUsers(data);
            setIsLoading(false);
            
        })
        .catch(err => {
            setIsLoading(false);
            setError(err.message);
            
        })
    }, [])
    return (
        <Container xs={12}>
        {error && <Typography variant="h6">{error}</Typography>}
        {isLoading && <Typography variant="h3">Loading...</Typography>}
           <Button 
            variant="contained"
            color="primary" className={classes.add}>
               <Link style={{color: "white" ,textDecoration: "none"}} to="/users/add-user">
                    Add user
               </Link>
               </Button>
               
          {users && <UserList users={users} />}
        </Container>
    )
}

export default Users
