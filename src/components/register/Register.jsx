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
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
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
                  type={values.showPassword ? "text" : "password"}
                  value={values.rePassword}
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
              <Link className={styles.recover} to="login">
                Recover password
              </Link>
              <Button className={styles.button} variant="contained">
                Log in
              </Button>
              <p className={styles["sign-up"]}>You don't have an account? <Link to="/register"> SIGN UP HERE</Link></p>
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