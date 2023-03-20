import { useState } from "react";
import {Button, Stack, TextField} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import "./maintenceForm.css";

export default function MaintenanceForm(props)
{
    const [localizacao, setLocalizacao] = useState("");
    const [erroLocalizacao, setErroLocalizacao] = useState("");
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    const [erroDescricao, setErroDescricao] = useState("");
    
    async function adicionarManutencao()
    {
        try
        {
            await props.contract.methods.register_maintenance(descricao, localizacao, data.unix()).send();
        }
        catch (err)
        {
            console.log(err.message)
        }
    }
    
    async function atualizarLocalizacao(value)
    {
        setLocalizacao(value);
        if (value.length > 128)
        {
            setErroLocalizacao("A localização só pode ter até 128 caracteres");
        }
        else
        {
            setErroLocalizacao("");
        }
    }

    async function atualizarDescricao(value)
    {
        setDescricao(value);
        if (value.length > 128)
        {
            setErroDescricao("A descrição só pode ter até 128 caracteres");
        }
        else
        {
            setErroDescricao("");
        }
    }
    
    return(
        <>
            <Stack spacing={2}>
                <TextField
                    variant="outlined"
                    label="Localização"
                    value={localizacao}
                    required={true}
                    error={erroLocalizacao.length>0}
                    helperText={erroLocalizacao}
                    onChange={(event) => atualizarLocalizacao(event.target.value)}
                />
                <TextField
                    variant="outlined"
                    label="Descrição"
                    value={descricao}
                    required={true}
                    error={erroDescricao.length>0}
                    helperText={erroDescricao}
                    onChange={(event) => atualizarDescricao(event.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        onChange={(value) => setData(value)}
                        value={data}
                        renderInput={(params) => <TextField {...params}/>} />
                </LocalizationProvider>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <Button variant="outlined" onClick={props.handleBack}>Voltar</Button>
                    <Button variant="contained" onClick={adicionarManutencao}>Salvar</Button>
                </Stack>
            </Stack>
        </>
    );
}