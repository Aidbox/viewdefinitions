goog.provide('re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom');
goog.scope(function(){
  re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.goog$module$goog$object = goog.module.get('goog.object');
});
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.inlined_deps !== 'undefined') && (typeof re_frisk.inlined_deps.reagent !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0 !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.debug !== 'undefined')){
} else {
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.debug = false;
}
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.inlined_deps !== 'undefined') && (typeof re_frisk.inlined_deps.reagent !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0 !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.generation !== 'undefined')){
} else {
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.generation = (0);
}
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.inlined_deps !== 'undefined') && (typeof re_frisk.inlined_deps.reagent !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0 !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._running !== 'undefined')){
} else {
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._running = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
}
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.reactive_QMARK_ = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$reactive_QMARK_(){
return (!((re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_ == null)));
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.running = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$running(){
return (cljs.core.deref(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._running));
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.arr_len = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$arr_len(x){
if((x == null)){
return (0);
} else {
return x.length;
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.arr_eq = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$arr_eq(x,y){
var len = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.arr_len(x);
var and__5043__auto__ = (len === re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.arr_len(y));
if(and__5043__auto__){
var i = (0);
while(true){
var or__5045__auto__ = (i === len);
if(or__5045__auto__){
return or__5045__auto__;
} else {
if(((x[i]) === (y[i]))){
var G__35651 = (i + (1));
i = G__35651;
continue;
} else {
return false;
}
}
break;
}
} else {
return and__5043__auto__;
}
});
/**
 * When f is executed, if (f) derefs any ratoms, they are then added to 'obj.captured'(*ratom-context*).
 * 
 *   See function notify-deref-watcher! to know how *ratom-context* is updated
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.in_context = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$in_context(obj,f){
var _STAR_ratom_context_STAR__orig_val__35024 = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_;
var _STAR_ratom_context_STAR__temp_val__35025 = obj;
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__temp_val__35025);

try{return (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
}finally {(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__orig_val__35024);
}});
/**
 * Returns `(in-context f r)`.  Calls `_update-watching` on r with any
 *   `deref`ed atoms captured during `in-context`, if any differ from the
 *   `watching` field of r.  Clears the `dirty?` flag on r.
 * 
 *   Inside '_update-watching' along with adding the ratoms in 'r.watching' of reaction,
 *   the reaction is also added to the list of watches on each ratoms f derefs.
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.deref_capture = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$deref_capture(f,r){
(r.captured = null);

(r.ratomGeneration = (re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.generation = (re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.generation + (1))));


var res = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.in_context(r,f);
var c = r.captured;
(r.dirty_QMARK_ = false);

if(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.arr_eq(c,r.watching)){
} else {
r._update_watching(c);
}

return res;
});
/**
 * Add `derefed` to the `captured` field of `*ratom-context*`.
 * 
 *   See also `in-context`
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.notify_deref_watcher_BANG_ = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$notify_deref_watcher_BANG_(derefed){
var temp__5808__auto__ = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_;
if((temp__5808__auto__ == null)){
return null;
} else {
var r = temp__5808__auto__;
var c = r.captured;
if((c == null)){
return (r.captured = [derefed]);
} else {
return c.push(derefed);
}
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.check_watches = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$check_watches(old,new$){
if(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.debug){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._running,cljs.core._PLUS_,(cljs.core.count(new$) - cljs.core.count(old)));
} else {
}

return new$;
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.add_w = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$add_w(this$,key,f){
var w = this$.watches;
(this$.watches = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.check_watches(w,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(w,key,f)));

return (this$.watchesArr = null);
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.remove_w = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$remove_w(this$,key){
var w = this$.watches;
(this$.watches = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.check_watches(w,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(w,key)));

return (this$.watchesArr = null);
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.notify_w = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$notify_w(this$,old,new$){
var w = this$.watchesArr;
var a = (((w == null))?(this$.watchesArr = cljs.core.reduce_kv((function (p1__35091_SHARP_,p2__35092_SHARP_,p3__35093_SHARP_){
var G__35097 = p1__35091_SHARP_;
G__35097.push(p2__35092_SHARP_);

G__35097.push(p3__35093_SHARP_);

return G__35097;
}),[],this$.watches)):w);
var len = a.length;
var i = (0);
while(true){
if((i < len)){
var k_35652 = (a[i]);
var f_35653 = (a[(i + (1))]);
(f_35653.cljs$core$IFn$_invoke$arity$4 ? f_35653.cljs$core$IFn$_invoke$arity$4(k_35652,this$,old,new$) : f_35653.call(null,k_35652,this$,old,new$));

var G__35654 = ((2) + i);
i = G__35654;
continue;
} else {
return null;
}
break;
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.pr_atom = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$pr_atom(a,writer,opts,s,v){
cljs.core._write(writer,["#object[re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom.",cljs.core.str.cljs$core$IFn$_invoke$arity$1(s)," "].join(''));

cljs.core.pr_writer((function (){var _STAR_ratom_context_STAR__orig_val__35112 = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_;
var _STAR_ratom_context_STAR__temp_val__35113 = null;
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__temp_val__35113);

try{return v;
}finally {(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__orig_val__35112);
}})(),writer,opts);

return cljs.core._write(writer,"]");
});
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.inlined_deps !== 'undefined') && (typeof re_frisk.inlined_deps.reagent !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0 !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.rea_queue !== 'undefined')){
} else {
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.rea_queue = null;
}
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.rea_enqueue = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$rea_enqueue(r){
if((re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.rea_queue == null)){
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.rea_queue = []);

re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.batching.schedule();
} else {
}

return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.rea_queue.push(r);
});

/**
 * @interface
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.IReactiveAtom = function(){};


/**
* @constructor
 * @implements {cljs.core.IWatchable}
 * @implements {cljs.core.IAtom}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IWithMeta}
 * @implements {re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.IReactiveAtom}
*/
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom = (function (state,meta,validator,watches){
this.state = state;
this.meta = meta;
this.validator = validator;
this.watches = watches;
this.cljs$lang$protocol_mask$partition0$ = 2154201088;
this.cljs$lang$protocol_mask$partition1$ = 114690;
});
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IReactiveAtom$ = cljs.core.PROTOCOL_SENTINEL);

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (a,w,opts){
var self__ = this;
var a__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.pr_atom(a__$1,w,opts,"RAtom",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"val","val",128701612),a__$1.cljs$core$IDeref$_deref$arity$1(null)], null));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.meta;
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return goog.getUid(this$__$1);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var self__ = this;
var o__$1 = this;
return (o__$1 === other);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (a,new_value){
var self__ = this;
var a__$1 = this;
if((self__.validator == null)){
} else {
if(cljs.core.truth_((self__.validator.cljs$core$IFn$_invoke$arity$1 ? self__.validator.cljs$core$IFn$_invoke$arity$1(new_value) : self__.validator.call(null,new_value)))){
} else {
throw (new Error(["Assert failed: ","Validator rejected reference state","\n","(validator new-value)"].join('')));
}
}

var old_value = self__.state;
(self__.state = new_value);

if((self__.watches == null)){
} else {
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.notify_w(a__$1,old_value,new_value);
}

return new_value;
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (a,f){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(self__.state) : f.call(null,self__.state)));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (a,f,x){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(self__.state,x) : f.call(null,self__.state,x)));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (a,f,x,y){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(self__.state,x,y) : f.call(null,self__.state,x,y)));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (a,f,x,y,more){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f,self__.state,x,y,more));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,old,new$){
var self__ = this;
var this$__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.notify_w(this$__$1,old,new$);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f){
var self__ = this;
var this$__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.add_w(this$__$1,key,f);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var self__ = this;
var this$__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.remove_w(this$__$1,key);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_,new_meta){
var self__ = this;
var ___$1 = this;
return (new re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom(self__.state,new_meta,self__.validator,self__.watches));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.notify_deref_watcher_BANG_(this$__$1);

return self__.state;
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"state","state",-348086572,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),new cljs.core.Symbol(null,"meta","meta",-1154898805,null),new cljs.core.Symbol(null,"validator","validator",-325659154,null),cljs.core.with_meta(new cljs.core.Symbol(null,"watches","watches",1367433992,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.cljs$lang$type = true);

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.cljs$lang$ctorStr = "re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/RAtom");

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/RAtom");
}));

/**
 * Positional factory function for re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/RAtom.
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.__GT_RAtom = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$__GT_RAtom(state,meta,validator,watches){
return (new re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RAtom(state,meta,validator,watches));
});

/**
 * Like clojure.core/atom, except that it keeps track of derefs.
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.atom = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$atom(var_args){
var G__35154 = arguments.length;
switch (G__35154) {
case 1:
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.atom.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
var args_arr__5794__auto__ = [];
var len__5769__auto___35658 = arguments.length;
var i__5770__auto___35660 = (0);
while(true){
if((i__5770__auto___35660 < len__5769__auto___35658)){
args_arr__5794__auto__.push((arguments[i__5770__auto___35660]));

var G__35662 = (i__5770__auto___35660 + (1));
i__5770__auto___35660 = G__35662;
continue;
} else {
}
break;
}

var argseq__5795__auto__ = (new cljs.core.IndexedSeq(args_arr__5794__auto__.slice((1)),(0),null));
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.atom.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5795__auto__);

}
});

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.atom.cljs$core$IFn$_invoke$arity$1 = (function (x){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.__GT_RAtom(x,null,null,null);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.atom.cljs$core$IFn$_invoke$arity$variadic = (function (x,p__35155){
var map__35156 = p__35155;
var map__35156__$1 = cljs.core.__destructure_map(map__35156);
var meta = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35156__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
var validator = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35156__$1,new cljs.core.Keyword(null,"validator","validator",-1966190681));
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.__GT_RAtom(x,meta,validator,null);
}));

/** @this {Function} */
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.atom.cljs$lang$applyTo = (function (seq35152){
var G__35153 = cljs.core.first(seq35152);
var seq35152__$1 = cljs.core.next(seq35152);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__35153,seq35152__$1);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.atom.cljs$lang$maxFixedArity = (1));

re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.cached_reaction = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$cached_reaction(f,o,k,obj,destroy){
var m = o.reagReactionCache;
var m__$1 = (((m == null))?cljs.core.PersistentArrayMap.EMPTY:m);
var r = (m__$1.cljs$core$IFn$_invoke$arity$2 ? m__$1.cljs$core$IFn$_invoke$arity$2(k,null) : m__$1.call(null,k,null));
if((!((r == null)))){
return cljs.core._deref(r);
} else {
if((re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_ == null)){
return (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
} else {
var r__$1 = (function (){var G__35161 = f;
var G__35162 = new cljs.core.Keyword(null,"on-dispose","on-dispose",2105306360);
var G__35163 = (function (x){
if(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.debug){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._running,cljs.core.dec);
} else {
}

var __35663 = o.reagReactionCache;
var __35664__$1 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(__35663,k);
(o.reagReactionCache = __35664__$1);

if((!((obj == null)))){
(obj.reaction = null);
} else {
}

if((!((destroy == null)))){
return (destroy.cljs$core$IFn$_invoke$arity$1 ? destroy.cljs$core$IFn$_invoke$arity$1(x) : destroy.call(null,x));
} else {
return null;
}
});
return (re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_reaction.cljs$core$IFn$_invoke$arity$3 ? re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_reaction.cljs$core$IFn$_invoke$arity$3(G__35161,G__35162,G__35163) : re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_reaction.call(null,G__35161,G__35162,G__35163));
})();
var v = cljs.core._deref(r__$1);
(o.reagReactionCache = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m__$1,k,r__$1));

if(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.debug){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._running,cljs.core.inc);
} else {
}

if((!((obj == null)))){
(obj.reaction = r__$1);
} else {
}

return v;

}
}
});

/**
* @constructor
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.IReactiveAtom}
*/
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Track = (function (f,args,reaction){
this.f = f;
this.args = args;
this.reaction = reaction;
this.cljs$lang$protocol_mask$partition0$ = 2153807872;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Track.prototype.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IReactiveAtom$ = cljs.core.PROTOCOL_SENTINEL);

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Track.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var temp__5806__auto__ = self__.reaction;
if((temp__5806__auto__ == null)){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.cached_reaction((function (){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(self__.f,self__.args);
}),self__.f,self__.args,this$__$1,null);
} else {
var r = temp__5806__auto__;
return cljs.core._deref(r);
}
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Track.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (_,other){
var self__ = this;
var ___$1 = this;
return (((other instanceof re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Track)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.f,other.f)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.args,other.args)))));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Track.prototype.cljs$core$IHash$_hash$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.hash(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.f,self__.args], null));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Track.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (a,w,opts){
var self__ = this;
var a__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.pr_atom(a__$1,w,opts,"Track",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"val","val",128701612),a__$1.cljs$core$IDeref$_deref$arity$1(null),new cljs.core.Keyword(null,"f","f",-1597136552),self__.f], null));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Track.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"args","args",-1338879193,null),cljs.core.with_meta(new cljs.core.Symbol(null,"reaction","reaction",2131401315,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Track.cljs$lang$type = true);

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Track.cljs$lang$ctorStr = "re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/Track");

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Track.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/Track");
}));

/**
 * Positional factory function for re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/Track.
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.__GT_Track = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$__GT_Track(f,args,reaction){
return (new re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Track(f,args,reaction));
});

re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_track = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$make_track(f,args){
return (new re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Track(f,args,null));
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_track_BANG_ = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$make_track_BANG_(f,args){
var t = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_track(f,args);
var r = (function (){var G__35231 = (function (){
return t.cljs$core$IDeref$_deref$arity$1(null);
});
var G__35232 = new cljs.core.Keyword(null,"auto-run","auto-run",1958400437);
var G__35233 = true;
return (re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_reaction.cljs$core$IFn$_invoke$arity$3 ? re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_reaction.cljs$core$IFn$_invoke$arity$3(G__35231,G__35232,G__35233) : re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_reaction.call(null,G__35231,G__35232,G__35233));
})();
cljs.core.deref(r);

return r;
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.track = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$track(var_args){
var args__5775__auto__ = [];
var len__5769__auto___35668 = arguments.length;
var i__5770__auto___35669 = (0);
while(true){
if((i__5770__auto___35669 < len__5769__auto___35668)){
args__5775__auto__.push((arguments[i__5770__auto___35669]));

var G__35670 = (i__5770__auto___35669 + (1));
i__5770__auto___35669 = G__35670;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.track.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.track.cljs$core$IFn$_invoke$arity$variadic = (function (f,args){
if(cljs.core.ifn_QMARK_(f)){
} else {
throw (new Error("Assert failed: (ifn? f)"));
}

return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_track(f,args);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.track.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.track.cljs$lang$applyTo = (function (seq35237){
var G__35238 = cljs.core.first(seq35237);
var seq35237__$1 = cljs.core.next(seq35237);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__35238,seq35237__$1);
}));

re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.track_BANG_ = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$track_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___35672 = arguments.length;
var i__5770__auto___35673 = (0);
while(true){
if((i__5770__auto___35673 < len__5769__auto___35672)){
args__5775__auto__.push((arguments[i__5770__auto___35673]));

var G__35675 = (i__5770__auto___35673 + (1));
i__5770__auto___35673 = G__35675;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.track_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.track_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (f,args){
if(cljs.core.ifn_QMARK_(f)){
} else {
throw (new Error("Assert failed: (ifn? f)"));
}

return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_track_BANG_(f,args);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.track_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.track_BANG_.cljs$lang$applyTo = (function (seq35253){
var G__35254 = cljs.core.first(seq35253);
var seq35253__$1 = cljs.core.next(seq35253);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__35254,seq35253__$1);
}));


/**
* @constructor
 * @implements {cljs.core.IWatchable}
 * @implements {cljs.core.IAtom}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.IReactiveAtom}
*/
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor = (function (ratom,path,reaction,state,watches){
this.ratom = ratom;
this.path = path;
this.reaction = reaction;
this.state = state;
this.watches = watches;
this.cljs$lang$protocol_mask$partition0$ = 2153807872;
this.cljs$lang$protocol_mask$partition1$ = 114690;
});
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype._peek = (function (){
var self__ = this;
var this$ = this;
var _STAR_ratom_context_STAR__orig_val__35274 = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_;
var _STAR_ratom_context_STAR__temp_val__35275 = null;
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__temp_val__35275);

try{return this$.cljs$core$IDeref$_deref$arity$1(null);
}finally {(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__orig_val__35274);
}}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype._set_state = (function (oldstate,newstate){
var self__ = this;
var this$ = this;
if((oldstate === newstate)){
return null;
} else {
(self__.state = newstate);

if((!((self__.watches == null)))){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.notify_w(this$,oldstate,newstate);
} else {
return null;
}
}
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IReactiveAtom$ = cljs.core.PROTOCOL_SENTINEL);

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (a,w,opts){
var self__ = this;
var a__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.pr_atom(a__$1,w,opts,"RCursor",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"val","val",128701612),a__$1.cljs$core$IDeref$_deref$arity$1(null),new cljs.core.Keyword(null,"path","path",-188191168),self__.path], null));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype.cljs$core$IHash$_hash$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.hash(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [self__.ratom,self__.path], null));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (_,other){
var self__ = this;
var ___$1 = this;
return (((other instanceof re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.path,other.path)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.ratom,other.ratom)))));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (this$,new_value){
var self__ = this;
var this$__$1 = this;
var oldstate = self__.state;
this$__$1._set_state(oldstate,new_value);

if((((!((self__.ratom == null))))?(((((self__.ratom.cljs$lang$protocol_mask$partition0$ & (32768))) || ((cljs.core.PROTOCOL_SENTINEL === self__.ratom.cljs$core$IDeref$))))?true:(((!self__.ratom.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,self__.ratom):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,self__.ratom))){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.path,cljs.core.PersistentVector.EMPTY)){
cljs.core.reset_BANG_(self__.ratom,new_value);
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.ratom,cljs.core.assoc_in,self__.path,new_value);
}
} else {
(self__.ratom.cljs$core$IFn$_invoke$arity$2 ? self__.ratom.cljs$core$IFn$_invoke$arity$2(self__.path,new_value) : self__.ratom.call(null,self__.path,new_value));
}

return new_value;
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (a,f){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__35300 = a__$1._peek();
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__35300) : f.call(null,G__35300));
})());
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (a,f,x){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__35301 = a__$1._peek();
var G__35302 = x;
return (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(G__35301,G__35302) : f.call(null,G__35301,G__35302));
})());
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (a,f,x,y){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__35308 = a__$1._peek();
var G__35309 = x;
var G__35310 = y;
return (f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(G__35308,G__35309,G__35310) : f.call(null,G__35308,G__35309,G__35310));
})());
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (a,f,x,y,more){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f,a__$1._peek(),x,y,more));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,old,new$){
var self__ = this;
var this$__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.notify_w(this$__$1,old,new$);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f){
var self__ = this;
var this$__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.add_w(this$__$1,key,f);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var self__ = this;
var this$__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.remove_w(this$__$1,key);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var oldstate = self__.state;
var newstate = (function (){var temp__5806__auto__ = self__.reaction;
if((temp__5806__auto__ == null)){
var f = (((((!((self__.ratom == null))))?(((((self__.ratom.cljs$lang$protocol_mask$partition0$ & (32768))) || ((cljs.core.PROTOCOL_SENTINEL === self__.ratom.cljs$core$IDeref$))))?true:(((!self__.ratom.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,self__.ratom):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,self__.ratom)))?(function (){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.ratom),self__.path);
}):(function (){
return (self__.ratom.cljs$core$IFn$_invoke$arity$1 ? self__.ratom.cljs$core$IFn$_invoke$arity$1(self__.path) : self__.ratom.call(null,self__.path));
}));
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.cached_reaction(f,self__.ratom,self__.path,this$__$1,null);
} else {
var r = temp__5806__auto__;
return cljs.core._deref(r);
}
})();
this$__$1._set_state(oldstate,newstate);

return newstate;
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ratom","ratom",1514010260,null),new cljs.core.Symbol(null,"path","path",1452340359,null),cljs.core.with_meta(new cljs.core.Symbol(null,"reaction","reaction",2131401315,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"state","state",-348086572,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"watches","watches",1367433992,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.cljs$lang$type = true);

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.cljs$lang$ctorStr = "re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/RCursor");

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/RCursor");
}));

/**
 * Positional factory function for re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/RCursor.
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.__GT_RCursor = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$__GT_RCursor(ratom,path,reaction,state,watches){
return (new re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.RCursor(ratom,path,reaction,state,watches));
});

re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.cursor = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$cursor(src,path){
if((function (){var or__5045__auto__ = (((!((src == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === src.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IReactiveAtom$))))?true:(((!src.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.IReactiveAtom,src):false)):cljs.core.native_satisfies_QMARK_(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.IReactiveAtom,src));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return ((cljs.core.ifn_QMARK_(src)) && ((!(cljs.core.vector_QMARK_(src)))));
}
})()){
} else {
throw (new Error(["Assert failed: ",["src must be a reactive atom or a function, not ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([src], 0))," while attempting to get path: ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path], 0))].join(''),"\n","(or (satisfies? IReactiveAtom src) (and (ifn? src) (not (vector? src))))"].join('')));
}

return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.__GT_RCursor(src,path,null,null,null);
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.with_let_destroy = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$with_let_destroy(v){
var temp__5808__auto__ = v.destroy;
if((temp__5808__auto__ == null)){
return null;
} else {
var f = temp__5808__auto__;
return (f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null));
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.with_let_values = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$with_let_values(key){
var temp__5806__auto__ = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_;
if((temp__5806__auto__ == null)){
return [];
} else {
var c = temp__5806__auto__;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.cached_reaction(cljs.core.array,c,key,null,re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.with_let_destroy);
}
});

/**
 * @interface
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.IDisposable = function(){};

var re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IDisposable$dispose_BANG_$dyn_35680 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.dispose_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.dispose_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IDisposable.dispose!",this$);
}
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.dispose_BANG_ = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$dispose_BANG_(this$){
if((((!((this$ == null)))) && ((!((this$.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IDisposable$dispose_BANG_$arity$1 == null)))))){
return this$.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IDisposable$dispose_BANG_$arity$1(this$);
} else {
return re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IDisposable$dispose_BANG_$dyn_35680(this$);
}
});

var re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IDisposable$add_on_dispose_BANG_$dyn_35681 = (function (this$,f){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.add_on_dispose_BANG_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(this$,f) : m__5394__auto__.call(null,this$,f));
} else {
var m__5392__auto__ = (re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.add_on_dispose_BANG_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(this$,f) : m__5392__auto__.call(null,this$,f));
} else {
throw cljs.core.missing_protocol("IDisposable.add-on-dispose!",this$);
}
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.add_on_dispose_BANG_ = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$add_on_dispose_BANG_(this$,f){
if((((!((this$ == null)))) && ((!((this$.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IDisposable$add_on_dispose_BANG_$arity$2 == null)))))){
return this$.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IDisposable$add_on_dispose_BANG_$arity$2(this$,f);
} else {
return re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IDisposable$add_on_dispose_BANG_$dyn_35681(this$,f);
}
});


/**
 * @interface
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.IRunnable = function(){};

var re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IRunnable$run$dyn_35684 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.run[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.run["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IRunnable.run",this$);
}
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.run = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$run(this$){
if((((!((this$ == null)))) && ((!((this$.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IRunnable$run$arity$1 == null)))))){
return this$.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IRunnable$run$arity$1(this$);
} else {
return re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IRunnable$run$dyn_35684(this$);
}
});

re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.handle_reaction_change = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$handle_reaction_change(this$,sender,old,new$){
return this$._handle_change(sender,old,new$);
});

/**
* @constructor
 * @implements {cljs.core.IWatchable}
 * @implements {cljs.core.IAtom}
 * @implements {re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.IDisposable}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.IRunnable}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.IReactiveAtom}
*/
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction = (function (f,state,dirty_QMARK_,nocache_QMARK_,watching,watches,auto_run,caught){
this.f = f;
this.state = state;
this.dirty_QMARK_ = dirty_QMARK_;
this.nocache_QMARK_ = nocache_QMARK_;
this.watching = watching;
this.watches = watches;
this.auto_run = auto_run;
this.caught = caught;
this.cljs$lang$protocol_mask$partition0$ = 2153807872;
this.cljs$lang$protocol_mask$partition1$ = 114690;
});
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype._peek_at = (function (){
var self__ = this;
var this$ = this;
var _STAR_ratom_context_STAR__orig_val__35359 = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_;
var _STAR_ratom_context_STAR__temp_val__35360 = null;
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__temp_val__35360);

try{return this$.cljs$core$IDeref$_deref$arity$1(null);
}finally {(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_ = _STAR_ratom_context_STAR__orig_val__35359);
}}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype._handle_change = (function (sender,oldval,newval){
var self__ = this;
var this$ = this;
if((((oldval === newval)) || (self__.dirty_QMARK_))){
return null;
} else {
if((self__.auto_run == null)){
(self__.dirty_QMARK_ = true);

return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.rea_enqueue(this$);
} else {
if(self__.auto_run === true){
return this$._run(false);
} else {
return (self__.auto_run.cljs$core$IFn$_invoke$arity$1 ? self__.auto_run.cljs$core$IFn$_invoke$arity$1(this$) : self__.auto_run.call(null,this$));
}
}
}
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype._update_watching = (function (derefed){
var self__ = this;
var this$ = this;
var new$ = cljs.core.set(derefed);
var old = cljs.core.set(self__.watching);
(self__.watching = derefed);

var seq__35392_35687 = cljs.core.seq(clojure.set.difference.cljs$core$IFn$_invoke$arity$2(new$,old));
var chunk__35393_35688 = null;
var count__35394_35689 = (0);
var i__35395_35690 = (0);
while(true){
if((i__35395_35690 < count__35394_35689)){
var w_35693 = chunk__35393_35688.cljs$core$IIndexed$_nth$arity$2(null,i__35395_35690);
cljs.core._add_watch(w_35693,this$,re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.handle_reaction_change);


var G__35694 = seq__35392_35687;
var G__35695 = chunk__35393_35688;
var G__35696 = count__35394_35689;
var G__35697 = (i__35395_35690 + (1));
seq__35392_35687 = G__35694;
chunk__35393_35688 = G__35695;
count__35394_35689 = G__35696;
i__35395_35690 = G__35697;
continue;
} else {
var temp__5804__auto___35698 = cljs.core.seq(seq__35392_35687);
if(temp__5804__auto___35698){
var seq__35392_35699__$1 = temp__5804__auto___35698;
if(cljs.core.chunked_seq_QMARK_(seq__35392_35699__$1)){
var c__5568__auto___35700 = cljs.core.chunk_first(seq__35392_35699__$1);
var G__35701 = cljs.core.chunk_rest(seq__35392_35699__$1);
var G__35702 = c__5568__auto___35700;
var G__35703 = cljs.core.count(c__5568__auto___35700);
var G__35704 = (0);
seq__35392_35687 = G__35701;
chunk__35393_35688 = G__35702;
count__35394_35689 = G__35703;
i__35395_35690 = G__35704;
continue;
} else {
var w_35705 = cljs.core.first(seq__35392_35699__$1);
cljs.core._add_watch(w_35705,this$,re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.handle_reaction_change);


var G__35706 = cljs.core.next(seq__35392_35699__$1);
var G__35707 = null;
var G__35708 = (0);
var G__35709 = (0);
seq__35392_35687 = G__35706;
chunk__35393_35688 = G__35707;
count__35394_35689 = G__35708;
i__35395_35690 = G__35709;
continue;
}
} else {
}
}
break;
}

var seq__35408 = cljs.core.seq(clojure.set.difference.cljs$core$IFn$_invoke$arity$2(old,new$));
var chunk__35409 = null;
var count__35410 = (0);
var i__35411 = (0);
while(true){
if((i__35411 < count__35410)){
var w = chunk__35409.cljs$core$IIndexed$_nth$arity$2(null,i__35411);
cljs.core._remove_watch(w,this$);


var G__35710 = seq__35408;
var G__35711 = chunk__35409;
var G__35712 = count__35410;
var G__35713 = (i__35411 + (1));
seq__35408 = G__35710;
chunk__35409 = G__35711;
count__35410 = G__35712;
i__35411 = G__35713;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__35408);
if(temp__5804__auto__){
var seq__35408__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__35408__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__35408__$1);
var G__35714 = cljs.core.chunk_rest(seq__35408__$1);
var G__35715 = c__5568__auto__;
var G__35716 = cljs.core.count(c__5568__auto__);
var G__35717 = (0);
seq__35408 = G__35714;
chunk__35409 = G__35715;
count__35410 = G__35716;
i__35411 = G__35717;
continue;
} else {
var w = cljs.core.first(seq__35408__$1);
cljs.core._remove_watch(w,this$);


var G__35718 = cljs.core.next(seq__35408__$1);
var G__35719 = null;
var G__35720 = (0);
var G__35721 = (0);
seq__35408 = G__35718;
chunk__35409 = G__35719;
count__35410 = G__35720;
i__35411 = G__35721;
continue;
}
} else {
return null;
}
}
break;
}
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype._queued_run = (function (){
var self__ = this;
var this$ = this;
if(((self__.dirty_QMARK_) && ((!((self__.watching == null)))))){
return this$._run(true);
} else {
return null;
}
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype._try_capture = (function (f__$1){
var self__ = this;
var this$ = this;
try{(self__.caught = null);

return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.deref_capture(f__$1,this$);
}catch (e35435){var e = e35435;
(self__.state = e);

(self__.caught = e);

return (self__.dirty_QMARK_ = false);
}}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype._run = (function (check){
var self__ = this;
var this$ = this;
var oldstate = self__.state;
var res = (cljs.core.truth_(check)?this$._try_capture(self__.f):re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.deref_capture(self__.f,this$));
if(self__.nocache_QMARK_){
} else {
(self__.state = res);

if((((self__.watches == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(oldstate,res)))){
} else {
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.notify_w(this$,oldstate,res);
}
}

return res;
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype._set_opts = (function (p__35447){
var self__ = this;
var map__35449 = p__35447;
var map__35449__$1 = cljs.core.__destructure_map(map__35449);
var auto_run__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35449__$1,new cljs.core.Keyword(null,"auto-run","auto-run",1958400437));
var on_set = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35449__$1,new cljs.core.Keyword(null,"on-set","on-set",-140953470));
var on_dispose = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35449__$1,new cljs.core.Keyword(null,"on-dispose","on-dispose",2105306360));
var no_cache = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35449__$1,new cljs.core.Keyword(null,"no-cache","no-cache",1588056370));
var this$ = this;
if((!((auto_run__$1 == null)))){
(this$.auto_run = auto_run__$1);
} else {
}

if((!((on_set == null)))){
(this$.on_set = on_set);
} else {
}

if((!((on_dispose == null)))){
(this$.on_dispose = on_dispose);
} else {
}

if((!((no_cache == null)))){
return (this$.nocache_QMARK_ = no_cache);
} else {
return null;
}
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IReactiveAtom$ = cljs.core.PROTOCOL_SENTINEL);

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (a,w,opts){
var self__ = this;
var a__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.pr_atom(a__$1,w,opts,"Reaction",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"val","val",128701612),a__$1.cljs$core$IDeref$_deref$arity$1(null)], null));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return goog.getUid(this$__$1);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (o,other){
var self__ = this;
var o__$1 = this;
return (o__$1 === other);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IDisposable$ = cljs.core.PROTOCOL_SENTINEL);

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IDisposable$dispose_BANG_$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var s = self__.state;
var wg = self__.watching;
(self__.watching = null);

(self__.state = null);

(self__.auto_run = null);

(self__.dirty_QMARK_ = true);

var seq__35477_35725 = cljs.core.seq(cljs.core.set(wg));
var chunk__35478_35726 = null;
var count__35479_35727 = (0);
var i__35480_35728 = (0);
while(true){
if((i__35480_35728 < count__35479_35727)){
var w_35729 = chunk__35478_35726.cljs$core$IIndexed$_nth$arity$2(null,i__35480_35728);
cljs.core._remove_watch(w_35729,this$__$1);


var G__35730 = seq__35477_35725;
var G__35731 = chunk__35478_35726;
var G__35732 = count__35479_35727;
var G__35733 = (i__35480_35728 + (1));
seq__35477_35725 = G__35730;
chunk__35478_35726 = G__35731;
count__35479_35727 = G__35732;
i__35480_35728 = G__35733;
continue;
} else {
var temp__5804__auto___35734 = cljs.core.seq(seq__35477_35725);
if(temp__5804__auto___35734){
var seq__35477_35735__$1 = temp__5804__auto___35734;
if(cljs.core.chunked_seq_QMARK_(seq__35477_35735__$1)){
var c__5568__auto___35736 = cljs.core.chunk_first(seq__35477_35735__$1);
var G__35737 = cljs.core.chunk_rest(seq__35477_35735__$1);
var G__35738 = c__5568__auto___35736;
var G__35739 = cljs.core.count(c__5568__auto___35736);
var G__35740 = (0);
seq__35477_35725 = G__35737;
chunk__35478_35726 = G__35738;
count__35479_35727 = G__35739;
i__35480_35728 = G__35740;
continue;
} else {
var w_35741 = cljs.core.first(seq__35477_35735__$1);
cljs.core._remove_watch(w_35741,this$__$1);


var G__35742 = cljs.core.next(seq__35477_35735__$1);
var G__35743 = null;
var G__35744 = (0);
var G__35745 = (0);
seq__35477_35725 = G__35742;
chunk__35478_35726 = G__35743;
count__35479_35727 = G__35744;
i__35480_35728 = G__35745;
continue;
}
} else {
}
}
break;
}

if((!((this$__$1.on_dispose == null)))){
this$__$1.on_dispose(s);
} else {
}

var temp__5808__auto__ = this$__$1.on_dispose_arr;
if((temp__5808__auto__ == null)){
return null;
} else {
var a = temp__5808__auto__;
var n__5636__auto__ = a.length;
var i = (0);
while(true){
if((i < n__5636__auto__)){
var fexpr__35501_35746 = (a[i]);
(fexpr__35501_35746.cljs$core$IFn$_invoke$arity$1 ? fexpr__35501_35746.cljs$core$IFn$_invoke$arity$1(this$__$1) : fexpr__35501_35746.call(null,this$__$1));

var G__35747 = (i + (1));
i = G__35747;
continue;
} else {
return null;
}
break;
}
}
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IDisposable$add_on_dispose_BANG_$arity$2 = (function (this$,f__$1){
var self__ = this;
var this$__$1 = this;
var temp__5806__auto__ = this$__$1.on_dispose_arr;
if((temp__5806__auto__ == null)){
return (this$__$1.on_dispose_arr = [f__$1]);
} else {
var a = temp__5806__auto__;
return a.push(f__$1);
}
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (a,newval){
var self__ = this;
var a__$1 = this;
if(cljs.core.fn_QMARK_(a__$1.on_set)){
} else {
throw (new Error(["Assert failed: ","Reaction is read only; on-set is not allowed","\n","(fn? (.-on-set a))"].join('')));
}

var oldval = self__.state;
(self__.state = newval);

a__$1.on_set(oldval,newval);

re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.notify_w(a__$1,oldval,newval);

return newval;
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (a,f__$1){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__35515 = a__$1._peek_at();
return (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(G__35515) : f__$1.call(null,G__35515));
})());
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (a,f__$1,x){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__35519 = a__$1._peek_at();
var G__35520 = x;
return (f__$1.cljs$core$IFn$_invoke$arity$2 ? f__$1.cljs$core$IFn$_invoke$arity$2(G__35519,G__35520) : f__$1.call(null,G__35519,G__35520));
})());
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (a,f__$1,x,y){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(function (){var G__35526 = a__$1._peek_at();
var G__35527 = x;
var G__35528 = y;
return (f__$1.cljs$core$IFn$_invoke$arity$3 ? f__$1.cljs$core$IFn$_invoke$arity$3(G__35526,G__35527,G__35528) : f__$1.call(null,G__35526,G__35527,G__35528));
})());
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (a,f__$1,x,y,more){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f__$1,a__$1._peek_at(),x,y,more));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IRunnable$ = cljs.core.PROTOCOL_SENTINEL);

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IRunnable$run$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.flush_BANG_.cljs$core$IFn$_invoke$arity$0 ? re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.flush_BANG_.cljs$core$IFn$_invoke$arity$0() : re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.flush_BANG_.call(null));

return this$__$1._run(false);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,old,new$){
var self__ = this;
var this$__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.notify_w(this$__$1,old,new$);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f__$1){
var self__ = this;
var this$__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.add_w(this$__$1,key,f__$1);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var self__ = this;
var this$__$1 = this;
var was_empty = cljs.core.empty_QMARK_(self__.watches);
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.remove_w(this$__$1,key);

if((((!(was_empty))) && (((cljs.core.empty_QMARK_(self__.watches)) && ((self__.auto_run == null)))))){
return this$__$1.re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$IDisposable$dispose_BANG_$arity$1(null);
} else {
return null;
}
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
var temp__5808__auto___35749 = self__.caught;
if((temp__5808__auto___35749 == null)){
} else {
var e_35750 = temp__5808__auto___35749;
throw e_35750;
}

var non_reactive_35751 = (re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_ == null);
if(non_reactive_35751){
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.flush_BANG_.cljs$core$IFn$_invoke$arity$0 ? re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.flush_BANG_.cljs$core$IFn$_invoke$arity$0() : re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.flush_BANG_.call(null));
} else {
}

if(((non_reactive_35751) && ((self__.auto_run == null)))){
if(self__.dirty_QMARK_){
var oldstate_35752 = self__.state;
(self__.state = (self__.f.cljs$core$IFn$_invoke$arity$0 ? self__.f.cljs$core$IFn$_invoke$arity$0() : self__.f.call(null)));

if((((self__.watches == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(oldstate_35752,self__.state)))){
} else {
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.notify_w(this$__$1,oldstate_35752,self__.state);
}
} else {
}
} else {
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.notify_deref_watcher_BANG_(this$__$1);

if(self__.dirty_QMARK_){
this$__$1._run(false);
} else {
}
}

return self__.state;
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.getBasis = (function (){
return new cljs.core.PersistentVector(null, 8, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),cljs.core.with_meta(new cljs.core.Symbol(null,"state","state",-348086572,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"dirty?","dirty?",-419314319,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"nocache?","nocache?",-1065670978,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null)], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"watching","watching",1947648227,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"watches","watches",1367433992,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"auto-run","auto-run",-696035332,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"caught","caught",2084008322,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.cljs$lang$type = true);

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.cljs$lang$ctorStr = "re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/Reaction");

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/Reaction");
}));

/**
 * Positional factory function for re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/Reaction.
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.__GT_Reaction = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$__GT_Reaction(f,state,dirty_QMARK_,nocache_QMARK_,watching,watches,auto_run,caught){
return (new re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Reaction(f,state,dirty_QMARK_,nocache_QMARK_,watching,watches,auto_run,caught));
});

re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.flush_BANG_ = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$flush_BANG_(){
while(true){
var q = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.rea_queue;
if((q == null)){
return null;
} else {
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.rea_queue = null);

var n__5636__auto___35756 = q.length;
var i_35757 = (0);
while(true){
if((i_35757 < n__5636__auto___35756)){
var r_35758 = (q[i_35757]);
r_35758._queued_run();

var G__35759 = (i_35757 + (1));
i_35757 = G__35759;
continue;
} else {
}
break;
}

continue;
}
break;
}
});
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.batching.ratom_flush = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.flush_BANG_);
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_reaction = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$make_reaction(var_args){
var args__5775__auto__ = [];
var len__5769__auto___35760 = arguments.length;
var i__5770__auto___35761 = (0);
while(true){
if((i__5770__auto___35761 < len__5769__auto___35760)){
args__5775__auto__.push((arguments[i__5770__auto___35761]));

var G__35762 = (i__5770__auto___35761 + (1));
i__5770__auto___35761 = G__35762;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_reaction.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_reaction.cljs$core$IFn$_invoke$arity$variadic = (function (f,p__35569){
var map__35570 = p__35569;
var map__35570__$1 = cljs.core.__destructure_map(map__35570);
var auto_run = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35570__$1,new cljs.core.Keyword(null,"auto-run","auto-run",1958400437));
var on_set = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35570__$1,new cljs.core.Keyword(null,"on-set","on-set",-140953470));
var on_dispose = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35570__$1,new cljs.core.Keyword(null,"on-dispose","on-dispose",2105306360));
var reaction = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.__GT_Reaction(f,null,true,false,null,null,null,null);
reaction._set_opts(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"auto-run","auto-run",1958400437),auto_run,new cljs.core.Keyword(null,"on-set","on-set",-140953470),on_set,new cljs.core.Keyword(null,"on-dispose","on-dispose",2105306360),on_dispose], null));

return reaction;
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_reaction.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_reaction.cljs$lang$applyTo = (function (seq35540){
var G__35541 = cljs.core.first(seq35540);
var seq35540__$1 = cljs.core.next(seq35540);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__35541,seq35540__$1);
}));

re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.temp_reaction = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_reaction(null);
/**
 * Evaluates `f` and returns the result.  If `f` calls `deref` on any ratoms,
 * creates a new Reaction that watches those atoms and calls `run` whenever
 * any of those watched ratoms change.  Also, the new reaction is added to
 * list of 'watches' of each of the ratoms. The `run` parameter is a function
 * that should expect one argument.  It is passed `obj` when run.  The `opts`
 * are any options accepted by a Reaction and will be set on the newly created
 * Reaction. Sets the newly created Reaction to the `key` on `obj`.
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.run_in_reaction = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$run_in_reaction(f,obj,key,run,opts){
var r = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.temp_reaction;
var res = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.deref_capture(f,r);
if((r.watching == null)){
} else {
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.temp_reaction = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_reaction(null));

r._set_opts(opts);

(r.f = f);

(r.auto_run = (function (){
return (run.cljs$core$IFn$_invoke$arity$1 ? run.cljs$core$IFn$_invoke$arity$1(obj) : run.call(null,obj));
}));

re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.goog$module$goog$object.set(obj,key,r);
}

return res;
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.check_derefs = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$check_derefs(f){
var ctx = ({});
var res = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.in_context(ctx,f);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [res,(!((ctx.captured == null)))], null);
});

/**
* @constructor
 * @implements {cljs.core.IWatchable}
 * @implements {cljs.core.IAtom}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IReset}
 * @implements {cljs.core.ISwap}
 * @implements {cljs.core.IDeref}
 * @implements {cljs.core.IPrintWithWriter}
*/
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper = (function (state,callback,changed,watches){
this.state = state;
this.callback = callback;
this.changed = changed;
this.watches = watches;
this.cljs$lang$protocol_mask$partition1$ = 114690;
this.cljs$lang$protocol_mask$partition0$ = 2149613568;
});
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
if(((self__.changed) && ((!((re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom._STAR_ratom_context_STAR_ == null)))))){
if(re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.has_console){
((re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.tracking)?re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.track_console:console).warn(["Warning: ","derefing stale wrap: ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([this$__$1], 0))].join(''));
} else {
}
} else {
}


return self__.state;
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.prototype.cljs$core$IReset$_reset_BANG_$arity$2 = (function (this$,newval){
var self__ = this;
var this$__$1 = this;
var oldval = self__.state;
(self__.changed = true);

(self__.state = newval);

if((!((self__.watches == null)))){
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.notify_w(this$__$1,oldval,newval);
} else {
}

(self__.callback.cljs$core$IFn$_invoke$arity$1 ? self__.callback.cljs$core$IFn$_invoke$arity$1(newval) : self__.callback.call(null,newval));

return newval;
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.prototype.cljs$core$ISwap$_swap_BANG_$arity$2 = (function (a,f){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(self__.state) : f.call(null,self__.state)));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.prototype.cljs$core$ISwap$_swap_BANG_$arity$3 = (function (a,f,x){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(self__.state,x) : f.call(null,self__.state,x)));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.prototype.cljs$core$ISwap$_swap_BANG_$arity$4 = (function (a,f,x,y){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,(f.cljs$core$IFn$_invoke$arity$3 ? f.cljs$core$IFn$_invoke$arity$3(self__.state,x,y) : f.call(null,self__.state,x,y)));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.prototype.cljs$core$ISwap$_swap_BANG_$arity$5 = (function (a,f,x,y,more){
var self__ = this;
var a__$1 = this;
return a__$1.cljs$core$IReset$_reset_BANG_$arity$2(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f,self__.state,x,y,more));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var self__ = this;
var this$__$1 = this;
return (((other instanceof re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper)) && ((((!(self__.changed))) && (((cljs.core.not(other.changed)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.state,other.state)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(self__.callback,other.callback)))))))));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = (function (this$,old,new$){
var self__ = this;
var this$__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.notify_w(this$__$1,old,new$);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.prototype.cljs$core$IWatchable$_add_watch$arity$3 = (function (this$,key,f){
var self__ = this;
var this$__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.add_w(this$__$1,key,f);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = (function (this$,key){
var self__ = this;
var this$__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.remove_w(this$__$1,key);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (a,w,opts){
var self__ = this;
var a__$1 = this;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.pr_atom(a__$1,w,opts,"Wrapper",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"val","val",128701612),a__$1.cljs$core$IDeref$_deref$arity$1(null)], null));
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.with_meta(new cljs.core.Symbol(null,"state","state",-348086572,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),new cljs.core.Symbol(null,"callback","callback",935395299,null),cljs.core.with_meta(new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null)),cljs.core.with_meta(new cljs.core.Symbol(null,"watches","watches",1367433992,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"mutable","mutable",875778266),true], null))], null);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.cljs$lang$type = true);

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.cljs$lang$ctorStr = "re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/Wrapper");

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/Wrapper");
}));

/**
 * Positional factory function for re-frisk.inlined-deps.reagent.v1v0v0.reagent.ratom/Wrapper.
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.__GT_Wrapper = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$__GT_Wrapper(state,callback,changed,watches){
return (new re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.Wrapper(state,callback,changed,watches));
});

re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.make_wrapper = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$ratom$make_wrapper(value,callback_fn,args){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.__GT_Wrapper(value,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util.make_partial_fn(callback_fn,args),false,null);
});

//# sourceMappingURL=re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.js.map
