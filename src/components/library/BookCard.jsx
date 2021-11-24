import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import styles from './BookCard.module.scss'

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Button, Container } from '@mui/material';


export default function BookCard({ book }) {
    const navigate = useNavigate();
    const createdOn = moment(book.createOn).format('l');
    const updatedOn = moment(book.lastUpdateOn).format('l');


    return (
        <Container>
            <div className={styles.wrapper}>
                <div className={styles.inner}>
                    <img className={styles.image} src={book.image} alt="movie" />
                    <div className={styles.info}>
                        <h3 className={styles.title}>{book.name}</h3>
                        <h4 className={styles.author}>{book.author}</h4>
                        <p>Genre: <b>{book.genre?.name}</b></p>
                        <div className={styles.dates}>
                            <p>Created on: <b>{createdOn}</b></p>
                            <p>Updated on: <b>{updatedOn}</b></p>
                        </div>
                    </div>
                </div>
                <Button onClick={() => navigate(`/book/${book._id}`)} style={{ minWidth: "20px" }} variant="contained" className={styles.button}  ><PlayArrowIcon fontSize="medium" /></Button>

            </div>
        </Container>
    )
}