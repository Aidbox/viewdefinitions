goog.provide('re_frisk.ui.stat');
re_frisk.ui.stat.current_reg = re_frisk.inlined_deps.reagent.v1v0v0.reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"event","event",301435442));
re_frisk.ui.stat.reg_button = (function re_frisk$ui$stat$reg_button(key,data){
var cnt = cljs.core.count(cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,key));
var active = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,cljs.core.deref(re_frisk.ui.stat.current_reg));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),(function (){var G__40007 = new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"flex","flex",-1425124628),new cljs.core.Keyword(null,"margin","margin",-995903681),(5),new cljs.core.Keyword(null,"padding-left","padding-left",-1180879053),(4),new cljs.core.Keyword(null,"padding-right","padding-right",-1250249681),(4),new cljs.core.Keyword(null,"cursor","cursor",1011937484),new cljs.core.Keyword(null,"pointer","pointer",85071187),new cljs.core.Keyword(null,"border-radius","border-radius",419594011),(4),new cljs.core.Keyword(null,"color","color",1011675173),((active)?new cljs.core.Keyword(null,"white","white",-483998618):new cljs.core.Keyword(null,"gray","gray",1013268388))], null);
var G__40007__$1 = ((active)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40007,new cljs.core.Keyword(null,"background-color","background-color",570434026),"#df691a"):G__40007);
if((!(active))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(G__40007__$1,new cljs.core.Keyword(null,"border-width","border-width",-1512605390),(1),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"border-color","border-color",-2059162761),new cljs.core.Keyword(null,"gray","gray",1013268388),new cljs.core.Keyword(null,"border-style","border-style",-485574304),new cljs.core.Keyword(null,"solid","solid",-2023773691)], 0));
} else {
return G__40007__$1;
}
})(),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.reset_BANG_(re_frisk.ui.stat.current_reg,key);
})], null),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(key)," (",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cnt),")"].join('')], null);
});
re_frisk.ui.stat.show_copied = re_frisk.inlined_deps.reagent.v1v0v0.reagent.core.atom.cljs$core$IFn$_invoke$arity$1(null);
re_frisk.ui.stat.share_button = (function re_frisk$ui$stat$share_button(re_frame_data){
var data = cljs.core.deref(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"border-style","border-style",-485574304),new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"cursor","cursor",1011937484),new cljs.core.Keyword(null,"padding-right","padding-right",-1250249681),new cljs.core.Keyword(null,"border-width","border-width",-1512605390),new cljs.core.Keyword(null,"padding-left","padding-left",-1180879053),new cljs.core.Keyword(null,"border-color","border-color",-2059162761),new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"border-radius","border-radius",419594011),new cljs.core.Keyword(null,"margin","margin",-995903681)],[new cljs.core.Keyword(null,"solid","solid",-2023773691),"#df691a",new cljs.core.Keyword(null,"pointer","pointer",85071187),(4),(1),(4),"#df691a",new cljs.core.Keyword(null,"flex","flex",-1425124628),(4),(5)]),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
cljs.core.reset_BANG_(re_frisk.ui.stat.show_copied,true);

setTimeout((function (){
return cljs.core.reset_BANG_(re_frisk.ui.stat.show_copied,false);
}),(2000));

return re_frisk.clipboard.copy_to_clip(["*stats for my re-frame project by re-frisk* \n","db: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.deref(new cljs.core.Keyword(null,"app-db","app-db",865606302).cljs$core$IFn$_invoke$arity$1(re_frame_data))))," | ","fx: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.Keyword(null,"fx","fx",-1237829572))))," | ","cofx: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.Keyword(null,"cofx","cofx",2013202907))))," | ","event: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.Keyword(null,"event","event",301435442))))," | ","sub: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.Keyword(null,"sub","sub",-2093760025))))," (",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count(cljs.core.deref(new cljs.core.Keyword(null,"subs","subs",-186681991).cljs$core$IFn$_invoke$arity$1(re_frame_data)))),")"].join(''));
})], null),"share"], null),(cljs.core.truth_(cljs.core.deref(re_frisk.ui.stat.show_copied))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.Keyword(null,"absolute","absolute",1655386478),new cljs.core.Keyword(null,"background-color","background-color",570434026),new cljs.core.Keyword(null,"white","white",-483998618),new cljs.core.Keyword(null,"border-radius","border-radius",419594011),(4)], null)], null),"copied"], null):null)], null);
});
re_frisk.ui.stat.sort_by_key = re_frisk.inlined_deps.reagent.v1v0v0.reagent.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"cnt","cnt",283978798));
re_frisk.ui.stat.sort_fn = (function re_frisk$ui$stat$sort_fn(key,item){
var map__40033 = cljs.core.second(item);
var map__40033__$1 = cljs.core.__destructure_map(map__40033);
var cnt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40033__$1,new cljs.core.Keyword(null,"cnt","cnt",283978798));
var ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40033__$1,new cljs.core.Keyword(null,"ms","ms",-1152709733));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(key,new cljs.core.Keyword(null,"cnt","cnt",283978798))){
return cnt;
} else {
if((((ms > (0))) && ((cnt > (0))))){
return (ms / cnt);
} else {
return (0);
}
}
});
re_frisk.ui.stat.stat = (function re_frisk$ui$stat$stat(re_frame_data){
var data = cljs.core.deref(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"flex","flex",-1425124628),new cljs.core.Keyword(null,"flex","flex",-1425124628),(1),new cljs.core.Keyword(null,"background-color","background-color",570434026),"#f3f3f3",new cljs.core.Keyword(null,"color","color",1011675173),"#444444",new cljs.core.Keyword(null,"padding","padding",1660304693),(8),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"column","column",2078222095)], null)], null),new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"flex","flex",-1425124628),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"margin-bottom","margin-bottom",388334941),(8)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frisk.ui.stat.reg_button,new cljs.core.Keyword(null,"fx","fx",-1237829572),data], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frisk.ui.stat.reg_button,new cljs.core.Keyword(null,"cofx","cofx",2013202907),data], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frisk.ui.stat.reg_button,new cljs.core.Keyword(null,"event","event",301435442),data], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frisk.ui.stat.reg_button,new cljs.core.Keyword(null,"sub","sub",-2093760025),data], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"flex","flex",-1425124628),new cljs.core.Keyword(null,"flex","flex",-1425124628),(1)], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frisk.ui.stat.share_button,re_frame_data], null)], null),new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"flex","flex",-1425124628),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"solid 1px #000000"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),"100%"], null)], null),cljs.core.deref(re_frisk.ui.stat.current_reg)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),(100),new cljs.core.Keyword(null,"cursor","cursor",1011937484),new cljs.core.Keyword(null,"pointer","pointer",85071187)], null),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.reset_BANG_(re_frisk.ui.stat.sort_by_key,new cljs.core.Keyword(null,"cnt","cnt",283978798));
})], null),"runs"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"width","width",-384071477),(100),new cljs.core.Keyword(null,"cursor","cursor",1011937484),new cljs.core.Keyword(null,"pointer","pointer",85071187)], null),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (){
return cljs.core.reset_BANG_(re_frisk.ui.stat.sort_by_key,new cljs.core.Keyword(null,"ms","ms",-1152709733));
})], null),"avg. time"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frisk.ui.components.components.scroller,(function (){var iter__5523__auto__ = (function re_frisk$ui$stat$stat_$_iter__40058(s__40059){
return (new cljs.core.LazySeq(null,(function (){
var s__40059__$1 = s__40059;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__40059__$1);
if(temp__5804__auto__){
var s__40059__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__40059__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__40059__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__40062 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__40060 = (0);
while(true){
if((i__40060 < size__5522__auto__)){
var vec__40065 = cljs.core._nth(c__5521__auto__,i__40060);
var key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40065,(0),null);
var map__40068 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40065,(1),null);
var map__40068__$1 = cljs.core.__destructure_map(map__40068);
var cnt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40068__$1,new cljs.core.Keyword(null,"cnt","cnt",283978798));
var ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40068__$1,new cljs.core.Keyword(null,"ms","ms",-1152709733));
cljs.core.chunk_append(b__40062,cljs.core.with_meta(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"flex","flex",-1425124628),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"flex","flex",-1425124628),(1),new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"solid 1px #CCCCCC"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),"100%"], null)], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(key)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),(100)], null)], null),(((cnt > (0)))?cnt:null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),(100)], null)], null),(((((ms > (0))) && ((cnt > (0)))))?re_frisk.utils.str_ms((ms / cnt)):null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["item",cljs.core.str.cljs$core$IFn$_invoke$arity$1(key)].join('')], null)));

var G__40172 = (i__40060 + (1));
i__40060 = G__40172;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__40062),re_frisk$ui$stat$stat_$_iter__40058(cljs.core.chunk_rest(s__40059__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__40062),null);
}
} else {
var vec__40084 = cljs.core.first(s__40059__$2);
var key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40084,(0),null);
var map__40087 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40084,(1),null);
var map__40087__$1 = cljs.core.__destructure_map(map__40087);
var cnt = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40087__$1,new cljs.core.Keyword(null,"cnt","cnt",283978798));
var ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40087__$1,new cljs.core.Keyword(null,"ms","ms",-1152709733));
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"display","display",242065432),new cljs.core.Keyword(null,"flex","flex",-1425124628),new cljs.core.Keyword(null,"flex-direction","flex-direction",364609438),new cljs.core.Keyword(null,"row","row",-570139521),new cljs.core.Keyword(null,"flex","flex",-1425124628),(1),new cljs.core.Keyword(null,"border-bottom","border-bottom",2110948415),"solid 1px #CCCCCC"], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),"100%"], null)], null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(key)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),(100)], null)], null),(((cnt > (0)))?cnt:null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"width","width",-384071477),(100)], null)], null),(((((ms > (0))) && ((cnt > (0)))))?re_frisk.utils.str_ms((ms / cnt)):null)], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),["item",cljs.core.str.cljs$core$IFn$_invoke$arity$1(key)].join('')], null)),re_frisk$ui$stat$stat_$_iter__40058(cljs.core.rest(s__40059__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$3((function (p1__40046_SHARP_){
return re_frisk.ui.stat.sort_fn(cljs.core.deref(re_frisk.ui.stat.sort_by_key),p1__40046_SHARP_);
}),cljs.core._GT_,cljs.core.get.cljs$core$IFn$_invoke$arity$2(data,cljs.core.deref(re_frisk.ui.stat.current_reg))));
})()], null)], null);
});

//# sourceMappingURL=re_frisk.ui.stat.js.map
