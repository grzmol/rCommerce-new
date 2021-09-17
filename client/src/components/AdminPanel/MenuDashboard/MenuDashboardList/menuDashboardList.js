import React, {useState} from 'react';
import MaterialTable from 'material-table';
import {withTranslation} from 'react-i18next';
import {getTranslation} from '../../../../locales/materialTable';
import _ from 'lodash';
import axios from "axios";
import ModifyMenuModalComponent from "../ModifyMenuModal/modifyMenuModal";

const MenuDashboardListComponent = (props) => {
    const {t} = props;
    const [modalOpen, setModalOpen] = useState(false);
    const [itemData, setItemData] = useState({});

    const closeModal = () => {
        setModalOpen(false);
    }
    const openModal = (editData) => {
        if(editData && !_.isEmpty(editData)){
            setItemData(editData);
        }else{
            setItemData({});
        }
        setModalOpen(true);
    }

    const deleteMenuItems = (idToDelete) => {


        axios.post('/api/menu/delete', {idsToRemove: [idToDelete]}).then(resp => {
            if (resp.status === 200) {
                props.fetchAction();
            }
        })
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
                actions={[
                    {
                        tooltip: t('Table_EditTooltip'),
                        icon: 'edit',
                        onClick: (event, rowData)=> {
                            openModal(rowData);
                        }
                    },
                    {
                        tooltip: t('Table_RemoveTooltip'),
                        icon: 'delete',
                        onClick: (event, rowData) => {
                            deleteMenuItems(rowData._id);
                        }
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                localization={getTranslation()}
            />
            <ModifyMenuModalComponent open={modalOpen} fetchAction={props.fetchAction} itemData={itemData}
                                      isEdit={true} closeModal={closeModal}/>
        </div>

    )
};

export default withTranslation()(MenuDashboardListComponent);