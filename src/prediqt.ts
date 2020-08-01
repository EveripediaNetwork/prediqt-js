import { Api, JsonRpc } from "eosjs";

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
    ProposeMultiSig,
    ApiData,
    GetOrders,
    MarketResolveOracle,
    UserOracle, AllowedAsset, TotalIqResolutionVotes
} from "./interfaces/prediqt";
import { OrderTypes } from "./enums/prediqt";

import { transferAction, transferSharesAction } from "./actions";
import { isObject, processData } from "./tools";

import {
    EOSIO_TOKEN_CONTRACT,
    EOSIO_CONTRACT,
    PREDIQT_CONTRACT,
    PREDIQT_MARKET_CONTRACT,
    EVERIPEDIA_CONTRACT,
    PREDIQT_BANK_CONTRACT,
    EOSIO_MULTISIG_CONTRACT,
    PREDIQT_ORACL_CONTRACT,
    IQ_RESOLUTION_CONTRACT
} from "./constants";

export class Prediqt {
    private readonly rpc: JsonRpc;
    private readonly api: Api | any;
    private readonly prediqtContract: string;
    private readonly prediqtMarketContract: string;
    private readonly iqTokenContract: string;
    private readonly iqResolutionContract: string;
    private readonly prediqtBankContract: string;
    private readonly eosioTokenContract: string;
    private readonly tokenContractMapping?: { [symbol: string]: string; };
    private readonly eosioContract: string;
    private readonly eosioMultiSigContract: string;
    private readonly prediqtOraclContract: string;
    private auth: Authorization[];

    private transactParams: TransactParams = {
        blocksBehind: 3,
        expireSeconds: 60
    };

    constructor(
        apiData: ApiData,
        auth: Authorization[] = [],
        contracts: Contracts = {}
    ) {
        this.prediqtContract = contracts.prediqt || PREDIQT_CONTRACT;
        this.prediqtMarketContract =
            contracts.prediqtMarket || PREDIQT_MARKET_CONTRACT;
        this.iqTokenContract = contracts.iqToken || EVERIPEDIA_CONTRACT;
        this.iqResolutionContract = contracts.iqResolution || IQ_RESOLUTION_CONTRACT;
        this.prediqtBankContract =
            contracts.prediqtBank || PREDIQT_BANK_CONTRACT;
        this.eosioTokenContract = EOSIO_TOKEN_CONTRACT;
        this.eosioContract = EOSIO_CONTRACT;
        this.eosioMultiSigContract = EOSIO_MULTISIG_CONTRACT;
        this.prediqtOraclContract = PREDIQT_ORACL_CONTRACT;
        this.tokenContractMapping = contracts.tokenContractMapping;
        if (apiData.customApi) {
            this.api = apiData.customApi;
            this.rpc = apiData.customApi.rpc;
        } else if (apiData.createApi?.signatureProvider) {
            const { nodeEndpoint, signatureProvider } = apiData.createApi;
            this.rpc = new JsonRpc(nodeEndpoint, { fetch: fetch as any });
            this.api = new Api({ rpc: this.rpc, signatureProvider });
        } else {
            throw new Error("Api has not been created.");
        }
        this.auth = auth;
    }

    /**
     * Set authorization to execute transactions
     * @param {Object[]} auth
     * @param {string} auth[].actor
     * @param {string} auth[].permission
     */
    public setAuth(auth: Authorization[]): void {
        if (Array.isArray(auth)) {
            if (auth.every(item => isObject(item))) {
                this.auth = auth;
            } else {
                throw new Error("Auth items must be instances of Object.");
            }
        } else {
            throw new Error("Auth must be an instance of Array.");
        }
    }

    /**
     * Reset authorization to execute transactions
     */
    public resetAuth(): void {
        this.auth = [];
    }

    /**
     * Set a fee for the platform (admin only)
     * @param {Object} fee
     * @param {number} fee.id
     * @param {number} fee.fee
     */
    public async setFee(fee: Fee): Promise<any> {
        return await this.api.transact(
            {
                actions: [
                    {
                        account: this.prediqtContract,
                        name: "fee_id",
                        authorization: this.auth,
                        data: {
                            fee_id: fee.id,
                            fee_amount: fee.fee
                        }
                    }
                ]
            },
            this.transactParams
        );
    }

    /**
     * Claim shares for a particular market
     * @param {string} user
     * @param {number} marketId
     */
    public async claimShares(user: string, marketId: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [
                    {
                        account: this.prediqtContract,
                        name: "claimshares",
                        authorization: this.auth,
                        data: {
                            user,
                            market_id: marketId
                        }
                    }
                ]
            },
            this.transactParams
        );
    }

    /**
     * Cancel an order
     * @param {string} nameId - takes "yes" or "no"
     * @param {string} user
     * @param {number} marketId
     * @param {number} id
     */
    public async cancelOrder(
        nameId: OrderTypes,
        user: string,
        marketId: number,
        id: number
    ): Promise<any> {
        if (!Object.values(OrderTypes).includes(nameId)) {
            throw new Error(
                `nameId must be "${OrderTypes.Yes}" or "${OrderTypes.No}".`
            );
        }
        return await this.api.transact(
            {
                actions: [
                    {
                        account: this.prediqtContract,
                        name: `cnclorder${nameId}`,
                        authorization: this.auth,
                        data: {
                            user,
                            market_id: marketId,
                            id
                        }
                    }
                ]
            },
            this.transactParams
        );
    }

    /**
     * Create a Market
     * @param {Object} data
     * @param {string} data.creator
     * @param {string} data.resolver
     * @param {string} data.ipfs
     * @param {number} data.timeIn
     * @param {string} data.transferToken
     */
    public async createMarket(data: CreateMarket): Promise<any> {
        const { creator, resolver, ipfs, timeIn, symbol, transferToken, transferMemo } = data;

        return await this.api.transact(
            {
                actions: [
                    transferAction(
                        this.iqTokenContract,
                        this.auth,
                        creator,
                        this.prediqtContract,
                        transferToken,
                        transferMemo
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
                            symbol
                        }
                    }
                ]
            },
            this.transactParams
        );
    }

    /**
     * Delete an existing Market
     * @param {number} marketId
     */
    public async deleteMarket(marketId: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [
                    {
                        account: this.prediqtContract,
                        name: "delmarket",
                        authorization: this.auth,
                        data: {
                            market_id: marketId
                        }
                    }
                ]
            },
            this.transactParams
        );
    }

    /**
     * Open an order for shares in a market
     * @param {Object} data
     * @param {string} data.nameId  - takes "yes" or "no"
     * @param {string} data.user
     * @param {number} data.marketId
     * @param {number} data.shares
     * @param {string} data.limit
     * @param {string} data.transferToken
     * @param {string} data.referral
     * @param {boolean} data.buy
     */
    public async limitOrder(data: LimitOrder): Promise<any> {
        
        return await this.api.transact(
            {
                actions: this.getLimitOrderActions(data)
            },
            this.transactParams
        );
    }

    /**
     * Gets an action for an order for shares in a market
     * @param {Object} data
     * @param {string} data.nameId  - takes "yes" or "no"
     * @param {string} data.user
     * @param {number} data.marketId
     * @param {number} data.shares
     * @param {string} data.limit
     * @param {string} data.transferToken
     * @param {string} data.referral
     * @param {boolean} data.buy
     */
    public getLimitOrderActions(data: LimitOrder): any[] {
        const {
            nameId,
            user,
            marketId,
            shares,
            limit,
            referral,
            buy,
            transferToken
        } = data;
        if (!Object.values(OrderTypes).includes(nameId)) {
            throw new Error(
              `nameId must be "${OrderTypes.Yes}" or "${OrderTypes.No}".`
            );
        }

        return [
             ... (buy ? [transferAction(
              this.getContractForToken(transferToken),
              this.auth,
              user,
              this.prediqtContract,
              transferToken,
              `create order for market ${marketId}`
            )] : []),
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
                    buy
                }
            }
        ];
    }

    /**
     * Set the outcome of a market (only resolver)
     * @param {Object} data
     * @param {string} data.resolver
     * @param {number} data.marketId
     * @param {boolean} data.shareType
     * @param {string} data.memo
     */
    public async marketResolve(data: MarketResolve): Promise<any> {
        return await this.api.transact(
            {
                actions: [
                    {
                        account: this.prediqtContract,
                        name: "mktresolve",
                        authorization: this.auth,
                        data: processData(data)
                    }
                ]
            },
            this.transactParams
        );
    }

    /**
     * Set the outcome of a market (only resolver)
     * @param {Object} data
     * @param {string} data.account
     * @param {number} data.marketId
     * @param {number} data.vote
     */
    public async marketResolveOracle(data: MarketResolveOracle): Promise<any> {
        return await this.api.transact(
            {
                actions: [
                    {
                        account: this.prediqtOraclContract,
                        name: "voteresult",
                        authorization: this.auth,
                        data: processData(data)
                    }
                ]
            },
            this.transactParams
        );
    }

    /**
     * IQ resolution method
     * @param {string} loggedInUser
     * @param {string} quantity
     * @param {number} marketId
     * @param {boolean} isYes
     */
    public async marketResolveIQ(loggedInUser: string, quantity: string , marketId: number, isYes: boolean): Promise<any> {
        return await this.api.transact(
            {
                actions: [
                    transferAction(
                        this.iqTokenContract,
                        this.auth,
                        loggedInUser,
                        this.iqResolutionContract,
                        quantity,
                        `${marketId},${isYes ? 1 : 0}`
                    ),
                ]
            },
            this.transactParams
        );
    }

    /**
     * Get total IQ votes from IQ resolution method
     */
    public async getTotalIqVotes(): Promise<[TotalIqResolutionVotes]> {
        const table = await this.rpc.get_table_rows({
            code: this.iqResolutionContract,
            scope: 0,
            table: "totalvotes",
            json: true
        });
        return table.rows;
    }

    /**
     * Propose a market to be part of the active markets
     * @param {string} creator
     * @param {string} resolver
     * @param {string} ipfs
     * @param {number} timeIn
     * @param {string} symbol
     * @param {string} transferToken
     * @param {string} transferMemo
     */
    public async proposeMarket(
        creator: string,
        resolver: string,
        ipfs: string,
        timeIn: number,
        symbol: string,
        transferToken: string,
        transferMemo: string
    ): Promise<any> {
        return await this.api.transact(
            {
                actions: [
                    transferAction(
                        this.iqTokenContract,
                        this.auth,
                        creator,
                        this.prediqtContract,
                        transferToken,
                        transferMemo
                    ),
                    {
                        account: this.prediqtContract,
                        name: "propmarket",
                        authorization: this.auth,
                        data: {
                            creator,
                            resolver,
                            ipfs,
                            time_in: timeIn,
                            symbol
                        }
                    }
                ]
            },
            this.transactParams
        );
    }

    /**
     * Reject a proposed market (resolver only)
     * @param {string} resolver
     * @param {number} marketId
     */
    public async rejectMarket(
        resolver: string,
        marketId: number
    ): Promise<any> {
        return await this.api.transact(
            {
                actions: [
                    {
                        account: this.prediqtContract,
                        name: "rejectmarket",
                        authorization: this.auth,
                        data: {
                            resolver,
                            market_id: marketId
                        }
                    }
                ]
            },
            this.transactParams
        );
    }

    /**
     * Change resolver for a market (admin only)
     * @param {string} resolver
     * @param {number} marketId
     */
    public async setResolver(resolver: string, marketId: number): Promise<any> {
        return await this.api.transact(
            {
                actions: [
                    {
                        account: this.prediqtContract,
                        name: "setresolver",
                        authorization: this.auth,
                        data: {
                            resolver,
                            market_id: marketId
                        }
                    }
                ]
            },
            this.transactParams
        );
    }

    /**
     * Withdraw from user balance
     * @param {string} user
     * @param {string} quantity
     */
    public async withdraw(user: string, quantity: string): Promise<any> {
        return await this.api.transact(
            {
                actions: [
                    {
                        account: this.prediqtContract,
                        name: "withdraw",
                        authorization: this.auth,
                        data: {
                            user,
                            quantity
                        }
                    }
                ]
            },
            this.transactParams
        );
    }

    /**
     * Sync Bank
     */
    public async syncBank(): Promise<any> {
        return await this.api.transact(
            {
                actions: [
                    {
                        account: "prediqtbankk",
                        name: "sync",
                        authorization: this.auth,
                        data: {}
                    }
                ]
            },
            this.transactParams
        );
    }

    /**
     * Transfer shares to user
     * @param {Object} data
     * @param {string} data.from
     * @param {string} data.to
     * @param {number} data.shares
     * @param {boolean} data.shareType
     * @param {number} data.marketId
     */
    public async transferShares(data: TransferShares): Promise<any> {
        return await this.api.transact(
            {
                actions: [
                    transferSharesAction(this.prediqtContract, this.auth, data)
                ]
            },
            this.transactParams
        );
    }

    /**
     * Cancel transferred shares
     * @param {Object} data
     * @param {string} data.from
     * @param {string} data.sharedId
     * @param {number} data.marketId
     */
    public async cancelShares(data: CancelShares): Promise<any> {
        return await this.api.transact({
                actions: [
                    {
                        account: this.prediqtMarketContract,
                        name: "cancelshares",
                        authorization: this.auth,
                        data: processData(data)
                    }
                ]
            },
            this.transactParams);
    }

    /**
     * Buy shares
     * @param {Object} data
     * @param {string} data.from
     * @param {string} data.price
     * @param {number} data.shares
     * @param {boolean} data.shareType
     * @param {number} data.marketId
     * @param {string} data.transferToken
     */
    public async buyShares(data: BuyShares): Promise<any> {
        const {
            from,
            price,
            shares,
            shareType,
            marketId,
            transferToken
        } = data;

        return await this.api.transact({
                actions: [
                    transferAction(
                      this.getContractForToken(transferToken) || this.eosioTokenContract,
                        this.auth,
                        from,
                        this.prediqtContract,
                        transferToken,
                        `create order for secondary market ${marketId}`
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
                            market_id: marketId
                        }
                    }
                ]
            },
            this.transactParams);
    }

    /**
     * Sell shares
     * @param {Object} data
     * @param {string} data.from
     * @param {number} data.shares
     * @param {boolean} data.shareType
     * @param {number} data.marketId
     * @param {string} data.price
     */
    public async sellShares(data: SellShares): Promise<any> {
        const { from, shares, shareType, marketId } = data;

        return await this.api.transact({
                actions: [
                    transferSharesAction(this.prediqtContract, this.auth, {
                        from,
                        to: this.prediqtMarketContract,
                        shares,
                        shareType,
                        marketId
                    }),
                    {
                        account: this.prediqtMarketContract,
                        name: "sellshares",
                        authorization: this.auth,
                        data: processData(data)
                    }
                ]
            },
            this.transactParams);
    }

    /**
     * Propose MultiSignature
     * @param {Object} data
     * @param {string} data.proposalName
     * @param {string} data.proposer
     * @param {string[]} data.requested
     */

    public async proposeMultiSig(data: ProposeMultiSig): Promise<any> {
        return await this.api.transact({
                actions: [
                    {
                        account: this.eosioMultiSigContract,
                        name: "propose",
                        authorization: this.auth,
                        data: processData(data)
                    }
                ]
            },
            this.transactParams);
    }

    /**
     * Get allowed assets
     */
    public async getAllowedAssets(): Promise<[AllowedAsset]> {
        const table = await this.rpc.get_table_rows({
            code: this.prediqtContract,
            scope: 0,
            table: "allowedasset",
            json: true
        });
        return table.rows;
    }

    /**
     * Get fees related to the contract
     * @param {number} [limit=100]
     * @param {number} [offset=0]
     */
    public async getFees(
        limit: number = 100,
        offset: number = 0
    ): Promise<[Fee]> {
        const table = await this.rpc.get_table_rows({
            code: this.prediqtContract,
            scope: this.prediqtContract,
            table: "fees",
            json: true,
            limit,
            lower_bound: offset
        });
        return table.rows;
    }

    /**
     * Get shares related to a market
     * @param {number} marketId
     * @param {number} [limit=100]
     * @param {number} [offset=0]
     */
    public async getShares(
        marketId: number,
        limit: number = 100,
        offset: number = 0
    ): Promise<[Share]> {
        const table = await this.rpc.get_table_rows({
            code: this.prediqtContract,
            scope: marketId,
            table: "shares",
            json: true,
            limit,
            lower_bound: offset
        });
        return table.rows;
    }

    /**
     * Get referral shares related to a market
     * @param {number} marketId
     * @param {number} [limit=100]
     * @param {number} [offset=0]
     */
    public async getReferrals(
        marketId: number,
        limit: number = 100,
        offset: number = 0
    ): Promise<[Share]> {
        const table = await this.rpc.get_table_rows({
            code: this.prediqtContract,
            scope: marketId,
            table: "referrals",
            json: true,
            limit,
            lower_bound: offset
        });
        return table.rows;
    }

    /**
     * Get markets
     * @param {string} [tableKey=""]
     * @param {number} [limit=100]
     * @param {number} [offset=0]
     */
    public async getMarkets(
        tableKey: string = "",
        limit: number = 100,
        offset: number = 0
    ): Promise<[Market]> {
        const table = await this.rpc.get_table_rows({
            code: this.prediqtContract,
            scope: this.prediqtContract,
            table: "markets",
            json: true,
            limit,
            table_key: tableKey,
            lower_bound: offset
        });
        return table.rows;
    }

    /**
     * Get a single market
     * @param {number} marketId
     */
    public async getMarket(marketId: number): Promise<Market> {
        const table = await this.rpc.get_table_rows({
            code: this.prediqtContract,
            scope: this.prediqtContract,
            table: "markets",
            json: true,
            upper_bould: marketId,
            lower_bound: marketId
        });
        return table.rows[0];
    }

    /**
     * Get orders for a market
     * @param {Object} data
     * @param {string} data.nameId - takes "yes" or "no"
     * @param {number} data.marketId
     * @param {string} [data.tableKey=""]
     * @param {number} [data.limit=100]
     * @param {number} [data.offset=0]
     */
    public async getOrders(data: GetOrders): Promise<[Order]> {
        const {
            nameId,
            marketId,
            tableKey = "",
            limit = 100,
            offset = 0
        } = data;
        if (!Object.values(OrderTypes).includes(nameId)) {
            throw new Error(
                `nameId must be "${OrderTypes.Yes}" or "${OrderTypes.No}".`
            );
        }

        const table = await this.rpc.get_table_rows({
            code: this.prediqtContract,
            scope: marketId,
            table: `lmtorder${nameId}`,
            json: true,
            limit,
            table_key: tableKey,
            lower_bound: offset
        });
        return table.rows;
    }

    /**
     * Get balance of an user
     * @param {string} username
     * @param {string} symbol
     */
    public async getBalance(
        username: string,
        symbol: string
    ): Promise<Balance> {
        const table = await this.rpc.get_table_rows({
            code: this.prediqtContract,
            scope: symbol,
            table: "balances",
            json: true,
            lower_bound: username,
            upper_bound: username
        });
        return table.rows[0];
    }

    /**
     * Get IQ balance of an user
     * @param {string} username
     */
    public async getIqBalance(username: string): Promise<IqBalance> {
        const table = await this.rpc.get_table_rows({
            code: this.iqTokenContract,
            scope: username,
            table: "accounts",
            json: true,
            table_key: username
        });
        return table.rows[0];
    }

    /**
     * Get resources of an user
     * @param {string} username
     */
    public async getUserResources(username: string): Promise<UserResources> {
        const table = await this.rpc.get_table_rows({
            code: this.eosioContract,
            scope: username,
            table: "userres",
            json: true,
            table_key: username
        });
        return table.rows[0];
    }

    /**
     * Search user in table of oracles
     * @param {string} username
     */
    public async searchInOracles(username: string): Promise<UserOracle> {
        const table = await this.rpc.get_table_rows({
            code: this.prediqtOraclContract,
            scope: this.prediqtOraclContract,
            table: "oracles",
            json: true,
            limit: 100,
            lower_bound: username,
            upper_bound: username
        });
        return table.rows[0];
    }

    /**
     * Get account data of an user
     * @param {string} username
     */
    public async getAccount(username: string): Promise<any> {
        return await this.rpc.get_account(username);
    }

    /**
     * Returns the appropriate smart contract for token
     * @param {string} token
     */
    private getContractForToken(token: string|undefined): string {
        if (token && token.endsWith("IQ")) {
            return this.iqTokenContract;
        }
        let symbol: string | string[] | undefined = token?.split(" ");
        if (symbol && symbol.length === 2) {
            symbol = symbol[1];
            if (this.tokenContractMapping && symbol in this.tokenContractMapping) {
                return this.tokenContractMapping[symbol];
            }
        }
        return this.eosioTokenContract;
    }
}
