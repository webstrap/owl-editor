(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

var Content = (function () {
    function Content() {
    }
    return Content;
}());

var Editor = (function () {
    function Editor() {
        this.content = new Content;
        this.contentEl = document.getElementById('content');
    }
    return Editor;
}());
window['editor'] = new Editor;

})));
