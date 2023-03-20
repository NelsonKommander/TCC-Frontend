import { Button, Container, Paper, Stack } from "@mui/material";
import Web3 from 'web3';
import styles from './loginPage.module.css';
import CarIcon from "../../assets/icons/car-icon.png"
import { useNavigate } from "react-router-dom";
import Snack from "../../components/snackbar/Snack";
import {useState} from "react";

export default function LoginPage() {
    const navigate = useNavigate();

    const [openErrorSnack, setOpenErrorSnack] = useState(false);
    const [errorMessageSnack, setErrorMessageSnack] = useState("");

    // Obtém e seta a conta do usuário
    async function getUserAccount() {
        // Checando se a carteira da MetaMask está instalada no browser
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);

            // Pedindo permissão para usar a carteira e checando se foi garantida
            const accounts = await web3.eth.requestAccounts();
            if (!accounts || !accounts.length)
            {
                setOpenErrorSnack(true);
                return;
            };

            // Instanciando o contrato
            return accounts[0];
        };

        // Criando provider web3
        showErrorMessage("Não foi encontrada a carteira")
    }

    function showErrorMessage(errorMessage){
        setErrorMessageSnack(errorMessage);
        setOpenErrorSnack(true);
    }

    function handleCloseError() {
        setOpenErrorSnack(false);
    }

    async function fazerLogin() {
        // const account = await getUserAccount();
        const account = '0xa2e8315cB403625c68D5Ed5666EB3bf481BFD53F'

        if (account) navegarParaVeiculo(account);
    }
    
    function navegarParaVeiculo(account)
    {
        const contractAddress = "0x7d572C50cEd5926F379cAFC54dfEd120703Cd711";
        navigate("/my-vehicle", {
           state: {
               account,
               contractAddress
           } 
        });
    }
    
    function navegarParaListagemDeVeiculos(account)
    {
        navigate("/my-vehicle", {
            state: {
                account
            }
        });
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