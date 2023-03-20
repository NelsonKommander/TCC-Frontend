import MuiModal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import modalStyles from "./modal.module.css"

export default function Modal({children, open, handleClose})
{
    return(
        <>
            <MuiModal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                className={modalStyles["modal-container"]}
            >
                <Paper className={modalStyles["modal-paper"]}>
                    {children}
                </Paper>
            </MuiModal>
        </>
    );
}