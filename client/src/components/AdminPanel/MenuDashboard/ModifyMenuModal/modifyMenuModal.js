import React, {useEffect} from 'react';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';
import {withTranslation} from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import {TextField} from "@material-ui/core";
import _ from 'lodash';
import axios from "axios";


const ModifyMenuModalComponent = (props) => {
    const {t} = props;
    const [menuData, setMenuData] = React.useState({});


    useEffect(() => {
        if(!_.isEmpty(props.itemData)){
            setMenuData(props.itemData);
        }
    }, [props.itemData]);

    const saveMenuItem = (event) => {
        event.preventDefault();
        axios.post(props.isEdit ? '/api/menu/update' : '/api/menu', menuData).then(resp => {
            if (resp.status === 200) {
                props.fetchAction();
                props.closeModal();
            }
        })
    }

    const handleInputChange = (event) => {
        let currentTarget = event.target;
        let inputName = currentTarget.getAttribute('name')

        setMenuData({...menuData, [inputName]: currentTarget.value });
    }

    return (
        <Modal
            open={props.open}
            onClose={props.closeModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Paper className={'new-menu-modal'}>
                <div className={'product-modal-content'}>
                    {!props.isEdit && <h2>{t('MenuDashboard_NewItem')}</h2>}
                    <form id="new-product-form" action="POST" onSubmit={saveMenuItem}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField name="name" required id="standard-required" label={t('MenuTable_Name')}
                                           variant="outlined" fullWidth onInput={handleInputChange} value={menuData.name}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="url" required id="standard-required" label={t('MenuTable_LinkURL')}
                                           variant="outlined" fullWidth onInput={handleInputChange} value={menuData.url}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="displayNamePL" required id="standard-required"
                                           label={t('MenuTable_DisplayNamePL')}
                                           variant="outlined" fullWidth onInput={handleInputChange} value={menuData.displayNamePL}/>
                            </Grid>
                            <Grid item xs={12} style={{textAlign: 'center'}}>
                                <Button type="submit" variant="contained" color="primary">
                                    {t('EditModal_Save')}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Paper>
        </Modal>
    );
}
export default withTranslation()(ModifyMenuModalComponent);