goog.provide('re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component');
goog.scope(function(){
  re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.goog$module$goog$object = goog.module.get('goog.object');
});
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.extract_props = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$extract_props(v){
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(v,(1),null);
if(cljs.core.map_QMARK_(p)){
return p;
} else {
return null;
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.extract_children = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$extract_children(v){
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(v,(1),null);
var first_child = (((((p == null)) || (cljs.core.map_QMARK_(p))))?(2):(1));
if((cljs.core.count(v) > first_child)){
return cljs.core.subvec.cljs$core$IFn$_invoke$arity$2(v,first_child);
} else {
return null;
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.props_argv = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$props_argv(c,p){
var temp__5806__auto__ = p.argv;
if((temp__5806__auto__ == null)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [c.constructor,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util.shallow_obj_to_map(p)], null);
} else {
var a = temp__5806__auto__;
return a;
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.get_argv = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$get_argv(c){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.props_argv(c,c.props);
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.get_props = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$get_props(c){
var p = c.props;
var temp__5806__auto__ = p.argv;
if((temp__5806__auto__ == null)){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util.shallow_obj_to_map(p);
} else {
var v = temp__5806__auto__;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.extract_props(v);
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.get_children = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$get_children(c){
var p = c.props;
var temp__5806__auto__ = p.argv;
if((temp__5806__auto__ == null)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,module$node_modules$react$index.Children.toArray(p.children));
} else {
var v = temp__5806__auto__;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.extract_children(v);
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.reagent_class_QMARK_ = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$reagent_class_QMARK_(c){
return ((cljs.core.fn_QMARK_(c)) && ((!(((function (){var G__35671 = c;
var G__35671__$1 = (((G__35671 == null))?null:G__35671.prototype);
if((G__35671__$1 == null)){
return null;
} else {
return G__35671__$1.reagentRender;
}
})() == null)))));
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.react_class_QMARK_ = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$react_class_QMARK_(c){
return ((cljs.core.fn_QMARK_(c)) && ((!(((function (){var G__35676 = c;
var G__35676__$1 = (((G__35676 == null))?null:G__35676.prototype);
if((G__35676__$1 == null)){
return null;
} else {
return G__35676__$1.render;
}
})() == null)))));
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.reagent_component_QMARK_ = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$reagent_component_QMARK_(c){
return (!((c.reagentRender == null)));
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.state_atom = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$state_atom(this$){
var sa = this$.cljsState;
if((!((sa == null)))){
return sa;
} else {
return (this$.cljsState = re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.atom.cljs$core$IFn$_invoke$arity$1(null));
}
});
/**
 * Calls the render function of the component `c`.  If result `res` evaluates to a:
 *   1) Vector (form-1 component) - Treats the vector as hiccup and returns
 *      a react element with a render function based on that hiccup
 *   2) Function (form-2 component) - updates the render function to `res` i.e. the internal function
 *      and calls wrap-render again (`recur`), until the render result doesn't evaluate to a function.
 *   3) Anything else - Returns the result of evaluating `c`
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.wrap_render = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$wrap_render(c,compiler){
while(true){
var f = c.reagentRender;
var _ = ((cljs.core.ifn_QMARK_(f))?null:(function(){throw (new Error(["Assert failed: ",["Expected something callable, not ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([f], 0))].join(''),"\n","(clojure.core/ifn? f)"].join('')))})());
var res = ((c.cljsLegacyRender === true)?f.call(c,c):(function (){var v = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.get_argv(c);
var n = cljs.core.count(v);
var G__35679 = n;
switch (G__35679) {
case (1):
return f.call(c);

break;
case (2):
return f.call(c,cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(1)));

break;
case (3):
return f.call(c,cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(1)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(2)));

break;
case (4):
return f.call(c,cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(1)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(2)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(3)));

break;
case (5):
return f.call(c,cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(1)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(2)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(3)),cljs.core.nth.cljs$core$IFn$_invoke$arity$2(v,(4)));

break;
default:
return f.apply(c,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(v).slice((1)));

}
})());
if(cljs.core.vector_QMARK_(res)){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.protocols.as_element(compiler,res);
} else {
if(cljs.core.ifn_QMARK_(res)){
var f__$1 = ((re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.reagent_class_QMARK_(res))?((function (c,compiler,f,_,res){
return (function() { 
var G__35904__delegate = function (args){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.protocols.as_element(compiler,cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,res,args));
};
var G__35904 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__35905__i = 0, G__35905__a = new Array(arguments.length -  0);
while (G__35905__i < G__35905__a.length) {G__35905__a[G__35905__i] = arguments[G__35905__i + 0]; ++G__35905__i;}
  args = new cljs.core.IndexedSeq(G__35905__a,0,null);
} 
return G__35904__delegate.call(this,args);};
G__35904.cljs$lang$maxFixedArity = 0;
G__35904.cljs$lang$applyTo = (function (arglist__35906){
var args = cljs.core.seq(arglist__35906);
return G__35904__delegate(args);
});
G__35904.cljs$core$IFn$_invoke$arity$variadic = G__35904__delegate;
return G__35904;
})()
;})(c,compiler,f,_,res))
:res);
(c.reagentRender = f__$1);

var G__35907 = c;
var G__35908 = compiler;
c = G__35907;
compiler = G__35908;
continue;
} else {
return res;

}
}
break;
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.component_name = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$component_name(c){
var or__5045__auto__ = (function (){var G__35685 = c;
var G__35685__$1 = (((G__35685 == null))?null:G__35685.constructor);
if((G__35685__$1 == null)){
return null;
} else {
return G__35685__$1.displayName;
}
})();
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var G__35692 = c;
var G__35692__$1 = (((G__35692 == null))?null:G__35692.constructor);
if((G__35692__$1 == null)){
return null;
} else {
return G__35692__$1.name;
}
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.comp_name = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$comp_name(){
var c = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component._STAR_current_component_STAR_;
var n = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.component_name(c);
if((!(cljs.core.empty_QMARK_(n)))){
return [" (in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n),")"].join('');
} else {
return "";
}

});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.do_render = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$do_render(c,compiler){
var _STAR_current_component_STAR__orig_val__35722 = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__35723 = c;
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__35723);

try{var ok = [false];
try{var res = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.wrap_render(c,compiler);
(ok[(0)] = true);

return res;
}finally {if(cljs.core.truth_((ok[(0)]))){
} else {
if(re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.has_console){
((re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.tracking)?re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.track_console:console).error(["Error rendering component",re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.comp_name()].join(''));
} else {
}
}
}
}finally {(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__35722);
}});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.rat_opts = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"no-cache","no-cache",1588056370),true], null);
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.custom_wrapper = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper(key,f){
var G__35748 = key;
var G__35748__$1 = (((G__35748 instanceof cljs.core.Keyword))?G__35748.fqn:null);
switch (G__35748__$1) {
case "getDefaultProps":
throw (new Error("getDefaultProps not supported"));

break;
case "getDerivedStateFromProps":
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper_$_getDerivedStateFromProps(props,state){
return f.call(null,(function (){var temp__5806__auto__ = props.argv;
if((temp__5806__auto__ == null)){
return props;
} else {
var a = temp__5806__auto__;
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.extract_props(a);
}
})(),state);
});

break;
case "getInitialState":
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper_$_getInitialState(c){
return cljs.core.reset_BANG_(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.state_atom(c),f.call(c,c));
});

break;
case "getSnapshotBeforeUpdate":
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper_$_getSnapshotBeforeUpdate(oldprops,oldstate){
var c = this;
return f.call(c,c,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.props_argv(c,oldprops),oldstate);
});

break;
case "componentWillReceiveProps":
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper_$_componentWillReceiveProps(nextprops){
var c = this;
return f.call(c,c,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.props_argv(c,nextprops));
});

break;
case "UNSAFE_componentWillReceiveProps":
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper_$_componentWillReceiveProps(nextprops){
var c = this;
return f.call(c,c,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.props_argv(c,nextprops));
});

break;
case "shouldComponentUpdate":
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper_$_shouldComponentUpdate(nextprops,nextstate){
var or__5045__auto__ = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util._STAR_always_update_STAR_;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var c = this;
var old_argv = c.props.argv;
var new_argv = nextprops.argv;
var noargv = (((old_argv == null)) || ((new_argv == null)));
if((f == null)){
var or__5045__auto____$1 = noargv;
if(or__5045__auto____$1){
return or__5045__auto____$1;
} else {
try{return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(old_argv,new_argv);
}catch (e35763){var e = e35763;
if(re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.has_console){
((re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.tracking)?re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.track_console:console).warn(["Warning: ","Exception thrown while comparing argv's in shouldComponentUpdate: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(old_argv)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new_argv)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)].join(''));
} else {
}

return false;
}}
} else {
if(noargv){
return f.call(c,c,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.get_argv(c),re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.props_argv(c,nextprops));
} else {
return f.call(c,c,old_argv,new_argv);

}
}
}
});

break;
case "componentWillUpdate":
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper_$_componentWillUpdate(nextprops,nextstate){
var c = this;
return f.call(c,c,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.props_argv(c,nextprops),nextstate);
});

break;
case "UNSAFE_componentWillUpdate":
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper_$_componentWillUpdate(nextprops,nextstate){
var c = this;
return f.call(c,c,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.props_argv(c,nextprops),nextstate);
});

break;
case "componentDidUpdate":
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper_$_componentDidUpdate(oldprops,oldstate,snapshot){
var c = this;
return f.call(c,c,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.props_argv(c,oldprops),oldstate,snapshot);
});

break;
case "componentWillMount":
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper_$_componentWillMount(){
var c = this;
return f.call(c,c);
});

break;
case "UNSAFE_componentWillMount":
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper_$_componentWillMount(){
var c = this;
return f.call(c,c);
});

break;
case "componentDidMount":
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper_$_componentDidMount(){
var c = this;
return f.call(c,c);
});

break;
case "componentWillUnmount":
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper_$_componentWillUnmount(){
var c = this;
var G__35772_35935 = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.goog$module$goog$object.get(c,"cljsRatom");
if((G__35772_35935 == null)){
} else {
re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.dispose_BANG_(G__35772_35935);
}

re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.batching.mark_rendered(c);

if((f == null)){
return null;
} else {
return f.call(c,c);
}
});

break;
case "componentDidCatch":
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$custom_wrapper_$_componentDidCatch(error,info){
var c = this;
return f.call(c,c,error,info);
});

break;
default:
return null;

}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.get_wrapper = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$get_wrapper(key,f){
var wrap = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.custom_wrapper(key,f);
if(cljs.core.truth_((function (){var and__5043__auto__ = wrap;
if(cljs.core.truth_(and__5043__auto__)){
return f;
} else {
return and__5043__auto__;
}
})())){
if(cljs.core.ifn_QMARK_(f)){
} else {
throw (new Error(["Assert failed: ",["Expected something callable, not ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([f], 0))].join(''),"\n","(clojure.core/ifn? f)"].join('')));
}
} else {
}

var or__5045__auto__ = wrap;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return f;
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.obligatory = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"shouldComponentUpdate","shouldComponentUpdate",1795750960),null,new cljs.core.Keyword(null,"componentWillUnmount","componentWillUnmount",1573788814),null], null);
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.dash_to_method_name = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util.memoize_1(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util.dash_to_method_name);
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.camelify_map_keys = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$camelify_map_keys(fun_map){
return cljs.core.reduce_kv((function (m,k,v){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.dash_to_method_name(k)),v);
}),cljs.core.PersistentArrayMap.EMPTY,fun_map);
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.add_obligatory = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$add_obligatory(fun_map){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.obligatory,fun_map], 0));
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.wrap_funs = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$wrap_funs(fmap,compiler){
var renders_35942 = cljs.core.select_keys(fmap,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"render","render",-1408033454),new cljs.core.Keyword(null,"reagentRender","reagentRender",-358306383)], null));
var render_fun_35943 = cljs.core.first(cljs.core.vals(renders_35942));
if(cljs.core.not(new cljs.core.Keyword(null,"componentFunction","componentFunction",825866104).cljs$core$IFn$_invoke$arity$1(fmap))){
} else {
throw (new Error(["Assert failed: ",":component-function is no longer supported, use :reagent-render instead.","\n","(not (:componentFunction fmap))"].join('')));
}

if((cljs.core.count(renders_35942) > (0))){
} else {
throw (new Error(["Assert failed: ","Missing reagent-render","\n","(pos? (count renders))"].join('')));
}

if(((1) === cljs.core.count(renders_35942))){
} else {
throw (new Error(["Assert failed: ","Too many render functions supplied","\n","(== 1 (count renders))"].join('')));
}

if(cljs.core.ifn_QMARK_(render_fun_35943)){
} else {
throw (new Error(["Assert failed: ",["Expected something callable, not ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([render_fun_35943], 0))].join(''),"\n","(clojure.core/ifn? render-fun)"].join('')));
}


var render_fun = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"reagentRender","reagentRender",-358306383).cljs$core$IFn$_invoke$arity$1(fmap);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return new cljs.core.Keyword(null,"render","render",-1408033454).cljs$core$IFn$_invoke$arity$1(fmap);
}
})();
var legacy_render = (new cljs.core.Keyword(null,"reagentRender","reagentRender",-358306383).cljs$core$IFn$_invoke$arity$1(fmap) == null);
var name = (function (){var or__5045__auto__ = new cljs.core.Keyword(null,"displayName","displayName",-809144601).cljs$core$IFn$_invoke$arity$1(fmap);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var or__5045__auto____$1 = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util.fun_name(render_fun);
if(cljs.core.truth_(or__5045__auto____$1)){
return or__5045__auto____$1;
} else {
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("reagent"));
}
}
})();
var fmap__$1 = cljs.core.reduce_kv((function (m,k,v){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m,k,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.get_wrapper(k,v));
}),cljs.core.PersistentArrayMap.EMPTY,fmap);
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(fmap__$1,new cljs.core.Keyword(null,"displayName","displayName",-809144601),name,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"cljsLegacyRender","cljsLegacyRender",-1527295613),legacy_render,new cljs.core.Keyword(null,"reagentRender","reagentRender",-358306383),render_fun,new cljs.core.Keyword(null,"render","render",-1408033454),(function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$wrap_funs_$_render(){
var c = this;
if(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util._STAR_non_reactive_STAR_){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.do_render(c,compiler);
} else {
var rat = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.goog$module$goog$object.get(c,"cljsRatom");
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.batching.mark_rendered(c);

if((rat == null)){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.run_in_reaction((function (){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.do_render(c,compiler);
}),c,"cljsRatom",re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.batching.queue_render,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.rat_opts);
} else {
return rat._run(false);
}
}
})], 0));
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.map_to_js = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$map_to_js(m){
return cljs.core.reduce_kv((function (o,k,v){
var G__35790 = o;
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.goog$module$goog$object.set(G__35790,cljs.core.name(k),v);

return G__35790;
}),({}),m);
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.cljsify = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$cljsify(body,compiler){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.wrap_funs(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.add_obligatory(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.camelify_map_keys(body)),compiler);
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.built_in_static_method_names = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"childContextTypes","childContextTypes",578717991),new cljs.core.Keyword(null,"contextTypes","contextTypes",-2023853910),new cljs.core.Keyword(null,"contextType","contextType",1033066077),new cljs.core.Keyword(null,"getDerivedStateFromProps","getDerivedStateFromProps",-991834739),new cljs.core.Keyword(null,"getDerivedStateFromError","getDerivedStateFromError",166658477)], null);
/**
 * Creates JS class based on provided Clojure map.
 * 
 *   Map keys should use `React.Component` method names (https://reactjs.org/docs/react-component.html),
 *   and can be provided in snake-case or camelCase.
 *   Constructor function is defined using key `:getInitialState`.
 * 
 *   React built-in static methods or properties are automatically defined as statics.
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.create_class = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$create_class(body,compiler){
if(cljs.core.map_QMARK_(body)){
} else {
throw (new Error("Assert failed: (map? body)"));
}

var body__$1 = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.cljsify(body,compiler);
var methods$ = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.map_to_js(cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(cljs.core.dissoc,body__$1,new cljs.core.Keyword(null,"displayName","displayName",-809144601),new cljs.core.Keyword(null,"getInitialState","getInitialState",1541760916),new cljs.core.Keyword(null,"constructor","constructor",-1953928811),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"render","render",-1408033454),new cljs.core.Keyword(null,"reagentRender","reagentRender",-358306383),re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.built_in_static_method_names], 0)));
var static_methods = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.map_to_js(cljs.core.select_keys(body__$1,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.built_in_static_method_names));
var display_name = new cljs.core.Keyword(null,"displayName","displayName",-809144601).cljs$core$IFn$_invoke$arity$1(body__$1);
var get_initial_state = new cljs.core.Keyword(null,"getInitialState","getInitialState",1541760916).cljs$core$IFn$_invoke$arity$1(body__$1);
var construct = new cljs.core.Keyword(null,"constructor","constructor",-1953928811).cljs$core$IFn$_invoke$arity$1(body__$1);
var cmp = (function (props,context,updater){
var this$ = this;
module$node_modules$react$index.Component.call(this$,props,context,updater);

if(cljs.core.truth_(construct)){
(construct.cljs$core$IFn$_invoke$arity$2 ? construct.cljs$core$IFn$_invoke$arity$2(this$,props) : construct.call(null,this$,props));
} else {
}

if(cljs.core.truth_(get_initial_state)){
(this$.state = (get_initial_state.cljs$core$IFn$_invoke$arity$1 ? get_initial_state.cljs$core$IFn$_invoke$arity$1(this$) : get_initial_state.call(null,this$)));
} else {
}

(this$.cljsMountOrder = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.batching.next_mount_count());

return this$;
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.goog$module$goog$object.extend(cmp.prototype,module$node_modules$react$index.Component.prototype,methods$);

if(cljs.core.truth_(new cljs.core.Keyword(null,"render","render",-1408033454).cljs$core$IFn$_invoke$arity$1(body__$1))){
(cmp.prototype.render = new cljs.core.Keyword(null,"render","render",-1408033454).cljs$core$IFn$_invoke$arity$1(body__$1));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"reagentRender","reagentRender",-358306383).cljs$core$IFn$_invoke$arity$1(body__$1))){
(cmp.prototype.reagentRender = new cljs.core.Keyword(null,"reagentRender","reagentRender",-358306383).cljs$core$IFn$_invoke$arity$1(body__$1));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"cljsLegacyRender","cljsLegacyRender",-1527295613).cljs$core$IFn$_invoke$arity$1(body__$1))){
(cmp.prototype.cljsLegacyRender = new cljs.core.Keyword(null,"cljsLegacyRender","cljsLegacyRender",-1527295613).cljs$core$IFn$_invoke$arity$1(body__$1));
} else {
}

re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.goog$module$goog$object.extend(cmp,module$node_modules$react$index.Component,static_methods);

if(cljs.core.truth_(display_name)){
(cmp.displayName = display_name);

(cmp.cljs$lang$ctorStr = display_name);

(cmp.cljs$lang$ctorPrWriter = (function (this$,writer,opt){
return cljs.core._write(writer,display_name);
}));
} else {
}

(cmp.cljs$lang$type = true);

(cmp.prototype.constructor = cmp);

return cmp;
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.cached_react_class = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$cached_react_class(compiler,c){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.goog$module$goog$object.get(c,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.protocols.get_id(compiler));
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.cache_react_class = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$cache_react_class(compiler,c,constructor$){
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.goog$module$goog$object.set(c,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.protocols.get_id(compiler),constructor$);

return constructor$;
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.fn_to_class = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$fn_to_class(compiler,f){
if(cljs.core.ifn_QMARK_(f)){
} else {
throw (new Error(["Assert failed: ",["Expected something callable, not ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([f], 0))].join(''),"\n","(clojure.core/ifn? f)"].join('')));
}

if((!((!(((re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.react_class_QMARK_(f)) && ((!(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.reagent_class_QMARK_(f)))))))))){
if(re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.has_console){
((re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.tracking)?re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.track_console:console).warn(["Warning: ","Using native React classes directly in Hiccup forms ","is not supported. Use create-element or ","adapt-react-class instead: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5045__auto__ = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util.fun_name(f);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return f;
}
})()),re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.comp_name()].join(''));
} else {
}
} else {
}

if(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.reagent_class_QMARK_(f)){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.cache_react_class(compiler,f,f);
} else {
var spec = cljs.core.meta(f);
var withrender = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),f);
var res = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.create_class(withrender,compiler);
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.cache_react_class(compiler,f,res);
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.as_class = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$as_class(tag,compiler){
var temp__5806__auto__ = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.cached_react_class(compiler,tag);
if((temp__5806__auto__ == null)){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.fn_to_class(compiler,tag);
} else {
var cached_class = temp__5806__auto__;
return cached_class;
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.reactify_component = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$reactify_component(comp,compiler){
if(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.react_class_QMARK_(comp)){
return comp;
} else {
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.as_class(comp,compiler);
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.functional_wrap_render = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$functional_wrap_render(compiler,c){
while(true){
var f = c.reagentRender;
var _ = ((cljs.core.ifn_QMARK_(f))?null:(function(){throw (new Error(["Assert failed: ",["Expected something callable, not ",cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([f], 0))].join(''),"\n","(clojure.core/ifn? f)"].join('')))})());
var argv = c.argv;
var res = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,argv);
if(cljs.core.vector_QMARK_(res)){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.protocols.as_element(compiler,res);
} else {
if(cljs.core.ifn_QMARK_(res)){
var f__$1 = ((re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.reagent_class_QMARK_(res))?((function (compiler,c,f,_,argv,res){
return (function() { 
var G__35970__delegate = function (args){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.protocols.as_element(compiler,cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.vector,res,args));
};
var G__35970 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__35971__i = 0, G__35971__a = new Array(arguments.length -  0);
while (G__35971__i < G__35971__a.length) {G__35971__a[G__35971__i] = arguments[G__35971__i + 0]; ++G__35971__i;}
  args = new cljs.core.IndexedSeq(G__35971__a,0,null);
} 
return G__35970__delegate.call(this,args);};
G__35970.cljs$lang$maxFixedArity = 0;
G__35970.cljs$lang$applyTo = (function (arglist__35972){
var args = cljs.core.seq(arglist__35972);
return G__35970__delegate(args);
});
G__35970.cljs$core$IFn$_invoke$arity$variadic = G__35970__delegate;
return G__35970;
})()
;})(compiler,c,f,_,argv,res))
:res);
(c.reagentRender = f__$1);

var G__35973 = compiler;
var G__35974 = c;
compiler = G__35973;
c = G__35974;
continue;
} else {
return res;

}
}
break;
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.functional_do_render = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$functional_do_render(compiler,c){
var _STAR_current_component_STAR__orig_val__35810 = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__35811 = c;
(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__35811);

try{var ok = [false];
try{var res = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.functional_wrap_render(compiler,c);
(ok[(0)] = true);

return res;
}finally {if(cljs.core.truth_((ok[(0)]))){
} else {
if(re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.has_console){
((re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.tracking)?re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.track_console:console).error(["Error rendering component",re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.comp_name()].join(''));
} else {
}
}
}
}finally {(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__35810);
}});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.functional_render = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$functional_render(compiler,jsprops){
if(re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util._STAR_non_reactive_STAR_){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.functional_do_render(compiler,jsprops);
} else {
var argv = jsprops.argv;
var tag = jsprops.reagentRender;
var vec__35820 = module$node_modules$react$index.useState((0));
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35820,(0),null);
var update_count = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35820,(1),null);
var state_ref = module$node_modules$react$index.useRef();
var ___$1 = (cljs.core.truth_(state_ref.current)?null:(function (){var obj = ({});
(obj.forceUpdate = (function (){
return (update_count.cljs$core$IFn$_invoke$arity$1 ? update_count.cljs$core$IFn$_invoke$arity$1(cljs.core.inc) : update_count.call(null,cljs.core.inc));
}));

(obj.cljsMountOrder = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.batching.next_mount_count());

(obj.constructor = tag);

(obj.reagentRender = tag);

return (state_ref.current = obj);
})());
var reagent_state = state_ref.current;
var rat = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.goog$module$goog$object.get(reagent_state,"cljsRatom");
module$node_modules$react$index.useEffect((function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$functional_render_$_mount(){
return (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$functional_render_$_mount_$_unmount(){
var G__35830 = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.goog$module$goog$object.get(reagent_state,"cljsRatom");
if((G__35830 == null)){
return null;
} else {
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.dispose_BANG_(G__35830);
}
});
}),[]);

(reagent_state.argv = argv);

re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.batching.mark_rendered(reagent_state);

if((rat == null)){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.ratom.run_in_reaction((function (){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.functional_do_render(compiler,reagent_state);
}),reagent_state,"cljsRatom",re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.batching.queue_render,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.rat_opts);
} else {
return rat._run(false);
}
}
});
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.functional_render_memo_fn = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$functional_render_memo_fn(prev_props,next_props){
var old_argv = prev_props.argv;
var new_argv = next_props.argv;
var and__5043__auto__ = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util._STAR_always_update_STAR_ === false;
if(and__5043__auto__){
try{return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(old_argv,new_argv);
}catch (e35838){var e = e35838;
if(re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.has_console){
((re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.tracking)?re_frisk.inlined_deps.reagent.v1v0v0.reagent.debug.track_console:console).warn(["Warning: ","Exception thrown while comparing argv's in shouldComponentUpdate: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(old_argv)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new_argv)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e)].join(''));
} else {
}

return false;
}} else {
return and__5043__auto__;
}
});
/**
 * Create copy of functional-render with displayName set to name of the
 *   original Reagent component.
 */
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.functional_render_fn = (function re_frisk$inlined_deps$reagent$v1v0v0$reagent$impl$component$functional_render_fn(compiler,tag){
var or__5045__auto__ = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.cached_react_class(compiler,tag);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
var f = (function (jsprops){
return re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.functional_render(compiler,jsprops);
});
var _ = (f.displayName = re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.util.fun_name(tag));
var f__$1 = module$node_modules$react$index.memo(f,re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.functional_render_memo_fn);
re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.cache_react_class(compiler,tag,f__$1);

return f__$1;
}
});

//# sourceMappingURL=re_frisk.inlined_deps.reagent.v1v0v0.reagent.impl.component.js.map
