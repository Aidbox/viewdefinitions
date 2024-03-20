goog.provide('shadow.remote.runtime.shared');
shadow.remote.runtime.shared.init_state = (function shadow$remote$runtime$shared$init_state(client_info){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),(0),new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.PersistentArrayMap.EMPTY], null);
});
shadow.remote.runtime.shared.now = (function shadow$remote$runtime$shared$now(){
return Date.now();
});
shadow.remote.runtime.shared.relay_msg = (function shadow$remote$runtime$shared$relay_msg(runtime,msg){
return shadow.remote.runtime.api.relay_msg(runtime,msg);
});
shadow.remote.runtime.shared.reply = (function shadow$remote$runtime$shared$reply(runtime,p__45681,res){
var map__45682 = p__45681;
var map__45682__$1 = cljs.core.__destructure_map(map__45682);
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45682__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45682__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var res__$1 = (function (){var G__45684 = res;
var G__45684__$1 = (cljs.core.truth_(call_id)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45684,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id):G__45684);
if(cljs.core.truth_(from)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__45684__$1,new cljs.core.Keyword(null,"to","to",192099007),from);
} else {
return G__45684__$1;
}
})();
return shadow.remote.runtime.api.relay_msg(runtime,res__$1);
});
shadow.remote.runtime.shared.call = (function shadow$remote$runtime$shared$call(var_args){
var G__45687 = arguments.length;
switch (G__45687) {
case 3:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3 = (function (runtime,msg,handlers){
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4(runtime,msg,handlers,(0));
}));

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4 = (function (p__45710,msg,handlers,timeout_after_ms){
var map__45714 = p__45710;
var map__45714__$1 = cljs.core.__destructure_map(map__45714);
var runtime = map__45714__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45714__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var call_id = new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"handlers","handlers",79528781),handlers,new cljs.core.Keyword(null,"called-at","called-at",607081160),shadow.remote.runtime.shared.now(),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg,new cljs.core.Keyword(null,"timeout","timeout",-318625318),timeout_after_ms], null));

return shadow.remote.runtime.api.relay_msg(runtime,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id));
}));

(shadow.remote.runtime.shared.call.cljs$lang$maxFixedArity = 4);

shadow.remote.runtime.shared.trigger_BANG_ = (function shadow$remote$runtime$shared$trigger_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___45854 = arguments.length;
var i__5770__auto___45855 = (0);
while(true){
if((i__5770__auto___45855 < len__5769__auto___45854)){
args__5775__auto__.push((arguments[i__5770__auto___45855]));

var G__45856 = (i__5770__auto___45855 + (1));
i__5770__auto___45855 = G__45856;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((2) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((2)),(0),null)):null);
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5776__auto__);
});

(shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (p__45723,ev,args){
var map__45728 = p__45723;
var map__45728__$1 = cljs.core.__destructure_map(map__45728);
var runtime = map__45728__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45728__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var seq__45732 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__45735 = null;
var count__45736 = (0);
var i__45737 = (0);
while(true){
if((i__45737 < count__45736)){
var ext = chunk__45735.cljs$core$IIndexed$_nth$arity$2(null,i__45737);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__45861 = seq__45732;
var G__45862 = chunk__45735;
var G__45863 = count__45736;
var G__45864 = (i__45737 + (1));
seq__45732 = G__45861;
chunk__45735 = G__45862;
count__45736 = G__45863;
i__45737 = G__45864;
continue;
} else {
var G__45865 = seq__45732;
var G__45866 = chunk__45735;
var G__45867 = count__45736;
var G__45868 = (i__45737 + (1));
seq__45732 = G__45865;
chunk__45735 = G__45866;
count__45736 = G__45867;
i__45737 = G__45868;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__45732);
if(temp__5804__auto__){
var seq__45732__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__45732__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__45732__$1);
var G__45869 = cljs.core.chunk_rest(seq__45732__$1);
var G__45870 = c__5568__auto__;
var G__45871 = cljs.core.count(c__5568__auto__);
var G__45872 = (0);
seq__45732 = G__45869;
chunk__45735 = G__45870;
count__45736 = G__45871;
i__45737 = G__45872;
continue;
} else {
var ext = cljs.core.first(seq__45732__$1);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__45873 = cljs.core.next(seq__45732__$1);
var G__45874 = null;
var G__45875 = (0);
var G__45876 = (0);
seq__45732 = G__45873;
chunk__45735 = G__45874;
count__45736 = G__45875;
i__45737 = G__45876;
continue;
} else {
var G__45877 = cljs.core.next(seq__45732__$1);
var G__45878 = null;
var G__45879 = (0);
var G__45880 = (0);
seq__45732 = G__45877;
chunk__45735 = G__45878;
count__45736 = G__45879;
i__45737 = G__45880;
continue;
}
}
} else {
return null;
}
}
break;
}
}));

(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$applyTo = (function (seq45717){
var G__45721 = cljs.core.first(seq45717);
var seq45717__$1 = cljs.core.next(seq45717);
var G__45722 = cljs.core.first(seq45717__$1);
var seq45717__$2 = cljs.core.next(seq45717__$1);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__45721,G__45722,seq45717__$2);
}));

shadow.remote.runtime.shared.welcome = (function shadow$remote$runtime$shared$welcome(p__45754,p__45755){
var map__45756 = p__45754;
var map__45756__$1 = cljs.core.__destructure_map(map__45756);
var runtime = map__45756__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45756__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__45757 = p__45755;
var map__45757__$1 = cljs.core.__destructure_map(map__45757);
var msg = map__45757__$1;
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45757__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc,new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id);

var map__45758 = cljs.core.deref(state_ref);
var map__45758__$1 = cljs.core.__destructure_map(map__45758);
var client_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45758__$1,new cljs.core.Keyword(null,"client-info","client-info",1958982504));
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45758__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
shadow.remote.runtime.shared.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"hello","hello",-245025397),new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info], null));

return shadow.remote.runtime.shared.trigger_BANG_(runtime,new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125));
});
shadow.remote.runtime.shared.ping = (function shadow$remote$runtime$shared$ping(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"pong","pong",-172484958)], null));
});
shadow.remote.runtime.shared.get_client_id = (function shadow$remote$runtime$shared$get_client_id(p__45762){
var map__45763 = p__45762;
var map__45763__$1 = cljs.core.__destructure_map(map__45763);
var runtime = map__45763__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45763__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var or__5045__auto__ = new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("runtime has no assigned runtime-id",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null));
}
});
shadow.remote.runtime.shared.request_supported_ops = (function shadow$remote$runtime$shared$request_supported_ops(p__45769,msg){
var map__45770 = p__45769;
var map__45770__$1 = cljs.core.__destructure_map(map__45770);
var runtime = map__45770__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45770__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"supported-ops","supported-ops",337914702),new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.disj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.set(cljs.core.keys(new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))),new cljs.core.Keyword(null,"welcome","welcome",-578152123),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),new cljs.core.Keyword(null,"tool-disconnect","tool-disconnect",189103996)], 0))], null));
});
shadow.remote.runtime.shared.unknown_relay_op = (function shadow$remote$runtime$shared$unknown_relay_op(msg){
return console.warn("unknown-relay-op",msg);
});
shadow.remote.runtime.shared.unknown_op = (function shadow$remote$runtime$shared$unknown_op(msg){
return console.warn("unknown-op",msg);
});
shadow.remote.runtime.shared.add_extension_STAR_ = (function shadow$remote$runtime$shared$add_extension_STAR_(p__45774,key,p__45775){
var map__45776 = p__45774;
var map__45776__$1 = cljs.core.__destructure_map(map__45776);
var state = map__45776__$1;
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45776__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
var map__45777 = p__45775;
var map__45777__$1 = cljs.core.__destructure_map(map__45777);
var spec = map__45777__$1;
var ops = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45777__$1,new cljs.core.Keyword(null,"ops","ops",1237330063));
if(cljs.core.contains_QMARK_(extensions,key)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("extension already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"spec","spec",347520401),spec], null));
} else {
}

return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("op already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"op","op",-1882987955),op_kw], null));
} else {
}

return cljs.core.assoc_in(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null),op_handler);
}),cljs.core.assoc_in(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null),spec),ops);
});
shadow.remote.runtime.shared.add_extension = (function shadow$remote$runtime$shared$add_extension(p__45782,key,spec){
var map__45783 = p__45782;
var map__45783__$1 = cljs.core.__destructure_map(map__45783);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45783__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,shadow.remote.runtime.shared.add_extension_STAR_,key,spec);
});
shadow.remote.runtime.shared.add_defaults = (function shadow$remote$runtime$shared$add_defaults(runtime){
return shadow.remote.runtime.shared.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.shared","defaults","shadow.remote.runtime.shared/defaults",-1821257543),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"welcome","welcome",-578152123),(function (p1__45785_SHARP_){
return shadow.remote.runtime.shared.welcome(runtime,p1__45785_SHARP_);
}),new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),(function (p1__45786_SHARP_){
return shadow.remote.runtime.shared.unknown_relay_op(p1__45786_SHARP_);
}),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),(function (p1__45787_SHARP_){
return shadow.remote.runtime.shared.unknown_op(p1__45787_SHARP_);
}),new cljs.core.Keyword(null,"ping","ping",-1670114784),(function (p1__45788_SHARP_){
return shadow.remote.runtime.shared.ping(runtime,p1__45788_SHARP_);
}),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),(function (p1__45789_SHARP_){
return shadow.remote.runtime.shared.request_supported_ops(runtime,p1__45789_SHARP_);
})], null)], null));
});
shadow.remote.runtime.shared.del_extension_STAR_ = (function shadow$remote$runtime$shared$del_extension_STAR_(state,key){
var ext = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null));
if(cljs.core.not(ext)){
return state;
} else {
return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063)], null),cljs.core.dissoc,op_kw);
}),cljs.core.update.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.dissoc,key),new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(ext));
}
});
shadow.remote.runtime.shared.del_extension = (function shadow$remote$runtime$shared$del_extension(p__45795,key){
var map__45796 = p__45795;
var map__45796__$1 = cljs.core.__destructure_map(map__45796);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45796__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state_ref,shadow.remote.runtime.shared.del_extension_STAR_,key);
});
shadow.remote.runtime.shared.unhandled_call_result = (function shadow$remote$runtime$shared$unhandled_call_result(call_config,msg){
return console.warn("unhandled call result",msg,call_config);
});
shadow.remote.runtime.shared.unhandled_client_not_found = (function shadow$remote$runtime$shared$unhandled_client_not_found(p__45797,msg){
var map__45798 = p__45797;
var map__45798__$1 = cljs.core.__destructure_map(map__45798);
var runtime = map__45798__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45798__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic(runtime,new cljs.core.Keyword(null,"on-client-not-found","on-client-not-found",-642452849),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([msg], 0));
});
shadow.remote.runtime.shared.reply_unknown_op = (function shadow$remote$runtime$shared$reply_unknown_op(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg], null));
});
shadow.remote.runtime.shared.process = (function shadow$remote$runtime$shared$process(p__45804,p__45805){
var map__45806 = p__45804;
var map__45806__$1 = cljs.core.__destructure_map(map__45806);
var runtime = map__45806__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45806__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__45807 = p__45805;
var map__45807__$1 = cljs.core.__destructure_map(map__45807);
var msg = map__45807__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45807__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45807__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var state = cljs.core.deref(state_ref);
var op_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op], null));
if(cljs.core.truth_(call_id)){
var cfg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null));
var call_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cfg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"handlers","handlers",79528781),op], null));
if(cljs.core.truth_(call_handler)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([call_id], 0));

return (call_handler.cljs$core$IFn$_invoke$arity$1 ? call_handler.cljs$core$IFn$_invoke$arity$1(msg) : call_handler.call(null,msg));
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
return shadow.remote.runtime.shared.unhandled_call_result(cfg,msg);

}
}
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-not-found","client-not-found",-1754042614),op)){
return shadow.remote.runtime.shared.unhandled_client_not_found(runtime,msg);
} else {
return shadow.remote.runtime.shared.reply_unknown_op(runtime,msg);

}
}
}
});
shadow.remote.runtime.shared.run_on_idle = (function shadow$remote$runtime$shared$run_on_idle(state_ref){
var seq__45811 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__45813 = null;
var count__45814 = (0);
var i__45815 = (0);
while(true){
if((i__45815 < count__45814)){
var map__45820 = chunk__45813.cljs$core$IIndexed$_nth$arity$2(null,i__45815);
var map__45820__$1 = cljs.core.__destructure_map(map__45820);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45820__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__45941 = seq__45811;
var G__45942 = chunk__45813;
var G__45943 = count__45814;
var G__45944 = (i__45815 + (1));
seq__45811 = G__45941;
chunk__45813 = G__45942;
count__45814 = G__45943;
i__45815 = G__45944;
continue;
} else {
var G__45945 = seq__45811;
var G__45946 = chunk__45813;
var G__45947 = count__45814;
var G__45948 = (i__45815 + (1));
seq__45811 = G__45945;
chunk__45813 = G__45946;
count__45814 = G__45947;
i__45815 = G__45948;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__45811);
if(temp__5804__auto__){
var seq__45811__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__45811__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__45811__$1);
var G__45950 = cljs.core.chunk_rest(seq__45811__$1);
var G__45951 = c__5568__auto__;
var G__45952 = cljs.core.count(c__5568__auto__);
var G__45953 = (0);
seq__45811 = G__45950;
chunk__45813 = G__45951;
count__45814 = G__45952;
i__45815 = G__45953;
continue;
} else {
var map__45822 = cljs.core.first(seq__45811__$1);
var map__45822__$1 = cljs.core.__destructure_map(map__45822);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45822__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__45954 = cljs.core.next(seq__45811__$1);
var G__45955 = null;
var G__45956 = (0);
var G__45957 = (0);
seq__45811 = G__45954;
chunk__45813 = G__45955;
count__45814 = G__45956;
i__45815 = G__45957;
continue;
} else {
var G__45958 = cljs.core.next(seq__45811__$1);
var G__45959 = null;
var G__45960 = (0);
var G__45961 = (0);
seq__45811 = G__45958;
chunk__45813 = G__45959;
count__45814 = G__45960;
i__45815 = G__45961;
continue;
}
}
} else {
return null;
}
}
break;
}
});

//# sourceMappingURL=shadow.remote.runtime.shared.js.map
