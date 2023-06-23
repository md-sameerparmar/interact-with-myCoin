let express = require('express');
let app = express();

const fetch = require('node-fetch');
const aptos = require('aptos');
let bodyParser = require('body-parser');

let urlEncodedParser = bodyParser.urlencoded({ extended: false});

const client = new aptos.AptosClient("https://fullnode.devnet.aptoslabs.com");

const a1 = {
    address: "0x078770fa8e5e0f5e18d04a7a424c60e6989996d01197e0203d4556a433d8c383",
    publicKeyHex: "0x4f8bbe1b45e355c55de8046063fe09b7ea5f9a31fe9263c9e822a6de1c160af1",
    privateKeyHex: "0x61f7d842d53a6961951c848a53dfa77c0e55d4fce1b0e55eff78f262b3034b3c"
};

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
 })

app.get('/resource', async (req, res) =>{
    await fetch("https://fullnode.devnet.aptoslabs.com/v1/accounts/0x078770fa8e5e0f5e18d04a7a424c60e6989996d01197e0203d4556a433d8c383/resource/0x078770fa8e5e0f5e18d04a7a424c60e6989996d01197e0203d4556a433d8c383::dogecoinv2::CoinCapabilities")
    .then((resp) => resp.json())
    .then((resk) => res.send(resk.data))
    .catch((err) => res.send(err))
})

app.post('/mint',urlEncodedParser, async (req, res) => {
    const account1 = aptos.AptosAccount.fromAptosAccountObject(a1);
    const payload = {
        type: "entry_function_payload",
        function: "0x078770fa8e5e0f5e18d04a7a424c60e6989996d01197e0203d4556a433d8c383::dogecoinv2::mint",
        type_arguments: [],
        arguments: [req.body.address, req.body.MintAmount],
    };

    const txnRequest = await client.generateTransaction(account1.address(), payload);
    const signedTxn = await client.signTransaction(account1, txnRequest);
    //console.log(signedTxn);
    const transactionRes = await client.submitTransaction(signedTxn);
    await client.waitForTransaction(transactionRes.hash);
    res.send("Coin Mint!");
    // res.end(JSON.stringify(transactionRes));
})

app.post('/burn',urlEncodedParser, async (req, res) => {
    const account1 = aptos.AptosAccount.fromAptosAccountObject(a1);
    const payload = {
        type: "entry_function_payload",
        function: "0x078770fa8e5e0f5e18d04a7a424c60e6989996d01197e0203d4556a433d8c383::dogecoinv2::burn",
        type_arguments: [],
        arguments: [req.body.BurnAmount],
    };

    const txnRequest = await client.generateTransaction(account1.address(), payload);
    const signedTxn = await client.signTransaction(account1, txnRequest);
    //console.log(signedTxn);
    const transactionRes = await client.submitTransaction(signedTxn);
    await client.waitForTransaction(transactionRes.hash);
    res.send("Coin Burn!");
    // res.end(JSON.stringify(transactionRes));
})

app.post('/freeze_user',urlEncodedParser, async (req, res) => {
    const account1 = aptos.AptosAccount.fromAptosAccountObject(a1);
    const payload = {
        type: "entry_function_payload",
        function: "0x078770fa8e5e0f5e18d04a7a424c60e6989996d01197e0203d4556a433d8c383::dogecoinv2::freeze_user",
        type_arguments: [],
        arguments: [req.body.UserAddress],
    };

    const txnRequest = await client.generateTransaction(account1.address(), payload);
    const signedTxn = await client.signTransaction(account1, txnRequest);
    //console.log(signedTxn);
    const transactionRes = await client.submitTransaction(signedTxn);
    await client.waitForTransaction(transactionRes.hash);
    res.send("User is Freeze!");
    // res.end(JSON.stringify(transactionRes));
})

app.post('/unfreeze_user',urlEncodedParser, async (req, res) => {
    const account1 = aptos.AptosAccount.fromAptosAccountObject(a1);
    const payload = {
        type: "entry_function_payload",
        function: "0x078770fa8e5e0f5e18d04a7a424c60e6989996d01197e0203d4556a433d8c383::dogecoinv2::unfreeze_user",
        type_arguments: [],
        arguments: [req.body.UserAddress],
    };

    const txnRequest = await client.generateTransaction(account1.address(), payload);
    const signedTxn = await client.signTransaction(account1, txnRequest);
    //console.log(signedTxn);
    const transactionRes = await client.submitTransaction(signedTxn);
    await client.waitForTransaction(transactionRes.hash);
    res.send("User is Unfreeze!");
    // res.end(JSON.stringify(transactionRes));
})

var server = app.listen(8081, function () {
    var port = server.address().port

    console.log("Example app listening at http://localhost:%s", port);
})