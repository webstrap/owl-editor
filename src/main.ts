'use strict';

enum MarkupType {
    Bold      = 1,
    Italic    = 2,
    Underline = 3,
    Link      = 4,
}


interface Markup {
    start: Number,
    end: Number,
    type: MarkupType,
}

enum ParagraphType {
    Text  = 1,
    Image = 2,
    Title = 3,
    Cite  = 4,
}

interface Paragraph {
    text: String,
    markups: Array<Markup>,
    type: ParagraphType,
}

type Content = Array<Paragraph>;

function contentFromDOM( rootEl: Element ): Content
{
    return [];
}