import {useState, useEffect} from "react";
import './App.css';
import ABI from './contract/abi.json';
import Web3 from 'web3';
import MaintenanceItem from "./components/maintenanceItem";
import MaintenanceList from "./components/maintenanceList";

function App() {
  const CONTRACT_ADDRESS = '0xC889C28F26d748c5BA22B693EBE1ad236227382F';
  const [contract, setContract] = useState();
  const [placa, setPlaca] = useState('XXX-0000');
  const [dono, setDono] = useState('');
  const [hits, setHits] = useState('0');
  const [error, setError] = useState('');
  
  useEffect(() => {
    initContract();
  }, []);
  
  async function initContract()
  {
    const _contract = await getContract();
    setContract(_contract);
  }
  
  // Manutenções mockadas
  const manutencao1 = {localizacao: "Feira do Marreta", data: "01/01/2023", descricao: "Troca de óleo"};
  const manutencao2 = {localizacao: "Oficina do Tião", data: "15/02/2023", descricao: "Troca das pastilhas de freio"};
  const manutencoes = [manutencao1, manutencao2];
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
    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from: accounts[0] });
  }
  
  async function refresh()
  {
    try {
      const placa = await contract.methods.plate().call();
      const dono = await contract.methods.owner().call();
      const hits = await contract.methods.get_hits().call();
      setPlaca(placa);
      setDono(dono);
      setHits(hits);
    } catch (err) {
      setError(err.message);
    }
  }
  
  async function hit()
  {
    try {
      console.log("Hitting...")
      await contract.methods.score_hit().send();
      await refresh();
    } catch (err) {
      setError(err.message);
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>Dono: {dono}</p>
          <p>Placa: {placa}</p>
          <p>Hits: {hits}</p>
          <input type="button" value="Update" onClick={refresh}/>
          <input type="button" value="Hit" onClick={hit}/>
        </div>
        <div>
          <MaintenanceList manutencoes={manutencoes}/>
        </div>
        <p>
          <label>{error}</label>
        </p>
      </header>
    </div>
  );
}

export default App;
