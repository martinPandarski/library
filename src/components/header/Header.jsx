import { Tab } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { TabList, TabContext } from "@mui/lab";
import { useState } from "react";
import styles from "./Header.module.scss";





export default function Header() {
    const [value, setValue] = useState(1);


    return (
        <header className={styles.container}>
            <img className={styles.logo} src="/Logo.png" alt="digi-books" />
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
                {/* <TabPanel value="1"></TabPanel>
                <TabPanel value="2"></TabPanel> */}
            </TabContext>
            <AccountCircleOutlinedIcon fontSize="large" />
        </header >
    )

}