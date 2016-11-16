'use strict';

import { Markup } from './markup';
import { createId, Buffer, sortArray } from '../utils';

export enum ParagraphType {
    Text,
    Image,
    Title,
    Cite,
}

const BOLD_FLAG      = 0b001;
const ITALIC_FLAG    = 0b010;
const UNDERLINE_FLAG = 0b100;


class DOMParser {
    flags = 0;
    buffer = new Buffer;

    index = 0;
    content = '';
    markups: Array<Markup> = [];

    linkUrl: string | void;
    linkStart = 0;

    constructor( node: Node )
    {
        this.traverse( node );
    }

    traverse( node: Node )
    {
        if ( node.nodeType === Node.TEXT_NODE )
        {
            const content = node.textContent;
            const len = content.length;

            this.content += node.textContent;
            this.index += len;
            this.buffer.fill( this.flags, len );

            return;
        }

        if ( node.nodeType == Node.ELEMENT_NODE )
        {
            const tag = (<Element>node).tagName.toLowerCase();

            const flagsBefore = this.flags;

            switch ( tag )
            {
                case 'b':
                case 'strong':
                    this.flags |= BOLD_FLAG;
                    break;

                case 'i':
                case 'em':
                    this.flags |= ITALIC_FLAG;
                    break;

                case 'u':
                    this.flags |= UNDERLINE_FLAG;
                    break;
            }

            const children = node.childNodes;

            for ( let i = 0, l = children.length; i < l; i++ )
            {
                this.traverse( children[ i ] );
            }

            this.flags = flagsBefore;
        }
    }
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
        const { content, markups, buffer } = new DOMParser( node );

        console.log( content, markups, buffer.asUint8Array() );

        return new Paragraph( content, markups, ParagraphType.Text );
    }

    toDOM(): Element
    {
        this.markups.sort( Markup.comparator );
        const activeMarkup: Array<Markup> = [];
        let textCursor = 0;
        const pTag = document.createElement( 'p' );

        for ( let markup of this.markups )
        {
            // create text node without markup
            if ( activeMarkup.length === 0 )
            {
                const subText = this.text.substring( textCursor, markup.start );
                pTag.appendChild( document.createTextNode( subText ) );
                textCursor = markup.start;
            }

            const endedMarkups = activeMarkup.filter( (entry) => entry.end < markup.start );

            // close all markups that ended before the current one
            for ( let endedMarkup of endedMarkups )
            {
                
            }
            sortArray( endedMarkups, 'end' );
            
            activeMarkup.push( markup );
             
            
        }

        return pTag;
    }


}
