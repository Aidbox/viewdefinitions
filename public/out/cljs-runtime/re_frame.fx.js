goog.provide('re_frame.fx');
re_frame.fx.kind = new cljs.core.Keyword(null,"fx","fx",-1237829572);
if(cljs.core.truth_((re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1 ? re_frame.registrar.kinds.cljs$core$IFn$_invoke$arity$1(re_frame.fx.kind) : re_frame.registrar.kinds.call(null,re_frame.fx.kind)))){
} else {
throw (new Error("Assert failed: (re-frame.registrar/kinds kind)"));
}
re_frame.fx.reg_fx = (function re_frame$fx$reg_fx(id,handler){
return re_frame.registrar.register_handler(re_frame.fx.kind,id,handler);
});
/**
 * An interceptor whose `:after` actions the contents of `:effects`. As a result,
 *   this interceptor is Domino 3.
 * 
 *   This interceptor is silently added (by reg-event-db etc) to the front of
 *   interceptor chains for all events.
 * 
 *   For each key in `:effects` (a map), it calls the registered `effects handler`
 *   (see `reg-fx` for registration of effect handlers).
 * 
 *   So, if `:effects` was:
 *    {:dispatch  [:hello 42]
 *     :db        {...}
 *     :undo      "set flag"}
 * 
 *   it will call the registered effect handlers for each of the map's keys:
 *   `:dispatch`, `:undo` and `:db`. When calling each handler, provides the map
 *   value for that key - so in the example above the effect handler for :dispatch
 *   will be given one arg `[:hello 42]`.
 * 
 *   You cannot rely on the ordering in which effects are executed, other than that
 *   `:db` is guaranteed to be executed first.
 */
re_frame.fx.do_fx = re_frame.interceptor.__GT_interceptor.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"do-fx","do-fx",1194163050),new cljs.core.Keyword(null,"after","after",594996914),(function re_frame$fx$do_fx_after(context){
if(re_frame.trace.is_trace_enabled_QMARK_()){
var _STAR_current_trace_STAR__orig_val__35370 = re_frame.trace._STAR_current_trace_STAR_;
var _STAR_current_trace_STAR__temp_val__35371 = re_frame.trace.start_trace(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op-type","op-type",-1636141668),new cljs.core.Keyword("event","do-fx","event/do-fx",1357330452)], null));
(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__temp_val__35371);

try{try{var effects = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
var temp__5804__auto___35542 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5804__auto___35542)){
var new_db_35544 = temp__5804__auto___35542;
var fexpr__35396_35545 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,new cljs.core.Keyword(null,"db","db",993250759),false);
(fexpr__35396_35545.cljs$core$IFn$_invoke$arity$1 ? fexpr__35396_35545.cljs$core$IFn$_invoke$arity$1(new_db_35544) : fexpr__35396_35545.call(null,new_db_35544));
} else {
}

var seq__35397 = cljs.core.seq(effects_without_db);
var chunk__35398 = null;
var count__35399 = (0);
var i__35400 = (0);
while(true){
if((i__35400 < count__35399)){
var vec__35424 = chunk__35398.cljs$core$IIndexed$_nth$arity$2(null,i__35400);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35424,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35424,(1),null);
var temp__5802__auto___35548 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5802__auto___35548)){
var effect_fn_35549 = temp__5802__auto___35548;
(effect_fn_35549.cljs$core$IFn$_invoke$arity$1 ? effect_fn_35549.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_35549.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__35550 = seq__35397;
var G__35551 = chunk__35398;
var G__35552 = count__35399;
var G__35553 = (i__35400 + (1));
seq__35397 = G__35550;
chunk__35398 = G__35551;
count__35399 = G__35552;
i__35400 = G__35553;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__35397);
if(temp__5804__auto__){
var seq__35397__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__35397__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__35397__$1);
var G__35554 = cljs.core.chunk_rest(seq__35397__$1);
var G__35555 = c__5568__auto__;
var G__35556 = cljs.core.count(c__5568__auto__);
var G__35557 = (0);
seq__35397 = G__35554;
chunk__35398 = G__35555;
count__35399 = G__35556;
i__35400 = G__35557;
continue;
} else {
var vec__35432 = cljs.core.first(seq__35397__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35432,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35432,(1),null);
var temp__5802__auto___35558 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5802__auto___35558)){
var effect_fn_35559 = temp__5802__auto___35558;
(effect_fn_35559.cljs$core$IFn$_invoke$arity$1 ? effect_fn_35559.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_35559.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__35560 = cljs.core.next(seq__35397__$1);
var G__35561 = null;
var G__35562 = (0);
var G__35563 = (0);
seq__35397 = G__35560;
chunk__35398 = G__35561;
count__35399 = G__35562;
i__35400 = G__35563;
continue;
}
} else {
return null;
}
}
break;
}
}finally {if(re_frame.trace.is_trace_enabled_QMARK_()){
var end__34565__auto___35564 = re_frame.interop.now();
var duration__34566__auto___35565 = (end__34565__auto___35564 - new cljs.core.Keyword(null,"start","start",-355208981).cljs$core$IFn$_invoke$arity$1(re_frame.trace._STAR_current_trace_STAR_));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frame.trace.traces,cljs.core.conj,cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(re_frame.trace._STAR_current_trace_STAR_,new cljs.core.Keyword(null,"duration","duration",1444101068),duration__34566__auto___35565,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"end","end",-268185958),re_frame.interop.now()], 0)));

re_frame.trace.run_tracing_callbacks_BANG_(end__34565__auto___35564);
} else {
}
}}finally {(re_frame.trace._STAR_current_trace_STAR_ = _STAR_current_trace_STAR__orig_val__35370);
}} else {
var effects = new cljs.core.Keyword(null,"effects","effects",-282369292).cljs$core$IFn$_invoke$arity$1(context);
var effects_without_db = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(effects,new cljs.core.Keyword(null,"db","db",993250759));
var temp__5804__auto___35566 = new cljs.core.Keyword(null,"db","db",993250759).cljs$core$IFn$_invoke$arity$1(effects);
if(cljs.core.truth_(temp__5804__auto___35566)){
var new_db_35567 = temp__5804__auto___35566;
var fexpr__35436_35568 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,new cljs.core.Keyword(null,"db","db",993250759),false);
(fexpr__35436_35568.cljs$core$IFn$_invoke$arity$1 ? fexpr__35436_35568.cljs$core$IFn$_invoke$arity$1(new_db_35567) : fexpr__35436_35568.call(null,new_db_35567));
} else {
}

var seq__35437 = cljs.core.seq(effects_without_db);
var chunk__35438 = null;
var count__35439 = (0);
var i__35440 = (0);
while(true){
if((i__35440 < count__35439)){
var vec__35459 = chunk__35438.cljs$core$IIndexed$_nth$arity$2(null,i__35440);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35459,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35459,(1),null);
var temp__5802__auto___35571 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5802__auto___35571)){
var effect_fn_35572 = temp__5802__auto___35571;
(effect_fn_35572.cljs$core$IFn$_invoke$arity$1 ? effect_fn_35572.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_35572.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__35573 = seq__35437;
var G__35574 = chunk__35438;
var G__35575 = count__35439;
var G__35576 = (i__35440 + (1));
seq__35437 = G__35573;
chunk__35438 = G__35574;
count__35439 = G__35575;
i__35440 = G__35576;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__35437);
if(temp__5804__auto__){
var seq__35437__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__35437__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__35437__$1);
var G__35577 = cljs.core.chunk_rest(seq__35437__$1);
var G__35578 = c__5568__auto__;
var G__35579 = cljs.core.count(c__5568__auto__);
var G__35580 = (0);
seq__35437 = G__35577;
chunk__35438 = G__35578;
count__35439 = G__35579;
i__35440 = G__35580;
continue;
} else {
var vec__35471 = cljs.core.first(seq__35437__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35471,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35471,(1),null);
var temp__5802__auto___35581 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5802__auto___35581)){
var effect_fn_35582 = temp__5802__auto___35581;
(effect_fn_35582.cljs$core$IFn$_invoke$arity$1 ? effect_fn_35582.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_35582.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: no handler registered for effect:",effect_key,". Ignoring."], 0));
}


var G__35583 = cljs.core.next(seq__35437__$1);
var G__35584 = null;
var G__35585 = (0);
var G__35586 = (0);
seq__35437 = G__35583;
chunk__35438 = G__35584;
count__35439 = G__35585;
i__35440 = G__35586;
continue;
}
} else {
return null;
}
}
break;
}
}
})], 0));
re_frame.fx.dispatch_later = (function re_frame$fx$dispatch_later(p__35481){
var map__35482 = p__35481;
var map__35482__$1 = cljs.core.__destructure_map(map__35482);
var effect = map__35482__$1;
var ms = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35482__$1,new cljs.core.Keyword(null,"ms","ms",-1152709733));
var dispatch = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35482__$1,new cljs.core.Keyword(null,"dispatch","dispatch",1319337009));
if(((cljs.core.empty_QMARK_(dispatch)) || ((!(typeof ms === 'number'))))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch-later value:",effect], 0));
} else {
return re_frame.interop.set_timeout_BANG_((function (){
return re_frame.router.dispatch(dispatch);
}),ms);
}
});
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch-later","dispatch-later",291951390),(function (value){
if(cljs.core.map_QMARK_(value)){
return re_frame.fx.dispatch_later(value);
} else {
var seq__35487 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__35488 = null;
var count__35489 = (0);
var i__35490 = (0);
while(true){
if((i__35490 < count__35489)){
var effect = chunk__35488.cljs$core$IIndexed$_nth$arity$2(null,i__35490);
re_frame.fx.dispatch_later(effect);


var G__35587 = seq__35487;
var G__35588 = chunk__35488;
var G__35589 = count__35489;
var G__35590 = (i__35490 + (1));
seq__35487 = G__35587;
chunk__35488 = G__35588;
count__35489 = G__35589;
i__35490 = G__35590;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__35487);
if(temp__5804__auto__){
var seq__35487__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__35487__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__35487__$1);
var G__35591 = cljs.core.chunk_rest(seq__35487__$1);
var G__35592 = c__5568__auto__;
var G__35593 = cljs.core.count(c__5568__auto__);
var G__35594 = (0);
seq__35487 = G__35591;
chunk__35488 = G__35592;
count__35489 = G__35593;
i__35490 = G__35594;
continue;
} else {
var effect = cljs.core.first(seq__35487__$1);
re_frame.fx.dispatch_later(effect);


var G__35595 = cljs.core.next(seq__35487__$1);
var G__35596 = null;
var G__35597 = (0);
var G__35598 = (0);
seq__35487 = G__35595;
chunk__35488 = G__35596;
count__35489 = G__35597;
i__35490 = G__35598;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"fx","fx",-1237829572),(function (seq_of_effects){
if((!(cljs.core.sequential_QMARK_(seq_of_effects)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect expects a seq, but was given ",cljs.core.type(seq_of_effects)], 0));
} else {
var seq__35505 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,seq_of_effects));
var chunk__35506 = null;
var count__35507 = (0);
var i__35508 = (0);
while(true){
if((i__35508 < count__35507)){
var vec__35523 = chunk__35506.cljs$core$IIndexed$_nth$arity$2(null,i__35508);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35523,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35523,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"db","db",993250759),effect_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5802__auto___35599 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5802__auto___35599)){
var effect_fn_35600 = temp__5802__auto___35599;
(effect_fn_35600.cljs$core$IFn$_invoke$arity$1 ? effect_fn_35600.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_35600.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__35601 = seq__35505;
var G__35602 = chunk__35506;
var G__35603 = count__35507;
var G__35604 = (i__35508 + (1));
seq__35505 = G__35601;
chunk__35506 = G__35602;
count__35507 = G__35603;
i__35508 = G__35604;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__35505);
if(temp__5804__auto__){
var seq__35505__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__35505__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__35505__$1);
var G__35605 = cljs.core.chunk_rest(seq__35505__$1);
var G__35606 = c__5568__auto__;
var G__35607 = cljs.core.count(c__5568__auto__);
var G__35608 = (0);
seq__35505 = G__35605;
chunk__35506 = G__35606;
count__35507 = G__35607;
i__35508 = G__35608;
continue;
} else {
var vec__35529 = cljs.core.first(seq__35505__$1);
var effect_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35529,(0),null);
var effect_value = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35529,(1),null);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"db","db",993250759),effect_key)){
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: \":fx\" effect should not contain a :db effect"], 0));
} else {
}

var temp__5802__auto___35609 = re_frame.registrar.get_handler.cljs$core$IFn$_invoke$arity$3(re_frame.fx.kind,effect_key,false);
if(cljs.core.truth_(temp__5802__auto___35609)){
var effect_fn_35610 = temp__5802__auto___35609;
(effect_fn_35610.cljs$core$IFn$_invoke$arity$1 ? effect_fn_35610.cljs$core$IFn$_invoke$arity$1(effect_value) : effect_fn_35610.call(null,effect_value));
} else {
re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"warn","warn",-436710552),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: in \":fx\" effect found ",effect_key," which has no associated handler. Ignoring."], 0));
}


var G__35611 = cljs.core.next(seq__35505__$1);
var G__35612 = null;
var G__35613 = (0);
var G__35614 = (0);
seq__35505 = G__35611;
chunk__35506 = G__35612;
count__35507 = G__35613;
i__35508 = G__35614;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),(function (value){
if((!(cljs.core.vector_QMARK_(value)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch value. Expected a vector, but got:",value], 0));
} else {
return re_frame.router.dispatch(value);
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"dispatch-n","dispatch-n",-504469236),(function (value){
if((!(cljs.core.sequential_QMARK_(value)))){
return re_frame.loggers.console.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["re-frame: ignoring bad :dispatch-n value. Expected a collection, but got:",value], 0));
} else {
var seq__35532 = cljs.core.seq(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(cljs.core.nil_QMARK_,value));
var chunk__35533 = null;
var count__35534 = (0);
var i__35535 = (0);
while(true){
if((i__35535 < count__35534)){
var event = chunk__35533.cljs$core$IIndexed$_nth$arity$2(null,i__35535);
re_frame.router.dispatch(event);


var G__35618 = seq__35532;
var G__35619 = chunk__35533;
var G__35620 = count__35534;
var G__35621 = (i__35535 + (1));
seq__35532 = G__35618;
chunk__35533 = G__35619;
count__35534 = G__35620;
i__35535 = G__35621;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__35532);
if(temp__5804__auto__){
var seq__35532__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__35532__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__35532__$1);
var G__35624 = cljs.core.chunk_rest(seq__35532__$1);
var G__35625 = c__5568__auto__;
var G__35626 = cljs.core.count(c__5568__auto__);
var G__35627 = (0);
seq__35532 = G__35624;
chunk__35533 = G__35625;
count__35534 = G__35626;
i__35535 = G__35627;
continue;
} else {
var event = cljs.core.first(seq__35532__$1);
re_frame.router.dispatch(event);


var G__35629 = cljs.core.next(seq__35532__$1);
var G__35630 = null;
var G__35631 = (0);
var G__35632 = (0);
seq__35532 = G__35629;
chunk__35533 = G__35630;
count__35534 = G__35631;
i__35535 = G__35632;
continue;
}
} else {
return null;
}
}
break;
}
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"deregister-event-handler","deregister-event-handler",-1096518994),(function (value){
var clear_event = cljs.core.partial.cljs$core$IFn$_invoke$arity$2(re_frame.registrar.clear_handlers,re_frame.events.kind);
if(cljs.core.sequential_QMARK_(value)){
var seq__35536 = cljs.core.seq(value);
var chunk__35537 = null;
var count__35538 = (0);
var i__35539 = (0);
while(true){
if((i__35539 < count__35538)){
var event = chunk__35537.cljs$core$IIndexed$_nth$arity$2(null,i__35539);
clear_event(event);


var G__35633 = seq__35536;
var G__35634 = chunk__35537;
var G__35635 = count__35538;
var G__35636 = (i__35539 + (1));
seq__35536 = G__35633;
chunk__35537 = G__35634;
count__35538 = G__35635;
i__35539 = G__35636;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__35536);
if(temp__5804__auto__){
var seq__35536__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__35536__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__35536__$1);
var G__35637 = cljs.core.chunk_rest(seq__35536__$1);
var G__35638 = c__5568__auto__;
var G__35639 = cljs.core.count(c__5568__auto__);
var G__35640 = (0);
seq__35536 = G__35637;
chunk__35537 = G__35638;
count__35538 = G__35639;
i__35539 = G__35640;
continue;
} else {
var event = cljs.core.first(seq__35536__$1);
clear_event(event);


var G__35641 = cljs.core.next(seq__35536__$1);
var G__35642 = null;
var G__35643 = (0);
var G__35644 = (0);
seq__35536 = G__35641;
chunk__35537 = G__35642;
count__35538 = G__35643;
i__35539 = G__35644;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return clear_event(value);
}
}));
re_frame.fx.reg_fx(new cljs.core.Keyword(null,"db","db",993250759),(function (value){
if((!((cljs.core.deref(re_frame.db.app_db) === value)))){
return cljs.core.reset_BANG_(re_frame.db.app_db,value);
} else {
return null;
}
}));

//# sourceMappingURL=re_frame.fx.js.map
