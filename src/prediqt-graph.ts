import {MarketGQL, MarketPageGQL} from "./interfaces/prediqt-graphql";
import {GET_MARKET_PAGE_DATA, GET_MARKETS_LAZY, Nullable} from "./tools/graphql-queries";

const fetch = require("isomorphic-fetch");

export class PrediqtGraph {
    private readonly url: string;

    constructor(url: string = "https://prediqt-api-mainnet.azurewebsites.net/graphql") {
        this.url = url;
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
                filterURLParam),
        );

        const json = await result.json();

        return json.data.markets as MarketGQL[];
    }

    public async getMarketPage(marketId: number, loggedInUser: string): Promise<MarketPageGQL> {
        const result = await this.query(
            GET_MARKET_PAGE_DATA(marketId, loggedInUser),
        );

        const json = await result.json();

        return json.data.market_by_id as MarketPageGQL;
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
