import styles from "./emptyList.module.css";

export default function EmptyList({icon: Icon, fontSizeIcon, message})
{
    return(
        <div className={styles.emptyListContainer}>
            <Icon className={styles.emptyListIcon} fontSize={fontSizeIcon}/>
            <p className={styles.emptyListMessage}>{message}</p>
        </div>
    );
}