goog.provide('client.debounce');
client.debounce.now = (function client$debounce$now(){
return (new Date()).getTime();
});
client.debounce.registered_keys = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
client.debounce.dispatch_if_not_superceded = (function client$debounce$dispatch_if_not_superceded(p__46082){
var map__46083 = p__46082;
var map__46083__$1 = cljs.core.__destructure_map(map__46083);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46083__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var _delay = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46083__$1,new cljs.core.Keyword(null,"_delay","_delay",878375583));
var event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46083__$1,new cljs.core.Keyword(null,"event","event",301435442));
var time_received = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46083__$1,new cljs.core.Keyword(null,"time-received","time-received",1643766907));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(time_received,cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(client.debounce.registered_keys),key))){
return re_frame.core.dispatch(event);
} else {
return null;
}
});
client.debounce.dispatch_later = (function client$debounce$dispatch_later(p__46089){
var map__46090 = p__46089;
var map__46090__$1 = cljs.core.__destructure_map(map__46090);
var debounce = map__46090__$1;
var delay = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__46090__$1,new cljs.core.Keyword(null,"delay","delay",-574225219));
return setTimeout((function (){
return client.debounce.dispatch_if_not_superceded(debounce);
}),(function (){var or__5045__auto__ = delay;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (300);
}
})());
});
client.debounce.dispatch_debounce = (function client$debounce$dispatch_debounce(debounce){
var ts = client.debounce.now();
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(client.debounce.registered_keys,cljs.core.assoc,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(debounce),ts);

return client.debounce.dispatch_later(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(debounce,new cljs.core.Keyword(null,"time-received","time-received",1643766907),ts));
});
re_frame.core.reg_fx(new cljs.core.Keyword(null,"dispatch-debounce","dispatch-debounce",-2065179020),client.debounce.dispatch_debounce);
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"dispatch-debounce","dispatch-debounce",-2065179020),(function (_fx,p__46093){
var vec__46094 = p__46093;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__46094,(0),null);
var deb = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__46094,(1),null);
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dispatch-debounce","dispatch-debounce",-2065179020),deb], null);
}));

//# sourceMappingURL=client.debounce.js.map
