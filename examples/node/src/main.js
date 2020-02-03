#!/usr/bin/env node

const program = require('commander');
const sync = require('../lib/sync');

const {Api, JsonRpc} = require('eosjs');
const {JsSignatureProvider} = require('eosjs/dist/eosjs-jssig');
const fetch = require('node-fetch');
const {Prediqt} = require('@everipedia/prediqt-js');
const {TextDecoder, TextEncoder} = require('text-encoding');
const signatureProvider = new JsSignatureProvider(['5J9ZVk2xRt3cbjvgRWiYUqCHJkC7LZvCgo92oZcsjDcg49ZoAii']); // TODO: change for your keys
const rpc = new JsonRpc("https://api-kylin.eoslaomao.com", {fetch});
const api = new Api({rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder()});
const auth = [
    {
        actor: "prediqtbottt", // TODO: change for your account
        permission: "active",
    }
];
const client = new Prediqt({customApi: api}, auth);

program
    .command('sync')
    .alias('s')
    .description('Sync PredIQt Bank')
    .action(async function () {
        await sync(client);
    });

program.parse(process.argv);
