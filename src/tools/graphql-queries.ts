export type Nullable<T> = T | null;

export const GET_MARKETS_LAZY = (
    excludeInvalidIpfs: boolean,
    skip: number,
    count: number,
    isVerified: string,
    creator: string,
    onlyProposed: boolean,
    filterUrlParam: Nullable<{ paramName: string; paramValue: string }>
): string => `
    query {
        markets(sort_by: "ending_latest", exclude_invalid_ipfs: ${excludeInvalidIpfs}, skip: ${skip}, count: ${count}, is_verified: "${isVerified}", creator: "${creator}"${
    filterUrlParam
        ? `, ${filterUrlParam.paramName}: "${filterUrlParam.paramValue}"`
        : ""
}${onlyProposed ? ", is_proposal: true, is_resolved: false" : ""}) {
          id
          creator {
            name
          }
          resolver {
            name
          }
          resolution
          resolution_markettime
          ipfs {
            hash
            title
            description
            image_url
            category
            tags
            resolution_description
          }
          is_active
          is_resolved
          is_verified
          is_hidden
          end_time
          last_trade {
            price
            symbol
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
            timestamp
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
      resolution_markettime
      ipfs {
        hash
        title
        description
        image_url
        category
        tags
        resolution_description
      }
      is_active
      is_resolved
      is_verified
      is_hidden
      end_time
      last_trade {
        price
        symbol
      }
      trade_history {
        price
        symbol
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
        timestamp
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
      resolution_markettime
      ipfs {
        hash
        title
        description
        image_url
        category
        tags
        resolution_description
      }
      is_active
      is_resolved
      is_verified
      end_time
      last_trade {
        price
        symbol
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
        timestamp
      }
      trade_history {
        price
        currency
        quantity
        symbol
        block{
          time
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
          timestamp
        }
        volume {
          eos
        }
        last_trade {
          price
          symbol
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
            price
            symbol
          }
          is_resolved
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
        timestamp
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
        block {
          num
          id
          time
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
