import { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import {
    InputAdornment,
    IconButton,
    FormControl,
    Stack,
    Button,
    TextField,
    Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = yup.object({
    username: yup
        .string("Enter your email")
        .required("This is a required field.")
        .min(4, "The minimum length should be 4 characters.")
        .matches(/^[aA-zZ\s\d]+$/, "Special characters are not allowed."),
    password: yup
        .string("Enter your password")
        .required("This is a required field.")
        .min(6, "The minimum length should be 6 characters.")
        .matches(/^[aA-zZ\s\d]+$/, "Special characters are not allowed."),
});

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
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
                const data = await response.json();
                dispatch(authActions.setUser(data.token)); //Change if something more than token is returned
                navigate("/");
            } catch {
                console.log("Login Failed");
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
            <div className={styles["login-container"]}>
                <img className={styles.logo} src="/Logo.png" alt="digi-books" />
                <Paper elevation={0} className={styles.paper}>
                    <p className={styles.heading}>Welcome Back!</p>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction="column">
                            <FormControl variant="outlined">
                                <label htmlFor="username">Username</label>
                                <TextField
                                    id="username"
                                    type="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    size="small"
                                    error={
                                        formik.touched.username &&
                                        Boolean(formik.errors.username)
                                    }
                                    helperText={
                                        formik.touched.username &&
                                        formik.errors.username
                                    }
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
                                    size="small"
                                    error={
                                        formik.touched.password &&
                                        Boolean(formik.errors.password)
                                    }
                                    helperText={
                                        formik.touched.password &&
                                        formik.errors.password
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
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
                            <Link className={styles.recover} to="">
                                Recover password
                            </Link>
                            <Button
                                disabled={!(formik.isValid && formik.dirty)}
                                type="submit"
                                className={styles.button}
                                variant="contained"
                            >
                                Log in
                            </Button>
                            <p className={styles["sign-up"]}>
                                You don't have an account?{" "}
                                <Link to="/register"> SIGN UP HERE</Link>
                            </p>
                        </Stack>
                    </form>
                </Paper>
            </div>
            <img className={styles.library} src="/Library.png" alt="library" />
        </div>
    );
}
