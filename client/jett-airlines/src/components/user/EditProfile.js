import React, { Component } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button';
import { Grid, Typography, Paper, AppBar, Toolbar, Container, Box } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import editbackground from '../../assets/editbg.png';
import { margin } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const styles = {
    background: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        backgroundImage: `url(${editbackground})`,
        backgroundRepeat: 'no-repeat'
    }
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const user = JSON.parse(sessionStorage.getItem('signedUser'));

export default class EditProfile extends Component {
    state = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        homeAddress: user.homeAddress,
        passportNumber: user.passportNumber,
        oldPassword:'',
        newPassword: '',
        openSuccess: false,
        openError: false,
        errorMessage:''
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = () => {
        const emptyCheck= this.state.firstName==='' || this.state.lastName==='' || this.state.email==='' || this.state.homeAddress==='' || this.state.passportNumber==='';

        if (emptyCheck===true) {
            this.setState({
                openError: true,
                errorMessage: "Please fill all fields."
            })
        }
        else{
        const data = {
            token: sessionStorage.getItem('token'),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            homeAddress: this.state.homeAddress,
            passportNumber: this.state.passportNumber,
            newPassword:this.state.newPassword,
            oldPassword:this.state.oldPassword
        }

        axios.patch('http://localhost:8082/api/users/userupdate/', data)
            .then(res => {
                this.setState({
                    newPassword: '',
                    oldPassword:'',
                    openSuccess: true,
                    openError: false
                })
                sessionStorage.setItem('signedUser', JSON.stringify(res.data.userIn))
            })
            .catch(err => {
                this.setState({
                    openError: true,
                    errorMessage:err.response.data.message
                })
            })
        }

    }
    handleCloseSuccess = () => {
        this.setState({
            openSuccess: false
        })
    }

    render() {
        return (<div>
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
                <Toolbar>
                    <AccountCircleIcon sx={{ fontSize: 40 }} backgroundColor="black" />
                    <Typography style={{ margin: "0 0 0 5px" }} variant="h4" color="inherit" noWrap>
                        Profile
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid style={styles.background}>

                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>

                    <Dialog
                        open={this.state.openSuccess}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.handleCloseSuccess}
                        aria-describedby="alert-dialog-slide-description"
                    >

                        <Alert severity="success"
                            action={
                                <Button onClick={this.handleCloseSuccess} color="inherit" size="small" variant="outlined">
                                    Done
                                </Button>
                            }
                        >
                            Profile has been updated Successfully.
                        </Alert>

                    </Dialog>

                    <Paper elevation={10} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center">
                            Edit Profile
                        </Typography>
                        <br />
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ m: 1, minWidth: 100 }}>
                                    <InputLabel style={{ margin: "-7px 0 0 -7px" }}>First Name</InputLabel>
                                    <OutlinedInput sx={{ height: 40 }}
                                        name='firstName'
                                        value={this.state.firstName}
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ m: 1, minWidth: 100 }}>
                                    <InputLabel style={{ margin: "-7px 0 0 -7px" }}>Last Name</InputLabel>
                                    <OutlinedInput sx={{ height: 40 }}
                                        name='lastName'
                                        value={this.state.lastName}
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl sx={{ m: 1, minWidth: 100 }}>
                                    <InputLabel style={{ margin: "-7px 0 0 -7px" }}>Passport Number</InputLabel>
                                    <OutlinedInput sx={{ height: 40 }}
                                        name='passportNumber'
                                        value={this.state.passportNumber}
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl sx={{ m: 1, minWidth: 100 }}>
                                    <InputLabel style={{ margin: "-7px 0 0 -7px" }}>Email</InputLabel>
                                    <OutlinedInput sx={{ height: 40 }}
                                        name='email'
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl sx={{ m: 1, minWidth: 100 }}>
                                    <InputLabel style={{ margin: "-7px 0 0 -7px" }}>Home Address</InputLabel>
                                    <OutlinedInput sx={{ height: 40 }}
                                        name='homeAddress'
                                        value={this.state.homeAddress}
                                        onChange={this.handleChange}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}sm={6}>
                                <FormControl sx={{ m: 1, minWidth: 100 }}>
                                    <InputLabel style={{ margin: "-7px 0 0 -7px" }}>Old Password</InputLabel>
                                    <OutlinedInput
                                        sx={{ height: 40 }}
                                        name='oldPassword'
                                        value={this.state.oldPassword}
                                        onChange={this.handleChange}
                                        type='password'
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}sm={6}>
                                <FormControl sx={{ m: 1, minWidth: 100 }}>
                                    <InputLabel style={{ margin: "-7px 0 0 -7px" }}>New Password</InputLabel>
                                    <OutlinedInput
                                        sx={{ height: 40 }}
                                        name='newPassword'
                                        value={this.state.newPassword}
                                        onChange={this.handleChange}
                                        type='password'
                                    />
                                </FormControl>
                            </Grid>
                        </Grid><br/><br/>

                        {this.state.openError && <Alert severity='error' >{this.state.errorMessage}</Alert>}
                        <Grid item style={{  textAlign: "center" }}>
                            <Box sx={{ display: 'flex', justifyContent:"space-evenly"}}>
                                <Button variant="contained" onClick={this.handleSubmit} sx={{ width:"180px", mt: 3, ml: 1 }}>Update Profile</Button>
                                <Button variant="contained" href='/home' sx={{width:"180px", mt: 3, ml: 1 }}>Back to Home</Button>
                            </Box>
                        </Grid>
                    </Paper>
                </Container>
            </Grid>
        </div>
        )
    }
}
