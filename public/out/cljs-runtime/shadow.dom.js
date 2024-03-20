goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = (((typeof window !== 'undefined'))?goog.style.transition.isSupported():null);

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_46099 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.dom._to_dom[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.dom._to_dom["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IElement.-to-dom",this$);
}
}
});
shadow.dom._to_dom = (function shadow$dom$_to_dom(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$IElement$_to_dom$arity$1 == null)))))){
return this$.shadow$dom$IElement$_to_dom$arity$1(this$);
} else {
return shadow$dom$IElement$_to_dom$dyn_46099(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_46101 = (function (this$){
var x__5393__auto__ = (((this$ == null))?null:this$);
var m__5394__auto__ = (shadow.dom._to_svg[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5394__auto__.call(null,this$));
} else {
var m__5392__auto__ = (shadow.dom._to_svg["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5392__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("SVGElement.-to-svg",this$);
}
}
});
shadow.dom._to_svg = (function shadow$dom$_to_svg(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$SVGElement$_to_svg$arity$1 == null)))))){
return this$.shadow$dom$SVGElement$_to_svg$arity$1(this$);
} else {
return shadow$dom$SVGElement$_to_svg$dyn_46101(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__44860 = coll;
var G__44861 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__44860,G__44861) : shadow.dom.lazy_native_coll_seq.call(null,G__44860,G__44861));
})());
}),null,null));
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IDeref}
 * @implements {shadow.dom.IElement}
*/
shadow.dom.NativeColl = (function (coll){
this.coll = coll;
this.cljs$lang$protocol_mask$partition0$ = 8421394;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.dom.NativeColl.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var self__ = this;
var this$__$1 = this;
return (self__.coll[n]);
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var self__ = this;
var this$__$1 = this;
var or__5045__auto__ = (self__.coll[n]);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return not_found;
}
}));

(shadow.dom.NativeColl.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll.length;
}));

(shadow.dom.NativeColl.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return shadow.dom.lazy_native_coll_seq(self__.coll,(0));
}));

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null)], null);
}));

(shadow.dom.NativeColl.cljs$lang$type = true);

(shadow.dom.NativeColl.cljs$lang$ctorStr = "shadow.dom/NativeColl");

(shadow.dom.NativeColl.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"shadow.dom/NativeColl");
}));

/**
 * Positional factory function for shadow.dom/NativeColl.
 */
shadow.dom.__GT_NativeColl = (function shadow$dom$__GT_NativeColl(coll){
return (new shadow.dom.NativeColl(coll));
});

shadow.dom.native_coll = (function shadow$dom$native_coll(coll){
return (new shadow.dom.NativeColl(coll));
});
shadow.dom.dom_node = (function shadow$dom$dom_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$IElement$))))?true:false):false)){
return el.shadow$dom$IElement$_to_dom$arity$1(null);
} else {
if(typeof el === 'string'){
return document.createTextNode(el);
} else {
if(typeof el === 'number'){
return document.createTextNode(cljs.core.str.cljs$core$IFn$_invoke$arity$1(el));
} else {
return el;

}
}
}
}
});
shadow.dom.query_one = (function shadow$dom$query_one(var_args){
var G__44884 = arguments.length;
switch (G__44884) {
case 1:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return document.querySelector(sel);
}));

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return shadow.dom.dom_node(root).querySelector(sel);
}));

(shadow.dom.query_one.cljs$lang$maxFixedArity = 2);

shadow.dom.query = (function shadow$dom$query(var_args){
var G__44890 = arguments.length;
switch (G__44890) {
case 1:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return (new shadow.dom.NativeColl(document.querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(root).querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$lang$maxFixedArity = 2);

shadow.dom.by_id = (function shadow$dom$by_id(var_args){
var G__44896 = arguments.length;
switch (G__44896) {
case 2:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2 = (function (id,el){
return shadow.dom.dom_node(el).getElementById(id);
}));

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1 = (function (id){
return document.getElementById(id);
}));

(shadow.dom.by_id.cljs$lang$maxFixedArity = 2);

shadow.dom.build = shadow.dom.dom_node;
shadow.dom.ev_stop = (function shadow$dom$ev_stop(var_args){
var G__44908 = arguments.length;
switch (G__44908) {
case 1:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1 = (function (e){
if(cljs.core.truth_(e.stopPropagation)){
e.stopPropagation();

e.preventDefault();
} else {
(e.cancelBubble = true);

(e.returnValue = false);
}

return e;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2 = (function (e,el){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4 = (function (e,el,scope,owner){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$lang$maxFixedArity = 4);

/**
 * check wether a parent node (or the document) contains the child
 */
shadow.dom.contains_QMARK_ = (function shadow$dom$contains_QMARK_(var_args){
var G__44918 = arguments.length;
switch (G__44918) {
case 1:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (el){
return goog.dom.contains(document,shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (parent,el){
return goog.dom.contains(shadow.dom.dom_node(parent),shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$lang$maxFixedArity = 2);

shadow.dom.add_class = (function shadow$dom$add_class(el,cls){
return goog.dom.classlist.add(shadow.dom.dom_node(el),cls);
});
shadow.dom.remove_class = (function shadow$dom$remove_class(el,cls){
return goog.dom.classlist.remove(shadow.dom.dom_node(el),cls);
});
shadow.dom.toggle_class = (function shadow$dom$toggle_class(var_args){
var G__44950 = arguments.length;
switch (G__44950) {
case 2:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2 = (function (el,cls){
return goog.dom.classlist.toggle(shadow.dom.dom_node(el),cls);
}));

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3 = (function (el,cls,v){
if(cljs.core.truth_(v)){
return shadow.dom.add_class(el,cls);
} else {
return shadow.dom.remove_class(el,cls);
}
}));

(shadow.dom.toggle_class.cljs$lang$maxFixedArity = 3);

shadow.dom.dom_listen = (cljs.core.truth_((function (){var or__5045__auto__ = (!((typeof document !== 'undefined')));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return document.addEventListener;
}
})())?(function shadow$dom$dom_listen_good(el,ev,handler){
return el.addEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_ie(el,ev,handler){
try{return el.attachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),(function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
}));
}catch (e44968){if((e44968 instanceof Object)){
var e = e44968;
return console.log("didnt support attachEvent",el,e);
} else {
throw e44968;

}
}}));
shadow.dom.dom_listen_remove = (cljs.core.truth_((function (){var or__5045__auto__ = (!((typeof document !== 'undefined')));
if(or__5045__auto__){
return or__5045__auto__;
} else {
return document.removeEventListener;
}
})())?(function shadow$dom$dom_listen_remove_good(el,ev,handler){
return el.removeEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_remove_ie(el,ev,handler){
return el.detachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),handler);
}));
shadow.dom.on_query = (function shadow$dom$on_query(root_el,ev,selector,handler){
var seq__44980 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__44981 = null;
var count__44982 = (0);
var i__44983 = (0);
while(true){
if((i__44983 < count__44982)){
var el = chunk__44981.cljs$core$IIndexed$_nth$arity$2(null,i__44983);
var handler_46110__$1 = ((function (seq__44980,chunk__44981,count__44982,i__44983,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__44980,chunk__44981,count__44982,i__44983,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_46110__$1);


var G__46112 = seq__44980;
var G__46113 = chunk__44981;
var G__46114 = count__44982;
var G__46115 = (i__44983 + (1));
seq__44980 = G__46112;
chunk__44981 = G__46113;
count__44982 = G__46114;
i__44983 = G__46115;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__44980);
if(temp__5804__auto__){
var seq__44980__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__44980__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__44980__$1);
var G__46116 = cljs.core.chunk_rest(seq__44980__$1);
var G__46117 = c__5568__auto__;
var G__46118 = cljs.core.count(c__5568__auto__);
var G__46119 = (0);
seq__44980 = G__46116;
chunk__44981 = G__46117;
count__44982 = G__46118;
i__44983 = G__46119;
continue;
} else {
var el = cljs.core.first(seq__44980__$1);
var handler_46120__$1 = ((function (seq__44980,chunk__44981,count__44982,i__44983,el,seq__44980__$1,temp__5804__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__44980,chunk__44981,count__44982,i__44983,el,seq__44980__$1,temp__5804__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_46120__$1);


var G__46121 = cljs.core.next(seq__44980__$1);
var G__46122 = null;
var G__46123 = (0);
var G__46124 = (0);
seq__44980 = G__46121;
chunk__44981 = G__46122;
count__44982 = G__46123;
i__44983 = G__46124;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.on = (function shadow$dom$on(var_args){
var G__45010 = arguments.length;
switch (G__45010) {
case 3:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.on.cljs$core$IFn$_invoke$arity$3 = (function (el,ev,handler){
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4(el,ev,handler,false);
}));

(shadow.dom.on.cljs$core$IFn$_invoke$arity$4 = (function (el,ev,handler,capture){
if(cljs.core.vector_QMARK_(ev)){
return shadow.dom.on_query(el,cljs.core.first(ev),cljs.core.second(ev),handler);
} else {
var handler__$1 = (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});
return shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(ev),handler__$1);
}
}));

(shadow.dom.on.cljs$lang$maxFixedArity = 4);

shadow.dom.remove_event_handler = (function shadow$dom$remove_event_handler(el,ev,handler){
return shadow.dom.dom_listen_remove(shadow.dom.dom_node(el),cljs.core.name(ev),handler);
});
shadow.dom.add_event_listeners = (function shadow$dom$add_event_listeners(el,events){
var seq__45039 = cljs.core.seq(events);
var chunk__45040 = null;
var count__45041 = (0);
var i__45042 = (0);
while(true){
if((i__45042 < count__45041)){
var vec__45081 = chunk__45040.cljs$core$IIndexed$_nth$arity$2(null,i__45042);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45081,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45081,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__46132 = seq__45039;
var G__46133 = chunk__45040;
var G__46134 = count__45041;
var G__46135 = (i__45042 + (1));
seq__45039 = G__46132;
chunk__45040 = G__46133;
count__45041 = G__46134;
i__45042 = G__46135;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__45039);
if(temp__5804__auto__){
var seq__45039__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__45039__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__45039__$1);
var G__46137 = cljs.core.chunk_rest(seq__45039__$1);
var G__46138 = c__5568__auto__;
var G__46139 = cljs.core.count(c__5568__auto__);
var G__46140 = (0);
seq__45039 = G__46137;
chunk__45040 = G__46138;
count__45041 = G__46139;
i__45042 = G__46140;
continue;
} else {
var vec__45102 = cljs.core.first(seq__45039__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45102,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45102,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__46141 = cljs.core.next(seq__45039__$1);
var G__46142 = null;
var G__46143 = (0);
var G__46144 = (0);
seq__45039 = G__46141;
chunk__45040 = G__46142;
count__45041 = G__46143;
i__45042 = G__46144;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_style = (function shadow$dom$set_style(el,styles){
var dom = shadow.dom.dom_node(el);
var seq__45105 = cljs.core.seq(styles);
var chunk__45106 = null;
var count__45107 = (0);
var i__45108 = (0);
while(true){
if((i__45108 < count__45107)){
var vec__45128 = chunk__45106.cljs$core$IIndexed$_nth$arity$2(null,i__45108);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45128,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45128,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__46145 = seq__45105;
var G__46146 = chunk__45106;
var G__46147 = count__45107;
var G__46148 = (i__45108 + (1));
seq__45105 = G__46145;
chunk__45106 = G__46146;
count__45107 = G__46147;
i__45108 = G__46148;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__45105);
if(temp__5804__auto__){
var seq__45105__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__45105__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__45105__$1);
var G__46149 = cljs.core.chunk_rest(seq__45105__$1);
var G__46150 = c__5568__auto__;
var G__46151 = cljs.core.count(c__5568__auto__);
var G__46152 = (0);
seq__45105 = G__46149;
chunk__45106 = G__46150;
count__45107 = G__46151;
i__45108 = G__46152;
continue;
} else {
var vec__45132 = cljs.core.first(seq__45105__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45132,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45132,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__46153 = cljs.core.next(seq__45105__$1);
var G__46154 = null;
var G__46155 = (0);
var G__46156 = (0);
seq__45105 = G__46153;
chunk__45106 = G__46154;
count__45107 = G__46155;
i__45108 = G__46156;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_attr_STAR_ = (function shadow$dom$set_attr_STAR_(el,key,value){
var G__45135_46158 = key;
var G__45135_46159__$1 = (((G__45135_46158 instanceof cljs.core.Keyword))?G__45135_46158.fqn:null);
switch (G__45135_46159__$1) {
case "id":
(el.id = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "class":
(el.className = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "for":
(el.htmlFor = value);

break;
case "cellpadding":
el.setAttribute("cellPadding",value);

break;
case "cellspacing":
el.setAttribute("cellSpacing",value);

break;
case "colspan":
el.setAttribute("colSpan",value);

break;
case "frameborder":
el.setAttribute("frameBorder",value);

break;
case "height":
el.setAttribute("height",value);

break;
case "maxlength":
el.setAttribute("maxLength",value);

break;
case "role":
el.setAttribute("role",value);

break;
case "rowspan":
el.setAttribute("rowSpan",value);

break;
case "type":
el.setAttribute("type",value);

break;
case "usemap":
el.setAttribute("useMap",value);

break;
case "valign":
el.setAttribute("vAlign",value);

break;
case "width":
el.setAttribute("width",value);

break;
case "on":
shadow.dom.add_event_listeners(el,value);

break;
case "style":
if((value == null)){
} else {
if(typeof value === 'string'){
el.setAttribute("style",value);
} else {
if(cljs.core.map_QMARK_(value)){
shadow.dom.set_style(el,value);
} else {
goog.style.setStyle(el,value);

}
}
}

break;
default:
var ks_46162 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__5045__auto__ = goog.string.startsWith(ks_46162,"data-");
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return goog.string.startsWith(ks_46162,"aria-");
}
})())){
el.setAttribute(ks_46162,value);
} else {
(el[ks_46162] = value);
}

}

return el;
});
shadow.dom.set_attrs = (function shadow$dom$set_attrs(el,attrs){
return cljs.core.reduce_kv((function (el__$1,key,value){
shadow.dom.set_attr_STAR_(el__$1,key,value);

return el__$1;
}),shadow.dom.dom_node(el),attrs);
});
shadow.dom.set_attr = (function shadow$dom$set_attr(el,key,value){
return shadow.dom.set_attr_STAR_(shadow.dom.dom_node(el),key,value);
});
shadow.dom.has_class_QMARK_ = (function shadow$dom$has_class_QMARK_(el,cls){
return goog.dom.classlist.contains(shadow.dom.dom_node(el),cls);
});
shadow.dom.merge_class_string = (function shadow$dom$merge_class_string(current,extra_class){
if(cljs.core.seq(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(extra_class)].join('');
} else {
return extra_class;
}
});
shadow.dom.parse_tag = (function shadow$dom$parse_tag(spec){
var spec__$1 = cljs.core.name(spec);
var fdot = spec__$1.indexOf(".");
var fhash = spec__$1.indexOf("#");
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1,null,null], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fdot),null,clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1))),null], null);
} else {
if((fhash > fdot)){
throw ["cant have id after class?",spec__$1].join('');
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1)),fdot),clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);

}
}
}
}
});
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__45160){
var map__45161 = p__45160;
var map__45161__$1 = cljs.core.__destructure_map(map__45161);
var props = map__45161__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45161__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__45162 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45162,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45162,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45162,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__45166 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__45166,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__45166;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__45175 = arguments.length;
switch (G__45175) {
case 1:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.append.cljs$core$IFn$_invoke$arity$1 = (function (node){
if(cljs.core.truth_(node)){
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
document.body.appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$core$IFn$_invoke$arity$2 = (function (el,node){
if(cljs.core.truth_(node)){
var temp__5804__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5804__auto__)){
var n = temp__5804__auto__;
shadow.dom.dom_node(el).appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$lang$maxFixedArity = 2);

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__45197){
var vec__45198 = p__45197;
var seq__45199 = cljs.core.seq(vec__45198);
var first__45200 = cljs.core.first(seq__45199);
var seq__45199__$1 = cljs.core.next(seq__45199);
var nn = first__45200;
var first__45200__$1 = cljs.core.first(seq__45199__$1);
var seq__45199__$2 = cljs.core.next(seq__45199__$1);
var np = first__45200__$1;
var nc = seq__45199__$2;
var node = vec__45198;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__45204 = nn;
var G__45205 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__45204,G__45205) : create_fn.call(null,G__45204,G__45205));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__45206 = nn;
var G__45207 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__45206,G__45207) : create_fn.call(null,G__45206,G__45207));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__45213 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45213,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45213,(1),null);
var seq__45216_46168 = cljs.core.seq(node_children);
var chunk__45217_46169 = null;
var count__45218_46170 = (0);
var i__45219_46171 = (0);
while(true){
if((i__45219_46171 < count__45218_46170)){
var child_struct_46172 = chunk__45217_46169.cljs$core$IIndexed$_nth$arity$2(null,i__45219_46171);
var children_46173 = shadow.dom.dom_node(child_struct_46172);
if(cljs.core.seq_QMARK_(children_46173)){
var seq__45273_46174 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_46173));
var chunk__45275_46175 = null;
var count__45276_46176 = (0);
var i__45277_46177 = (0);
while(true){
if((i__45277_46177 < count__45276_46176)){
var child_46179 = chunk__45275_46175.cljs$core$IIndexed$_nth$arity$2(null,i__45277_46177);
if(cljs.core.truth_(child_46179)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_46179);


var G__46180 = seq__45273_46174;
var G__46181 = chunk__45275_46175;
var G__46182 = count__45276_46176;
var G__46183 = (i__45277_46177 + (1));
seq__45273_46174 = G__46180;
chunk__45275_46175 = G__46181;
count__45276_46176 = G__46182;
i__45277_46177 = G__46183;
continue;
} else {
var G__46184 = seq__45273_46174;
var G__46185 = chunk__45275_46175;
var G__46186 = count__45276_46176;
var G__46187 = (i__45277_46177 + (1));
seq__45273_46174 = G__46184;
chunk__45275_46175 = G__46185;
count__45276_46176 = G__46186;
i__45277_46177 = G__46187;
continue;
}
} else {
var temp__5804__auto___46188 = cljs.core.seq(seq__45273_46174);
if(temp__5804__auto___46188){
var seq__45273_46189__$1 = temp__5804__auto___46188;
if(cljs.core.chunked_seq_QMARK_(seq__45273_46189__$1)){
var c__5568__auto___46190 = cljs.core.chunk_first(seq__45273_46189__$1);
var G__46191 = cljs.core.chunk_rest(seq__45273_46189__$1);
var G__46192 = c__5568__auto___46190;
var G__46193 = cljs.core.count(c__5568__auto___46190);
var G__46194 = (0);
seq__45273_46174 = G__46191;
chunk__45275_46175 = G__46192;
count__45276_46176 = G__46193;
i__45277_46177 = G__46194;
continue;
} else {
var child_46195 = cljs.core.first(seq__45273_46189__$1);
if(cljs.core.truth_(child_46195)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_46195);


var G__46196 = cljs.core.next(seq__45273_46189__$1);
var G__46197 = null;
var G__46198 = (0);
var G__46199 = (0);
seq__45273_46174 = G__46196;
chunk__45275_46175 = G__46197;
count__45276_46176 = G__46198;
i__45277_46177 = G__46199;
continue;
} else {
var G__46200 = cljs.core.next(seq__45273_46189__$1);
var G__46201 = null;
var G__46202 = (0);
var G__46203 = (0);
seq__45273_46174 = G__46200;
chunk__45275_46175 = G__46201;
count__45276_46176 = G__46202;
i__45277_46177 = G__46203;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_46173);
}


var G__46204 = seq__45216_46168;
var G__46205 = chunk__45217_46169;
var G__46206 = count__45218_46170;
var G__46207 = (i__45219_46171 + (1));
seq__45216_46168 = G__46204;
chunk__45217_46169 = G__46205;
count__45218_46170 = G__46206;
i__45219_46171 = G__46207;
continue;
} else {
var temp__5804__auto___46208 = cljs.core.seq(seq__45216_46168);
if(temp__5804__auto___46208){
var seq__45216_46209__$1 = temp__5804__auto___46208;
if(cljs.core.chunked_seq_QMARK_(seq__45216_46209__$1)){
var c__5568__auto___46210 = cljs.core.chunk_first(seq__45216_46209__$1);
var G__46211 = cljs.core.chunk_rest(seq__45216_46209__$1);
var G__46212 = c__5568__auto___46210;
var G__46213 = cljs.core.count(c__5568__auto___46210);
var G__46214 = (0);
seq__45216_46168 = G__46211;
chunk__45217_46169 = G__46212;
count__45218_46170 = G__46213;
i__45219_46171 = G__46214;
continue;
} else {
var child_struct_46215 = cljs.core.first(seq__45216_46209__$1);
var children_46216 = shadow.dom.dom_node(child_struct_46215);
if(cljs.core.seq_QMARK_(children_46216)){
var seq__45304_46217 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_46216));
var chunk__45306_46218 = null;
var count__45307_46219 = (0);
var i__45308_46220 = (0);
while(true){
if((i__45308_46220 < count__45307_46219)){
var child_46222 = chunk__45306_46218.cljs$core$IIndexed$_nth$arity$2(null,i__45308_46220);
if(cljs.core.truth_(child_46222)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_46222);


var G__46223 = seq__45304_46217;
var G__46224 = chunk__45306_46218;
var G__46225 = count__45307_46219;
var G__46226 = (i__45308_46220 + (1));
seq__45304_46217 = G__46223;
chunk__45306_46218 = G__46224;
count__45307_46219 = G__46225;
i__45308_46220 = G__46226;
continue;
} else {
var G__46227 = seq__45304_46217;
var G__46228 = chunk__45306_46218;
var G__46229 = count__45307_46219;
var G__46230 = (i__45308_46220 + (1));
seq__45304_46217 = G__46227;
chunk__45306_46218 = G__46228;
count__45307_46219 = G__46229;
i__45308_46220 = G__46230;
continue;
}
} else {
var temp__5804__auto___46231__$1 = cljs.core.seq(seq__45304_46217);
if(temp__5804__auto___46231__$1){
var seq__45304_46232__$1 = temp__5804__auto___46231__$1;
if(cljs.core.chunked_seq_QMARK_(seq__45304_46232__$1)){
var c__5568__auto___46233 = cljs.core.chunk_first(seq__45304_46232__$1);
var G__46234 = cljs.core.chunk_rest(seq__45304_46232__$1);
var G__46235 = c__5568__auto___46233;
var G__46236 = cljs.core.count(c__5568__auto___46233);
var G__46237 = (0);
seq__45304_46217 = G__46234;
chunk__45306_46218 = G__46235;
count__45307_46219 = G__46236;
i__45308_46220 = G__46237;
continue;
} else {
var child_46238 = cljs.core.first(seq__45304_46232__$1);
if(cljs.core.truth_(child_46238)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_46238);


var G__46239 = cljs.core.next(seq__45304_46232__$1);
var G__46240 = null;
var G__46241 = (0);
var G__46242 = (0);
seq__45304_46217 = G__46239;
chunk__45306_46218 = G__46240;
count__45307_46219 = G__46241;
i__45308_46220 = G__46242;
continue;
} else {
var G__46243 = cljs.core.next(seq__45304_46232__$1);
var G__46244 = null;
var G__46245 = (0);
var G__46246 = (0);
seq__45304_46217 = G__46243;
chunk__45306_46218 = G__46244;
count__45307_46219 = G__46245;
i__45308_46220 = G__46246;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_46216);
}


var G__46247 = cljs.core.next(seq__45216_46209__$1);
var G__46248 = null;
var G__46249 = (0);
var G__46250 = (0);
seq__45216_46168 = G__46247;
chunk__45217_46169 = G__46248;
count__45218_46170 = G__46249;
i__45219_46171 = G__46250;
continue;
}
} else {
}
}
break;
}

return node;
});
(cljs.core.Keyword.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Keyword.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1], null));
}));

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_dom,this$__$1);
}));
if(cljs.core.truth_(((typeof HTMLElement) != 'undefined'))){
(HTMLElement.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(HTMLElement.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
if(cljs.core.truth_(((typeof DocumentFragment) != 'undefined'))){
(DocumentFragment.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(DocumentFragment.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
/**
 * clear node children
 */
shadow.dom.reset = (function shadow$dom$reset(node){
return goog.dom.removeChildren(shadow.dom.dom_node(node));
});
shadow.dom.remove = (function shadow$dom$remove(node){
if((((!((node == null))))?(((((node.cljs$lang$protocol_mask$partition0$ & (8388608))) || ((cljs.core.PROTOCOL_SENTINEL === node.cljs$core$ISeqable$))))?true:false):false)){
var seq__45352 = cljs.core.seq(node);
var chunk__45353 = null;
var count__45354 = (0);
var i__45355 = (0);
while(true){
if((i__45355 < count__45354)){
var n = chunk__45353.cljs$core$IIndexed$_nth$arity$2(null,i__45355);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__46253 = seq__45352;
var G__46254 = chunk__45353;
var G__46255 = count__45354;
var G__46256 = (i__45355 + (1));
seq__45352 = G__46253;
chunk__45353 = G__46254;
count__45354 = G__46255;
i__45355 = G__46256;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__45352);
if(temp__5804__auto__){
var seq__45352__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__45352__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__45352__$1);
var G__46258 = cljs.core.chunk_rest(seq__45352__$1);
var G__46259 = c__5568__auto__;
var G__46260 = cljs.core.count(c__5568__auto__);
var G__46261 = (0);
seq__45352 = G__46258;
chunk__45353 = G__46259;
count__45354 = G__46260;
i__45355 = G__46261;
continue;
} else {
var n = cljs.core.first(seq__45352__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__46262 = cljs.core.next(seq__45352__$1);
var G__46263 = null;
var G__46264 = (0);
var G__46265 = (0);
seq__45352 = G__46262;
chunk__45353 = G__46263;
count__45354 = G__46264;
i__45355 = G__46265;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return goog.dom.removeNode(node);
}
});
shadow.dom.replace_node = (function shadow$dom$replace_node(old,new$){
return goog.dom.replaceNode(shadow.dom.dom_node(new$),shadow.dom.dom_node(old));
});
shadow.dom.text = (function shadow$dom$text(var_args){
var G__45377 = arguments.length;
switch (G__45377) {
case 2:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.text.cljs$core$IFn$_invoke$arity$2 = (function (el,new_text){
return (shadow.dom.dom_node(el).innerText = new_text);
}));

(shadow.dom.text.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.dom_node(el).innerText;
}));

(shadow.dom.text.cljs$lang$maxFixedArity = 2);

shadow.dom.check = (function shadow$dom$check(var_args){
var G__45394 = arguments.length;
switch (G__45394) {
case 1:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.check.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2(el,true);
}));

(shadow.dom.check.cljs$core$IFn$_invoke$arity$2 = (function (el,checked){
return (shadow.dom.dom_node(el).checked = checked);
}));

(shadow.dom.check.cljs$lang$maxFixedArity = 2);

shadow.dom.checked_QMARK_ = (function shadow$dom$checked_QMARK_(el){
return shadow.dom.dom_node(el).checked;
});
shadow.dom.form_elements = (function shadow$dom$form_elements(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).elements));
});
shadow.dom.children = (function shadow$dom$children(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).children));
});
shadow.dom.child_nodes = (function shadow$dom$child_nodes(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).childNodes));
});
shadow.dom.attr = (function shadow$dom$attr(var_args){
var G__45439 = arguments.length;
switch (G__45439) {
case 2:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$2 = (function (el,key){
return shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
}));

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$3 = (function (el,key,default$){
var or__5045__auto__ = shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return default$;
}
}));

(shadow.dom.attr.cljs$lang$maxFixedArity = 3);

shadow.dom.del_attr = (function shadow$dom$del_attr(el,key){
return shadow.dom.dom_node(el).removeAttribute(cljs.core.name(key));
});
shadow.dom.data = (function shadow$dom$data(el,key){
return shadow.dom.dom_node(el).getAttribute(["data-",cljs.core.name(key)].join(''));
});
shadow.dom.set_data = (function shadow$dom$set_data(el,key,value){
return shadow.dom.dom_node(el).setAttribute(["data-",cljs.core.name(key)].join(''),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});
shadow.dom.set_html = (function shadow$dom$set_html(node,text){
return (shadow.dom.dom_node(node).innerHTML = text);
});
shadow.dom.get_html = (function shadow$dom$get_html(node){
return shadow.dom.dom_node(node).innerHTML;
});
shadow.dom.fragment = (function shadow$dom$fragment(var_args){
var args__5775__auto__ = [];
var len__5769__auto___46270 = arguments.length;
var i__5770__auto___46271 = (0);
while(true){
if((i__5770__auto___46271 < len__5769__auto___46270)){
args__5775__auto__.push((arguments[i__5770__auto___46271]));

var G__46272 = (i__5770__auto___46271 + (1));
i__5770__auto___46271 = G__46272;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((0) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((0)),(0),null)):null);
return shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__5776__auto__);
});

(shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (nodes){
var fragment = document.createDocumentFragment();
var seq__45516_46273 = cljs.core.seq(nodes);
var chunk__45517_46274 = null;
var count__45518_46275 = (0);
var i__45519_46276 = (0);
while(true){
if((i__45519_46276 < count__45518_46275)){
var node_46277 = chunk__45517_46274.cljs$core$IIndexed$_nth$arity$2(null,i__45519_46276);
fragment.appendChild(shadow.dom._to_dom(node_46277));


var G__46278 = seq__45516_46273;
var G__46279 = chunk__45517_46274;
var G__46280 = count__45518_46275;
var G__46281 = (i__45519_46276 + (1));
seq__45516_46273 = G__46278;
chunk__45517_46274 = G__46279;
count__45518_46275 = G__46280;
i__45519_46276 = G__46281;
continue;
} else {
var temp__5804__auto___46282 = cljs.core.seq(seq__45516_46273);
if(temp__5804__auto___46282){
var seq__45516_46286__$1 = temp__5804__auto___46282;
if(cljs.core.chunked_seq_QMARK_(seq__45516_46286__$1)){
var c__5568__auto___46287 = cljs.core.chunk_first(seq__45516_46286__$1);
var G__46288 = cljs.core.chunk_rest(seq__45516_46286__$1);
var G__46289 = c__5568__auto___46287;
var G__46290 = cljs.core.count(c__5568__auto___46287);
var G__46291 = (0);
seq__45516_46273 = G__46288;
chunk__45517_46274 = G__46289;
count__45518_46275 = G__46290;
i__45519_46276 = G__46291;
continue;
} else {
var node_46293 = cljs.core.first(seq__45516_46286__$1);
fragment.appendChild(shadow.dom._to_dom(node_46293));


var G__46295 = cljs.core.next(seq__45516_46286__$1);
var G__46296 = null;
var G__46297 = (0);
var G__46298 = (0);
seq__45516_46273 = G__46295;
chunk__45517_46274 = G__46296;
count__45518_46275 = G__46297;
i__45519_46276 = G__46298;
continue;
}
} else {
}
}
break;
}

return (new shadow.dom.NativeColl(fragment));
}));

(shadow.dom.fragment.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq45495){
var self__5755__auto__ = this;
return self__5755__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq45495));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__45553_46299 = cljs.core.seq(scripts);
var chunk__45554_46300 = null;
var count__45555_46301 = (0);
var i__45556_46302 = (0);
while(true){
if((i__45556_46302 < count__45555_46301)){
var vec__45569_46303 = chunk__45554_46300.cljs$core$IIndexed$_nth$arity$2(null,i__45556_46302);
var script_tag_46304 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45569_46303,(0),null);
var script_body_46305 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45569_46303,(1),null);
eval(script_body_46305);


var G__46306 = seq__45553_46299;
var G__46307 = chunk__45554_46300;
var G__46308 = count__45555_46301;
var G__46309 = (i__45556_46302 + (1));
seq__45553_46299 = G__46306;
chunk__45554_46300 = G__46307;
count__45555_46301 = G__46308;
i__45556_46302 = G__46309;
continue;
} else {
var temp__5804__auto___46310 = cljs.core.seq(seq__45553_46299);
if(temp__5804__auto___46310){
var seq__45553_46311__$1 = temp__5804__auto___46310;
if(cljs.core.chunked_seq_QMARK_(seq__45553_46311__$1)){
var c__5568__auto___46312 = cljs.core.chunk_first(seq__45553_46311__$1);
var G__46313 = cljs.core.chunk_rest(seq__45553_46311__$1);
var G__46314 = c__5568__auto___46312;
var G__46315 = cljs.core.count(c__5568__auto___46312);
var G__46316 = (0);
seq__45553_46299 = G__46313;
chunk__45554_46300 = G__46314;
count__45555_46301 = G__46315;
i__45556_46302 = G__46316;
continue;
} else {
var vec__45573_46317 = cljs.core.first(seq__45553_46311__$1);
var script_tag_46318 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45573_46317,(0),null);
var script_body_46319 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45573_46317,(1),null);
eval(script_body_46319);


var G__46321 = cljs.core.next(seq__45553_46311__$1);
var G__46322 = null;
var G__46323 = (0);
var G__46324 = (0);
seq__45553_46299 = G__46321;
chunk__45554_46300 = G__46322;
count__45555_46301 = G__46323;
i__45556_46302 = G__46324;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__45581){
var vec__45582 = p__45581;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45582,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45582,(1),null);
return clojure.string.replace(s__$1,script_tag,"");
}),s,scripts);
});
shadow.dom.str__GT_fragment = (function shadow$dom$str__GT_fragment(s){
var el = document.createElement("div");
(el.innerHTML = s);

return (new shadow.dom.NativeColl(goog.dom.childrenToNode_(document,el)));
});
shadow.dom.node_name = (function shadow$dom$node_name(el){
return shadow.dom.dom_node(el).nodeName;
});
shadow.dom.ancestor_by_class = (function shadow$dom$ancestor_by_class(el,cls){
return goog.dom.getAncestorByClass(shadow.dom.dom_node(el),cls);
});
shadow.dom.ancestor_by_tag = (function shadow$dom$ancestor_by_tag(var_args){
var G__45621 = arguments.length;
switch (G__45621) {
case 2:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2 = (function (el,tag){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag));
}));

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3 = (function (el,tag,cls){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag),cljs.core.name(cls));
}));

(shadow.dom.ancestor_by_tag.cljs$lang$maxFixedArity = 3);

shadow.dom.get_value = (function shadow$dom$get_value(dom){
return goog.dom.forms.getValue(shadow.dom.dom_node(dom));
});
shadow.dom.set_value = (function shadow$dom$set_value(dom,value){
return goog.dom.forms.setValue(shadow.dom.dom_node(dom),value);
});
shadow.dom.px = (function shadow$dom$px(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((value | (0))),"px"].join('');
});
shadow.dom.pct = (function shadow$dom$pct(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"%"].join('');
});
shadow.dom.remove_style_STAR_ = (function shadow$dom$remove_style_STAR_(el,style){
return el.style.removeProperty(cljs.core.name(style));
});
shadow.dom.remove_style = (function shadow$dom$remove_style(el,style){
var el__$1 = shadow.dom.dom_node(el);
return shadow.dom.remove_style_STAR_(el__$1,style);
});
shadow.dom.remove_styles = (function shadow$dom$remove_styles(el,style_keys){
var el__$1 = shadow.dom.dom_node(el);
var seq__45659 = cljs.core.seq(style_keys);
var chunk__45660 = null;
var count__45661 = (0);
var i__45662 = (0);
while(true){
if((i__45662 < count__45661)){
var it = chunk__45660.cljs$core$IIndexed$_nth$arity$2(null,i__45662);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__46330 = seq__45659;
var G__46331 = chunk__45660;
var G__46332 = count__45661;
var G__46333 = (i__45662 + (1));
seq__45659 = G__46330;
chunk__45660 = G__46331;
count__45661 = G__46332;
i__45662 = G__46333;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__45659);
if(temp__5804__auto__){
var seq__45659__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__45659__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__45659__$1);
var G__46334 = cljs.core.chunk_rest(seq__45659__$1);
var G__46335 = c__5568__auto__;
var G__46336 = cljs.core.count(c__5568__auto__);
var G__46337 = (0);
seq__45659 = G__46334;
chunk__45660 = G__46335;
count__45661 = G__46336;
i__45662 = G__46337;
continue;
} else {
var it = cljs.core.first(seq__45659__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__46338 = cljs.core.next(seq__45659__$1);
var G__46339 = null;
var G__46340 = (0);
var G__46341 = (0);
seq__45659 = G__46338;
chunk__45660 = G__46339;
count__45661 = G__46340;
i__45662 = G__46341;
continue;
}
} else {
return null;
}
}
break;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Coordinate = (function (x,y,__meta,__extmap,__hash){
this.x = x;
this.y = y;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5343__auto__,k__5344__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return this__5343__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5344__auto__,null);
}));

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5345__auto__,k45678,else__5346__auto__){
var self__ = this;
var this__5345__auto____$1 = this;
var G__45688 = k45678;
var G__45688__$1 = (((G__45688 instanceof cljs.core.Keyword))?G__45688.fqn:null);
switch (G__45688__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k45678,else__5346__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5363__auto__,f__5364__auto__,init__5365__auto__){
var self__ = this;
var this__5363__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5366__auto__,p__45690){
var vec__45692 = p__45690;
var k__5367__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45692,(0),null);
var v__5368__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45692,(1),null);
return (f__5364__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5364__auto__.cljs$core$IFn$_invoke$arity$3(ret__5366__auto__,k__5367__auto__,v__5368__auto__) : f__5364__auto__.call(null,ret__5366__auto__,k__5367__auto__,v__5368__auto__));
}),init__5365__auto__,this__5363__auto____$1);
}));

(shadow.dom.Coordinate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5358__auto__,writer__5359__auto__,opts__5360__auto__){
var self__ = this;
var this__5358__auto____$1 = this;
var pr_pair__5361__auto__ = (function (keyval__5362__auto__){
return cljs.core.pr_sequential_writer(writer__5359__auto__,cljs.core.pr_writer,""," ","",opts__5360__auto__,keyval__5362__auto__);
});
return cljs.core.pr_sequential_writer(writer__5359__auto__,pr_pair__5361__auto__,"#shadow.dom.Coordinate{",", ","}",opts__5360__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"x","x",2099068185),self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"y","y",-1757859776),self__.y],null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__45677){
var self__ = this;
var G__45677__$1 = this;
return (new cljs.core.RecordIter((0),G__45677__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5341__auto__){
var self__ = this;
var this__5341__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5338__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5347__auto__){
var self__ = this;
var this__5347__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5339__auto__){
var self__ = this;
var this__5339__auto____$1 = this;
var h__5154__auto__ = self__.__hash;
if((!((h__5154__auto__ == null)))){
return h__5154__auto__;
} else {
var h__5154__auto____$1 = (function (coll__5340__auto__){
return (145542109 ^ cljs.core.hash_unordered_coll(coll__5340__auto__));
})(this__5339__auto____$1);
(self__.__hash = h__5154__auto____$1);

return h__5154__auto____$1;
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this45679,other45680){
var self__ = this;
var this45679__$1 = this;
return (((!((other45680 == null)))) && ((((this45679__$1.constructor === other45680.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this45679__$1.x,other45680.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this45679__$1.y,other45680.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this45679__$1.__extmap,other45680.__extmap)))))))));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5353__auto__,k__5354__auto__){
var self__ = this;
var this__5353__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"y","y",-1757859776),null,new cljs.core.Keyword(null,"x","x",2099068185),null], null), null),k__5354__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5353__auto____$1),self__.__meta),k__5354__auto__);
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5354__auto__)),null));
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5350__auto__,k45678){
var self__ = this;
var this__5350__auto____$1 = this;
var G__45731 = k45678;
var G__45731__$1 = (((G__45731 instanceof cljs.core.Keyword))?G__45731.fqn:null);
switch (G__45731__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k45678);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5351__auto__,k__5352__auto__,G__45677){
var self__ = this;
var this__5351__auto____$1 = this;
var pred__45743 = cljs.core.keyword_identical_QMARK_;
var expr__45744 = k__5352__auto__;
if(cljs.core.truth_((pred__45743.cljs$core$IFn$_invoke$arity$2 ? pred__45743.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__45744) : pred__45743.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__45744)))){
return (new shadow.dom.Coordinate(G__45677,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__45743.cljs$core$IFn$_invoke$arity$2 ? pred__45743.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__45744) : pred__45743.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__45744)))){
return (new shadow.dom.Coordinate(self__.x,G__45677,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5352__auto__,G__45677),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5356__auto__){
var self__ = this;
var this__5356__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5342__auto__,G__45677){
var self__ = this;
var this__5342__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__45677,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5348__auto__,entry__5349__auto__){
var self__ = this;
var this__5348__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5349__auto__)){
return this__5348__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5349__auto__,(0)),cljs.core._nth(entry__5349__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5348__auto____$1,entry__5349__auto__);
}
}));

(shadow.dom.Coordinate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null),new cljs.core.Symbol(null,"y","y",-117328249,null)], null);
}));

(shadow.dom.Coordinate.cljs$lang$type = true);

(shadow.dom.Coordinate.cljs$lang$ctorPrSeq = (function (this__5389__auto__){
return (new cljs.core.List(null,"shadow.dom/Coordinate",null,(1),null));
}));

(shadow.dom.Coordinate.cljs$lang$ctorPrWriter = (function (this__5389__auto__,writer__5390__auto__){
return cljs.core._write(writer__5390__auto__,"shadow.dom/Coordinate");
}));

/**
 * Positional factory function for shadow.dom/Coordinate.
 */
shadow.dom.__GT_Coordinate = (function shadow$dom$__GT_Coordinate(x,y){
return (new shadow.dom.Coordinate(x,y,null,null,null));
});

/**
 * Factory function for shadow.dom/Coordinate, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__45683){
var extmap__5385__auto__ = (function (){var G__45752 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__45683,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__45683)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__45752);
} else {
return G__45752;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__45683),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__45683),null,cljs.core.not_empty(extmap__5385__auto__),null));
});

shadow.dom.get_position = (function shadow$dom$get_position(el){
var pos = goog.style.getPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_client_position = (function shadow$dom$get_client_position(el){
var pos = goog.style.getClientPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_page_offset = (function shadow$dom$get_page_offset(el){
var pos = goog.style.getPageOffset(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Size = (function (w,h,__meta,__extmap,__hash){
this.w = w;
this.h = h;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5343__auto__,k__5344__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return this__5343__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5344__auto__,null);
}));

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5345__auto__,k45766,else__5346__auto__){
var self__ = this;
var this__5345__auto____$1 = this;
var G__45773 = k45766;
var G__45773__$1 = (((G__45773 instanceof cljs.core.Keyword))?G__45773.fqn:null);
switch (G__45773__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k45766,else__5346__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5363__auto__,f__5364__auto__,init__5365__auto__){
var self__ = this;
var this__5363__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5366__auto__,p__45778){
var vec__45779 = p__45778;
var k__5367__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45779,(0),null);
var v__5368__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45779,(1),null);
return (f__5364__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5364__auto__.cljs$core$IFn$_invoke$arity$3(ret__5366__auto__,k__5367__auto__,v__5368__auto__) : f__5364__auto__.call(null,ret__5366__auto__,k__5367__auto__,v__5368__auto__));
}),init__5365__auto__,this__5363__auto____$1);
}));

(shadow.dom.Size.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5358__auto__,writer__5359__auto__,opts__5360__auto__){
var self__ = this;
var this__5358__auto____$1 = this;
var pr_pair__5361__auto__ = (function (keyval__5362__auto__){
return cljs.core.pr_sequential_writer(writer__5359__auto__,cljs.core.pr_writer,""," ","",opts__5360__auto__,keyval__5362__auto__);
});
return cljs.core.pr_sequential_writer(writer__5359__auto__,pr_pair__5361__auto__,"#shadow.dom.Size{",", ","}",opts__5360__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"w","w",354169001),self__.w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"h","h",1109658740),self__.h],null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__45765){
var self__ = this;
var G__45765__$1 = this;
return (new cljs.core.RecordIter((0),G__45765__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Size.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5341__auto__){
var self__ = this;
var this__5341__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Size.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5338__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5347__auto__){
var self__ = this;
var this__5347__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5339__auto__){
var self__ = this;
var this__5339__auto____$1 = this;
var h__5154__auto__ = self__.__hash;
if((!((h__5154__auto__ == null)))){
return h__5154__auto__;
} else {
var h__5154__auto____$1 = (function (coll__5340__auto__){
return (-1228019642 ^ cljs.core.hash_unordered_coll(coll__5340__auto__));
})(this__5339__auto____$1);
(self__.__hash = h__5154__auto____$1);

return h__5154__auto____$1;
}
}));

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this45767,other45768){
var self__ = this;
var this45767__$1 = this;
return (((!((other45768 == null)))) && ((((this45767__$1.constructor === other45768.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this45767__$1.w,other45768.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this45767__$1.h,other45768.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this45767__$1.__extmap,other45768.__extmap)))))))));
}));

(shadow.dom.Size.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5353__auto__,k__5354__auto__){
var self__ = this;
var this__5353__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"w","w",354169001),null,new cljs.core.Keyword(null,"h","h",1109658740),null], null), null),k__5354__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5353__auto____$1),self__.__meta),k__5354__auto__);
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5354__auto__)),null));
}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5350__auto__,k45766){
var self__ = this;
var this__5350__auto____$1 = this;
var G__45799 = k45766;
var G__45799__$1 = (((G__45799 instanceof cljs.core.Keyword))?G__45799.fqn:null);
switch (G__45799__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k45766);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5351__auto__,k__5352__auto__,G__45765){
var self__ = this;
var this__5351__auto____$1 = this;
var pred__45801 = cljs.core.keyword_identical_QMARK_;
var expr__45802 = k__5352__auto__;
if(cljs.core.truth_((pred__45801.cljs$core$IFn$_invoke$arity$2 ? pred__45801.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__45802) : pred__45801.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__45802)))){
return (new shadow.dom.Size(G__45765,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__45801.cljs$core$IFn$_invoke$arity$2 ? pred__45801.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__45802) : pred__45801.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__45802)))){
return (new shadow.dom.Size(self__.w,G__45765,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5352__auto__,G__45765),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5356__auto__){
var self__ = this;
var this__5356__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5342__auto__,G__45765){
var self__ = this;
var this__5342__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__45765,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5348__auto__,entry__5349__auto__){
var self__ = this;
var this__5348__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5349__auto__)){
return this__5348__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5349__auto__,(0)),cljs.core._nth(entry__5349__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5348__auto____$1,entry__5349__auto__);
}
}));

(shadow.dom.Size.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"w","w",1994700528,null),new cljs.core.Symbol(null,"h","h",-1544777029,null)], null);
}));

(shadow.dom.Size.cljs$lang$type = true);

(shadow.dom.Size.cljs$lang$ctorPrSeq = (function (this__5389__auto__){
return (new cljs.core.List(null,"shadow.dom/Size",null,(1),null));
}));

(shadow.dom.Size.cljs$lang$ctorPrWriter = (function (this__5389__auto__,writer__5390__auto__){
return cljs.core._write(writer__5390__auto__,"shadow.dom/Size");
}));

/**
 * Positional factory function for shadow.dom/Size.
 */
shadow.dom.__GT_Size = (function shadow$dom$__GT_Size(w,h){
return (new shadow.dom.Size(w,h,null,null,null));
});

/**
 * Factory function for shadow.dom/Size, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__45771){
var extmap__5385__auto__ = (function (){var G__45818 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__45771,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__45771)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__45818);
} else {
return G__45818;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__45771),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__45771),null,cljs.core.not_empty(extmap__5385__auto__),null));
});

shadow.dom.size__GT_clj = (function shadow$dom$size__GT_clj(size){
return (new shadow.dom.Size(size.width,size.height,null,null,null));
});
shadow.dom.get_size = (function shadow$dom$get_size(el){
return shadow.dom.size__GT_clj(goog.style.getSize(shadow.dom.dom_node(el)));
});
shadow.dom.get_height = (function shadow$dom$get_height(el){
return shadow.dom.get_size(el).h;
});
shadow.dom.get_viewport_size = (function shadow$dom$get_viewport_size(){
return shadow.dom.size__GT_clj(goog.dom.getViewportSize());
});
shadow.dom.first_child = (function shadow$dom$first_child(el){
return (shadow.dom.dom_node(el).children[(0)]);
});
shadow.dom.select_option_values = (function shadow$dom$select_option_values(el){
var native$ = shadow.dom.dom_node(el);
var opts = (native$["options"]);
var a__5633__auto__ = opts;
var l__5634__auto__ = a__5633__auto__.length;
var i = (0);
var ret = cljs.core.PersistentVector.EMPTY;
while(true){
if((i < l__5634__auto__)){
var G__46379 = (i + (1));
var G__46380 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__46379;
ret = G__46380;
continue;
} else {
return ret;
}
break;
}
});
shadow.dom.build_url = (function shadow$dom$build_url(path,query_params){
if(cljs.core.empty_QMARK_(query_params)){
return path;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__45857){
var vec__45858 = p__45857;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45858,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45858,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__45883 = arguments.length;
switch (G__45883) {
case 1:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1 = (function (path){
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2(path,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2 = (function (path,query_params){
return (document["location"]["href"] = shadow.dom.build_url(path,query_params));
}));

(shadow.dom.redirect.cljs$lang$maxFixedArity = 2);

shadow.dom.reload_BANG_ = (function shadow$dom$reload_BANG_(){
return (document.location.href = document.location.href);
});
shadow.dom.tag_name = (function shadow$dom$tag_name(el){
var dom = shadow.dom.dom_node(el);
return dom.tagName;
});
shadow.dom.insert_after = (function shadow$dom$insert_after(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingAfter(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_before = (function shadow$dom$insert_before(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingBefore(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_first = (function shadow$dom$insert_first(ref,new$){
var temp__5802__auto__ = shadow.dom.dom_node(ref).firstChild;
if(cljs.core.truth_(temp__5802__auto__)){
var child = temp__5802__auto__;
return shadow.dom.insert_before(child,new$);
} else {
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2(ref,new$);
}
});
shadow.dom.index_of = (function shadow$dom$index_of(el){
var el__$1 = shadow.dom.dom_node(el);
var i = (0);
while(true){
var ps = el__$1.previousSibling;
if((ps == null)){
return i;
} else {
var G__46386 = ps;
var G__46387 = (i + (1));
el__$1 = G__46386;
i = G__46387;
continue;
}
break;
}
});
shadow.dom.get_parent = (function shadow$dom$get_parent(el){
return goog.dom.getParentElement(shadow.dom.dom_node(el));
});
shadow.dom.parents = (function shadow$dom$parents(el){
var parent = shadow.dom.get_parent(el);
if(cljs.core.truth_(parent)){
return cljs.core.cons(parent,(new cljs.core.LazySeq(null,(function (){
return (shadow.dom.parents.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.parents.cljs$core$IFn$_invoke$arity$1(parent) : shadow.dom.parents.call(null,parent));
}),null,null)));
} else {
return null;
}
});
shadow.dom.matches = (function shadow$dom$matches(el,sel){
return shadow.dom.dom_node(el).matches(sel);
});
shadow.dom.get_next_sibling = (function shadow$dom$get_next_sibling(el){
return goog.dom.getNextElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.get_previous_sibling = (function shadow$dom$get_previous_sibling(el){
return goog.dom.getPreviousElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.xmlns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, ["svg","http://www.w3.org/2000/svg","xlink","http://www.w3.org/1999/xlink"], null));
shadow.dom.create_svg_node = (function shadow$dom$create_svg_node(tag_def,props){
var vec__45985 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45985,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45985,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__45985,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__45989_46392 = cljs.core.seq(props);
var chunk__45990_46393 = null;
var count__45991_46394 = (0);
var i__45992_46395 = (0);
while(true){
if((i__45992_46395 < count__45991_46394)){
var vec__46004_46396 = chunk__45990_46393.cljs$core$IIndexed$_nth$arity$2(null,i__45992_46395);
var k_46397 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__46004_46396,(0),null);
var v_46398 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__46004_46396,(1),null);
el.setAttributeNS((function (){var temp__5804__auto__ = cljs.core.namespace(k_46397);
if(cljs.core.truth_(temp__5804__auto__)){
var ns = temp__5804__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_46397),v_46398);


var G__46402 = seq__45989_46392;
var G__46403 = chunk__45990_46393;
var G__46404 = count__45991_46394;
var G__46405 = (i__45992_46395 + (1));
seq__45989_46392 = G__46402;
chunk__45990_46393 = G__46403;
count__45991_46394 = G__46404;
i__45992_46395 = G__46405;
continue;
} else {
var temp__5804__auto___46406 = cljs.core.seq(seq__45989_46392);
if(temp__5804__auto___46406){
var seq__45989_46407__$1 = temp__5804__auto___46406;
if(cljs.core.chunked_seq_QMARK_(seq__45989_46407__$1)){
var c__5568__auto___46410 = cljs.core.chunk_first(seq__45989_46407__$1);
var G__46411 = cljs.core.chunk_rest(seq__45989_46407__$1);
var G__46412 = c__5568__auto___46410;
var G__46413 = cljs.core.count(c__5568__auto___46410);
var G__46414 = (0);
seq__45989_46392 = G__46411;
chunk__45990_46393 = G__46412;
count__45991_46394 = G__46413;
i__45992_46395 = G__46414;
continue;
} else {
var vec__46007_46416 = cljs.core.first(seq__45989_46407__$1);
var k_46417 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__46007_46416,(0),null);
var v_46418 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__46007_46416,(1),null);
el.setAttributeNS((function (){var temp__5804__auto____$1 = cljs.core.namespace(k_46417);
if(cljs.core.truth_(temp__5804__auto____$1)){
var ns = temp__5804__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_46417),v_46418);


var G__46420 = cljs.core.next(seq__45989_46407__$1);
var G__46421 = null;
var G__46422 = (0);
var G__46423 = (0);
seq__45989_46392 = G__46420;
chunk__45990_46393 = G__46421;
count__45991_46394 = G__46422;
i__45992_46395 = G__46423;
continue;
}
} else {
}
}
break;
}

return el;
});
shadow.dom.svg_node = (function shadow$dom$svg_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$SVGElement$))))?true:false):false)){
return el.shadow$dom$SVGElement$_to_svg$arity$1(null);
} else {
return el;

}
}
});
shadow.dom.make_svg_node = (function shadow$dom$make_svg_node(structure){
var vec__46025 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__46025,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__46025,(1),null);
var seq__46028_46427 = cljs.core.seq(node_children);
var chunk__46030_46428 = null;
var count__46031_46430 = (0);
var i__46032_46431 = (0);
while(true){
if((i__46032_46431 < count__46031_46430)){
var child_struct_46433 = chunk__46030_46428.cljs$core$IIndexed$_nth$arity$2(null,i__46032_46431);
if((!((child_struct_46433 == null)))){
if(typeof child_struct_46433 === 'string'){
var text_46435 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_46435),child_struct_46433].join(''));
} else {
var children_46436 = shadow.dom.svg_node(child_struct_46433);
if(cljs.core.seq_QMARK_(children_46436)){
var seq__46053_46437 = cljs.core.seq(children_46436);
var chunk__46055_46438 = null;
var count__46056_46439 = (0);
var i__46057_46440 = (0);
while(true){
if((i__46057_46440 < count__46056_46439)){
var child_46441 = chunk__46055_46438.cljs$core$IIndexed$_nth$arity$2(null,i__46057_46440);
if(cljs.core.truth_(child_46441)){
node.appendChild(child_46441);


var G__46444 = seq__46053_46437;
var G__46445 = chunk__46055_46438;
var G__46446 = count__46056_46439;
var G__46447 = (i__46057_46440 + (1));
seq__46053_46437 = G__46444;
chunk__46055_46438 = G__46445;
count__46056_46439 = G__46446;
i__46057_46440 = G__46447;
continue;
} else {
var G__46449 = seq__46053_46437;
var G__46450 = chunk__46055_46438;
var G__46451 = count__46056_46439;
var G__46452 = (i__46057_46440 + (1));
seq__46053_46437 = G__46449;
chunk__46055_46438 = G__46450;
count__46056_46439 = G__46451;
i__46057_46440 = G__46452;
continue;
}
} else {
var temp__5804__auto___46453 = cljs.core.seq(seq__46053_46437);
if(temp__5804__auto___46453){
var seq__46053_46454__$1 = temp__5804__auto___46453;
if(cljs.core.chunked_seq_QMARK_(seq__46053_46454__$1)){
var c__5568__auto___46455 = cljs.core.chunk_first(seq__46053_46454__$1);
var G__46456 = cljs.core.chunk_rest(seq__46053_46454__$1);
var G__46457 = c__5568__auto___46455;
var G__46458 = cljs.core.count(c__5568__auto___46455);
var G__46459 = (0);
seq__46053_46437 = G__46456;
chunk__46055_46438 = G__46457;
count__46056_46439 = G__46458;
i__46057_46440 = G__46459;
continue;
} else {
var child_46461 = cljs.core.first(seq__46053_46454__$1);
if(cljs.core.truth_(child_46461)){
node.appendChild(child_46461);


var G__46463 = cljs.core.next(seq__46053_46454__$1);
var G__46464 = null;
var G__46465 = (0);
var G__46466 = (0);
seq__46053_46437 = G__46463;
chunk__46055_46438 = G__46464;
count__46056_46439 = G__46465;
i__46057_46440 = G__46466;
continue;
} else {
var G__46467 = cljs.core.next(seq__46053_46454__$1);
var G__46468 = null;
var G__46469 = (0);
var G__46470 = (0);
seq__46053_46437 = G__46467;
chunk__46055_46438 = G__46468;
count__46056_46439 = G__46469;
i__46057_46440 = G__46470;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_46436);
}
}


var G__46471 = seq__46028_46427;
var G__46472 = chunk__46030_46428;
var G__46473 = count__46031_46430;
var G__46474 = (i__46032_46431 + (1));
seq__46028_46427 = G__46471;
chunk__46030_46428 = G__46472;
count__46031_46430 = G__46473;
i__46032_46431 = G__46474;
continue;
} else {
var G__46475 = seq__46028_46427;
var G__46476 = chunk__46030_46428;
var G__46477 = count__46031_46430;
var G__46478 = (i__46032_46431 + (1));
seq__46028_46427 = G__46475;
chunk__46030_46428 = G__46476;
count__46031_46430 = G__46477;
i__46032_46431 = G__46478;
continue;
}
} else {
var temp__5804__auto___46479 = cljs.core.seq(seq__46028_46427);
if(temp__5804__auto___46479){
var seq__46028_46480__$1 = temp__5804__auto___46479;
if(cljs.core.chunked_seq_QMARK_(seq__46028_46480__$1)){
var c__5568__auto___46481 = cljs.core.chunk_first(seq__46028_46480__$1);
var G__46482 = cljs.core.chunk_rest(seq__46028_46480__$1);
var G__46483 = c__5568__auto___46481;
var G__46484 = cljs.core.count(c__5568__auto___46481);
var G__46485 = (0);
seq__46028_46427 = G__46482;
chunk__46030_46428 = G__46483;
count__46031_46430 = G__46484;
i__46032_46431 = G__46485;
continue;
} else {
var child_struct_46486 = cljs.core.first(seq__46028_46480__$1);
if((!((child_struct_46486 == null)))){
if(typeof child_struct_46486 === 'string'){
var text_46488 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_46488),child_struct_46486].join(''));
} else {
var children_46491 = shadow.dom.svg_node(child_struct_46486);
if(cljs.core.seq_QMARK_(children_46491)){
var seq__46060_46492 = cljs.core.seq(children_46491);
var chunk__46062_46493 = null;
var count__46063_46494 = (0);
var i__46064_46495 = (0);
while(true){
if((i__46064_46495 < count__46063_46494)){
var child_46496 = chunk__46062_46493.cljs$core$IIndexed$_nth$arity$2(null,i__46064_46495);
if(cljs.core.truth_(child_46496)){
node.appendChild(child_46496);


var G__46497 = seq__46060_46492;
var G__46498 = chunk__46062_46493;
var G__46499 = count__46063_46494;
var G__46500 = (i__46064_46495 + (1));
seq__46060_46492 = G__46497;
chunk__46062_46493 = G__46498;
count__46063_46494 = G__46499;
i__46064_46495 = G__46500;
continue;
} else {
var G__46502 = seq__46060_46492;
var G__46503 = chunk__46062_46493;
var G__46504 = count__46063_46494;
var G__46505 = (i__46064_46495 + (1));
seq__46060_46492 = G__46502;
chunk__46062_46493 = G__46503;
count__46063_46494 = G__46504;
i__46064_46495 = G__46505;
continue;
}
} else {
var temp__5804__auto___46506__$1 = cljs.core.seq(seq__46060_46492);
if(temp__5804__auto___46506__$1){
var seq__46060_46507__$1 = temp__5804__auto___46506__$1;
if(cljs.core.chunked_seq_QMARK_(seq__46060_46507__$1)){
var c__5568__auto___46508 = cljs.core.chunk_first(seq__46060_46507__$1);
var G__46509 = cljs.core.chunk_rest(seq__46060_46507__$1);
var G__46510 = c__5568__auto___46508;
var G__46511 = cljs.core.count(c__5568__auto___46508);
var G__46512 = (0);
seq__46060_46492 = G__46509;
chunk__46062_46493 = G__46510;
count__46063_46494 = G__46511;
i__46064_46495 = G__46512;
continue;
} else {
var child_46514 = cljs.core.first(seq__46060_46507__$1);
if(cljs.core.truth_(child_46514)){
node.appendChild(child_46514);


var G__46518 = cljs.core.next(seq__46060_46507__$1);
var G__46519 = null;
var G__46520 = (0);
var G__46521 = (0);
seq__46060_46492 = G__46518;
chunk__46062_46493 = G__46519;
count__46063_46494 = G__46520;
i__46064_46495 = G__46521;
continue;
} else {
var G__46523 = cljs.core.next(seq__46060_46507__$1);
var G__46524 = null;
var G__46525 = (0);
var G__46526 = (0);
seq__46060_46492 = G__46523;
chunk__46062_46493 = G__46524;
count__46063_46494 = G__46525;
i__46064_46495 = G__46526;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_46491);
}
}


var G__46528 = cljs.core.next(seq__46028_46480__$1);
var G__46529 = null;
var G__46530 = (0);
var G__46531 = (0);
seq__46028_46427 = G__46528;
chunk__46030_46428 = G__46529;
count__46031_46430 = G__46530;
i__46032_46431 = G__46531;
continue;
} else {
var G__46532 = cljs.core.next(seq__46028_46480__$1);
var G__46533 = null;
var G__46534 = (0);
var G__46535 = (0);
seq__46028_46427 = G__46532;
chunk__46030_46428 = G__46533;
count__46031_46430 = G__46534;
i__46032_46431 = G__46535;
continue;
}
}
} else {
}
}
break;
}

return node;
});
(shadow.dom.SVGElement["string"] = true);

(shadow.dom._to_svg["string"] = (function (this$){
if((this$ instanceof cljs.core.Keyword)){
return shadow.dom.make_svg_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$], null));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("strings cannot be in svgs",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"this","this",-611633625),this$], null));
}
}));

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_svg_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_svg,this$__$1);
}));

(shadow.dom.SVGElement["null"] = true);

(shadow.dom._to_svg["null"] = (function (_){
return null;
}));
shadow.dom.svg = (function shadow$dom$svg(var_args){
var args__5775__auto__ = [];
var len__5769__auto___46541 = arguments.length;
var i__5770__auto___46543 = (0);
while(true){
if((i__5770__auto___46543 < len__5769__auto___46541)){
args__5775__auto__.push((arguments[i__5770__auto___46543]));

var G__46544 = (i__5770__auto___46543 + (1));
i__5770__auto___46543 = G__46544;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (attrs,children){
return shadow.dom._to_svg(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),attrs], null),children)));
}));

(shadow.dom.svg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.dom.svg.cljs$lang$applyTo = (function (seq46068){
var G__46069 = cljs.core.first(seq46068);
var seq46068__$1 = cljs.core.next(seq46068);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__46069,seq46068__$1);
}));

/**
 * returns a channel for events on el
 * transform-fn should be a (fn [e el] some-val) where some-val will be put on the chan
 * once-or-cleanup handles the removal of the event handler
 * - true: remove after one event
 * - false: never removed
 * - chan: remove on msg/close
 */
shadow.dom.event_chan = (function shadow$dom$event_chan(var_args){
var G__46072 = arguments.length;
switch (G__46072) {
case 2:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$2 = (function (el,event){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,null,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$3 = (function (el,event,xf){
return shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4(el,event,xf,false);
}));

(shadow.dom.event_chan.cljs$core$IFn$_invoke$arity$4 = (function (el,event,xf,once_or_cleanup){
var buf = cljs.core.async.sliding_buffer((1));
var chan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2(buf,xf);
var event_fn = (function shadow$dom$event_fn(e){
cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(chan,e);

if(once_or_cleanup === true){
shadow.dom.remove_event_handler(el,event,shadow$dom$event_fn);

return cljs.core.async.close_BANG_(chan);
} else {
return null;
}
});
shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(event),event_fn);

if(cljs.core.truth_((function (){var and__5043__auto__ = once_or_cleanup;
if(cljs.core.truth_(and__5043__auto__)){
return (!(once_or_cleanup === true));
} else {
return and__5043__auto__;
}
})())){
var c__39218__auto___46557 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_46078){
var state_val_46079 = (state_46078[(1)]);
if((state_val_46079 === (1))){
var state_46078__$1 = state_46078;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_46078__$1,(2),once_or_cleanup);
} else {
if((state_val_46079 === (2))){
var inst_46075 = (state_46078[(2)]);
var inst_46076 = shadow.dom.remove_event_handler(el,event,event_fn);
var state_46078__$1 = (function (){var statearr_46081 = state_46078;
(statearr_46081[(7)] = inst_46075);

return statearr_46081;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_46078__$1,inst_46076);
} else {
return null;
}
}
});
return (function() {
var shadow$dom$state_machine__38811__auto__ = null;
var shadow$dom$state_machine__38811__auto____0 = (function (){
var statearr_46084 = [null,null,null,null,null,null,null,null];
(statearr_46084[(0)] = shadow$dom$state_machine__38811__auto__);

(statearr_46084[(1)] = (1));

return statearr_46084;
});
var shadow$dom$state_machine__38811__auto____1 = (function (state_46078){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_46078);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e46085){var ex__38814__auto__ = e46085;
var statearr_46087_46563 = state_46078;
(statearr_46087_46563[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_46078[(4)]))){
var statearr_46088_46567 = state_46078;
(statearr_46088_46567[(1)] = cljs.core.first((state_46078[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__46568 = state_46078;
state_46078 = G__46568;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
shadow$dom$state_machine__38811__auto__ = function(state_46078){
switch(arguments.length){
case 0:
return shadow$dom$state_machine__38811__auto____0.call(this);
case 1:
return shadow$dom$state_machine__38811__auto____1.call(this,state_46078);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
shadow$dom$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = shadow$dom$state_machine__38811__auto____0;
shadow$dom$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = shadow$dom$state_machine__38811__auto____1;
return shadow$dom$state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_46091 = f__39219__auto__();
(statearr_46091[(6)] = c__39218__auto___46557);

return statearr_46091;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));

} else {
}

return chan;
}));

(shadow.dom.event_chan.cljs$lang$maxFixedArity = 4);


//# sourceMappingURL=shadow.dom.js.map
