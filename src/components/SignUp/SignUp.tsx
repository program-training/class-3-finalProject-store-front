import { useForm, type FieldValues, UseFormWatch } from "react-hook-form";
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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";

const defaultTheme = createTheme();

export default function SignUp() {
 const navigate = useNavigate();
 const location = useLocation();
 const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
 } = useForm();
 const password: UseFormWatch<Text> = watch("password");


 const onSubmit = async (data: FieldValues) => {
  data = { email: data.email, password: data.password };
  try {
   const api = await axios.post(`${import.meta.env.VITE_BASE_URL}users/signUp`, data);
   if (api.statusText === "OK") {
    localStorage.setItem("userId", JSON.stringify(api.data.userId));
    localStorage.setItem("email", JSON.stringify(data.email));
    alert("You have successfully registered");
    navigate(location.state?.from || "/");
   } else {
    throw new Error("Existing user, please sign in");
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
      Sign up
     </Typography>
     <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
       <Grid item xs={12}>
        <TextField
         {...register("email", {
          required: "email is required",
          pattern: {
           value: /^\S+@\S+$/i,
           message: "email must be correct",
          },
         })}
         fullWidth
         margin="normal"
         type="email"
         label="Enter Email"
        />
        {errors.email && <ErrorMessage errors={errors} name="email" render={({ message }) => <p>{message}</p>} />}
       </Grid>
       <Grid item xs={12}>
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
         fullWidth
         margin="normal"
         type="password"
         label="Enter Password"
        />
        {errors.password && <ErrorMessage errors={errors} name="password" render={({ message }) => <p>{message}</p>} />}
       </Grid>
       <Grid item xs={12}>
        <TextField
         {...register("confirmPassword", {
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
          validate: (value) => value === password || "The passwords do not match",
         })}
         fullWidth
         margin="normal"
         type="password"
         label="Confirm Password"
        />
        {errors.confirmPassword && <ErrorMessage errors={errors} name="confirmPassword" render={({ message }) => <p>{message}</p>} />}
       </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
       Sign Up
      </Button>
      <Grid container justifyContent="flex-end">
       <Grid item>
        <Link href="/signIn" variant="body2">
         Already have an account? Sign in
        </Link>
       </Grid>
      </Grid>
     </Box>
    </Box>
   </Container>
  </ThemeProvider>
 );
}