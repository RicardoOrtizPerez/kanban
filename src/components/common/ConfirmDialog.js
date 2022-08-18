import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material'
import React from 'react'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';

const ConfirmDialog = props => {
    const modalStyle = {
        outline: 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '35%',
        minHeight: '30%',
        bgcolor: '#fff',
        border: '0px solid #000',
        boxShadow: 24,
        p: '20px',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'space-between',
        FontFace: "'Segoe UI', sans-serif;"
    }
    return (
        <Modal
            open={props.open}
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
            closeAfterTransition>
            <Fade in={props.open}>
                <Box sx={modalStyle}>
                    <Box sx={{width: '100%'}}>
                        <Typography variant="body2" sx={{fontSize: '20px'}}>Delete project</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%', mt: '10px' }}>
                        <ReportProblemRoundedIcon fontSize='45px' sx={{ color: '#d67f3c', fontSize: '45px' }}/>
                        <Typography variant="body2" sx={{fontSize: '14px'}}>Are you sure you want to delete the selected proyect?</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', mt:'auto'}}>
                        <Button variant='outlined' color='primary' sx={{width: '50%', mr: '5px', ml: '5px'}} onClick={props.onConfirm}>Confirmar</Button>
                        <Button variant='outlined' color='error' sx={{width: '50%', mr: '5px', ml: '5px'}} onClick={props.onCancel}>Cancelar</Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}

export default ConfirmDialog