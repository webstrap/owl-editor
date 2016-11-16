'use strict';

import { Markup, MarkupType }  from './markup';
import { createId, sortArray } from '../utils/misc';
import { Buffer }              from '../utils/Buffer';
import { DOMParser }           from '../utils/DOMParser';

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

    createBuffer(): Uint8Array
    {
        let buffer = new Uint8Array( this.text.length );

        for ( let markup of this.markups )
        {
            for ( let cursor = markup.start; cursor <= markup.end; cursor++ )
            {
                buffer[cursor] |= markup.type;
            }
        }

        return buffer;
    }

    format( start: number, end: number, type: MarkupType )
    {
        const buffer = this.createBuffer();

        for ( let i = start; i < end; i++ )
        {
            buffer[ i ] |= type;
        }

        console.log( 'formatted', buffer );

        this.markups = DOMParser.createFormattingMarkup( buffer );
    }

    clear( start, end )
    {
        const buffer = this.createBuffer();

        for ( let i = start; i < end; i++ )
        {
            buffer[ i ] = 0;
        }

        console.log( 'cleared', buffer );

        this.markups = DOMParser.createFormattingMarkup( buffer );
    }
}
