import {useState, useEffect} from "react";
import ABI from './contract/abi.json';
import Web3 from 'web3';
import Router from "./config/router";

function App() {
  const CONTRACT_ADDRESS = '0x7d572C50cEd5926F379cAFC54dfEd120703Cd711';
  const [contract, setContract] = useState();
  const [placa, setPlaca] = useState('XXX-0000');
  const [dono, setDono] = useState('');
  const [usuario, setUsuario] = useState('');
  const [error, setError] = useState('');
  const [manutencoes, setManutencoes] = useState();
  
  // useEffect(() => {
  //   initContract();
  // }, []);
  
  // useEffect(() => {
  //   refresh()
  // }, [contract]);
  
  async function initContract()
  {
    const _contract = await getContract();
    setContract(_contract);
  }
  
  async function getContract()
  {
    // Checando se a carteira da MetaMask está instalada no browser
    if (!window.ethereum) return setError('No MetaMask found!');

    // Criando provider web3
    const web3 = new Web3(window.ethereum);

    // Pedindo permissão para usar a carteira e checando se foi garantida
    const accounts = await web3.eth.requestAccounts();
    if (!accounts || !accounts.length) return setError('Wallet not found/allowed!');

    // Instanciando o contrato
    setUsuario(accounts[0]);
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: accounts[0] });
  }
  
  async function refresh()
  {
    try {
      const placa = await contract.methods.plate().call();
      const dono = await contract.methods.owner().call();
      const manutencoes = await contract.methods.get_maintenances().call();
      setPlaca(placa);
      setDono(dono);
      setManutencoes(manutencoes);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
      <div className="App">
        {/* <AppBar> */}
        <Router />
        {/* <header className="App-header">
          <div>
            <p>Dono: {dono}</p>
            <p>Placa: {placa}</p>
          </div>
          <div>
            <MaintenanceForm contract={contract}/>
          </div>
          <div>
            <MaintenanceList manutencoes={manutencoes} usuario={usuario} dono={dono}/>
          </div>
          <p>
            <label>{error}</label>
          </p>
        </header> */}
      </div>
  );
}

export default App;
