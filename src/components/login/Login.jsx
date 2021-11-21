import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
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
import styles from "./Login.module.scss";
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
})


export default function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await fetch(
        `https://books-library-dev.herokuapp.com/api/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(authActions.setUser(data.token)); //Change if something more than token is returned
      } else {
        throw new Error("Login failed");
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <Grid container >
        <Grid item xs={5}>
          <div className={styles["login-container"]}>
            <img src="/Logo.png" alt="digi-books" />
            <p className={styles.heading}>Welcome Back!</p>
            <form onSubmit={formik.handleSubmit}>
              <Stack direction="column">
                <FormControl variant="outlined">
                  <label htmlFor="username">Email</label>
                  <TextField
                    id="username"
                    // type="email"
                    value={formik.values.username}
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
                            onClick={handleClickShowPassword}
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
                      ),
                    }}
                  />
                </FormControl>
                <Link className={styles.recover} to="login">
                  Recover password
                </Link>
                <Button disabled={!(formik.isValid && formik.dirty)} type="submit" className={styles.button} variant="contained">
                  Log in
                </Button>
                <p className={styles["sign-up"]}>You don't have an account? <Link to="/register"> SIGN UP HERE</Link></p>
              </Stack>
            </form>
          </div>
        </Grid>
        <Grid item xs={7}>
          <img className={styles.library} src="/Library.png" alt="library" />
        </Grid>
      </Grid>
    </div>
  );
}
