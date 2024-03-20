goog.provide('suitkin.components.segment_control.view');
suitkin.components.segment_control.view.component = (function suitkin$components$segment_control$view$component(properties){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),suitkin.components.segment_control.styles.root], null),(function (){var iter__5523__auto__ = (function suitkin$components$segment_control$view$component_$_iter__47325(s__47326){
return (new cljs.core.LazySeq(null,(function (){
var s__47326__$1 = s__47326;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__47326__$1);
if(temp__5804__auto__){
var s__47326__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__47326__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__47326__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__47328 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__47327 = (0);
while(true){
if((i__47327 < size__5522__auto__)){
var item = cljs.core._nth(c__5521__auto__,i__47327);
cljs.core.chunk_append(b__47328,cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),suitkin.components.segment_control.styles.item], null),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"radio",new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(properties),new cljs.core.Keyword(null,"defaultChecked","defaultChecked",-834047344),new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(item)], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.hash(new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item))], null)));

var G__47360 = (i__47327 + (1));
i__47327 = G__47360;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__47328),suitkin$components$segment_control$view$component_$_iter__47325(cljs.core.chunk_rest(s__47326__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__47328),null);
}
} else {
var item = cljs.core.first(s__47326__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),suitkin.components.segment_control.styles.item], null),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"radio",new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(properties),new cljs.core.Keyword(null,"defaultChecked","defaultChecked",-834047344),new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(item)], null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),cljs.core.hash(new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item))], null)),suitkin$components$segment_control$view$component_$_iter__47325(cljs.core.rest(s__47326__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(properties));
})()], null);
});

//# sourceMappingURL=suitkin.components.segment_control.view.js.map
