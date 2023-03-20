import {useEffect} from "react"
import {useLocation} from "react-router-dom"

export default function VehiclesPage(){
    const location = useLocation();
    let mounted = false;

    useEffect(() => {
        if (!mounted){
            const {account} = location.state;
            console.log(account);
            mounted = true
        }
    }, [location.state])


    return(
        <>
            <p>
                O carro da véia de Artur
            </p>
        </>
    );
}