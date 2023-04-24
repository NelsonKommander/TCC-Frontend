import { useState } from "react";
import {Button, Stack, TextField, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import "./maintenceForm.css";
import moment from "moment";

export default function UpdateMaintenanceForm(props) {
    const [bodyShop, setBodyShop] = useState(props.bodyShop);
    const [erroBodyShop, setErroBodyShop] = useState("");
    const [date, setDate] = useState("");
    const [description, setdescription] = useState(props.description);
    const [erroDescription, setErroDescription] = useState("");
    const [mileage, setMileage] = useState(props.mileage);
    const [erroMileage, setErroMileage] = useState("");

    const updateMaintenance =  async () => {
        try {
            await props.contract.methods.edit_maintenance(props.index, description, bodyShop, date.unix(), mileage).send();
            props.handleBack();
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const updateBodyShop = (value) => {
        setBodyShop(value);
        if (value.length > 128)
            setErroBodyShop("O nome da oficina só pode ter até 128 caracteres");
        else
            setErroBodyShop("");
    }

    const updateDate = (value) => {
        setDate(value);
    }

    const updateDescription = (value) => {
        setdescription(value);
        if (value.length > 128) {
            setErroDescription("A descrição só pode ter até 128 caracteres");
        }
        else {
            setErroDescription("");
        }
    }

    const updateMileage = (value) => {
        setMileage(value);

        if (value <= 0) {
            setErroMileage("A quilometragem deve ser maior que 0");
        }
        else {
            setErroMileage("");
        }
    }

    return(
        <>
            <Stack spacing={2} sx={{width: '75%', maxWidth: '100%'}}>
                <Typography align="center" variant="h6" fontWeight="bolder">
                    Atualizar manutenção
                </Typography>
                <TextField
                    variant="outlined"
                    label="Oficina"
                    value={bodyShop}
                    required={true}
                    error={erroBodyShop.length>0}
                    helperText={erroBodyShop}
                    onChange={(event) => updateBodyShop(event.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="Descrição"
                    value={description}
                    required={true}
                    error={erroDescription.length>0}
                    helperText={erroDescription}
                    onChange={(event) => updateDescription(event.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="Quilometragem"
                    value={mileage}
                    required={true}
                    error={erroMileage.length>0}
                    helperText={erroMileage}
                    onChange={(event) => updateMileage(event.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        onChange={updateDate}
                        value={date}
                        renderInput={(params) => <TextField {...params}/>} />
                </LocalizationProvider>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={props.handleBack}>Voltar</Button>
                    <Button variant="contained" onClick={updateMaintenance}>Salvar</Button>
                </Stack>
            </Stack>
        </>
    );
}