'use strict';

export interface Map<T>
{
    [K: string]: T;
}

let counter = 0;

export function createId(): string
{
    return `c${ ++counter }`;
}
