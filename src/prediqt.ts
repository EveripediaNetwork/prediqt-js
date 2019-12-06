const fetch = require("isomorphic-fetch");
import {Api, JsonRpc} from "eosjs";

import {TransactParams, Authorization, Balance, Fee, Market, Order, Share} from "./interfaces/prediqt";
import {SignatureProvider} from "eosjs/dist/eosjs-api-interfaces";
import {isObject} from "./utils";

export class Prediqt {
    private readonly rpc: JsonRpc;
    private readonly api: Api;
    private readonly contractName: string;
    private auth: any;

    private transactParams: TransactParams = {
        blocksBehind: 3,
        expireSeconds: 60,
    };

    constructor(nodeAddress: string, signatureProvider: SignatureProvider, contractName: string, auth: Authorization[]) {
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
            this.transactParams,
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
                        resolver,
                        market_id: marketId,
                    },
                }],
            },
            this.transactParams,
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
                        user,
                        market_id: marketId,
                    },
                }],
            },
            this.transactParams,
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
                        user,
                        market_id: marketId,
                        id,
                    },
                }],
            },
            this.transactParams,
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
                        user,
                        market_id: marketId,
                        id,
                    },
                }],
            },
            this.transactParams,
        );
    }

    /**
     * Create a Market
     */
    public async createMarket(creator: string, resolver: string, ipfs: string, timeIn: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "createmarket",
                    authorization: this.auth,
                    data: {
                        creator,
                        resolver,
                        ipfs,
                        time_in: timeIn,
                    },
                }],
            },
            this.transactParams,
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
            this.transactParams,
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
                        user,
                        market_id: marketId,
                        shares,
                        limit,
                        referral,
                        buy,
                    },
                }],
            },
            this.transactParams,
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
                        user,
                        market_id: marketId,
                        shares,
                        limit,
                        referral,
                        buy,
                    },
                }],
            },
            this.transactParams,
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
                        memo,
                    },
                }],
            },
            this.transactParams,
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
                        resolver,
                        market_id: marketId,
                        sharetype,
                        memo,
                    },
                }],
            },
            this.transactParams,
        );
    }

    /**
     * Propose a market to be part of the active markets
     */
    public async proposeMarket(creator: string, resolver: string, ipfs: string, timeIn: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.contractName,
                    name: "propmarket",
                    authorization: this.auth,
                    data: {
                        creator,
                        resolver,
                        ipfs,
                        time_in: timeIn,
                    },
                }],
            },
            this.transactParams,
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
                        resolver,
                        market_id: marketId,
                    },
                }],
            },
            this.transactParams,
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
                        resolver,
                        market_id: marketId,
                    },
                }],
            },
            this.transactParams,
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
                        from,
                        to,
                        shares,
                        sharetype,
                        market_id: marketId,
                    },
                }],
            },
            this.transactParams,
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
                        user,
                        quantity,
                    },
                }],
            },
            this.transactParams,
        );
    }

    /**
     * Sync Bank
     */
    public async syncBank(): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: "prediqtbankk",
                    name: "sync",
                    authorization: this.auth,
                    data: {},
                }],
            },
            this.transactParams,
        );
    }

    /**
     * Get fees related to the contract
     */
    public async getFees(limit: number = 100, offset: number = 0): Promise<[Fee]> {
        const table = await this.rpc.get_table_rows({
            code: this.contractName, scope: this.contractName, table: "fees", json: true,
            limit,
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
            limit,
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
            limit,
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
            limit,
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
            limit,
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
            limit,
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
            limit,
            lower_bound: holder,
            upper_bound: holder,
        });
        return table.rows[0];
    }

    public setAuth(auth: Authorization[]) {
        if (Array.isArray(auth)) {
            if (auth.every((item) => isObject(item))) {
                this.auth = auth;
            } else {
                throw new Error("Auth items must be instances of Object.");
            }
        } else {
            throw new Error("Auth must be an instance of Array.");
        }
    }
}
