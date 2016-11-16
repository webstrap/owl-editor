'use strict';

import { Paragraph } from './paragraph';
import { Map } from '../utils';

export class Content 
{
	list: Array<Paragraph>;
	map: Map<Paragraph>;

    constructor()
    {

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
}
