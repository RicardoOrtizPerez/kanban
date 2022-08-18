import { Box, Button, Checkbox, Divider, IconButton, Menu, MenuItem, OutlinedInput, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import BugReportIcon from '@mui/icons-material/BugReport'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import Grid from '@mui/material/Grid'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Tooltip from '@mui/material/Tooltip'
import Switch from '@mui/material/Switch'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined'
import EnhancedTable from '../components/common/EnhancedTable'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'

function createData(id, title, type, assigned_to, status, priority, description, created_at) {
    return { id, title, type, assigned_to, status, priority, description, created_at }
}

let tmpRows = [
    createData(1, 'Bug Report','Bug', 'John Doe knknkn nknkn nknknk ', 'Doing', 'High', 'This is a bug report', '2020-01-01'),
    createData(2, 'Feature Request como less inate common less inactive columns in ellipsis','Task', 'Ricardo Ortiz', 'To Do', 'Low', 'This is a feature request', '2020-01-01'),
    createData(3, 'Feature Request','Add On', 'John Doe', 'Doing', 'Low', 'This is a feature request', '2020-01-01'),
    createData(4, 'Feature Request','Add On', 'John Doe', 'Doing', 'Low', 'This is a feature request', '2020-01-01'),
    // create random data for testing
    createData(5, 'Feature Request','Add On', 'John Doe', 'Doing', 'Low', 'This is a feature request', '2020-01-01'),
    createData(6, 'Feature Request','Add On', 'John Doe', 'To Do', 'Low', 'This is a feature request', '2020-01-01'),
    createData(7, 'Feature Request','Add On', 'John Doe', 'Doing', 'Low', 'This is a feature request', '2020-01-01'),
    createData(8, 'Bug Report','Bug', 'John Doe knknkn nknkn nknknk ', 'To Do', 'High', 'This is a bug report', '2020-01-01'),
    createData(9, 'Feature Request como less inate common less inactive columns in ellipsis','Bug', 'Ricardo Ortiz', 'Doing', 'High', 'This is a feature request', '2020-01-01'),
    createData(10, 'Feature Request','Add On', 'John Doe', 'Doing', 'Low', 'This is a feature request', '2020-01-01'),
    createData(11, 'Feature Request','Add On', 'John Doe', 'Doing', 'Low', 'This is a feature request', '2020-01-01'),
    // create random data for testing

    
]

const WorkItems = () => {
    const [filter, setFilter] = useState('');
    const [filterType, setFilterType] = useState([]);
    const [filterAssignee, setFilterAssignee] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterText, setFilterText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [openFilter, setOpenFilter] = useState(false);
    const [rows, setRows] = useState(tmpRows)


    const handleChange = (event) => {
        setFilter(event.target.value)
    }
    const handleChangeFilterText = (event) => {
        setFilterText(event.target.value)
    }

    const handleChangeType = (event) => {
        setFilterType(event.target.value)
    }

    const handleChangeAssignee = (event) => {
        setFilterAssignee(event.target.value)
    }

    const handleChangeStatus = (event) => {
        setFilterStatus(event.target.value)
    }


    useEffect(() => {
        if (filterAssignee === '') {
            if (filterStatus === '') {
                setRows(tmpRows)
            } else {
                setRows(tmpRows.filter(row => row.status === filterStatus))
            }
        } else {
            if (filterStatus === '') {
                setRows(tmpRows.filter(row => row.assigned_to === filterAssignee))
            } else {
                setRows(tmpRows.filter(row => row.assigned_to === filterAssignee && row.status === filterStatus))
            }
        }
    }, [filterAssignee])

    useEffect(() => {
        // let rowsTmp = tmpRows;
        if (filterStatus === '') {
            if (filterAssignee === '') {
                setRows(tmpRows)
            } else {
                setRows(tmpRows.filter(row => row.assigned_to === filterAssignee))
            }
        } else {
            if (filterAssignee === '') {
                setRows(tmpRows.filter(row => row.status === filterStatus))
            } else {
                setRows(tmpRows.filter(row => row.assigned_to === filterAssignee && row.status === filterStatus))
            }
        }


    }, [filterStatus])

    useEffect(() => {
        if (filterType.length === 0) {
            setRows(tmpRows)
        } else {
            setRows(tmpRows.filter(row => filterType.includes(row.type)))
        }
    }, [filterType])

    useEffect(() => {
        if (filterText === '') {
            setRows(tmpRows)
        } else {
            // filter by all columns except id
            setRows(tmpRows.filter(row => row.title.toLowerCase().includes(filterText.toLowerCase()) || row.description.toLowerCase().includes(filterText.toLowerCase()) || row.assigned_to.toLowerCase().includes(filterText.toLowerCase()) || row.status.toLowerCase().includes(filterText.toLowerCase()) || row.priority.toLowerCase().includes(filterText.toLowerCase())))
        }
    }, [filterText])




    const openNWI = Boolean(anchorEl);
    const openM1 = Boolean(anchorEl1);

    const handleNWI = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleM1 = (event) => {
        setAnchorEl1(event.currentTarget)
    }

    const handleCloseNWI = () => {
        setAnchorEl(null)
    }

    const handleCloseM1 = () => {
        setAnchorEl1(null)
    }

    const handleOpenFilter = () => {
        if (openFilter) {
            setOpenFilter(false)
            setRows(tmpRows)
        } else {
            setOpenFilter(true)
        }
    }


    
    return (
        <Box sx={{ pl:'10px', pr: '10px'}}>
            <Typography sx={{ ml:2}} variant="overline" gutterBottom component="div">
                Work Items
            </Typography>
            <Grid container sx={{ backgroundColor: '#ffffff', p: '10px', width: '100%' }}>
                <Grid item xs={8} md={11} sx={{ display: 'flex', width: '100%'}}>
                    <Select value={filter} displayEmpty sx={{ width: '180px', height: '35px'}} onChange={handleChange}>
                        <MenuItem sx={{color: '#606060'}} value="to_me">Assigned to me</MenuItem>
                        <MenuItem sx={{color: '#606060'}} value="following">Following</MenuItem>
                        <MenuItem sx={{color: '#606060'}} value="mentioned">Mentioned</MenuItem>
                        <MenuItem sx={{color: '#606060'}} value="my_activity">My activity</MenuItem>
                        <Divider/>
                        <MenuItem sx={{color: '#606060'}} value="recent_updated">Recent updated</MenuItem>
                        <MenuItem sx={{color: '#606060'}} value="recent_completed">Recent completed</MenuItem>
                        <MenuItem sx={{color: '#606060'}} value="recent_created">Recent created</MenuItem>
                    </Select>
                    <Divider orientation="vertical" sx={{ml:1, mr:1}}/>
                    <Button 
                        startIcon={<AddIcon/>} 
                        endIcon={ openNWI ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        aria-controls={ openNWI ? 'nwi-menu' : undefined }
                        aria-haspopup="true"
                        aria-expanded={ openNWI ? 'true' : undefined }
                        onClick={handleNWI}
                        sx={{ color: '#606060', '& span.MuiButton-startIcon': { color: '#1976d2'}}}
                        >
                        New Work Item
                    </Button>
                    <Divider orientation="vertical" sx={{ml:1, mr:1}} />
                    <Menu
                        id="nwi-menu"
                        anchorEl={anchorEl}
                        open={openNWI}
                        onClose={handleCloseNWI}
                        MenuListProps={{'aria-labelledby': 'nwi-menu' }}>
                        <MenuItem sx={{ minWidth: '180px', color:'#606060' }} onClick={handleCloseNWI}>
                            <FlashOnIcon fontSize="small" sx={{color:'#e06c00', mr:2}}/>
                            Epic
                        </MenuItem>
                        <MenuItem sx={{ minWidth: '180px', color:'#606060' }} onClick={handleCloseNWI}>
                            <BugReportIcon fontSize="small" sx={{color:'#339947', mr:2}}/>
                            Issue
                        </MenuItem>
                        <MenuItem sx={{ minWidth: '180px', color:'#606060' }} onClick={handleCloseNWI}>
                            <CheckBoxIcon fontSize="small" sx={{color:'#9f840a', mr:2}}/>
                            Task
                        </MenuItem>
                    </Menu>
                    <Button
                        startIcon={<DeleteOutlineOutlinedIcon/>}
                        sx={{ color: '#606060', '& span.MuiButton-startIcon': { color: '#1976d2'}}}>
                        Recycle bin
                    </Button>
                </Grid>
                <Grid item xs={4} md={1}>
                    <Tooltip title="View options">
                        <IconButton 
                            aria-controls={ openM1 ? 'view-options-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={ openM1 ? 'true' : undefined }
                            onClick={handleM1}
                            >
                            <TuneOutlinedIcon fontSize="small" sx={{color:'#1976d2'}}/>
                        </IconButton>
                    </Tooltip>
                    <Menu id="view-options-menu"
                        sx={{mr:5}}
                        anchorEl={anchorEl1}
                        open={openM1}
                        onClose={handleCloseM1}
                        MenuListProps={{'aria-labelledby': 'view-options-menu' }}>
                        
                        <Box sx={{ alignItems: 'center',pl:'10px',pr:'10px', maxWidth: '200px', minWidth:'200px' }}>
                            <Typography sx={{ width: '100%'}} fontSize='small'>
                                Completed Work Items
                            </Typography>
                            <Divider />
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                <Switch defaultChecked size='small' />
                                <Typography sx={{ ml: '5px'}} fontSize='small'>Shown</Typography>
                            </Box>
                        </Box>

                    </Menu>
                    <Tooltip title="Show filters">
                        <IconButton onClick={handleOpenFilter}>
                            <FilterAltOutlinedIcon fontSize="small" sx={{color:'#1976d2'}}/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider sx={{ width: '100%'}}/>
            { openFilter ? 
                <Grid container sx={{ mt:1, background: '#f0f0f0', p: '10px', borderRadius: '5px'}}>
                    <Grid item xs={6} md={6}>
                        <OutlinedInput onChange={handleChangeFilterText} value={filterText} placeholder='Filter with keyword' fullWidth size='small' startAdornment={<FilterAltOutlinedIcon fontSize='small' sx={{ fontWeight:'100'}}/>} sx={{ color:'#606060'}}/>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Select renderValue={(selected) => selected.join(', ')} multiple onChange={handleChangeType} displayEmpty sx={{ maxWidth:'120px', minWidth:'120px', color: filterType === '' ? '#606060' : '#000000', "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none", borderRadius: "5px 5px 0 0" }, "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { border: "none" }, '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { border: 'none' }, "&.MuiOutlinedInput-root:hover div.MuiSelect-select": { background: 'rgba(226,226,226,.55)' },"&.Mui-focused div.MuiSelect-select": { background: 'rgba(226,226,226,.55)'} }} size="small" value={filterType}>
                            <MenuItem disabled value='All'>
                                <em>Types</em>
                            </MenuItem>
                            <MenuItem value="Task" size="small" sx={{
                                '& .MuiPaper-root': {
                                    '& .MuiMenu-list': {
                                        padding: '4px 0',
                                        '& .MuiCheckbox-root': {
                                            padding: '0'
                                        }
                                    }
                                }
                            }}>
                                <Checkbox 
                                    checked={filterType.indexOf('Task') > -1}
                                    icon={<CheckCircleOutlineRoundedIcon fontSize="small" sx={{color:'#666666'}}/>}
                                    checkedIcon={<CheckCircleRoundedIcon fontSize="small" sx={{color:'#1976d2'}}/>}
                                    />
                                <CheckBoxIcon fontSize="small" sx={{color:'#9f840a', mr:1}}/>
                                Task
                            </MenuItem>
                            <MenuItem value="Bug">
                                <Checkbox 
                                    checked={filterType.indexOf('Bug') > -1} 
                                    icon={<CheckCircleOutlineRoundedIcon fontSize="small" sx={{color:'#666666'}}/>}
                                    checkedIcon={<CheckCircleRoundedIcon fontSize="small" sx={{color:'#1976d2'}}/>}
                                />
                                <BugReportIcon fontSize="small" sx={{color:'#339947', mr:1}}/>
                                Issue
                            </MenuItem>
                            <MenuItem value="Epic">
                                <Checkbox 
                                    checked={filterType.indexOf('Epic') > -1} 
                                    icon={<CheckCircleOutlineRoundedIcon fontSize="small" sx={{color:'#666666'}}/>}
                                    checkedIcon={<CheckCircleRoundedIcon fontSize="small" sx={{color:'#1976d2'}}/>}
                                />
                                <FlashOnIcon fontSize="small" sx={{color:'#e06c00', mr:1}}/>
                                Epic
                            </MenuItem>
                        </Select>
                        <Select onChange={handleChangeAssignee} displayEmpty sx={{ minWidth:'120px', color: filterType === '' ? '#606060' : '#000000', "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none", borderRadius: "5px 5px 0 0" }, "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { border: "none" }, '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { border: 'none' }, "&.MuiOutlinedInput-root:hover div.MuiSelect-select": { background: 'rgba(226,226,226,.55)' },"&.Mui-focused div.MuiSelect-select": { background: 'rgba(226,226,226,.55)'} }} size="small" value={filterAssignee}>
                            <MenuItem disabled value="">
                                <em>Asigned to</em>
                            </MenuItem>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Ricardo Ortiz">Ricardo Ortiz</MenuItem>
                            <MenuItem value="John Doe">John Doe</MenuItem>
                        </Select>
                        <Select onChange={handleChangeStatus} displayEmpty sx={{ minWidth:'120px', color: filterType === '' ? '#606060' : '#000000', "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none", borderRadius: "5px 5px 0 0" }, "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { border: "none" }, '&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { border: 'none' }, "&.MuiOutlinedInput-root:hover div.MuiSelect-select": { background: 'rgba(226,226,226,.55)' },"&.Mui-focused div.MuiSelect-select": { background: 'rgba(226,226,226,.55)'} }} size="small" value={filterStatus}>
                            <MenuItem disabled value="">
                                <em>States</em>
                            </MenuItem>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="Doing">Doing</MenuItem>
                            <MenuItem value="To Do">To Do</MenuItem>
                        </Select>
                        <Tooltip title="Close filter">
                            <IconButton sx={{ float: 'right' }} onClick={handleOpenFilter}>
                                <ClearOutlinedIcon fontSize="small" sx={{color:'#1976d2'}}/>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            :
            <></>}

            <EnhancedTable 
            // pasar props para filtrar datos de la table
            rows={rows}
            ></EnhancedTable>
        </Box>
    )
}

export default WorkItems