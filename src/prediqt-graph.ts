const fetch = require("isomorphic-fetch");

import {
    CategoriesGQL,
    ChainInfoGQL,
    DappInfoGQL,
    MarketGQL,
    MarketPageGQL,
    PlatformFeesGQL,
    ShareHolderGQL,
    UserProfileGQL,
    ExtendedMarketGQL
} from "./interfaces/prediqt-graphql";
import {
    GET_BLOCKS_BEHIND_INFO,
    GET_CATEGORIES_TAGS,
    GET_DAPP_INFO,
    GET_MARKET,
    GET_MARKET_PAGE_DATA,
    GET_MARKETS_LAZY,
    GET_PLATFORM_FEES,
    GET_SHAREHOLDER,
    GET_USER_PROFILE,
    Nullable
} from "./tools";

export class PrediqtGraph {
    private readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    /**
     * Get proposed markets
     * @param {number} skip
     * @param {number} count
     * @param {string} [creator=""]
     * @param {Object} [filterUrlParam]
     * @param {string} filterUrlParam.paramName
     * @param {string} filterUrlParam.paramValue
     */
    public async getProposedMarkets(
        skip: number,
        count: number,
        creator: string = "",
        filterUrlParam: Nullable<{ paramName: string; paramValue: string }>
    ): Promise<MarketGQL[]> {
        const result = await this.query(
            GET_MARKETS_LAZY(
                true,
                skip,
                count,
                "all",
                creator,
                true,
                filterUrlParam
            )
        );

        const json = await result.json();

        return json.data.markets;
    }

    /**
     * Get markets
     * @param {boolean} excludeInvalidIpfs
     * @param {number} skip
     * @param {number} count
     * @param {string} isVerified
     * @param {string} creator
     * @param {Object} [filterUrlParam]
     * @param {string} filterUrlParam.paramName
     * @param {string} filterUrlParam.paramValue
     */
    public async getMarkets(
        excludeInvalidIpfs: boolean,
        skip: number,
        count: number,
        isVerified: string,
        creator: string,
        filterUrlParam: Nullable<{ paramName: string; paramValue: string }>
    ): Promise<MarketGQL[]> {
        const result = await this.query(
            GET_MARKETS_LAZY(
                excludeInvalidIpfs,
                skip,
                count,
                isVerified,
                creator,
                false,
                filterUrlParam
            )
        );

        const json = await result.json();

        return json.data.markets;
    }

    /**
     * Get market
     * @param {number} marketId
     */
    public async getMarket(marketId: number): Promise<ExtendedMarketGQL> {
        const result = await this.query(GET_MARKET(marketId));

        const json = await result.json();

        return json.data.market_by_id;
    }

    /**
     * Get market page
     * @param {number} marketId
     * @param {string} [loggedInUser]
     */
    public async getMarketPage(
        marketId: number,
        loggedInUser: Nullable<string>
    ): Promise<MarketPageGQL> {
        const result = await this.query(
            GET_MARKET_PAGE_DATA(marketId, loggedInUser)
        );

        const json = await result.json();

        return json.data.market_by_id;
    }

    /**
     * Get platform fees
     */
    public async getPlatformFees(): Promise<PlatformFeesGQL[]> {
        const result = await this.query(GET_PLATFORM_FEES);

        const json = await result.json();

        return json.data.platform_fees;
    }

    /**
     * Get categories and tags
     */
    public async getCategoriesAndTags(): Promise<CategoriesGQL[]> {
        const result = await this.query(GET_CATEGORIES_TAGS);

        const json = await result.json();

        return json.data.categories;
    }

    /**
     * Get information about dapp
     */
    public async getDappInfo(): Promise<DappInfoGQL[]> {
        const result = await this.query(GET_DAPP_INFO);

        const json = await result.json();

        return json.data.dapp_info;
    }

    /**
     * Get user's profile
     * @param {string} username
     */
    public async getUserProfile(username: string): Promise<UserProfileGQL> {
        const result = await this.query(GET_USER_PROFILE(username));

        const json = await result.json();

        return json.data.user_profile;
    }

    /**
     * Get shareholders
     * @param {number} marketId
     * @param {string} loggedInUser
     */
    public async getShareHolders(
        marketId: number,
        loggedInUser: string
    ): Promise<ShareHolderGQL[]> {
        const result = await this.query(
            GET_SHAREHOLDER(marketId, loggedInUser)
        );

        const json = await result.json();

        return json.data.market_by_id.shareholders;
    }

    /**
     * Get info about node's backlog
     */
    public async getChainInfo(): Promise<ChainInfoGQL> {
        const result = await this.query(GET_BLOCKS_BEHIND_INFO);

        const json = await result.json();

        return json.data.chain_info;
    }

    private async query(query: string): Promise<any> {
        return fetch(this.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query
            })
        });
    }
}
