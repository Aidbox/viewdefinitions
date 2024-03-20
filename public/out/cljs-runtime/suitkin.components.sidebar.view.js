goog.provide('suitkin.components.sidebar.view');
suitkin.components.sidebar.view.details_constructor = (function suitkin$components$sidebar$view$details_constructor(element,item){
if(cljs.core.truth_(element)){
(element.ontoggle = (function (event){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("open",event.newState)){
return suitkin.components.sidebar.model.on_open_menu(item);
} else {
return suitkin.components.sidebar.model.on_close_menu(item);
}
}));

if(cljs.core.truth_((function (){var or__5045__auto__ = new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(item);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return suitkin.components.sidebar.model.open_before_QMARK_(item);
}
})())){
return (element.open = true);
} else {
return null;
}
} else {
return null;
}
});
suitkin.components.sidebar.view.menu_item = (function suitkin$components$sidebar$view$menu_item(item){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.sidebar.styles.menu_item,(cljs.core.truth_(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(item))?"item-active":null),(cljs.core.truth_(new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item))?null:new cljs.core.Keyword(null,"suitkin_components_sidebar_view-26-25","suitkin_components_sidebar_view-26-25",352561315)),new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(item)], null)], null),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(item,new cljs.core.Keyword(null,"items","items",1031954938),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.Keyword(null,"open","open",-1763596448),new cljs.core.Keyword(null,"active","active",1895962068),new cljs.core.Keyword(null,"title","title",636505583),new cljs.core.Keyword(null,"class","class",-2030961996)], 0))], 0)),(cljs.core.truth_(new cljs.core.Keyword(null,"img","img",1442687358).cljs$core$IFn$_invoke$arity$1(item))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img","img",1442687358),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src","src",-1651076051),suitkin.utils.public_src(new cljs.core.Keyword(null,"img","img",1442687358).cljs$core$IFn$_invoke$arity$1(item)),new cljs.core.Keyword(null,"width","width",-384071477),"18"], null)], null):null),(cljs.core.truth_(new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(item))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"data-key","data-key",1775480631),new cljs.core.Keyword(null,"active","active",1895962068)], null),new cljs.core.Keyword(null,"active","active",1895962068).cljs$core$IFn$_invoke$arity$1(item)], null):null),(cljs.core.truth_(new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data-key","data-key",1775480631),new cljs.core.Keyword(null,"label","label",1718410804),new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.Keyword(null,"suitkin_components_sidebar_view-34-38","suitkin_components_sidebar_view-34-38",-885498064)], null),new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item)], null):null),(cljs.core.truth_(new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(item))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"img.chevron","img.chevron",706555982),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"src","src",-1651076051),suitkin.utils.public_src("/suitkin/img/icon/ic-chevron-right-16.svg")], null)], null):null)], null);
});
suitkin.components.sidebar.view.menu_items = (function suitkin$components$sidebar$view$menu_items(node){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ul","ul",-1349521403),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),suitkin.components.sidebar.styles.content_items,new cljs.core.Keyword(null,"data-array","data-array",371846239),new cljs.core.Keyword(null,"items","items",1031954938)], null),(function (){var iter__5523__auto__ = (function suitkin$components$sidebar$view$menu_items_$_iter__47162(s__47163){
return (new cljs.core.LazySeq(null,(function (){
var s__47163__$1 = s__47163;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__47163__$1);
if(temp__5804__auto__){
var s__47163__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__47163__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__47163__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__47165 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__47164 = (0);
while(true){
if((i__47164 < size__5522__auto__)){
var item = cljs.core._nth(c__5521__auto__,i__47164);
cljs.core.chunk_append(b__47165,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),suitkin.components.sidebar.styles.content_item,new cljs.core.Keyword(null,"key","key",-1516042587),(function (){var or__5045__auto__ = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(item);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var or__5045__auto____$1 = new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item);
if(cljs.core.truth_(or__5045__auto____$1)){
return or__5045__auto____$1;
} else {
return cljs.core.hash(item);
}
}
})()], null),(cljs.core.truth_(new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(item))?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"details","details",1956795411),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ref","ref",1289896967),((function (i__47164,item,c__5521__auto__,size__5522__auto__,b__47165,s__47163__$2,temp__5804__auto__){
return (function (p1__47156_SHARP_){
return suitkin.components.sidebar.view.details_constructor(p1__47156_SHARP_,item);
});})(i__47164,item,c__5521__auto__,size__5522__auto__,b__47165,s__47163__$2,temp__5804__auto__))
], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"summary","summary",380847952),(cljs.core.truth_((function (){var or__5045__auto__ = new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(item);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return suitkin.components.sidebar.model.open_before_QMARK_(item);
}
})())?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"data-key","data-key",1775480631),new cljs.core.Keyword(null,"open","open",-1763596448)], null),new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(item)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.sidebar.view.menu_item,item], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.content","div.content",-298042649),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.sidebar.view.menu_items,item], null)], null)], null):(cljs.core.truth_(new cljs.core.Keyword(null,"divider","divider",1265972657).cljs$core$IFn$_invoke$arity$1(item))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),suitkin.components.sidebar.styles.divider], null)], null):(cljs.core.truth_(new cljs.core.Keyword(null,"space","space",348133475).cljs$core$IFn$_invoke$arity$1(item))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.Keyword(null,"suitkin_components_sidebar_view-54-22","suitkin_components_sidebar_view-54-22",175050802)], null)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.sidebar.view.menu_item,item], null)
)))], null));

var G__47202 = (i__47164 + (1));
i__47164 = G__47202;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__47165),suitkin$components$sidebar$view$menu_items_$_iter__47162(cljs.core.chunk_rest(s__47163__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__47165),null);
}
} else {
var item = cljs.core.first(s__47163__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"li","li",723558921),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),suitkin.components.sidebar.styles.content_item,new cljs.core.Keyword(null,"key","key",-1516042587),(function (){var or__5045__auto__ = new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(item);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var or__5045__auto____$1 = new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item);
if(cljs.core.truth_(or__5045__auto____$1)){
return or__5045__auto____$1;
} else {
return cljs.core.hash(item);
}
}
})()], null),(cljs.core.truth_(new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(item))?new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"details","details",1956795411),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ref","ref",1289896967),((function (item,s__47163__$2,temp__5804__auto__){
return (function (p1__47156_SHARP_){
return suitkin.components.sidebar.view.details_constructor(p1__47156_SHARP_,item);
});})(item,s__47163__$2,temp__5804__auto__))
], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"summary","summary",380847952),(cljs.core.truth_((function (){var or__5045__auto__ = new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(item);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return suitkin.components.sidebar.model.open_before_QMARK_(item);
}
})())?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"hidden","hidden",-312506092),true,new cljs.core.Keyword(null,"data-key","data-key",1775480631),new cljs.core.Keyword(null,"open","open",-1763596448)], null),new cljs.core.Keyword(null,"open","open",-1763596448).cljs$core$IFn$_invoke$arity$1(item)], null):null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.sidebar.view.menu_item,item], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div.content","div.content",-298042649),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.sidebar.view.menu_items,item], null)], null)], null):(cljs.core.truth_(new cljs.core.Keyword(null,"divider","divider",1265972657).cljs$core$IFn$_invoke$arity$1(item))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),suitkin.components.sidebar.styles.divider], null)], null):(cljs.core.truth_(new cljs.core.Keyword(null,"space","space",348133475).cljs$core$IFn$_invoke$arity$1(item))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.Keyword(null,"suitkin_components_sidebar_view-54-22","suitkin_components_sidebar_view-54-22",175050802)], null)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.sidebar.view.menu_item,item], null)
)))], null),suitkin$components$sidebar$view$menu_items_$_iter__47162(cljs.core.rest(s__47163__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(node));
})()], null);
});
suitkin.components.sidebar.view.component = (function suitkin$components$sidebar$view$component(properties){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"aside","aside",1414397537),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data-object","data-object",-1514309146),new cljs.core.Keyword("suitkin.components.sidebar.view","component","suitkin.components.sidebar.view/component",29059210),new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.sidebar.styles.root,new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(properties)], null)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.sidebar.styles.header,new cljs.core.Keyword(null,"class-header","class-header",783602458).cljs$core$IFn$_invoke$arity$1(properties)], null)], null),new cljs.core.Keyword(null,"logo","logo",1237980263).cljs$core$IFn$_invoke$arity$1(properties)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data-object","data-object",-1514309146),new cljs.core.Keyword(null,"menu","menu",352255198),new cljs.core.Keyword(null,"class","class",-2030961996),suitkin.components.sidebar.styles.content], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.sidebar.view.menu_items,new cljs.core.Keyword(null,"menu","menu",352255198).cljs$core$IFn$_invoke$arity$1(properties)], null)], null),(cljs.core.truth_(new cljs.core.Keyword(null,"submenu","submenu",2142563344).cljs$core$IFn$_invoke$arity$1(properties))?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"class","class",-2030961996),suitkin.components.sidebar.styles.submenu,new cljs.core.Keyword(null,"data-object","data-object",-1514309146),new cljs.core.Keyword(null,"submenu","submenu",2142563344)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.sidebar.view.menu_items,new cljs.core.Keyword(null,"submenu","submenu",2142563344).cljs$core$IFn$_invoke$arity$1(properties)], null)], null):null)], null);
});

//# sourceMappingURL=suitkin.components.sidebar.view.js.map
