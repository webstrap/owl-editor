'use strict';

import { Markup } from './markup';
import { createId, sortArray } from '../utils';

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
