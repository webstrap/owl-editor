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
        const pTag = document.createElement( 'p' );
        pTag.setAttribute( 'name', this.id );
        let buffer = this.createBuffer();
        let flag = 0;
        let textOffset = 0;
        const openNodes: Array<Element> = [ pTag ];

        for ( let cursor = 0; cursor < buffer.length; cursor++ )
        {
            if ( flag !== buffer[cursor] )
            {
                const changeFlag = flag ^ buffer[cursor];
                flag = buffer[cursor];

                // if the Link bit changed
                if ( changeFlag & MarkupType.Bold )
                {
                    // is bold changed to active
                    if ( flag & MarkupType.Bold )
                    {
                        if ( textOffset < cursor )
                        {
                            let textNode = document.createTextNode( this.text.substring( textOffset, cursor ));
                            openNodes[openNodes.length-1].appendChild( textNode );
                            textOffset = cursor;
                        }
                        const bTag = document.createElement( 'b' );
                        openNodes.push( bTag );
                    }
                }

                if ( changeFlag & MarkupType.Italic )
                {
                    if ( flag & MarkupType.Italic )
                    {
                        if ( textOffset < cursor )
                        {
                            let textNode = document.createTextNode( this.text.substring( textOffset, cursor ));
                            openNodes[openNodes.length-1].appendChild( textNode );
                            textOffset = cursor;
                        }
                        const iTag = document.createElement( 'i' );
                        openNodes.push( iTag );
                    }
                }

                if ( changeFlag & MarkupType.Italic )
                {
                    if ( !( flag & MarkupType.Italic ) )
                    {
                        let tag = openNodes.pop();
                        const tmpStack = [];
                        if ( textOffset < cursor )
                        {
                            let textNode = document.createTextNode( this.text.substring( textOffset, cursor ) );
                            tag.appendChild(textNode);
                            textOffset = cursor;
                        }
                        while( tag.tagName.toLowerCase() != 'i' )
                        {
                            tmpStack.unshift( document.createElement( tag.tagName ) );

                            const tmp = openNodes.pop();
                            tmp.appendChild( tag );
                            tag = tmp;
                        }
                        const tmp = openNodes[openNodes.length-1];
                        tmp.appendChild( tag );
                        Array.prototype.push.apply( openNodes, tmpStack );
                    }
                }

                if ( changeFlag & MarkupType.Bold )
                {
                    if ( !( flag & MarkupType.Bold ) )
                    {
                        let tag = openNodes.pop();
                        const tmpStack = [];
                        if ( textOffset < cursor )
                        {
                            let textNode = document.createTextNode( this.text.substring( textOffset, cursor ) );
                            tag.appendChild(textNode);
                            textOffset = cursor;
                        }
                        while( tag.tagName.toLowerCase() != 'b' )
                        {
                           tmpStack.unshift( document.createElement( tag.tagName ) );

                            const tmp = openNodes.pop();
                            tmp.appendChild( tag );
                            tag = tmp;
                        }
                        const tmp = openNodes[openNodes.length-1];
                        tmp.appendChild( tag );
                        Array.prototype.push.apply( openNodes, tmpStack );
                    }
                }
            }

        }
        
        if ( textOffset < this.text.length )
        {
            let textNode = document.createTextNode( this.text.substring( textOffset, this.text.length ));
            pTag.appendChild( textNode );
        }
        console.log( pTag );

        return pTag;
    }

    createBuffer(): Uint8Array
    {
        let buffer = new Uint8Array( this.text.length );

        for ( let markup of this.markups )
        {
            for ( let cursor = markup.start; cursor < markup.end; cursor++ )
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

        this.markups = DOMParser.createFormattingMarkup( buffer );
        console.log( 'formatted', this.markups, buffer );
    }

    clear( start, end )
    {
        const buffer = this.createBuffer();

        for ( let i = start; i < end; i++ )
        {
            buffer[ i ] = 0;
        }

        this.markups = DOMParser.createFormattingMarkup( buffer );
        console.log( 'cleared', this.markups, buffer );
    }
}
