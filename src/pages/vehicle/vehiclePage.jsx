import {useState, useEffect} from "react";
import MaintenanceList from "./components/maintenance/list/maintenanceList";
import {useLocation} from "react-router-dom";
import {Stack, Fab, Paper} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import styles from './vehiclePage.module.css';
import createVehicleContract from '../../contract/contractFactory';
import moment from "moment";
import Modal from "../../components/modal/Modal";
import MaintenanceForm from "./components/maintenance/form/maintenanceForm";
import EmptyList from "../../components/empty-list/emptyList";
import HandymanIcon from '@mui/icons-material/Handyman';

export default function VehiclePage(props)
{
    let mounted = false;
    const location = useLocation();
    const [account, setAccount] = useState();
    const [contract, setContract] = useState();
    const [vin, setVin] = useState('3fz bWWerd gZ 3b8844');
    const [owner, setOwner] = useState('Paul');
    const [maintenances, setMaintenances] = useState([]);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!mounted){
            const {account, contractAddress} = location.state;
            
            setAccount(account);
            setContract(createVehicleContract(account, contractAddress));

            const oficinas = ["Artur Car", "Tonho Car", "Silar Car", "Andre Car", "Geovas Car", "Geovas Car"];
            const datas = [moment.now(), moment.now(), moment.now(), moment.now(), moment.now(), moment.now()];
            const descricoes = ["Laga 1", "laga 2", "laga 3", "laga 4", "laga 5", "laga 6"];
            const donos = ["laguinha", "lagueta", "laguinha", "lagueta", "lagueta", "lagueta"]
            const manutencoes = [];

            setMaintenances(manutencoes);
            
            mounted = true
        }
    }, [location.state])

    function handleAddMaintenance(){
        setShowModal(true);
    }

    function handleCloseMaintenaceModal(){
        setShowModal(false);
    }
    
    return(
        <Stack className={styles.mainStack}>
            <p>Chassi: {vin}</p>
            <p>Marca: {vin}</p>
            <p>Modelo: {vin}</p>
            <p>Versão: {vin}</p>
            <p>Ano: {vin}</p>
            <Paper elevation={3} className={styles.paper}>
                <Stack className={styles.maintenanceStack} spacing={2} justifyContent="flex-start">
                    {maintenances.length <= 0 && <EmptyList icon={HandymanIcon}  fontSizeIcon="5rem" message="Nenhuma manutenção cadastrada"/>}
                    {maintenances.length > 0 && <MaintenanceList dono={owner} usuario={props.user} manutencoes={maintenances}/>}
                    <Stack direction="row" justifyContent="flex-end">
                        <Fab onClick={handleAddMaintenance}>
                            <AddIcon />
                        </Fab>
                    </Stack>
                    <Modal open={showModal} handleClose={handleCloseMaintenaceModal}>
                        <MaintenanceForm handleBack={handleCloseMaintenaceModal}></MaintenanceForm>
                    </Modal>
                </Stack>
            </Paper>
        </Stack>
    );
}