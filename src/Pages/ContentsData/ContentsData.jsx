
import { Button, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { db } from '../../firebase';
import { firebaseLooper } from '../../utils/tools';
import ContentDataBox from './ContentDataBox';

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
    },
   
}))
const ContentsData = ({match}) => {
    const [content, setContent] = useState([{}])
    const history = useHistory()
   const classes = useStyles()
    useEffect (() => {
        db.collection('contents')
        .where('mid' , '==' , `${match.params.id}`)
        .get()
        .then(snapshot => {
            const data = firebaseLooper(snapshot)
            setContent(data)
            console.log(data)
        })
    });
   const handleReturn=() => {
       history.push('/machine-data')
   }
    return (
        <div>
            <Sidebar match={match}/>
            <Button onClick={handleReturn} variant="contained" className={classes.backButton}>Go back</Button>
           <Button
           className={classes.add} 
            variant="contained"
            color="primary" >
               <Link style={{color: "white" ,textDecoration: "none"}} to={`/machine-data/${match.params.id}/add-content`}>
                   Add Content
               </Link>
               </Button>
            {content.map((data) => (
                <ContentDataBox key={data.id} data={data}/>
            ))}
            
        </div>
    )
}

export default ContentsData
