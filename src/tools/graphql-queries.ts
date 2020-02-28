export type Nullable<T> = T | null;

export const GET_MARKETS_LAZY = (
    excludeInvalidIpfs: boolean,
    skip: number,
    count: number,
    creator: string,
    onlyProposed: boolean,
    filterUrlParam: Nullable<{ paramName: string; paramValue: string }>
): string => `
    query {
        markets(sort_by: ENDING_LATEST, exclude_invalid_ipfs: ${excludeInvalidIpfs}, skip: ${skip}, count: ${count}, creator: "${creator}"${
    filterUrlParam
        ? `, ${filterUrlParam.paramName}: "${filterUrlParam.paramValue}"`
        : ""
}${onlyProposed ? ", state: [PROPOSED]" : ", state:[APPROVED, RESOLVED]"}) {
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
          is_hidden
          is_stale
          state
          end_time
          last_trade {
            yes_price
          }
          volume {
            eos
          }
          order_book {
            order_id
            creator
            price
            currency
            type
            quantity
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
        eos
      }
      order_book {
        order_id
        creator
        price
        currency
        type
        quantity
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
      is_stale
      state
      end_time
      last_trade {
        yes_price
      }
      ${
          loggedInUser
              ? `shareholders(shareholder: "${loggedInUser}") {
        market {
          id
        }
        shareholder {
          name
        }
        quantity
        symbol
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
        currency
        type
        quantity
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
        currency
        size
        transaction{
          trx_url
          block{
            time
          }
        }
      }
      volume {
        eos
      }
      related {
        id
        ipfs {
          hash
          title
          image_url
          category
        }
        order_book {
          order_id
          creator
          price
          currency
          type
          quantity
          symbol
          transaction{
            trx_url
            block{
              time
            }
          }
        }
        volume {
          eos
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
        quantity
        symbol
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
          last_trade {
            yes_price
          }
          resolution
        }
        shareholder {
          name
        }
        user_average_price_per_share
        quantity
        symbol
      }
      orders_open {
        market {
          id
          ipfs {
            title
          }
        }
        order_id
        creator
        price
        currency
        type
        quantity
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
        }
        symbol
        price
        currency
        quantity
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
      }
    }
  }
`;

export const GET_CATEGORIES_TAGS = `
  {
    categories {
      name
      tags
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

export const GET_LEADERBOARD = (period: string) => `
{
  get_leaderboard(period: ${period}) {
    period
    page
    traders {
      period
      rank
      name
      shares_traded
      profitable_trades
      roi
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
  stats_by_period(group_by:${group_by} end_date:${end_date} limit:${limit}){
    report_start
    report_end
    total_markets_proposed
    total_markets_accepted
    total_markets_rejected
    total_trade_volume{
      asset
      quantity
    }
  }
}
`;
