goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__48320){
var map__48321 = p__48320;
var map__48321__$1 = cljs.core.__destructure_map(map__48321);
var m = map__48321__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48321__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48321__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var or__5045__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return [(function (){var temp__5804__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})()], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__48322_48412 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__48323_48413 = null;
var count__48324_48414 = (0);
var i__48325_48415 = (0);
while(true){
if((i__48325_48415 < count__48324_48414)){
var f_48416 = chunk__48323_48413.cljs$core$IIndexed$_nth$arity$2(null,i__48325_48415);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_48416], 0));


var G__48417 = seq__48322_48412;
var G__48418 = chunk__48323_48413;
var G__48419 = count__48324_48414;
var G__48420 = (i__48325_48415 + (1));
seq__48322_48412 = G__48417;
chunk__48323_48413 = G__48418;
count__48324_48414 = G__48419;
i__48325_48415 = G__48420;
continue;
} else {
var temp__5804__auto___48421 = cljs.core.seq(seq__48322_48412);
if(temp__5804__auto___48421){
var seq__48322_48422__$1 = temp__5804__auto___48421;
if(cljs.core.chunked_seq_QMARK_(seq__48322_48422__$1)){
var c__5568__auto___48423 = cljs.core.chunk_first(seq__48322_48422__$1);
var G__48424 = cljs.core.chunk_rest(seq__48322_48422__$1);
var G__48425 = c__5568__auto___48423;
var G__48426 = cljs.core.count(c__5568__auto___48423);
var G__48427 = (0);
seq__48322_48412 = G__48424;
chunk__48323_48413 = G__48425;
count__48324_48414 = G__48426;
i__48325_48415 = G__48427;
continue;
} else {
var f_48428 = cljs.core.first(seq__48322_48422__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_48428], 0));


var G__48429 = cljs.core.next(seq__48322_48422__$1);
var G__48430 = null;
var G__48431 = (0);
var G__48432 = (0);
seq__48322_48412 = G__48429;
chunk__48323_48413 = G__48430;
count__48324_48414 = G__48431;
i__48325_48415 = G__48432;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_48433 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5045__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_48433], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_48433)))?cljs.core.second(arglists_48433):arglists_48433)], 0));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Macro"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__48326_48434 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__48327_48435 = null;
var count__48328_48436 = (0);
var i__48329_48437 = (0);
while(true){
if((i__48329_48437 < count__48328_48436)){
var vec__48338_48438 = chunk__48327_48435.cljs$core$IIndexed$_nth$arity$2(null,i__48329_48437);
var name_48439 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48338_48438,(0),null);
var map__48341_48440 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48338_48438,(1),null);
var map__48341_48441__$1 = cljs.core.__destructure_map(map__48341_48440);
var doc_48442 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48341_48441__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_48443 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48341_48441__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_48439], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_48443], 0));

if(cljs.core.truth_(doc_48442)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_48442], 0));
} else {
}


var G__48444 = seq__48326_48434;
var G__48445 = chunk__48327_48435;
var G__48446 = count__48328_48436;
var G__48447 = (i__48329_48437 + (1));
seq__48326_48434 = G__48444;
chunk__48327_48435 = G__48445;
count__48328_48436 = G__48446;
i__48329_48437 = G__48447;
continue;
} else {
var temp__5804__auto___48448 = cljs.core.seq(seq__48326_48434);
if(temp__5804__auto___48448){
var seq__48326_48449__$1 = temp__5804__auto___48448;
if(cljs.core.chunked_seq_QMARK_(seq__48326_48449__$1)){
var c__5568__auto___48450 = cljs.core.chunk_first(seq__48326_48449__$1);
var G__48451 = cljs.core.chunk_rest(seq__48326_48449__$1);
var G__48452 = c__5568__auto___48450;
var G__48453 = cljs.core.count(c__5568__auto___48450);
var G__48454 = (0);
seq__48326_48434 = G__48451;
chunk__48327_48435 = G__48452;
count__48328_48436 = G__48453;
i__48329_48437 = G__48454;
continue;
} else {
var vec__48342_48455 = cljs.core.first(seq__48326_48449__$1);
var name_48456 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48342_48455,(0),null);
var map__48345_48457 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48342_48455,(1),null);
var map__48345_48458__$1 = cljs.core.__destructure_map(map__48345_48457);
var doc_48459 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48345_48458__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_48460 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48345_48458__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_48456], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_48460], 0));

if(cljs.core.truth_(doc_48459)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_48459], 0));
} else {
}


var G__48461 = cljs.core.next(seq__48326_48449__$1);
var G__48462 = null;
var G__48463 = (0);
var G__48464 = (0);
seq__48326_48434 = G__48461;
chunk__48327_48435 = G__48462;
count__48328_48436 = G__48463;
i__48329_48437 = G__48464;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5804__auto__ = cljs.spec.alpha.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(n)),cljs.core.name(nm)));
if(cljs.core.truth_(temp__5804__auto__)){
var fnspec = temp__5804__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));

var seq__48346 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__48347 = null;
var count__48348 = (0);
var i__48349 = (0);
while(true){
if((i__48349 < count__48348)){
var role = chunk__48347.cljs$core$IIndexed$_nth$arity$2(null,i__48349);
var temp__5804__auto___48465__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5804__auto___48465__$1)){
var spec_48466 = temp__5804__auto___48465__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_48466)], 0));
} else {
}


var G__48467 = seq__48346;
var G__48468 = chunk__48347;
var G__48469 = count__48348;
var G__48470 = (i__48349 + (1));
seq__48346 = G__48467;
chunk__48347 = G__48468;
count__48348 = G__48469;
i__48349 = G__48470;
continue;
} else {
var temp__5804__auto____$1 = cljs.core.seq(seq__48346);
if(temp__5804__auto____$1){
var seq__48346__$1 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__48346__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__48346__$1);
var G__48475 = cljs.core.chunk_rest(seq__48346__$1);
var G__48476 = c__5568__auto__;
var G__48477 = cljs.core.count(c__5568__auto__);
var G__48478 = (0);
seq__48346 = G__48475;
chunk__48347 = G__48476;
count__48348 = G__48477;
i__48349 = G__48478;
continue;
} else {
var role = cljs.core.first(seq__48346__$1);
var temp__5804__auto___48479__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5804__auto___48479__$2)){
var spec_48480 = temp__5804__auto___48479__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_48480)], 0));
} else {
}


var G__48481 = cljs.core.next(seq__48346__$1);
var G__48482 = null;
var G__48483 = (0);
var G__48484 = (0);
seq__48346 = G__48481;
chunk__48347 = G__48482;
count__48348 = G__48483;
i__48349 = G__48484;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
var base = (function (t){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1174270348),(((t instanceof cljs.core.ExceptionInfo))?new cljs.core.Symbol("cljs.core","ExceptionInfo","cljs.core/ExceptionInfo",701839050,null):(((t instanceof Error))?cljs.core.symbol.cljs$core$IFn$_invoke$arity$2("js",t.name):null
))], null),(function (){var temp__5804__auto__ = cljs.core.ex_message(t);
if(cljs.core.truth_(temp__5804__auto__)){
var msg = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"message","message",-406056002),msg], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.ex_data(t);
if(cljs.core.truth_(temp__5804__auto__)){
var ed = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),ed], null);
} else {
return null;
}
})()], 0));
});
var via = (function (){var via = cljs.core.PersistentVector.EMPTY;
var t = o;
while(true){
if(cljs.core.truth_(t)){
var G__48486 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(via,t);
var G__48487 = cljs.core.ex_cause(t);
via = G__48486;
t = G__48487;
continue;
} else {
return via;
}
break;
}
})();
var root = cljs.core.peek(via);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"via","via",-1904457336),cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(base,via)),new cljs.core.Keyword(null,"trace","trace",-1082747415),null], null),(function (){var temp__5804__auto__ = cljs.core.ex_message(root);
if(cljs.core.truth_(temp__5804__auto__)){
var root_msg = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cause","cause",231901252),root_msg], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = cljs.core.ex_data(root);
if(cljs.core.truth_(temp__5804__auto__)){
var data = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),data], null);
} else {
return null;
}
})(),(function (){var temp__5804__auto__ = new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358).cljs$core$IFn$_invoke$arity$1(cljs.core.ex_data(o));
if(cljs.core.truth_(temp__5804__auto__)){
var phase = temp__5804__auto__;
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"phase","phase",575722892),phase], null);
} else {
return null;
}
})()], 0));
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__48352 = datafied_throwable;
var map__48352__$1 = cljs.core.__destructure_map(map__48352);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48352__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48352__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__48352__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__48353 = cljs.core.last(via);
var map__48353__$1 = cljs.core.__destructure_map(map__48353);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48353__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48353__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48353__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__48354 = data;
var map__48354__$1 = cljs.core.__destructure_map(map__48354);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48354__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48354__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48354__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__48355 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__48355__$1 = cljs.core.__destructure_map(map__48355);
var top_data = map__48355__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48355__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__48356 = phase;
var G__48356__$1 = (((G__48356 instanceof cljs.core.Keyword))?G__48356.fqn:null);
switch (G__48356__$1) {
case "read-source":
var map__48357 = data;
var map__48357__$1 = cljs.core.__destructure_map(map__48357);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48357__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48357__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__48358 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__48358__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48358,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__48358);
var G__48358__$2 = (cljs.core.truth_((function (){var fexpr__48359 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__48359.cljs$core$IFn$_invoke$arity$1 ? fexpr__48359.cljs$core$IFn$_invoke$arity$1(source) : fexpr__48359.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__48358__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__48358__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48358__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__48358__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__48360 = top_data;
var G__48360__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48360,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__48360);
var G__48360__$2 = (cljs.core.truth_((function (){var fexpr__48361 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__48361.cljs$core$IFn$_invoke$arity$1 ? fexpr__48361.cljs$core$IFn$_invoke$arity$1(source) : fexpr__48361.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__48360__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__48360__$1);
var G__48360__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48360__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__48360__$2);
var G__48360__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48360__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__48360__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48360__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__48360__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__48362 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48362,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48362,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48362,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48362,(3),null);
var G__48365 = top_data;
var G__48365__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48365,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__48365);
var G__48365__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48365__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__48365__$1);
var G__48365__$3 = (cljs.core.truth_((function (){var and__5043__auto__ = source__$1;
if(cljs.core.truth_(and__5043__auto__)){
return method;
} else {
return and__5043__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48365__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__48365__$2);
var G__48365__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48365__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__48365__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48365__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__48365__$4;
}

break;
case "execution":
var vec__48366 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48366,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48366,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48366,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48366,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__48351_SHARP_){
var or__5045__auto__ = (p1__48351_SHARP_ == null);
if(or__5045__auto__){
return or__5045__auto__;
} else {
var fexpr__48369 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__48369.cljs$core$IFn$_invoke$arity$1 ? fexpr__48369.cljs$core$IFn$_invoke$arity$1(p1__48351_SHARP_) : fexpr__48369.call(null,p1__48351_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return line;
}
})();
var G__48370 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__48370__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48370,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__48370);
var G__48370__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48370__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__48370__$1);
var G__48370__$3 = (cljs.core.truth_((function (){var or__5045__auto__ = fn;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var and__5043__auto__ = source__$1;
if(cljs.core.truth_(and__5043__auto__)){
return method;
} else {
return and__5043__auto__;
}
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48370__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5045__auto__ = fn;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__48370__$2);
var G__48370__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48370__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__48370__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48370__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__48370__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__48356__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__48373){
var map__48374 = p__48373;
var map__48374__$1 = cljs.core.__destructure_map(map__48374);
var triage_data = map__48374__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48374__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48374__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48374__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48374__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48374__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48374__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48374__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48374__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = source;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = line;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name((function (){var or__5045__auto__ = class$;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__48375 = phase;
var G__48375__$1 = (((G__48375 instanceof cljs.core.Keyword))?G__48375.fqn:null);
switch (G__48375__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__48376 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__48377 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__48378 = loc;
var G__48379 = (cljs.core.truth_(spec)?(function (){var sb__5690__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__48380_48495 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__48381_48496 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__48382_48497 = true;
var _STAR_print_fn_STAR__temp_val__48383_48498 = (function (x__5691__auto__){
return sb__5690__auto__.append(x__5691__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__48382_48497);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__48383_48498);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__48371_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__48371_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__48381_48496);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__48380_48495);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5690__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null,"%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__48376,G__48377,G__48378,G__48379) : format.call(null,G__48376,G__48377,G__48378,G__48379));

break;
case "macroexpansion":
var G__48384 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__48385 = cause_type;
var G__48386 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__48387 = loc;
var G__48388 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__48384,G__48385,G__48386,G__48387,G__48388) : format.call(null,G__48384,G__48385,G__48386,G__48387,G__48388));

break;
case "compile-syntax-check":
var G__48389 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__48390 = cause_type;
var G__48391 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__48392 = loc;
var G__48393 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__48389,G__48390,G__48391,G__48392,G__48393) : format.call(null,G__48389,G__48390,G__48391,G__48392,G__48393));

break;
case "compilation":
var G__48394 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__48395 = cause_type;
var G__48396 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__48397 = loc;
var G__48398 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__48394,G__48395,G__48396,G__48397,G__48398) : format.call(null,G__48394,G__48395,G__48396,G__48397,G__48398));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__48399 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__48400 = symbol;
var G__48401 = loc;
var G__48402 = (function (){var sb__5690__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__48403_48500 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__48404_48501 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__48405_48502 = true;
var _STAR_print_fn_STAR__temp_val__48406_48503 = (function (x__5691__auto__){
return sb__5690__auto__.append(x__5691__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__48405_48502);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__48406_48503);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__48372_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__48372_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__48404_48501);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__48403_48500);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5690__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__48399,G__48400,G__48401,G__48402) : format.call(null,G__48399,G__48400,G__48401,G__48402));
} else {
var G__48407 = "Execution error%s at %s(%s).\n%s\n";
var G__48408 = cause_type;
var G__48409 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__48410 = loc;
var G__48411 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__48407,G__48408,G__48409,G__48410,G__48411) : format.call(null,G__48407,G__48408,G__48409,G__48410,G__48411));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__48375__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map
