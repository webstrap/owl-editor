'use strict';

import { Content } from './model/content';
import { MarkupType } from './model/markup';

class Editor {
    content: Content;

    contentEl = document.getElementById('content');

    boldBtn = <HTMLButtonElement>document.getElementById('bold');
    italicBtn = <HTMLButtonElement>document.getElementById('italic');
    clearBtn = <HTMLButtonElement>document.getElementById('clear');

    constructor() {
        this.content = Content.fromDOM(this.contentEl);
        this.content.render(this.contentEl);
        this.bindUpdate();
        this.update();

        this.boldBtn.onclick = () => {
            const selection = window.getSelection();

            if (!selection.isCollapsed) {
                const anchorNode = selection.anchorNode;
                const focusNode = selection.focusNode;
                const siblingOffset = (element) => {
                    let sibling = element.previousSibling;
                    let sibOffset = 0;
                    while (sibling) {
                        sibOffset += sibling.textContent.length;
                        sibling = sibling.previousSibling;
                    }
                    return sibOffset;
                }

                const parentData = (element) => {
                    let parentNode: HTMLElement = <HTMLElement>element.parentNode;
                    let parentOffset = 0;
                    while (parentNode.nodeName !== 'P') {
                        parentOffset += siblingOffset(parentNode);
                        parentNode = <HTMLElement>parentNode.parentNode;
                    }
                    return { parentOffset, parentNode };
                }
                let anchorData = parentData(anchorNode);
                let anchorOffset = selection.anchorOffset + siblingOffset(anchorNode) + anchorData.parentOffset;
                let anchorIndex = this.content.getIndexById(anchorData.parentNode.getAttribute('name'));
                console.log("Selection Start:", anchorIndex, anchorOffset);

                let focusData = parentData(focusNode);
                let focusOffset = selection.focusOffset + siblingOffset(focusNode) + focusData.parentOffset;
                let focusIndex = this.content.getIndexById(focusData.parentNode.getAttribute('name'));
                console.log("Selection Start:", focusIndex, focusOffset);
                if ((focusIndex < anchorIndex) || (focusIndex === anchorIndex && focusOffset < anchorOffset)) {
                    let tmpIndex = anchorIndex;
                    let tmpOffset = anchorOffset;
                    anchorIndex = focusIndex;
                    anchorOffset = focusOffset;
                    focusIndex = tmpIndex;
                    focusOffset = tmpOffset;
                }
                if (anchorIndex === focusIndex) {
                    this.content.list[anchorIndex].format(anchorOffset, focusOffset, MarkupType.Bold);
                }
                else {
                    this.content.list[anchorIndex].format(anchorOffset, null, MarkupType.Bold);
                    for (let i = anchorIndex + 1; i < focusIndex; i++) {
                        this.content.list[i].format(0, null, MarkupType.Bold);
                    }
                    this.content.list[focusIndex].format(0, focusOffset, MarkupType.Bold);
                }
            }
            this.content.render(this.contentEl);
        };

        this.italicBtn.onclick = () => {
            const selection = window.getSelection();

            if (!selection.isCollapsed) {
                const anchorNode = selection.anchorNode;
                const focusNode = selection.focusNode;
                const siblingOffset = (element) => {
                    let sibling = element.previousSibling;
                    let sibOffset = 0;
                    while (sibling) {
                        sibOffset += sibling.textContent.length;
                        sibling = sibling.previousSibling;
                    }
                    return sibOffset;
                }

                const parentData = (element) => {
                    let parentNode: HTMLElement = <HTMLElement>element.parentNode;
                    let parentOffset = 0;
                    while (parentNode.nodeName !== 'P') {
                        parentOffset += siblingOffset(parentNode);
                        parentNode = <HTMLElement>parentNode.parentNode;
                    }
                    return { parentOffset, parentNode };
                }
                let anchorData = parentData(anchorNode);
                let anchorOffset = selection.anchorOffset + siblingOffset(anchorNode) + anchorData.parentOffset;
                let anchorIndex = this.content.getIndexById(anchorData.parentNode.getAttribute('name'));
                console.log("Selection Start:", anchorIndex, anchorOffset);

                let focusData = parentData(focusNode);
                let focusOffset = selection.focusOffset + siblingOffset(focusNode) + focusData.parentOffset;
                let focusIndex = this.content.getIndexById(focusData.parentNode.getAttribute('name'));
                console.log("Selection Start:", focusIndex, focusOffset);
                if ((focusIndex < anchorIndex) || (focusIndex === anchorIndex && focusOffset < anchorOffset)) {
                    let tmpIndex = anchorIndex;
                    let tmpOffset = anchorOffset;
                    anchorIndex = focusIndex;
                    anchorOffset = focusOffset;
                    focusIndex = tmpIndex;
                    focusOffset = tmpOffset;
                }
                if (anchorIndex === focusIndex) {
                    this.content.list[anchorIndex].format(anchorOffset, focusOffset, MarkupType.Italic);
                }
                else {
                    this.content.list[anchorIndex].format(anchorOffset, null, MarkupType.Italic);
                    for (let i = anchorIndex + 1; i < focusIndex; i++) {
                        this.content.list[i].format(0, null, MarkupType.Italic);
                    }
                    this.content.list[focusIndex].format(0, focusOffset, MarkupType.Italic);
                }
            }
            this.content.render(this.contentEl);
        };

        this.clearBtn.onclick = () => {
            const selection = window.getSelection();

            if (!selection.isCollapsed) {
                const anchorNode = selection.anchorNode;
                const focusNode = selection.focusNode;
                const siblingOffset = (element) => {
                    let sibling = element.previousSibling;
                    let sibOffset = 0;
                    while (sibling) {
                        sibOffset += sibling.textContent.length;
                        sibling = sibling.previousSibling;
                    }
                    return sibOffset;
                }

                const parentData = (element) => {
                    let parentNode: HTMLElement = <HTMLElement>element.parentNode;
                    let parentOffset = 0;
                    while (parentNode.nodeName !== 'P') {
                        parentOffset += siblingOffset(parentNode);
                        parentNode = <HTMLElement>parentNode.parentNode;
                    }
                    return { parentOffset, parentNode };
                }
                let anchorData = parentData(anchorNode);
                let anchorOffset = selection.anchorOffset + siblingOffset(anchorNode) + anchorData.parentOffset;
                let anchorIndex = this.content.getIndexById(anchorData.parentNode.getAttribute('name'));
                console.log("Selection Start:", anchorIndex, anchorOffset);

                let focusData = parentData(focusNode);
                let focusOffset = selection.focusOffset + siblingOffset(focusNode) + focusData.parentOffset;
                let focusIndex = this.content.getIndexById(focusData.parentNode.getAttribute('name'));
                console.log("Selection Start:", focusIndex, focusOffset);
                if ((focusIndex < anchorIndex) || (focusIndex === anchorIndex && focusOffset < anchorOffset)) {
                    let tmpIndex = anchorIndex;
                    let tmpOffset = anchorOffset;
                    anchorIndex = focusIndex;
                    anchorOffset = focusOffset;
                    focusIndex = tmpIndex;
                    focusOffset = tmpOffset;
                }
                if (anchorIndex === focusIndex) {
                    this.content.list[anchorIndex].clear(anchorOffset, focusOffset);
                }
                else {
                    this.content.list[anchorIndex].clear(anchorOffset, null);
                    for (let i = anchorIndex + 1; i < focusIndex; i++) {
                        this.content.list[i].clear(0, null);
                    }
                    this.content.list[focusIndex].clear(0, focusOffset);
                }
            }
            this.content.render(this.contentEl);
        };
    }

    update() {
        const numParagraphs = this.content.list.length;
        this.content = Content.fromDOM(this.contentEl);
        if (numParagraphs !== this.content.list.length) {
            this.content.render(this.contentEl);
        }
    }

    bindUpdate() {
        const update = this.update.bind(this);

        let timer = 0;

        this.contentEl.addEventListener('input', () => {
            clearTimeout(timer);
            timer = setTimeout(update, 300);
        });
    }
}


window['editor'] = new Editor;
