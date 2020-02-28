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

export interface LastTrade {
    yes_price: number;
}

export interface OrderBookGQL {
    order_id: number;
    creator: string;
    price: number;
    currency: string;
    type: string;
    quantity: number;
    symbol: OrderTypesUppercase;
    transaction: EosTransactionGQL;
}

export interface RelatedMarketGQL {
    id: number;
    ipfs: MarketIpfsGQL;
    order_book: OrderBookGQL;
    volume: MarketVolumeGQL;
    last_trade: Nullable<LastTrade>;
}

export interface MarketGQL {
    id: number;
    creator: UserGQL;
    resolver: UserGQL;
    resolution: string;
    resolved_at: Nullable<EosTransactionGQL>;
    proposed_at: Nullable<EosTransactionGQL>;
    approved_at: Nullable<EosTransactionGQL>;
    rejected_at: Nullable<EosTransactionGQL>;
    ipfs: MarketIpfsGQL;
    is_hidden: boolean;
    is_stale: boolean;
    state: string;
    end_time: Date;
    last_trade: Nullable<LastTrade>;
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
    updated_at: BlockInfoGQL;
}

export interface TradeHistoryGQL {
    yes_price: number;
    no_price: number;
    currency: string;
    size: number;
    transaction: EosTransactionGQL;
}

export interface MarketPageGQL {
    id: number;
    creator: UserGQL;
    resolver: UserGQL;
    resolution: string;
    resolved_at: Nullable<EosTransactionGQL>;
    ipfs: MarketIpfsGQL;
    is_stale: boolean;
    state: string;
    end_time: Date;
    last_trade: Nullable<LastTrade>;
    shareholders: ShareHolderGQL[];
    order_book: OrderBookGQL[];
    trade_history: TradeHistoryGQL[];
    volume: MarketVolumeGQL;
    related: RelatedMarketGQL[];
}

export interface BlockInfoGQL {
    num: number;
    time: Date;
    id: string;
}

export interface EosTransactionGQL {
    trx_id: string;
    trx_url: string;
    block: BlockInfoGQL;
}

export interface PlatformFeesGQL {
    id: number;
    amount: number;
    name: string;
    description: string;
    currency: string;
    updated_at: BlockInfoGQL;
}

export interface CategoriesGQL {
    name: string;
    is_creation_enabled: boolean;
    subcategories: CategoriesGQL[];
}

export interface DappInfoGQL {
    terms_of_service_url: string;
    twitter_url: string;
    medium_url: string;
    telegram_url: string;
    support_email: string;
    config: { textarea_whitelist: string };
}

export interface ChainInfoGQL {
    blocks_behind: number;
}

export interface UserProfileOpenOrderGQL {
    market: {
        id: number;
        ipfs: { title: string };
    };
    order_id: number;
    creator: string;
    price: number;
    currency: string;
    type: string;
    quantity: number;
    symbol: OrderTypesUppercase;
    side: string;
    size: OrderSizeGQL;
    transaction: EosTransactionGQL;
}

export interface UserProfileFilledOrderGQL {
    market: {
        id: number;
        ipfs: { title: string };
    };
    symbol: OrderTypesUppercase;
    price: number;
    currency: string;
    size: OrderSizeGQL;
    filled_reason: string;
    transaction: EosTransactionGQL;
}

export interface OrderSizeGQL {
    ordered: number;
    filled: number;
    available: number;
}

export interface UserProfileReferralGQL {
    market: {
        id: number;
        end_time: Date;
        ipfs: { title: string };
    };
    yes_shares: number;
    no_shares: number;
    referrer: string;
}

export interface UserProfileSharesOwnedGQL {
    market: {
        id: number;
        ipfs: { title: string };
        last_trade: Nullable<LastTrade>;
        state: string;
        resolution: string;
    };
    shareholder: { name: string };
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
    market: { id: number };
    shareholder: { name: string };
    quantity: number;
    symbol: OrderTypesUppercase;
    updated_at: BlockInfoGQL;
}

export interface Asset {
    asset: string;
    quantity: number;
}

export interface StatsByPeriodGQL {
    report_start: Date;
    report_end: Date;
    total_markets_proposed: number;
    total_markets_accepted: number;
    total_markets_rejected: number;
    total_trade_volume: Asset[];
}

export interface LeaderboardTraderGQL {
    period: string;
    rank: number;
    name: string;
    shares_traded: number;
    profitable_trades: number;
    roi: number;
}

export interface LeaderboardGQL {
    period: string;
    page: number;
    traders: LeaderboardTraderGQL[];
}
