goog.provide('suitkin.components.dropdown.model');
suitkin.components.dropdown.model.build_package_filter_fn = (function suitkin$components$dropdown$model$build_package_filter_fn(search_string){
var string_parts = clojure.string.split.cljs$core$IFn$_invoke$arity$2(search_string,/ /);
var preds = cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (string_part){
return (function (p1__47145_SHARP_){
return clojure.string.includes_QMARK_(clojure.string.lower_case(p1__47145_SHARP_),string_part);
});
}),string_parts);
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.every_pred,preds);
});
re_frame.core.reg_sub.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword("suitkin.components.dropdown.model","open?","suitkin.components.dropdown.model/open?",552250782),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (db,p__47158){
var vec__47159 = p__47158;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47159,(0),null);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47159,(1),null);
return cljs.core.boolean$(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("suitkin.components.dropdown.model","state","suitkin.components.dropdown.model/state",-1704677176),id], null)));
})], 0));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("suitkin.components.dropdown.model","open","suitkin.components.dropdown.model/open",1606143751),(function (db,p__47173){
var vec__47174 = p__47173;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47174,(0),null);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47174,(1),null);
return cljs.core.assoc_in(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("suitkin.components.dropdown.model","state","suitkin.components.dropdown.model/state",-1704677176),id], null),true);
}));
re_frame.core.reg_event_db.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("suitkin.components.dropdown.model","close","suitkin.components.dropdown.model/close",1148694855),(function (db,p__47180){
var vec__47181 = p__47180;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47181,(0),null);
var id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47181,(1),null);
return cljs.core.assoc_in(db,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("suitkin.components.dropdown.model","state","suitkin.components.dropdown.model/state",-1704677176),id], null),false);
}));

//# sourceMappingURL=suitkin.components.dropdown.model.js.map
