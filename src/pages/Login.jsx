import { CssBaseline } from '@mui/material'
import { Avatar } from '@mui/material'
import { Box } from '@mui/material'
import { Container } from '@mui/material'
import React from 'react'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { useTheme } from '@emotion/react'

function Login() {
  const theme=useTheme()
  return (
    <>
    <Container component={main} maxWidth="xs">
      <CssBaseline/>
      <Box sx={{
        mt:theme.spacing(8),
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
      }}>
        <Avatar sx={{
          m:1,
          backgroundColor:theme.palette.secondary.main,

        }}>
          <LockOutlinedIcon/>
          </Avatar>
          <Typography component={"h1"} variant="h5">
            Sign In
          </Typography>
         <form sx={{
          width:"100%",
          mt:1,
         }}>
          <TextField variant="outlined" margin="normal" required
          fullWidth id="email" name="email" type="email" autoFocus autoComplete="off">
          </TextField>
          <TextField variant="outlined" margin="normal" required
          fullWidth id="password" name="password" type="password" autoFocus autoComplete="current-password">
          </TextField>

          <Button variant="contained" fullWidth type="submit" color="primary" sx={{
            margin:theme.spacing(3,0,2)
          }}>
            Sign In
          </Button>
         </form>
      </Box>
    </Container>
    </>
  )
}

export default Login