goog.provide('re_frisk.clipboard');
re_frisk.clipboard.copy_to_clip = (function re_frisk$clipboard$copy_to_clip(text){
var el = document.createElement("textarea");
(el.value = text);

document.body.appendChild(el);

el.select();

document.execCommand("copy");

return document.body.removeChild(el);
});

//# sourceMappingURL=re_frisk.clipboard.js.map
