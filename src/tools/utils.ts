import BigNumber from "bignumber.js";

import {ObjectKeys} from "../interfaces/prediqt";

export function toEosDate(date: Date): string {
    return date.toISOString().slice(0, -5);
}

export function toBigNumber(number: BigNumber | string | number): BigNumber {
    if (typeof number === "string" || typeof number === "number") {
        return new BigNumber(number);
    }
    return number;
}

export function isObject(item: any): boolean {
    return  Object.prototype.toString.call(item) === "[object Object]";
}

export function processData(data: ObjectKeys): ObjectKeys  {
    const dataExceptions = ["shareType"];
    const processedData: ObjectKeys = {};

    Object.keys(data).forEach((key) => {
        const processedKey = dataExceptions.includes(key) ? key.toLowerCase() : camelToSnakeCase(key);
        processedData[processedKey] = data[key];
    });
    return processedData;
}

function camelToSnakeCase(key: string): string {
    const capitalRegExp = /[A-Z]/;
    if (key.match(capitalRegExp)) {
        const keyByLetters = key.split("");
        const processedKey = keyByLetters.map((item) => {
            return capitalRegExp.test(item) ? `_${item.toLowerCase()}` : item;
        });
        return processedKey.join("");
    } else {
        return key;
    }
}
