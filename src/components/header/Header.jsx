import { Tab } from "@mui/material";
import { useMediaQuery, Button, IconButton, Menu, MenuItem } from "@mui/material"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { TabList, TabContext } from "@mui/lab";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import styles from "./Header.module.scss";
import VerticalHeader from "./VerticalHeader";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";





export default function Header() {
    const [anchor, setAnchor] = useState(null);
    const [value, setValue] = useState(1);
    const isMobile = useMediaQuery("(max-width: 900px)");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleOpenMenu = (event) => {
        setAnchor(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchor(null);
    };

    const handleLogout = async () => {
        const response = await fetch(`https://books-library-dev.herokuapp.com/api/user/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        console.log(data);
        dispatch(authActions.logout());
        navigate("/login");
        handleCloseMenu();
    }

    return (
        Boolean(isMobile) ? <VerticalHeader /> : (
            <header className={styles.container}>
                {location.pathname === "/" ?
                    <img className={styles.logo} src="/Logo.png" alt="digi-books" />
                    : <Button className={styles["back-button"]} onClick={() => navigate(-1)}><ArrowLeftIcon fontSize="large" /> Library</Button>
                }
                <TabContext value={value}>
                    <TabList sx={{
                        '& .MuiButtonBase-root': {
                            color: '#0D242E',
                            textTransform: "uppercase",
                            fontWeight: "bold",
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: "#08C642",
                            paddingBottom: "2px"
                        }
                    }} onChange={(event, newValue) => {
                        setValue(newValue);
                    }}>
                        <Tab label="Library" value="1"></Tab>
                        <Tab label="Settings" value="2" />
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
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchor)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>

            </header >
        )
    )

}