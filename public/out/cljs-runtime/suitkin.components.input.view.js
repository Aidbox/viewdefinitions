goog.provide('suitkin.components.input.view');
suitkin.components.input.view.icon_wrapper = (function suitkin$components$input$view$icon_wrapper(properties,element){
var left_section = new cljs.core.Keyword("s","left","s/left",-399116300).cljs$core$IFn$_invoke$arity$1(properties);
var right_section = new cljs.core.Keyword("s","right","s/right",-452581460).cljs$core$IFn$_invoke$arity$1(properties);
if(cljs.core.truth_((function (){var or__5045__auto__ = left_section;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return right_section;
}
})())){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"fieldset","fieldset",-1949770816),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.input.styles.icon_wrapper,new cljs.core.Keyword(null,"class-wrapper","class-wrapper",-557034725).cljs$core$IFn$_invoke$arity$1(properties)], null)], null),(cljs.core.truth_(left_section)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.left","span.left",663456085),left_section], null):null),element,(cljs.core.truth_(right_section)?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span.right","span.right",960327735),right_section], null):null)], null);
} else {
return element;
}
});
suitkin.components.input.view.component = (function suitkin$components$input$view$component(properties){
return suitkin.components.input.view.icon_wrapper(properties,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(properties),new cljs.core.Keyword(null,"on-click","on-click",1632826543),new cljs.core.Keyword(null,"on-click","on-click",1632826543).cljs$core$IFn$_invoke$arity$1(properties),new cljs.core.Keyword(null,"on-change","on-change",-732046149),new cljs.core.Keyword(null,"on-change","on-change",-732046149).cljs$core$IFn$_invoke$arity$1(properties),new cljs.core.Keyword(null,"class","class",-2030961996),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [suitkin.components.input.styles.root,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("narrow",new cljs.core.Keyword("s","size","s/size",1098692900).cljs$core$IFn$_invoke$arity$1(properties)))?suitkin.components.input.styles.narrow:suitkin.components.input.styles.default$),new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(properties),(cljs.core.truth_(new cljs.core.Keyword("s","invalid?","s/invalid?",789397352).cljs$core$IFn$_invoke$arity$1(properties))?suitkin.components.input.styles.invalid:null)], null)], null),cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(properties,new cljs.core.Keyword("s","size","s/size",1098692900),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("s","right","s/right",-452581460),new cljs.core.Keyword("s","left","s/left",-399116300),new cljs.core.Keyword("s","invalid?","s/invalid?",789397352),new cljs.core.Keyword(null,"class-wrapper","class-wrapper",-557034725),new cljs.core.Keyword(null,"class","class",-2030961996)], 0))], 0))], null));
});

//# sourceMappingURL=suitkin.components.input.view.js.map
