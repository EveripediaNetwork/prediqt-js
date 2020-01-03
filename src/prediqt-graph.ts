import {
    CategoriesGQL,
    DappInfoGQL,
    MarketGQL,
    MarketPageGQL, MarketUpdateGQL,
    PlatformFeesGQL, ShareHolderGQL,
    UserProfileGQL,
} from "./interfaces/prediqt-graphql";
import {
    GET_CATEGORIES_TAGS, GET_DAPP_INFO, GET_MARKET,
    GET_MARKET_PAGE_DATA,
    GET_MARKETS_LAZY,
    GET_PLATFORM_FEES, GET_SHAREHOLDER, GET_USER_PROFILE,
    Nullable,
} from "./tools/graphql-queries";

const fetch = require("isomorphic-fetch");

export class PrediqtGraph {
    private readonly url: string;

    constructor(url: string = "https://prediqt-api-mainnet.azurewebsites.net/graphql") {
        this.url = url;
    }

    public async getProposedMarkets(skip: number,
                                    count: number,
                                    filterURLParam: Nullable<{ paramName: string, paramValue: string }>): Promise<MarketGQL[]>{
        const result = await this.query(
            GET_MARKETS_LAZY(true,
                skip,
                count,
                "all",
                "",
                true,
                filterURLParam),
        );

        const json = await result.json();

        return json.data.markets as MarketGQL[];
    }

    public async getMarkets(exclude_invalid_ipfs: boolean,
                            skip: number,
                            count: number,
                            is_verified: string,
                            creator: string,
                            filterURLParam: Nullable<{ paramName: string, paramValue: string }>): Promise<MarketGQL[]> {
        const result = await this.query(
            GET_MARKETS_LAZY(exclude_invalid_ipfs,
                skip,
                count,
                is_verified,
                creator,
                false,
                filterURLParam),
        );

        const json = await result.json();

        return json.data.markets as MarketGQL[];
    }

    public async getMarket(marketId: number): Promise<MarketUpdateGQL> {
        const result = await this.query(
            GET_MARKET(marketId),
        );

        const json = await result.json();

        return json.data.market_by_id as MarketUpdateGQL;
    }

    public async getMarketPage(marketId: number, loggedInUser: Nullable<string>): Promise<MarketPageGQL> {
        const result = await this.query(
            GET_MARKET_PAGE_DATA(marketId, loggedInUser),
        );

        const json = await result.json();

        return json.data.market_by_id as MarketPageGQL;
    }

    public async getPlatformFees(): Promise<PlatformFeesGQL[]> {
        const result = await this.query(
            GET_PLATFORM_FEES,
        );

        const json = await result.json();

        return json.data.platform_fees as PlatformFeesGQL[];
    }

    public async getCategoriesAndTags(): Promise<CategoriesGQL[]> {
        const result = await this.query(
            GET_CATEGORIES_TAGS,
        );

        const json = await result.json();

        return json.data.categories as CategoriesGQL[];
    }

    public async getDappInfo(): Promise<DappInfoGQL[]> {
        const result = await this.query(
            GET_DAPP_INFO,
        );

        const json = await result.json();

        return json.data.dapp_info as DappInfoGQL[];
    }

    public async getUserProfile(userName: Nullable<string>): Promise<UserProfileGQL>{
        const result = await this.query(
            GET_USER_PROFILE(userName),
        );

        const json = await result.json();

        return json.data.dapp_info as UserProfileGQL;
    }

    public async getShareHolders(marketId: number, loggedInUser: Nullable<string>): Promise<ShareHolderGQL[]>{
        const result = await this.query(
            GET_SHAREHOLDER(marketId, loggedInUser),
        );

        const json = await result.json();

        return json.data.market_by_id.shareholders as ShareHolderGQL[];

    }

    private async query(query: string): Promise<any> {
        return fetch(this.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
            }),
        });
    }

}
