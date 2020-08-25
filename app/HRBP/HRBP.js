import React from 'react';
import { Grid, Button } from '@material-ui/core';
import MUIDataTable from "mui-datatables";

const HRBP = () => {
    const columns = [
        {
            name: 'caseId',
            label: 'Case ID',
        },
        {
            name: 'employeeName',
            label: 'Employee Name',
        },
        {
            name: 'email',
            label: 'Email',
        },
        {
            name: 'manager',
            label: 'Manager',
        },
        {
            name: 'emergencyContact',
            label: 'Emergency Contact',
        },
        {
            name: 'buildingName',
            label: 'Building Name',
        },
        {
            name: 'recommendations',
            label: 'Recommendations',
        },
        {
            name: 'status',
            label: 'Status',
        },
        {
            name: 'action',
            label: 'Action',
            options: {
                customBodyRender: (value, tableMeta) => (
                    <React.Fragment>
                        <Button
                            variant="contained"
                            color="secondary"
                            className="btn small"
                            size="small"
                        >
                            Review
                        </Button>
                    </React.Fragment>
                ),
            },
        },
    ];

    const data = [
        {
            'caseId': '#224',
            'employeeName': 'Kristin Mccoy',
            'email': 'kmccoy@cepheid.com',
            'manager': 'Ronald M',
            'emergencyContact': '328 288 1919',
            'buildingName': 'Cepheid-Building4',
            'recommendations': 'Qurantine',
            'status': 'New'
        },
        {
            'caseId': '#224',
            'employeeName': 'Kristin Mccoy',
            'email': 'kmccoy@cepheid.com',
            'manager': 'Ronald M',
            'emergencyContact': '328 288 1919',
            'buildingName': 'Cepheid-Building4',
            'recommendations': 'Qurantine',
            'status': 'New'
        },
        {
            'caseId': '#224',
            'employeeName': 'Kristin Mccoy',
            'email': 'kmccoy@cepheid.com',
            'manager': 'Ronald M',
            'emergencyContact': '328 288 1919',
            'buildingName': 'Cepheid-Building4',
            'recommendations': 'Qurantine',
            'status': 'New'
        },
        {
            'caseId': '#224',
            'employeeName': 'Kristin Mccoy',
            'email': 'kmccoy@cepheid.com',
            'manager': 'Ronald M',
            'emergencyContact': '328 288 1919',
            'buildingName': 'Cepheid-Building4',
            'recommendations': 'Qurantine',
            'status': 'New'
        },
    ];

    const options = {
        filterType: 'checkbox',
        responsive: 'stacked',
        hasIndex: true,
        rowsPerPageOptions: [5, 10, 15, 20],
        rowsPerPage: 10,
        rowHover: true,
        selectableRows: false,
        fixedHeaderOptions: false,
    };

    return (
        <React.Fragment>
            <Grid className="dynamicTable">
                <MUIDataTable
                    data={data}
                    columns={columns}
                    options={options}
                />
            </Grid>
        </React.Fragment>
    )
}

export default HRBP;