(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

var Editor = (function () {
    function Editor() {
        this.contentEl = document.getElementById('content');
    }
    return Editor;
}());
window['editor'] = new Editor;

})));
