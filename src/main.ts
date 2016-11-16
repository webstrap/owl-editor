'use strict';

import { Content } from './model/content';
import { MarkupType } from './model/markup';

class Editor
{
    content   : Content;

    contentEl = document.getElementById( 'content' );

    startFld = <HTMLInputElement>document.getElementById( 'start' );
    endFld = <HTMLInputElement>document.getElementById( 'end' );

    boldBtn = <HTMLButtonElement>document.getElementById( 'bold' );
    italicBtn = <HTMLButtonElement>document.getElementById( 'italic' );
    clearBtn = <HTMLButtonElement>document.getElementById( 'clear' );

    constructor()
    {
        this.bindUpdate();
        this.update();

        this.boldBtn.onclick = () =>
        {
            const start = Number( this.startFld.value );
            const end = Number( this.endFld.value );

            const selection = window.getSelection();

            if ( !selection.isCollapsed )
            {
                const anchorNode = selection.anchorNode;
                const focusNode = selection.focusNode;
                const siblingOffset = (element) => 
                {
                    let sibling = element.previousSibling;
                    let sibOffset = 0;
                    while( sibling )
                    {
                        sibOffset += sibling.textContent.length;
                        sibling = sibling.previousSibling;
                    }
                    return sibOffset;
                }
                
                const parentData = (element) =>
                {
                    let parentNode: HTMLElement = <HTMLElement>element.parentNode;
                    let parentOffset = 0;
                    while ( parentNode.nodeName !== 'P' )
                    {
                        parentOffset += siblingOffset( parentNode );
                        parentNode = <HTMLElement>parentNode.parentNode;
                    }
                    return { parentOffset, parentNode };
                }
                let anchorData = parentData( anchorNode );
                let anchorOffset = selection.anchorOffset + siblingOffset( anchorNode ) + anchorData.parentOffset;
                let anchorIndex = this.content.getIndexById( anchorData.parentNode.getAttribute( 'name' ) );
                console.log( "Selection Start:", anchorIndex, anchorOffset );

                let focusData = parentData( focusNode );
                let focusOffset = selection.focusOffset + siblingOffset( focusNode ) + focusData.parentOffset;
                let focusIndex = this.content.getIndexById( focusData.parentNode.getAttribute( 'name' ) );
                console.log( "Selection Start:", focusIndex, focusOffset );
            }
            this.content.list[0].format( start, end, MarkupType.Bold );
            this.content.render( this.contentEl );
        };

        this.italicBtn.onclick = () =>
        {
            const start = Number( this.startFld.value );
            const end = Number( this.endFld.value );

            this.content.list[0].format( start, end, MarkupType.Italic );
            this.content.render( this.contentEl );
        };

        this.clearBtn.onclick = () =>
        {
            const start = Number( this.startFld.value );
            const end = Number( this.endFld.value );

            this.content.list[0].clear( start, end );
            this.content.render( this.contentEl );
        };
    }

    update()
    {
        this.content = Content.fromDOM( this.contentEl );
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
