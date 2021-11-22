import styles from './BookCard.module.scss'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


export default function BookCard(props) {


    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <img src="/film.png" alt="movie" />
                <div className={styles.info}>
                    <h3 className={styles.title}>Will</h3>
                    <h4 className={styles.author}>Will Smith</h4>
                    <p>Genre: <b>Personal Growth</b></p>
                    <div className={styles.dates}>
                        <p>Created on: <b>12.05.2021</b></p>
                        <p>Updated on: <b>12.05.2021</b></p>
                    </div>
                </div>
            </div>
            <button className={styles.button}><PlayArrowIcon fontSize="medium" style={{ color: "white" }} /></button>

        </div>
    )
}