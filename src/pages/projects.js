import { Box, Button, Grid, Typography } from '@mui/material'
import React, {useEffect, useState} from 'react'
import ProjectItem from '../components/common/ProjectItem'
import projectApi from '../api/projectApi'
import AddIcon from '@mui/icons-material/Add'
import { useLocation } from 'react-router-dom'
import ProjectModal from '../components/common/ProjectModal'
import ConfirmDialog from '../components/common/ConfirmDialog'

const Projects = () => {
    const location = useLocation()
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [openModalProject, setOpenModalProject] = useState(false)
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null)

    useEffect(() => {
        if (location.pathname.split('/').length === 3) {
            callApiProjects()
            console.log(projects)
        }
    },[location])

    const callApiProjects = () => {
        let loaded = false
        setLoading(true)
        if (!loaded) {
            projectApi.getProjectsByOrganization(location.pathname.split('/')[2]).then(response => {
                setProjects(response)
                setLoading(false)
            }).catch(error => {
                console.log(error)
            }).finally(() => {
                loaded = true
            })
        }
        return () => loaded = true
    }
    const onOpenModalProject = () => {
        setOpenModalProject(true)
    }
    const onCloseModalProject = () => {
        setOpenModalProject(false)
    }
    const onSaveProject = () => {
        setOpenModalProject(false)
        callApiProjects()
    }
    const onOpenConfirmDialog = (project) => {
        console.log(project)
        setSelectedProject(project)
        setOpenConfirmDialog(true)
    }
    const callApiDeleteProject = () => {
        if (selectedProject) {
            let body = {
                id: selectedProject._id
            }
            projectApi.deleteProject(body).then(response => {

            }).catch(error => {}).finally(() => {
                callApiProjects()
            })
        }
    }
    
    return (
        loading ? <Typography>Cargando...</Typography> : (
            <Box sx={{ width: '100%', pl: 3, pr: 3}}>
                <Box sx={{ width: '100%'}}>
                    <Typography variant="overline" gutterBottom component="div">
                        Projects
                    </Typography>
                </Box>
                <Box sx={{ width: '100%', mb: '10px'}}>
                    <Button 
                        startIcon={<AddIcon/>} 
                        onClick={onOpenModalProject}
                        sx={{ color: '#606060', '& span.MuiButton-startIcon': { color: '#1976d2'}}}>
                            New Project
                    </Button>
                </Box>
                <Grid container spacing={2}>
                    {
                        projects != [] && projects != undefined && projects != null ? projects.map((project,index) => (
                        <ProjectItem key={index} project={project} onDelete={
                            () => onOpenConfirmDialog(project)
                        } />
                    )) : (
                         <Typography>No hay proyectos</Typography>
                    )}

                </Grid>
                <ProjectModal
                    open={openModalProject}
                    onClose={onCloseModalProject}
                    organizationId={location.pathname.split('/')[2]}
                    onSave={onSaveProject}
                />
                <ConfirmDialog
                    open={openConfirmDialog}
                    onConfirm={() => {
                        setOpenConfirmDialog(false)
                        callApiDeleteProject()
                    }}
                    onCancel={() => {
                        setOpenConfirmDialog(false)
                        setSelectedProject(null)
                    }}
                />
            </Box>
        )
    )
}

export default Projects