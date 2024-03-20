goog.provide('re_frisk.diff.diff');
re_frisk.diff.diff.mv_keys = (function re_frisk$diff$diff$mv_keys(coll){
if(cljs.core.map_QMARK_(coll)){
return cljs.core.keys(coll);
} else {
return cljs.core.keep_indexed.cljs$core$IFn$_invoke$arity$2((function (p1__40319_SHARP_,p2__40318_SHARP_){
if((p2__40318_SHARP_ == null)){
return null;
} else {
return p1__40319_SHARP_;
}
}),coll);
}
});
re_frisk.diff.diff.diff_coll = (function re_frisk$diff$diff$diff_coll(a,b){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5523__auto__ = (function re_frisk$diff$diff$diff_coll_$_iter__40329(s__40330){
return (new cljs.core.LazySeq(null,(function (){
var s__40330__$1 = s__40330;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__40330__$1);
if(temp__5804__auto__){
var s__40330__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__40330__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__40330__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__40332 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__40331 = (0);
while(true){
if((i__40331 < size__5522__auto__)){
var key = cljs.core._nth(c__5521__auto__,i__40331);
cljs.core.chunk_append(b__40332,(function (){var val_a = cljs.core.get.cljs$core$IFn$_invoke$arity$2(a,key);
var val_b = cljs.core.get.cljs$core$IFn$_invoke$arity$2(b,key);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(val_a,val_b)){
return null;
} else {
if(cljs.core.truth_((function (){var and__5043__auto__ = val_a;
if(cljs.core.truth_(and__5043__auto__)){
return val_b;
} else {
return and__5043__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key,(re_frisk.diff.diff.diff.cljs$core$IFn$_invoke$arity$2 ? re_frisk.diff.diff.diff.cljs$core$IFn$_invoke$arity$2(val_a,val_b) : re_frisk.diff.diff.diff.call(null,val_a,val_b))], null);
} else {
if(cljs.core.truth_(val_a)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"deleted","deleted",-510100639),val_a], null)], null);
} else {
if(cljs.core.truth_(val_b)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key,val_b], null);
} else {
return null;
}
}
}
}
})());

var G__40377 = (i__40331 + (1));
i__40331 = G__40377;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__40332),re_frisk$diff$diff$diff_coll_$_iter__40329(cljs.core.chunk_rest(s__40330__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__40332),null);
}
} else {
var key = cljs.core.first(s__40330__$2);
return cljs.core.cons((function (){var val_a = cljs.core.get.cljs$core$IFn$_invoke$arity$2(a,key);
var val_b = cljs.core.get.cljs$core$IFn$_invoke$arity$2(b,key);
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(val_a,val_b)){
return null;
} else {
if(cljs.core.truth_((function (){var and__5043__auto__ = val_a;
if(cljs.core.truth_(and__5043__auto__)){
return val_b;
} else {
return and__5043__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key,(re_frisk.diff.diff.diff.cljs$core$IFn$_invoke$arity$2 ? re_frisk.diff.diff.diff.cljs$core$IFn$_invoke$arity$2(val_a,val_b) : re_frisk.diff.diff.diff.call(null,val_a,val_b))], null);
} else {
if(cljs.core.truth_(val_a)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"deleted","deleted",-510100639),val_a], null)], null);
} else {
if(cljs.core.truth_(val_b)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key,val_b], null);
} else {
return null;
}
}
}
}
})(),re_frisk$diff$diff$diff_coll_$_iter__40329(cljs.core.rest(s__40330__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(clojure.set.union.cljs$core$IFn$_invoke$arity$2(cljs.core.set(re_frisk.diff.diff.mv_keys(a)),cljs.core.set(re_frisk.diff.diff.mv_keys(b))));
})());
});
re_frisk.diff.diff.diff_set = (function re_frisk$diff$diff$diff_set(a,b){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"deleted","deleted",-510100639),clojure.set.difference.cljs$core$IFn$_invoke$arity$2(a,b),new cljs.core.Keyword(null,"added","added",2057651688),clojure.set.difference.cljs$core$IFn$_invoke$arity$2(b,a)], null);
});
re_frisk.diff.diff.diff_rest = (function re_frisk$diff$diff$diff_rest(a,b){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"before","before",-1633692388),a,new cljs.core.Keyword(null,"after","after",594996914),b], null);
});
re_frisk.diff.diff.diff = (function re_frisk$diff$diff$diff(a,b){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a,b)){
return null;
} else {
if(((cljs.core.map_QMARK_(a)) && (cljs.core.map_QMARK_(b)))){
return re_frisk.diff.diff.diff_coll(a,b);
} else {
if(((cljs.core.vector_QMARK_(a)) && (cljs.core.vector_QMARK_(b)))){
return re_frisk.diff.diff.diff_coll(a,b);
} else {
if(((cljs.core.set_QMARK_(a)) && (cljs.core.set_QMARK_(b)))){
return re_frisk.diff.diff.diff_set(a,b);
} else {
return re_frisk.diff.diff.diff_rest(a,b);

}
}
}
}
});

//# sourceMappingURL=re_frisk.diff.diff.js.map
