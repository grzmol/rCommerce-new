import {useTranslation} from 'react-i18next';

export const getTranslation = () => {
    const { t } = useTranslation();
    const listLocales = {
        body: {
            emptyDataSourceMessage: t('ProductTable_body.emptyDataSourceMessage'),
            addTooltip: t('ProductTable_body.addTooltip'),
            deleteTooltip: t('ProductTable_body.deleteTooltip'),
            editTooltip: t('ProductTable_body.editTooltip'),
            filterRow: {
                filterTooltip: t('ProductTable_body.filterRow.filterTooltip')
            },
            editRow: {
                deleteText: t('ProductTable_body.editRow.deleteText'),
                cancelTooltip: t('ProductTable_body.editRow.cancelTooltip'),
                saveTooltip: t('ProductTable_body.editRow.saveTooltip')
            },
        },
        grouping: {
            placeholder: t('ProductTable_grouping.placeholder')
        },
        header: {
            actions: t('ProductTable_header.actions')
        },
        pagination: {
            labelDisplayedRows: t('ProductTable_pagination.labelDisplayedRows'),
            labelRowsSelect: t('ProductTable_pagination.labelRowsSelect'),
            labelRowsPerPage: t('ProductTable_pagination.labelRowsPerPage'),
            firstAriaLabel: t('ProductTable_pagination.firstAriaLabel'),
            firstTooltip: t('ProductTable_pagination.firstTooltip'),
            previousAriaLabel: t('ProductTable_pagination.previousAriaLabel'),
            previousTooltip: t('ProductTable_pagination.previousTooltip'),
            nextAriaLabel: t('ProductTable_pagination.nextAriaLabel'),
            nextTooltip: t('ProductTable_pagination.nextTooltip'),
            lastAriaLabel: t('ProductTable_pagination.lastAriaLabel'),
            lastTooltip: t('ProductTable_pagination.lastTooltip'),
        },
        toolbar: {
            addRemoveColumns: t('ProductTable_toolbar.addRemoveColumns'),
            nRowsSelected: t('ProductTable_toolbar.nRowsSelected'),
            showColumnsTitle: t('ProductTable_toolbar.showColumnsTitle'),
            showColumnsAriaLabel: t('ProductTable_toolbar.showColumnsAriaLabel'),
            exportTitle: t('ProductTable_toolbar.exportTitle'),
            exportAriaLabel: t('ProductTable_toolbar.exportAriaLabel'),
            exportName: t('ProductTable_toolbar.exportName'),
            searchTooltip: t('ProductTable_toolbar.searchTooltip'),
            searchPlaceholder: t('ProductTable_toolbar.searchPlaceholder')
        }
    }
    return listLocales;
}