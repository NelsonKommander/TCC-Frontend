import {Grid, ListItem, Menu, MenuItem, Typography} from '@mui/material';
import TransferVehicle from "../transfer-vehicle/TransferVehicle";
import {useNavigate} from "react-router-dom";

export default function VehicleItem({
    key,
    address,
    owner,
    vin,
    model
}) {
    const navigate = useNavigate();

    const navigateToVehicle = () => {
        navigate("/my-vehicle", {
            state: {
                address
            }
        });
    }

    return(
        <>
            <ListItem key={key} divider={true} dense >
                <Grid container spacing={1}>
                    <Grid item xs={10} onClick={navigateToVehicle}>
                        <Typography align="left" variant="h6">
                            {model}
                        </Typography>
                        <Typography>
                            {vin}
                        </Typography>
                        <Typography align="left" varitant="body">
                            {owner}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <TransferVehicle address={address}/>
                    </Grid>
                </Grid>
            </ListItem>
        </>
    );
}