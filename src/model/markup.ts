'use strict';

export enum MarkupType {
    Bold,
    Italic,
    Underline,
    Link,
}

export interface Markup {
    start: Number,
    end: Number,
    type: MarkupType,
}