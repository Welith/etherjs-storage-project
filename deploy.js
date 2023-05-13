const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    // Code used for adding an ecrypted key
    // const encryptedJsonKey = fs.readFileSync("./.encryptedJsonKey.json", "utf-8");
    // let wallet = ethers.Wallet.fromEncryptedJsonSync(
    //   encryptedJsonKey,
    //   process.env.PRIVATE_KEY_PASSWORD
    // );
    // wallet = await wallet.connect(provider);

    const abi = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.abi",
        "utf-8"
    )
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf-8"
    )

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("Deploying, please wait...")
    const contract = await contractFactory.deploy()
    await contract.deploymentTransaction().wait(1)
    const contractAddress = await contract.getAddress()
    console.log(`Contract address: ${contractAddress}`)

    const favoriteNumber = await contract.retrieve()
    console.log(`Initial favorite number: ${favoriteNumber.toString()}`)
    const trxResponse = await contract.store("12")
    await trxResponse.wait(1)
    const updatedFavoriteNumber = await contract.retrieve()
    console.log(`Updated favorite number: ${updatedFavoriteNumber.toString()}`)

    // Code for manually deploying the contract
    // nonce = await wallet.getNonce();
    // console.log(nonce);
    // const tx = {
    //   nonce: nonce,
    //   gasPrice: 20000000000,
    //   gasLimit: 1000000,
    //   to: null,
    //   value: 0,
    //   data: "0x608060405234801561001057600080fd5b5061077a806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c5780636057361d1461007a5780636f760f41146100965780638bab8dd5146100b25780639e7a13ad146100e2575b600080fd5b610064610113565b6040516100719190610533565b60405180910390f35b610094600480360381019061008f9190610476565b61011c565b005b6100b060048036038101906100ab919061041a565b61012f565b005b6100cc60048036038101906100c791906103d1565b6101bf565b6040516100d99190610533565b60405180910390f35b6100fc60048036038101906100f79190610476565b6101ed565b60405161010a92919061054e565b60405180910390f35b60008054905090565b8060008190555061012b610113565b5050565b600260405180604001604052808381526020018481525090806001815401808255809150506001900390600052602060002090600202016000909190919091506000820151816000015560208201518160010190805190602001906101959291906102a9565b505050806001836040516101a9919061051c565b9081526020016040518091039020819055505050565b6001818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600281815481106101fd57600080fd5b906000526020600020906002020160009150905080600001549080600101805461022690610647565b80601f016020809104026020016040519081016040528092919081815260200182805461025290610647565b801561029f5780601f106102745761010080835404028352916020019161029f565b820191906000526020600020905b81548152906001019060200180831161028257829003601f168201915b5050505050905082565b8280546102b590610647565b90600052602060002090601f0160209004810192826102d7576000855561031e565b82601f106102f057805160ff191683800117855561031e565b8280016001018555821561031e579182015b8281111561031d578251825591602001919060010190610302565b5b50905061032b919061032f565b5090565b5b80821115610348576000816000905550600101610330565b5090565b600061035f61035a846105a3565b61057e565b90508281526020810184848401111561037b5761037a61070d565b5b610386848285610605565b509392505050565b600082601f8301126103a3576103a2610708565b5b81356103b384826020860161034c565b91505092915050565b6000813590506103cb8161072d565b92915050565b6000602082840312156103e7576103e6610717565b5b600082013567ffffffffffffffff81111561040557610404610712565b5b6104118482850161038e565b91505092915050565b6000806040838503121561043157610430610717565b5b600083013567ffffffffffffffff81111561044f5761044e610712565b5b61045b8582860161038e565b925050602061046c858286016103bc565b9150509250929050565b60006020828403121561048c5761048b610717565b5b600061049a848285016103bc565b91505092915050565b60006104ae826105d4565b6104b881856105df565b93506104c8818560208601610614565b6104d18161071c565b840191505092915050565b60006104e7826105d4565b6104f181856105f0565b9350610501818560208601610614565b80840191505092915050565b610516816105fb565b82525050565b600061052882846104dc565b915081905092915050565b6000602082019050610548600083018461050d565b92915050565b6000604082019050610563600083018561050d565b818103602083015261057581846104a3565b90509392505050565b6000610588610599565b90506105948282610679565b919050565b6000604051905090565b600067ffffffffffffffff8211156105be576105bd6106d9565b5b6105c78261071c565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b83811015610632578082015181840152602081019050610617565b83811115610641576000848401525b50505050565b6000600282049050600182168061065f57607f821691505b60208210811415610673576106726106aa565b5b50919050565b6106828261071c565b810181811067ffffffffffffffff821117156106a1576106a06106d9565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b610736816105fb565b811461074157600080fd5b5056fea2646970667358221220d7edb602a2b5d04eb19f61d73a3ff7e99af780a53832b501dc0375e77f74b03b64736f6c63430008070033",
    //   chainId: 1337,
    // };
    // const sentTxResponse = await wallet.sendTransaction(tx);
    // await sentTxResponse.wait(1);
    // console.log(sentTxResponse);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
