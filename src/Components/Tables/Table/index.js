import React, { forwardRef } from 'react';
import PropTypes from "prop-types"
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import './Table.scss'

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Table = ({
  title, columns, data, isLoading, pageSize, search, showTitle, header, toolbar, exportButton, exportCsv, exportName, 
  onRowAdd, onRowUpdate, onRowDelete,
  addButton, updateButton, deleteButton,
}) => {
  return (
    <div className="table-default">
      <MaterialTable
        icons={tableIcons}
        title={title}
        columns={columns}
        data={data}
        isLoading={isLoading}
        localization={{
          body: {
            editRow: {
              deleteText: "Voulez-vous vraiment supprimer cette ligne ?",
              cancelTooltip: 'Annuler',
              saveTooltip: 'Valider'
            },
            addTooltip: 'Ajouter',
            deleteTooltip: 'Supprimer',
            editTooltip: 'Modifier',
          },
          pagination: {
            labelRowsSelect: "lignes",
            firstAriaLabel: 'Première page',
            firstTooltip: 'Première page',
            previousAriaLabel: 'Page précédente',
            previousTooltip: 'Page précédente',
            nextAriaLabel: 'Page suivante',
            nextTooltip: 'Page suivante',
            lastAriaLabel: 'Dernière page',
            lastTooltip: 'Dernière page',
          },
          toolbar: {
            searchTooltip: 'Rechercher',
            searchPlaceholder: 'Rechercher',
            exportName: exportName,
          }
        }}
        options={{
          showEmptyDataSourceMessage: false,
          pageSize: pageSize,
          search: search,
          showTitle: showTitle,
          header: header,
          toolbar: toolbar,
          exportButton: exportButton,
          exportCsv: exportCsv,
        }}
        editable={{
          onRowAdd: (addButton ? async (newData) => {
            await onRowAdd(newData)
          } : undefined),
          onRowUpdate: (updateButton ? async (newData, oldData) => {
            await onRowUpdate(newData, oldData)
          } : undefined),
          onRowDelete: (deleteButton ? async (oldData) => {
            await onRowDelete(oldData)
          } : undefined),
        }}
      />
    </div>
  )
}

Table.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  onRowAdd: PropTypes.func,
  addButton: PropTypes.bool,
  onRowUpdate: PropTypes.func,
  updateButton: PropTypes.bool,
  onRowDelete: PropTypes.func,
  deleteButton: PropTypes.bool,
  pageSize: PropTypes.number,
  search: PropTypes.bool,
  showTitle: PropTypes.bool,
  header: PropTypes.bool,
  toolbar: PropTypes.bool,
  exportButton: PropTypes.bool,
  exportCsv: PropTypes.func,
  exportName: PropTypes.string,
}

Table.defaultProps = {
  title: "Titre",
  columns: [],
  data: [],
  isLoading: true,
  onRowAdd: () => {},
  addButton: true,
  onRowUpdate: () => {},
  updateButton: true,
  onRowDelete: () => {},
  deleteButton: true,
  pageSize: 5,
  search: true,
  showTitle: true,
  header: true,
  toolbar: true,
  exportButton: false,
  exportCsv: () => {},
  exportName: "",
};

export default Table