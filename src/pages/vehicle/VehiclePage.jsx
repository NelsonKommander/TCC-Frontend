import {useState, useEffect, useContext} from "react";
import MaintenanceList from "./components/maintenance/list/MaintenanceList";
import {useLocation} from "react-router-dom";
import {Stack, Fab, Paper, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import styles from './vehiclePage.module.css';
import createContract from '../../contract/contractFactory';
import Modal from "../../components/modal/Modal";
import AddMaintenanceForm from "./components/maintenance/form/AddMaintenanceForm";
import EmptyList from "../../components/empty-list/EmptyList";
import HandymanIcon from '@mui/icons-material/Handyman';
import ABI from '../../contract/vehicleABI.json'
import AppContext from "../../AppContext";

export default function VehiclePage()
{
    let mounted = false;
    const location = useLocation();
    const appContext = useContext(AppContext);
    const [account, setAccount] = useState();
    const [contract, setContract] = useState();
    const [vin, setVin] = useState("");
    const [model, setModel] = useState("")
    const [owner, setOwner] = useState("");
    const [maintenances, setMaintenances] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const handleGetVehicle = () => {
        const { address } = location.state;
        const vehicleContract = createContract(ABI, appContext.account, address);

        setAccount(account);
        setContract(vehicleContract);

        vehicleContract
            .methods
            .get_vehicle()
            .call()
            .then(vehicle => {
                    setOwner(vehicle[0]);
                    setVin(vehicle[1]);
                    setModel(vehicle[2]);
                }
            );

        vehicleContract
            .methods
            .get_maintenances()
            .call()
            .then(maintenances => {
                    setMaintenances(maintenances);
                }
            );
    }


    useEffect(() => {
        if (!mounted){
            handleGetVehicle();
            
            mounted = true
        }
    }, [location.state])

    const handleAddMaintenance = () => {
        setShowModal(true);
    }

    const handleCloseMaintenaceModal = () => {
        setShowModal(false);
    }
    
    return(
        <Stack className={styles.mainStack}>
            <Paper elevation={3} className={styles.paper}>
                <Stack className={styles.subStack}>
                    <div>
                        <Typography align="center" variant="h6" fontWeight="bolder">
                            {model}
                        </Typography>
                        <Typography align="center">
                            {vin}
                        </Typography>
                    </div>
                    <Stack className={styles.maintenanceStack} spacing={2} justifyContent="flex-start">
                        {(!maintenances || !maintenances[0] || maintenances[0].length <= 0) && <EmptyList icon={HandymanIcon}  fontSizeIcon="5rem" message="Nenhuma manutenção cadastrada"/>}
                        {maintenances && maintenances[0] && maintenances[0].length > 0 && <MaintenanceList contract={contract} owner={owner} maintenances={maintenances}/>}
                        <Stack direction="row" justifyContent="flex-end">
                            <Fab onClick={handleAddMaintenance} className={styles.button}>
                                <AddIcon />
                            </Fab>
                        </Stack>
                        <Modal open={showModal} handleClose={handleCloseMaintenaceModal}>
                            <AddMaintenanceForm contract={contract} handleBack={handleCloseMaintenaceModal}></AddMaintenanceForm>
                        </Modal>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
}