import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { signin, signup } from "../../actions/auth"
import { Avatar, Container, Paper, Typography, Grid, Button } from "@material-ui/core";
import LockOutlineIcon from "@material-ui/icons/LockOutlined";
import InputAuthForm from "./InputAuthForm";
import Icon from './icon'
import useStyles from "./styles";

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory()

    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUP] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = e => {
        e.preventDefault()
        if(isSignUp){
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    };

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const switchMode = () => {
        setIsSignUP((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        
        try {
            dispatch({ type: "AUTH", data : { result, token } })
            history.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google sign in unsuccesfull!")
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlineIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <InputAuthForm
                                    name='firstName'
                                    label='First Name'
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />
                                <InputAuthForm name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>
                        )}
                        <InputAuthForm name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <InputAuthForm
                            name='password'
                            label='Password'
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && (
                            <InputAuthForm
                                name='confirmPassword'
                                label='Confirm Password'
                                handleChange={handleChange}
                                type='password'
                            />
                        )}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId='504102122208-kqi23o4m4mp434a2jf76rbq103takm1s.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                                    Google Sign In
                            </Button>
                        )}
                        onSuccess = {googleSuccess}
                        onFailure = { googleFailure }
                        cookiePolicy = "single_host_origin"
                    />
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? "Already have an account? Sign In" : "Dont't have an accounr? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
