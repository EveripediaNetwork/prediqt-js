import {OrderTypes} from "../enums/prediqt";

export interface TransactParams {
    blocksBehind: number;
    expireSeconds: number;
}

export interface Authorization {
    actor: string;
    permission: string;
}

export interface Contracts {
    prediqt?: string;
    prediqtMarket?: string;
    iqToken?: string;
    prediqtBank?: string;
}

export interface Fee {
    id: number;
    fee: number;
}

export interface CreateMarket {
    creator: string;
    resolver: string;
    ipfs: string;
    timeIn: number;
    transferToken: string;
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

export interface TransferSharesAction {
    account: string;
    name: string;
    authorization: Authorization[];
    data: ObjectKeys;
}

export interface SellShares {
    from: string;
    shares: number;
    shareType: boolean;
    marketId: number;
    price: string;
}

export interface ProposeMultiSig {
    proposalName: string;
    proposer: string;
    requested: string[];
    trx: ObjectKeys;
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
    transferToken: string;
    referral: string;
    buy: boolean;
}

export interface TransferAction {
    account: string;
    name: string;
    authorization: Authorization[];
    data: {
        from: string;
        to: string;
        quantity: string;
        memo: string;
    };
}

export interface CancelShares {
    from: string;
    shareId: string;
    marketId: number;
}
export interface BuyShares {
    from: string;
    price: string;
    shares: number;
    shareType: boolean;
    marketId: number;
    transferToken: string;
}

export interface UserResources {
    owner: string;
    net_weight: string;
    cpu_weight: string;
    ram_bytes: number;
}

export interface IqBalance {
    balance: string;
}

export interface ObjectKeys {
    [key: string]: any;
}
