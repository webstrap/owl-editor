'use strict';

import { Markup } from './markup';

export enum ParagraphType {
    Text,
    Image,
    Title,
    Cite,
}

export interface Paragraph {
    text: String,
    markups: Array<Markup>,
    type: ParagraphType,
}