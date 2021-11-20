import { useState } from "react";
import {
  InputAdornment,
  IconButton,
  FormControl,
  Grid,
  OutlinedInput,
  Stack,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./Register.module.scss";
import { Link } from "react-router-dom";

export default function Register() {
  const [values, setValues] = useState({
    password: "",
    rePassword: "",
    showPassword: false,
    showRePassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowRePassword = () => {
    setValues({ ...values, showRePassword: !values.showRePassword });
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
            <h3 className={styles.heading}>Welcome to the best book database!</h3>
            <p>Create your profile</p>
            <Stack direction="column">
              <FormControl variant="outlined">
                <label htmlFor="email">Email</label>
                <OutlinedInput
                  id="email"
                  type="email"
                  inputProps={{
                    className: styles.input,
                  }}
                ></OutlinedInput>
              </FormControl>
              <FormControl
                className={styles.FormControl}
                variant="outlined"
              >
                <label htmlFor="password">Password</label>
                <OutlinedInput
                  id="password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  inputProps={{
                    className: styles.input,
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl
                className={styles.FormControl}
                variant="outlined"
              >
                <label htmlFor="rePassword">Repeat Password</label>
                <OutlinedInput
                  id="rePassword"
                  type={values.showRePassword ? "text" : "password"}
                  value={values.rePassword}
                  onChange={handleChange("rePassword")}
                  inputProps={{
                    className: styles.input,
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowRePassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showRePassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button className={styles.button} variant="contained">
                Sign Up
              </Button>
              <p className={styles["login"]}>You have an account?<Link to="/login">LOG IN HERE</Link></p>
            </Stack>
          </div>
        </Grid>
        <Grid item xs={7}>
          <img className={styles.library} src="/Library.png" alt="library" />
        </Grid>
      </Grid>
    </div>
  );
}