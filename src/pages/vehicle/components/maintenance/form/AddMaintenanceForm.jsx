import { useState } from "react";
import {Button, Stack, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import "./maintenceForm.css";

export default function AddMaintenanceForm(props) {
    const [bodyShop, setBodyShop] = useState("");
    const [erroBodyShop, setErroBodyShop] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [erroDescription, setErroDescription] = useState("");
    const [mileage, setMileage] = useState("");
    const [erroMileage, setErroMileage] = useState("");
    
    const addMaintenance =  async () => {
        try {
            await props.contract.methods.register_maintenance(description, bodyShop, date.unix(), mileage).send();
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

    const updateDescription = (value) => {
        setDescription(value);
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
            <Stack spacing={2}>
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
                        onChange={(value) => setDate(value)}
                        value={date}
                        renderInput={(params) => <TextField {...params}/>} />
                </LocalizationProvider>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={props.handleBack}>Voltar</Button>
                    <Button variant="contained" onClick={addMaintenance}>Salvar</Button>
                </Stack>
            </Stack>
        </>
    );
}