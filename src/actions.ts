import { TransferAction } from "./interfaces/prediqt";

export function transfer(
    contract: string,
    authorization: object,
    from: string,
    to: string,
    quantity: string,
    memo: string,
): TransferAction {
    return {
        account: contract,
        name: "transfer",
        authorization,
        data: {
            from,
            to,
            quantity,
            memo,
        },
    };
}
