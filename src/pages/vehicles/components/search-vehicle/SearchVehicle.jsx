import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import {Paper, FormHelperText} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import styles from "./searchVehicle.module.css";
import {useContext, useState} from "react";
import AppContext from "../../../../AppContext";
import {useNavigate} from "react-router-dom";

export default function SearchVehicle(){
    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    const [vin, setVin] = useState("");
    const [error, setError] = useState("");
    const manager = appContext.managerContract;

    const navigateToVehicle = (address) => {
        navigate("/my-vehicle", {
            state: {
                address
            }
        });
    }

    const handleOnClickSearch = () => {
        const isValid = validateVin(vin);

        if(isValid) {
            setError("");
            manager.methods.search_vin(vin).call()
                .then(address => navigateToVehicle(address))
                .catch(error => console.log(error)); // TODO snack?
        }
        else {
            setError("Informar chassi válido");
        }
    }

    const handleOnChangeSearch = (event) => {
        const vin = event.target.value;

        if(vin.length <= 17) {
            setError("");
            setVin(vin);
        }
    }

    const validateVin = (vin) => {
        const regex = new RegExp("^[A-Za-z0-9]{3,3}[A-Za-z0-9]{6,6}[A-Za-z0-9]{2,2}[A-Za-z0-9]{6,6}$");
        return vin && vin.match(regex);
    };

    const handleKeyPress = (event) => {
        if(event.key === 'Enter')
            handleOnClickSearch()
    }

    return (
        <div className={styles.searchContainer}>
            <Paper elevation={3} className={styles.paperSearch}>
                <FormControl
                    error={error.length > 0} sx={{ m: 1, width: '32ch' }} variant="filled">
                    <Input
                        margin={"dense"}
                        id="standard-adornment-password"
                        placeholder="Informe o chassi do veículo"
                        disableUnderline={true}
                        value={vin}
                        onChange={handleOnChangeSearch}
                        onKeyPress={handleKeyPress}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleOnClickSearch}
                                    //onMouseDown={handleMouseDownPassword}
                                >
                                   <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText id="component-error-text">{error}</FormHelperText>
                </FormControl>
            </Paper>
        </div>
    );
}