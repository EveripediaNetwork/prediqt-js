export type Nullable<T> = T | null;

export const GET_MARKETS_LAZY = (
    excludeInvalidIpfs: boolean,
    skip: number,
    count: number,
    creator: string,
    onlyProposed: boolean,
    filterUrlParam: Nullable<{ paramName: string; paramValue: string }>,
    sort_by: string = "ENDING_LATEST"
): string => `
    query {
        markets(sort_by: ${sort_by}, exclude_invalid_ipfs: ${excludeInvalidIpfs}, skip: ${skip}, count: ${count}, creator: "${creator}"${
    filterUrlParam
        ? `, ${filterUrlParam.paramName}: "${filterUrlParam.paramValue}"`
        : ""
}${onlyProposed ? ", state: [PROPOSED]" : ", state:[APPROVED, MATURED, RESOLVING, WAITING_DISPUTE, RESOLVED]"}) {
          id
          creator {
            name
          }
          resolver {
            name
          }
          resolution
          resolved_at {
            trx_url
            block {
              time
            }
          }
          proposed_at {
            trx_url
            block {
              time
            }
          }
          approved_at {
            trx_url
            block {
              time
            }
          }
          rejected_at {
            trx_url
            block {
              time
            }
          }
          ipfs {
            hash
            title
            description
            image_url
            category
            tags
            resolution_description
          }          
          asset {
              symbol
              precision
              contract
              USDT: quote(to:USDT)
              EOS: quote(to:EOS)
              IQ: quote(to:IQ)
          }          
          resolution_meta {
            round
          }
          open_interest
          market_cap
          best_yes_price
          best_no_price
          shares_outstanding
          is_hidden
          is_stale
          state
          end_time
          last_trade {
            yes_price
          }
          volume {
            quantity
            asset{
              symbol
              precision
              contract
            }
          }
        }
      }
    `;

export const GET_MARKET_METADATA = (marketId: number) => `
{
    market_by_id(id: ${marketId}) {
      id
      ipfs {
        hash
        title
        description
        image_url
        category
        tags
        resolution_description
      }      
      asset {
          symbol
          precision
          contract
          USDT: quote(to:USDT)
          EOS: quote(to:EOS)
          IQ: quote(to:IQ)
      }
      resolution_meta {
        round
      }
      state
      is_stale
      resolution
    }
  }
`;

export const GET_MARKET = (marketId: number) => `
  {
    market_by_id(id: ${marketId}) {
      id
      creator {
        name
      }
      resolver {
        name
      }
      resolver_info
      resolution
      resolved_at{
        trx_url
        block{
          time
        }
      }
      ipfs {
        hash
        title
        description
        image_url
        category
        tags
        resolution_description
      }      
      asset {
        symbol
        precision
        contract
        USDT: quote(to:USDT)
        EOS: quote(to:EOS)
        IQ: quote(to:IQ)
      }      
      resolution_meta {
        round
      }
      open_interest
      market_cap
      best_yes_price
      best_no_price
      shares_outstanding
      is_hidden
      is_stale
      state
      end_time
      last_trade {
        yes_price
      }
      trade_history {
        yes_price
      }
      volume {
        quantity
        asset{
          symbol
          precision
          contract
        }
      }
      order_book {
        order_id
        creator
        price
        asset{
          symbol
          precision
          contract
        }
        side
        size{
          ordered
          filled
          available
        }
        symbol
        transaction{
          trx_url
          block{
            time
          }
        }
      }
    }
  }
`;

export const GET_MARKET_PAGE_DATA = (
    marketId: number,
    loggedInUser: Nullable<string>
) => `
  {
    market_by_id(id: ${marketId}) {
      id
      creator {
        name
      }
      resolver {
        name
      }
      resolver_info
      resolution      
      resolved_at{
        trx_url
        block{
          time
        }
      }
      proposed_at{
        trx_url
        block{
          time
        }
      }
      ipfs {
        hash
        title
        description
        image_url
        category
        tags
        resolution_description
      }
      asset {
          symbol
          precision
          contract
          USDT: quote(to:USDT)
          EOS: quote(to:EOS)
          IQ: quote(to:IQ)
      }
      resolution_meta {
        round
      }
      open_interest
      market_cap
      best_yes_price
      best_no_price
      shares_outstanding
      is_hidden
      is_stale
      state
      end_time
      last_trade {
        yes_price
      }
        ${loggedInUser ? 
            `shareholders(shareholder: "${loggedInUser}") {
                market {
                  id
                }
                shareholder {
                  name
                }
                user_average_price_per_share
                quantity
                quantity_available
                symbol
                status
                updated_at {
                  num
                  id
                  time
                }
              }` 
            : ""
        }
      order_book {
        order_id
        creator
        price
        asset{
          symbol
          precision
          contract
        }
        side
        size{
          ordered
          filled
          available
        }
        symbol
        transaction{
          trx_url
          block{
            time
          }
        }
      }
      trade_history {
        yes_price
        no_price
        asset {
          symbol
          precision
        }
        size
        transaction{
          trx_url
          block{
            time
          }
        }
      }
      volume {
        quantity
        asset{
          symbol
          precision
          contract
        }
      }
      related {
        id
        ipfs {
          hash
          title
          image_url
          category
        }
        asset {
            symbol
            precision
            contract
        }
        order_book {
          order_id
          creator
          price
          asset{
            symbol
            precision
            contract
          }
          side
          size{
            ordered
            filled
            available
          }
          symbol
          transaction{
            trx_url
            block{
              time
            }
          }
        }
        volume {
          quantity
          asset{
            symbol
            precision
            contract
          }
        }
        last_trade {
          yes_price
        }
      }
    }
  }
`;

export const GET_SHAREHOLDER = (marketId: number, loggedInUser: string) => `
  {
    market_by_id(id: ${marketId}) {
      shareholders(shareholder: "${loggedInUser}") {
        market {
          id
        }
        shareholder {
          name
        }
        user_average_price_per_share
        quantity
        quantity_available
        symbol
        status
        updated_at {
          num
          id
          time
        }
      }
    }
  }
`;

export const GET_USER_PROFILE = (username: string) => `
  {
    user_profile(name: "${username}") {
      name
      referrals {
        market {
          id
          end_time
          ipfs {
            title
          }
          asset {
            symbol
            precision
            contract
          }
        }
        yes_shares
        no_shares
        referrer
      }
      shares_owned {
        market {
          id
          ipfs {
            title
          }            
          asset {
            symbol
            precision
            contract
          }
          last_trade {
            yes_price
          }
          resolution
          state
          end_time
          resolution_meta {
            round
          }
        }
        shareholder {
          name
        }
        user_average_price_per_share
        quantity
        quantity_available
        symbol
        status
      }
      orders_open {
        market {
          id
          ipfs {
            title
          }
          asset {
            symbol
            precision
            contract
          }
          resolution
          state
          end_time
          resolution_meta {
            round
          }
        }
        order_id
        creator
        price
        asset {
          symbol
          precision
          contract
        }
        side
        size {
          ordered
          filled
          available
        }
        symbol
        transaction{
          trx_url
          block{
            time
          }
        }
      }
      orders_filled {
        market {
          id
          ipfs {
            title
          }
          resolution
          state
          end_time
          resolution_meta {
            round
          }
        }
        symbol
        price
        asset {
          symbol
          precision
          contract
        }
        size{
          ordered
          filled
          available
        }
        filled_reason
        transaction{
          trx_url
          block{
            time
          }
        }
      }
    }
  }
`;

export const GET_DAPP_INFO = `
  {
    dapp_info {
      terms_of_service_url
      twitter_url
      medium_url
      telegram_url
      support_email
      config {
        textarea_whitelist
        voting_period_duration
        losing_vote_penalty
        min_iq_vote
        iq_dispute_threshold
        open_reporting_period
      }
    }
  }
`;

export const GET_CATEGORIES_TAGS = `
  {
    categories {
      name
      is_creation_enabled
      subcategories{
        is_creation_enabled
        name
      }
    }
  }
`;

export const GET_PLATFORM_FEES = `
  {
    platform_fees {
      id
      amount
      name
      description
      currency
      updated_at {
        num
        time
        id
      }
    }
  }
`;

export const GET_BLOCKS_BEHIND_INFO = `
  {
    chain_info {
      blocks_behind
    }
  }
`;

export const GET_LEADERBOARD = (period: string, type: string) => `
{
  get_leaderboard(period: ${period}, type: ${type}) {
    type
    period
    page
    users {
      period
      rank
      name
      profit
    }
  }
}
`;

export const GET_STATS_BY_PERIOD = (
    group_by: string,
    end_date: Date,
    limit: number
) => `
{
  stats_all_time {
    report_start
    report_end
    blockchain_users
    total_fees_burned {
      quantity
      asset {
        symbol
      }
    }
    markets_created
    total_trade_volume {
      asset {
        symbol
      }
      quantity
    }
  }
  current_stats {
    open_interest {
      asset {
        symbol
      }
      quantity
    }
  }
}
`;

export const GET_USER_SETTINGS = (
    username: string
) => `
{
  user_profile(name: "${username}") {
    name
    email {
      address
      is_verified
    }
    subscriptions {
      user
      type
      events
    }
  }
  subscribable_events {
    id
    name
    description
  }
}
`;

export const GET_PENDING_RESOLUTION = () => `
{
  pending_resolution {
    id
    creator {
      name
    }
    resolver {
      name
    }
    resolver_info
    resolution
    resolved_at {
      trx_url
      block {
        time
      }
    }
    proposed_at {
      trx_url
      block {
        time
      }
    }
    ipfs {
      hash
      title
      description
      image_url
      category
      tags
      resolution_description
    }
    asset {
      symbol
      precision
      contract
      USDT: quote(to: USDT)
      EOS: quote(to: EOS)
      IQ: quote(to: IQ)
    }
    open_interest
    market_cap
    best_yes_price
    best_no_price
    shares_outstanding
    is_hidden
    is_stale
    state
    end_time
    last_trade {
      yes_price
    }
    resolution_meta {
      source
      votes_yes
      votes_no
      votes_invalid
      round
      round_threshold
      round_ends_at
      resolver_bounty{
        asset{
          symbol
          precision
        }
        quantity
        to
      }
      history{
        vote_res
        vote_quantity
        transaction{
          trx_id
        }
      }
    }
  }
}
`;

export const GET_IQ_DISPUTE_MARKET = (id: number) => `
{
  market_by_id(id: ${id}) {
    id
    creator {
      name
    }
    resolver {
      name
    }
    resolver_info
    resolution
    resolved_at {
      trx_url
      block {
        time
      }
    }
    proposed_at {
      trx_url
      block {
        time
      }
    }
    ipfs {
      hash
      title
      description
      image_url
      category
      tags
      resolution_description
    }
    asset {
      symbol
      precision
      contract
      USDT: quote(to: USDT)
      EOS: quote(to: EOS)
      IQ: quote(to: IQ)
    }
    open_interest
    market_cap
    best_yes_price
    best_no_price
    shares_outstanding
    is_hidden
    is_stale
    state
    end_time
    last_trade {
      yes_price
    }
    resolution_meta {
      source
      votes_yes
      votes_no
      votes_invalid
      round
      round_threshold
      round_ends_at
      resolver_bounty{
        asset{
          symbol
          precision
        }
        quantity
        to
      }
      history{
        vote_res
        vote_quantity
        transaction{
          trx_id
        }
      }
    }
  }
}
`;
