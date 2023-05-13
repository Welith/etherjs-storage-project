const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptedKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD);
  console.log(encryptedKey);

  fs.writeFileSync("./.encryptedJsonKey.json", encryptedKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
