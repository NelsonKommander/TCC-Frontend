import ABI from './abi.json'
import Web3 from 'web3';

export default function createVehicleContract(account, contractAddress)
{
    // TODO: Testar se essa instância do provider já tem acesso
    const web3 = new Web3(window.ethereum);
    
    return new web3.eth.Contract(ABI, contractAddress, { from: account });
}