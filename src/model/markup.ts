'use strict';

export enum MarkupType {
    Link = 0b0001,
    Bold = 0b0010,
    Italic = 0b0100,
    Underline = 0b1000,
}

export class Markup {
    start: number;
    end: number;
    type: MarkupType;
    url: string | void;

    constructor(start: number, end: number, type: MarkupType, url?: string) {
        this.start = start;
        this.end = end;
        this.type = type;
        this.url = url;
    }

    /**
    * Compares 2 {Markup} objects first by start index
    * (lower index comes first) and on equality it uses
    * the {MarkypType} as a second comparator by it's
    * precedence.
    *
    * @param {Markup} a
    * @param {Markup} b
    * @return {number} -1, 0, 1 for a being smaller, equal or greater than b
    */
    static comparator(a: Markup, b: Markup): number {
        const deltaStart = a.start - b.start;
        if (deltaStart === 0) {
            return a.type - b.type;
        }
        return deltaStart;
    }
}
