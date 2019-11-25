import Fetch from "isomorphic-fetch";
import {Api, JsonRpc} from "eosjs";
import {Authorization, Balance, Fee, Market, Order, Share} from "./interfaces/prediqt";
import {SignatureProvider} from "eosjs/dist/eosjs-api-interfaces";

export class Prediqt {
    private readonly rpc: JsonRpc;
    private readonly api: Api;
    private readonly contractName: string;
    private auth: any;

    constructor(nodeAddress: string, signatureProvider: SignatureProvider, contractName: string, auth: Authorization[]) {
        const fetch: any = Fetch;
        this.contractName = contractName;
        this.rpc = new JsonRpc(nodeAddress, {fetch});
        this.api = new Api({rpc: this.rpc, signatureProvider});
        this.auth = auth;
    }

    public async setFee(fee: Fee): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "fee_id",
                    authorization: this.auth,
                    data: {
                        fee_id: fee.id,
                        fee_amount: fee.fee,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async acceptMarket(resolver: string, marketId: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "acceptmarket",
                    authorization: this.auth,
                    data: {
                        resolver: resolver,
                        market_id: marketId,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async claimShares(user: string, marketId: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "claimshares",
                    authorization: this.auth,
                    data: {
                        user: user,
                        market_id: marketId,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async cancelOrderNo(user: string, marketId: number, id: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "cnclorderno",
                    authorization: this.auth,
                    data: {
                        user: user,
                        market_id: marketId,
                        id: id,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async cancelOrderYes(user: string, marketId: number, id: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "cnclorderyes",
                    authorization: this.auth,
                    data: {
                        user: user,
                        market_id: marketId,
                        id: id,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async createMarket(creator: string, resolver: string, ipfs: string, time_in: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "createmarket",
                    authorization: this.auth,
                    data: {
                        creator: creator,
                        resolver: resolver,
                        ipfs: ipfs,
                        time_in: time_in,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async delMarket(marketId: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "delmarket",
                    authorization: this.auth,
                    data: {
                        market_id: marketId,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async limitOrderNo(user: string, marketId: number, shares: number, limit: string, referral: string, buy: boolean): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "lmtorderno",
                    authorization: this.auth,
                    data: {
                        user: user,
                        market_id: marketId,
                        shares: shares,
                        limit: limit,
                        referral: referral,
                        buy: buy,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async limitOrderYes(user: string, marketId: number, shares: number, limit: string, referral: string, buy: boolean): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "lmtorderyes",
                    authorization: this.auth,
                    data: {
                        user: user,
                        market_id: marketId,
                        shares: shares,
                        limit: limit,
                        referral: referral,
                        buy: buy,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async marketInvalid(marketId: number, memo: string): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "mktinvalid",
                    authorization: this.auth,
                    data: {
                        market_id: marketId,
                        memo: memo,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async marketResolve(resolver: string, marketId: number, sharetype: boolean, memo: string): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "mktresolve",
                    authorization: this.auth,
                    data: {
                        resolver: resolver,
                        market_id: marketId,
                        sharetype: sharetype,
                        memo: memo,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async proposeMarket(creator: string, resolver: string, ipfs: string, time_in: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "propmarket",
                    authorization: this.auth,
                    data: {
                        creator: creator,
                        resolver: resolver,
                        ipfs: ipfs,
                        time_in: time_in,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async rejectMarket(resolver: string, marketId: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "rejectmarket",
                    authorization: this.auth,
                    data: {
                        resolver: resolver,
                        market_id: marketId,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async setResolver(resolver: string, marketId: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "setresolver",
                    authorization: this.auth,
                    data: {
                        resolver: resolver,
                        market_id: marketId,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async transferShares(from: string, to: string, shares: number, sharetype: boolean, marketId: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "trnsfrshares",
                    authorization: this.auth,
                    data: {
                        from: from,
                        to: to,
                        shares: shares,
                        sharetype: sharetype,
                        market_id: marketId,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async withdraw(user: string, quantity: string): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "withdraw",
                    authorization: this.auth,
                    data: {
                        user: user,
                        quantity: quantity,
                    },
                }],
            },
            {
                blocksBehind: 3,
                expireSeconds: 60,
            },
        );
    }

    public async getFees(limit: number = 100, offset: number = 0): Promise<[Fee]> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: this.contractName, table: "fees", json: true,
            limit: limit,
            lower_bound: offset,
        });
        return table.rows;
    }

    public async getShares(marketId: number, limit: number = 100, offset: number = 0): Promise<[Share]> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: marketId, table: "shares", json: true,
            limit: limit,
            lower_bound: offset,
        });
        return table.rows;
    }

    public async getReferrals(marketId: number, limit: number = 100, offset: number = 0): Promise<[Share]> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: marketId, table: "referrals", json: true,
            limit: limit,
            lower_bound: offset,
        });
        return table.rows;
    }

    public async getMarkets(limit: number = 100, offset: number = 0): Promise<[Market]> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: this.contractName, table: "markets", json: true,
            limit: limit,
            lower_bound: offset,
        });
        return table.rows;
    }

    public async getMarket(marketId: number): Promise<Market> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: this.contractName, table: "markets", json: true,
            upper_bould: marketId,
            lower_bound: marketId,
        });
        return table.rows[0];
    }

    public async getOrdersYes(marketId: number, limit: number = 100, offset: number = 0): Promise<[Order]> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: marketId, table: "lmtorderyes", json: true,
            limit: limit,
            lower_bound: offset,
        });
        return table.rows;
    }

    public async getOrdersNo(marketId: number, limit: number = 100, offset: number = 0): Promise<[Order]> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: marketId, table: "lmtorderno", json: true,
            limit: limit,
            lower_bound: offset,
        });
        return table.rows;
    }

    public async getBalance(holder: string, symbol: string, limit: number = 1): Promise<Balance> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: symbol, table: "balances", json: true,
            limit: limit,
            lower_bound: holder,
            upper_bound: holder,
        });
        return table.rows[0];
    }

    public setAuth(auth: Authorization[]) {
        this.auth = auth;
    }
}
