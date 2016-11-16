'use strict';

import { Buffer } from './Buffer';
import { Markup } from '../model/markup';


export const BOLD_FLAG      = 0b001;
export const ITALIC_FLAG    = 0b010;
export const UNDERLINE_FLAG = 0b100;


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

    createFormattingMarkup()
    {
        let bold = false;
        let italic = false;
        let underline = false;

        let current = 0;
        const buffer = this.buffer.asUint8Array();

        for ( let i = 0, l = buffer.length; i < l ; i++ )
        {
            const flags = buffer[ i ];

            if ( flags !== current )
            {
                if ( Boolean( flags & BOLD_FLAG ) !== bold )
                {

                }
            }
        }
    }
}
