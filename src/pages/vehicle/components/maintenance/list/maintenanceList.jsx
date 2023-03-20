import {useState, useEffect} from "react";
import {List} from "@mui/material";
import MaintenanceItem from "./maintenanceItem";
import moment from "moment";
import styles from "./maintenanceList.module.css";

export default function MaintenanceList(props)
{
    const [manutencoes, setManutencoes] = useState([]);
    
    useEffect(() => {
        let laga = [];
        
        if (props.manutencoes === undefined
            || props.manutencoes[0] === undefined
            || props.manutencoes[1] === undefined
            || props.manutencoes[2] === undefined) return;

        for (let i = 0; i < props.manutencoes[0].length; i++)
        {
            laga.push(
                {
                    cadastrador: props.manutencoes[0][i],
                    descricao: props.manutencoes[1][i],
                    localizacao: props.manutencoes[2][i],
                    data: props.manutencoes[3][i]
                });
        }
        
        setManutencoes(laga);
    }, [props.manutencoes]);
    
    return(
        <>
            <List className={styles.list}>
                {manutencoes.length > 0 && manutencoes.map((manutencao, index) => {
                    return (
                        <MaintenanceItem
                            key={index}
                            localizacao={manutencao.localizacao}
                            data={moment.unix(manutencao.data)}
                            descricao={manutencao.descricao}
                            exibirMenu={props.dono === props.usuario && props.usuario === manutencao.cadastrador}
                        />
                    )
                })}
            </List>
        </>
    );
}