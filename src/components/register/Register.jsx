import { useState } from "react";
import * as yup from "yup";
import { omit } from "lodash";
import { useFormik } from "formik";
import {
  InputAdornment,
  IconButton,
  FormControl,
  Grid,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./Register.module.scss";
import { Link } from "react-router-dom";

const validationSchema = yup.object({
  username: yup
    .string("Enter your email")
    // .email("Enter a valid email address.")
    .required("This is a required field.")
    .min(4, "The minimum length should be 4 characters.")
    .matches(/^[aA-zZ\s\d]+$/, "Special characters are not allowed."),
  password: yup
    .string("Enter your password")
    .required("This is a required field.")
    .min(6, "The minimum length should be 6 characters.")
    .matches(/^[aA-zZ\s\d]+$/, "Special characters are not allowed."),
  repeatPassword: yup
    .string("Enter your password")
    .required("This is a required field.")
    .oneOf([yup.ref("password"), null], "Passwords must match")

})

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = omit(values, ["repeatPassword"]);
      const response = await fetch(
        `https://books-library-dev.herokuapp.com/api/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        throw new Error("Register failed");
      } else {

      }
    },
  });
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <Grid container >
        <Grid item xs={5}>
          <div className={styles["login-container"]}>
            <img src="/Logo.png" alt="digi-books" />
            <h3 className={styles.heading}>Welcome to the best book database!</h3>
            <p>Create your profile</p>
            <form onSubmit={formik.handleSubmit}>
              <Stack direction="column">
                <FormControl variant="outlined">
                  <label htmlFor="username">Email</label>
                  <TextField
                    id="username"
                    // type="email"
                    inputProps={{
                      className: styles.input,
                    }}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                  ></TextField>
                </FormControl>
                <FormControl
                  className={styles.FormControl}
                  variant="outlined"
                >
                  <label htmlFor="password">Password</label>
                  <TextField
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    inputProps={{
                      className: styles.input,
                    }}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </FormControl>
                <FormControl
                  className={styles.FormControl}
                  variant="outlined"
                >
                  <label htmlFor="repeatPassword">Repeat Password</label>
                  <TextField
                    id="repeatPassword"
                    type={showRepeatPassword ? "text" : "password"}
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                    inputProps={{
                      className: styles.input,
                    }}
                    error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                    helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showRepeatPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </FormControl>
                <Button disabled={!(formik.isValid && formik.dirty)} type="submit" className={styles.button} variant="contained">
                  Sign Up
                </Button>
                <p className={styles["login"]}>You have an account?<Link to="/login">LOG IN HERE</Link></p>
              </Stack>
            </form>
          </div>
        </Grid>
        <Grid item xs={7}>
          <img className={styles.library} src="/Library-hd.png" alt="library" />
        </Grid>
      </Grid>
    </div>
  );
}