import { TransferAction } from "./interfaces/prediqt";

export function transfer(
    contractName: string,
    authorization: object,
    from: string,
    to: string,
    eosQuantity: string,
    memo: string,
): TransferAction {
    return {
        account: contractName,
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
