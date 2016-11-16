'use strict';

import { Content } from './model/content';
import { defer } from './utils';

class Editor
{
    contentEl : Element;
    content   : Content;

    constructor()
    {
        this.contentEl = document.getElementById( 'content' );
        this.content = Content.fromDOM( this.contentEl );

        this.bindUpdate();
    }

    update()
    {
        console.log( 'update!' );
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
}


window[ 'editor' ] = new Editor;
