import React, {useState} from 'react';
import MaterialTable from 'material-table';
import {withTranslation} from 'react-i18next';
import {getTranslation} from '../../../../locales/materialTable';
import ConfirmationDialogComponent from "../../../ConfirmationDialog/confirmationDialog";
import _ from 'lodash';
import axios from "axios";
import CategoryModifyModalComponent from "../CategoryModifyModal/categoryModifyModal";

const CategoryDashboardListComponent = (props) => {
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

    const deleteCategory = (event, dataRow) => {
        axios.post('/api/category/delete', {idsToRemove: [dataRow._id]}).then(resp => {
            if (resp.status === 200) {
                props.fetchAction();
            }
        })
    }

    return (
        <div>
            <MaterialTable
                title={t('MenuItem_Categories')}
                columns={[
                    {title: t('CategoryTable_Name'), field: 'name'},
                    {title: t('CategoryTable_DisplayNamePL'), field: 'displayNamePL'},
                    {title: t('CategoryTable_Desc'), field: 'desc'}
                ]}
                data={props.categories}
                options={{
                    selection: true
                }}
                actions={[
                    {
                        tooltip: t('Table_EditTooltip'),
                        icon: 'edit',
                        onClick: (event, data) => {
                            openModal(data);
                        }
                    },
                    {
                        tooltip: t('Table_RemoveTooltip'),
                        icon: 'delete',
                        onClick: deleteCategory
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                localization={getTranslation()}
            />
            <CategoryModifyModalComponent open={modalOpen} fetchAction={props.fetchAction} itemData={itemData}
                                          isEdit={true} closeModal={closeModal}/>
        </div>

    )
};

export default withTranslation()(CategoryDashboardListComponent);