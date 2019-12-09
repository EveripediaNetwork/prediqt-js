import {Market} from "./interfaces/prediqt";

const fetch = require("isomorphic-fetch");

export class PrediqtGraph {
    private readonly url: string;

    constructor(url: string = "https://prediqt-api-mainnet.azurewebsites.net/graphql") {
        this.url = url;
    }

    public async getMarkets(): Promise<Market[]> {
        const result = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `query { markets { id } }`,
            }),
        });

        const json = await result.json();

        return json.data.markets as Market[];
    }
}
