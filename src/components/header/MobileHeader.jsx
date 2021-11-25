import AppBar from "@mui/material/AppBar";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./MobileHeader.module.scss";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router";

export default function MobileHeader() {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenNavigationDrawer = () => {
        setOpenDrawer(true);
    };
    const handleCloseNavigationDrawer = () => {
        setOpenDrawer(false);
    };

    const handleOpenMenu = (event) => {
        setAnchor(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchor(null);
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

    return (
        <>
            <AppBar position="static" color="default">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleOpenNavigationDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div className={styles["content-wrapper"]}>
                        <img
                            className={styles.logo}
                            src="/Logo.png"
                            alt="digi-books"
                        />
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
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                PaperProps={{
                    sx: {
                        borderRadius: "0px 0px 10px 10px",
                        height: "308px",

                    },
                }}
                className={styles.drawer}
                open={openDrawer}
                anchor={"top"}
                onClose={handleCloseNavigationDrawer}
            >
                <List>
                    <ListItem
                        button
                        onClick={() => handleCloseNavigationDrawer()}
                    >
                        <CloseIcon />{" "}
                        <img
                            className={styles.logo}
                            src="/logo.png"
                            alt="logo"
                        />
                    </ListItem>
                    <ListItem
                        className={styles.listItem}
                        button
                        onClick={() => {
                            navigate("/");
                            handleCloseNavigationDrawer();
                        }}
                    >
                        <ListItem>Library</ListItem>
                    </ListItem>
                    <ListItem
                        className={styles.listItem}
                        button
                        onClick={() => {
                            navigate("/settings");
                            handleCloseNavigationDrawer();
                        }}
                    >
                        <ListItem>Settings</ListItem>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}
