"use strict";
/**
 * Câu 1: Viết chương trình đệ quy tính tổng các số từ 1 đến n, với n là một số cho trước.
Ví dụ:
    n=0 -> 0
    n=1 -> 1
    n=3 -> 6
n=10 -> 55
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArrOfNumberByAbs = exports.sortArrOfNumberByValue = exports.calculateSumFromZeroToN = void 0;
const strict_1 = __importDefault(require("assert/strict"));
function calculateSumFromZeroToN(input) {
    if (input < 0) {
        throw Error("Input must be greater than zero");
    }
    if (input <= 1)
        return input;
    return input + calculateSumFromZeroToN(input - 1);
}
exports.calculateSumFromZeroToN = calculateSumFromZeroToN;
strict_1.default.strictEqual(calculateSumFromZeroToN(3), 6);
strict_1.default.strictEqual(calculateSumFromZeroToN(4), 10);
// export function swap(arr: number[], first: number, second: number) {
//   const firstValue = arr.splice(first, 1, arr[second])[0];
//   arr[second] = firstValue;
//   return arr;
// }
// assert.deepEqual(swap([1, 3, 5], 0, 2), [5, 3, 1]);
function sortArrOfNumberByValue(input) {
    if (input.length <= 1)
        return input;
    if (input.length === 2) {
        const [x, y] = input;
        return x < y ? input.slice() : [y, x];
    }
    let pivotIndex = Math.round(input.length / 2);
    const pivotValue = input[pivotIndex];
    const smaller = [];
    const larger = [];
    for (let i = 0; i < input.length; i++) {
        if (i === pivotIndex)
            continue;
        const valueToCompare = input[i];
        if (valueToCompare < pivotValue) {
            smaller.push(valueToCompare);
        }
        else
            larger.push(valueToCompare);
    }
    return [smaller, pivotValue, larger]
        .map((v, i) => {
        if (i === 1) {
            return [v];
        }
        return sortArrOfNumberByValue(v);
    })
        .reduce((p, c) => [...p, ...c]);
    //   console.log({
    //     input,
    //     sort: [smaller, pivotValue, larger],
    //     output,
    //   });
}
exports.sortArrOfNumberByValue = sortArrOfNumberByValue;
strict_1.default.deepEqual(sortArrOfNumberByValue([1, 25, 7, -7, -3, 12, -22, 0]), [-22, -7, -3, 0, 1, 7, 12, 25]);
strict_1.default.deepEqual(sortArrOfNumberByValue([1, 30, 43, 25, -4, 7, -7, -3, 12, -22, 0]), [-22, -7, -4, -3, 0, 1, 7, 12, 25, 30, 43]);
function sortArrOfNumberByAbs(input) {
    if (input.length <= 1)
        return input;
    if (input.length === 2) {
        const [x, y] = input;
        const absX = Math.abs(x);
        const absY = Math.abs(y);
        if (absX < absY)
            return input.slice();
        if (absX > absY)
            return [y, x];
        return x < y ? input.slice() : [y, x];
    }
    let pivotIndex = Math.round(input.length / 2);
    const pivotValue = input[pivotIndex];
    const AbsPivotValue = Math.abs(pivotValue);
    const smaller = [];
    const larger = [];
    for (let i = 0; i < input.length; i++) {
        if (i === pivotIndex)
            continue;
        const valueToCompare = input[i];
        const AbsValueToCompare = Math.abs(valueToCompare);
        if (AbsValueToCompare < AbsPivotValue) {
            smaller.push(valueToCompare);
        }
        else if (AbsValueToCompare > AbsPivotValue) {
            larger.push(valueToCompare);
        }
        else {
            if (valueToCompare < pivotValue) {
                smaller.push(valueToCompare);
            }
            else {
                larger.push(valueToCompare);
            }
        }
    }
    const output = [smaller, pivotValue, larger].map((v, i) => {
        if (i === 1) {
            return [v];
        }
        return sortArrOfNumberByAbs(v);
    });
    //   console.log({
    //     input,
    //     sort: [smaller, pivotValue, larger],
    //     output,
    //   });
    return output.reduce((p, c) => [...p, ...c]);
}
exports.sortArrOfNumberByAbs = sortArrOfNumberByAbs;
strict_1.default.deepEqual(sortArrOfNumberByAbs([1, 25, 7, -7, -3, 12, -22, 0]), [0, 1, -3, -7, 7, 12, -22, 25]);
strict_1.default.deepEqual(sortArrOfNumberByAbs([1, 30, 43, 25, -4, 7, -7, -3, 12, -22, 0]), [0, 1, -3, -4, -7, 7, 12, -22, 25, 30, 43]);
let tests = [
    {
        input: "https://cdn.shopify.com/e.jpg?v=15",
        output: "https://cdn.shopify.com/e_100x.jpg?v=15",
        size: "100x",
    },
    {
        input: "https://cdn.shopify.com/e_100x200.jpg?v=15",
        output: "https://cdn.shopify.com/e_x200.jpg?v=15",
        size: "x200",
    },
    {
        input: "https://cdn.shopify.com/e-jpg_200x100.jpg?v=15",
        output: "https://cdn.shopify.com/e-jpg_100x.jpg?v=15",
        size: "100x",
    },
    {
        input: "https://cdn.shopify.com/100xMacBook.jpg_640x640_3_result_100x.jpg?v=15",
        output: "https://cdn.shopify.com/100xMacBook.jpg_640x640_3_result_x100.jpg?v=15",
        size: "x100",
    },
    {
        input: "https://cdn.shopify.com/e-800x600-jpg.jpg?v=15",
        output: "https://cdn.shopify.com/e-800x600-jpg_100x200.jpg?v=15",
        size: "100x200",
    },
];
let replaceSize = function (orginalUrl, size) {
    const regex = /(_(x?\d+x?)+)?(\.jpg\?)/;
    return orginalUrl.replace(regex, `_${size}` + "$3");
};
tests.forEach((item) => {
    const { input, output: expect, size } = item;
    const output = replaceSize(input, size);
    strict_1.default.strictEqual(expect, output);
});
