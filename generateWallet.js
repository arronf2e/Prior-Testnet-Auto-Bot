const { ethers } = require("ethers");
const fs = require("fs");
const path = require('path'); // 新增 path 模块

// 生成并保存指定数量的钱包
async function generateAndSaveWallets(number) {
    // 使用 path.join 组合绝对路径
    const pkPath = path.join(__dirname, 'pk.txt');
    const csvPath = path.join(__dirname, 'wallets.csv');
    
    // 初始化文件
    fs.writeFileSync(pkPath, '');
    fs.writeFileSync(csvPath, '地址,私钥,助记词\n');

    const wallets = [];
    
    // 生成钱包
    for (let i = 0; i < number; i++) {
        const wallet = ethers.Wallet.createRandom();
        wallets.push(wallet);

        console.log(wallet)
        
        // 修改文件写入路径
        fs.appendFileSync(pkPath, `${wallet.privateKey}\n`);
        fs.appendFileSync(csvPath, 
            `${wallet.address},${wallet.privateKey},${wallet.mnemonic.phrase}\n`);
    }

    return wallets;
}

// module.exports = { generateAndSaveWallets };

generateAndSaveWallets(10)