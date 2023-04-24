import {useEffect, useContext, useState} from "react"
import AppContext from "../../AppContext";
import {Paper, Stack, TextField} from "@mui/material";
import styles from "./vehiclesPage.module.css";
import EmptyList from "../../components/empty-list/EmptyList";
import DirectionsCar from '@mui/icons-material/DirectionsCar';
import Snack from "../../components/snackbar/Snack";
import AddVehicle from "./components/add-vehicle/AddVehicle";
import VehicleList from "./components/list/VehicleList";
import SearchVehicle from "./components/search-vehicle/SearchVehicle";
import {useNavigate} from "react-router-dom";

export default function VehiclesPage(){
    const appContext = useContext(AppContext);
    const navigate = useNavigate();

    const [vehicleList, setVehicleList] = useState([]);
    const [showVehicleList, setShowVehicleList] = useState(false);

    const [openErrorSnack, setOpenErrorSnack] = useState(false);
    const [errorMessageSnack, setErrorMessageSnack] = useState("");

    let mounted = false;

    const showErrorMessage = (errorMessage) => {
        setErrorMessageSnack(errorMessage);
        setOpenErrorSnack(true);
    }

    const handleCloseError = () => {
        setOpenErrorSnack(false);
    }

    const mapVehicleList = (vehicleList) => {
        let mappedVehicleList = [];

        if (!vehicleList
            || !vehicleList[0]
            || !vehicleList[1]
            || !vehicleList[2])
            return;

        for (let i = 0; i < vehicleList[0].length; i++)
        {
            mappedVehicleList.push(
                {
                    address: vehicleList[0][i],
                    owner: vehicleList[1][i],
                    vin: vehicleList[2][i],
                    model: vehicleList[3][i]
                });
        }

        return mappedVehicleList;
    };

    const handleGetVehicles = () => {
        const managerContract = appContext.managerContract;

        if (managerContract){
            getVehicles(managerContract);
        }
    }

    const getVehicles = (managerContract)  => {
        managerContract
            .methods
            .search_my_vehicles()
            .call()
            .then(vehiclesTuple => {
                const hasVehicle = vehiclesTuple[0].length > 0;

                if (hasVehicle){
                    const mappedVehiclesList = mapVehicleList(vehiclesTuple)
                    setVehicleList(mappedVehiclesList);
                    setShowVehicleList(true);
                }else
                    setShowVehicleList(false);
            })
            .catch(() => {
                showErrorMessage("Error ao obter os veiculos")
            });
    }


    useEffect(() => {
        if (!mounted){
            const account = appContext.account;
            console.log(account)

            if(account)
                handleGetVehicles();
            else
                navigate("/login");

            mounted = true;
        }
    }, [])

    return (
        <>
            <SearchVehicle />
            <Stack className={styles.mainStack}>
                <Paper elevation={3} className={styles.paper}>
                    <Stack className={styles.vehiclesListStack} spacing={2} justifyContent="flex-start">
                        {!showVehicleList && <EmptyList icon={DirectionsCar}  fontSizeIcon="5rem" message="Não há veículos"/>}
                        {showVehicleList && <VehicleList vehicleList={vehicleList}/>}
                        <Stack direction="row" justifyContent="flex-end">
                            <AddVehicle />
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
            <Snack open={openErrorSnack} errorMessage={errorMessageSnack} severity="error" handleClose={handleCloseError}/>
        </>
    );
}