import React, {useState} from 'react'
import { Box, Button, TextField } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import authApi from '../api/authApi'
import LoadingButton from '@mui/lab/LoadingButton'


const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [usernameErrText, setUsernameErrText] = useState("")
    const [passwordErrText, setPasswordErrText] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUsernameErrText("")
        setPasswordErrText("")

        const data = new FormData(e.target)
        const username = data.get("username").trim()
        const password = data.get("password").trim()

        let err = false

        if (username === "") {
            err = true
            setUsernameErrText("Username is required.")
        }
        if (password === "") {
            err = true
            setPasswordErrText("Password is required.")
        }

        /* Returning if there is an error. */
        if (err) return
        /* Setting the loading state to true. */
        setLoading(true)
        try {
/* Sending a request to the server to login. If the login is successful, it will set the token in
localStorage and navigate to the home page. */
            const res = await authApi.login({username, password})
            setLoading(false)
            localStorage.setItem("token", res.token)
            navigate("/")
        } catch (error) {
            console.log(error)
            const errors = error.data.errors
            errors.forEach(er => {
                if (er.param === 'username') {
                  setUsernameErrText(er.msg)
                }
                if (er.param === 'password') {
                  setPasswordErrText(er.msg)
                }
            })
            setLoading(false)
        }
    }

    return (
        <>
            <Box
                component="form"
                sx={{mt:1 }}
                onSubmit={handleSubmit}
                noValidate>
                
                <TextField 
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    disabled={loading}
                    error={usernameErrText !== ""}
                    helperText={usernameErrText}
                    />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    disabled={loading}
                    error={passwordErrText !== ""}
                    helperText={passwordErrText}
                    />
                
                <LoadingButton
                    sx={{mt:3, mb:2}}
                    variant='outlined'
                    fullWidth
                    color='success'
                    type="submit"
                    loading={loading}>
                    Login
                </LoadingButton>
            </Box>
            <Button
                component={Link}
                to='/signup'
                sx={{textTransform: 'none'}}>
                    Don't have an account? Sign up
            </Button>
        </>
    )
}

export default Login