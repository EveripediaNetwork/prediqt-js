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

    /**
     * Set a fee for the platform (admin only)
     */
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

    /**
     * Accept a proposed market
     */
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

    /**
     * Claim shares for a particular market
     */
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

    /**
     * Cancel an order of type No
     */
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

    /**
     * Cancel an order of type Yes
     */
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

    /**
     * Create a Market
     */
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

    /**
     * Delete an existing Market
     */
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

    /**
     * Open an order for share type No in a market
     */
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

    /**
     * Open an order for share type Yes in a market
     */
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

    /**
     * Set a market as invalid (only resolver)
     */
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

    /**
     * Set the outcome of a market (only resolver)
     */
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

    /**
     * Propose a market to be part of the active markets
     */
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

    /**
     * Reject a proposed market (resolver only)
     */
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

    /**
     * Change resolver for a market (admin only)
     */
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

    /**
     * Transfer shares between users
     */
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

    /**
     * Withdraw from user balance
     */
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

    /**
     * Get fees related to the contract
     */
    public async getFees(limit: number = 100, offset: number = 0): Promise<[Fee]> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: this.contractName, table: "fees", json: true,
            limit: limit,
            lower_bound: offset,
        });
        return table.rows;
    }

    /**
     * Get shares related to a market
     */
    public async getShares(marketId: number, limit: number = 100, offset: number = 0): Promise<[Share]> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: marketId, table: "shares", json: true,
            limit: limit,
            lower_bound: offset,
        });
        return table.rows;
    }

    /**
     * Get referral shares related to a market
     */
    public async getReferrals(marketId: number, limit: number = 100, offset: number = 0): Promise<[Share]> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: marketId, table: "referrals", json: true,
            limit: limit,
            lower_bound: offset,
        });
        return table.rows;
    }

    /**
     * Get markets
     */
    public async getMarkets(limit: number = 100, offset: number = 0): Promise<[Market]> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: this.contractName, table: "markets", json: true,
            limit: limit,
            lower_bound: offset,
        });
        return table.rows;
    }

    /**
     * Get a single market
     */
    public async getMarket(marketId: number): Promise<Market> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: this.contractName, table: "markets", json: true,
            upper_bould: marketId,
            lower_bound: marketId,
        });
        return table.rows[0];
    }

    /**
     * Get order of type Yes for a market
     */
    public async getOrdersYes(marketId: number, limit: number = 100, offset: number = 0): Promise<[Order]> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: marketId, table: "lmtorderyes", json: true,
            limit: limit,
            lower_bound: offset,
        });
        return table.rows;
    }

    /**
     * Get order of type No for a market
     */
    public async getOrdersNo(marketId: number, limit: number = 100, offset: number = 0): Promise<[Order]> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: marketId, table: "lmtorderno", json: true,
            limit: limit,
            lower_bound: offset,
        });
        return table.rows;
    }

    /**
     * Get balance of an user
     */
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
