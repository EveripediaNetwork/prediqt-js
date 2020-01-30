<template>
    <div id="app">
        <div class="hello">
            <h1>Limit order</h1>
            <button @click="loginInScatter">Login in scatter</button>
            <p>{{ activeUser.name }}</p>
            <form v-if="activeUser.name" class="form">
                <div>
                    <label>yes: <input type="radio" value="yes" v-model="nameId" /></label>
                    <label>no: <input type="radio" value="no" v-model="nameId" /></label>
                </div>
                <input placeholder="market id" v-model="marketId" />
                <input placeholder="limit" v-model="limit" />
                <input placeholder="to spend" v-model="toSpend" />
                <button @click="placeOrder">Place an order</button>
            </form>
            <p v-if="result">{{ result }}</p>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { Api, JsonRpc } from "eosjs";
import ScatterJS from "@scatterjs/core";
import ScatterEOS from "@scatterjs/eosjs2";
import { Prediqt } from "@everipedia/prediqt-js";

ScatterJS.plugins(new ScatterEOS());

window.ScatterJS = null;

const network = ScatterJS.Network.fromJson({
    blockchain: "eos",
    chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
    host: "nodes.get-scatter.com",
    port: "443",
    protocol: "https"
});
const KYES_API_URL = "https://your.api/keys";
const SIGN_API_URL = "https://your.api/sign";
const CREATE_ORDER_REFERRAL = "prediqtbottt";
const EOS_PRECISION = 10000;

const rpc = new JsonRpc(network.fullhost());

export default {
    data() {
        return {
            activeUser: {},
            limit: "",
            toSpend: "",
            nameId: "yes",
            marketId: "",
            result: ""
        };
    },
    methods: {
        afterLogin(user) {
            this.activeUser = user;
            const fetchSignatures = async signargs => {
                const data = await fetch(SIGN_API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(signargs)
                });

                return data.json();
            };

            const apiSigner = {
                getAvailableKeys: async () => fetch(KYES_API_URL),
                sign: async signargs => fetchSignatures(signargs)
            };
            const signatureProvider = ScatterJS.eosMultiHook(network, [
                apiSigner
            ]);
            const api = new Api({ rpc, signatureProvider });

            this.prediqtApi = new Prediqt({ customApi: api }, [
                {
                    actor: user.name,
                    permission: user.authority
                }
            ]);
        },
        async tryConnectToScatter() {
            let isConnected;
            try {
                isConnected = await ScatterJS.scatter.connect("VueJSExample", {
                    network
                });
            } catch (error) {
                isConnected = false;
            }
            return isConnected;
        },
        async loginInScatter() {
            const isConnected = await this.tryConnectToScatter();
            if (isConnected) {
                try {
                    const result = await ScatterJS.scatter.login();
                    this.afterLogin(result.accounts[0]);
                } catch (error) {
                    console.error(
                        error.message ? error.message : "Login failed."
                    );
                }
            } else {
                console.error("Unable to connect into wallet.");
            }
        },
        async placeOrder(e) {
            e.preventDefault();
            const eosPrecision = EOS_PRECISION.toString().match(/0/g).length;

            const limit = Number(this.limit);
            const toSpend = Number(this.toSpend);
            const marketId = Number(this.marketId);

            try {
                if (!limit || !toSpend || !marketId) {
                    throw new Error("Fill all fields.");
                }

                await this.prediqtApi.limitOrder({
                    nameId: this.nameId,
                    user: this.activeUser.name,
                    marketId,
                    shares: Math.ceil(toSpend * (1 / limit) * EOS_PRECISION),
                    limit: `${limit.toFixed(eosPrecision)} EOS`,
                    transferToken: `${toSpend.toFixed(eosPrecision)} EOS`,
                    referral: CREATE_ORDER_REFERRAL,
                    buy: true
                });
                this.result = "Completed successfully!";
            } catch (error) {
                this.result = error.message
                    ? error.message
                    : "Unable to complete trx.";
            }
        }
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
}
input {
    margin-bottom: 10px;
    font-size: 16px;
}
</style>
