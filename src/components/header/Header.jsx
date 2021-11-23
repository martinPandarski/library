import { Tab } from "@mui/material";
import { useMediaQuery, Button } from "@mui/material"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { TabList, TabContext } from "@mui/lab";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import styles from "./Header.module.scss";
import VerticalHeader from "./VerticalHeader";





export default function Header() {
    const [value, setValue] = useState(1);
    const isMobile = useMediaQuery("(max-width: 900px)")
    const navigate = useNavigate();
    const location = useLocation()

    return (
        Boolean(isMobile) ? <VerticalHeader /> : (
            <header className={styles.container}>
                {location.pathname === "/" ?
                    <img className={styles.logo} src="/Logo.png" alt="digi-books" />
                    : <Button className={styles["back-button"]} onClick={() => navigate(-1)}><ArrowLeftIcon fontSize="large" /> Go Back</Button>
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
                <AccountCircleOutlinedIcon fontSize="large" />
            </header >
        )
    )

}