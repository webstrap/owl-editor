'use strict';

export interface Map<T> {
    [K: string]: T;
}

let counter = 0;

export function createId(): string {
    return `c${++counter}`;
}

export function sortArray<T>(array: Array<T>, key: string) {
    array.sort((a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0);
}
