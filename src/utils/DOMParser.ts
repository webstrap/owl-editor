'use strict';

import { Buffer } from './Buffer';
import { Markup, MarkupType } from '../model/markup';

export class DOMParser {
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
        this.markups = DOMParser.createFormattingMarkup( this.buffer.asUint8Array() );
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
                    this.flags |= MarkupType.Bold;
                    break;

                case 'i':
                case 'em':
                    this.flags |= MarkupType.Italic;
                    break;

                case 'u':
                    this.flags |= MarkupType.Underline;
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

    static createFormattingMarkup( buffer: Uint8Array ): Array<Markup>
    {
        const markups = [];

        let boldStart: number | null = null;
        let italicStart: number | null = null;
        let underlineStart: number | null = null;

        let current = 0;
        let index = 0;

        for ( const l = buffer.length; index <= l ; index++ )
        {
            const flags = index === l ? 0 : buffer[ index ];

            if ( flags !== current )
            {
                if ( boldStart !== null )
                {
                    if ( !( flags & MarkupType.Bold ) )
                    {
                        markups.push( new Markup( boldStart, index, MarkupType.Bold ) );

                        boldStart = null;
                    }
                }
                else if ( flags & MarkupType.Bold )
                {
                    boldStart = index;
                }

                if ( italicStart !== null )
                {
                    if ( !( flags & MarkupType.Italic ) )
                    {
                        markups.push( new Markup( italicStart, index, MarkupType.Italic ) );

                        italicStart = null;
                    }
                }
                else if ( flags & MarkupType.Italic )
                {
                    italicStart = index;
                }

                if ( underlineStart !== null )
                {
                    if ( !( flags & MarkupType.Italic ) )
                    {
                        markups.push( new Markup( underlineStart, index, MarkupType.Italic ) );

                        underlineStart = null;
                    }
                }
                else if ( flags & MarkupType.Underline )
                {
                    underlineStart = index;
                }

                current = flags;
            }
        }

        return markups;
    }
}
