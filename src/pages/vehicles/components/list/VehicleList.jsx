import {List} from "@mui/material";

import VehicleItem from "./VehicleItem";
import styles from "./vehicleList.module.css";

export default function VehicleList({ vehicleList }) {
    return(
        <>
            <List className={styles.list}>
                {vehicleList.map((vehicle, index) => {
                    return (
                        <VehicleItem
                            key={index}
                            address={vehicle.address}
                            vehicle={vehicle.owner}
                            vin={vehicle.vin}
                            model={vehicle.model}
                        />
                    )
                })}
            </List>
        </>
    );
}