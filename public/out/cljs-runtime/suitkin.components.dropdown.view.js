goog.provide('suitkin.components.dropdown.view');
suitkin.components.dropdown.view.component = (function suitkin$components$dropdown$view$component(properties){
var open_QMARK_ = cljs.core.deref(re_frame.core.subscribe.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("suitkin.components.dropdown.model","open?","suitkin.components.dropdown.model/open?",552250782),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(properties)], null)));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.dropdown.styles.root,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(properties)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.input.view.component,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(cljs.core.truth_((function (){var and__5043__auto__ = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(properties);
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.not(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(properties,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"search","search",1564939822),new cljs.core.Keyword(null,"on-change","on-change",-732046149)], null)));
} else {
return and__5043__auto__;
}
})())?new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"readOnly","readOnly",-1749118317),true,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cursor","cursor",1011937484),"pointer"], null),new cljs.core.Keyword(null,"value","value",305978217),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(properties,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"title","title",636505583)], null))], null):null),cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.update.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new cljs.core.Keyword(null,"search","search",1564939822).cljs$core$IFn$_invoke$arity$1(properties),new cljs.core.Keyword(null,"type","type",1174270348),"search"),new cljs.core.Keyword("s","right","s/right",-452581460),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),suitkin.utils.public_src("/suitkin/img/icon/ic-chevron-down-16.svg")], null)], null)),new cljs.core.Keyword(null,"on-focus","on-focus",-13737624),(function (callback){
return (function (event){
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("suitkin.components.dropdown.model","open","suitkin.components.dropdown.model/open",1606143751),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(properties)], null));

if(cljs.core.truth_(callback)){
return (callback.cljs$core$IFn$_invoke$arity$1 ? callback.cljs$core$IFn$_invoke$arity$1(event) : callback.call(null,event));
} else {
return null;
}
});
})),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (callback){
return (function (event){
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("suitkin.components.dropdown.model","open","suitkin.components.dropdown.model/open",1606143751),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(properties)], null));

if(cljs.core.truth_(callback)){
return (callback.cljs$core$IFn$_invoke$arity$1 ? callback.cljs$core$IFn$_invoke$arity$1(event) : callback.call(null,event));
} else {
return null;
}
});
})),new cljs.core.Keyword(null,"on-blur","on-blur",814300747),(function (callback){
return (function (event){
re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("suitkin.components.dropdown.model","close","suitkin.components.dropdown.model/close",1148694855),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(properties)], null));

if(cljs.core.truth_(callback)){
return (callback.cljs$core$IFn$_invoke$arity$1 ? callback.cljs$core$IFn$_invoke$arity$1(event) : callback.call(null,event));
} else {
return null;
}
});
}))], 0))], null),(cljs.core.truth_(open_QMARK_)?(function (){var menu = new cljs.core.Keyword(null,"menu","menu",352255198).cljs$core$IFn$_invoke$arity$1(properties);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),suitkin.components.dropdown.styles.menu_items], null),(function (){var temp__5802__auto__ = cljs.core.seq(new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(menu));
if(temp__5802__auto__){
var items = temp__5802__auto__;
var iter__5523__auto__ = (function suitkin$components$dropdown$view$component_$_iter__47243(s__47244){
return (new cljs.core.LazySeq(null,(function (){
var s__47244__$1 = s__47244;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__47244__$1);
if(temp__5804__auto__){
var s__47244__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__47244__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__47244__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__47246 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__47245 = (0);
while(true){
if((i__47245 < size__5522__auto__)){
var item = cljs.core._nth(c__5521__auto__,i__47245);
cljs.core.chunk_append(b__47246,cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(item),new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.dropdown.styles.menu_item,(cljs.core.truth_((function (){var or__5045__auto__ = (function (){var and__5043__auto__ = cljs.core.sequential_QMARK_(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(properties));
if(and__5043__auto__){
return cljs.core.some(((function (i__47245,and__5043__auto__,item,c__5521__auto__,size__5522__auto__,b__47246,s__47244__$2,temp__5804__auto__,items,temp__5802__auto__,menu,open_QMARK_){
return (function (p1__47227_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(p1__47227_SHARP_),new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(item));
});})(i__47245,and__5043__auto__,item,c__5521__auto__,size__5522__auto__,b__47246,s__47244__$2,temp__5804__auto__,items,temp__5802__auto__,menu,open_QMARK_))
,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(properties));
} else {
return and__5043__auto__;
}
})();
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return ((cljs.core.map_QMARK_(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(properties))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(item),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(properties,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"value","value",305978217)], null)))));
}
})())?suitkin.components.dropdown.styles.menu_item_selected:null)], null),new cljs.core.Keyword(null,"on-mouse-down","on-mouse-down",1147755470),((function (i__47245,item,c__5521__auto__,size__5522__auto__,b__47246,s__47244__$2,temp__5804__auto__,items,temp__5802__auto__,menu,open_QMARK_){
return (function (event){
event.preventDefault();

var temp__5804__auto___47278__$1 = new cljs.core.Keyword(null,"on-select","on-select",-192407950).cljs$core$IFn$_invoke$arity$1(menu);
if(cljs.core.truth_(temp__5804__auto___47278__$1)){
var callback_47279 = temp__5804__auto___47278__$1;
(callback_47279.cljs$core$IFn$_invoke$arity$2 ? callback_47279.cljs$core$IFn$_invoke$arity$2(event,item) : callback_47279.call(null,event,item));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"multiselect?","multiselect?",-516813357).cljs$core$IFn$_invoke$arity$1(menu))){
return null;
} else {
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("suitkin.components.dropdown.model","close","suitkin.components.dropdown.model/close",1148694855),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(properties)], null));
}
});})(i__47245,item,c__5521__auto__,size__5522__auto__,b__47246,s__47244__$2,temp__5804__auto__,items,temp__5802__auto__,menu,open_QMARK_))
], null),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(item)], null)));

var G__47282 = (i__47245 + (1));
i__47245 = G__47282;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__47246),suitkin$components$dropdown$view$component_$_iter__47243(cljs.core.chunk_rest(s__47244__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__47246),null);
}
} else {
var item = cljs.core.first(s__47244__$2);
return cljs.core.cons(cljs.core.with_meta(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(item),new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.dropdown.styles.menu_item,(cljs.core.truth_((function (){var or__5045__auto__ = (function (){var and__5043__auto__ = cljs.core.sequential_QMARK_(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(properties));
if(and__5043__auto__){
return cljs.core.some(((function (and__5043__auto__,item,s__47244__$2,temp__5804__auto__,items,temp__5802__auto__,menu,open_QMARK_){
return (function (p1__47227_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(p1__47227_SHARP_),new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(item));
});})(and__5043__auto__,item,s__47244__$2,temp__5804__auto__,items,temp__5802__auto__,menu,open_QMARK_))
,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(properties));
} else {
return and__5043__auto__;
}
})();
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return ((cljs.core.map_QMARK_(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(properties))) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(item),cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(properties,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"value","value",305978217),new cljs.core.Keyword(null,"value","value",305978217)], null)))));
}
})())?suitkin.components.dropdown.styles.menu_item_selected:null)], null),new cljs.core.Keyword(null,"on-mouse-down","on-mouse-down",1147755470),((function (item,s__47244__$2,temp__5804__auto__,items,temp__5802__auto__,menu,open_QMARK_){
return (function (event){
event.preventDefault();

var temp__5804__auto___47285__$1 = new cljs.core.Keyword(null,"on-select","on-select",-192407950).cljs$core$IFn$_invoke$arity$1(menu);
if(cljs.core.truth_(temp__5804__auto___47285__$1)){
var callback_47286 = temp__5804__auto___47285__$1;
(callback_47286.cljs$core$IFn$_invoke$arity$2 ? callback_47286.cljs$core$IFn$_invoke$arity$2(event,item) : callback_47286.call(null,event,item));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"multiselect?","multiselect?",-516813357).cljs$core$IFn$_invoke$arity$1(menu))){
return null;
} else {
return re_frame.core.dispatch(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("suitkin.components.dropdown.model","close","suitkin.components.dropdown.model/close",1148694855),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(properties)], null));
}
});})(item,s__47244__$2,temp__5804__auto__,items,temp__5802__auto__,menu,open_QMARK_))
], null),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(item)], null)),suitkin$components$dropdown$view$component_$_iter__47243(cljs.core.rest(s__47244__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(items);
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),suitkin.components.dropdown.styles.menu_item_empty], null),cljs.core.get_in.cljs$core$IFn$_invoke$arity$3(properties,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"menu","menu",352255198),new cljs.core.Keyword(null,"not-found","not-found",-629079980)], null),"No items found")], null);
}
})()], null);
})():null)], null);
});

//# sourceMappingURL=suitkin.components.dropdown.view.js.map
