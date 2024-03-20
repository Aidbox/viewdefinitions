goog.provide('shadow.remote.runtime.tap_support');
shadow.remote.runtime.tap_support.tap_subscribe = (function shadow$remote$runtime$tap_support$tap_subscribe(p__48601,p__48602){
var map__48603 = p__48601;
var map__48603__$1 = cljs.core.__destructure_map(map__48603);
var svc = map__48603__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48603__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48603__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48603__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__48604 = p__48602;
var map__48604__$1 = cljs.core.__destructure_map(map__48604);
var msg = map__48604__$1;
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48604__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var summary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48604__$1,new cljs.core.Keyword(null,"summary","summary",380847952));
var history__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48604__$1,new cljs.core.Keyword(null,"history","history",-247395220));
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__48604__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(subs_ref,cljs.core.assoc,from,msg);

if(cljs.core.truth_(history__$1)){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-subscribed","tap-subscribed",-1882247432),new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (oid){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"oid","oid",-768692334),oid,new cljs.core.Keyword(null,"summary","summary",380847952),shadow.remote.runtime.obj_support.obj_describe_STAR_(obj_support,oid)], null);
}),shadow.remote.runtime.obj_support.get_tap_history(obj_support,num)))], null));
} else {
return null;
}
});
shadow.remote.runtime.tap_support.tap_unsubscribe = (function shadow$remote$runtime$tap_support$tap_unsubscribe(p__48614,p__48615){
var map__48616 = p__48614;
var map__48616__$1 = cljs.core.__destructure_map(map__48616);
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48616__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var map__48617 = p__48615;
var map__48617__$1 = cljs.core.__destructure_map(map__48617);
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48617__$1,new cljs.core.Keyword(null,"from","from",1815293044));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,from);
});
shadow.remote.runtime.tap_support.request_tap_history = (function shadow$remote$runtime$tap_support$request_tap_history(p__48620,p__48621){
var map__48622 = p__48620;
var map__48622__$1 = cljs.core.__destructure_map(map__48622);
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48622__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48622__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__48623 = p__48621;
var map__48623__$1 = cljs.core.__destructure_map(map__48623);
var msg = map__48623__$1;
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__48623__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
var tap_ids = shadow.remote.runtime.obj_support.get_tap_history(obj_support,num);
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-history","tap-history",-282803347),new cljs.core.Keyword(null,"oids","oids",-1580877688),tap_ids], null));
});
shadow.remote.runtime.tap_support.tool_disconnect = (function shadow$remote$runtime$tap_support$tool_disconnect(p__48631,tid){
var map__48632 = p__48631;
var map__48632__$1 = cljs.core.__destructure_map(map__48632);
var svc = map__48632__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48632__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,tid);
});
shadow.remote.runtime.tap_support.start = (function shadow$remote$runtime$tap_support$start(runtime,obj_support){
var subs_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var tap_fn = (function shadow$remote$runtime$tap_support$start_$_runtime_tap(obj){
if((!((obj == null)))){
var oid = shadow.remote.runtime.obj_support.register(obj_support,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"from","from",1815293044),new cljs.core.Keyword(null,"tap","tap",-1086702463)], null));
var seq__48642 = cljs.core.seq(cljs.core.deref(subs_ref));
var chunk__48643 = null;
var count__48644 = (0);
var i__48645 = (0);
while(true){
if((i__48645 < count__48644)){
var vec__48653 = chunk__48643.cljs$core$IIndexed$_nth$arity$2(null,i__48645);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48653,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48653,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__48661 = seq__48642;
var G__48662 = chunk__48643;
var G__48663 = count__48644;
var G__48664 = (i__48645 + (1));
seq__48642 = G__48661;
chunk__48643 = G__48662;
count__48644 = G__48663;
i__48645 = G__48664;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__48642);
if(temp__5804__auto__){
var seq__48642__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__48642__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__48642__$1);
var G__48665 = cljs.core.chunk_rest(seq__48642__$1);
var G__48666 = c__5568__auto__;
var G__48667 = cljs.core.count(c__5568__auto__);
var G__48668 = (0);
seq__48642 = G__48665;
chunk__48643 = G__48666;
count__48644 = G__48667;
i__48645 = G__48668;
continue;
} else {
var vec__48656 = cljs.core.first(seq__48642__$1);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48656,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48656,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__48669 = cljs.core.next(seq__48642__$1);
var G__48670 = null;
var G__48671 = (0);
var G__48672 = (0);
seq__48642 = G__48669;
chunk__48643 = G__48670;
count__48644 = G__48671;
i__48645 = G__48672;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
var svc = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229),obj_support,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461),tap_fn,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911),subs_ref], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tap-subscribe","tap-subscribe",411179050),(function (p1__48633_SHARP_){
return shadow.remote.runtime.tap_support.tap_subscribe(svc,p1__48633_SHARP_);
}),new cljs.core.Keyword(null,"tap-unsubscribe","tap-unsubscribe",1183890755),(function (p1__48634_SHARP_){
return shadow.remote.runtime.tap_support.tap_unsubscribe(svc,p1__48634_SHARP_);
}),new cljs.core.Keyword(null,"request-tap-history","request-tap-history",-670837812),(function (p1__48635_SHARP_){
return shadow.remote.runtime.tap_support.request_tap_history(svc,p1__48635_SHARP_);
})], null),new cljs.core.Keyword(null,"on-tool-disconnect","on-tool-disconnect",693464366),(function (p1__48637_SHARP_){
return shadow.remote.runtime.tap_support.tool_disconnect(svc,p1__48637_SHARP_);
})], null));

cljs.core.add_tap(tap_fn);

return svc;
});
shadow.remote.runtime.tap_support.stop = (function shadow$remote$runtime$tap_support$stop(p__48659){
var map__48660 = p__48659;
var map__48660__$1 = cljs.core.__destructure_map(map__48660);
var svc = map__48660__$1;
var tap_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48660__$1,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48660__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
cljs.core.remove_tap(tap_fn);

return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674));
});

//# sourceMappingURL=shadow.remote.runtime.tap_support.js.map
