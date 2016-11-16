'use strict';

import { Paragraph, ParagraphType } from './paragraph';
import { Map } from '../utils';

export class Content
{
    list: Array<Paragraph>;
    map: Map<Paragraph>;

    constructor( list, map )
    {
        this.list = list;
        this.map = map;
    }

    static fromDOM( rootEl: Element ): Content
    {
        const { children } = rootEl;

        for ( let i = 0, l = children.length; i < l; i++ )
        {
            const child = children[ i ];
        }

        return new Content( [], {} );
    }

    insertParagraph( paragraph: Paragraph, index?: number )
    {
        if ( index != null )
        {
            if ( 0 <= index && index < this.list.length )
            {
                this.list.splice( index, 0, paragraph );
            }
            else
            {
                console.error( 'Content.insertParagraph: index out of bound' );
            }
        }
        else
        {
            this.list.push( paragraph );
        }
    }

    updateParagraph( paragraph: Paragraph, index: number )
    {
        if ( 0 <= index && index < this.list.length )
        {
            this.list[index] = paragraph;
        }
        else
        {
            console.error( 'Content.updateParagraph: index out of bound' );
        }
    }

    removeParagraph( index: number )
    {
        if ( 0 <= index && index < this.list.length )
        {
            this.list.splice( index, 1 );
        }
        else
        {
            console.error( 'Content.removeParagraph: index out of bound' );
        }
    }
}
