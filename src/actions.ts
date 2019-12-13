import {Authorization, TransferAction, TransferShares, TransferSharesAction} from "./interfaces/prediqt";
import {processData} from "./tools/utils";

export function transferAction(
    contract: string,
    authorization: Authorization[],
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

export function transferSharesAction(
    account: string,
    authorization: Authorization[],
    data: TransferShares,
): TransferSharesAction {
    return {
        account,
        name: "trnsfrshares",
        authorization,
        data: processData(data),
    };
}
