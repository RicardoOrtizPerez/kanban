import { Container, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Loading from '../common/Loading'
import authUtils from '../../utils/authUtils'

const AuthLayout = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            const isAuth = await authUtils.isAuthenticated()
            if (!isAuth) {
                setLoading(false)
            } else {
                navigate('/app/home')
            }
        }
        checkAuth()
    }, [navigate])

    return (
        loading ? (
            <Loading fullHeight />
        ) : (
            <Container component='main' maxWidth='xs'>
                <Box sx={{
                    marginTop: 8,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                <Outlet />
                </Box>
            </Container>
        )
    )
}

export default AuthLayout