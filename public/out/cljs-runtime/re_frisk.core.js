goog.provide('re_frisk.core');
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.core !== 'undefined') && (typeof re_frisk.core.initialized !== 'undefined')){
} else {
re_frisk.core.initialized = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.core !== 'undefined') && (typeof re_frisk.core.prev_event !== 'undefined')){
} else {
re_frisk.core.prev_event = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.core !== 'undefined') && (typeof re_frisk.core.re_frame_data !== 'undefined')){
} else {
re_frisk.core.re_frame_data = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"app-db","app-db",865606302),re_frisk.inlined_deps.reagent.v1v0v0.reagent.core.atom.cljs$core$IFn$_invoke$arity$1("no data"),new cljs.core.Keyword(null,"events","events",1792552201),re_frisk.inlined_deps.reagent.v1v0v0.reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY),new cljs.core.Keyword(null,"subs","subs",-186681991),re_frisk.inlined_deps.reagent.v1v0v0.reagent.core.atom.cljs$core$IFn$_invoke$arity$1("no data"),new cljs.core.Keyword(null,"stat","stat",-1370599836),re_frisk.inlined_deps.reagent.v1v0v0.reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY),new cljs.core.Keyword(null,"views","views",1450155487),re_frisk.inlined_deps.reagent.v1v0v0.reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY)], null);
}
re_frisk.core.update_db_and_subs = (function re_frisk$core$update_db_and_subs(){
cljs.core.reset_BANG_(new cljs.core.Keyword(null,"subs","subs",-186681991).cljs$core$IFn$_invoke$arity$1(re_frisk.core.re_frame_data),re_frisk.utils.get_subs());

return cljs.core.reset_BANG_(new cljs.core.Keyword(null,"app-db","app-db",865606302).cljs$core$IFn$_invoke$arity$1(re_frisk.core.re_frame_data),cljs.core.deref(re_frame.db.app_db));
});
re_frisk.core.update_views = (function re_frisk$core$update_views(views){
if(cljs.core.seq(views)){
return cljs.core.reset_BANG_(new cljs.core.Keyword(null,"views","views",1450155487).cljs$core$IFn$_invoke$arity$1(re_frisk.core.re_frame_data),views);
} else {
return null;
}
});
re_frisk.core.trace_cb = (function re_frisk$core$trace_cb(traces){
if(cljs.core.truth_(new cljs.core.Keyword(null,"paused?","paused?",-135058553).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.db.tool_state)))){
return null;
} else {
var ignore_events = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.db.tool_state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.Keyword(null,"ignore-events","ignore-events",1864684934)], null));
var traces__$1 = re_frisk.trace.update_views_and_get_traces(re_frisk.core.update_views,traces);
var normalized = re_frisk.trace.normalize_traces(traces__$1,ignore_events);
var first_event = (function (){var or__5045__auto__ = cljs.core.first(cljs.core.deref(new cljs.core.Keyword(null,"events","events",1792552201).cljs$core$IFn$_invoke$arity$1(re_frisk.core.re_frame_data)));
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.first(normalized);
}
})();
if(cljs.core.seq(normalized)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword(null,"events","events",1792552201).cljs$core$IFn$_invoke$arity$1(re_frisk.core.re_frame_data),cljs.core.concat,cljs.core.map.cljs$core$IFn$_invoke$arity$2(re_frisk.trace.normalize_durations(first_event),normalized));

re_frisk.stat.init_stat(re_frisk.core.re_frame_data);

re_frisk.stat.update_trace_stat(re_frisk.core.re_frame_data,normalized);

setTimeout((function (){
return re_frisk.subs_graph.update_subs(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"subs?","subs?",-2085240020),normalized));
}),(100));

return re_frisk.utils.call_and_chill(re_frisk.core.update_db_and_subs,(500));
} else {
return null;
}
}
});
re_frisk.core.post_event_callback = (function re_frisk$core$post_event_callback(value,queue){
if(cljs.core.truth_(new cljs.core.Keyword(null,"paused?","paused?",-135058553).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.db.tool_state)))){
return null;
} else {
var ignore_events = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.db.tool_state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"opts","opts",155075701),new cljs.core.Keyword(null,"ignore-events","ignore-events",1864684934)], null));
var app_db = cljs.core.deref(re_frame.db.app_db);
var indx = cljs.core.count(cljs.core.deref(new cljs.core.Keyword(null,"events","events",1792552201).cljs$core$IFn$_invoke$arity$1(re_frisk.core.re_frame_data)));
var diff = re_frisk.diff.diff.diff(new cljs.core.Keyword(null,"app-db","app-db",865606302).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.core.prev_event)),app_db);
cljs.core.reset_BANG_(re_frisk.core.prev_event,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"app-db","app-db",865606302),app_db], null));

re_frisk.stat.init_stat(re_frisk.core.re_frame_data);

re_frisk.stat.update_event_stat(re_frisk.core.re_frame_data,cljs.core.first(value));

if(((cljs.core.not(ignore_events)) || (cljs.core.not(cljs.core.get.cljs$core$IFn$_invoke$arity$2(ignore_events,cljs.core.first(value)))))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword(null,"events","events",1792552201).cljs$core$IFn$_invoke$arity$1(re_frisk.core.re_frame_data),cljs.core.conj,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"event","event",301435442),value,new cljs.core.Keyword(null,"app-db-diff","app-db-diff",709588713),diff,new cljs.core.Keyword(null,"indx","indx",1571035590),indx,new cljs.core.Keyword(null,"queue","queue",1455835879),queue,new cljs.core.Keyword(null,"truncated-name","truncated-name",1771353320),re_frisk.utils.truncate_name(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.first(value)))], null));
} else {
}

return re_frisk.utils.call_and_chill(re_frisk.core.update_db_and_subs,(500));
}
});
re_frisk.core.find_error_trace = (function re_frisk$core$find_error_trace(){
return null;
});
re_frisk.core.register_exception_handler = (function re_frisk$core$register_exception_handler(){
var gOldOnError = window.onerror;
return (window.onerror = (function (error_msg,url,line_number){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword(null,"events","events",1792552201).cljs$core$IFn$_invoke$arity$1(re_frisk.core.re_frame_data),cljs.core.concat,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"event","event",301435442),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"exception","exception",-335277064)], null),new cljs.core.Keyword(null,"truncated-name","truncated-name",1771353320),new cljs.core.Keyword(null,"exception","exception",-335277064),new cljs.core.Keyword(null,"error?","error?",-460689159),true,new cljs.core.Keyword(null,"indx","indx",1571035590),cljs.core.count(cljs.core.deref(new cljs.core.Keyword(null,"events","events",1792552201).cljs$core$IFn$_invoke$arity$1(re_frisk.core.re_frame_data))),new cljs.core.Keyword(null,"error","error",-978969032),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([re_frisk.core.find_error_trace(),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"msg","msg",-1386103444),error_msg,new cljs.core.Keyword(null,"url","url",276297046),url,new cljs.core.Keyword(null,"line","line",212345235),line_number], null)], 0))], null)], null));

if(cljs.core.truth_(gOldOnError)){
return (gOldOnError.cljs$core$IFn$_invoke$arity$3 ? gOldOnError.cljs$core$IFn$_invoke$arity$3(error_msg,url,line_number) : gOldOnError.call(null,error_msg,url,line_number));
} else {
return false;
}
}));
});
re_frisk.core.patch_reagent_BANG_ = (function re_frisk$core$patch_reagent_BANG_(){
re_frisk.reagent.impl.component.patch_wrap_funs();

return re_frisk.reagent.impl.batching.patch_next_tick();
});
re_frisk.core.enable_re_frisk_BANG_ = (function re_frisk$core$enable_re_frisk_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___45026 = arguments.length;
var i__5770__auto___45027 = (0);
while(true){
if((i__5770__auto___45027 < len__5769__auto___45026)){
args__5775__auto__.push((arguments[i__5770__auto___45027]));

var G__45031 = (i__5770__auto___45027 + (1));
i__5770__auto___45027 = G__45031;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return re_frisk.core.enable_re_frisk_BANG_.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(re_frisk.core.enable_re_frisk_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (p__44957){
var vec__44958 = p__44957;
var opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__44958,(0),null);
if(cljs.core.truth_(cljs.core.deref(re_frisk.core.initialized))){
return null;
} else {
cljs.core.reset_BANG_(re_frisk.core.initialized,true);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.db.tool_state,cljs.core.assoc,new cljs.core.Keyword(null,"opts","opts",155075701),opts);

if(re_frame.trace.is_trace_enabled_QMARK_()){
re_frisk.core.patch_reagent_BANG_();

re_frame.trace.register_trace_cb(new cljs.core.Keyword(null,"re-frisk-trace","re-frisk-trace",912949928),re_frisk.core.trace_cb);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"events?","events?",-780512682).cljs$core$IFn$_invoke$arity$1(opts),false)){
} else {
cljs.core.reset_BANG_(re_frisk.core.prev_event,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"app-db","app-db",865606302),cljs.core.deref(re_frame.db.app_db)], null));

re_frame.core.add_post_event_callback.cljs$core$IFn$_invoke$arity$1(re_frisk.core.post_event_callback);
}
}

re_frisk.subs_graph.set_root_node(re_frame.interop.reagent_id(re_frame.db.app_db));

return setTimeout(re_frisk.ui.mount_internal,(100),re_frisk.core.re_frame_data);
}
}));

(re_frisk.core.enable_re_frisk_BANG_.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(re_frisk.core.enable_re_frisk_BANG_.cljs$lang$applyTo = (function (seq44946){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq44946));
}));

re_frisk.core.enable = (function re_frisk$core$enable(var_args){
var args__5775__auto__ = [];
var len__5769__auto___45056 = arguments.length;
var i__5770__auto___45057 = (0);
while(true){
if((i__5770__auto___45057 < len__5769__auto___45056)){
args__5775__auto__.push((arguments[i__5770__auto___45057]));

var G__45062 = (i__5770__auto___45057 + (1));
i__5770__auto___45057 = G__45062;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return re_frisk.core.enable.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(re_frisk.core.enable.cljs$core$IFn$_invoke$arity$variadic = (function (p__44973){
var vec__44977 = p__44973;
var opts = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__44977,(0),null);
return re_frisk.core.enable_re_frisk_BANG_.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([opts], 0));
}));

(re_frisk.core.enable.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(re_frisk.core.enable.cljs$lang$applyTo = (function (seq44971){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq44971));
}));


//# sourceMappingURL=re_frisk.core.js.map
