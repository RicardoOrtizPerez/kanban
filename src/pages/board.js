import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, IconButton, TextFiled} from '@mui/material'
import Kanban from '../components/common/Kanban'


const Board = () => {
    const navigate = useNavigate()
    const { boardId } = useParams()
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')

    let sections = [
        {id: '1', title: 'To Do', tasks: [
            {id: '1', task: 'Task 1', type: 'Add On'},
            {id: '2', task: 'Task 2', type: 'Task'},
            {id: '3', task: 'Task 3', type: 'Bug'},
            {id: '4', task: 'Task 4', type: 'Task'}
        ]},
        {id: '2', title: 'In Progress', tasks: [
            {id: '5', task: 'Task 5', type: 'Bug'},
            {id: '6', task: 'Task 6', type: 'Add On'},
            {id: '7', task: 'Task 7', type: 'Task'},
        ]},
        {id: '3', title: 'Done', tasks: [
            {id: '8', task: 'Task 8', type: 'Task'},
            {id: '9', task: 'Task 9', type: 'Task'},
        ]}
    ];
    return (
        <Box sx={{ width: '100%'}}>
            <Kanban data={sections} boardId={'xsxsxs'} />
        </Box>
    )
}

export default Board