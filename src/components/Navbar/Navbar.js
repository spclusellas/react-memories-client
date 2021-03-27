import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import memoriesLogo from "../../images/memories.png";

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')))

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [ location ])

    const logout = () => {
        dispatch({ type: "LOGOUT" })
        history.push("/")
        setUser(null)
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography componenet={Link} className={classes.heading} variant='h2' align='center'>
                    Memories
                </Typography>
                <img className={classes.image} src={memoriesLogo} alt='memoriesLogo' height='60' />
            </div>
            <Toolbar className={classes.toolbar}>
                { user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user.result.name}
                        </Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}> Logout </Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                ) }
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
