const axios = require('axios').default;
const ERC721 = require('./ERC721.json');
const Web3 = require('web3');
const sleep = require('sleep');

require('dotenv').config();

const defaultAxios = axios.create({
    timeout: 3000,
});

const run = async () => {
    const web3 = new Web3('https://bsc-dataseed.binance.org/');
    const contract = new web3.eth.Contract(ERC721, '0x4b7ef899cbb24689a47a66d3864f57ec13e01b35');

    const totalSupply = await contract.methods.totalSupply().call();

    console.log(`There are ${totalSupply} items`);

    for (let i = 1; i <= totalSupply; i++) {
        try {
            const tokenURI = await contract.methods.tokenURI(i).call();
            console.log({ tokenURI });
            const json = (await defaultAxios.get(tokenURI)).data;
            console.log(json);

            sleep.sleep(1);
        } catch (e) {
            console.log(e);
        }
    }
}

run();