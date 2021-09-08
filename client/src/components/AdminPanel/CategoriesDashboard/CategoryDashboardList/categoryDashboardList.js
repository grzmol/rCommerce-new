import React, {useState} from 'react';
import MaterialTable from 'material-table';
import {withTranslation} from 'react-i18next';
import {getTranslation} from '../../../../locales/materialTable';
import ConfirmationDialogComponent from "../../../ConfirmationDialog/confirmationDialog";
import _ from 'lodash';
import axios from "axios";

const CategoryDashboardListComponent = (props) => {
    const {t} = props;
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [categoriesToRemove, setCategoriesToRemove] = useState([]);

    const deleteCategories = () => {
        axios.post('/api/category/delete', {idsToRemove: categoriesToRemove}).then(resp => {
            if (resp.status === 200) {
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

        setCategoriesToRemove(itemsToDelete);
    }
    return (
        <div>
            <MaterialTable
                title={t('MenuItem_Categories')}
                columns={[
                    {title: t('CategoryTable_Name'), field: 'name'},
                    {title: t('CategoryTable_DisplayNameEN'), field: 'displayNameEN'},
                    {title: t('CategoryTable_DisplayNamePL'), field: 'displayNamePL'},
                    {title: t('CategoryTable_Desc'), field: 'desc'}
                ]}
                data={props.categories}
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
            <ConfirmationDialogComponent open={confirmationModal} disagree={closeConfirmationDialog}
                                         agree={deleteCategories}/>
        </div>

    )
};

export default withTranslation()(CategoryDashboardListComponent);