import { AppBar, useMediaQuery, Box, Typography, Tab } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { TabList, TabContext, TabPanel } from "@mui/lab";
import { useState } from "react";
import styles from "./Header.module.scss";



export default function Header() {
    const [value, setValue] = useState(0);


    return (
        <header className={styles.container}>

            <img className={styles.logo} src="/Logo.png" alt="digi-books" />
            <TabContext value={value}>
                <TabList onChange={(event, newValue) => {
                    setValue(newValue);
                }}>
                    <Tab label="Library" value="1" />
                    <Tab label="Settings" value="2" />
                </TabList>
                {/* <TabPanel value="1"></TabPanel>
                <TabPanel value="2"></TabPanel> */}
            </TabContext>
            <AccountCircleOutlinedIcon />

        </header >
    )

}