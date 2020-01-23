import { OrderTypesUppercase } from "../enums/prediqt";
import { Nullable } from "../tools";

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
    symbol: OrderTypesUppercase;
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
    resolution_markettime: Nullable<Date>;
    ipfs: MarketIpfsGQL;
    is_active: boolean;
    is_resolved: boolean;
    is_verified: boolean;
    is_hidden: boolean;
    end_time: Date;
    volume: MarketVolumeGQL;
    order_book: OrderBookGQL[];
}

export interface ExtendedMarketGQL extends MarketGQL {
    trade_history: TradeHistoryGQL[];
}

export interface ShareHolderGQL {
    market: { id: number };
    shareholder: UserGQL;
    quantity: number;
    symbol: OrderTypesUppercase;
    updated_at: { num: number; id: string, time: Date; };
}

export interface TradeHistoryGQL {
    price: number;
    currency: string;
    quantity: number;
    symbol: OrderTypesUppercase;
    block: { time: Date; };
}

export interface MarketPageGQL {
    id: number;
    creator: UserGQL;
    resolver: UserGQL;
    resolution: string;
    resolution_markettime: Nullable<Date>;
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

export interface PlatformFeesGQL {
    id: number;
    amount: number;
    name: string;
    description: string;
    currency: string;
    updated_at: {
        num: number;
        time: Date;
        id: string;
    };
}

export interface CategoriesGQL {
    name: string;
    tags: string[];
}

export interface DappInfoGQL {
    terms_of_service_url: string;
    twitter_url: string;
    medium_url: string;
    telegram_url: string;
    support_email: string;
    config: { textarea_whitelist: string; };
}

export interface ChainInfoGQL {
    blocks_behind: number;
}

export interface  UserProfileOpenOrderGQL {
    market: {
        id: number;
        ipfs: { title: string; };
    };
    order_id: number;
    creator: string;
    price: number;
    currency: string;
    type: string;
    quantity: number;
    symbol: OrderTypesUppercase;
    timestamp: Date;
}

export interface  UserProfileFilledOrderGQL {
    market: {
        id: number;
        ipfs: { title: string; };
    };
    symbol: OrderTypesUppercase;
    price: number;
    currency: string;
    quantity: number;
    block: {
        num: number;
        time: Date;
        id: string;
    };
}

export interface UserProfileReferralGQL  {
    market: {
        id: number;
        end_time: Date;
        ipfs: { title: string; };
    };
    yes_shares: number;
    no_shares: number;
    referrer: string;
}

export interface UserProfileSharesOwnedGQL {
    market: {
        id: number;
        ipfs: { title: string; };
        last_trade: { price: number; symbol: OrderTypesUppercase; };
        is_resolved: boolean;
        resolution: string;
    };
    shareholder: { name: string; };
    user_average_price_per_share: number;
    quantity: number;
    symbol: OrderTypesUppercase;
}

export interface UserProfileGQL {
    name: string;
    referrals: UserProfileReferralGQL[];
    shares_owned: UserProfileSharesOwnedGQL[];
    orders_open: UserProfileOpenOrderGQL[];
    orders_filled: UserProfileFilledOrderGQL[];
}

export interface ShareHolderGQL {
    market: { id: number; };
    shareholder: { name: string; };
    quantity: number;
    symbol: OrderTypesUppercase;
    updated_at: { num: number; time: Date; id: string; };
}
