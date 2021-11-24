import { useParams } from "react-router";
import moment from "moment";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import styles from './BookDetails.module.scss'



export default function BookDetails() {
    const [book, setBook] = useState({});
    const { id } = useParams();
    const createdOn = moment(book.createOn).format('l');
    const updatedOn = moment(book.lastUpdateOn).format('l');
    useEffect(() => {
        async function fetchBook() {
            const response = await fetch(`https://books-library-dev.herokuapp.com/api/book/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setBook(data);
        }
        fetchBook();
    }, [id]);

    return (
        <div className={styles.container}>
            <div className={styles["image-cover"]}>
                <img className={styles.image} src="/book-cover.png" alt="nz" />
            </div>
            <div className={styles.info}>
                <div className={styles.heading}>
                    <Typography variant="h6">{book.name}</Typography>
                </div>
                <div classNames={styles["book-content"]}>
                    <Typography variant="h6">{book.author}</Typography>
                    <p>Genre: <b>{book.genre?.name}</b></p>
                    <p>Created on: <b>{createdOn}</b></p>
                    <p>Updated on: <b>{updatedOn}</b></p>
                    <div>
                        <Typography variant="h6">Short description</Typography>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.Sed hic ipsam officia fuga cumque dolor deleniti dicta reiciendis quae temporibus, eum odit aspernatur expedita recusandae voluptates porro exercitationem alias impedit.
                            Veritatis necessitatibus soluta facilis!Tenetur assumenda, corrupti natus non aliquid rem earum accusamus numquam doloremque provident ab, omnis minima repellat expedita laboriosam quos ipsam eveniet laborum officiis animi, neque ullam?
                            Officia vitae eos excepturi rem perspiciatis pariatur sint praesentium dignissimos fugit, facilis, ullam aliquid minus blanditiis molestias nihil molestiae cumque tenetur fuga culpa ex corrupti a.Accusantium earum nobis harum.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}