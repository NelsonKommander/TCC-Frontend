import MuiModal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import styles from "./modal.module.css"

export default function Modal({children, open, handleClose})
{
    return(
        <>
            <MuiModal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                className={styles.container}
            >
                <Paper className={styles.paper}>
                    {children}
                </Paper>
            </MuiModal>
        </>
    );
}