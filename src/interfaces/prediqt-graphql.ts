import { OrderTypesUppercase } from "../enums/prediqt";
import { Nullable } from "../tools";

export interface EosAssetGQL {
    symbol: string;
    precision: number;
    contract: string;
}

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
    quantity: number;
    asset: EosAssetGQL;
}

export interface LastTrade {
    yes_price: number;
}

export interface OrderBookGQL {
    order_id: number;
    creator: string;
    price: number;
    asset: EosAssetGQL;
    side: string;
    size: OrderSizeGQL;
    symbol: OrderTypesUppercase;
    transaction: EosTransactionGQL;
}

export interface RelatedMarketGQL {
    id: number;
    ipfs: MarketIpfsGQL;
    asset: EosAssetGQL;
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
    asset: EosAssetGQL;
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
    asset: EosAssetGQL;
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
        asset: EosAssetGQL;
    };
    order_id: number;
    creator: string;
    price: number;
    asset: EosAssetGQL;
    side: string;
    size: OrderSizeGQL;
    symbol: OrderTypesUppercase;
    transaction: EosTransactionGQL;
}

export interface UserProfileFilledOrderGQL {
    market: {
        id: number;
        ipfs: { title: string };
        asset: EosAssetGQL;
    };
    symbol: OrderTypesUppercase;
    price: number;
    asset: EosAssetGQL;
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
        asset: EosAssetGQL;
    };
    yes_shares: number;
    no_shares: number;
    referrer: string;
}

export interface UserProfileSharesOwnedGQL {
    market: {
        id: number;
        ipfs: { title: string };
        asset: EosAssetGQL;
        last_trade: Nullable<LastTrade>;
        state: string;
        resolution: string;
    };
    shareholder: { name: string };
    user_average_price_per_share: number;
    quantity: number;
    symbol: OrderTypesUppercase;
    status: string;
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
    profit: number;
}

export interface LeaderboardGQL {
    type: string;
    period: string;
    page: number;
    traders: LeaderboardTraderGQL[];
}

export interface UserSettingsEmailGQL {
    address: string;
    is_verified: boolean;
}

export interface UserSettingsSubscriptionsGQL {
    user: string;
    type: string;
    events: string[];
}

export interface UserSettingsGQL {
    user_profile: {
        name: string;
        email: UserSettingsEmailGQL;
        subscriptions: UserSettingsSubscriptionsGQL[];
    };
    subscribable_events: {
        id: string;
        name: string;
        description: string;
    };
}
