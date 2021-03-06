import styles from "./Settings.module.scss";
import { Button } from "@mui/material";

const HorizontalLine = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: "99",
            }}
        >
            <hr
                style={{
                    width: "100%",
                    height: "1px",
                    background: "#1076b5",
                    borderWidth: "0px",
                }}
            />
            <img src="/blue-arrow.png" alt="arrow" />
        </div>
    );
};

export default function Settings() {
    const generalSettings = [
        "Notifications and emails",
        "User Management",
        "Physical Libraries",
        "Reading Events",
        "Invoicing",
        "Book Statistics",
        "Readers Statistics",
        "Events Statistics",
    ];
    const bookSettings = [
        "Manage Genres",
        "Book Visiblity",
        "Authors Database",
        "Book Covers",
        "Book Covers",
    ];

    return (
        <div className={styles.settings}>
            <div className={styles["general-settings"]}>
                <h3 className={styles["general-settings-header"]}>
                    General Settings
                </h3>
                {generalSettings.map((setting, index) => (
                    <div className={styles.setting} key={index}>
                        <p className={styles["setting-name"]}>{setting}</p>
                        <HorizontalLine />
                    </div>
                ))}
            </div>
            <div className={styles["book-settings"]}>
                <div className={styles["top-bar"]}>
                    <h3 className={styles["book-settings-header"]}>
                        Book Settings
                    </h3>
                    <Button
                        className={styles["add-new-btn"]}
                        variant="contained"
                    >
                        Add New
                    </Button>
                </div>
                {bookSettings.map((setting, index) => (
                    <div className={styles.setting} key={index}>
                        <p className={styles["setting-name"]}>{setting}</p>
                        <HorizontalLine />
                    </div>
                ))}
            </div>
        </div>
    );
}
