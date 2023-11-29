import { useForm, type FieldValues, UseFormWatch } from "react-hook-form";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { SignUp_signIn } from "../../types";

export default function SignUp(prop: SignUp_signIn) {
  const [success, setSuccess] = useState<boolean>(false);
  const [customError, setCustomError] = useState<string | undefined>(undefined);
  const [disable, setDisable] = useState<boolean>(false);
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
      const api = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/register`, data);
      if (api.statusText === "Created") {
        localStorage.setItem("token", JSON.stringify(api.data));
        setSuccess(true);
        setDisable(true);
        setTimeout(() => {
          prop.setIsSignedUp(false);
          prop.setOpenDialog(false);
        }, 2000);
      } else {
        throw api;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setCustomError(error.response?.data);
      }
    }
  };
  return (
    <>
      <Container
        sx={{
          display: disable ? "none" : "auto",
        }}
        component="main"
        maxWidth="xs"
      >
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
            {!success && <Typography>{customError}</Typography>}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography>
                  Already have an account?
                  <Button
                    onClick={() => {
                      prop.setIsSignedUp(false);
                      prop.setIsSignedIn(true);
                    }}
                  >
                    Sign in
                  </Button>{" "}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {success && <Typography>You have successfully registered</Typography>}
    </>
  );
}

