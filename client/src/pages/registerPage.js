import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import AuthService from "../services/authService";

import {withTranslation} from 'react-i18next';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.passwordValidation = this.passwordValidation.bind(this);
        this.state = {
            username: '',
            password: '',
            email:'',
            passwordCorrect: true,
        }
    }

    passwordValidation(e){
        let value = e.target.value;
        if (/^^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$$/.test(value)){
            this.setState({ passwordCorrect: true });
        }else{
            this.setState({ passwordCorrect: false });
        }

        this.setState({ [e.target.name]: e.target.value });
    }

    handleChange(e){
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    handleRegister = async (e) => {
        e.preventDefault();
        let success = await this.auth.register(this.state.username, this.state.password, this.state.email);
        if (success) this.props.history.replace('/login');

    }

    render() {
        const { t } = this.props;
        return (
            <div className="login-page" style={{padding: '40px'}}>
                <Container maxWidth="xs">
                    <form onSubmit={this.handleRegister}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid container alignItems="center" justify="center" xs="12">
                                        <Avatar src="/broken-image.jpg" />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label={t('Username')}
                                            name="username"
                                            size="small"
                                            variant="outlined"
                                            value={this.state.username}
                                            onInput={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label={t('Email')}
                                            name="email"
                                            size="small"
                                            variant="outlined"
                                            type="email"
                                            value={this.state.email}
                                            onInput={this.handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            helperText={!this.state.passwordCorrect ? t('Password_ValidityRule') : ""}
                                            label={t('Password')}
                                            name="password"
                                            size="small"
                                            type="password"
                                            variant="outlined"
                                            error={!this.state.passwordCorrect}
                                            value={this.state.password}
                                            onInput={this.passwordValidation}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button color="secondary" fullWidth type="submit" variant="contained" disabled={!this.state.passwordCorrect || this.state.username.length < 1 || this.state.email.length < 1 || this.state.password.length < 1}>
                                    {t('Register_Button')}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
        )
    }
}

export default withTranslation()(RegisterPage);