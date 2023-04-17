import { Button, Container, Paper, Stack } from "@mui/material";
import Web3 from 'web3';
import styles from './loginPage.module.css';
import CarIcon from "../../assets/icons/car-icon.png"
import { useNavigate } from "react-router-dom";
import Snack from "../../components/snackbar/Snack";
import createContract from '../../contract/contractFactory';
import {useContext, useState} from "react";
import AppContext from "../../AppContext";
import ABI from '../../contract/managerABI.json'
import {contractManagerAddress} from "../../contract/contractManagerAddress";

export default function LoginPage() {
    const navigate = useNavigate();
    const appContext = useContext(AppContext);

    const [openErrorSnack, setOpenErrorSnack] = useState(false);
    const [errorMessageSnack, setErrorMessageSnack] = useState("");

    async function getUserAccount() {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);

            const accounts = await web3.eth.requestAccounts();
            if (!accounts || !accounts.length)
            {
                setOpenErrorSnack(true);
                return;
            };

            return accounts[0];
        };

        showErrorMessage("Não foi encontrada a carteira")
    }

    const showErrorMessage = (errorMessage) => {
        setErrorMessageSnack(errorMessage);
        setOpenErrorSnack(true);
    }

    const handleCloseError = () => {
        setOpenErrorSnack(false);
    }

    async function fazerLogin() {
        const account = await getUserAccount();


        if (account) {
            const managerContract = createContract(ABI, account, contractManagerAddress);

            appContext.setManagerContract(managerContract);
            appContext.setAccount(account);

            navigate("/my-vehicles");
        }
    }

    return (
            <Container className={styles.container}>
                <Paper elevation={3} className={styles.paper}>
                    <Stack
                        spacing={2}
                        className={styles.centeredStack}
                        height="100%"
                    >
                        <Stack
                            className={styles.centeredStack}
                            height="50%"
                        >
                            <img src={CarIcon} className={styles.carIcon}/>
                            <h3>Single Vehicle</h3>
                        </Stack >
                        <div>
                            <Button onClick={fazerLogin} className={styles.button}>Login</Button>
                        </div>
                    </Stack>
                </Paper>
                <Snack open={openErrorSnack} errorMessage={errorMessageSnack} severity="error" handleClose={handleCloseError}/>
            </Container>
    );
}