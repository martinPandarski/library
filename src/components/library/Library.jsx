
import { Grid } from "@mui/material"
import { useMediaQuery } from "@mui/material"
import BookCard from "./BookCard"
import styles from './Library.module.scss'

export default function Library() {
    const isMobile = useMediaQuery("(max-width: 900px)")

    return (
        <div className={styles.wrapper} >
            <Grid flexDirection={isMobile ? "column" : "row"} spacing={1} container>
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