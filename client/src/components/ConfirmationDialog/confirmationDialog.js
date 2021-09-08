import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


import {withTranslation} from 'react-i18next';


const ConfirmationDialogComponent = (props) => {
    const {t} = props;

    const handleAgreeAction = () => {
        props.agree();
    }
    const handleDisagreeAction = () => {
        props.disagree();
    }
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleDisagreeAction}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t('ConfirmationDialog_Text')}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDisagreeAction} color="primary">
                        {t('ConfirmationDialog_Disagree')}
                    </Button>
                    <Button onClick={handleAgreeAction} color="primary" autoFocus>
                        {t('ConfirmationDialog_Agree')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default withTranslation()(ConfirmationDialogComponent);