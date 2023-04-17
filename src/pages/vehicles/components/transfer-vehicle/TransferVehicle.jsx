import {IconButton} from "@mui/material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {useState} from "react";
import Modal from "../../../../components/modal/Modal";
import TransferVehicleForm from "./components/transfer-vehicle-form/TransferVehicleForm";

export default function TransferVehicle(props) {
    const [showModal, setShowModal] = useState(false);
    
    const handleTransfer = () => {
        setShowModal(true);
    }

    const handleCloseTransfer = () => {
        setShowModal(false);
    }

    return (
        <>
            <IconButton
                onClick={handleTransfer}
                aria-haspopup="true"
            >
                <SwapHorizIcon/>
            </IconButton>
            <Modal open={showModal} handleClose={handleCloseTransfer}>
                <TransferVehicleForm address={props.address} handleBack={handleCloseTransfer}/>
            </Modal>
        </>
    );
}