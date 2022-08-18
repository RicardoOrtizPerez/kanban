import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react'

const EnhancedTableHead = (props) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding='checkbox'>
                    <Checkbox color="primary" indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all work items',
                        }}
                        />
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

export default EnhancedTableHead