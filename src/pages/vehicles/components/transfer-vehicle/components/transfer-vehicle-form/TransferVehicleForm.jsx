import {Button, Stack, TextField} from "@mui/material";
import {useContext, useState} from "react";
import Web3 from 'web3';
import AppContext from "../../../../../../AppContext";


export default function TransferVehicleForm(props) {
    const [addressTo, setAddressTo] = useState();
    const [addressError, setAddressError] = useState("");
    const appContext = useContext(AppContext);
    const web3 = new Web3(window.ethereum);

    const transferVehicle = async () => {
        try{
            const isValid = web3.utils.isAddress(addressTo);

            if(isValid) {
                await appContext.managerContract.methods.transfer_vehicle(addressTo, props.address).send();
                props.handleBack();
            }
        }
        catch (err){
            console.log(err.message)
        }
    }

    const updateAddress = (value) => {
        setAddressTo(value);


        const isValid = web3.utils.isAddress(value);

        if (!isValid){
            setAddressError("Informe um endereço ethereum válido");
        }
        else
            setAddressError("");
    }

    return (
        <>
            <Stack spacing={2}>
                <TextField
                    variant="outlined"
                    label="Endereço destino"
                    value={addressTo}
                    required={true}
                    error={addressError.length > 0}
                    helperText={addressError}
                    onChange={(event) => updateAddress(event.target.value)}
                />
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={props.handleBack}>Voltar</Button>
                    <Button variant="contained" onClick={transferVehicle}>Salvar</Button>
                </Stack>
            </Stack>
        </>
    );
}