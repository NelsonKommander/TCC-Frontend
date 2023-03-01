import {List} from "@mui/material";
import MaintenanceItem from "./maintenanceItem";

export default function MaintenanceList(props)
{
    return(
        <>
            <List>
                {props.manutencoes.map((manutencao) => {
                    return (
                        <MaintenanceItem
                            localizacao={manutencao.localizacao}
                            data={manutencao.data}
                            descricao={manutencao.descricao}
                        />
                    )
                })}
            </List>
        </>
    );
}