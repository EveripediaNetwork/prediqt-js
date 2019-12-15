export interface MarketIpfsGQL {
    hash: string;
    title: string;
    description: string;
    image_url: string;
    category: string;
    tags: string[];
    resolution_description: string;
}

export interface UserGQL {
    name: string;
}

export interface MarketVolumeGQL {
    eos: number;
}

export interface OrderBookGQL {
    order_id: number;
    creator: string;
    price: number;
    currency: string;
    type: string;
    quantity: number;
    symbol: string;
    timestamp: Date;
}

export interface RelatedMarketGQL {
    id: number;
    ipfs: MarketIpfsGQL;
    order_book: OrderBookGQL;
    volume: MarketVolumeGQL;
}

export interface MarketGQL {
    id: number;
    creator: UserGQL;
    resolver: UserGQL;
    resolution: string;
    resolution_markettime: Date;
    ipfs: MarketIpfsGQL;
    is_active: boolean;
    is_resolved: boolean;
    is_verified: boolean;
    is_hidden: boolean;
    end_time: Date;
    volume: MarketVolumeGQL;
    order_book: OrderBookGQL;
}

export interface ShareHolderGQL {
    market: { id: number };
    shareholder: UserGQL;
    quantity: number;
    symbol: string;
    updated_at: { num: number; id: string, time: string; };
}

export interface TradeHistoryGQL {
    price: number;
    currency: string;
    quantity: number;
    symbol: string;
    block: { time: Date; };
}

export interface MarketPageGQL {
    id: number;
    creator: UserGQL;
    resolver: UserGQL;
    resolution: string;
    resolution_markettime: Date;
    ipfs: MarketIpfsGQL;
    is_active: boolean;
    is_resolved: boolean;
    is_verified: boolean;
    end_time: Date;
    shareholders: ShareHolderGQL[];
    order_book: OrderBookGQL[];
    trade_history: TradeHistoryGQL[];
    volume: MarketVolumeGQL;
    related: RelatedMarketGQL[];
}
