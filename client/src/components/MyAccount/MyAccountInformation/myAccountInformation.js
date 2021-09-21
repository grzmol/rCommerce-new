import React, {useEffect} from 'react';
import {withTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import {
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField
} from "@material-ui/core";
import AuthService from "../../../services/authService";
import EditIcon from '@material-ui/icons/Edit';
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import axios from "axios";
import _ from "lodash";

import {withRouter} from "react-router-dom";

const auth = new AuthService();

const MyAccountInformationComponent = ({history, ...props}) => {
    const {t} = props;
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [currentUser, setCurrentUser] = React.useState(auth.getProfile() || {});

    useEffect(() => {
        if(_.isEmpty(currentUser)){
            setCurrentUser(auth.getProfile());
        }
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const handleEmailChange = (event) => {
        let currentValue = event.target.value;
        setEmail(currentValue);
    }

    const changeEmail = (event) => {
        event.preventDefault();
        let data = {
            username: auth.getProfile().username,
            email: email
        }

        axios.post('api/users/changeMail', data).then(resp => {
            if(resp.status === 200){
                auth.logout();
            }
        })

    }
    return (
        <div className='myaccount-info'>
            <h1>{t('MyAccount_InformationComponent')}</h1>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid item xs={12} md={5} lg={4}>
                        <List>
                            <ListItem>
                                <ListItemText primary={t('Username')} secondary={currentUser.username}/>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <ListItemText primary={t('Email')} secondary={currentUser.email}/>
                                <IconButton aria-label="delete" onClick={handleClickOpen}>
                                    <EditIcon/>
                                </IconButton>
                            </ListItem>
                            <ListItem>
                                <Button type="button" variant="contained" color="primary" style={{marginTop: '20px'}}>
                                    {t('MyAccount_ChangePassword')}
                                </Button>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={changeEmail}>
                    <DialogTitle id="form-dialog-title">{t('MyAccount_ChangeEmail')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('MyAccount_InsertNewAddress')}<br/>
                            {t('MyAccount_UserWillBeLogout')}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={t('Email')}
                            type="email"
                            onInput={handleEmailChange}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" color="primary">
                            {t('MyAccount_Change')}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
};
export default withTranslation()(withRouter(MyAccountInformationComponent));