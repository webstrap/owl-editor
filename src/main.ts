'use strict';

import { Content } from './model/content';


class Editor
{
    contentEl : Element;
    content   : Content;

    constructor()
    {
        this.content = new Content;
        this.contentEl = document.getElementById( 'content' );
    }
}


window[ 'editor' ] = new Editor;