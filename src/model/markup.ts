'use strict';

export enum MarkupType {
    Bold,
    Italic,
    Underline,
    Link,
}

export interface Markup {
    start : number,
    end   : number,
    type  : MarkupType,
    url   : string,
}