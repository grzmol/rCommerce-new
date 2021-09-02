import React, {useState} from 'react';
import MaterialTable from 'material-table';
import {withTranslation} from 'react-i18next';
import {getTranslation} from '../../../../locales/materialTable';
import ConfirmationDialogComponent from "../../../ConfirmationDialog/confirmationDialog";
import _ from 'lodash';
import axios from "axios";

const ImageDashboardListComponent = (props) => {
    const { t } = props;
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [imagesToRemove, setImagesToRemove] = useState([]);

    const deleteImages = () => {
        axios.post('/api/image/delete', {idsToRemove: imagesToRemove}).then(resp => {
            if(resp.status === 200){
                props.fetchAction();
                closeConfirmationDialog();
            }
        })
    }
    const closeConfirmationDialog = () => {
        setConfirmationModal(false);
    }
    const initRemoveAction = () => {
        setConfirmationModal(true);
    }
    const handleItemSelection = (selectedItems) => {
        let itemsToDelete = [];

        _.each(selectedItems, selectedItem => {
            itemsToDelete.push(selectedItem._id);
        });

        setImagesToRemove(itemsToDelete);
    }
    return (
        <div>
            <MaterialTable
                title={t('TableHeader_Image')}
                columns={[
                    { title: '', field: 'img', render: item => <img src={item.imgBase64} alt="" border="1" height="300" width="300" />},
                    { title: t('ImageTable_Type'), field: 'type' },
                    { title: t('ImageTable_Name'), field: 'name' },
                    { title: t('ImageTable_Description'), field: 'desc' },
                    { title: t('ImageTable_ProductCode'), field: 'productCode' }
                ]}
                data={props.images}
                options={{
                    selection: true
                }}
                onSelectionChange={handleItemSelection}
                actions={[
                    {
                        tooltip: t('Table_RemoveTooltip'),
                        icon: 'delete',
                        onClick: initRemoveAction
                    }
                ]}
                localization={getTranslation()}
            />
            <ConfirmationDialogComponent open={confirmationModal} disagree={closeConfirmationDialog} agree={deleteImages}/>
        </div>

    )
};

export default withTranslation()(ImageDashboardListComponent);