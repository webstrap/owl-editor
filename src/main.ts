'use strict';

import { Content } from './model/content';
import { defer } from './utils';

class Editor
{
    contentEl : Element;
    content   : Content;

    constructor()
    {
        this.content = new Content;
        this.contentEl = document.getElementById( 'content' );

        this.bindUpdate();
    }

    bindUpdate()
    {
        const update = this.update.bind( this );

        let timer = 0;

        this.contentEl.addEventListener( 'input', () =>
        {
            clearTimeout( timer );
            timer = setTimeout( update, 300 );
        } );
    }

    update()
    {
        console.log( 'update!' );
    }
}


window[ 'editor' ] = new Editor;