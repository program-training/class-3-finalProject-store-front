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
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { SignUp_signInProp } from "../../helpers/types";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphqlQueries/mutations";

export default function SignIn(prop: SignUp_signInProp) {
  const [success, setSuccess] = useState<boolean>(false);
  const [customError, setCustomError] = useState<string | undefined>(undefined);
  const [disable, setDisable] = useState<boolean>(false);
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (dataLogin: FieldValues) => {
    try {
      login({ variables: { dataLogin } });
      if (error) {
        throw error;
      }
      if (!loading && data) {
        localStorage.setItem("token", JSON.stringify(data.login));
        setSuccess(true);
        setDisable(true);
        setTimeout(() => {
          prop.setIsSignedIn(false);
          prop.setOpenDialog(false);
          prop.setIsToken(true);
        }, 2000);
      }
    } catch (error) {
      if (error instanceof Error) {
        setCustomError(error.message);
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
            Sign in
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
            </Grid>
            {!success && <Typography>{customError}</Typography>}
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
                <Typography>
                  Don't have an account?
                  <Button
                    onClick={() => {
                      prop.setIsSignedIn(false);
                      prop.setIsSignedUp(true);
                    }}
                  >
                    Sign Up
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {success && <Typography>You've logged in successfully</Typography>}
    </>
  );
}
