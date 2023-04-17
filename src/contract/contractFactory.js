import Web3 from 'web3';

export default function createContract(ABI, account, contractManagerAddress)
{
    const web3 = new Web3(window.ethereum);

    return new web3.eth.Contract(ABI, contractManagerAddress, { from: account });
}