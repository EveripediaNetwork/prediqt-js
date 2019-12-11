import {Prediqt} from "../src";
import {JsSignatureProvider} from "eosjs/dist/eosjs-jssig";

const endpoint = process.env.EOSIO_ENDPOINT || "https://api.kylin.alohaeos.com";
const contract = process.env.PREDIQT_CONTRACT || "prediqtpedia";
const from = process.env.PREDIQT_FROM || "prediqtpedia";
const keys = process.env.PREDIQT_KEYS || "-";
const signatureProvider = new JsSignatureProvider([keys]);
const auth = [
{
    actor: from,
    permission: "active",
}];
const client = new Prediqt(endpoint, signatureProvider, contract, auth);
jest.setTimeout(10000);

test("Prediqt.getFees", async () => {
    const response = await client.getFees();
    expect(!!response).toBeTruthy();
});

test("Prediqt.getBalance", async () => {
    const response = await client.getBalance("kesaritooooo", "EOS");
    expect(!!response).toBeTruthy();
});

test("Prediqt.getMarkets", async () => {
    const response = await client.getMarkets();
    expect(!!response).toBeTruthy();
});

test("Prediqt.getMarket", async () => {
    const response = await client.getMarket(0);
    expect(!!response).toBeTruthy();
});

test("Prediqt.getUserResources", async () => {
   const response = await client.getUserResources("kesaritooooo");
   expect(!!response).toBeTruthy();
});

test("Prediqt.getAccount", async () => {
    const response = await client.getAccount("kesaritooooo");
    expect(!!response).toBeTruthy();
});
