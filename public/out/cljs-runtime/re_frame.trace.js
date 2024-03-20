goog.provide('re_frame.trace');
re_frame.trace.id = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
re_frame.trace._STAR_current_trace_STAR_ = null;
re_frame.trace.reset_tracing_BANG_ = (function re_frame$trace$reset_tracing_BANG_(){
return cljs.core.reset_BANG_(re_frame.trace.id,(0));
});
/**
 * @define {boolean}
 */
re_frame.trace.trace_enabled_QMARK_ = goog.define("re_frame.trace.trace_enabled_QMARK_",false);
/**
 * See https://groups.google.com/d/msg/clojurescript/jk43kmYiMhA/IHglVr_TPdgJ for more details
 */
re_frame.trace.is_trace_enabled_QMARK_ = (function re_frame$trace$is_trace_enabled_QMARK_(){
return re_frame.trace.trace_enabled_QMARK_;
});
re_frame.trace.trace_cbs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace !== 'undefined') && (typeof re_frame.trace.traces !== 'undefined')){
} else {
re_frame.trace.traces = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
}
if((typeof re_frame !== 'undefined') && (typeof re_frame.trace !== 'undefined') && (typeof re_frame.trace.next_delivery !== 'undefined')){
} else {
re_frame.trace.next_delivery = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
}
/**
 * Registers a tracing callback function which will receive a collection of one or more traces.
 *   Will replace an existing callback function if it shares the same key.
 */
re_frame.trace.register_trace_cb = (function re_frame$trace$register_trace_cb(key,f){
if(re_frame.trace.trace_enabled_QMARK_){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frame.trace.trace_cbs,cljs.core.assoc,key,f);
} else {
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Tracing is not enabled. Please set {\"re_frame.trace.trace_enabled_QMARK_\" true} in :closure-defines. See: https://github.com/day8/re-frame-10x#installation."], 0));
}
});
re_frame.trace.remove_trace_cb = (function re_frame$trace$remove_trace_cb(key){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.trace_cbs,cljs.core.dissoc,key);

return null;
});
re_frame.trace.next_id = (function re_frame$trace$next_id(){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(re_frame.trace.id,cljs.core.inc);
});
re_frame.trace.start_trace = (function re_frame$trace$start_trace(p__34635){
var map__34636 = p__34635;
var map__34636__$1 = cljs.core.__destructure_map(map__34636);
var operation = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34636__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var op_type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34636__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var tags = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34636__$1,new cljs.core.Keyword(null,"tags","tags",1771418977));
var child_of = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34636__$1,new cljs.core.Keyword(null,"child-of","child-of",-903376662));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"id","id",-1388402092),re_frame.trace.next_id(),new cljs.core.Keyword(null,"operation","operation",-1267664310),operation,new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type,new cljs.core.Keyword(null,"tags","tags",1771418977),tags,new cljs.core.Keyword(null,"child-of","child-of",-903376662),(function (){var or__5045__auto__ = child_of;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_);
}
})(),new cljs.core.Keyword(null,"start","start",-355208981),re_frame.interop.now()], null);
});
re_frame.trace.debounce_time = (50);
re_frame.trace.debounce = (function re_frame$trace$debounce(f,interval){
return goog.functions.debounce(f,interval);
});
re_frame.trace.schedule_debounce = re_frame.trace.debounce((function re_frame$trace$tracing_cb_debounced(){
var seq__34639_34700 = cljs.core.seq(cljs.core.deref(re_frame.trace.trace_cbs));
var chunk__34640_34701 = null;
var count__34641_34702 = (0);
var i__34642_34703 = (0);
while(true){
if((i__34642_34703 < count__34641_34702)){
var vec__34666_34705 = chunk__34640_34701.cljs$core$IIndexed$_nth$arity$2(null,i__34642_34703);
var k_34706 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34666_34705,(0),null);
var cb_34707 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34666_34705,(1),null);
try{var G__34672_34708 = cljs.core.deref(re_frame.trace.traces);
(cb_34707.cljs$core$IFn$_invoke$arity$1 ? cb_34707.cljs$core$IFn$_invoke$arity$1(G__34672_34708) : cb_34707.call(null,G__34672_34708));
}catch (e34669){var e_34709 = e34669;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_34706,"while storing",cljs.core.deref(re_frame.trace.traces),e_34709], 0));
}

var G__34711 = seq__34639_34700;
var G__34712 = chunk__34640_34701;
var G__34713 = count__34641_34702;
var G__34714 = (i__34642_34703 + (1));
seq__34639_34700 = G__34711;
chunk__34640_34701 = G__34712;
count__34641_34702 = G__34713;
i__34642_34703 = G__34714;
continue;
} else {
var temp__5804__auto___34715 = cljs.core.seq(seq__34639_34700);
if(temp__5804__auto___34715){
var seq__34639_34716__$1 = temp__5804__auto___34715;
if(cljs.core.chunked_seq_QMARK_(seq__34639_34716__$1)){
var c__5568__auto___34717 = cljs.core.chunk_first(seq__34639_34716__$1);
var G__34718 = cljs.core.chunk_rest(seq__34639_34716__$1);
var G__34719 = c__5568__auto___34717;
var G__34720 = cljs.core.count(c__5568__auto___34717);
var G__34721 = (0);
seq__34639_34700 = G__34718;
chunk__34640_34701 = G__34719;
count__34641_34702 = G__34720;
i__34642_34703 = G__34721;
continue;
} else {
var vec__34675_34722 = cljs.core.first(seq__34639_34716__$1);
var k_34723 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34675_34722,(0),null);
var cb_34724 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34675_34722,(1),null);
try{var G__34679_34725 = cljs.core.deref(re_frame.trace.traces);
(cb_34724.cljs$core$IFn$_invoke$arity$1 ? cb_34724.cljs$core$IFn$_invoke$arity$1(G__34679_34725) : cb_34724.call(null,G__34679_34725));
}catch (e34678){var e_34726 = e34678;
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Error thrown from trace cb",k_34723,"while storing",cljs.core.deref(re_frame.trace.traces),e_34726], 0));
}

var G__34727 = cljs.core.next(seq__34639_34716__$1);
var G__34728 = null;
var G__34729 = (0);
var G__34730 = (0);
seq__34639_34700 = G__34727;
chunk__34640_34701 = G__34728;
count__34641_34702 = G__34729;
i__34642_34703 = G__34730;
continue;
}
} else {
}
}
break;
}

return cljs.core.reset_BANG_(re_frame.trace.traces,cljs.core.PersistentVector.EMPTY);
}),re_frame.trace.debounce_time);
re_frame.trace.run_tracing_callbacks_BANG_ = (function re_frame$trace$run_tracing_callbacks_BANG_(now){
if(((cljs.core.deref(re_frame.trace.next_delivery) - (25)) < now)){
(re_frame.trace.schedule_debounce.cljs$core$IFn$_invoke$arity$0 ? re_frame.trace.schedule_debounce.cljs$core$IFn$_invoke$arity$0() : re_frame.trace.schedule_debounce.call(null));

return cljs.core.reset_BANG_(re_frame.trace.next_delivery,(now + re_frame.trace.debounce_time));
} else {
return null;
}
});

//# sourceMappingURL=re_frame.trace.js.map
