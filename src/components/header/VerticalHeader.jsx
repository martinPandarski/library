import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './VerticalHeader.module.scss';


export default function VerticalHeader(props) {

    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <div className={styles["content-wrapper"]}>
                    <img className={styles.logo} src="/Logo.png" alt="digi-books" />
                    <AccountCircleOutlinedIcon fontSize="large" />
                </div>
            </Toolbar>
        </AppBar>


    )
}