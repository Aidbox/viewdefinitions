goog.provide('client.events');
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("client.events","initialize-db","client.events/initialize-db",402622516),(function (_,___$1){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),client.db.default_db], null);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("client.events","set-active-panel","client.events/set-active-panel",1619063368),(function (p__51099,p__51100){
var map__51101 = p__51099;
var map__51101__$1 = cljs.core.__destructure_map(map__51101);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51101__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__51102 = p__51100;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51102,(0),null);
var active_panel = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51102,(1),null);
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"active-panel","active-panel",-1802545994),active_panel)], null);
}));
re_frame.core.reg_event_fx.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("client.events","add-value","client.events/add-value",325912074),(function (p__51105,p__51106){
var map__51107 = p__51105;
var map__51107__$1 = cljs.core.__destructure_map(map__51107);
var db = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51107__$1,new cljs.core.Keyword(null,"db","db",993250759));
var vec__51108 = p__51106;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51108,(0),null);
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"db","db",993250759),cljs.core.update.cljs$core$IFn$_invoke$arity$3(db,new cljs.core.Keyword(null,"value","value",305978217),(function (vv){
if(cljs.core.truth_(vv)){
return cljs.core.not(vv);
} else {
return true;
}
}))], null);
}));

//# sourceMappingURL=client.events.js.map
