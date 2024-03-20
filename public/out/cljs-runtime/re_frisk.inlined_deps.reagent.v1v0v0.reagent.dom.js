goog.provide('re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom');
var module$node_modules$react_dom$index=shadow.js.require("module$node_modules$react_dom$index", {});
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.inlined_deps !== 'undefined') && (typeof re_frisk.inlined_deps.reagent !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0 !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom !== 'undefined') && (typeof re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.roots !== 'undefined')){
} else {
re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.roots = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.unmount_comp = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$dom$unmount_comp(container){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.roots,cljs.core.dissoc,container);

return module$node_modules$react_dom$index.unmountComponentAtNode(container);
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.render_comp = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$dom$render_comp(comp,container,callback){
var _STAR_always_update_STAR__orig_val__36175 = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__36176 = true;
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__36176);

try{return module$node_modules$react_dom$index.render((comp.cljs$core$IFn$_invoke$arity$0 ? comp.cljs$core$IFn$_invoke$arity$0() : comp.call(null)),container,(function (){
var _STAR_always_update_STAR__orig_val__36179 = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util._STAR_always_update_STAR_;
var _STAR_always_update_STAR__temp_val__36180 = false;
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__temp_val__36180);

try{cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.roots,cljs.core.assoc,container,comp);

re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.batching.flush_after_render();

if((!((callback == null)))){
return (callback.cljs$core$IFn$_invoke$arity$0 ? callback.cljs$core$IFn$_invoke$arity$0() : callback.call(null));
} else {
return null;
}
}finally {(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__36179);
}}));
}finally {(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util._STAR_always_update_STAR_ = _STAR_always_update_STAR__orig_val__36175);
}});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.re_render_component = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$dom$re_render_component(comp,container){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.render_comp(comp,container,null);
});
/**
 * Render a Reagent component into the DOM. The first argument may be
 *   either a vector (using Reagent's Hiccup syntax), or a React element.
 *   The second argument should be a DOM node.
 * 
 *   Optionally takes a callback that is called when the component is in place.
 * 
 *   Returns the mounted component instance.
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.render = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$dom$render(var_args){
var G__36198 = arguments.length;
switch (G__36198) {
case 2:
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.render.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.render.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.render.cljs$core$IFn$_invoke$arity$2 = (function (comp,container){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.render.cljs$core$IFn$_invoke$arity$3(comp,container,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.template.default_compiler);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.render.cljs$core$IFn$_invoke$arity$3 = (function (comp,container,callback_or_compiler){
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.flush_BANG_();

var vec__36206 = ((cljs.core.fn_QMARK_(callback_or_compiler))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.template.default_compiler,callback_or_compiler], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [callback_or_compiler,new cljs.core.Keyword(null,"callback","callback",-705136228).cljs$core$IFn$_invoke$arity$1(callback_or_compiler)], null));
var compiler = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36206,(0),null);
var callback = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36206,(1),null);
var f = (function (){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.protocols.as_element(compiler,((cljs.core.fn_QMARK_(comp))?(comp.cljs$core$IFn$_invoke$arity$0 ? comp.cljs$core$IFn$_invoke$arity$0() : comp.call(null)):comp));
});
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.render_comp(f,container,callback);
}));

(re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.render.cljs$lang$maxFixedArity = 3);

/**
 * Remove a component from the given DOM node.
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.unmount_component_at_node = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$dom$unmount_component_at_node(container){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.unmount_comp(container);
});
/**
 * Returns the root DOM node of a mounted component.
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.dom_node = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$dom$dom_node(this$){
return module$node_modules$react_dom$index.findDOMNode(this$);
});
/**
 * Force re-rendering of all mounted Reagent components. This is
 *   probably only useful in a development environment, when you want to
 *   update components in response to some dynamic changes to code.
 * 
 *   Note that force-update-all may not update root components. This
 *   happens if a component 'foo' is mounted with `(render [foo])` (since
 *   functions are passed by value, and not by reference, in
 *   ClojureScript). To get around this you'll have to introduce a layer
 *   of indirection, for example by using `(render [#'foo])` instead.
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.force_update_all = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$dom$force_update_all(){
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.flush_BANG_();

var seq__36226_36268 = cljs.core.seq(cljs.core.deref(re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.roots));
var chunk__36227_36269 = null;
var count__36228_36270 = (0);
var i__36229_36271 = (0);
while(true){
if((i__36229_36271 < count__36228_36270)){
var vec__36246_36273 = chunk__36227_36269.cljs$core$IIndexed$_nth$arity$2(null,i__36229_36271);
var container_36274 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36246_36273,(0),null);
var comp_36275 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36246_36273,(1),null);
re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.re_render_component(comp_36275,container_36274);


var G__36276 = seq__36226_36268;
var G__36277 = chunk__36227_36269;
var G__36278 = count__36228_36270;
var G__36279 = (i__36229_36271 + (1));
seq__36226_36268 = G__36276;
chunk__36227_36269 = G__36277;
count__36228_36270 = G__36278;
i__36229_36271 = G__36279;
continue;
} else {
var temp__5804__auto___36281 = cljs.core.seq(seq__36226_36268);
if(temp__5804__auto___36281){
var seq__36226_36282__$1 = temp__5804__auto___36281;
if(cljs.core.chunked_seq_QMARK_(seq__36226_36282__$1)){
var c__5568__auto___36283 = cljs.core.chunk_first(seq__36226_36282__$1);
var G__36284 = cljs.core.chunk_rest(seq__36226_36282__$1);
var G__36285 = c__5568__auto___36283;
var G__36286 = cljs.core.count(c__5568__auto___36283);
var G__36287 = (0);
seq__36226_36268 = G__36284;
chunk__36227_36269 = G__36285;
count__36228_36270 = G__36286;
i__36229_36271 = G__36287;
continue;
} else {
var vec__36256_36288 = cljs.core.first(seq__36226_36282__$1);
var container_36289 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36256_36288,(0),null);
var comp_36290 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__36256_36288,(1),null);
re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.re_render_component(comp_36290,container_36289);


var G__36292 = cljs.core.next(seq__36226_36282__$1);
var G__36293 = null;
var G__36294 = (0);
var G__36295 = (0);
seq__36226_36268 = G__36292;
chunk__36227_36269 = G__36293;
count__36228_36270 = G__36294;
i__36229_36271 = G__36295;
continue;
}
} else {
}
}
break;
}

return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.batching.flush_after_render();
});

//# sourceMappingURL=re_frisk.inlined_deps.reagent.v1v0v0.reagent.dom.js.map
