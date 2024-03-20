goog.provide('re_frisk.filter.filter_matcher');
re_frisk.filter.filter_matcher.match_expr = (function re_frisk$filter$filter_matcher$match_expr(f,p){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(f,p);
});
re_frisk.filter.filter_matcher.match_string_prefix = (function re_frisk$filter$filter_matcher$match_string_prefix(f,p){
return ((typeof p === 'string') && (clojure.string.starts_with_QMARK_(p,f)));
});
re_frisk.filter.filter_matcher.match_free = (function re_frisk$filter$filter_matcher$match_free(f,p){
return clojure.string.includes_QMARK_(cljs.core.str.cljs$core$IFn$_invoke$arity$1(p),f);
});
re_frisk.filter.filter_matcher.match_value = (function re_frisk$filter$filter_matcher$match_value(f,p){
if(cljs.core.contains_QMARK_(f,new cljs.core.Keyword(null,"expr","expr",745722291))){
return re_frisk.filter.filter_matcher.match_expr(new cljs.core.Keyword(null,"expr","expr",745722291).cljs$core$IFn$_invoke$arity$1(f),p);
} else {
if(cljs.core.contains_QMARK_(f,new cljs.core.Keyword(null,"string-prefix","string-prefix",2091851734))){
return re_frisk.filter.filter_matcher.match_string_prefix(new cljs.core.Keyword(null,"string-prefix","string-prefix",2091851734).cljs$core$IFn$_invoke$arity$1(f),p);
} else {
if(cljs.core.contains_QMARK_(f,new cljs.core.Keyword(null,"free","free",801364328))){
return re_frisk.filter.filter_matcher.match_free(new cljs.core.Keyword(null,"free","free",801364328).cljs$core$IFn$_invoke$arity$1(f),p);
} else {
throw (new Error(["Unknown kind of filter-path: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(f)].join('')));

}
}
}
});
re_frisk.filter.filter_matcher.match = (function re_frisk$filter$filter_matcher$match(filter,path){
while(true){
if(cljs.core.empty_QMARK_(filter)){
return null;
} else {
if(cljs.core.empty_QMARK_(path)){
return null;
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.count(filter),(1))){
return re_frisk.filter.filter_matcher.match_value(cljs.core.first(filter),cljs.core.last(path));
} else {
if(re_frisk.filter.filter_matcher.match_value(cljs.core.first(filter),cljs.core.first(path))){
var G__39396 = cljs.core.rest(filter);
var G__39397 = cljs.core.rest(path);
filter = G__39396;
path = G__39397;
continue;
} else {
var G__39398 = filter;
var G__39399 = cljs.core.rest(path);
filter = G__39398;
path = G__39399;
continue;
}

}
}
}
break;
}
});

//# sourceMappingURL=re_frisk.filter.filter_matcher.js.map
