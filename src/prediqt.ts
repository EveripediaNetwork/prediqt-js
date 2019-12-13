import {Api, JsonRpc} from "eosjs";
import {SignatureProvider} from "eosjs/dist/eosjs-api-interfaces";

const fetch = require("isomorphic-fetch");

import {
    TransactParams,
    Authorization,
    Balance,
    Fee,
    Market,
    Order,
    Share,
    TransferShares,
    MarketResolve,
    LimitOrder,
    UserResources,
    IqBalance,
    CancelShares,
    BuyShares,
    CreateMarket,
    SellShares,
    Contracts,
} from "./interfaces/prediqt";
import {OrderTypes} from "./enums/prediqt";

import {transferAction, transferSharesAction} from "./actions";
import {isObject, processData} from "./tools/utils";

import {
    EOSIO_TOKEN_CONTRACT,
    EOSIO_CONTRACT,
    PREDIQT_CONTRACT,
    PREDIQT_MARKET_CONTRACT,
    EVERIPEDIA_CONTRACT,
    PREDIQT_BANK_CONTRACT,
} from "./tools/constants";

export class Prediqt {
    private readonly rpc: JsonRpc;
    private readonly api: Api;
    private readonly prediqtContract: string;
    private readonly prediqtMarketContract: string;
    private readonly everipediaContract: string;
    private readonly prediqtBankContract: string;
    private readonly eosioTokenContract: string;
    private readonly eosioContract: string;
    private auth: Authorization[];

    private transactParams: TransactParams = {
        blocksBehind: 3,
        expireSeconds: 60,
    };

    constructor(nodeEndpoint: string,
                signatureProvider: SignatureProvider,
                contracts: Contracts,
                auth?: Authorization[]) {
        this.prediqtContract = contracts.prediqt || PREDIQT_CONTRACT;
        this.prediqtMarketContract = contracts.prediqtMarket || PREDIQT_MARKET_CONTRACT;
        this.everipediaContract = contracts.everipedia || EVERIPEDIA_CONTRACT;
        this.prediqtBankContract = contracts.prediqtBank || PREDIQT_BANK_CONTRACT;
        this.eosioTokenContract = EOSIO_TOKEN_CONTRACT as string;
        this.eosioContract = EOSIO_CONTRACT as string;
        this.rpc = new JsonRpc(nodeEndpoint, {fetch: fetch as any});
        this.api = new Api({rpc: this.rpc, signatureProvider});
        this.auth = auth || [];
    }

    /**
     * Utility methods
     */

    public setAuth(auth: Authorization[]): void {
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

    public resetAuth(): void {
        this.auth = [];
    }

    /**
     * Set a fee for the platform (admin only)
     */
    public async setFee(fee: Fee): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.prediqtContract,
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
                    account: this.prediqtContract,
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
                    account: this.prediqtContract,
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
     * Cancel an order
     */
    public async cancelOrder(nameId: OrderTypes, user: string, marketId: number, id: number): Promise<any> {
        if (!Object.values(OrderTypes).includes(nameId)) {
            throw new Error(`nameId must be "${OrderTypes.Yes}" or "${OrderTypes.No}".`);
        }
        return await this.api.transact(
            {
                actions: [{
                    account: this.prediqtContract,
                    name: `cnclorder${nameId}`,
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
    public async createMarket(data: CreateMarket): Promise<any> {
        const {
            creator,
            resolver,
            ipfs,
            timeIn,
            transferToken,
        } = data;
        return await this.api.transact(
            {
                actions: [
                    transferAction(
                        this.everipediaContract,
                        this.auth,
                        creator,
                        this.prediqtContract,
                        transferToken,
                        "createmarket 5 IQ",
                    ),
                    {
                        account: this.prediqtContract,
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
    public async deleteMarket(marketId: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.prediqtContract,
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
     * Open an order for shares in a market
     */
    public async limitOrder(data: LimitOrder): Promise<any> {
        const {
            nameId,
            user,
            marketId,
            shares,
            limit,
            referral,
            buy,
            transferToken,
        } = data;
        if (!Object.values(OrderTypes).includes(nameId)) {
            throw new Error(`nameId must be "${OrderTypes.Yes}" or "${OrderTypes.No}".`);
        }

        return await this.api.transact(
            {
                actions: [
                    transferAction(
                        this.eosioTokenContract,
                        this.auth,
                        user,
                        this.prediqtContract,
                        transferToken,
                        `create order for market ${marketId}`,
                    ),
                    {
                        account: this.prediqtContract,
                        name: `lmtorder${nameId}`,
                        authorization: this.auth,
                        data: {
                            user,
                            market_id: marketId,
                            shares,
                            limit,
                            referral,
                            buy,
                        },
                    },
                ],
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
                    account: this.prediqtContract,
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
    public async marketResolve(data: MarketResolve): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.prediqtContract,
                    name: "mktresolve",
                    authorization: this.auth,
                    data: processData(data),
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
                    account: this.prediqtContract,
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
                    account: this.prediqtContract,
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
                    account: this.prediqtContract,
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
     * Withdraw from user balance
     */
    public async withdraw(user: string, quantity: string): Promise<any> {
        return await this.api.transact(
            {
                actions: [{
                    account: this.prediqtContract,
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
     * Transfer shares between users
     */
    public async transferShares(data: TransferShares): Promise<any> {
        return await this.api.transact(
            {
                actions: [transferSharesAction(this.prediqtContract, this.auth, data)],
            },
            this.transactParams,
        );
    }

    /**
     * Cancel user's shares
     */
    public async cancelShares(data: CancelShares): Promise<any> {
        return await this.api.transact({
            actions: [
                {
                    account: this.prediqtMarketContract,
                    name: "cancelshares",
                    authorization: this.auth,
                    data: processData(data),
                }],
        });

    }

    /**
     * Buy shares
     */
    public async buyShares(data: BuyShares): Promise<any> {
        const {
            from,
            price,
            shares,
            shareType,
            marketId,
            transferToken,
        } = data;
        return await this.api.transact({
            actions: [
                transferAction(
                    this.eosioTokenContract,
                    this.auth,
                    from,
                    this.prediqtContract,
                    transferToken,
                    `create order for secondary market ${marketId}`,
                ),
                {
                    account: this.prediqtMarketContract,
                    name: "buyshares",
                    authorization: this.auth,
                    data: {
                        from,
                        price,
                        shares,
                        sharetype: shareType,
                        market_id: marketId,
                    },
                }],
        });

    }

    public async sellShares(data: SellShares): Promise<any> {
        const {from, shares, shareType, marketId} = data;
        return await this.api.transact({
            actions: [
                transferSharesAction(this.prediqtContract, this.auth, {
                    from,
                    to: this.prediqtMarketContract,
                    shares,
                    shareType,
                    marketId,
                }),
                {
                    account: this.prediqtMarketContract,
                    name: "sellshares",
                    authorization: this.auth,
                    data: processData(data),
                }],
        });
    }

    /**
     * Get fees related to the contract
     */
    public async getFees(limit: number = 100, offset: number = 0): Promise<[Fee]> {
        const table = await this.rpc.get_table_rows({
            code: this.prediqtContract, scope: this.prediqtContract, table: "fees", json: true,
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
            code: this.prediqtContract, scope: marketId, table: "shares", json: true,
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
            code: this.prediqtContract, scope: marketId, table: "referrals", json: true,
            limit,
            lower_bound: offset,
        });
        return table.rows;
    }

    /**
     * Get markets
     */
    public async getMarkets(limit: number = 100, offset: number = 0, tableKey: string = ""): Promise<[Market]> {
        const table = await this.rpc.get_table_rows({
            code: this.prediqtContract, scope: this.prediqtContract, table: "markets", json: true,
            limit,
            table_key: tableKey,
            lower_bound: offset,
        });
        return table.rows;
    }

    /**
     * Get a single market
     */
    public async getMarket(marketId: number): Promise<Market> {
        const table = await this.rpc.get_table_rows({
            code: this.prediqtContract, scope: this.prediqtContract, table: "markets", json: true,
            upper_bould: marketId,
            lower_bound: marketId,
        });
        return table.rows[0];
    }

    /**
     * Get order of type Yes for a market
     */
    public async getOrdersYes(marketId: number, limit: number = 100, offset: number = 0, tableKey: string = ""): Promise<[Order]> {
        const table = await this.rpc.get_table_rows({
            code: this.prediqtContract, scope: marketId, table: "lmtorderyes", json: true,
            limit,
            table_key: tableKey,
            lower_bound: offset,
        });
        return table.rows;
    }

    /**
     * Get order of type No for a market
     */
    public async getOrdersNo(marketId: number, limit: number = 100, offset: number = 0, tableKey: string = ""): Promise<[Order]> {
        const table = await this.rpc.get_table_rows({
            code: this.prediqtContract, scope: marketId, table: "lmtorderno", json: true,
            limit,
            table_key: tableKey,
            lower_bound: offset,
        });
        return table.rows;
    }

    /**
     * Get balance of an user
     */
    public async getBalance(username: string, symbol: string): Promise<Balance> {
        const table = await this.rpc.get_table_rows({
            code: this.prediqtContract, scope: symbol, table: "balances", json: true,
            lower_bound: username,
            upper_bound: username,
        });
        return table.rows[0];
    }

    /**
     * Get IQ balance of an user
     */
    public async getIqBalance(username: string): Promise<IqBalance> {
        const table = await this.rpc.get_table_rows({
            code: this.everipediaContract, scope: username, table: "accounts", json: true,
            table_key: username,
        });
        return table.rows[0];
    }

    /**
     * Get resources of an user
     */
    public async getUserResources(username: string): Promise<UserResources> {
        const table = await this.rpc.get_table_rows({
            code: this.eosioContract, scope: username, table: "userres", json: true,
            table_key: username,
        });
        return table.rows[0];
    }

    /**
     * Get account data of an user
     */
    public async getAccount(username: string): Promise<any> {
        return await this.rpc.get_account(username);
    }
}
