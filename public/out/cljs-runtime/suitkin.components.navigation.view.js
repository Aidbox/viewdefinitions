goog.provide('suitkin.components.navigation.view');
suitkin.components.navigation.view.tabs = (function suitkin$components$navigation$view$tabs(options){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"suitkin_components_navigation_view-6-25","suitkin_components_navigation_view-6-25",702200139),new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(options)], null)], null),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(options,new cljs.core.Keyword(null,"class","class",-2030961996),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"items","items",1031954938)], 0))], 0)),(function (){var iter__5523__auto__ = (function suitkin$components$navigation$view$tabs_$_iter__47421(s__47422){
return (new cljs.core.LazySeq(null,(function (){
var s__47422__$1 = s__47422;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__47422__$1);
if(temp__5804__auto__){
var s__47422__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__47422__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__47422__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__47424 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__47423 = (0);
while(true){
if((i__47423 < size__5522__auto__)){
var item = cljs.core._nth(c__5521__auto__,i__47423);
cljs.core.chunk_append(b__47424,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(item))?new cljs.core.Keyword(null,"suitkin_components_navigation_view-17-29","suitkin_components_navigation_view-17-29",-894222590):new cljs.core.Keyword(null,"suitkin_components_navigation_view-19-29","suitkin_components_navigation_view-19-29",-995105209)),new cljs.core.Keyword(null,"suitkin_components_navigation_view-24-27","suitkin_components_navigation_view-24-27",-1660610328),new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(item)], null)], null),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(item,new cljs.core.Keyword(null,"class","class",-2030961996),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"title","title",636505583)], 0))], 0)),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item)], null)));

var G__47478 = (i__47423 + (1));
i__47423 = G__47478;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__47424),suitkin$components$navigation$view$tabs_$_iter__47421(cljs.core.chunk_rest(s__47422__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__47424),null);
}
} else {
var item = cljs.core.first(s__47422__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(item))?new cljs.core.Keyword(null,"suitkin_components_navigation_view-17-29","suitkin_components_navigation_view-17-29",-894222590):new cljs.core.Keyword(null,"suitkin_components_navigation_view-19-29","suitkin_components_navigation_view-19-29",-995105209)),new cljs.core.Keyword(null,"suitkin_components_navigation_view-24-27","suitkin_components_navigation_view-24-27",-1660610328),new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(item)], null)], null),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(item,new cljs.core.Keyword(null,"class","class",-2030961996),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"title","title",636505583)], 0))], 0)),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item)], null)),suitkin$components$navigation$view$tabs_$_iter__47421(cljs.core.rest(s__47422__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(options));
})()], null);
});

//# sourceMappingURL=suitkin.components.navigation.view.js.map
