import { Button, Box, Typography, Divider, TextField, IconButton, Card } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

const Kanban = (props) => {
    const boardId = props.boardId
    const [data, setData] = useState([])
    const [selectedTask, setSelectedTask] = useState(undefined)

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const onDragEnd = async({source, destination}) => {
        if (!destination) return

        const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
        const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)
        
        const sourceCol = data[sourceColIndex]
        const destinationCol = data[destinationColIndex]

        const sourceSectionId = sourceCol.id
        const destinationSectionId = destinationCol.id

        const sourceTasks = [...sourceCol.tasks]
        const destinationTasks = [...destinationCol.tasks]

        if (source.droppableId !== destination.droppableId) {
            const [removed] = sourceTasks.splice(source.index, 1)
            destinationTasks.splice(destination.index, 0, removed)
            data[sourceColIndex].tasks = sourceTasks
            data[destinationColIndex].tasks = destinationTasks
        } else {
            const [removed] = sourceTasks.splice(source.index, 1)
            sourceTasks.splice(destination.index, 0, removed)
            data[sourceColIndex].tasks = sourceTasks
        }

        setData(data)
    }

    const createSection = async() => {
        const newSection = {
            id: `${Date.now()}`,
            title: 'New Section',
            tasks: []
        }
        setData([...data, newSection])
    }


    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
                <Button onClick={createSection}>
                    Add section
                </Button>
                <Typography variant="body2" fontWeight={700}>
                    {data.length} sections
                </Typography>
            </Box>
            <Divider />

            <DragDropContext onDragEnd={onDragEnd}>
                <Box sx={{display: 'flex', alignItems: 'flex-start', overflow:'auto'}}>
                    {/* secciones de tareas */}
                    {
                        data.map(section => (
                            <div key={section.id} style={{width: '300px', padding: '5px', border:'1px solid'}}>
                                <Droppable key={section.id} droppableId={section.id}>
                                    {(provided) => (
                                        <Box ref={provided.innerRef} {...provided.droppableProps} sx={{ width: '300px', padding: '10px', marginRight:'10px'}}>
                                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>
                                                <TextField 
                                                    value={section.title}
                                                    placeholder='Untitled'
                                                    variant='outlined'
                                                    sx={{
                                                        flexGrow: 1,
                                                        '& .MuiOutlinedInput-input': {padding: 0},
                                                        '& .MuiOutlinedInput-notchedOutline': { border: 'unset'},
                                                        '& .MuiOutlinedInput-root': {fontSize: '1rem', fontWeight: '700'}
                                                    }}
                                                />
                                                <IconButton variant='outlined' size='small' sx={{ color: 'gray', '&:hover': {color: 'green'}}}>
                                                    <AddOutlinedIcon />
                                                </IconButton>
                                                <IconButton variant='outlined' size='small' sx={{ color: 'gray', '&:hover': {color: 'red'}}}>
                                                    <DeleteOutlinedIcon />
                                                </IconButton>
                                            </Box>
                                            {/* Seccion de tareas */}
                                            {
                                                section.tasks.map((task, index) => (
                                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} 
                                                                sx={{
                                                                    borderRadius: 0,
                                                                    borderLeft: `2px solid ${task.type === 'Task' ? '#9f840a' : task.type === 'Bug' ? '#339947' : '#e06c00'}`, 
                                                                    padding: '10px', 
                                                                    marginBottom: '10px', 
                                                                    cursor: snapshot.isDragging ? 'grabbing' : 'pointer !important',
                                                                    borderTop: task === selectedTask ? '1px solid #9f840a' : '1px solid #c8c8c8',
                                                                    borderBottom: task === selectedTask ? '1px solid #9f840a' : '1px solid #c8c8c8',
                                                                    borderRight: task === selectedTask ? '1px solid #9f840a' : '1px solid #c8c8c8',
                                                                    boxShadow: 'none'
                                                                }} onClick={() => setSelectedTask(task)}>
                                                                <Typography>
                                                                    {task.task === '' ? 'Untitled' : task.task}
                                                                </Typography>
                                                            </Card>
                                                        )}
                                                    </Draggable>
                                                ))
                                            }
                                            {provided.placeholder}
                                        </Box>
                                    )}
                                </Droppable>
                            </div>
                        ))
                    }
                </Box>
            </DragDropContext>
        </>
    )
}

export default Kanban