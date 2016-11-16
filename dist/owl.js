(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

var counter = 0;
function createId() {
    return "c" + ++counter;
}
var Buffer = (function () {
    function Buffer(capacity) {
        if (capacity === void 0) { capacity = 128; }
        this.length = 0;
        this.capacity = capacity;
        this.buf = new Uint8Array(capacity);
    }
    Buffer.prototype.reserve = function (increment) {
        if (this.capacity - this.length > increment) {
            return;
        }
        this.capacity += Math.max(increment, this.capacity);
        var buf = new Uint8Array(this.capacity);
        buf.set(this.buf, 0);
        this.buf = buf;
    };
    Buffer.prototype.push = function (byte) {
        this.reserve(1);
        this.buf[this.length++] = byte;
    };
    Buffer.prototype.fill = function (byte, repeat) {
        this.reserve(repeat);
        while (repeat--) {
            this.buf[this.length++] = byte;
        }
    };
    Buffer.prototype.at = function (index) {
        return this.buf[index];
    };
    Buffer.prototype.asUint8Array = function () {
        return this.buf.subarray(0, this.length);
    };
    return Buffer;
}());

var ParagraphType;
(function (ParagraphType) {
    ParagraphType[ParagraphType["Text"] = 0] = "Text";
    ParagraphType[ParagraphType["Image"] = 1] = "Image";
    ParagraphType[ParagraphType["Title"] = 2] = "Title";
    ParagraphType[ParagraphType["Cite"] = 3] = "Cite";
})(ParagraphType || (ParagraphType = {}));
var BOLD_FLAG = 1;
var ITALIC_FLAG = 2;
var UNDERLINE_FLAG = 4;
var DOMParser = (function () {
    function DOMParser(node) {
        this.flags = 0;
        this.buffer = new Buffer;
        this.index = 0;
        this.content = '';
        this.markups = [];
        this.linkStart = 0;
        this.traverse(node);
    }
    DOMParser.prototype.traverse = function (node) {
        if (node.nodeType === Node.TEXT_NODE) {
            var content = node.textContent;
            var len = content.length;
            this.content += node.textContent;
            this.index += len;
            this.buffer.fill(this.flags, len);
            return;
        }
        if (node.nodeType == Node.ELEMENT_NODE) {
            var tag = node.tagName.toLowerCase();
            var flagsBefore = this.flags;
            switch (tag) {
                case 'b':
                case 'strong':
                    this.flags |= BOLD_FLAG;
                    break;
                case 'i':
                case 'em':
                    this.flags |= ITALIC_FLAG;
                    break;
                case 'u':
                    this.flags |= UNDERLINE_FLAG;
                    break;
            }
            var children = node.childNodes;
            for (var i = 0, l = children.length; i < l; i++) {
                this.traverse(children[i]);
            }
            this.flags = flagsBefore;
        }
    };
    return DOMParser;
}());
var Paragraph = (function () {
    function Paragraph(text, markups, type) {
        this.id = createId();
        this.text = text;
        this.markups = markups;
        this.type = type;
    }
    Paragraph.fromDOM = function (node) {
        var _a = new DOMParser(node), content = _a.content, markups = _a.markups, buffer = _a.buffer;
        console.log(content, markups, buffer.asUint8Array());
        return new Paragraph(content, markups, ParagraphType.Text);
    };
    return Paragraph;
}());

var Content = (function () {
    /**
     * @param {Array<Paragraph>} list
     */
    function Content(list) {
        var map = {};
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var paragraph = list_1[_i];
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
    Content.fromDOM = function (rootEl) {
        var children = rootEl.children;
        var list = [];
        for (var i = 0, l = children.length; i < l; i++) {
            var child = children[i];
            var paragraph = Paragraph.fromDOM(child);
            list.push(paragraph);
        }
        return new Content(list);
    };
    /**
     * @param {Paragraph} paragraph
     * @param {number} index
     */
    Content.prototype.insertParagraph = function (paragraph, index) {
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
    };
    Content.prototype.updateParagraph = function (paragraph, index) {
        if (0 <= index && index < this.list.length) {
            this.list[index] = paragraph;
        }
        else {
            console.error('Content.updateParagraph: index out of bound');
        }
    };
    Content.prototype.removeParagraph = function (index) {
        if (0 <= index && index < this.list.length) {
            this.list.splice(index, 1);
        }
        else {
            console.error('Content.removeParagraph: index out of bound');
        }
    };
    return Content;
}());

var Editor = (function () {
    function Editor() {
        this.contentEl = document.getElementById('content');
        this.content = Content.fromDOM(this.contentEl);
        this.bindUpdate();
        this.update();
    }
    Editor.prototype.update = function () {
        console.log('update!');
    };
    Editor.prototype.bindUpdate = function () {
        var update = this.update.bind(this);
        var timer = 0;
        this.contentEl.addEventListener('input', function () {
            clearTimeout(timer);
            timer = setTimeout(update, 300);
        });
    };
    return Editor;
}());
window['editor'] = new Editor;

})));
