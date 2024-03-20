goog.provide('suitkin.utils');
/**
 * @define {string}
 */
suitkin.utils.CLASSPATH = goog.define("suitkin.utils.CLASSPATH","");
suitkin.utils.public_src = (function suitkin$utils$public_src(src){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){try{return suitkin_public_prefix;
}catch (e46949){if((e46949 instanceof ReferenceError)){
var _ = e46949;
return "";
} else {
throw e46949;

}
}})()),suitkin.utils.CLASSPATH,cljs.core.str.cljs$core$IFn$_invoke$arity$1(src)].join('');
});
suitkin.utils.log = (function suitkin$utils$log(var_args){
var args__5775__auto__ = [];
var len__5769__auto___47004 = arguments.length;
var i__5770__auto___47006 = (0);
while(true){
if((i__5770__auto___47006 < len__5769__auto___47004)){
args__5775__auto__.push((arguments[i__5770__auto___47006]));

var G__47008 = (i__5770__auto___47006 + (1));
i__5770__auto___47006 = G__47008;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return suitkin.utils.log.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(suitkin.utils.log.cljs$core$IFn$_invoke$arity$variadic = (function (arguments$){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(console.log,arguments$);
}));

(suitkin.utils.log.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(suitkin.utils.log.cljs$lang$applyTo = (function (seq46954){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq46954));
}));

suitkin.utils.set_storage_item = (function suitkin$utils$set_storage_item(keyname,value){
return localStorage.setItem(keyname,value);
});
suitkin.utils.get_storage_item = (function suitkin$utils$get_storage_item(keyname){
return localStorage.getItem(keyname);
});
suitkin.utils.remove_storage_item = (function suitkin$utils$remove_storage_item(keyname){
return localStorage.removeItem(keyname);
});
suitkin.utils.ratom = (function suitkin$utils$ratom(value){
return reagent.core.atom.cljs$core$IFn$_invoke$arity$1(value);
});
suitkin.utils.target_value = (function suitkin$utils$target_value(event){
return event.target.value;
});
suitkin.utils.encode_uri = (function suitkin$utils$encode_uri(value){
if(typeof value === 'string'){
return encodeURI(value);
} else {
return null;
}
});
suitkin.utils.decode_uri = (function suitkin$utils$decode_uri(value){
if(cljs.core.truth_(value)){
return decodeURI(value);
} else {
return null;
}
});
suitkin.utils.edn__GT_json_pretty = (function suitkin$utils$edn__GT_json_pretty(edn){
return JSON.stringify(cljs.core.clj__GT_js(edn),null,(2));
});
suitkin.utils.json_string__GT_edn = (function suitkin$utils$json_string__GT_edn(json_string){
if(cljs.core.seq(json_string)){
try{return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(JSON.parse(json_string),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0));
}catch (e46990){if((e46990 instanceof Error)){
var e = e46990;
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["error",new cljs.core.Keyword("suitkin.utils","json-string->edn","suitkin.utils/json-string->edn",38657674)], 0));

return cljs.core.PersistentArrayMap.EMPTY;
} else {
throw e46990;

}
}} else {
return null;
}
});

//# sourceMappingURL=suitkin.utils.js.map
