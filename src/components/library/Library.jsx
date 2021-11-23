
import { Grid, InputAdornment, TextField } from "@mui/material"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useMediaQuery } from "@mui/material"
import BookCard from "./BookCard"
import styles from './Library.module.scss'
import { useEffect, useState } from "react";

export default function Library() {
    const [books, setBooks] = useState([])
    const isMobile = useMediaQuery("(max-width: 900px)")

    useEffect(() => {
        async function getBooks() {
            const response = await fetch(`https://books-library-dev.herokuapp.com/api/book`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            console.log(data[0].author)
            setBooks(data)
        }
        getBooks()
    }, [])



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
                {books.map(book =>
                    <Grid item xl={6}>
                        <BookCard key={book._id} book={book} />
                    </Grid>
                )}
            </Grid>

        </div>
    )
}