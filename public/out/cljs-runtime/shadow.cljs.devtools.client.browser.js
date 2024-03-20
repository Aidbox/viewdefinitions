goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__5775__auto__ = [];
var len__5769__auto___49112 = arguments.length;
var i__5770__auto___49113 = (0);
while(true){
if((i__5770__auto___49113 < len__5769__auto___49112)){
args__5775__auto__.push((arguments[i__5770__auto___49113]));

var G__49114 = (i__5770__auto___49113 + (1));
i__5770__auto___49113 = G__49114;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic = (function (msg,args){
if(shadow.cljs.devtools.client.env.log){
if(cljs.core.seq(shadow.cljs.devtools.client.env.log_style)){
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [["%cshadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join(''),shadow.cljs.devtools.client.env.log_style], null),args)));
} else {
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["shadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join('')], null),args)));
}
} else {
return null;
}
}));

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq48825){
var G__48826 = cljs.core.first(seq48825);
var seq48825__$1 = cljs.core.next(seq48825);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__48826,seq48825__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__48832 = cljs.core.seq(sources);
var chunk__48833 = null;
var count__48834 = (0);
var i__48835 = (0);
while(true){
if((i__48835 < count__48834)){
var map__48840 = chunk__48833.cljs$core$IIndexed$_nth$arity$2(null,i__48835);
var map__48840__$1 = cljs.core.__destructure_map(map__48840);
var src = map__48840__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48840__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48840__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48840__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48840__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e48842){var e_49115 = e48842;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_49115);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_49115.message)].join('')));
}

var G__49116 = seq__48832;
var G__49117 = chunk__48833;
var G__49118 = count__48834;
var G__49119 = (i__48835 + (1));
seq__48832 = G__49116;
chunk__48833 = G__49117;
count__48834 = G__49118;
i__48835 = G__49119;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__48832);
if(temp__5804__auto__){
var seq__48832__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__48832__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__48832__$1);
var G__49120 = cljs.core.chunk_rest(seq__48832__$1);
var G__49121 = c__5568__auto__;
var G__49122 = cljs.core.count(c__5568__auto__);
var G__49123 = (0);
seq__48832 = G__49120;
chunk__48833 = G__49121;
count__48834 = G__49122;
i__48835 = G__49123;
continue;
} else {
var map__48844 = cljs.core.first(seq__48832__$1);
var map__48844__$1 = cljs.core.__destructure_map(map__48844);
var src = map__48844__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48844__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48844__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48844__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48844__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e48845){var e_49124 = e48845;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_49124);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_49124.message)].join('')));
}

var G__49125 = cljs.core.next(seq__48832__$1);
var G__49126 = null;
var G__49127 = (0);
var G__49128 = (0);
seq__48832 = G__49125;
chunk__48833 = G__49126;
count__48834 = G__49127;
i__48835 = G__49128;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.do_js_reload = (function shadow$cljs$devtools$client$browser$do_js_reload(msg,sources,complete_fn,failure_fn){
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(msg,new cljs.core.Keyword(null,"log-missing-fn","log-missing-fn",732676765),(function (fn_sym){
return null;
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"log-call-async","log-call-async",183826192),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call async ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
}),new cljs.core.Keyword(null,"log-call","log-call",412404391),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
})], 0)),(function (){
return shadow.cljs.devtools.client.browser.do_js_load(sources);
}),complete_fn,failure_fn);
});
/**
 * when (require '["some-str" :as x]) is done at the REPL we need to manually call the shadow.js.require for it
 * since the file only adds the shadow$provide. only need to do this for shadow-js.
 */
shadow.cljs.devtools.client.browser.do_js_requires = (function shadow$cljs$devtools$client$browser$do_js_requires(js_requires){
var seq__48846 = cljs.core.seq(js_requires);
var chunk__48847 = null;
var count__48848 = (0);
var i__48849 = (0);
while(true){
if((i__48849 < count__48848)){
var js_ns = chunk__48847.cljs$core$IIndexed$_nth$arity$2(null,i__48849);
var require_str_49129 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_49129);


var G__49130 = seq__48846;
var G__49131 = chunk__48847;
var G__49132 = count__48848;
var G__49133 = (i__48849 + (1));
seq__48846 = G__49130;
chunk__48847 = G__49131;
count__48848 = G__49132;
i__48849 = G__49133;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__48846);
if(temp__5804__auto__){
var seq__48846__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__48846__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__48846__$1);
var G__49134 = cljs.core.chunk_rest(seq__48846__$1);
var G__49135 = c__5568__auto__;
var G__49136 = cljs.core.count(c__5568__auto__);
var G__49137 = (0);
seq__48846 = G__49134;
chunk__48847 = G__49135;
count__48848 = G__49136;
i__48849 = G__49137;
continue;
} else {
var js_ns = cljs.core.first(seq__48846__$1);
var require_str_49138 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_49138);


var G__49139 = cljs.core.next(seq__48846__$1);
var G__49140 = null;
var G__49141 = (0);
var G__49142 = (0);
seq__48846 = G__49139;
chunk__48847 = G__49140;
count__48848 = G__49141;
i__48849 = G__49142;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__48851){
var map__48852 = p__48851;
var map__48852__$1 = cljs.core.__destructure_map(map__48852);
var msg = map__48852__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48852__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48852__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5523__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__48853(s__48854){
return (new cljs.core.LazySeq(null,(function (){
var s__48854__$1 = s__48854;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__48854__$1);
if(temp__5804__auto__){
var xs__6360__auto__ = temp__5804__auto__;
var map__48859 = cljs.core.first(xs__6360__auto__);
var map__48859__$1 = cljs.core.__destructure_map(map__48859);
var src = map__48859__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48859__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48859__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5519__auto__ = ((function (s__48854__$1,map__48859,map__48859__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__48852,map__48852__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__48853_$_iter__48855(s__48856){
return (new cljs.core.LazySeq(null,((function (s__48854__$1,map__48859,map__48859__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__48852,map__48852__$1,msg,info,reload_info){
return (function (){
var s__48856__$1 = s__48856;
while(true){
var temp__5804__auto____$1 = cljs.core.seq(s__48856__$1);
if(temp__5804__auto____$1){
var s__48856__$2 = temp__5804__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__48856__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__48856__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__48858 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__48857 = (0);
while(true){
if((i__48857 < size__5522__auto__)){
var warning = cljs.core._nth(c__5521__auto__,i__48857);
cljs.core.chunk_append(b__48858,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__49143 = (i__48857 + (1));
i__48857 = G__49143;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__48858),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__48853_$_iter__48855(cljs.core.chunk_rest(s__48856__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__48858),null);
}
} else {
var warning = cljs.core.first(s__48856__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__48853_$_iter__48855(cljs.core.rest(s__48856__$2)));
}
} else {
return null;
}
break;
}
});})(s__48854__$1,map__48859,map__48859__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__48852,map__48852__$1,msg,info,reload_info))
,null,null));
});})(s__48854__$1,map__48859,map__48859__$1,src,resource_name,warnings,xs__6360__auto__,temp__5804__auto__,map__48852,map__48852__$1,msg,info,reload_info))
;
var fs__5520__auto__ = cljs.core.seq(iterys__5519__auto__(warnings));
if(fs__5520__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5520__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__48853(cljs.core.rest(s__48854__$1)));
} else {
var G__49144 = cljs.core.rest(s__48854__$1);
s__48854__$1 = G__49144;
continue;
}
} else {
var G__49145 = cljs.core.rest(s__48854__$1);
s__48854__$1 = G__49145;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(info));
})()));
if(shadow.cljs.devtools.client.env.log){
var seq__48860_49146 = cljs.core.seq(warnings);
var chunk__48861_49147 = null;
var count__48862_49148 = (0);
var i__48863_49149 = (0);
while(true){
if((i__48863_49149 < count__48862_49148)){
var map__48866_49150 = chunk__48861_49147.cljs$core$IIndexed$_nth$arity$2(null,i__48863_49149);
var map__48866_49151__$1 = cljs.core.__destructure_map(map__48866_49150);
var w_49152 = map__48866_49151__$1;
var msg_49153__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48866_49151__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_49154 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48866_49151__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_49155 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48866_49151__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_49156 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48866_49151__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_49156)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_49154),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_49155),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_49153__$1)].join(''));


var G__49157 = seq__48860_49146;
var G__49158 = chunk__48861_49147;
var G__49159 = count__48862_49148;
var G__49160 = (i__48863_49149 + (1));
seq__48860_49146 = G__49157;
chunk__48861_49147 = G__49158;
count__48862_49148 = G__49159;
i__48863_49149 = G__49160;
continue;
} else {
var temp__5804__auto___49161 = cljs.core.seq(seq__48860_49146);
if(temp__5804__auto___49161){
var seq__48860_49162__$1 = temp__5804__auto___49161;
if(cljs.core.chunked_seq_QMARK_(seq__48860_49162__$1)){
var c__5568__auto___49163 = cljs.core.chunk_first(seq__48860_49162__$1);
var G__49164 = cljs.core.chunk_rest(seq__48860_49162__$1);
var G__49165 = c__5568__auto___49163;
var G__49166 = cljs.core.count(c__5568__auto___49163);
var G__49167 = (0);
seq__48860_49146 = G__49164;
chunk__48861_49147 = G__49165;
count__48862_49148 = G__49166;
i__48863_49149 = G__49167;
continue;
} else {
var map__48867_49168 = cljs.core.first(seq__48860_49162__$1);
var map__48867_49169__$1 = cljs.core.__destructure_map(map__48867_49168);
var w_49170 = map__48867_49169__$1;
var msg_49171__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48867_49169__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_49172 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48867_49169__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_49173 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48867_49169__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_49174 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48867_49169__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_49174)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_49172),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_49173),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_49171__$1)].join(''));


var G__49175 = cljs.core.next(seq__48860_49162__$1);
var G__49176 = null;
var G__49177 = (0);
var G__49178 = (0);
seq__48860_49146 = G__49175;
chunk__48861_49147 = G__49176;
count__48862_49148 = G__49177;
i__48863_49149 = G__49178;
continue;
}
} else {
}
}
break;
}
} else {
}

if((!(shadow.cljs.devtools.client.env.autoload))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(((cljs.core.empty_QMARK_(warnings)) || (shadow.cljs.devtools.client.env.ignore_warnings))){
var sources_to_get = shadow.cljs.devtools.client.env.filter_reload_sources(info,reload_info);
if(cljs.core.not(cljs.core.seq(sources_to_get))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"after-load","after-load",-1278503285)], null)))){
} else {
shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("reloading code but no :after-load hooks are configured!",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["https://shadow-cljs.github.io/docs/UsersGuide.html#_lifecycle_hooks"], 0));
}

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__48850_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__48850_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
}));
}
} else {
return null;
}
}
});
shadow.cljs.devtools.client.browser.page_load_uri = (cljs.core.truth_(goog.global.document)?goog.Uri.parse(document.location.href):null);
shadow.cljs.devtools.client.browser.match_paths = (function shadow$cljs$devtools$client$browser$match_paths(old,new$){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("file",shadow.cljs.devtools.client.browser.page_load_uri.getScheme())){
var rel_new = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(new$,(1));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(old,rel_new)) || (clojure.string.starts_with_QMARK_(old,[rel_new,"?"].join(''))))){
return rel_new;
} else {
return null;
}
} else {
var node_uri = goog.Uri.parse(old);
var node_uri_resolved = shadow.cljs.devtools.client.browser.page_load_uri.resolve(node_uri);
var node_abs = node_uri_resolved.getPath();
var and__5043__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.browser.page_load_uri.hasSameDomainAs(node_uri))) || (cljs.core.not(node_uri.hasDomain())));
if(and__5043__auto__){
var and__5043__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(node_abs,new$);
if(and__5043__auto____$1){
return new$;
} else {
return and__5043__auto____$1;
}
} else {
return and__5043__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__48868){
var map__48869 = p__48868;
var map__48869__$1 = cljs.core.__destructure_map(map__48869);
var msg = map__48869__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48869__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48869__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var seq__48870 = cljs.core.seq(updates);
var chunk__48872 = null;
var count__48873 = (0);
var i__48874 = (0);
while(true){
if((i__48874 < count__48873)){
var path = chunk__48872.cljs$core$IIndexed$_nth$arity$2(null,i__48874);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__48984_49179 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__48988_49180 = null;
var count__48989_49181 = (0);
var i__48990_49182 = (0);
while(true){
if((i__48990_49182 < count__48989_49181)){
var node_49183 = chunk__48988_49180.cljs$core$IIndexed$_nth$arity$2(null,i__48990_49182);
if(cljs.core.not(node_49183.shadow$old)){
var path_match_49184 = shadow.cljs.devtools.client.browser.match_paths(node_49183.getAttribute("href"),path);
if(cljs.core.truth_(path_match_49184)){
var new_link_49185 = (function (){var G__49016 = node_49183.cloneNode(true);
G__49016.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_49184),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__49016;
})();
(node_49183.shadow$old = true);

(new_link_49185.onload = ((function (seq__48984_49179,chunk__48988_49180,count__48989_49181,i__48990_49182,seq__48870,chunk__48872,count__48873,i__48874,new_link_49185,path_match_49184,node_49183,path,map__48869,map__48869__$1,msg,updates,reload_info){
return (function (e){
var seq__49017_49186 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__49019_49187 = null;
var count__49020_49188 = (0);
var i__49021_49189 = (0);
while(true){
if((i__49021_49189 < count__49020_49188)){
var map__49025_49190 = chunk__49019_49187.cljs$core$IIndexed$_nth$arity$2(null,i__49021_49189);
var map__49025_49191__$1 = cljs.core.__destructure_map(map__49025_49190);
var task_49192 = map__49025_49191__$1;
var fn_str_49193 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49025_49191__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_49194 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49025_49191__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_49195 = goog.getObjectByName(fn_str_49193,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_49194)].join(''));

(fn_obj_49195.cljs$core$IFn$_invoke$arity$2 ? fn_obj_49195.cljs$core$IFn$_invoke$arity$2(path,new_link_49185) : fn_obj_49195.call(null,path,new_link_49185));


var G__49196 = seq__49017_49186;
var G__49197 = chunk__49019_49187;
var G__49198 = count__49020_49188;
var G__49199 = (i__49021_49189 + (1));
seq__49017_49186 = G__49196;
chunk__49019_49187 = G__49197;
count__49020_49188 = G__49198;
i__49021_49189 = G__49199;
continue;
} else {
var temp__5804__auto___49200 = cljs.core.seq(seq__49017_49186);
if(temp__5804__auto___49200){
var seq__49017_49201__$1 = temp__5804__auto___49200;
if(cljs.core.chunked_seq_QMARK_(seq__49017_49201__$1)){
var c__5568__auto___49202 = cljs.core.chunk_first(seq__49017_49201__$1);
var G__49203 = cljs.core.chunk_rest(seq__49017_49201__$1);
var G__49204 = c__5568__auto___49202;
var G__49205 = cljs.core.count(c__5568__auto___49202);
var G__49206 = (0);
seq__49017_49186 = G__49203;
chunk__49019_49187 = G__49204;
count__49020_49188 = G__49205;
i__49021_49189 = G__49206;
continue;
} else {
var map__49026_49207 = cljs.core.first(seq__49017_49201__$1);
var map__49026_49208__$1 = cljs.core.__destructure_map(map__49026_49207);
var task_49209 = map__49026_49208__$1;
var fn_str_49210 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49026_49208__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_49211 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49026_49208__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_49212 = goog.getObjectByName(fn_str_49210,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_49211)].join(''));

(fn_obj_49212.cljs$core$IFn$_invoke$arity$2 ? fn_obj_49212.cljs$core$IFn$_invoke$arity$2(path,new_link_49185) : fn_obj_49212.call(null,path,new_link_49185));


var G__49213 = cljs.core.next(seq__49017_49201__$1);
var G__49214 = null;
var G__49215 = (0);
var G__49216 = (0);
seq__49017_49186 = G__49213;
chunk__49019_49187 = G__49214;
count__49020_49188 = G__49215;
i__49021_49189 = G__49216;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_49183);
});})(seq__48984_49179,chunk__48988_49180,count__48989_49181,i__48990_49182,seq__48870,chunk__48872,count__48873,i__48874,new_link_49185,path_match_49184,node_49183,path,map__48869,map__48869__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_49184], 0));

goog.dom.insertSiblingAfter(new_link_49185,node_49183);


var G__49217 = seq__48984_49179;
var G__49218 = chunk__48988_49180;
var G__49219 = count__48989_49181;
var G__49220 = (i__48990_49182 + (1));
seq__48984_49179 = G__49217;
chunk__48988_49180 = G__49218;
count__48989_49181 = G__49219;
i__48990_49182 = G__49220;
continue;
} else {
var G__49221 = seq__48984_49179;
var G__49222 = chunk__48988_49180;
var G__49223 = count__48989_49181;
var G__49224 = (i__48990_49182 + (1));
seq__48984_49179 = G__49221;
chunk__48988_49180 = G__49222;
count__48989_49181 = G__49223;
i__48990_49182 = G__49224;
continue;
}
} else {
var G__49225 = seq__48984_49179;
var G__49226 = chunk__48988_49180;
var G__49227 = count__48989_49181;
var G__49228 = (i__48990_49182 + (1));
seq__48984_49179 = G__49225;
chunk__48988_49180 = G__49226;
count__48989_49181 = G__49227;
i__48990_49182 = G__49228;
continue;
}
} else {
var temp__5804__auto___49229 = cljs.core.seq(seq__48984_49179);
if(temp__5804__auto___49229){
var seq__48984_49230__$1 = temp__5804__auto___49229;
if(cljs.core.chunked_seq_QMARK_(seq__48984_49230__$1)){
var c__5568__auto___49231 = cljs.core.chunk_first(seq__48984_49230__$1);
var G__49232 = cljs.core.chunk_rest(seq__48984_49230__$1);
var G__49233 = c__5568__auto___49231;
var G__49234 = cljs.core.count(c__5568__auto___49231);
var G__49235 = (0);
seq__48984_49179 = G__49232;
chunk__48988_49180 = G__49233;
count__48989_49181 = G__49234;
i__48990_49182 = G__49235;
continue;
} else {
var node_49236 = cljs.core.first(seq__48984_49230__$1);
if(cljs.core.not(node_49236.shadow$old)){
var path_match_49237 = shadow.cljs.devtools.client.browser.match_paths(node_49236.getAttribute("href"),path);
if(cljs.core.truth_(path_match_49237)){
var new_link_49238 = (function (){var G__49027 = node_49236.cloneNode(true);
G__49027.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_49237),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__49027;
})();
(node_49236.shadow$old = true);

(new_link_49238.onload = ((function (seq__48984_49179,chunk__48988_49180,count__48989_49181,i__48990_49182,seq__48870,chunk__48872,count__48873,i__48874,new_link_49238,path_match_49237,node_49236,seq__48984_49230__$1,temp__5804__auto___49229,path,map__48869,map__48869__$1,msg,updates,reload_info){
return (function (e){
var seq__49028_49239 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__49030_49240 = null;
var count__49031_49241 = (0);
var i__49032_49242 = (0);
while(true){
if((i__49032_49242 < count__49031_49241)){
var map__49036_49243 = chunk__49030_49240.cljs$core$IIndexed$_nth$arity$2(null,i__49032_49242);
var map__49036_49244__$1 = cljs.core.__destructure_map(map__49036_49243);
var task_49245 = map__49036_49244__$1;
var fn_str_49246 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49036_49244__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_49247 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49036_49244__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_49248 = goog.getObjectByName(fn_str_49246,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_49247)].join(''));

(fn_obj_49248.cljs$core$IFn$_invoke$arity$2 ? fn_obj_49248.cljs$core$IFn$_invoke$arity$2(path,new_link_49238) : fn_obj_49248.call(null,path,new_link_49238));


var G__49249 = seq__49028_49239;
var G__49250 = chunk__49030_49240;
var G__49251 = count__49031_49241;
var G__49252 = (i__49032_49242 + (1));
seq__49028_49239 = G__49249;
chunk__49030_49240 = G__49250;
count__49031_49241 = G__49251;
i__49032_49242 = G__49252;
continue;
} else {
var temp__5804__auto___49253__$1 = cljs.core.seq(seq__49028_49239);
if(temp__5804__auto___49253__$1){
var seq__49028_49254__$1 = temp__5804__auto___49253__$1;
if(cljs.core.chunked_seq_QMARK_(seq__49028_49254__$1)){
var c__5568__auto___49255 = cljs.core.chunk_first(seq__49028_49254__$1);
var G__49256 = cljs.core.chunk_rest(seq__49028_49254__$1);
var G__49257 = c__5568__auto___49255;
var G__49258 = cljs.core.count(c__5568__auto___49255);
var G__49259 = (0);
seq__49028_49239 = G__49256;
chunk__49030_49240 = G__49257;
count__49031_49241 = G__49258;
i__49032_49242 = G__49259;
continue;
} else {
var map__49037_49260 = cljs.core.first(seq__49028_49254__$1);
var map__49037_49261__$1 = cljs.core.__destructure_map(map__49037_49260);
var task_49262 = map__49037_49261__$1;
var fn_str_49263 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49037_49261__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_49264 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49037_49261__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_49265 = goog.getObjectByName(fn_str_49263,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_49264)].join(''));

(fn_obj_49265.cljs$core$IFn$_invoke$arity$2 ? fn_obj_49265.cljs$core$IFn$_invoke$arity$2(path,new_link_49238) : fn_obj_49265.call(null,path,new_link_49238));


var G__49266 = cljs.core.next(seq__49028_49254__$1);
var G__49267 = null;
var G__49268 = (0);
var G__49269 = (0);
seq__49028_49239 = G__49266;
chunk__49030_49240 = G__49267;
count__49031_49241 = G__49268;
i__49032_49242 = G__49269;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_49236);
});})(seq__48984_49179,chunk__48988_49180,count__48989_49181,i__48990_49182,seq__48870,chunk__48872,count__48873,i__48874,new_link_49238,path_match_49237,node_49236,seq__48984_49230__$1,temp__5804__auto___49229,path,map__48869,map__48869__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_49237], 0));

goog.dom.insertSiblingAfter(new_link_49238,node_49236);


var G__49270 = cljs.core.next(seq__48984_49230__$1);
var G__49271 = null;
var G__49272 = (0);
var G__49273 = (0);
seq__48984_49179 = G__49270;
chunk__48988_49180 = G__49271;
count__48989_49181 = G__49272;
i__48990_49182 = G__49273;
continue;
} else {
var G__49274 = cljs.core.next(seq__48984_49230__$1);
var G__49275 = null;
var G__49276 = (0);
var G__49277 = (0);
seq__48984_49179 = G__49274;
chunk__48988_49180 = G__49275;
count__48989_49181 = G__49276;
i__48990_49182 = G__49277;
continue;
}
} else {
var G__49278 = cljs.core.next(seq__48984_49230__$1);
var G__49279 = null;
var G__49280 = (0);
var G__49281 = (0);
seq__48984_49179 = G__49278;
chunk__48988_49180 = G__49279;
count__48989_49181 = G__49280;
i__48990_49182 = G__49281;
continue;
}
}
} else {
}
}
break;
}


var G__49282 = seq__48870;
var G__49283 = chunk__48872;
var G__49284 = count__48873;
var G__49285 = (i__48874 + (1));
seq__48870 = G__49282;
chunk__48872 = G__49283;
count__48873 = G__49284;
i__48874 = G__49285;
continue;
} else {
var G__49286 = seq__48870;
var G__49287 = chunk__48872;
var G__49288 = count__48873;
var G__49289 = (i__48874 + (1));
seq__48870 = G__49286;
chunk__48872 = G__49287;
count__48873 = G__49288;
i__48874 = G__49289;
continue;
}
} else {
var temp__5804__auto__ = cljs.core.seq(seq__48870);
if(temp__5804__auto__){
var seq__48870__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__48870__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__48870__$1);
var G__49290 = cljs.core.chunk_rest(seq__48870__$1);
var G__49291 = c__5568__auto__;
var G__49292 = cljs.core.count(c__5568__auto__);
var G__49293 = (0);
seq__48870 = G__49290;
chunk__48872 = G__49291;
count__48873 = G__49292;
i__48874 = G__49293;
continue;
} else {
var path = cljs.core.first(seq__48870__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__49038_49294 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__49042_49295 = null;
var count__49043_49296 = (0);
var i__49044_49297 = (0);
while(true){
if((i__49044_49297 < count__49043_49296)){
var node_49298 = chunk__49042_49295.cljs$core$IIndexed$_nth$arity$2(null,i__49044_49297);
if(cljs.core.not(node_49298.shadow$old)){
var path_match_49299 = shadow.cljs.devtools.client.browser.match_paths(node_49298.getAttribute("href"),path);
if(cljs.core.truth_(path_match_49299)){
var new_link_49300 = (function (){var G__49070 = node_49298.cloneNode(true);
G__49070.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_49299),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__49070;
})();
(node_49298.shadow$old = true);

(new_link_49300.onload = ((function (seq__49038_49294,chunk__49042_49295,count__49043_49296,i__49044_49297,seq__48870,chunk__48872,count__48873,i__48874,new_link_49300,path_match_49299,node_49298,path,seq__48870__$1,temp__5804__auto__,map__48869,map__48869__$1,msg,updates,reload_info){
return (function (e){
var seq__49071_49301 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__49073_49302 = null;
var count__49074_49303 = (0);
var i__49075_49304 = (0);
while(true){
if((i__49075_49304 < count__49074_49303)){
var map__49079_49305 = chunk__49073_49302.cljs$core$IIndexed$_nth$arity$2(null,i__49075_49304);
var map__49079_49306__$1 = cljs.core.__destructure_map(map__49079_49305);
var task_49307 = map__49079_49306__$1;
var fn_str_49308 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49079_49306__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_49309 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49079_49306__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_49310 = goog.getObjectByName(fn_str_49308,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_49309)].join(''));

(fn_obj_49310.cljs$core$IFn$_invoke$arity$2 ? fn_obj_49310.cljs$core$IFn$_invoke$arity$2(path,new_link_49300) : fn_obj_49310.call(null,path,new_link_49300));


var G__49311 = seq__49071_49301;
var G__49312 = chunk__49073_49302;
var G__49313 = count__49074_49303;
var G__49314 = (i__49075_49304 + (1));
seq__49071_49301 = G__49311;
chunk__49073_49302 = G__49312;
count__49074_49303 = G__49313;
i__49075_49304 = G__49314;
continue;
} else {
var temp__5804__auto___49315__$1 = cljs.core.seq(seq__49071_49301);
if(temp__5804__auto___49315__$1){
var seq__49071_49316__$1 = temp__5804__auto___49315__$1;
if(cljs.core.chunked_seq_QMARK_(seq__49071_49316__$1)){
var c__5568__auto___49317 = cljs.core.chunk_first(seq__49071_49316__$1);
var G__49318 = cljs.core.chunk_rest(seq__49071_49316__$1);
var G__49319 = c__5568__auto___49317;
var G__49320 = cljs.core.count(c__5568__auto___49317);
var G__49321 = (0);
seq__49071_49301 = G__49318;
chunk__49073_49302 = G__49319;
count__49074_49303 = G__49320;
i__49075_49304 = G__49321;
continue;
} else {
var map__49080_49322 = cljs.core.first(seq__49071_49316__$1);
var map__49080_49323__$1 = cljs.core.__destructure_map(map__49080_49322);
var task_49324 = map__49080_49323__$1;
var fn_str_49325 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49080_49323__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_49326 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49080_49323__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_49327 = goog.getObjectByName(fn_str_49325,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_49326)].join(''));

(fn_obj_49327.cljs$core$IFn$_invoke$arity$2 ? fn_obj_49327.cljs$core$IFn$_invoke$arity$2(path,new_link_49300) : fn_obj_49327.call(null,path,new_link_49300));


var G__49328 = cljs.core.next(seq__49071_49316__$1);
var G__49329 = null;
var G__49330 = (0);
var G__49331 = (0);
seq__49071_49301 = G__49328;
chunk__49073_49302 = G__49329;
count__49074_49303 = G__49330;
i__49075_49304 = G__49331;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_49298);
});})(seq__49038_49294,chunk__49042_49295,count__49043_49296,i__49044_49297,seq__48870,chunk__48872,count__48873,i__48874,new_link_49300,path_match_49299,node_49298,path,seq__48870__$1,temp__5804__auto__,map__48869,map__48869__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_49299], 0));

goog.dom.insertSiblingAfter(new_link_49300,node_49298);


var G__49332 = seq__49038_49294;
var G__49333 = chunk__49042_49295;
var G__49334 = count__49043_49296;
var G__49335 = (i__49044_49297 + (1));
seq__49038_49294 = G__49332;
chunk__49042_49295 = G__49333;
count__49043_49296 = G__49334;
i__49044_49297 = G__49335;
continue;
} else {
var G__49336 = seq__49038_49294;
var G__49337 = chunk__49042_49295;
var G__49338 = count__49043_49296;
var G__49339 = (i__49044_49297 + (1));
seq__49038_49294 = G__49336;
chunk__49042_49295 = G__49337;
count__49043_49296 = G__49338;
i__49044_49297 = G__49339;
continue;
}
} else {
var G__49340 = seq__49038_49294;
var G__49341 = chunk__49042_49295;
var G__49342 = count__49043_49296;
var G__49343 = (i__49044_49297 + (1));
seq__49038_49294 = G__49340;
chunk__49042_49295 = G__49341;
count__49043_49296 = G__49342;
i__49044_49297 = G__49343;
continue;
}
} else {
var temp__5804__auto___49344__$1 = cljs.core.seq(seq__49038_49294);
if(temp__5804__auto___49344__$1){
var seq__49038_49345__$1 = temp__5804__auto___49344__$1;
if(cljs.core.chunked_seq_QMARK_(seq__49038_49345__$1)){
var c__5568__auto___49346 = cljs.core.chunk_first(seq__49038_49345__$1);
var G__49347 = cljs.core.chunk_rest(seq__49038_49345__$1);
var G__49348 = c__5568__auto___49346;
var G__49349 = cljs.core.count(c__5568__auto___49346);
var G__49350 = (0);
seq__49038_49294 = G__49347;
chunk__49042_49295 = G__49348;
count__49043_49296 = G__49349;
i__49044_49297 = G__49350;
continue;
} else {
var node_49351 = cljs.core.first(seq__49038_49345__$1);
if(cljs.core.not(node_49351.shadow$old)){
var path_match_49352 = shadow.cljs.devtools.client.browser.match_paths(node_49351.getAttribute("href"),path);
if(cljs.core.truth_(path_match_49352)){
var new_link_49353 = (function (){var G__49081 = node_49351.cloneNode(true);
G__49081.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_49352),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__49081;
})();
(node_49351.shadow$old = true);

(new_link_49353.onload = ((function (seq__49038_49294,chunk__49042_49295,count__49043_49296,i__49044_49297,seq__48870,chunk__48872,count__48873,i__48874,new_link_49353,path_match_49352,node_49351,seq__49038_49345__$1,temp__5804__auto___49344__$1,path,seq__48870__$1,temp__5804__auto__,map__48869,map__48869__$1,msg,updates,reload_info){
return (function (e){
var seq__49082_49354 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__49084_49355 = null;
var count__49085_49356 = (0);
var i__49086_49357 = (0);
while(true){
if((i__49086_49357 < count__49085_49356)){
var map__49090_49358 = chunk__49084_49355.cljs$core$IIndexed$_nth$arity$2(null,i__49086_49357);
var map__49090_49359__$1 = cljs.core.__destructure_map(map__49090_49358);
var task_49360 = map__49090_49359__$1;
var fn_str_49361 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49090_49359__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_49362 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49090_49359__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_49363 = goog.getObjectByName(fn_str_49361,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_49362)].join(''));

(fn_obj_49363.cljs$core$IFn$_invoke$arity$2 ? fn_obj_49363.cljs$core$IFn$_invoke$arity$2(path,new_link_49353) : fn_obj_49363.call(null,path,new_link_49353));


var G__49364 = seq__49082_49354;
var G__49365 = chunk__49084_49355;
var G__49366 = count__49085_49356;
var G__49367 = (i__49086_49357 + (1));
seq__49082_49354 = G__49364;
chunk__49084_49355 = G__49365;
count__49085_49356 = G__49366;
i__49086_49357 = G__49367;
continue;
} else {
var temp__5804__auto___49368__$2 = cljs.core.seq(seq__49082_49354);
if(temp__5804__auto___49368__$2){
var seq__49082_49369__$1 = temp__5804__auto___49368__$2;
if(cljs.core.chunked_seq_QMARK_(seq__49082_49369__$1)){
var c__5568__auto___49370 = cljs.core.chunk_first(seq__49082_49369__$1);
var G__49371 = cljs.core.chunk_rest(seq__49082_49369__$1);
var G__49372 = c__5568__auto___49370;
var G__49373 = cljs.core.count(c__5568__auto___49370);
var G__49374 = (0);
seq__49082_49354 = G__49371;
chunk__49084_49355 = G__49372;
count__49085_49356 = G__49373;
i__49086_49357 = G__49374;
continue;
} else {
var map__49091_49375 = cljs.core.first(seq__49082_49369__$1);
var map__49091_49376__$1 = cljs.core.__destructure_map(map__49091_49375);
var task_49377 = map__49091_49376__$1;
var fn_str_49378 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49091_49376__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_49379 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49091_49376__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_49380 = goog.getObjectByName(fn_str_49378,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_49379)].join(''));

(fn_obj_49380.cljs$core$IFn$_invoke$arity$2 ? fn_obj_49380.cljs$core$IFn$_invoke$arity$2(path,new_link_49353) : fn_obj_49380.call(null,path,new_link_49353));


var G__49381 = cljs.core.next(seq__49082_49369__$1);
var G__49382 = null;
var G__49383 = (0);
var G__49384 = (0);
seq__49082_49354 = G__49381;
chunk__49084_49355 = G__49382;
count__49085_49356 = G__49383;
i__49086_49357 = G__49384;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_49351);
});})(seq__49038_49294,chunk__49042_49295,count__49043_49296,i__49044_49297,seq__48870,chunk__48872,count__48873,i__48874,new_link_49353,path_match_49352,node_49351,seq__49038_49345__$1,temp__5804__auto___49344__$1,path,seq__48870__$1,temp__5804__auto__,map__48869,map__48869__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_49352], 0));

goog.dom.insertSiblingAfter(new_link_49353,node_49351);


var G__49385 = cljs.core.next(seq__49038_49345__$1);
var G__49386 = null;
var G__49387 = (0);
var G__49388 = (0);
seq__49038_49294 = G__49385;
chunk__49042_49295 = G__49386;
count__49043_49296 = G__49387;
i__49044_49297 = G__49388;
continue;
} else {
var G__49389 = cljs.core.next(seq__49038_49345__$1);
var G__49390 = null;
var G__49391 = (0);
var G__49392 = (0);
seq__49038_49294 = G__49389;
chunk__49042_49295 = G__49390;
count__49043_49296 = G__49391;
i__49044_49297 = G__49392;
continue;
}
} else {
var G__49393 = cljs.core.next(seq__49038_49345__$1);
var G__49394 = null;
var G__49395 = (0);
var G__49396 = (0);
seq__49038_49294 = G__49393;
chunk__49042_49295 = G__49394;
count__49043_49296 = G__49395;
i__49044_49297 = G__49396;
continue;
}
}
} else {
}
}
break;
}


var G__49397 = cljs.core.next(seq__48870__$1);
var G__49398 = null;
var G__49399 = (0);
var G__49400 = (0);
seq__48870 = G__49397;
chunk__48872 = G__49398;
count__48873 = G__49399;
i__48874 = G__49400;
continue;
} else {
var G__49401 = cljs.core.next(seq__48870__$1);
var G__49402 = null;
var G__49403 = (0);
var G__49404 = (0);
seq__48870 = G__49401;
chunk__48872 = G__49402;
count__48873 = G__49403;
i__48874 = G__49404;
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
shadow.cljs.devtools.client.browser.global_eval = (function shadow$cljs$devtools$client$browser$global_eval(js){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("undefined",typeof(module))){
return eval(js);
} else {
return (0,eval)(js);;
}
});
shadow.cljs.devtools.client.browser.repl_init = (function shadow$cljs$devtools$client$browser$repl_init(runtime,p__49092){
var map__49093 = p__49092;
var map__49093__$1 = cljs.core.__destructure_map(map__49093);
var repl_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49093__$1,new cljs.core.Keyword(null,"repl-state","repl-state",-1733780387));
return shadow.cljs.devtools.client.shared.load_sources(runtime,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535).cljs$core$IFn$_invoke$arity$1(repl_state))),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return shadow.cljs.devtools.client.browser.devtools_msg("ready!");
}));
});
shadow.cljs.devtools.client.browser.runtime_info = (((typeof SHADOW_CONFIG !== 'undefined'))?shadow.json.to_clj.cljs$core$IFn$_invoke$arity$1(SHADOW_CONFIG):null);
shadow.cljs.devtools.client.browser.client_info = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([shadow.cljs.devtools.client.browser.runtime_info,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"host","host",-1558485167),(cljs.core.truth_(goog.global.document)?new cljs.core.Keyword(null,"browser","browser",828191719):new cljs.core.Keyword(null,"browser-worker","browser-worker",1638998282)),new cljs.core.Keyword(null,"user-agent","user-agent",1220426212),[(cljs.core.truth_(goog.userAgent.OPERA)?"Opera":(cljs.core.truth_(goog.userAgent.product.CHROME)?"Chrome":(cljs.core.truth_(goog.userAgent.IE)?"MSIE":(cljs.core.truth_(goog.userAgent.EDGE)?"Edge":(cljs.core.truth_(goog.userAgent.GECKO)?"Firefox":(cljs.core.truth_(goog.userAgent.SAFARI)?"Safari":(cljs.core.truth_(goog.userAgent.WEBKIT)?"Webkit":null)))))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.VERSION)," [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.PLATFORM),"]"].join(''),new cljs.core.Keyword(null,"dom","dom",-1236537922),(!((goog.global.document == null)))], null)], 0));
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.browser !== 'undefined') && (typeof shadow.cljs.devtools.client.browser.ws_was_welcome_ref !== 'undefined')){
} else {
shadow.cljs.devtools.client.browser.ws_was_welcome_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
if(((shadow.cljs.devtools.client.env.enabled) && ((shadow.cljs.devtools.client.env.worker_client_id > (0))))){
(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$_js_eval$arity$2 = (function (this$,code){
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(code);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$2 = (function (this$,p__49094){
var map__49095 = p__49094;
var map__49095__$1 = cljs.core.__destructure_map(map__49095);
var _ = map__49095__$1;
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49095__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
return shadow.cljs.devtools.client.browser.global_eval(js);
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__49096,done,error){
var map__49097 = p__49096;
var map__49097__$1 = cljs.core.__destructure_map(map__49097);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49097__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__49098,done,error){
var map__49099 = p__49098;
var map__49099__$1 = cljs.core.__destructure_map(map__49099);
var msg = map__49099__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49099__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49099__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49099__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__49100){
var map__49101 = p__49100;
var map__49101__$1 = cljs.core.__destructure_map(map__49101);
var src = map__49101__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49101__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__5043__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__5043__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__49102 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__49102) : done.call(null,G__49102));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__49103){
var map__49104 = p__49103;
var map__49104__$1 = cljs.core.__destructure_map(map__49104);
var msg__$1 = map__49104__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49104__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e49105){var ex = e49105;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__49106){
var map__49107 = p__49106;
var map__49107__$1 = cljs.core.__destructure_map(map__49107);
var env = map__49107__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49107__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var svc = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125),(function (){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,true);

shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.env.patch_goog_BANG_();

return shadow.cljs.devtools.client.browser.devtools_msg(["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(new cljs.core.Keyword(null,"state-ref","state-ref",2127874952).cljs$core$IFn$_invoke$arity$1(runtime))))," ready!"].join(''));
}),new cljs.core.Keyword(null,"on-disconnect","on-disconnect",-809021814),(function (e){
if(cljs.core.truth_(cljs.core.deref(shadow.cljs.devtools.client.browser.ws_was_welcome_ref))){
shadow.cljs.devtools.client.hud.connection_error("The Websocket connection was closed!");

return cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-reconnect","on-reconnect",1239988702),(function (e){
return shadow.cljs.devtools.client.hud.connection_error("Reconnecting ...");
}),new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"access-denied","access-denied",959449406),(function (msg){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);

return shadow.cljs.devtools.client.hud.connection_error(["Stale Output! Your loaded JS was not produced by the running shadow-cljs instance."," Is the watch for this build running?"].join(''));
}),new cljs.core.Keyword(null,"cljs-runtime-init","cljs-runtime-init",1305890232),(function (msg){
return shadow.cljs.devtools.client.browser.repl_init(runtime,msg);
}),new cljs.core.Keyword(null,"cljs-asset-update","cljs-asset-update",1224093028),(function (msg){
return shadow.cljs.devtools.client.browser.handle_asset_update(msg);
}),new cljs.core.Keyword(null,"cljs-build-configure","cljs-build-configure",-2089891268),(function (msg){
return null;
}),new cljs.core.Keyword(null,"cljs-build-start","cljs-build-start",-725781241),(function (msg){
shadow.cljs.devtools.client.hud.hud_hide();

shadow.cljs.devtools.client.hud.load_start();

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-start","build-start",-959649480)));
}),new cljs.core.Keyword(null,"cljs-build-complete","cljs-build-complete",273626153),(function (msg){
var msg__$1 = shadow.cljs.devtools.client.env.add_warnings_to_info(msg);
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.hud.hud_warnings(msg__$1);

shadow.cljs.devtools.client.browser.handle_build_complete(runtime,msg__$1);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-complete","build-complete",-501868472)));
}),new cljs.core.Keyword(null,"cljs-build-failure","cljs-build-failure",1718154990),(function (msg){
shadow.cljs.devtools.client.hud.load_end();

shadow.cljs.devtools.client.hud.hud_error(msg);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-failure","build-failure",-2107487466)));
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__49108){
var map__49109 = p__49108;
var map__49109__$1 = cljs.core.__destructure_map(map__49109);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49109__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49109__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-disconnect","client-disconnect",640227957),event_op)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,shadow.cljs.devtools.client.env.worker_client_id)))){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was stopped!");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-connect","client-connect",-1113973888),event_op)){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was restarted. Reload required!");
} else {
return null;
}
}
})], null)], null));

return svc;
}),(function (p__49110){
var map__49111 = p__49110;
var map__49111__$1 = cljs.core.__destructure_map(map__49111);
var svc = map__49111__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__49111__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map
