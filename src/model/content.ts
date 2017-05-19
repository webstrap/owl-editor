'use strict';

import { Paragraph, ParagraphType } from './paragraph';
import { Map } from '../utils/misc';

export class Content {
    list: Array<Paragraph>;
    map: Map<Paragraph>;

    /**
     * @param {Array<Paragraph>} list
     */
    constructor(list: Array<Paragraph>) {
        const map = {};

        for (const paragraph of list) {
            map[paragraph.id] = paragraph;
        }

        this.list = list;
        this.map = map;
    }

    /**
     * @param  {Element} rootEl
     *
     * @return {Content}
     */
    static fromDOM(rootEl: Element): Content {
        const { children } = rootEl;

        const list = [];

        for (let i = 0, l = children.length; i < l; i++) {
            const child = children[i];

            const paragraph = Paragraph.fromDOM(child);

            console.log('recreated buffer', paragraph.createBuffer());

            list.push(paragraph);
        }

        return new Content(list);
    }

    getIndexById(id: string): number {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id === id) {
                return i;
            }
        }
        console.error('Content.getIndexById: id not found');
        return -1;
    }

    /**
     * @param {Paragraph} paragraph
     * @param {number} index
     */
    insertParagraph(paragraph: Paragraph, index?: number) {
        if (index != null) {
            if (0 <= index && index < this.list.length) {
                this.list.splice(index, 0, paragraph);
            }
            else {
                console.error('Content.insertParagraph: index out of bound');
            }
        }
        else {
            this.list.push(paragraph);
        }
    }

    updateParagraph(paragraph: Paragraph, index: number) {
        if (0 <= index && index < this.list.length) {
            this.list[index] = paragraph;
        }
        else {
            console.error('Content.updateParagraph: index out of bound');
        }
    }

    removeParagraph(index: number) {
        if (0 <= index && index < this.list.length) {
            this.list.splice(index, 1);
        }
        else {
            console.error('Content.removeParagraph: index out of bound');
        }
    }

    render(root: Element) {
        let node;

        while (node = root.firstChild) {
            root.removeChild(root.firstChild);
        }

        for (const paragraph of this.list) {
            root.appendChild(paragraph.toDOM());
        }
    }
}
