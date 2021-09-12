import React, {useState} from 'react';
import MaterialTable from 'material-table';
import {withTranslation} from 'react-i18next';
import {getTranslation} from '../../../../locales/materialTable';
import ConfirmationDialogComponent from "../../../ConfirmationDialog/confirmationDialog";
import _ from 'lodash';
import axios from "axios";

const MenuDashboardListComponent = (props) => {
    const {t} = props;
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [menuItemsToRemove, setMenuItemsToRemove] = useState([]);

    const deleteMenuItems = () => {


        axios.post('/api/menu/delete', {idsToRemove: menuItemsToRemove}).then(resp => {
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

        setMenuItemsToRemove(itemsToDelete);
    }
    return (
        <div>
            <MaterialTable
                title={t('MenuItem_Menu')}
                columns={[
                    {title: t('MenuTable_Name'), field: 'name'},
                    {title: t('MenuTable_DisplayNamePL'), field: 'displayNamePL'},
                    {title: t('MenuTable_LinkURL'), field: 'url'}
                ]}
                data={props.menuItems}
                options={{
                    selection: true
                }}
                onSelectionChange={handleItemSelection}
                actions={[
                    {
                        tooltip: t('Table_EditTooltip'),
                        icon: 'edit',
                        onClick: ()=> {}
                    },
                    {
                        tooltip: t('Table_RemoveTooltip'),
                        icon: 'delete',
                        onClick: initRemoveAction
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                localization={getTranslation()}
            />
            <ConfirmationDialogComponent open={confirmationModal} disagree={closeConfirmationDialog}
                                         agree={deleteMenuItems}/>
        </div>

    )
};

export default withTranslation()(MenuDashboardListComponent);