import { Backdrop, Box, Button, Divider, Fade, IconButton, Modal, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import projectApi from '../../api/projectApi'

let isModalClosed = false
let timer
const timeout = 500

const ProjectModal = (props) => {

    const editorWrapperRef = useRef()
    // const [project, setProject] = useState(null)
    const organizationId = props.organizationId
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    const modalStyle = {
        outline: 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: '#fff',
        border: '0px solid #000',
        boxShadow: 24,
        p: 1,
        height: '80%'
    }
    const onClose = () => {
        isModalClosed = true
        // props.onSave(project)
        props.onClose()
    }
    const updateTitle = (e) => {
        setTitle(e.target.value)
    }
    const updateEditorHeight = () => {
        // setTimeout(() => {
        //     if (editorWrapperRef.current) {
        //       const box = editorWrapperRef.current
        //       box.querySelector('.ck-editor__editable_inline').style.height = (box.offsetHeight - 50) + 'px'
        //     }
        //   }, timeout)
    }
    const updateDescription = (event, editor) => {
        clearTimeout(timer)
        const data = editor.getData()
        setDescription(data)
    }

    const onSave = () => {
        setLoading(true)
        const project = {
            title: title,
            description: description,
            asociationId: organizationId
        }
        if (project.title != '' && project.description != '') {
            // guardar el nuevo proyecto
            projectApi.newProject(project).then(response => {
                console.log(response)
                setLoading(false)
            }).catch(error => {
                console.log(error)
            })
            .finally(() => {
                props.onSave()
            })
        } else {
            console.log('No se puede guardar el proyecto')
            setLoading(false)
        }
    }

    return (
        <Modal
            open={props.open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}>
            
            <Fade in={props.open}>
                <Box sx={modalStyle}>
                    <Box sx={{ display: 'flex',alignItems: 'center', justifyContent: 'flex-end', width: '100%'}}>
                        <IconButton variant='outlined' color='error' onClick={props.onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'column',
                        padding: '1rem 3rem 3rem'
                    }}>
                    <TextField
                        value={title}
                        onChange={updateTitle}
                        placeholder='Untitled'
                        variant='outlined'
                        fullWidth
                        disabled={loading}
                        sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-input': { padding: 0 },
                            '& .MuiOutlinedInput-notchedOutline': { border: 'unset ' },
                            '& .MuiOutlinedInput-root': { fontSize: '1.5rem', fontWeight: '700' },
                            marginBottom: '10px'
                        }}/>
                    <Typography variant='body2' fontWeight='700'>
                        {/* {task !== undefined ? Moment(task.createdAt).format('YYYY-MM-DD') : ''} */}
                    </Typography>
                    <Divider sx={{ margin: '.5rem 0' }} />
                    <Box ref={editorWrapperRef}
                        sx={{
                            position: 'relative',
                            height: '50%',
                            overflowX: 'hidden',
                            overflowY: 'auto'
                        }}>
                        <CKEditor
                            editor={ClassicEditor}
                            data={description}
                            onChange={updateDescription}
                            onFocus={updateEditorHeight}
                            onBlur={updateEditorHeight}
                            /* Language in spanish */
                            disabled={loading}
                            config={{
                                language: 'es',
                            }}
                        />
                    </Box>
                    <Box sx={{display: 'flex', flexDirection:'column', alignItems: 'center', width:'100%'}}>
                        <Button variant="contained" onClick={onSave}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Fade>
    </Modal>
    )
}

export default ProjectModal