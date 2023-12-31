import { useForm, type FieldValues, UseFormWatch } from "react-hook-form";
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { SignUp_signInProp } from "../../types";
import { REGISTER } from "../../graphqlQueries/mutations";
import { useMutation } from "@apollo/client";

export default function SignUp(prop: SignUp_signInProp) {
  const [success, setSuccess] = useState<boolean>(false);
  const [customError, setCustomError] = useState<string | undefined>(undefined);
  const [disable, setDisable] = useState<boolean>(false);
  const [signUp, { data, loading, error }] = useMutation(REGISTER);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password: UseFormWatch<Text> = watch("password");
  const onSubmit = async (dataRegister: FieldValues) => {
    dataRegister = { email: dataRegister.email, password: dataRegister.password };

    try {
      const test = await signUp({ variables: { user: dataRegister } });
      console.log(test);
      if (error) {
        throw error;
      }
      if (!loading && data) {
        console.log(data.register);
        localStorage.setItem("token", JSON.stringify(data.register));
        setSuccess(true);
        setDisable(true);
        setTimeout(() => {
          prop.setIsSignedUp(false);
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
