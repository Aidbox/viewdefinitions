goog.provide('suitkin.components.button');
suitkin.components.button.primary_default = new cljs.core.Keyword(null,"suitkin_components_button-8-3","suitkin_components_button-8-3",1499504912);
suitkin.components.button.secondary_default = new cljs.core.Keyword(null,"suitkin_components_button-16-3","suitkin_components_button-16-3",1365102365);
suitkin.components.button.tertiary_default = new cljs.core.Keyword(null,"suitkin_components_button-24-3","suitkin_components_button-24-3",-63812974);
suitkin.components.button.primary_dangerous = new cljs.core.Keyword(null,"suitkin_components_button-32-3","suitkin_components_button-32-3",424125883);
suitkin.components.button.secondary_dangerous = new cljs.core.Keyword(null,"suitkin_components_button-40-3","suitkin_components_button-40-3",425536958);
suitkin.components.button.tertiary_dangerous = new cljs.core.Keyword(null,"suitkin_components_button-48-3","suitkin_components_button-48-3",37643212);
suitkin.components.button.button_size_narrow = new cljs.core.Keyword(null,"suitkin_components_button-55-26","suitkin_components_button-55-26",-1410281587);
suitkin.components.button.button_size_default = new cljs.core.Keyword(null,"suitkin_components_button-56-26","suitkin_components_button-56-26",351335934);
suitkin.components.button.base_button_class = new cljs.core.Keyword(null,"suitkin_components_button-59-3","suitkin_components_button-59-3",1485910289);
suitkin.components.button.icon = (function suitkin$components$button$icon(src,body){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img.button-icon","img.button-icon",1466018673),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"width","width",-384071477),"16px",new cljs.core.Keyword(null,"height","height",1025178622),"16px",new cljs.core.Keyword(null,"class","class",-2030961996),(cljs.core.truth_(body)?new cljs.core.Keyword(null,"suitkin_components_button-72-69","suitkin_components_button-72-69",1790132152):null),new cljs.core.Keyword(null,"src","src",-1651076051),suitkin.utils.public_src(src)], null)], null);
});
suitkin.components.button.component = (function suitkin$components$button$component(properties,body){
var class$ = new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(properties);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(new cljs.core.Keyword("s","label?","s/label?",90640284).cljs$core$IFn$_invoke$arity$1(properties))?new cljs.core.Keyword(null,"label","label",1718410804):(cljs.core.truth_(new cljs.core.Keyword(null,"href","href",-793805698).cljs$core$IFn$_invoke$arity$1(properties))?new cljs.core.Keyword(null,"a","a",-2123407586):new cljs.core.Keyword(null,"button","button",1456579943)
)),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(properties),new cljs.core.Keyword(null,"disabled","disabled",-1529784218),(function (){var or__5045__auto__ = new cljs.core.Keyword(null,"disabled","disabled",-1529784218).cljs$core$IFn$_invoke$arity$1(properties);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return new cljs.core.Keyword("s","loading?","s/loading?",1905707080).cljs$core$IFn$_invoke$arity$1(properties);
}
})(),new cljs.core.Keyword(null,"href","href",-793805698),new cljs.core.Keyword(null,"href","href",-793805698).cljs$core$IFn$_invoke$arity$1(properties),new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.Keyword(null,"target","target",253001721).cljs$core$IFn$_invoke$arity$1(properties),new cljs.core.Keyword(null,"on-click","on-click",1632826543),new cljs.core.Keyword(null,"on-click","on-click",1632826543).cljs$core$IFn$_invoke$arity$1(properties),new cljs.core.Keyword(null,"for","for",-1323786319),new cljs.core.Keyword(null,"for","for",-1323786319).cljs$core$IFn$_invoke$arity$1(properties),new cljs.core.Keyword(null,"class","class",-2030961996),cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.button.base_button_class,(function (){var G__47041 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("s","use","s/use",-1846382821).cljs$core$IFn$_invoke$arity$1(properties),new cljs.core.Keyword("s","theme","s/theme",-1247880749).cljs$core$IFn$_invoke$arity$1(properties)], null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["tertiary",null], null),G__47041)){
return suitkin.components.button.tertiary_default;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["secondary","dangerous"], null),G__47041)){
return suitkin.components.button.secondary_dangerous;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["secondary",null], null),G__47041)){
return suitkin.components.button.secondary_default;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["tertiary","dangerous"], null),G__47041)){
return suitkin.components.button.tertiary_dangerous;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["primary","default"], null),G__47041)){
return suitkin.components.button.primary_default;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["primary","dangerous"], null),G__47041)){
return suitkin.components.button.primary_dangerous;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["secondary","default"], null),G__47041)){
return suitkin.components.button.secondary_default;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["primary",null], null),G__47041)){
return suitkin.components.button.primary_default;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["tertiary","default"], null),G__47041)){
return suitkin.components.button.tertiary_default;
} else {
return suitkin.components.button.primary_default;

}
}
}
}
}
}
}
}
}
})(),(function (){var G__47042 = new cljs.core.Keyword("s","size","s/size",1098692900).cljs$core$IFn$_invoke$arity$1(properties);
switch (G__47042) {
case "narrow":
return suitkin.components.button.button_size_narrow;

break;
default:
return suitkin.components.button.button_size_default;

}
})()], null),((cljs.core.vector_QMARK_(class$))?class$:new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [class$], null))),new cljs.core.Keyword(null,"title","title",636505583),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(properties)], null),(cljs.core.truth_(new cljs.core.Keyword("s","loading?","s/loading?",1905707080).cljs$core$IFn$_invoke$arity$1(properties))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.Keyword(null,"suitkin_components_button-108-23","suitkin_components_button-108-23",128896997)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"i.fas.fa-circle-notch.spin-animation","i.fas.fa-circle-notch.spin-animation",1172602513)], null)], null):(cljs.core.truth_(new cljs.core.Keyword("s","icon","s/icon",1679606434).cljs$core$IFn$_invoke$arity$1(properties))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.button.icon,new cljs.core.Keyword("s","icon","s/icon",1679606434).cljs$core$IFn$_invoke$arity$1(properties),body], null):null)),body], null);
});

//# sourceMappingURL=suitkin.components.button.js.map
