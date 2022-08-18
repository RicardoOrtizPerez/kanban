import { Avatar, Box, Card, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';

function stringToColor(string) {
    let hash = 0
    let i

    for (i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF
        color += ('00' + value.toString(16)).substr(-2)
    }
    return color
}
function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: '35px',
            height: '35px',
            fontSize: '12px',
            mr: '10px',
            mt: '5px',
        },
        children: `${name.split(' ')[0][0]}`
    }
}

const ProjectItem = ({onDelete, project }) => {
    // cambiar el formato de la fecha para que se vea mas comodo
    const date = new Date(project.create_at)
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    const dateFormatted = date.toLocaleDateString('es-ES', options)
    return (
        <Grid item xs={4}>
            <Card variant='outlined'
                sx={{ background: '#ffffff' }}>
                <Box sx={{ ml: '10px', mt: '5px', display:'flex', justifyContent: 'space-between', color: '#5e5e5e'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar {...stringAvatar(project.title)}>{project.title.charAt(0).toUpperCase() }</Avatar>
                        <Typography variant='subtitle1' sx={{fontWeight: 'bold'}}>{project.title}</Typography>
                    </Box>
                    <IconButton size='small' onClick={onDelete}>
                        <MoreVertIcon fontSize='12px'/>
                    </IconButton>
                </Box>
                <Box sx={{
                    p: '10px',
                    color: '#154360'
                }}>
                    <Typography variant='body2' sx={{
                            display: '-webkit-box',
                            maxWidth: '100%',
                            maxHeight: '65px',
                            height: '65px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: '3'
                        }}>
                            {/* convert html template to plain text */}
                            {project.description.replace(/<[^>]*>/g, '')}
                            {/* {project.description} */}
                    </Typography>
                </Box>
                <Box sx={{ p:'10px', width: '100%', display:'flex', justifyContent:'space-between'}}>
                    <Typography variant='body2' sx={{fontSize: '12px'}}>
                        {project.create_by.username}
                    </Typography>
                    <Typography variant='body2' sx={{fontSize: '12px',color: '#5e5e5e'}}>{dateFormatted}</Typography>
                </Box>
            </Card>
        </Grid>
    )
}

export default ProjectItem