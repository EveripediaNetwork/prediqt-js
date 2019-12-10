import { TransferTokenOut } from "./interfaces/prediqt";

export function transferEos(
    authorization: object,
    from: string,
    to: string,
    eosQuantity: string,
    memo: string,
): TransferTokenOut {
    return {
        account: "eosio.token",
        name: "transfer",
        authorization,
        data: {
            from,
            to,
            quantity: eosQuantity,
            memo,
        },
    };
}
