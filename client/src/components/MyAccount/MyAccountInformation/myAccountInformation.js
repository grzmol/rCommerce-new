import React from 'react';
import {withTranslation} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import {Divider, IconButton, List, ListItem, ListItemText} from "@material-ui/core";
import AuthService from "../../../services/authService";
import EditIcon from '@material-ui/icons/Edit';


const auth = new AuthService();
const currentUser = auth.getProfile();

const MyAccountInformationComponent = (props) => {
    const {t} = props;
    return (
        <div className='myaccount-info'>
            <h1>{t('MyAccount_InformationComponent')}</h1>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Grid item xs={12} md={5} lg={4}>
                        <List>
                            <ListItem>
                                <ListItemText primary={t('Username')} secondary={currentUser.username} />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary={t('Email')} secondary={currentUser.email} />
                                <IconButton aria-label="delete">
                                    <EditIcon />
                                </IconButton>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};
export default withTranslation()(MyAccountInformationComponent);