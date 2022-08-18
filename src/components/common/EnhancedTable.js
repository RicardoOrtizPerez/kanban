import { Box, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { visuallyHidden } from '@mui/utils'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded'
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded'
import DoNotDisturbOnRoundedIcon from '@mui/icons-material/DoNotDisturbOnRounded'
import BugReportIcon from '@mui/icons-material/BugReport'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

function createData(id, title, assigned_to, status, priority, description, created_at, updated_at) {
    return { id, title, assigned_to, status, priority, description, created_at, updated_at }
}

const headCells = [
    { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
    { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
    { id: 'assigned_to', numeric: false, disablePadding: false, label: 'Assigned To' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'priority', numeric: false, disablePadding: false, label: 'Priority' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'created_at', numeric: false, disablePadding: false, label: 'Created At' },
    { id: 'updated_at', numeric: false, disablePadding: false, label: 'Updated At' },
]

let rowsDta = [
    createData(0, 'Work Item 1', 'Ricardo Ortiz', 'Open', 'Low', 'This is a work item', '2020-01-01', '2020-01-01'),
    createData(1, 'Work Item 2', 'John Doe', 'Open', 'Low', 'This is a work item', '2020-01-01', '2020-01-01'),
    createData(2, 'Work Item 3', 'John Doe', 'Open', 'Low', 'This is a work item', '2020-01-01', '2020-01-01'),
    createData(3, 'Work Item 4', 'John Doe', 'Open', 'Low', 'This is a work item', '2020-01-01', '2020-01-01'),
    createData(4, 'Work Item 5', 'John Doe', 'Open', 'Medium', 'This is a work item', '2020-01-01', '2020-01-01'),
    createData(5, 'Work Item 6', 'John Doe', 'Open', 'Low', 'This is a work item', '2022-01-01', '2020-01-01'),
    createData(6, 'Work Item 7', 'John Doe', 'Open', 'Medium', 'This is a work item', '2022-01-01', '2020-01-01'),
    createData(7, 'Work Item 8', 'John Doe', 'Open', 'Low', 'This is a work item', '2020-04-06', '2020-01-01'),
    createData(8, 'Work Item 9', 'John Doe', 'Open', 'High', 'This is a work item', '2020-04-05', '2020-01-01'),
    createData(9, 'Work Item 10', 'John Doe', 'Open', 'High', 'This is a work item', '2022-01-02', '2020-01-01'),
    createData(10, 'Work Item 11', 'Ricardo Ortiz', 'Open', 'Low', 'This is a work item', '2022-01-02', '2020-01-01'),
    // create data empty row
]

function descendingComparator(a,b,orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
    
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property)
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox color='info'
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all work items' }}
                        icon= {<RadioButtonUncheckedRoundedIcon/>}
                        checkedIcon= {<CheckCircleRoundedIcon/>}
                        indeterminateIcon={<DoNotDisturbOnRoundedIcon/>}
                        />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell 
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}>
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}>
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                            </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

const EnhancedTable = (props) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState(props.rows)

    // useEffect when rows is update in props
    useEffect(() => {
        setRows(props.rows)
    } , [props.rows])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name)
        let newSelected = []
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name)
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1))
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            )
        }
        setSelected(newSelected)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    // handle al dar clic al control de numero de filas de la tabla
    const handleChangeRowsPerPage = (event) => {
        console.log(event)
        setRowsPerPage(parseInt(event.target.value, 10))
        // colocarnos en la pagina 1
        setPage(0)
    }

    const handleChangeDense = (event) => {
        setDense(event.target.checked)
    }

    const isSelected = (name) => selected.indexOf(name) !== -1

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

    return (
        <Box sx={{ width: '100%'}}>
            <TableContainer sx={{ height: '360px', maxHeight: 440, maxWidth: '100%', overflowX: 'scroll' }}>
                <Table stickyHeader aria-labelledby="tableTitle" aria-label="enhanced table" size='small'>
                    <EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={rows.length} />
                    <TableBody>
                        {
                            stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.id)
                                const labelId = `enhanced-table-checkbox-${index}`

                                return (
                                    <TableRow 
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{
                                            '&.Mui-selected': {
                                                backgroundColor: '#deecf9',
                                            },
                                            '& td': {
                                                border: 'none'
                                            }
                                        }}
                                        >
                                        <TableCell padding="checkbox">
                                            <Checkbox 
                                                color='info'
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                                icon={<CheckCircleOutlineRoundedIcon
                                                    sx={{
                                                        '&.MuiSvgIcon-root': {
                                                            color: 'rgba(0, 0, 0, 0.20)',
                                                        }
                                                    }}
                                                />}
                                                checkedIcon={<CheckCircleRoundedIcon/>}
                                                />
                                        </TableCell>
                                        <TableCell
                                            id={labelId}
                                            scope="row"
                                            align='center'
                                            padding="none">
                                                {row.id}
                                        </TableCell>
                                        <TableCell align="left" sx={{ width: '280px', display: 'flex'}}>
                                            {row.type === 'Bug' ? <BugReportIcon fontSize="small" sx={{color:'#339947', mr:2}}/> : row.type === 'Task' ? <CheckBoxIcon fontSize="small" sx={{color:'#9f840a', mr:2}}/> : <FlashOnIcon fontSize="small" sx={{color:'#e06c00', mr:2}}/>}
                                            <Typography
                                                sx={{
                                                    width: '100%',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    fontSize: '14px',
                                                    color: '#2d3436',
                                                    }}
                                                >
                                                {row.title}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left" sx={{ width: '200px', maxWidth: '210px'}}>
                                            <Typography sx={{mt:0, width: '100%', overflow: 'hidden', whiteSpace:'nowrap', textOverflow: 'ellipsis', fontSize: '14px', color: '#2d3436'}}>
                                                {row.assigned_to}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left" sx={{ width: '100px', maxWidth: '110px'}}>
                                            {row.status}
                                        </TableCell>
                                        <TableCell align="left">{row.priority}</TableCell>
                                        <TableCell align="left" sx={{ width: '280px', display: 'flex'}}>
                                            <Typography sx={{ width: '100%', fontSize: '14px', hoverflow: 'hidden'}}>
                                                {row.description}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left" sx={{ minWidth: '140px'}}>
                                            <Typography sx={{ width: '100%', fontSize: '14px', color: '#2d3436'}}>
                                                {row.created_at}
                                            </Typography>
                                            </TableCell>
                                        <TableCell align="left" sx={{ minWidth: '140px'}}>
                                            <Typography sx={{ width: '100%', fontSize: '14px', color: '#2d3436'}}>
                                                {row.updated_at}
                                            </Typography>
                                            </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        {emptyRows > 0 && (
                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                <TableCell colSpan={headCells.length+1} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    )
}

export default EnhancedTable