
import { Grid, InputAdornment, TextField } from "@mui/material"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useMediaQuery } from "@mui/material"
import BookCard from "./BookCard"
import styles from './Library.module.scss'

export default function Library() {
    const isMobile = useMediaQuery("(max-width: 900px)")

    return (
        <div className={styles.wrapper} >
            <div className={styles["search-wrapper"]}>
                <h3>ALL BOOKS</h3>
                <TextField
                    size="small"
                    classes={{ root: styles.search }}
                    label="Search"
                    InputProps={{
                        endAdornment:
                            (<InputAdornment position="end"><SearchOutlinedIcon /></InputAdornment>)
                    }} />
            </div>
            <Grid className={styles.library} flexDirection={isMobile ? "column" : "row"} spacing={2} container>
                <Grid item xl={6}>
                    <BookCard />
                </Grid>
                <Grid item xl={6}>
                    <BookCard />
                </Grid>
            </Grid>

        </div>
    )
}