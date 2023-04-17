import {useState, useEffect, useContext} from "react";
import {List} from "@mui/material";
import MaintenanceItem from "./MaintenanceItem";
import moment from "moment";
import styles from "./maintenanceList.module.css";
import AppContext from "../../../../../AppContext";

export default function MaintenanceList(props)
{
    const appContext = useContext(AppContext);
    const [maintenances, setMaintenances] = useState([]);

    useEffect(() => {
        let mappedMaintenances = [];

        if (props.maintenances === undefined
            || props.maintenances[0] === undefined
            || props.maintenances[1] === undefined
            || props.maintenances[2] === undefined) return;

        for (let i = 0; i < props.maintenances[0].length; i++)
        {
            mappedMaintenances.push(
                {
                    registeredBy: props.maintenances[0][i],
                    description: props.maintenances[1][i],
                    bodyShop: props.maintenances[2][i],
                    date: props.maintenances[4][i],
                    mileage: props.maintenances[3][i]
                });
        }

        setMaintenances(mappedMaintenances);
    }, [props.maintenances]);

    return(
        <>
            <List className={styles.list}>
                {maintenances.length > 0 && maintenances.map((maintenance, index) => {
                    return (
                        <MaintenanceItem
                            key={index}
                            index={index}
                            bodyShop={maintenance.bodyShop}
                            contract={props.contract}
                            date={maintenance.date}
                            description={maintenance.description}
                            mileage={maintenance.mileage}
                            showMenu={props.owner === appContext.account && appContext.account === maintenance.registeredBy}
                        />
                    )
                })}
            </List>
        </>
    );
}