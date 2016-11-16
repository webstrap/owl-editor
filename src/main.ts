'use strict';


class Editor
{
    contentEl: Element;

    constructor()
    {
        this.contentEl = document.getElementById( 'content' );
    }
}


window[ 'editor' ] = new Editor;