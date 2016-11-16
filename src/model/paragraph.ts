'use strict';

import { Markup } from './markup';
import { createId } from '../utils';

export enum ParagraphType {
    Text,
    Image,
    Title,
    Cite,
}

export class Paragraph {
    id      : string;
    text    : string;
    markups : Array<Markup>;
    type    : ParagraphType;

    constructor( text: string, markups: Array<Markup>, type: ParagraphType )
    {
        this.id = createId();
        this.text = text;
        this.markups = markups;
        this.type = type;
    }

    static fromDOM( node: Node ): Paragraph
    {
        return new Paragraph( '', [], ParagraphType.Text );
    }
}
