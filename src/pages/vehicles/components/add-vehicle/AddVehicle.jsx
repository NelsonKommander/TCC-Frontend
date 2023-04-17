import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Modal from "../../../../components/modal/Modal";
import AddVehicleForm from "./add-vehicle-form/AddVehicleForm";

export default function AddVehicle() {
    const [showModal, setShowModal] = useState(false);

    function handleAddVehicle(){
        setShowModal(true);
    }

    function handleCloseVehicleModal(){
        setShowModal(false);
    }

    return (
        <>
            <Fab onClick={handleAddVehicle}>
                <AddIcon />
            </Fab>
            <Modal open={showModal} handleClose={handleCloseVehicleModal}>
                <AddVehicleForm handleBack={handleCloseVehicleModal}/>
            </Modal>
        </>
    );
}