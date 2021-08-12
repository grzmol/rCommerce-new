import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import AuthService from "../services/authService";
import {Link} from "react-router-dom";

import { withTranslation } from 'react-i18next';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange(e){
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    handleLogin = async (e) => {
        e.preventDefault();
        let success = await this.auth.login(this.state.username, this.state.password);
        if (success) this.props.history.replace('/');
    }

    componentWillMount() {
        if(this.auth.isLoggedIn())
            this.props.history.replace('/');
    }

    render() {
        const { t } = this.props;
        return (
            <div className="login-page" style={{padding: '40px'}}>
                <Container maxWidth="xs">
                    <form onSubmit={this.handleLogin}>
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
                                            label={t('Password')}
                                            name="password"
                                            size="small"
                                            type="password"
                                            variant="outlined"
                                            value={this.state.password}
                                            onInput={this.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Button color="secondary" fullWidth type="submit" variant="contained">
                                    {t('Login_Button')}
                                </Button>
                            </Grid>
                            <Grid container xs={12} alignItems="center" justify="center">
                                <Link to='/register'>{t('Create_New_Account')}</Link>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
        )
    }
}


export default withTranslation()(LoginPage);