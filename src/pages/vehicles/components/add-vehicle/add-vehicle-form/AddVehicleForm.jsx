import {useContext, useState} from "react";
import {Button, Stack, TextField, Typography} from "@mui/material";
import AppContext from "../../../../../AppContext";

export default function AddVehicleForm(props) {
    const [vin, setVin] = useState("");
    const [erroVin, setErroVin] = useState("");
    const [model, setModel] = useState("");
    const [erroModel, setErroModel] = useState("");
    const appContext = useContext(AppContext);

    const addVehicle = async () => {
        try {
            if (model.length < 256 && validateVin(vin)) {
                await appContext.managerContract.methods.add_vehicle(appContext.account, vin, model).send();
                props.handleBack();
            }
            else {
                console.log("Chassi invalido");
            }
        }
        catch (err) {
            console.log(err.message)
        }
    };

    const updateModel = (value) => {
        setModel(value);

        if (model.length > 256)
            setErroModel("O nome do modelo não pode ultrapassar 256 caracteres");
        else
            setErroModel("");
    };

    const updateVin = (value) => {
        setVin(value);

        if (!validateVin(value))
            setErroVin("Chassi inválido");
        else
            setErroVin("");
    };

    const validateVin = (vin) => {
        var re = new RegExp("^[A-Za-z0-9]{3,3}[A-Za-z0-9]{6,6}[A-Za-z0-9]{2,2}[A-Za-z0-9]{6,6}$");
        return vin.match(re);
    };

    return (
        <>
            <Stack spacing={2} sx={{width: '75%', maxWidth: '100%'}}>
                <Typography align="center" variant="h6" fontWeight="bolder">
                    Cadastrar veículo
                </Typography>
                <TextField
                    variant="outlined"
                    label="Chassi"
                    value={vin}
                    required={true}
                    error={erroVin.length>0}
                    helperText={erroVin}
                    onChange={(event) => updateVin(event.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="Modelo"
                    value={model}
                    required={true}
                    error={erroModel.length>0}
                    helperText={erroModel}
                    onChange={(event) => updateModel(event.target.value)}
                />
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={props.handleBack}>Voltar</Button>
                    <Button variant="contained" onClick={addVehicle}>Salvar</Button>
                </Stack>
            </Stack>
        </>
    );
}