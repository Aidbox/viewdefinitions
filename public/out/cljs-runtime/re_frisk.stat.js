goog.provide('re_frisk.stat');
re_frisk.stat.assoc_map = (function re_frisk$stat$assoc_map(acc,key){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,key,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"cnt","cnt",283978798),(0),new cljs.core.Keyword(null,"ms","ms",-1152709733),(0)], null));
});
re_frisk.stat.get_re_frame_handlers = (function re_frisk$stat$get_re_frame_handlers(){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"fx","fx",-1237829572),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(re_frisk.stat.assoc_map,cljs.core.PersistentArrayMap.EMPTY,cljs.core.keys(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"fx","fx",-1237829572).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frame.registrar.kind__GT_id__GT_handler)),new cljs.core.Keyword(null,"dispatch-later","dispatch-later",291951390),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"fx","fx",-1237829572),new cljs.core.Keyword(null,"dispatch","dispatch",1319337009),new cljs.core.Keyword(null,"dispatch-n","dispatch-n",-504469236),new cljs.core.Keyword(null,"deregister-event-handler","deregister-event-handler",-1096518994),new cljs.core.Keyword(null,"db","db",993250759)], 0)))),new cljs.core.Keyword(null,"cofx","cofx",2013202907),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(re_frisk.stat.assoc_map,cljs.core.PersistentArrayMap.EMPTY,cljs.core.keys(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"cofx","cofx",2013202907).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frame.registrar.kind__GT_id__GT_handler)),new cljs.core.Keyword(null,"db","db",993250759)))),new cljs.core.Keyword(null,"event","event",301435442),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(re_frisk.stat.assoc_map,cljs.core.PersistentArrayMap.EMPTY,cljs.core.keys(new cljs.core.Keyword(null,"event","event",301435442).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frame.registrar.kind__GT_id__GT_handler)))),new cljs.core.Keyword(null,"sub","sub",-2093760025),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(re_frisk.stat.assoc_map,cljs.core.PersistentArrayMap.EMPTY,cljs.core.keys(new cljs.core.Keyword(null,"sub","sub",-2093760025).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frame.registrar.kind__GT_id__GT_handler))))], null);
});
re_frisk.stat.init_stat = (function re_frisk$stat$init_stat(re_frame_data){
if(cljs.core.empty_QMARK_(cljs.core.deref(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data)))){
return cljs.core.reset_BANG_(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),re_frisk.stat.get_re_frame_handlers());
} else {
return null;
}
});
re_frisk.stat.update_trace_stat = (function re_frisk$stat$update_trace_stat(re_frame_data,traces){
var seq__40397 = cljs.core.seq(traces);
var chunk__40398 = null;
var count__40399 = (0);
var i__40400 = (0);
while(true){
if((i__40400 < count__40399)){
var map__40670 = chunk__40398.cljs$core$IIndexed$_nth$arity$2(null,i__40400);
var map__40670__$1 = cljs.core.__destructure_map(map__40670);
var event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40670__$1,new cljs.core.Keyword(null,"event","event",301435442));
var subs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40670__$1,new cljs.core.Keyword(null,"subs","subs",-186681991));
var duration = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40670__$1,new cljs.core.Keyword(null,"duration","duration",1444101068));
var effects = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40670__$1,new cljs.core.Keyword(null,"effects","effects",-282369292));
var coeffects = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40670__$1,new cljs.core.Keyword(null,"coeffects","coeffects",497912985));
if(cljs.core.truth_(event)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"event","event",301435442),cljs.core.first(event),new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"event","event",301435442),cljs.core.first(event),new cljs.core.Keyword(null,"ms","ms",-1152709733)], null),cljs.core._PLUS_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([duration], 0));

if((cljs.core.count(effects) > (0))){
var seq__40675_40870 = cljs.core.seq(cljs.core.keys(effects));
var chunk__40676_40871 = null;
var count__40677_40872 = (0);
var i__40678_40873 = (0);
while(true){
if((i__40678_40873 < count__40677_40872)){
var key_40878 = chunk__40676_40871.cljs$core$IIndexed$_nth$arity$2(null,i__40678_40873);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fx","fx",-1237829572),key_40878,new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);


var G__40879 = seq__40675_40870;
var G__40880 = chunk__40676_40871;
var G__40881 = count__40677_40872;
var G__40882 = (i__40678_40873 + (1));
seq__40675_40870 = G__40879;
chunk__40676_40871 = G__40880;
count__40677_40872 = G__40881;
i__40678_40873 = G__40882;
continue;
} else {
var temp__5804__auto___40883 = cljs.core.seq(seq__40675_40870);
if(temp__5804__auto___40883){
var seq__40675_40885__$1 = temp__5804__auto___40883;
if(cljs.core.chunked_seq_QMARK_(seq__40675_40885__$1)){
var c__5568__auto___40886 = cljs.core.chunk_first(seq__40675_40885__$1);
var G__40888 = cljs.core.chunk_rest(seq__40675_40885__$1);
var G__40889 = c__5568__auto___40886;
var G__40890 = cljs.core.count(c__5568__auto___40886);
var G__40891 = (0);
seq__40675_40870 = G__40888;
chunk__40676_40871 = G__40889;
count__40677_40872 = G__40890;
i__40678_40873 = G__40891;
continue;
} else {
var key_40892 = cljs.core.first(seq__40675_40885__$1);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fx","fx",-1237829572),key_40892,new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);


var G__40894 = cljs.core.next(seq__40675_40885__$1);
var G__40895 = null;
var G__40896 = (0);
var G__40897 = (0);
seq__40675_40870 = G__40894;
chunk__40676_40871 = G__40895;
count__40677_40872 = G__40896;
i__40678_40873 = G__40897;
continue;
}
} else {
}
}
break;
}
} else {
}

if((cljs.core.count(coeffects) > (0))){
var seq__40703_40898 = cljs.core.seq(cljs.core.keys(coeffects));
var chunk__40707_40899 = null;
var count__40708_40900 = (0);
var i__40709_40901 = (0);
while(true){
if((i__40709_40901 < count__40708_40900)){
var key_40904 = chunk__40707_40899.cljs$core$IIndexed$_nth$arity$2(null,i__40709_40901);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cofx","cofx",2013202907),key_40904,new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);


var G__40905 = seq__40703_40898;
var G__40906 = chunk__40707_40899;
var G__40907 = count__40708_40900;
var G__40908 = (i__40709_40901 + (1));
seq__40703_40898 = G__40905;
chunk__40707_40899 = G__40906;
count__40708_40900 = G__40907;
i__40709_40901 = G__40908;
continue;
} else {
var temp__5804__auto___40909 = cljs.core.seq(seq__40703_40898);
if(temp__5804__auto___40909){
var seq__40703_40912__$1 = temp__5804__auto___40909;
if(cljs.core.chunked_seq_QMARK_(seq__40703_40912__$1)){
var c__5568__auto___40913 = cljs.core.chunk_first(seq__40703_40912__$1);
var G__40914 = cljs.core.chunk_rest(seq__40703_40912__$1);
var G__40915 = c__5568__auto___40913;
var G__40916 = cljs.core.count(c__5568__auto___40913);
var G__40917 = (0);
seq__40703_40898 = G__40914;
chunk__40707_40899 = G__40915;
count__40708_40900 = G__40916;
i__40709_40901 = G__40917;
continue;
} else {
var key_40918 = cljs.core.first(seq__40703_40912__$1);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cofx","cofx",2013202907),key_40918,new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);


var G__40919 = cljs.core.next(seq__40703_40912__$1);
var G__40920 = null;
var G__40921 = (0);
var G__40922 = (0);
seq__40703_40898 = G__40919;
chunk__40707_40899 = G__40920;
count__40708_40900 = G__40921;
i__40709_40901 = G__40922;
continue;
}
} else {
}
}
break;
}
} else {
}
} else {
}

if(cljs.core.seq(subs)){
var seq__40726_40923 = cljs.core.seq(subs);
var chunk__40727_40924 = null;
var count__40728_40925 = (0);
var i__40729_40926 = (0);
while(true){
if((i__40729_40926 < count__40728_40925)){
var map__40739_40927 = chunk__40727_40924.cljs$core$IIndexed$_nth$arity$2(null,i__40729_40926);
var map__40739_40928__$1 = cljs.core.__destructure_map(map__40739_40927);
var op_type_40929 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40739_40928__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var operation_40930 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40739_40928__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var duration_40931__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40739_40928__$1,new cljs.core.Keyword(null,"duration","duration",1444101068));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type_40929,new cljs.core.Keyword("sub","run","sub/run",-1821315581))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),operation_40930,new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),operation_40930,new cljs.core.Keyword(null,"ms","ms",-1152709733)], null),cljs.core._PLUS_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([duration_40931__$1], 0));
} else {
}


var G__40938 = seq__40726_40923;
var G__40939 = chunk__40727_40924;
var G__40940 = count__40728_40925;
var G__40941 = (i__40729_40926 + (1));
seq__40726_40923 = G__40938;
chunk__40727_40924 = G__40939;
count__40728_40925 = G__40940;
i__40729_40926 = G__40941;
continue;
} else {
var temp__5804__auto___40945 = cljs.core.seq(seq__40726_40923);
if(temp__5804__auto___40945){
var seq__40726_40946__$1 = temp__5804__auto___40945;
if(cljs.core.chunked_seq_QMARK_(seq__40726_40946__$1)){
var c__5568__auto___40947 = cljs.core.chunk_first(seq__40726_40946__$1);
var G__40949 = cljs.core.chunk_rest(seq__40726_40946__$1);
var G__40950 = c__5568__auto___40947;
var G__40951 = cljs.core.count(c__5568__auto___40947);
var G__40952 = (0);
seq__40726_40923 = G__40949;
chunk__40727_40924 = G__40950;
count__40728_40925 = G__40951;
i__40729_40926 = G__40952;
continue;
} else {
var map__40744_40954 = cljs.core.first(seq__40726_40946__$1);
var map__40744_40955__$1 = cljs.core.__destructure_map(map__40744_40954);
var op_type_40956 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40744_40955__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var operation_40957 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40744_40955__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var duration_40958__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40744_40955__$1,new cljs.core.Keyword(null,"duration","duration",1444101068));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type_40956,new cljs.core.Keyword("sub","run","sub/run",-1821315581))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),operation_40957,new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),operation_40957,new cljs.core.Keyword(null,"ms","ms",-1152709733)], null),cljs.core._PLUS_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([duration_40958__$1], 0));
} else {
}


var G__40963 = cljs.core.next(seq__40726_40946__$1);
var G__40964 = null;
var G__40965 = (0);
var G__40966 = (0);
seq__40726_40923 = G__40963;
chunk__40727_40924 = G__40964;
count__40728_40925 = G__40965;
i__40729_40926 = G__40966;
continue;
}
} else {
}
}
break;
}
} else {
}


var G__40967 = seq__40397;
var G__40968 = chunk__40398;
var G__40969 = count__40399;
var G__40970 = (i__40400 + (1));
seq__40397 = G__40967;
chunk__40398 = G__40968;
count__40399 = G__40969;
i__40400 = G__40970;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__40397);
if(temp__5804__auto__){
var seq__40397__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__40397__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__40397__$1);
var G__40971 = cljs.core.chunk_rest(seq__40397__$1);
var G__40972 = c__5568__auto__;
var G__40973 = cljs.core.count(c__5568__auto__);
var G__40974 = (0);
seq__40397 = G__40971;
chunk__40398 = G__40972;
count__40399 = G__40973;
i__40400 = G__40974;
continue;
} else {
var map__40749 = cljs.core.first(seq__40397__$1);
var map__40749__$1 = cljs.core.__destructure_map(map__40749);
var event = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40749__$1,new cljs.core.Keyword(null,"event","event",301435442));
var subs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40749__$1,new cljs.core.Keyword(null,"subs","subs",-186681991));
var duration = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40749__$1,new cljs.core.Keyword(null,"duration","duration",1444101068));
var effects = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40749__$1,new cljs.core.Keyword(null,"effects","effects",-282369292));
var coeffects = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40749__$1,new cljs.core.Keyword(null,"coeffects","coeffects",497912985));
if(cljs.core.truth_(event)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"event","event",301435442),cljs.core.first(event),new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"event","event",301435442),cljs.core.first(event),new cljs.core.Keyword(null,"ms","ms",-1152709733)], null),cljs.core._PLUS_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([duration], 0));

if((cljs.core.count(effects) > (0))){
var seq__40753_40977 = cljs.core.seq(cljs.core.keys(effects));
var chunk__40754_40978 = null;
var count__40755_40979 = (0);
var i__40756_40980 = (0);
while(true){
if((i__40756_40980 < count__40755_40979)){
var key_40982 = chunk__40754_40978.cljs$core$IIndexed$_nth$arity$2(null,i__40756_40980);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fx","fx",-1237829572),key_40982,new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);


var G__40983 = seq__40753_40977;
var G__40984 = chunk__40754_40978;
var G__40985 = count__40755_40979;
var G__40986 = (i__40756_40980 + (1));
seq__40753_40977 = G__40983;
chunk__40754_40978 = G__40984;
count__40755_40979 = G__40985;
i__40756_40980 = G__40986;
continue;
} else {
var temp__5804__auto___40987__$1 = cljs.core.seq(seq__40753_40977);
if(temp__5804__auto___40987__$1){
var seq__40753_40988__$1 = temp__5804__auto___40987__$1;
if(cljs.core.chunked_seq_QMARK_(seq__40753_40988__$1)){
var c__5568__auto___40989 = cljs.core.chunk_first(seq__40753_40988__$1);
var G__40990 = cljs.core.chunk_rest(seq__40753_40988__$1);
var G__40991 = c__5568__auto___40989;
var G__40992 = cljs.core.count(c__5568__auto___40989);
var G__40993 = (0);
seq__40753_40977 = G__40990;
chunk__40754_40978 = G__40991;
count__40755_40979 = G__40992;
i__40756_40980 = G__40993;
continue;
} else {
var key_40994 = cljs.core.first(seq__40753_40988__$1);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fx","fx",-1237829572),key_40994,new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);


var G__40995 = cljs.core.next(seq__40753_40988__$1);
var G__40996 = null;
var G__40997 = (0);
var G__40998 = (0);
seq__40753_40977 = G__40995;
chunk__40754_40978 = G__40996;
count__40755_40979 = G__40997;
i__40756_40980 = G__40998;
continue;
}
} else {
}
}
break;
}
} else {
}

if((cljs.core.count(coeffects) > (0))){
var seq__40770_40999 = cljs.core.seq(cljs.core.keys(coeffects));
var chunk__40771_41000 = null;
var count__40772_41001 = (0);
var i__40773_41002 = (0);
while(true){
if((i__40773_41002 < count__40772_41001)){
var key_41004 = chunk__40771_41000.cljs$core$IIndexed$_nth$arity$2(null,i__40773_41002);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cofx","cofx",2013202907),key_41004,new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);


var G__41005 = seq__40770_40999;
var G__41006 = chunk__40771_41000;
var G__41007 = count__40772_41001;
var G__41008 = (i__40773_41002 + (1));
seq__40770_40999 = G__41005;
chunk__40771_41000 = G__41006;
count__40772_41001 = G__41007;
i__40773_41002 = G__41008;
continue;
} else {
var temp__5804__auto___41009__$1 = cljs.core.seq(seq__40770_40999);
if(temp__5804__auto___41009__$1){
var seq__40770_41010__$1 = temp__5804__auto___41009__$1;
if(cljs.core.chunked_seq_QMARK_(seq__40770_41010__$1)){
var c__5568__auto___41011 = cljs.core.chunk_first(seq__40770_41010__$1);
var G__41012 = cljs.core.chunk_rest(seq__40770_41010__$1);
var G__41013 = c__5568__auto___41011;
var G__41014 = cljs.core.count(c__5568__auto___41011);
var G__41015 = (0);
seq__40770_40999 = G__41012;
chunk__40771_41000 = G__41013;
count__40772_41001 = G__41014;
i__40773_41002 = G__41015;
continue;
} else {
var key_41016 = cljs.core.first(seq__40770_41010__$1);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cofx","cofx",2013202907),key_41016,new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);


var G__41017 = cljs.core.next(seq__40770_41010__$1);
var G__41018 = null;
var G__41019 = (0);
var G__41020 = (0);
seq__40770_40999 = G__41017;
chunk__40771_41000 = G__41018;
count__40772_41001 = G__41019;
i__40773_41002 = G__41020;
continue;
}
} else {
}
}
break;
}
} else {
}
} else {
}

if(cljs.core.seq(subs)){
var seq__40790_41021 = cljs.core.seq(subs);
var chunk__40791_41022 = null;
var count__40792_41023 = (0);
var i__40793_41024 = (0);
while(true){
if((i__40793_41024 < count__40792_41023)){
var map__40810_41025 = chunk__40791_41022.cljs$core$IIndexed$_nth$arity$2(null,i__40793_41024);
var map__40810_41026__$1 = cljs.core.__destructure_map(map__40810_41025);
var op_type_41027 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40810_41026__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var operation_41028 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40810_41026__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var duration_41029__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40810_41026__$1,new cljs.core.Keyword(null,"duration","duration",1444101068));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type_41027,new cljs.core.Keyword("sub","run","sub/run",-1821315581))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),operation_41028,new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),operation_41028,new cljs.core.Keyword(null,"ms","ms",-1152709733)], null),cljs.core._PLUS_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([duration_41029__$1], 0));
} else {
}


var G__41033 = seq__40790_41021;
var G__41034 = chunk__40791_41022;
var G__41035 = count__40792_41023;
var G__41036 = (i__40793_41024 + (1));
seq__40790_41021 = G__41033;
chunk__40791_41022 = G__41034;
count__40792_41023 = G__41035;
i__40793_41024 = G__41036;
continue;
} else {
var temp__5804__auto___41037__$1 = cljs.core.seq(seq__40790_41021);
if(temp__5804__auto___41037__$1){
var seq__40790_41039__$1 = temp__5804__auto___41037__$1;
if(cljs.core.chunked_seq_QMARK_(seq__40790_41039__$1)){
var c__5568__auto___41040 = cljs.core.chunk_first(seq__40790_41039__$1);
var G__41041 = cljs.core.chunk_rest(seq__40790_41039__$1);
var G__41042 = c__5568__auto___41040;
var G__41043 = cljs.core.count(c__5568__auto___41040);
var G__41044 = (0);
seq__40790_41021 = G__41041;
chunk__40791_41022 = G__41042;
count__40792_41023 = G__41043;
i__40793_41024 = G__41044;
continue;
} else {
var map__40837_41046 = cljs.core.first(seq__40790_41039__$1);
var map__40837_41047__$1 = cljs.core.__destructure_map(map__40837_41046);
var op_type_41048 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40837_41047__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var operation_41049 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40837_41047__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var duration_41050__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40837_41047__$1,new cljs.core.Keyword(null,"duration","duration",1444101068));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type_41048,new cljs.core.Keyword("sub","run","sub/run",-1821315581))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),operation_41049,new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"sub","sub",-2093760025),operation_41049,new cljs.core.Keyword(null,"ms","ms",-1152709733)], null),cljs.core._PLUS_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([duration_41050__$1], 0));
} else {
}


var G__41060 = cljs.core.next(seq__40790_41039__$1);
var G__41061 = null;
var G__41062 = (0);
var G__41063 = (0);
seq__40790_41021 = G__41060;
chunk__40791_41022 = G__41061;
count__40792_41023 = G__41062;
i__40793_41024 = G__41063;
continue;
}
} else {
}
}
break;
}
} else {
}


var G__41064 = cljs.core.next(seq__40397__$1);
var G__41065 = null;
var G__41066 = (0);
var G__41067 = (0);
seq__40397 = G__41064;
chunk__40398 = G__41065;
count__40399 = G__41066;
i__40400 = G__41067;
continue;
}
} else {
return null;
}
}
break;
}
});
re_frisk.stat.update_event_stat = (function re_frisk$stat$update_event_stat(re_frame_data,event){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new cljs.core.Keyword(null,"stat","stat",-1370599836).cljs$core$IFn$_invoke$arity$1(re_frame_data),cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"event","event",301435442),event,new cljs.core.Keyword(null,"cnt","cnt",283978798)], null),cljs.core.inc);
});

//# sourceMappingURL=re_frisk.stat.js.map
