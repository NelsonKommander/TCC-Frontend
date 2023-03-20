import {Alert, Button, Snackbar} from "@mui/material";

export default function Snack({open, handleClose, severity, errorMessage}) {
    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
}