import { Button, Container, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../components/context/AuthContext'
import LineDemo from '../../components/LineDemo'
import Alert from '@material-ui/lab/Alert'
const MiddlePage = () => {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }


    return (
        <Container style={{alignItems: "center", marginLeft: "30px", }}>
            <Typography gutterBottom variant="h5">User:{currentUser.email}</Typography>
            <Button style={{marginRight: "30px"}} color="primary" variant="contained" href="/machine-data"> Machines</Button>
            <Button color="primary" variant="contained" href="/account"> Account</Button>
            {error && <Alert severity="error">{error}</Alert>}
            <Button onClick={handleLogout} variant="contained" style={{ marginLeft: "30px", color: "white" , backgroundColor: "#fa1e0e"}}>Logout</Button>
            <LineDemo/>
        </Container>
    )
}

export default MiddlePage
