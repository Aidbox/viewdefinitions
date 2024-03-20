goog.provide('re_frisk.trace');
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.trace !== 'undefined') && (typeof re_frisk.trace.mounted_views !== 'undefined')){
} else {
re_frisk.trace.mounted_views = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.trace !== 'undefined') && (typeof re_frisk.trace.call_state !== 'undefined')){
} else {
re_frisk.trace.call_state = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
re_frisk.trace.call_and_chill = (function re_frisk$trace$call_and_chill(handler){
if(cljs.core.truth_(cljs.core.deref(re_frisk.trace.call_state))){
return cljs.core.reset_BANG_(re_frisk.trace.call_state,new cljs.core.Keyword(null,"call","call",-519999866));
} else {
cljs.core.reset_BANG_(re_frisk.trace.call_state,new cljs.core.Keyword(null,"chill","chill",-2000479862));

setTimeout(re_frisk.trace.call_timeout,(500),handler);

return setTimeout(handler);
}
});
re_frisk.trace.call_timeout = (function re_frisk$trace$call_timeout(handler){
var state = cljs.core.deref(re_frisk.trace.call_state);
cljs.core.reset_BANG_(re_frisk.trace.call_state,null);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.Keyword(null,"call","call",-519999866))){
return re_frisk.trace.call_and_chill(handler);
} else {
return null;
}
});
re_frisk.trace.update_views_and_get_traces = (function re_frisk$trace$update_views_and_get_traces(send_views,traces){
re_frisk.trace.call_and_chill((function (){
var G__40383 = cljs.core.deref(re_frisk.trace.mounted_views);
return (send_views.cljs$core$IFn$_invoke$arity$1 ? send_views.cljs$core$IFn$_invoke$arity$1(G__40383) : send_views.call(null,G__40383));
}));

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (items,p__40385){
var map__40386 = p__40385;
var map__40386__$1 = cljs.core.__destructure_map(map__40386);
var item = map__40386__$1;
var op_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40386__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var operation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40386__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40386__$1,new cljs.core.Keyword(null,"tags","tags",1771418977));
var op_type__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(op_type),"sub"))?new cljs.core.Keyword(null,"sub","sub",-2093760025):op_type);
if(cljs.core.truth_((function (){var fexpr__40387 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 10, [new cljs.core.Keyword(null,"raf-end","raf-end",-220596864),null,new cljs.core.Keyword(null,"should-upd","should-upd",2083082179),null,new cljs.core.Keyword(null,"sub","sub",-2093760025),null,new cljs.core.Keyword("event","handler","event/handler",-295903150),null,new cljs.core.Keyword(null,"render","render",-1408033454),null,new cljs.core.Keyword(null,"event","event",301435442),null,new cljs.core.Keyword(null,"force-update","force-update",725693267),null,new cljs.core.Keyword("event","do-fx","event/do-fx",1357330452),null,new cljs.core.Keyword(null,"create-class","create-class",1988524183),null,new cljs.core.Keyword(null,"raf","raf",-1295410152),null], null), null);
return (fexpr__40387.cljs$core$IFn$_invoke$arity$1 ? fexpr__40387.cljs$core$IFn$_invoke$arity$1(op_type__$1) : fexpr__40387.call(null,op_type__$1));
})())){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(items,item);
} else {
if(cljs.core.truth_((function (){var fexpr__40391 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"componentWillUnmount","componentWillUnmount",1573788814),null,new cljs.core.Keyword(null,"componentDidMount","componentDidMount",955710936),null], null), null);
return (fexpr__40391.cljs$core$IFn$_invoke$arity$1 ? fexpr__40391.cljs$core$IFn$_invoke$arity$1(op_type__$1) : fexpr__40391.call(null,op_type__$1));
})())){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type__$1,new cljs.core.Keyword(null,"componentDidMount","componentDidMount",955710936))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.trace.mounted_views,cljs.core.assoc,operation,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),operation,new cljs.core.Keyword(null,"order","order",-1254677256),new cljs.core.Keyword(null,"order","order",-1254677256).cljs$core$IFn$_invoke$arity$1(tags)], null));
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frisk.trace.mounted_views,cljs.core.dissoc,operation);
}
} else {
}

return items;
}
}),cljs.core.PersistentVector.EMPTY,traces);
});
re_frisk.trace.normalize_traces = (function re_frisk$trace$normalize_traces(traces,ignore_events){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (items,p__40406){
var map__40407 = p__40406;
var map__40407__$1 = cljs.core.__destructure_map(map__40407);
var trace = map__40407__$1;
var op_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40407__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40407__$1,new cljs.core.Keyword(null,"tags","tags",1771418977));
var duration = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40407__$1,new cljs.core.Keyword(null,"duration","duration",1444101068));
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40407__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var op_type__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(op_type),"sub"))?new cljs.core.Keyword(null,"sub","sub",-2093760025):op_type);
var item = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"indx","indx",1571035590),id,new cljs.core.Keyword(null,"trace?","trace?",1730690679),true], null);
var G__40408 = op_type__$1;
var G__40408__$1 = (((G__40408 instanceof cljs.core.Keyword))?G__40408.fqn:null);
switch (G__40408__$1) {
case "event":
if(((cljs.core.not(ignore_events)) || (cljs.core.not(cljs.core.get.cljs$core$IFn$_invoke$arity$2(ignore_events,cljs.core.first(new cljs.core.Keyword(null,"event","event",301435442).cljs$core$IFn$_invoke$arity$1(tags))))))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(items,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(item,new cljs.core.Keyword(null,"trace?","trace?",1730690679)),cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(cljs.core.select_keys(trace,new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"op-type","op-type",-1636141668),new cljs.core.Keyword(null,"operation","operation",-1267664310),new cljs.core.Keyword(null,"duration","duration",1444101068),new cljs.core.Keyword(null,"start","start",-355208981),new cljs.core.Keyword(null,"end","end",-268185958),new cljs.core.Keyword(null,"effects","effects",-282369292),new cljs.core.Keyword(null,"coeffects","coeffects",497912985)], null)),new cljs.core.Keyword(null,"event","event",301435442),new cljs.core.Keyword(null,"event","event",301435442).cljs$core$IFn$_invoke$arity$1(tags),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"effects","effects",-282369292),(function (){var G__40412 = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(tags);
if(cljs.core.truth_(new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(tags)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40412,new cljs.core.Keyword(null,"db","db",993250759),cljs.core.PersistentArrayMap.EMPTY);
} else {
return G__40412;
}
})(),new cljs.core.Keyword(null,"coeffects","coeffects",497912985),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"coeffects","coeffects",497912985).cljs$core$IFn$_invoke$arity$1(tags),new cljs.core.Keyword(null,"db","db",993250759),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"event","event",301435442),new cljs.core.Keyword(null,"original-event","original-event",2121330403)], 0)),new cljs.core.Keyword(null,"truncated-name","truncated-name",1771353320),re_frisk.utils.truncate_name(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(new cljs.core.Keyword(null,"event","event",301435442).cljs$core$IFn$_invoke$arity$1(tags)))),new cljs.core.Keyword(null,"app-db-diff","app-db-diff",709588713),re_frisk.diff.diff.diff(new cljs.core.Keyword(null,"app-db-before","app-db-before",-1442902645).cljs$core$IFn$_invoke$arity$1(tags),new cljs.core.Keyword(null,"app-db-after","app-db-after",1477492964).cljs$core$IFn$_invoke$arity$1(tags))], 0))], 0)));
} else {
return null;
}

break;
case "event/handler":
var prev = cljs.core.peek(items);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op-type","op-type",-1636141668).cljs$core$IFn$_invoke$arity$1(prev),new cljs.core.Keyword(null,"event","event",301435442))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.pop(items),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(prev,new cljs.core.Keyword(null,"handler-duration","handler-duration",262132324),duration));
} else {
return null;
}

break;
case "event/do-fx":
var prev = cljs.core.peek(items);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"op-type","op-type",-1636141668).cljs$core$IFn$_invoke$arity$1(prev),new cljs.core.Keyword(null,"event","event",301435442))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.pop(items),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(prev,new cljs.core.Keyword(null,"fx-duration","fx-duration",1796312432),duration));
} else {
return null;
}

break;
case "sub":
case "render":
case "force-update":
case "create-class":
case "should-upd":
var prev = cljs.core.peek(items);
var trace__$1 = cljs.core.select_keys(trace,new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"op-type","op-type",-1636141668),new cljs.core.Keyword(null,"operation","operation",-1267664310),new cljs.core.Keyword(null,"duration","duration",1444101068),new cljs.core.Keyword(null,"start","start",-355208981),new cljs.core.Keyword(null,"end","end",-268185958)], null));
var trace__$2 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(trace__$1,new cljs.core.Keyword(null,"duration-ms","duration-ms",1993555055),re_frisk.utils.str_ms(new cljs.core.Keyword(null,"duration","duration",1444101068).cljs$core$IFn$_invoke$arity$1(trace__$1)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"reaction","reaction",490869788),new cljs.core.Keyword(null,"reaction","reaction",490869788).cljs$core$IFn$_invoke$arity$1(tags),new cljs.core.Keyword(null,"cached?","cached?",86081880),new cljs.core.Keyword(null,"cached?","cached?",86081880).cljs$core$IFn$_invoke$arity$1(tags),new cljs.core.Keyword(null,"input-signals","input-signals",563633497),new cljs.core.Keyword(null,"input-signals","input-signals",563633497).cljs$core$IFn$_invoke$arity$1(tags)], 0));
if(cljs.core.truth_((function (){var and__5043__auto__ = new cljs.core.Keyword(null,"subs?","subs?",-2085240020).cljs$core$IFn$_invoke$arity$1(prev);
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.not(new cljs.core.Keyword(null,"raf-end","raf-end",-220596864).cljs$core$IFn$_invoke$arity$1(prev));
} else {
return and__5043__auto__;
}
})())){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.pop(items),cljs.core.update.cljs$core$IFn$_invoke$arity$4(prev,new cljs.core.Keyword(null,"subs","subs",-186681991),cljs.core.conj,trace__$2));
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(items,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([item,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"op-type","op-type",-1636141668),new cljs.core.Keyword(null,"subs","subs",-186681991),new cljs.core.Keyword(null,"subs?","subs?",-2085240020),true,new cljs.core.Keyword(null,"subs","subs",-186681991),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [trace__$2], null),new cljs.core.Keyword(null,"app-db-reaction","app-db-reaction",-269835135),re_frame.interop.reagent_id(re_frame.db.app_db),new cljs.core.Keyword(null,"start","start",-355208981),new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(trace__$2)], null)], 0)));
}

break;
case "raf":
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(items,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([item,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"op-type","op-type",-1636141668),new cljs.core.Keyword(null,"subs","subs",-186681991),new cljs.core.Keyword(null,"subs?","subs?",-2085240020),true,new cljs.core.Keyword(null,"subs","subs",-186681991),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"app-db-reaction","app-db-reaction",-269835135),re_frame.interop.reagent_id(re_frame.db.app_db),new cljs.core.Keyword(null,"start","start",-355208981),new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(trace),new cljs.core.Keyword(null,"raf","raf",-1295410152),cljs.core.select_keys(trace,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sart","sart",494017943),new cljs.core.Keyword(null,"end","end",-268185958),new cljs.core.Keyword(null,"duration","duration",1444101068)], null))], null)], 0)));

break;
case "raf-end":
var prev = cljs.core.peek(items);
if(cljs.core.empty_QMARK_(new cljs.core.Keyword(null,"subs","subs",-186681991).cljs$core$IFn$_invoke$arity$1(prev))){
return cljs.core.pop(items);
} else {
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.pop(items),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(prev,new cljs.core.Keyword(null,"raf-end","raf-end",-220596864),true));
}

break;
default:
return items;

}
}),cljs.core.PersistentVector.EMPTY,cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"id","id",-1388402092),traces));
});
re_frisk.trace.normalize_durations = (function re_frisk$trace$normalize_durations(first_event){
return (function (p__40445){
var map__40451 = p__40445;
var map__40451__$1 = cljs.core.__destructure_map(map__40451);
var trace = map__40451__$1;
var subs_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40451__$1,new cljs.core.Keyword(null,"subs?","subs?",-2085240020));
var subs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40451__$1,new cljs.core.Keyword(null,"subs","subs",-186681991));
var op_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40451__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var handler_duration = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40451__$1,new cljs.core.Keyword(null,"handler-duration","handler-duration",262132324));
var fx_duration = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40451__$1,new cljs.core.Keyword(null,"fx-duration","fx-duration",1796312432));
var raf = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40451__$1,new cljs.core.Keyword(null,"raf","raf",-1295410152));
var map__40469 = (cljs.core.truth_(subs_QMARK_)?cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([trace,cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (acc,p__40477){
var map__40478 = p__40477;
var map__40478__$1 = cljs.core.__destructure_map(map__40478);
var duration = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40478__$1,new cljs.core.Keyword(null,"duration","duration",1444101068));
var op_type__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40478__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var end = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40478__$1,new cljs.core.Keyword(null,"end","end",-268185958));
var cached_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40478__$1,new cljs.core.Keyword(null,"cached?","cached?",86081880));
var G__40482 = cljs.core.update.cljs$core$IFn$_invoke$arity$4(acc,new cljs.core.Keyword(null,"duration","duration",1444101068),cljs.core._PLUS_,duration);
var G__40482__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40482,new cljs.core.Keyword(null,"end","end",-268185958),end)
;
var G__40482__$2 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type__$1,new cljs.core.Keyword("sub","run","sub/run",-1821315581)))?cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$3(G__40482__$1,new cljs.core.Keyword(null,"run-count","run-count",-924546145),cljs.core.inc),new cljs.core.Keyword(null,"run-duration","run-duration",1321930251),cljs.core._PLUS_,duration):G__40482__$1);
var G__40482__$3 = ((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type__$1,new cljs.core.Keyword("sub","create","sub/create",-1301317560))) && (cljs.core.not(cached_QMARK_))))?cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$3(G__40482__$2,new cljs.core.Keyword(null,"created-count","created-count",-1708534686),cljs.core.inc),new cljs.core.Keyword(null,"created-duration","created-duration",-1526658187),cljs.core._PLUS_,duration):G__40482__$2);
var G__40482__$4 = (cljs.core.truth_((function (){var and__5043__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type__$1,new cljs.core.Keyword("sub","create","sub/create",-1301317560));
if(and__5043__auto__){
return cached_QMARK_;
} else {
return and__5043__auto__;
}
})())?cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$3(G__40482__$3,new cljs.core.Keyword(null,"created-count-cached","created-count-cached",1601348000),cljs.core.inc),new cljs.core.Keyword(null,"created-duration-cached","created-duration-cached",1269460585),cljs.core._PLUS_,duration):G__40482__$3);
var G__40482__$5 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type__$1,new cljs.core.Keyword("sub","dispose","sub/dispose",365440536)))?cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$3(G__40482__$4,new cljs.core.Keyword(null,"disposed-count","disposed-count",-457935431),cljs.core.inc),new cljs.core.Keyword(null,"disposed-duration","disposed-duration",-1737482274),cljs.core._PLUS_,duration):G__40482__$4);
var G__40482__$6 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type__$1,new cljs.core.Keyword(null,"render","render",-1408033454)))?cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$3(G__40482__$5,new cljs.core.Keyword(null,"render-count","render-count",-875399191),cljs.core.inc),new cljs.core.Keyword(null,"render-duration","render-duration",1704092121),cljs.core._PLUS_,duration):G__40482__$5);
var G__40482__$7 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type__$1,new cljs.core.Keyword(null,"force-update","force-update",725693267)))?cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$3(G__40482__$6,new cljs.core.Keyword(null,"force-count","force-count",-1461582262),cljs.core.inc),new cljs.core.Keyword(null,"force-duration","force-duration",1698459955),cljs.core._PLUS_,duration):G__40482__$6);
var G__40482__$8 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type__$1,new cljs.core.Keyword(null,"create-class","create-class",1988524183)))?cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$3(G__40482__$7,new cljs.core.Keyword(null,"create-class-count","create-class-count",910108481),cljs.core.inc),new cljs.core.Keyword(null,"create-class-duration","create-class-duration",-403862588),cljs.core._PLUS_,duration):G__40482__$7);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type__$1,new cljs.core.Keyword(null,"should-upd","should-upd",2083082179))){
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$3(G__40482__$8,new cljs.core.Keyword(null,"shoud-update-count","shoud-update-count",-223224198),cljs.core.inc),new cljs.core.Keyword(null,"shoud-update-duration","shoud-update-duration",-61825976),cljs.core._PLUS_,duration);
} else {
return G__40482__$8;
}
}),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"created-count-cached","created-count-cached",1601348000),new cljs.core.Keyword(null,"create-class-count","create-class-count",910108481),new cljs.core.Keyword(null,"created-count","created-count",-1708534686),new cljs.core.Keyword(null,"create-class-duration","create-class-duration",-403862588),new cljs.core.Keyword(null,"shoud-update-duration","shoud-update-duration",-61825976),new cljs.core.Keyword(null,"created-duration-cached","created-duration-cached",1269460585),new cljs.core.Keyword(null,"render-count","render-count",-875399191),new cljs.core.Keyword(null,"force-count","force-count",-1461582262),new cljs.core.Keyword(null,"run-duration","run-duration",1321930251),new cljs.core.Keyword(null,"duration","duration",1444101068),new cljs.core.Keyword(null,"force-duration","force-duration",1698459955),new cljs.core.Keyword(null,"created-duration","created-duration",-1526658187),new cljs.core.Keyword(null,"disposed-count","disposed-count",-457935431),new cljs.core.Keyword(null,"render-duration","render-duration",1704092121),new cljs.core.Keyword(null,"shoud-update-count","shoud-update-count",-223224198),new cljs.core.Keyword(null,"disposed-duration","disposed-duration",-1737482274),new cljs.core.Keyword(null,"run-count","run-count",-924546145)],[(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0),(0)]),subs),(cljs.core.truth_(raf)?raf:null)], 0)):((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type,new cljs.core.Keyword(null,"event","event",301435442)))?(function (){var handler_fx_duration = (handler_duration + fx_duration);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(trace,new cljs.core.Keyword(null,"handler-fx-duration","handler-fx-duration",1974562002),handler_fx_duration,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"handler-fx-duration-ms","handler-fx-duration-ms",-118285662),re_frisk.utils.str_ms(handler_fx_duration)], 0));
})():trace
));
var map__40469__$1 = cljs.core.__destructure_map(map__40469);
var trace__$1 = map__40469__$1;
var render_duration = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40469__$1,new cljs.core.Keyword(null,"render-duration","render-duration",1704092121));
var disposed_duration = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40469__$1,new cljs.core.Keyword(null,"disposed-duration","disposed-duration",-1737482274));
var handler_duration__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40469__$1,new cljs.core.Keyword(null,"handler-duration","handler-duration",262132324));
var create_class_duration = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40469__$1,new cljs.core.Keyword(null,"create-class-duration","create-class-duration",-403862588));
var shoud_update_duration = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40469__$1,new cljs.core.Keyword(null,"shoud-update-duration","shoud-update-duration",-61825976));
var created_duration_cached = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40469__$1,new cljs.core.Keyword(null,"created-duration-cached","created-duration-cached",1269460585));
var run_duration = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40469__$1,new cljs.core.Keyword(null,"run-duration","run-duration",1321930251));
var start = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40469__$1,new cljs.core.Keyword(null,"start","start",-355208981));
var duration = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40469__$1,new cljs.core.Keyword(null,"duration","duration",1444101068));
var fx_duration__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40469__$1,new cljs.core.Keyword(null,"fx-duration","fx-duration",1796312432));
var force_duration = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40469__$1,new cljs.core.Keyword(null,"force-duration","force-duration",1698459955));
var created_duration = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40469__$1,new cljs.core.Keyword(null,"created-duration","created-duration",-1526658187));
var G__40535 = trace__$1;
var G__40535__$1 = (cljs.core.truth_(duration)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40535,new cljs.core.Keyword(null,"duration-ms","duration-ms",1993555055),re_frisk.utils.str_ms(duration)):G__40535);
var G__40535__$2 = (cljs.core.truth_(handler_duration__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40535__$1,new cljs.core.Keyword(null,"handler-duration-ms","handler-duration-ms",-491924416),re_frisk.utils.str_ms(handler_duration__$1)):G__40535__$1);
var G__40535__$3 = (cljs.core.truth_(fx_duration__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40535__$2,new cljs.core.Keyword(null,"fx-duration-ms","fx-duration-ms",-1014211328),re_frisk.utils.str_ms(fx_duration__$1)):G__40535__$2);
var G__40535__$4 = (cljs.core.truth_(run_duration)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40535__$3,new cljs.core.Keyword(null,"run-duration-ms","run-duration-ms",-1510786585),re_frisk.utils.str_ms(run_duration)):G__40535__$3);
var G__40535__$5 = (cljs.core.truth_(created_duration)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40535__$4,new cljs.core.Keyword(null,"created-duration-ms","created-duration-ms",1987553257),re_frisk.utils.str_ms(created_duration)):G__40535__$4);
var G__40535__$6 = (cljs.core.truth_(created_duration_cached)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40535__$5,new cljs.core.Keyword(null,"created-duration-cached-ms","created-duration-cached-ms",1699705669),re_frisk.utils.str_ms(created_duration_cached)):G__40535__$5);
var G__40535__$7 = (cljs.core.truth_(disposed_duration)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40535__$6,new cljs.core.Keyword(null,"disposed-duration-ms","disposed-duration-ms",-1456969189),re_frisk.utils.str_ms(disposed_duration)):G__40535__$6);
var G__40535__$8 = (cljs.core.truth_(render_duration)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40535__$7,new cljs.core.Keyword(null,"render-duration-ms","render-duration-ms",-757772115),re_frisk.utils.str_ms(render_duration)):G__40535__$7);
var G__40535__$9 = (cljs.core.truth_(create_class_duration)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40535__$8,new cljs.core.Keyword(null,"create-class-duration-ms","create-class-duration-ms",1922479072),re_frisk.utils.str_ms(create_class_duration)):G__40535__$8);
var G__40535__$10 = (cljs.core.truth_(shoud_update_duration)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40535__$9,new cljs.core.Keyword(null,"shoud-update-duration-ms","shoud-update-duration-ms",-709397855),re_frisk.utils.str_ms(shoud_update_duration)):G__40535__$9);
var G__40535__$11 = (cljs.core.truth_(force_duration)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40535__$10,new cljs.core.Keyword(null,"force-duration-ms","force-duration-ms",-1303688737),re_frisk.utils.str_ms(force_duration)):G__40535__$10);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40535__$11,new cljs.core.Keyword(null,"position","position",-2011731912),(start - new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(first_event)));

});
});

//# sourceMappingURL=re_frisk.trace.js.map
