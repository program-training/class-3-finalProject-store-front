import { useForm, type FieldValues } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";

const defaultTheme = createTheme();

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  

  const onSubmit = async (data: FieldValues) => {
    try {
      const api = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, data);
      if (api.statusText === "OK") {
        localStorage.setItem("userId", JSON.stringify(api.data.userId));
        localStorage.setItem("email", JSON.stringify(data.email));
        alert("User is logged in");
        navigate("/products");
      } else {
        throw new Error("User does not exist");
      }
    } catch (error) {
      alert(error);
    }
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
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "email must be correct",
                },
              })}
              margin="normal"
              fullWidth
              type="email"
              label="Email"
            />
            {errors.email && <ErrorMessage errors={errors} name="email" render={({ message }) => <p>{message}</p>} />}
            <TextField
              {...register("password", {
                required: "password is required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&()*-+=]).+$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, and one special character (@, $, !, %, *, #, (, ), ^, =, +, &)",
                },
                minLength: {
                  value: 8,
                  message: "password most be minimum 8 characters",
                },
                maxLength: {
                  value: 20,
                  message: "password most be maximum 20 characters",
                },
              })}
              margin="normal"
              fullWidth
              type="password"
              label="Password"
              
            />
            {errors.password && <ErrorMessage errors={errors} name="password" render={({ message }) => <p>{message}</p>} />}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}