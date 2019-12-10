import {OrderTypes} from "../enums/prediqt";

export interface TransactParams {
    blocksBehind: number;
    expireSeconds: number;
}

export interface Authorization {
    actor: string;
    permission: string;
}

export interface Fee {
    id: number;
    fee: number;
}

export interface MarketIpfs {
    hash: string;
    title: string;
    description: string;
    image_url: string;
    category: string;
    tags: string[];
    resolution_description: string;
}

export interface Market {
    id: number;
    creator: string;
    resolver: string;
    ipfs: MarketIpfs;
    endofmarkettime: number;
    active: boolean;
    resolved: boolean;
}

export interface Share {
    shareholder: string;
    yes_shares: number;
    no_shares: number;
}

export interface Order {
    id: number;
    creator: string;
    created_timestamp: number;
    limit: string;
    shares: number;
    isbid: boolean;
    referral: string;
}

export interface Balance {
    holder: string;
    balance: string;
}

export interface TransferShares {
    from: string;
    to: string;
    shares: number;
    shareType: boolean;
    marketId: number;
}

export interface MarketResolve {
    resolver: string;
    marketId: number;
    shareType: boolean;
    memo: string;
}

export interface LimitOrder {
    nameId: OrderTypes;
    user: string;
    marketId: number;
    shares: number;
    limit: string;
    eosQuantity: string;
    referral: string;
    buy: boolean;
}

export interface TransferTokenOut {
    account: string;
    name: string;
    authorization: object;
    data: {
        from: string;
        to: string;
        quantity: string;
        memo: string;
    };
}

export interface UserRes {
    owner: string;
    net_weight: string;
    cpu_weight: string;
    ram_bytes: number;
}

export interface ObjectKeys {
    [key: string]: any;
}
