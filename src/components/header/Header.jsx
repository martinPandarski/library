import { Tab } from "@mui/material";
import {
    useMediaQuery,
    Button,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { TabList, TabContext } from "@mui/lab";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import styles from "./Header.module.scss";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import MobileHeader from "./MobileHeader";

export default function Header() {
    const [anchor, setAnchor] = useState(null);
    const location = useLocation();
    const [value, setValue] = useState("/");
    const isMobile = useMediaQuery("(max-width: 900px)");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenMenu = (event) => {
        setAnchor(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchor(null);
    };

    const handleRouteChange = (event, newValue) => {
        setValue(newValue);
        navigate(newValue);
    };

    const handleLogout = async () => {
        await fetch(`https://books-library-dev.herokuapp.com/api/user/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        dispatch(authActions.logout());
        navigate("/login");
        handleCloseMenu();
    };

    return Boolean(isMobile) ? (
        <MobileHeader />
    ) : (
        <header className={styles.container}>
            {location.pathname === "/" ? (
                <img className={styles.logo} src="/Logo.png" alt="digi-books" />
            ) : (
                <Button
                    className={styles["back-button"]}
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon fontSize="large" /> Library
                </Button>
            )}
            <TabContext value={value}>
                <TabList
                    sx={{
                        "& .MuiButtonBase-root": {
                            color: "#0D242E",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                        },
                        "& .MuiTabs-indicator": {
                            backgroundColor: "#08C642",
                            paddingBottom: "2px",
                        },
                    }}
                    onChange={handleRouteChange}
                >
                    <Tab label="Library" value="/" />
                    <Tab label="Settings" value="/settings" />
                </TabList>
            </TabContext>
            <IconButton
                size="large"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleOpenMenu}
                color="inherit"
            >
                <AccountCircleOutlinedIcon fontSize="large" />
            </IconButton>
            <Menu
                id="menu"
                anchorEl={anchor}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchor)}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </header>
    );
}
