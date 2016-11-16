'use strict';

import { Markup } from './markup';

export enum ParagraphType {
    Text,
    Image,
    Title,
    Cite,
}

export class Paragraph {
    text    : string;
    markups : Array<Markup>;
    type    : ParagraphType;

    constructor( text: string, markups: Array<Markup>, type: ParagraphType )
    {
        this.text = text;
        this.markups = markups;
        this.type = type;
    }
}
