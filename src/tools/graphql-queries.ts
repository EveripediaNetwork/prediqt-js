export type Nullable<T> = T | null;

export const GET_MARKETS_LAZY = (exclude_invalid_ipfs: boolean,
                                 skip: number,
                                 count: number,
                                 is_verified: string,
                                 creator: string,
                                 filterURLParam: Nullable<{ paramName: string, paramValue: string }>): string => `
    query {
        markets(sort_by: "ending_latest", exclude_invalid_ipfs: ${exclude_invalid_ipfs}, skip: ${skip}, count: ${count}, is_verified: "${is_verified}", creator: "${creator}"${filterURLParam ? `, ${filterURLParam.paramName}: "${filterURLParam.paramValue}"` : ""}) {
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
            content_type
          }
          is_active
          is_resolved
          is_verified
          is_hidden
          end_time
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

export const GET_MARKET_PAGE_DATA = (marketId: number, loggedInUser: Nullable<string>) => `
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
        content_type
      }
      is_active
      is_resolved
      is_verified
      end_time
      ${loggedInUser ? `shareholders(shareholder: "${loggedInUser}") {
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
      }` : ""}
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
      }
    }
  }
`;
