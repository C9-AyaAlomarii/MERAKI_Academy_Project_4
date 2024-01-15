import * as React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tokenContext } from "../../App";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const [message, setMessage] = useState({});
  const [logInInfo, setLogInInfo] = useState({});
  //req.token.role.permissions
  const navigate =useNavigate()
  const { edit,
    setEdit,token, setToken, setIsLoggedIn, isLoggedIn } =
    useContext(tokenContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/users/login`, logInInfo)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isLoggedIn", true);
        setMessage({
          messageShow: res.data.message,
          status: true,
        });
        setEdit(res.data.role._id)
        localStorage.setItem("edit",res.data.role._id)
          console.log('d', res.data.role._id)
        console.log("res", res.data.message);
       // console.log("first", res.data.token);
        setToken(res.data.token);

        setIsLoggedIn(true);

        // navigate("/dashboard").per
      })
      .catch((err) => {
        setMessage({
          messageShow: err.response.data.message,
          status: false,
        });
        localStorage.setItem("isLoggedIn", false);
        setIsLoggedIn(false);
        console.log("err", err);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={(e) => {
                setLogInInfo({ ...logInInfo, email: e.target.value });
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(e) => {
                setLogInInfo({ ...logInInfo, password: e.target.value });
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button onClick={()=>{
            
            }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {<h3>{message.messageShow}</h3>}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
