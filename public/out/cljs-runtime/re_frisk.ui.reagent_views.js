goog.provide('re_frisk.ui.reagent_views');
re_frisk.ui.reagent_views.input_signals = (function re_frisk$ui$reagent_views$input_signals(name,subs){
var temp__5804__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.view__GT_reactions),name);
if(cljs.core.truth_(temp__5804__auto__)){
var signals = temp__5804__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frisk.ui.components.frisk.Root_Simple,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (item){
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.reaction__GT_operation),item);
if(cljs.core.truth_(op)){
return cljs.core.PersistentArrayMap.createAsIfByAssoc([op,cljs.core.get.cljs$core$IFn$_invoke$arity$2(subs,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [op], null),cljs.core.PersistentVector.EMPTY], null))]);
} else {
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"reagent","reagent",2131627322),new cljs.core.Keyword(null,"atom","atom",-397043653)], null);
}
}),signals))], null);
} else {
return null;
}
});
re_frisk.ui.reagent_views.views = (function re_frisk$ui$reagent_views$views(_){
var checkbox_sorted_val = re_frisk.inlined_deps.reagent.v1v0v0.reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false);
return (function (re_frame_data){
var data = cljs.core.deref(new cljs.core.Keyword(null,"views","views",1450155487).cljs$core$IFn$_invoke$arity$1(re_frame_data));
var subs = cljs.core.deref(new cljs.core.Keyword(null,"subs","subs",-186681991).cljs$core$IFn$_invoke$arity$1(re_frame_data));
var chb_val = cljs.core.deref(checkbox_sorted_val);
var view__GT_reactions = cljs.core.deref(re_frisk.subs_graph.view__GT_reactions);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"flex","flex",-1425124628),new cljs.core.Keyword(null,"flex","flex",-1425124628),(1),new cljs.core.Keyword(null,"background-color","background-color",570434026),"#f3f3f3",new cljs.core.Keyword(null,"color","color",1011675173),"#444444",new cljs.core.Keyword(null,"padding","padding",1660304693),(8),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"column","column",2078222095)], null)], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(10),new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"solid 1px #000000",new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"flex","flex",-1425124628),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521)], null)], null),"Mounted views (",cljs.core.count(data),") in mount order",new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),(10),new cljs.core.Keyword(null,"margin-left","margin-left",2015598377),(10)], null)], null)," | "], null),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_com.core.checkbox,new cljs.core.Keyword(null,"model","model",331153215),checkbox_sorted_val,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(checkbox_sorted_val,cljs.core.not);

return null;
}),new cljs.core.Keyword(null,"label","label",1718410804),"subs"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frisk.ui.components.components.scroller,(function (){var iter__5523__auto__ = (function re_frisk$ui$reagent_views$views_$_iter__44495(s__44496){
return (new cljs.core.LazySeq(null,(function (){
var s__44496__$1 = s__44496;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__44496__$1);
if(temp__5804__auto__){
var s__44496__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__44496__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__44496__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__44498 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__44497 = (0);
while(true){
if((i__44497 < size__5522__auto__)){
var map__44499 = cljs.core._nth(c__5521__auto__,i__44497);
var map__44499__$1 = cljs.core.__destructure_map(map__44499);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__44499__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.chunk_append(b__44498,(cljs.core.truth_((function (){var or__5045__auto__ = cljs.core.not(chb_val);
if(or__5045__auto__){
return or__5045__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(view__GT_reactions,name);
}
})())?cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"flex","flex",-1425124628),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"solid 1px #CCCCCC"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"min-width","min-width",1926193728),"200",new cljs.core.Keyword(null,"color","color",1011675173),re_frisk.ui.components.colors.render], null)], null),name], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frisk.ui.reagent_views.input_signals,name,subs], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["item",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join('')], null)):null));

var G__44525 = (i__44497 + (1));
i__44497 = G__44525;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__44498),re_frisk$ui$reagent_views$views_$_iter__44495(cljs.core.chunk_rest(s__44496__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__44498),null);
}
} else {
var map__44502 = cljs.core.first(s__44496__$2);
var map__44502__$1 = cljs.core.__destructure_map(map__44502);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__44502__$1,new cljs.core.Keyword(null,"name","name",1843675177));
return cljs.core.cons((cljs.core.truth_((function (){var or__5045__auto__ = cljs.core.not(chb_val);
if(or__5045__auto__){
return or__5045__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(view__GT_reactions,name);
}
})())?cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"flex","flex",-1425124628),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"solid 1px #CCCCCC"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"min-width","min-width",1926193728),"200",new cljs.core.Keyword(null,"color","color",1011675173),re_frisk.ui.components.colors.render], null)], null),name], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frisk.ui.reagent_views.input_signals,name,subs], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["item",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join('')], null)):null),re_frisk$ui$reagent_views$views_$_iter__44495(cljs.core.rest(s__44496__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"order","order",-1254677256),cljs.core.vals(data)));
})()], null)], null);
});
});

//# sourceMappingURL=re_frisk.ui.reagent_views.js.map
