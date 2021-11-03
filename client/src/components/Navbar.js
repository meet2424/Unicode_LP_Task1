import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import "./styles/Navbar.css";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    transparentBar: {
        backgroundColor: 'transparent !important',
        boxShadow: 'none',
        fontFamily: ['Festive', 'cursive'],
    },
    root: {
        margin: 0,
        flexGrow: 1,
    },
    title: {
        marginLeft: 70,
        flexGrow: 1,
    },
    navBtn: {
        width: 100,
    }
}));

export default function Navbar(props) {
    const classes = useStyles();
    const { role } = props
    console.log('please');

    // const [role, setRole] = useState('')
    // if (localStorage.getItem('role')) {
    //     const take = localStorage.getItem('role')
    //     setRole(take)
    // }

    return (
        <div className={classes.root} >
            <AppBar position="static" className={classes.transparentBar}>
                <Toolbar>
                    <Typography
                        variant="h5"
                        className={classes.title}>
                        <Link to='/'>
                            Music App
                        </Link>
                    </Typography>
                    {role === 'artist' && <Link to='/artist'>
                        <Button className={classes.navBtn}>Artist</Button>
                    </Link>}
                    {role === 'user' && <Link to='/songs'>
                        <Button className={classes.navBtn}>Songs</Button>
                    </Link>}
                    <Link to='/signup' >
                        <Button className={classes.navBtn}>Sign up</Button>
                    </Link>
                    <Link to='/login'>
                        <Button className={classes.navBtn}>Log in</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}