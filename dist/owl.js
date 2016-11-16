(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

var MarkupType;
(function (MarkupType) {
    MarkupType[MarkupType["Bold"] = 0] = "Bold";
    MarkupType[MarkupType["Italic"] = 1] = "Italic";
    MarkupType[MarkupType["Underline"] = 2] = "Underline";
    MarkupType[MarkupType["Link"] = 3] = "Link";
})(MarkupType || (MarkupType = {}));
var ParagraphType;
(function (ParagraphType) {
    ParagraphType[ParagraphType["Text"] = 0] = "Text";
    ParagraphType[ParagraphType["Image"] = 1] = "Image";
    ParagraphType[ParagraphType["Title"] = 2] = "Title";
    ParagraphType[ParagraphType["Cite"] = 3] = "Cite";
})(ParagraphType || (ParagraphType = {}));
console.log('Herrow owl!');

})));
