'use strict';

enum MarkupType {
    Bold,
    Italic,
    Underline,
    Link,
}

interface Markup {
    start: Number,
    end: Number,
    type: MarkupType,
}

enum ParagraphType {
    Text,
    Image,
    Title,
    Cite,
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

console.log( 'Herrow owl!' );