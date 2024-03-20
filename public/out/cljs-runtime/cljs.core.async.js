goog.provide('cljs.core.async');
goog.scope(function(){
  cljs.core.async.goog$module$goog$array = goog.module.get('goog.array');
});
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__39324 = arguments.length;
switch (G__39324) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async39348 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39348 = (function (f,blockable,meta39349){
this.f = f;
this.blockable = blockable;
this.meta39349 = meta39349;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async39348.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39350,meta39349__$1){
var self__ = this;
var _39350__$1 = this;
return (new cljs.core.async.t_cljs$core$async39348(self__.f,self__.blockable,meta39349__$1));
}));

(cljs.core.async.t_cljs$core$async39348.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39350){
var self__ = this;
var _39350__$1 = this;
return self__.meta39349;
}));

(cljs.core.async.t_cljs$core$async39348.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39348.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async39348.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async39348.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async39348.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta39349","meta39349",-304772925,null)], null);
}));

(cljs.core.async.t_cljs$core$async39348.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async39348.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39348");

(cljs.core.async.t_cljs$core$async39348.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async39348");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async39348.
 */
cljs.core.async.__GT_t_cljs$core$async39348 = (function cljs$core$async$__GT_t_cljs$core$async39348(f__$1,blockable__$1,meta39349){
return (new cljs.core.async.t_cljs$core$async39348(f__$1,blockable__$1,meta39349));
});

}

return (new cljs.core.async.t_cljs$core$async39348(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__39366 = arguments.length;
switch (G__39366) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
}));

(cljs.core.async.chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__39376 = arguments.length;
switch (G__39376) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__39386 = arguments.length;
switch (G__39386) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_43007 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_43007) : fn1.call(null,val_43007));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_43007) : fn1.call(null,val_43007));
}));
}
} else {
}

return null;
}));

(cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3);

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__39395 = arguments.length;
switch (G__39395) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5802__auto__)){
var ret = temp__5802__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5802__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5802__auto__)){
var retb = temp__5802__auto__;
var ret = cljs.core.deref(retb);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__5636__auto___43012 = n;
var x_43013 = (0);
while(true){
if((x_43013 < n__5636__auto___43012)){
(a[x_43013] = x_43013);

var G__43014 = (x_43013 + (1));
x_43013 = G__43014;
continue;
} else {
}
break;
}

cljs.core.async.goog$module$goog$array.shuffle(a);

return a;
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async39405 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39405 = (function (flag,meta39406){
this.flag = flag;
this.meta39406 = meta39406;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async39405.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39407,meta39406__$1){
var self__ = this;
var _39407__$1 = this;
return (new cljs.core.async.t_cljs$core$async39405(self__.flag,meta39406__$1));
}));

(cljs.core.async.t_cljs$core$async39405.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39407){
var self__ = this;
var _39407__$1 = this;
return self__.meta39406;
}));

(cljs.core.async.t_cljs$core$async39405.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39405.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async39405.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async39405.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async39405.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta39406","meta39406",1348850951,null)], null);
}));

(cljs.core.async.t_cljs$core$async39405.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async39405.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39405");

(cljs.core.async.t_cljs$core$async39405.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async39405");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async39405.
 */
cljs.core.async.__GT_t_cljs$core$async39405 = (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async39405(flag__$1,meta39406){
return (new cljs.core.async.t_cljs$core$async39405(flag__$1,meta39406));
});

}

return (new cljs.core.async.t_cljs$core$async39405(flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async39416 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39416 = (function (flag,cb,meta39417){
this.flag = flag;
this.cb = cb;
this.meta39417 = meta39417;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async39416.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39418,meta39417__$1){
var self__ = this;
var _39418__$1 = this;
return (new cljs.core.async.t_cljs$core$async39416(self__.flag,self__.cb,meta39417__$1));
}));

(cljs.core.async.t_cljs$core$async39416.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39418){
var self__ = this;
var _39418__$1 = this;
return self__.meta39417;
}));

(cljs.core.async.t_cljs$core$async39416.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39416.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async39416.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async39416.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async39416.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta39417","meta39417",1184079831,null)], null);
}));

(cljs.core.async.t_cljs$core$async39416.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async39416.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39416");

(cljs.core.async.t_cljs$core$async39416.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async39416");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async39416.
 */
cljs.core.async.__GT_t_cljs$core$async39416 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async39416(flag__$1,cb__$1,meta39417){
return (new cljs.core.async.t_cljs$core$async39416(flag__$1,cb__$1,meta39417));
});

}

return (new cljs.core.async.t_cljs$core$async39416(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
if((cljs.core.count(ports) > (0))){
} else {
throw (new Error(["Assert failed: ","alts must have at least one channel operation","\n","(pos? (count ports))"].join('')));
}

var flag = cljs.core.async.alt_flag();
var n = cljs.core.count(ports);
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__39425_SHARP_){
var G__39435 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__39425_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__39435) : fret.call(null,G__39435));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__39426_SHARP_){
var G__39436 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__39426_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__39436) : fret.call(null,G__39436));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__5045__auto__ = wport;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return port;
}
})()], null));
} else {
var G__43027 = (i + (1));
i = G__43027;
continue;
}
} else {
return null;
}
break;
}
})();
var or__5045__auto__ = ret;
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5804__auto__ = (function (){var and__5043__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);
if(cljs.core.truth_(and__5043__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else {
return and__5043__auto__;
}
})();
if(cljs.core.truth_(temp__5804__auto__)){
var got = temp__5804__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___43028 = arguments.length;
var i__5770__auto___43029 = (0);
while(true){
if((i__5770__auto___43029 < len__5769__auto___43028)){
args__5775__auto__.push((arguments[i__5770__auto___43029]));

var G__43030 = (i__5770__auto___43029 + (1));
i__5770__auto___43029 = G__43030;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((1) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5776__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__39448){
var map__39449 = p__39448;
var map__39449__$1 = cljs.core.__destructure_map(map__39449);
var opts = map__39449__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq39443){
var G__39445 = cljs.core.first(seq39443);
var seq39443__$1 = cljs.core.next(seq39443);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__39445,seq39443__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__39463 = arguments.length;
switch (G__39463) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__39218__auto___43037 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_39505){
var state_val_39506 = (state_39505[(1)]);
if((state_val_39506 === (7))){
var inst_39500 = (state_39505[(2)]);
var state_39505__$1 = state_39505;
var statearr_39570_43038 = state_39505__$1;
(statearr_39570_43038[(2)] = inst_39500);

(statearr_39570_43038[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39506 === (1))){
var state_39505__$1 = state_39505;
var statearr_39577_43039 = state_39505__$1;
(statearr_39577_43039[(2)] = null);

(statearr_39577_43039[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39506 === (4))){
var inst_39476 = (state_39505[(7)]);
var inst_39476__$1 = (state_39505[(2)]);
var inst_39482 = (inst_39476__$1 == null);
var state_39505__$1 = (function (){var statearr_39582 = state_39505;
(statearr_39582[(7)] = inst_39476__$1);

return statearr_39582;
})();
if(cljs.core.truth_(inst_39482)){
var statearr_39585_43043 = state_39505__$1;
(statearr_39585_43043[(1)] = (5));

} else {
var statearr_39586_43044 = state_39505__$1;
(statearr_39586_43044[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39506 === (13))){
var state_39505__$1 = state_39505;
var statearr_39593_43045 = state_39505__$1;
(statearr_39593_43045[(2)] = null);

(statearr_39593_43045[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39506 === (6))){
var inst_39476 = (state_39505[(7)]);
var state_39505__$1 = state_39505;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39505__$1,(11),to,inst_39476);
} else {
if((state_val_39506 === (3))){
var inst_39502 = (state_39505[(2)]);
var state_39505__$1 = state_39505;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39505__$1,inst_39502);
} else {
if((state_val_39506 === (12))){
var state_39505__$1 = state_39505;
var statearr_39599_43046 = state_39505__$1;
(statearr_39599_43046[(2)] = null);

(statearr_39599_43046[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39506 === (2))){
var state_39505__$1 = state_39505;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39505__$1,(4),from);
} else {
if((state_val_39506 === (11))){
var inst_39492 = (state_39505[(2)]);
var state_39505__$1 = state_39505;
if(cljs.core.truth_(inst_39492)){
var statearr_39603_43052 = state_39505__$1;
(statearr_39603_43052[(1)] = (12));

} else {
var statearr_39605_43053 = state_39505__$1;
(statearr_39605_43053[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39506 === (9))){
var state_39505__$1 = state_39505;
var statearr_39609_43054 = state_39505__$1;
(statearr_39609_43054[(2)] = null);

(statearr_39609_43054[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39506 === (5))){
var state_39505__$1 = state_39505;
if(cljs.core.truth_(close_QMARK_)){
var statearr_39611_43055 = state_39505__$1;
(statearr_39611_43055[(1)] = (8));

} else {
var statearr_39613_43056 = state_39505__$1;
(statearr_39613_43056[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39506 === (14))){
var inst_39498 = (state_39505[(2)]);
var state_39505__$1 = state_39505;
var statearr_39644_43059 = state_39505__$1;
(statearr_39644_43059[(2)] = inst_39498);

(statearr_39644_43059[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39506 === (10))){
var inst_39489 = (state_39505[(2)]);
var state_39505__$1 = state_39505;
var statearr_39645_43061 = state_39505__$1;
(statearr_39645_43061[(2)] = inst_39489);

(statearr_39645_43061[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39506 === (8))){
var inst_39486 = cljs.core.async.close_BANG_(to);
var state_39505__$1 = state_39505;
var statearr_39647_43062 = state_39505__$1;
(statearr_39647_43062[(2)] = inst_39486);

(statearr_39647_43062[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38811__auto__ = null;
var cljs$core$async$state_machine__38811__auto____0 = (function (){
var statearr_39653 = [null,null,null,null,null,null,null,null];
(statearr_39653[(0)] = cljs$core$async$state_machine__38811__auto__);

(statearr_39653[(1)] = (1));

return statearr_39653;
});
var cljs$core$async$state_machine__38811__auto____1 = (function (state_39505){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_39505);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e39658){var ex__38814__auto__ = e39658;
var statearr_39659_43069 = state_39505;
(statearr_39659_43069[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_39505[(4)]))){
var statearr_39660_43070 = state_39505;
(statearr_39660_43070[(1)] = cljs.core.first((state_39505[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43071 = state_39505;
state_39505 = G__43071;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$state_machine__38811__auto__ = function(state_39505){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38811__auto____1.call(this,state_39505);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38811__auto____0;
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38811__auto____1;
return cljs$core$async$state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_39661 = f__39219__auto__();
(statearr_39661[(6)] = c__39218__auto___43037);

return statearr_39661;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process__$1 = (function (p__39676){
var vec__39677 = p__39676;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39677,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39677,(1),null);
var job = vec__39677;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__39218__auto___43072 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_39685){
var state_val_39687 = (state_39685[(1)]);
if((state_val_39687 === (1))){
var state_39685__$1 = state_39685;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39685__$1,(2),res,v);
} else {
if((state_val_39687 === (2))){
var inst_39682 = (state_39685[(2)]);
var inst_39683 = cljs.core.async.close_BANG_(res);
var state_39685__$1 = (function (){var statearr_39697 = state_39685;
(statearr_39697[(7)] = inst_39682);

return statearr_39697;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_39685__$1,inst_39683);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0 = (function (){
var statearr_39699 = [null,null,null,null,null,null,null,null];
(statearr_39699[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__);

(statearr_39699[(1)] = (1));

return statearr_39699;
});
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1 = (function (state_39685){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_39685);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e39700){var ex__38814__auto__ = e39700;
var statearr_39701_43075 = state_39685;
(statearr_39701_43075[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_39685[(4)]))){
var statearr_39702_43076 = state_39685;
(statearr_39702_43076[(1)] = cljs.core.first((state_39685[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43077 = state_39685;
state_39685 = G__43077;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__ = function(state_39685){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1.call(this,state_39685);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_39704 = f__39219__auto__();
(statearr_39704[(6)] = c__39218__auto___43072);

return statearr_39704;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__39709){
var vec__39711 = p__39709;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39711,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39711,(1),null);
var job = vec__39711;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var n__5636__auto___43079 = n;
var __43080 = (0);
while(true){
if((__43080 < n__5636__auto___43079)){
var G__39719_43081 = type;
var G__39719_43082__$1 = (((G__39719_43081 instanceof cljs.core.Keyword))?G__39719_43081.fqn:null);
switch (G__39719_43082__$1) {
case "compute":
var c__39218__auto___43084 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__43080,c__39218__auto___43084,G__39719_43081,G__39719_43082__$1,n__5636__auto___43079,jobs,results,process__$1,async){
return (function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = ((function (__43080,c__39218__auto___43084,G__39719_43081,G__39719_43082__$1,n__5636__auto___43079,jobs,results,process__$1,async){
return (function (state_39732){
var state_val_39733 = (state_39732[(1)]);
if((state_val_39733 === (1))){
var state_39732__$1 = state_39732;
var statearr_39737_43085 = state_39732__$1;
(statearr_39737_43085[(2)] = null);

(statearr_39737_43085[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39733 === (2))){
var state_39732__$1 = state_39732;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39732__$1,(4),jobs);
} else {
if((state_val_39733 === (3))){
var inst_39730 = (state_39732[(2)]);
var state_39732__$1 = state_39732;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39732__$1,inst_39730);
} else {
if((state_val_39733 === (4))){
var inst_39722 = (state_39732[(2)]);
var inst_39723 = process__$1(inst_39722);
var state_39732__$1 = state_39732;
if(cljs.core.truth_(inst_39723)){
var statearr_39740_43086 = state_39732__$1;
(statearr_39740_43086[(1)] = (5));

} else {
var statearr_39746_43087 = state_39732__$1;
(statearr_39746_43087[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39733 === (5))){
var state_39732__$1 = state_39732;
var statearr_39750_43088 = state_39732__$1;
(statearr_39750_43088[(2)] = null);

(statearr_39750_43088[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39733 === (6))){
var state_39732__$1 = state_39732;
var statearr_39751_43091 = state_39732__$1;
(statearr_39751_43091[(2)] = null);

(statearr_39751_43091[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39733 === (7))){
var inst_39728 = (state_39732[(2)]);
var state_39732__$1 = state_39732;
var statearr_39752_43092 = state_39732__$1;
(statearr_39752_43092[(2)] = inst_39728);

(statearr_39752_43092[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__43080,c__39218__auto___43084,G__39719_43081,G__39719_43082__$1,n__5636__auto___43079,jobs,results,process__$1,async))
;
return ((function (__43080,switch__38810__auto__,c__39218__auto___43084,G__39719_43081,G__39719_43082__$1,n__5636__auto___43079,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0 = (function (){
var statearr_39754 = [null,null,null,null,null,null,null];
(statearr_39754[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__);

(statearr_39754[(1)] = (1));

return statearr_39754;
});
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1 = (function (state_39732){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_39732);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e39755){var ex__38814__auto__ = e39755;
var statearr_39756_43095 = state_39732;
(statearr_39756_43095[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_39732[(4)]))){
var statearr_39757_43096 = state_39732;
(statearr_39757_43096[(1)] = cljs.core.first((state_39732[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43103 = state_39732;
state_39732 = G__43103;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__ = function(state_39732){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1.call(this,state_39732);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__;
})()
;})(__43080,switch__38810__auto__,c__39218__auto___43084,G__39719_43081,G__39719_43082__$1,n__5636__auto___43079,jobs,results,process__$1,async))
})();
var state__39220__auto__ = (function (){var statearr_39760 = f__39219__auto__();
(statearr_39760[(6)] = c__39218__auto___43084);

return statearr_39760;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
});})(__43080,c__39218__auto___43084,G__39719_43081,G__39719_43082__$1,n__5636__auto___43079,jobs,results,process__$1,async))
);


break;
case "async":
var c__39218__auto___43107 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__43080,c__39218__auto___43107,G__39719_43081,G__39719_43082__$1,n__5636__auto___43079,jobs,results,process__$1,async){
return (function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = ((function (__43080,c__39218__auto___43107,G__39719_43081,G__39719_43082__$1,n__5636__auto___43079,jobs,results,process__$1,async){
return (function (state_39779){
var state_val_39780 = (state_39779[(1)]);
if((state_val_39780 === (1))){
var state_39779__$1 = state_39779;
var statearr_39781_43108 = state_39779__$1;
(statearr_39781_43108[(2)] = null);

(statearr_39781_43108[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39780 === (2))){
var state_39779__$1 = state_39779;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39779__$1,(4),jobs);
} else {
if((state_val_39780 === (3))){
var inst_39777 = (state_39779[(2)]);
var state_39779__$1 = state_39779;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39779__$1,inst_39777);
} else {
if((state_val_39780 === (4))){
var inst_39769 = (state_39779[(2)]);
var inst_39770 = async(inst_39769);
var state_39779__$1 = state_39779;
if(cljs.core.truth_(inst_39770)){
var statearr_39782_43111 = state_39779__$1;
(statearr_39782_43111[(1)] = (5));

} else {
var statearr_39783_43112 = state_39779__$1;
(statearr_39783_43112[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39780 === (5))){
var state_39779__$1 = state_39779;
var statearr_39785_43113 = state_39779__$1;
(statearr_39785_43113[(2)] = null);

(statearr_39785_43113[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39780 === (6))){
var state_39779__$1 = state_39779;
var statearr_39786_43114 = state_39779__$1;
(statearr_39786_43114[(2)] = null);

(statearr_39786_43114[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39780 === (7))){
var inst_39775 = (state_39779[(2)]);
var state_39779__$1 = state_39779;
var statearr_39787_43116 = state_39779__$1;
(statearr_39787_43116[(2)] = inst_39775);

(statearr_39787_43116[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__43080,c__39218__auto___43107,G__39719_43081,G__39719_43082__$1,n__5636__auto___43079,jobs,results,process__$1,async))
;
return ((function (__43080,switch__38810__auto__,c__39218__auto___43107,G__39719_43081,G__39719_43082__$1,n__5636__auto___43079,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0 = (function (){
var statearr_39792 = [null,null,null,null,null,null,null];
(statearr_39792[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__);

(statearr_39792[(1)] = (1));

return statearr_39792;
});
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1 = (function (state_39779){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_39779);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e39793){var ex__38814__auto__ = e39793;
var statearr_39794_43117 = state_39779;
(statearr_39794_43117[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_39779[(4)]))){
var statearr_39795_43118 = state_39779;
(statearr_39795_43118[(1)] = cljs.core.first((state_39779[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43119 = state_39779;
state_39779 = G__43119;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__ = function(state_39779){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1.call(this,state_39779);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__;
})()
;})(__43080,switch__38810__auto__,c__39218__auto___43107,G__39719_43081,G__39719_43082__$1,n__5636__auto___43079,jobs,results,process__$1,async))
})();
var state__39220__auto__ = (function (){var statearr_39799 = f__39219__auto__();
(statearr_39799[(6)] = c__39218__auto___43107);

return statearr_39799;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
});})(__43080,c__39218__auto___43107,G__39719_43081,G__39719_43082__$1,n__5636__auto___43079,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__39719_43082__$1)].join('')));

}

var G__43120 = (__43080 + (1));
__43080 = G__43120;
continue;
} else {
}
break;
}

var c__39218__auto___43121 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_39828){
var state_val_39829 = (state_39828[(1)]);
if((state_val_39829 === (7))){
var inst_39824 = (state_39828[(2)]);
var state_39828__$1 = state_39828;
var statearr_39832_43124 = state_39828__$1;
(statearr_39832_43124[(2)] = inst_39824);

(statearr_39832_43124[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39829 === (1))){
var state_39828__$1 = state_39828;
var statearr_39833_43125 = state_39828__$1;
(statearr_39833_43125[(2)] = null);

(statearr_39833_43125[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39829 === (4))){
var inst_39805 = (state_39828[(7)]);
var inst_39805__$1 = (state_39828[(2)]);
var inst_39806 = (inst_39805__$1 == null);
var state_39828__$1 = (function (){var statearr_39837 = state_39828;
(statearr_39837[(7)] = inst_39805__$1);

return statearr_39837;
})();
if(cljs.core.truth_(inst_39806)){
var statearr_39838_43126 = state_39828__$1;
(statearr_39838_43126[(1)] = (5));

} else {
var statearr_39839_43127 = state_39828__$1;
(statearr_39839_43127[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39829 === (6))){
var inst_39810 = (state_39828[(8)]);
var inst_39805 = (state_39828[(7)]);
var inst_39810__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_39815 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_39816 = [inst_39805,inst_39810__$1];
var inst_39817 = (new cljs.core.PersistentVector(null,2,(5),inst_39815,inst_39816,null));
var state_39828__$1 = (function (){var statearr_39840 = state_39828;
(statearr_39840[(8)] = inst_39810__$1);

return statearr_39840;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39828__$1,(8),jobs,inst_39817);
} else {
if((state_val_39829 === (3))){
var inst_39826 = (state_39828[(2)]);
var state_39828__$1 = state_39828;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39828__$1,inst_39826);
} else {
if((state_val_39829 === (2))){
var state_39828__$1 = state_39828;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39828__$1,(4),from);
} else {
if((state_val_39829 === (9))){
var inst_39821 = (state_39828[(2)]);
var state_39828__$1 = (function (){var statearr_39844 = state_39828;
(statearr_39844[(9)] = inst_39821);

return statearr_39844;
})();
var statearr_39845_43128 = state_39828__$1;
(statearr_39845_43128[(2)] = null);

(statearr_39845_43128[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39829 === (5))){
var inst_39808 = cljs.core.async.close_BANG_(jobs);
var state_39828__$1 = state_39828;
var statearr_39846_43134 = state_39828__$1;
(statearr_39846_43134[(2)] = inst_39808);

(statearr_39846_43134[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39829 === (8))){
var inst_39810 = (state_39828[(8)]);
var inst_39819 = (state_39828[(2)]);
var state_39828__$1 = (function (){var statearr_39848 = state_39828;
(statearr_39848[(10)] = inst_39819);

return statearr_39848;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39828__$1,(9),results,inst_39810);
} else {
return null;
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0 = (function (){
var statearr_39853 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_39853[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__);

(statearr_39853[(1)] = (1));

return statearr_39853;
});
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1 = (function (state_39828){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_39828);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e39854){var ex__38814__auto__ = e39854;
var statearr_39855_43136 = state_39828;
(statearr_39855_43136[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_39828[(4)]))){
var statearr_39857_43137 = state_39828;
(statearr_39857_43137[(1)] = cljs.core.first((state_39828[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43138 = state_39828;
state_39828 = G__43138;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__ = function(state_39828){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1.call(this,state_39828);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_39860 = f__39219__auto__();
(statearr_39860[(6)] = c__39218__auto___43121);

return statearr_39860;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));


var c__39218__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_39929){
var state_val_39931 = (state_39929[(1)]);
if((state_val_39931 === (7))){
var inst_39921 = (state_39929[(2)]);
var state_39929__$1 = state_39929;
var statearr_39938_43139 = state_39929__$1;
(statearr_39938_43139[(2)] = inst_39921);

(statearr_39938_43139[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (20))){
var state_39929__$1 = state_39929;
var statearr_39941_43140 = state_39929__$1;
(statearr_39941_43140[(2)] = null);

(statearr_39941_43140[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (1))){
var state_39929__$1 = state_39929;
var statearr_39943_43141 = state_39929__$1;
(statearr_39943_43141[(2)] = null);

(statearr_39943_43141[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (4))){
var inst_39865 = (state_39929[(7)]);
var inst_39865__$1 = (state_39929[(2)]);
var inst_39866 = (inst_39865__$1 == null);
var state_39929__$1 = (function (){var statearr_39950 = state_39929;
(statearr_39950[(7)] = inst_39865__$1);

return statearr_39950;
})();
if(cljs.core.truth_(inst_39866)){
var statearr_39952_43143 = state_39929__$1;
(statearr_39952_43143[(1)] = (5));

} else {
var statearr_39954_43145 = state_39929__$1;
(statearr_39954_43145[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (15))){
var inst_39902 = (state_39929[(8)]);
var state_39929__$1 = state_39929;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39929__$1,(18),to,inst_39902);
} else {
if((state_val_39931 === (21))){
var inst_39916 = (state_39929[(2)]);
var state_39929__$1 = state_39929;
var statearr_39957_43146 = state_39929__$1;
(statearr_39957_43146[(2)] = inst_39916);

(statearr_39957_43146[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (13))){
var inst_39918 = (state_39929[(2)]);
var state_39929__$1 = (function (){var statearr_39959 = state_39929;
(statearr_39959[(9)] = inst_39918);

return statearr_39959;
})();
var statearr_39960_43148 = state_39929__$1;
(statearr_39960_43148[(2)] = null);

(statearr_39960_43148[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (6))){
var inst_39865 = (state_39929[(7)]);
var state_39929__$1 = state_39929;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39929__$1,(11),inst_39865);
} else {
if((state_val_39931 === (17))){
var inst_39911 = (state_39929[(2)]);
var state_39929__$1 = state_39929;
if(cljs.core.truth_(inst_39911)){
var statearr_39962_43151 = state_39929__$1;
(statearr_39962_43151[(1)] = (19));

} else {
var statearr_39963_43152 = state_39929__$1;
(statearr_39963_43152[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (3))){
var inst_39923 = (state_39929[(2)]);
var state_39929__$1 = state_39929;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39929__$1,inst_39923);
} else {
if((state_val_39931 === (12))){
var inst_39882 = (state_39929[(10)]);
var state_39929__$1 = state_39929;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39929__$1,(14),inst_39882);
} else {
if((state_val_39931 === (2))){
var state_39929__$1 = state_39929;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39929__$1,(4),results);
} else {
if((state_val_39931 === (19))){
var state_39929__$1 = state_39929;
var statearr_39971_43153 = state_39929__$1;
(statearr_39971_43153[(2)] = null);

(statearr_39971_43153[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (11))){
var inst_39882 = (state_39929[(2)]);
var state_39929__$1 = (function (){var statearr_39972 = state_39929;
(statearr_39972[(10)] = inst_39882);

return statearr_39972;
})();
var statearr_39976_43154 = state_39929__$1;
(statearr_39976_43154[(2)] = null);

(statearr_39976_43154[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (9))){
var state_39929__$1 = state_39929;
var statearr_39979_43155 = state_39929__$1;
(statearr_39979_43155[(2)] = null);

(statearr_39979_43155[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (5))){
var state_39929__$1 = state_39929;
if(cljs.core.truth_(close_QMARK_)){
var statearr_40015_43158 = state_39929__$1;
(statearr_40015_43158[(1)] = (8));

} else {
var statearr_40016_43159 = state_39929__$1;
(statearr_40016_43159[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (14))){
var inst_39905 = (state_39929[(11)]);
var inst_39902 = (state_39929[(8)]);
var inst_39902__$1 = (state_39929[(2)]);
var inst_39904 = (inst_39902__$1 == null);
var inst_39905__$1 = cljs.core.not(inst_39904);
var state_39929__$1 = (function (){var statearr_40017 = state_39929;
(statearr_40017[(11)] = inst_39905__$1);

(statearr_40017[(8)] = inst_39902__$1);

return statearr_40017;
})();
if(inst_39905__$1){
var statearr_40024_43161 = state_39929__$1;
(statearr_40024_43161[(1)] = (15));

} else {
var statearr_40025_43162 = state_39929__$1;
(statearr_40025_43162[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (16))){
var inst_39905 = (state_39929[(11)]);
var state_39929__$1 = state_39929;
var statearr_40028_43170 = state_39929__$1;
(statearr_40028_43170[(2)] = inst_39905);

(statearr_40028_43170[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (10))){
var inst_39877 = (state_39929[(2)]);
var state_39929__$1 = state_39929;
var statearr_40029_43172 = state_39929__$1;
(statearr_40029_43172[(2)] = inst_39877);

(statearr_40029_43172[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (18))){
var inst_39908 = (state_39929[(2)]);
var state_39929__$1 = state_39929;
var statearr_40030_43173 = state_39929__$1;
(statearr_40030_43173[(2)] = inst_39908);

(statearr_40030_43173[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39931 === (8))){
var inst_39869 = cljs.core.async.close_BANG_(to);
var state_39929__$1 = state_39929;
var statearr_40031_43174 = state_39929__$1;
(statearr_40031_43174[(2)] = inst_39869);

(statearr_40031_43174[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0 = (function (){
var statearr_40042 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40042[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__);

(statearr_40042[(1)] = (1));

return statearr_40042;
});
var cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1 = (function (state_39929){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_39929);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e40043){var ex__38814__auto__ = e40043;
var statearr_40044_43178 = state_39929;
(statearr_40044_43178[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_39929[(4)]))){
var statearr_40045_43182 = state_39929;
(statearr_40045_43182[(1)] = cljs.core.first((state_39929[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43183 = state_39929;
state_39929 = G__43183;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__ = function(state_39929){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1.call(this,state_39929);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__38811__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_40048 = f__39219__auto__();
(statearr_40048[(6)] = c__39218__auto__);

return statearr_40048;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));

return c__39218__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). The
 *   presumption is that af will return immediately, having launched some
 *   asynchronous operation whose completion/callback will put results on
 *   the channel, then close! it. Outputs will be returned in order
 *   relative to the inputs. By default, the to channel will be closed
 *   when the from channel closes, but can be determined by the close?
 *   parameter. Will stop consuming the from channel if the to channel
 *   closes. See also pipeline, pipeline-blocking.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__40063 = arguments.length;
switch (G__40063) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
}));

(cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5);

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__40077 = arguments.length;
switch (G__40077) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
}));

(cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6);

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__40111 = arguments.length;
switch (G__40111) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__39218__auto___43199 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_40153){
var state_val_40154 = (state_40153[(1)]);
if((state_val_40154 === (7))){
var inst_40149 = (state_40153[(2)]);
var state_40153__$1 = state_40153;
var statearr_40157_43200 = state_40153__$1;
(statearr_40157_43200[(2)] = inst_40149);

(statearr_40157_43200[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40154 === (1))){
var state_40153__$1 = state_40153;
var statearr_40160_43203 = state_40153__$1;
(statearr_40160_43203[(2)] = null);

(statearr_40160_43203[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40154 === (4))){
var inst_40127 = (state_40153[(7)]);
var inst_40127__$1 = (state_40153[(2)]);
var inst_40128 = (inst_40127__$1 == null);
var state_40153__$1 = (function (){var statearr_40161 = state_40153;
(statearr_40161[(7)] = inst_40127__$1);

return statearr_40161;
})();
if(cljs.core.truth_(inst_40128)){
var statearr_40162_43205 = state_40153__$1;
(statearr_40162_43205[(1)] = (5));

} else {
var statearr_40163_43206 = state_40153__$1;
(statearr_40163_43206[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40154 === (13))){
var state_40153__$1 = state_40153;
var statearr_40164_43207 = state_40153__$1;
(statearr_40164_43207[(2)] = null);

(statearr_40164_43207[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40154 === (6))){
var inst_40127 = (state_40153[(7)]);
var inst_40136 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_40127) : p.call(null,inst_40127));
var state_40153__$1 = state_40153;
if(cljs.core.truth_(inst_40136)){
var statearr_40165_43214 = state_40153__$1;
(statearr_40165_43214[(1)] = (9));

} else {
var statearr_40166_43217 = state_40153__$1;
(statearr_40166_43217[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40154 === (3))){
var inst_40151 = (state_40153[(2)]);
var state_40153__$1 = state_40153;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40153__$1,inst_40151);
} else {
if((state_val_40154 === (12))){
var state_40153__$1 = state_40153;
var statearr_40167_43218 = state_40153__$1;
(statearr_40167_43218[(2)] = null);

(statearr_40167_43218[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40154 === (2))){
var state_40153__$1 = state_40153;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40153__$1,(4),ch);
} else {
if((state_val_40154 === (11))){
var inst_40127 = (state_40153[(7)]);
var inst_40140 = (state_40153[(2)]);
var state_40153__$1 = state_40153;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_40153__$1,(8),inst_40140,inst_40127);
} else {
if((state_val_40154 === (9))){
var state_40153__$1 = state_40153;
var statearr_40169_43225 = state_40153__$1;
(statearr_40169_43225[(2)] = tc);

(statearr_40169_43225[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40154 === (5))){
var inst_40130 = cljs.core.async.close_BANG_(tc);
var inst_40131 = cljs.core.async.close_BANG_(fc);
var state_40153__$1 = (function (){var statearr_40171 = state_40153;
(statearr_40171[(8)] = inst_40130);

return statearr_40171;
})();
var statearr_40173_43226 = state_40153__$1;
(statearr_40173_43226[(2)] = inst_40131);

(statearr_40173_43226[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40154 === (14))){
var inst_40147 = (state_40153[(2)]);
var state_40153__$1 = state_40153;
var statearr_40174_43230 = state_40153__$1;
(statearr_40174_43230[(2)] = inst_40147);

(statearr_40174_43230[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40154 === (10))){
var state_40153__$1 = state_40153;
var statearr_40178_43233 = state_40153__$1;
(statearr_40178_43233[(2)] = fc);

(statearr_40178_43233[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40154 === (8))){
var inst_40142 = (state_40153[(2)]);
var state_40153__$1 = state_40153;
if(cljs.core.truth_(inst_40142)){
var statearr_40179_43234 = state_40153__$1;
(statearr_40179_43234[(1)] = (12));

} else {
var statearr_40180_43235 = state_40153__$1;
(statearr_40180_43235[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38811__auto__ = null;
var cljs$core$async$state_machine__38811__auto____0 = (function (){
var statearr_40183 = [null,null,null,null,null,null,null,null,null];
(statearr_40183[(0)] = cljs$core$async$state_machine__38811__auto__);

(statearr_40183[(1)] = (1));

return statearr_40183;
});
var cljs$core$async$state_machine__38811__auto____1 = (function (state_40153){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_40153);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e40185){var ex__38814__auto__ = e40185;
var statearr_40187_43237 = state_40153;
(statearr_40187_43237[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_40153[(4)]))){
var statearr_40189_43242 = state_40153;
(statearr_40189_43242[(1)] = cljs.core.first((state_40153[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43243 = state_40153;
state_40153 = G__43243;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$state_machine__38811__auto__ = function(state_40153){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38811__auto____1.call(this,state_40153);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38811__auto____0;
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38811__auto____1;
return cljs$core$async$state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_40190 = f__39219__auto__();
(statearr_40190[(6)] = c__39218__auto___43199);

return statearr_40190;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
}));

(cljs.core.async.split.cljs$lang$maxFixedArity = 4);

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__39218__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_40221){
var state_val_40222 = (state_40221[(1)]);
if((state_val_40222 === (7))){
var inst_40217 = (state_40221[(2)]);
var state_40221__$1 = state_40221;
var statearr_40226_43247 = state_40221__$1;
(statearr_40226_43247[(2)] = inst_40217);

(statearr_40226_43247[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40222 === (1))){
var inst_40198 = init;
var inst_40199 = inst_40198;
var state_40221__$1 = (function (){var statearr_40227 = state_40221;
(statearr_40227[(7)] = inst_40199);

return statearr_40227;
})();
var statearr_40228_43248 = state_40221__$1;
(statearr_40228_43248[(2)] = null);

(statearr_40228_43248[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40222 === (4))){
var inst_40202 = (state_40221[(8)]);
var inst_40202__$1 = (state_40221[(2)]);
var inst_40204 = (inst_40202__$1 == null);
var state_40221__$1 = (function (){var statearr_40231 = state_40221;
(statearr_40231[(8)] = inst_40202__$1);

return statearr_40231;
})();
if(cljs.core.truth_(inst_40204)){
var statearr_40233_43249 = state_40221__$1;
(statearr_40233_43249[(1)] = (5));

} else {
var statearr_40234_43250 = state_40221__$1;
(statearr_40234_43250[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40222 === (6))){
var inst_40199 = (state_40221[(7)]);
var inst_40208 = (state_40221[(9)]);
var inst_40202 = (state_40221[(8)]);
var inst_40208__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_40199,inst_40202) : f.call(null,inst_40199,inst_40202));
var inst_40209 = cljs.core.reduced_QMARK_(inst_40208__$1);
var state_40221__$1 = (function (){var statearr_40236 = state_40221;
(statearr_40236[(9)] = inst_40208__$1);

return statearr_40236;
})();
if(inst_40209){
var statearr_40237_43275 = state_40221__$1;
(statearr_40237_43275[(1)] = (8));

} else {
var statearr_40238_43276 = state_40221__$1;
(statearr_40238_43276[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40222 === (3))){
var inst_40219 = (state_40221[(2)]);
var state_40221__$1 = state_40221;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40221__$1,inst_40219);
} else {
if((state_val_40222 === (2))){
var state_40221__$1 = state_40221;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40221__$1,(4),ch);
} else {
if((state_val_40222 === (9))){
var inst_40208 = (state_40221[(9)]);
var inst_40199 = inst_40208;
var state_40221__$1 = (function (){var statearr_40239 = state_40221;
(statearr_40239[(7)] = inst_40199);

return statearr_40239;
})();
var statearr_40241_43277 = state_40221__$1;
(statearr_40241_43277[(2)] = null);

(statearr_40241_43277[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40222 === (5))){
var inst_40199 = (state_40221[(7)]);
var state_40221__$1 = state_40221;
var statearr_40244_43278 = state_40221__$1;
(statearr_40244_43278[(2)] = inst_40199);

(statearr_40244_43278[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40222 === (10))){
var inst_40215 = (state_40221[(2)]);
var state_40221__$1 = state_40221;
var statearr_40245_43279 = state_40221__$1;
(statearr_40245_43279[(2)] = inst_40215);

(statearr_40245_43279[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40222 === (8))){
var inst_40208 = (state_40221[(9)]);
var inst_40211 = cljs.core.deref(inst_40208);
var state_40221__$1 = state_40221;
var statearr_40247_43280 = state_40221__$1;
(statearr_40247_43280[(2)] = inst_40211);

(statearr_40247_43280[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$reduce_$_state_machine__38811__auto__ = null;
var cljs$core$async$reduce_$_state_machine__38811__auto____0 = (function (){
var statearr_40251 = [null,null,null,null,null,null,null,null,null,null];
(statearr_40251[(0)] = cljs$core$async$reduce_$_state_machine__38811__auto__);

(statearr_40251[(1)] = (1));

return statearr_40251;
});
var cljs$core$async$reduce_$_state_machine__38811__auto____1 = (function (state_40221){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_40221);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e40252){var ex__38814__auto__ = e40252;
var statearr_40253_43282 = state_40221;
(statearr_40253_43282[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_40221[(4)]))){
var statearr_40254_43286 = state_40221;
(statearr_40254_43286[(1)] = cljs.core.first((state_40221[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43287 = state_40221;
state_40221 = G__43287;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__38811__auto__ = function(state_40221){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__38811__auto____1.call(this,state_40221);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__38811__auto____0;
cljs$core$async$reduce_$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__38811__auto____1;
return cljs$core$async$reduce_$_state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_40255 = f__39219__auto__();
(statearr_40255[(6)] = c__39218__auto__);

return statearr_40255;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));

return c__39218__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__39218__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_40268){
var state_val_40269 = (state_40268[(1)]);
if((state_val_40269 === (1))){
var inst_40260 = cljs.core.async.reduce(f__$1,init,ch);
var state_40268__$1 = state_40268;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40268__$1,(2),inst_40260);
} else {
if((state_val_40269 === (2))){
var inst_40262 = (state_40268[(2)]);
var inst_40266 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_40262) : f__$1.call(null,inst_40262));
var state_40268__$1 = state_40268;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40268__$1,inst_40266);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__38811__auto__ = null;
var cljs$core$async$transduce_$_state_machine__38811__auto____0 = (function (){
var statearr_40278 = [null,null,null,null,null,null,null];
(statearr_40278[(0)] = cljs$core$async$transduce_$_state_machine__38811__auto__);

(statearr_40278[(1)] = (1));

return statearr_40278;
});
var cljs$core$async$transduce_$_state_machine__38811__auto____1 = (function (state_40268){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_40268);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e40279){var ex__38814__auto__ = e40279;
var statearr_40280_43295 = state_40268;
(statearr_40280_43295[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_40268[(4)]))){
var statearr_40281_43296 = state_40268;
(statearr_40281_43296[(1)] = cljs.core.first((state_40268[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43299 = state_40268;
state_40268 = G__43299;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__38811__auto__ = function(state_40268){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__38811__auto____1.call(this,state_40268);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__38811__auto____0;
cljs$core$async$transduce_$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__38811__auto____1;
return cljs$core$async$transduce_$_state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_40283 = f__39219__auto__();
(statearr_40283[(6)] = c__39218__auto__);

return statearr_40283;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));

return c__39218__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan_BANG_ = (function cljs$core$async$onto_chan_BANG_(var_args){
var G__40288 = arguments.length;
switch (G__40288) {
case 2:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__39218__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_40316){
var state_val_40317 = (state_40316[(1)]);
if((state_val_40317 === (7))){
var inst_40298 = (state_40316[(2)]);
var state_40316__$1 = state_40316;
var statearr_40322_43304 = state_40316__$1;
(statearr_40322_43304[(2)] = inst_40298);

(statearr_40322_43304[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40317 === (1))){
var inst_40292 = cljs.core.seq(coll);
var inst_40293 = inst_40292;
var state_40316__$1 = (function (){var statearr_40323 = state_40316;
(statearr_40323[(7)] = inst_40293);

return statearr_40323;
})();
var statearr_40324_43305 = state_40316__$1;
(statearr_40324_43305[(2)] = null);

(statearr_40324_43305[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40317 === (4))){
var inst_40293 = (state_40316[(7)]);
var inst_40296 = cljs.core.first(inst_40293);
var state_40316__$1 = state_40316;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_40316__$1,(7),ch,inst_40296);
} else {
if((state_val_40317 === (13))){
var inst_40310 = (state_40316[(2)]);
var state_40316__$1 = state_40316;
var statearr_40333_43306 = state_40316__$1;
(statearr_40333_43306[(2)] = inst_40310);

(statearr_40333_43306[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40317 === (6))){
var inst_40301 = (state_40316[(2)]);
var state_40316__$1 = state_40316;
if(cljs.core.truth_(inst_40301)){
var statearr_40336_43307 = state_40316__$1;
(statearr_40336_43307[(1)] = (8));

} else {
var statearr_40337_43308 = state_40316__$1;
(statearr_40337_43308[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40317 === (3))){
var inst_40314 = (state_40316[(2)]);
var state_40316__$1 = state_40316;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40316__$1,inst_40314);
} else {
if((state_val_40317 === (12))){
var state_40316__$1 = state_40316;
var statearr_40338_43309 = state_40316__$1;
(statearr_40338_43309[(2)] = null);

(statearr_40338_43309[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40317 === (2))){
var inst_40293 = (state_40316[(7)]);
var state_40316__$1 = state_40316;
if(cljs.core.truth_(inst_40293)){
var statearr_40339_43310 = state_40316__$1;
(statearr_40339_43310[(1)] = (4));

} else {
var statearr_40340_43311 = state_40316__$1;
(statearr_40340_43311[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40317 === (11))){
var inst_40307 = cljs.core.async.close_BANG_(ch);
var state_40316__$1 = state_40316;
var statearr_40341_43313 = state_40316__$1;
(statearr_40341_43313[(2)] = inst_40307);

(statearr_40341_43313[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40317 === (9))){
var state_40316__$1 = state_40316;
if(cljs.core.truth_(close_QMARK_)){
var statearr_40343_43316 = state_40316__$1;
(statearr_40343_43316[(1)] = (11));

} else {
var statearr_40344_43322 = state_40316__$1;
(statearr_40344_43322[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40317 === (5))){
var inst_40293 = (state_40316[(7)]);
var state_40316__$1 = state_40316;
var statearr_40345_43326 = state_40316__$1;
(statearr_40345_43326[(2)] = inst_40293);

(statearr_40345_43326[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40317 === (10))){
var inst_40312 = (state_40316[(2)]);
var state_40316__$1 = state_40316;
var statearr_40346_43337 = state_40316__$1;
(statearr_40346_43337[(2)] = inst_40312);

(statearr_40346_43337[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40317 === (8))){
var inst_40293 = (state_40316[(7)]);
var inst_40303 = cljs.core.next(inst_40293);
var inst_40293__$1 = inst_40303;
var state_40316__$1 = (function (){var statearr_40351 = state_40316;
(statearr_40351[(7)] = inst_40293__$1);

return statearr_40351;
})();
var statearr_40352_43342 = state_40316__$1;
(statearr_40352_43342[(2)] = null);

(statearr_40352_43342[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38811__auto__ = null;
var cljs$core$async$state_machine__38811__auto____0 = (function (){
var statearr_40354 = [null,null,null,null,null,null,null,null];
(statearr_40354[(0)] = cljs$core$async$state_machine__38811__auto__);

(statearr_40354[(1)] = (1));

return statearr_40354;
});
var cljs$core$async$state_machine__38811__auto____1 = (function (state_40316){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_40316);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e40356){var ex__38814__auto__ = e40356;
var statearr_40357_43343 = state_40316;
(statearr_40357_43343[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_40316[(4)]))){
var statearr_40361_43344 = state_40316;
(statearr_40361_43344[(1)] = cljs.core.first((state_40316[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43345 = state_40316;
state_40316 = G__43345;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$state_machine__38811__auto__ = function(state_40316){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38811__auto____1.call(this,state_40316);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38811__auto____0;
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38811__auto____1;
return cljs$core$async$state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_40369 = f__39219__auto__();
(statearr_40369[(6)] = c__39218__auto__);

return statearr_40369;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));

return c__39218__auto__;
}));

(cljs.core.async.onto_chan_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan_BANG_ = (function cljs$core$async$to_chan_BANG_(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});
/**
 * Deprecated - use onto-chan!
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__40375 = arguments.length;
switch (G__40375) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,close_QMARK_);
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - use to-chan!
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
return cljs.core.async.to_chan_BANG_(coll);
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

var cljs$core$async$Mux$muxch_STAR_$dyn_43348 = (function (_){
var x__5393__auto__ = (((_ == null))?null:_);
var m__5394__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5394__auto__.call(null,_));
} else {
var m__5392__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5392__auto__.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_43348(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_43353 = (function (m,ch,close_QMARK_){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5394__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__5392__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5392__auto__.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_43353(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_43358 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_43358(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_43360 = (function (m){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5394__auto__.call(null,m));
} else {
var m__5392__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5392__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_43360(m);
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async40409 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async40409 = (function (ch,cs,meta40410){
this.ch = ch;
this.cs = cs;
this.meta40410 = meta40410;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async40409.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_40411,meta40410__$1){
var self__ = this;
var _40411__$1 = this;
return (new cljs.core.async.t_cljs$core$async40409(self__.ch,self__.cs,meta40410__$1));
}));

(cljs.core.async.t_cljs$core$async40409.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_40411){
var self__ = this;
var _40411__$1 = this;
return self__.meta40410;
}));

(cljs.core.async.t_cljs$core$async40409.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async40409.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async40409.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async40409.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async40409.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async40409.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async40409.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta40410","meta40410",-304196088,null)], null);
}));

(cljs.core.async.t_cljs$core$async40409.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async40409.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async40409");

(cljs.core.async.t_cljs$core$async40409.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async40409");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async40409.
 */
cljs.core.async.__GT_t_cljs$core$async40409 = (function cljs$core$async$mult_$___GT_t_cljs$core$async40409(ch__$1,cs__$1,meta40410){
return (new cljs.core.async.t_cljs$core$async40409(ch__$1,cs__$1,meta40410));
});

}

return (new cljs.core.async.t_cljs$core$async40409(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__39218__auto___43371 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_40619){
var state_val_40623 = (state_40619[(1)]);
if((state_val_40623 === (7))){
var inst_40609 = (state_40619[(2)]);
var state_40619__$1 = state_40619;
var statearr_40636_43372 = state_40619__$1;
(statearr_40636_43372[(2)] = inst_40609);

(statearr_40636_43372[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (20))){
var inst_40484 = (state_40619[(7)]);
var inst_40509 = cljs.core.first(inst_40484);
var inst_40510 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40509,(0),null);
var inst_40511 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40509,(1),null);
var state_40619__$1 = (function (){var statearr_40638 = state_40619;
(statearr_40638[(8)] = inst_40510);

return statearr_40638;
})();
if(cljs.core.truth_(inst_40511)){
var statearr_40641_43374 = state_40619__$1;
(statearr_40641_43374[(1)] = (22));

} else {
var statearr_40645_43375 = state_40619__$1;
(statearr_40645_43375[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (27))){
var inst_40551 = (state_40619[(9)]);
var inst_40546 = (state_40619[(10)]);
var inst_40544 = (state_40619[(11)]);
var inst_40436 = (state_40619[(12)]);
var inst_40551__$1 = cljs.core._nth(inst_40544,inst_40546);
var inst_40552 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_40551__$1,inst_40436,done);
var state_40619__$1 = (function (){var statearr_40652 = state_40619;
(statearr_40652[(9)] = inst_40551__$1);

return statearr_40652;
})();
if(cljs.core.truth_(inst_40552)){
var statearr_40653_43379 = state_40619__$1;
(statearr_40653_43379[(1)] = (30));

} else {
var statearr_40657_43380 = state_40619__$1;
(statearr_40657_43380[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (1))){
var state_40619__$1 = state_40619;
var statearr_40659_43382 = state_40619__$1;
(statearr_40659_43382[(2)] = null);

(statearr_40659_43382[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (24))){
var inst_40484 = (state_40619[(7)]);
var inst_40520 = (state_40619[(2)]);
var inst_40521 = cljs.core.next(inst_40484);
var inst_40446 = inst_40521;
var inst_40447 = null;
var inst_40448 = (0);
var inst_40449 = (0);
var state_40619__$1 = (function (){var statearr_40661 = state_40619;
(statearr_40661[(13)] = inst_40448);

(statearr_40661[(14)] = inst_40449);

(statearr_40661[(15)] = inst_40447);

(statearr_40661[(16)] = inst_40446);

(statearr_40661[(17)] = inst_40520);

return statearr_40661;
})();
var statearr_40662_43383 = state_40619__$1;
(statearr_40662_43383[(2)] = null);

(statearr_40662_43383[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (39))){
var state_40619__$1 = state_40619;
var statearr_40674_43384 = state_40619__$1;
(statearr_40674_43384[(2)] = null);

(statearr_40674_43384[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (4))){
var inst_40436 = (state_40619[(12)]);
var inst_40436__$1 = (state_40619[(2)]);
var inst_40437 = (inst_40436__$1 == null);
var state_40619__$1 = (function (){var statearr_40679 = state_40619;
(statearr_40679[(12)] = inst_40436__$1);

return statearr_40679;
})();
if(cljs.core.truth_(inst_40437)){
var statearr_40680_43386 = state_40619__$1;
(statearr_40680_43386[(1)] = (5));

} else {
var statearr_40681_43387 = state_40619__$1;
(statearr_40681_43387[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (15))){
var inst_40448 = (state_40619[(13)]);
var inst_40449 = (state_40619[(14)]);
var inst_40447 = (state_40619[(15)]);
var inst_40446 = (state_40619[(16)]);
var inst_40476 = (state_40619[(2)]);
var inst_40479 = (inst_40449 + (1));
var tmp40667 = inst_40448;
var tmp40668 = inst_40447;
var tmp40669 = inst_40446;
var inst_40446__$1 = tmp40669;
var inst_40447__$1 = tmp40668;
var inst_40448__$1 = tmp40667;
var inst_40449__$1 = inst_40479;
var state_40619__$1 = (function (){var statearr_40688 = state_40619;
(statearr_40688[(18)] = inst_40476);

(statearr_40688[(13)] = inst_40448__$1);

(statearr_40688[(14)] = inst_40449__$1);

(statearr_40688[(15)] = inst_40447__$1);

(statearr_40688[(16)] = inst_40446__$1);

return statearr_40688;
})();
var statearr_40693_43392 = state_40619__$1;
(statearr_40693_43392[(2)] = null);

(statearr_40693_43392[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (21))){
var inst_40524 = (state_40619[(2)]);
var state_40619__$1 = state_40619;
var statearr_40698_43393 = state_40619__$1;
(statearr_40698_43393[(2)] = inst_40524);

(statearr_40698_43393[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (31))){
var inst_40551 = (state_40619[(9)]);
var inst_40555 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_40551);
var state_40619__$1 = state_40619;
var statearr_40699_43394 = state_40619__$1;
(statearr_40699_43394[(2)] = inst_40555);

(statearr_40699_43394[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (32))){
var inst_40546 = (state_40619[(10)]);
var inst_40544 = (state_40619[(11)]);
var inst_40543 = (state_40619[(19)]);
var inst_40545 = (state_40619[(20)]);
var inst_40557 = (state_40619[(2)]);
var inst_40558 = (inst_40546 + (1));
var tmp40694 = inst_40544;
var tmp40695 = inst_40543;
var tmp40696 = inst_40545;
var inst_40543__$1 = tmp40695;
var inst_40544__$1 = tmp40694;
var inst_40545__$1 = tmp40696;
var inst_40546__$1 = inst_40558;
var state_40619__$1 = (function (){var statearr_40710 = state_40619;
(statearr_40710[(21)] = inst_40557);

(statearr_40710[(10)] = inst_40546__$1);

(statearr_40710[(11)] = inst_40544__$1);

(statearr_40710[(19)] = inst_40543__$1);

(statearr_40710[(20)] = inst_40545__$1);

return statearr_40710;
})();
var statearr_40711_43395 = state_40619__$1;
(statearr_40711_43395[(2)] = null);

(statearr_40711_43395[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (40))){
var inst_40574 = (state_40619[(22)]);
var inst_40582 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_40574);
var state_40619__$1 = state_40619;
var statearr_40713_43396 = state_40619__$1;
(statearr_40713_43396[(2)] = inst_40582);

(statearr_40713_43396[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (33))){
var inst_40561 = (state_40619[(23)]);
var inst_40565 = cljs.core.chunked_seq_QMARK_(inst_40561);
var state_40619__$1 = state_40619;
if(inst_40565){
var statearr_40717_43400 = state_40619__$1;
(statearr_40717_43400[(1)] = (36));

} else {
var statearr_40725_43401 = state_40619__$1;
(statearr_40725_43401[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (13))){
var inst_40468 = (state_40619[(24)]);
var inst_40472 = cljs.core.async.close_BANG_(inst_40468);
var state_40619__$1 = state_40619;
var statearr_40730_43402 = state_40619__$1;
(statearr_40730_43402[(2)] = inst_40472);

(statearr_40730_43402[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (22))){
var inst_40510 = (state_40619[(8)]);
var inst_40517 = cljs.core.async.close_BANG_(inst_40510);
var state_40619__$1 = state_40619;
var statearr_40732_43403 = state_40619__$1;
(statearr_40732_43403[(2)] = inst_40517);

(statearr_40732_43403[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (36))){
var inst_40561 = (state_40619[(23)]);
var inst_40569 = cljs.core.chunk_first(inst_40561);
var inst_40570 = cljs.core.chunk_rest(inst_40561);
var inst_40571 = cljs.core.count(inst_40569);
var inst_40543 = inst_40570;
var inst_40544 = inst_40569;
var inst_40545 = inst_40571;
var inst_40546 = (0);
var state_40619__$1 = (function (){var statearr_40733 = state_40619;
(statearr_40733[(10)] = inst_40546);

(statearr_40733[(11)] = inst_40544);

(statearr_40733[(19)] = inst_40543);

(statearr_40733[(20)] = inst_40545);

return statearr_40733;
})();
var statearr_40735_43405 = state_40619__$1;
(statearr_40735_43405[(2)] = null);

(statearr_40735_43405[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (41))){
var inst_40561 = (state_40619[(23)]);
var inst_40584 = (state_40619[(2)]);
var inst_40587 = cljs.core.next(inst_40561);
var inst_40543 = inst_40587;
var inst_40544 = null;
var inst_40545 = (0);
var inst_40546 = (0);
var state_40619__$1 = (function (){var statearr_40737 = state_40619;
(statearr_40737[(25)] = inst_40584);

(statearr_40737[(10)] = inst_40546);

(statearr_40737[(11)] = inst_40544);

(statearr_40737[(19)] = inst_40543);

(statearr_40737[(20)] = inst_40545);

return statearr_40737;
})();
var statearr_40738_43409 = state_40619__$1;
(statearr_40738_43409[(2)] = null);

(statearr_40738_43409[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (43))){
var state_40619__$1 = state_40619;
var statearr_40740_43410 = state_40619__$1;
(statearr_40740_43410[(2)] = null);

(statearr_40740_43410[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (29))){
var inst_40595 = (state_40619[(2)]);
var state_40619__$1 = state_40619;
var statearr_40742_43411 = state_40619__$1;
(statearr_40742_43411[(2)] = inst_40595);

(statearr_40742_43411[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (44))){
var inst_40606 = (state_40619[(2)]);
var state_40619__$1 = (function (){var statearr_40743 = state_40619;
(statearr_40743[(26)] = inst_40606);

return statearr_40743;
})();
var statearr_40745_43412 = state_40619__$1;
(statearr_40745_43412[(2)] = null);

(statearr_40745_43412[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (6))){
var inst_40534 = (state_40619[(27)]);
var inst_40533 = cljs.core.deref(cs);
var inst_40534__$1 = cljs.core.keys(inst_40533);
var inst_40536 = cljs.core.count(inst_40534__$1);
var inst_40537 = cljs.core.reset_BANG_(dctr,inst_40536);
var inst_40542 = cljs.core.seq(inst_40534__$1);
var inst_40543 = inst_40542;
var inst_40544 = null;
var inst_40545 = (0);
var inst_40546 = (0);
var state_40619__$1 = (function (){var statearr_40747 = state_40619;
(statearr_40747[(28)] = inst_40537);

(statearr_40747[(10)] = inst_40546);

(statearr_40747[(11)] = inst_40544);

(statearr_40747[(19)] = inst_40543);

(statearr_40747[(20)] = inst_40545);

(statearr_40747[(27)] = inst_40534__$1);

return statearr_40747;
})();
var statearr_40748_43413 = state_40619__$1;
(statearr_40748_43413[(2)] = null);

(statearr_40748_43413[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (28))){
var inst_40561 = (state_40619[(23)]);
var inst_40543 = (state_40619[(19)]);
var inst_40561__$1 = cljs.core.seq(inst_40543);
var state_40619__$1 = (function (){var statearr_40750 = state_40619;
(statearr_40750[(23)] = inst_40561__$1);

return statearr_40750;
})();
if(inst_40561__$1){
var statearr_40751_43414 = state_40619__$1;
(statearr_40751_43414[(1)] = (33));

} else {
var statearr_40752_43415 = state_40619__$1;
(statearr_40752_43415[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (25))){
var inst_40546 = (state_40619[(10)]);
var inst_40545 = (state_40619[(20)]);
var inst_40548 = (inst_40546 < inst_40545);
var inst_40549 = inst_40548;
var state_40619__$1 = state_40619;
if(cljs.core.truth_(inst_40549)){
var statearr_40757_43416 = state_40619__$1;
(statearr_40757_43416[(1)] = (27));

} else {
var statearr_40759_43417 = state_40619__$1;
(statearr_40759_43417[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (34))){
var state_40619__$1 = state_40619;
var statearr_40769_43418 = state_40619__$1;
(statearr_40769_43418[(2)] = null);

(statearr_40769_43418[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (17))){
var state_40619__$1 = state_40619;
var statearr_40774_43419 = state_40619__$1;
(statearr_40774_43419[(2)] = null);

(statearr_40774_43419[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (3))){
var inst_40611 = (state_40619[(2)]);
var state_40619__$1 = state_40619;
return cljs.core.async.impl.ioc_helpers.return_chan(state_40619__$1,inst_40611);
} else {
if((state_val_40623 === (12))){
var inst_40529 = (state_40619[(2)]);
var state_40619__$1 = state_40619;
var statearr_40777_43420 = state_40619__$1;
(statearr_40777_43420[(2)] = inst_40529);

(statearr_40777_43420[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (2))){
var state_40619__$1 = state_40619;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40619__$1,(4),ch);
} else {
if((state_val_40623 === (23))){
var state_40619__$1 = state_40619;
var statearr_40785_43424 = state_40619__$1;
(statearr_40785_43424[(2)] = null);

(statearr_40785_43424[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (35))){
var inst_40593 = (state_40619[(2)]);
var state_40619__$1 = state_40619;
var statearr_40787_43425 = state_40619__$1;
(statearr_40787_43425[(2)] = inst_40593);

(statearr_40787_43425[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (19))){
var inst_40484 = (state_40619[(7)]);
var inst_40494 = cljs.core.chunk_first(inst_40484);
var inst_40497 = cljs.core.chunk_rest(inst_40484);
var inst_40498 = cljs.core.count(inst_40494);
var inst_40446 = inst_40497;
var inst_40447 = inst_40494;
var inst_40448 = inst_40498;
var inst_40449 = (0);
var state_40619__$1 = (function (){var statearr_40788 = state_40619;
(statearr_40788[(13)] = inst_40448);

(statearr_40788[(14)] = inst_40449);

(statearr_40788[(15)] = inst_40447);

(statearr_40788[(16)] = inst_40446);

return statearr_40788;
})();
var statearr_40789_43428 = state_40619__$1;
(statearr_40789_43428[(2)] = null);

(statearr_40789_43428[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (11))){
var inst_40484 = (state_40619[(7)]);
var inst_40446 = (state_40619[(16)]);
var inst_40484__$1 = cljs.core.seq(inst_40446);
var state_40619__$1 = (function (){var statearr_40796 = state_40619;
(statearr_40796[(7)] = inst_40484__$1);

return statearr_40796;
})();
if(inst_40484__$1){
var statearr_40799_43431 = state_40619__$1;
(statearr_40799_43431[(1)] = (16));

} else {
var statearr_40800_43432 = state_40619__$1;
(statearr_40800_43432[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (9))){
var inst_40531 = (state_40619[(2)]);
var state_40619__$1 = state_40619;
var statearr_40803_43433 = state_40619__$1;
(statearr_40803_43433[(2)] = inst_40531);

(statearr_40803_43433[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (5))){
var inst_40443 = cljs.core.deref(cs);
var inst_40444 = cljs.core.seq(inst_40443);
var inst_40446 = inst_40444;
var inst_40447 = null;
var inst_40448 = (0);
var inst_40449 = (0);
var state_40619__$1 = (function (){var statearr_40805 = state_40619;
(statearr_40805[(13)] = inst_40448);

(statearr_40805[(14)] = inst_40449);

(statearr_40805[(15)] = inst_40447);

(statearr_40805[(16)] = inst_40446);

return statearr_40805;
})();
var statearr_40806_43435 = state_40619__$1;
(statearr_40806_43435[(2)] = null);

(statearr_40806_43435[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (14))){
var state_40619__$1 = state_40619;
var statearr_40807_43436 = state_40619__$1;
(statearr_40807_43436[(2)] = null);

(statearr_40807_43436[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (45))){
var inst_40603 = (state_40619[(2)]);
var state_40619__$1 = state_40619;
var statearr_40811_43440 = state_40619__$1;
(statearr_40811_43440[(2)] = inst_40603);

(statearr_40811_43440[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (26))){
var inst_40534 = (state_40619[(27)]);
var inst_40597 = (state_40619[(2)]);
var inst_40598 = cljs.core.seq(inst_40534);
var state_40619__$1 = (function (){var statearr_40814 = state_40619;
(statearr_40814[(29)] = inst_40597);

return statearr_40814;
})();
if(inst_40598){
var statearr_40817_43443 = state_40619__$1;
(statearr_40817_43443[(1)] = (42));

} else {
var statearr_40822_43446 = state_40619__$1;
(statearr_40822_43446[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (16))){
var inst_40484 = (state_40619[(7)]);
var inst_40492 = cljs.core.chunked_seq_QMARK_(inst_40484);
var state_40619__$1 = state_40619;
if(inst_40492){
var statearr_40831_43449 = state_40619__$1;
(statearr_40831_43449[(1)] = (19));

} else {
var statearr_40834_43451 = state_40619__$1;
(statearr_40834_43451[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (38))){
var inst_40590 = (state_40619[(2)]);
var state_40619__$1 = state_40619;
var statearr_40838_43452 = state_40619__$1;
(statearr_40838_43452[(2)] = inst_40590);

(statearr_40838_43452[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (30))){
var state_40619__$1 = state_40619;
var statearr_40840_43453 = state_40619__$1;
(statearr_40840_43453[(2)] = null);

(statearr_40840_43453[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (10))){
var inst_40449 = (state_40619[(14)]);
var inst_40447 = (state_40619[(15)]);
var inst_40467 = cljs.core._nth(inst_40447,inst_40449);
var inst_40468 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40467,(0),null);
var inst_40470 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_40467,(1),null);
var state_40619__$1 = (function (){var statearr_40847 = state_40619;
(statearr_40847[(24)] = inst_40468);

return statearr_40847;
})();
if(cljs.core.truth_(inst_40470)){
var statearr_40848_43457 = state_40619__$1;
(statearr_40848_43457[(1)] = (13));

} else {
var statearr_40850_43458 = state_40619__$1;
(statearr_40850_43458[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (18))){
var inst_40527 = (state_40619[(2)]);
var state_40619__$1 = state_40619;
var statearr_40852_43460 = state_40619__$1;
(statearr_40852_43460[(2)] = inst_40527);

(statearr_40852_43460[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (42))){
var state_40619__$1 = state_40619;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_40619__$1,(45),dchan);
} else {
if((state_val_40623 === (37))){
var inst_40561 = (state_40619[(23)]);
var inst_40436 = (state_40619[(12)]);
var inst_40574 = (state_40619[(22)]);
var inst_40574__$1 = cljs.core.first(inst_40561);
var inst_40575 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_40574__$1,inst_40436,done);
var state_40619__$1 = (function (){var statearr_40858 = state_40619;
(statearr_40858[(22)] = inst_40574__$1);

return statearr_40858;
})();
if(cljs.core.truth_(inst_40575)){
var statearr_40859_43461 = state_40619__$1;
(statearr_40859_43461[(1)] = (39));

} else {
var statearr_40860_43463 = state_40619__$1;
(statearr_40860_43463[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_40623 === (8))){
var inst_40448 = (state_40619[(13)]);
var inst_40449 = (state_40619[(14)]);
var inst_40456 = (inst_40449 < inst_40448);
var inst_40457 = inst_40456;
var state_40619__$1 = state_40619;
if(cljs.core.truth_(inst_40457)){
var statearr_40861_43465 = state_40619__$1;
(statearr_40861_43465[(1)] = (10));

} else {
var statearr_40862_43466 = state_40619__$1;
(statearr_40862_43466[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mult_$_state_machine__38811__auto__ = null;
var cljs$core$async$mult_$_state_machine__38811__auto____0 = (function (){
var statearr_40884 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_40884[(0)] = cljs$core$async$mult_$_state_machine__38811__auto__);

(statearr_40884[(1)] = (1));

return statearr_40884;
});
var cljs$core$async$mult_$_state_machine__38811__auto____1 = (function (state_40619){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_40619);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e40902){var ex__38814__auto__ = e40902;
var statearr_40903_43469 = state_40619;
(statearr_40903_43469[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_40619[(4)]))){
var statearr_40911_43470 = state_40619;
(statearr_40911_43470[(1)] = cljs.core.first((state_40619[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43474 = state_40619;
state_40619 = G__43474;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__38811__auto__ = function(state_40619){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__38811__auto____1.call(this,state_40619);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__38811__auto____0;
cljs$core$async$mult_$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__38811__auto____1;
return cljs$core$async$mult_$_state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_40936 = f__39219__auto__();
(statearr_40936[(6)] = c__39218__auto___43371);

return statearr_40936;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__40975 = arguments.length;
switch (G__40975) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

var cljs$core$async$Mix$admix_STAR_$dyn_43481 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_43481(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_43483 = (function (m,ch){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5394__auto__.call(null,m,ch));
} else {
var m__5392__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5392__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_43483(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_43486 = (function (m){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5394__auto__.call(null,m));
} else {
var m__5392__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5392__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_43486(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_43487 = (function (m,state_map){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5394__auto__.call(null,m,state_map));
} else {
var m__5392__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5392__auto__.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_43487(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_43493 = (function (m,mode){
var x__5393__auto__ = (((m == null))?null:m);
var m__5394__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5394__auto__.call(null,m,mode));
} else {
var m__5392__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5392__auto__.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_43493(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5775__auto__ = [];
var len__5769__auto___43494 = arguments.length;
var i__5770__auto___43495 = (0);
while(true){
if((i__5770__auto___43495 < len__5769__auto___43494)){
args__5775__auto__.push((arguments[i__5770__auto___43495]));

var G__43496 = (i__5770__auto___43495 + (1));
i__5770__auto___43495 = G__43496;
continue;
} else {
}
break;
}

var argseq__5776__auto__ = ((((3) < args__5775__auto__.length))?(new cljs.core.IndexedSeq(args__5775__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5776__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__41121){
var map__41122 = p__41121;
var map__41122__$1 = cljs.core.__destructure_map(map__41122);
var opts = map__41122__$1;
var statearr_41123_43500 = state;
(statearr_41123_43500[(1)] = cont_block);


var temp__5804__auto__ = cljs.core.async.do_alts((function (val){
var statearr_41126_43501 = state;
(statearr_41126_43501[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5804__auto__)){
var cb = temp__5804__auto__;
var statearr_41127_43502 = state;
(statearr_41127_43502[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq41103){
var G__41104 = cljs.core.first(seq41103);
var seq41103__$1 = cljs.core.next(seq41103);
var G__41105 = cljs.core.first(seq41103__$1);
var seq41103__$2 = cljs.core.next(seq41103__$1);
var G__41106 = cljs.core.first(seq41103__$2);
var seq41103__$3 = cljs.core.next(seq41103__$2);
var self__5754__auto__ = this;
return self__5754__auto__.cljs$core$IFn$_invoke$arity$variadic(G__41104,G__41105,G__41106,seq41103__$3);
}));

/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1)));
var changed = (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv((function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref(cs);
var mode = cljs.core.deref(solo_mode);
var solos = pick(new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick(new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && ((!(cljs.core.empty_QMARK_(solos))))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async41151 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async41151 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta41152){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta41152 = meta41152;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async41151.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_41153,meta41152__$1){
var self__ = this;
var _41153__$1 = this;
return (new cljs.core.async.t_cljs$core$async41151(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta41152__$1));
}));

(cljs.core.async.t_cljs$core$async41151.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_41153){
var self__ = this;
var _41153__$1 = this;
return self__.meta41152;
}));

(cljs.core.async.t_cljs$core$async41151.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41151.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async41151.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41151.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async41151.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async41151.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async41151.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async41151.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async41151.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta41152","meta41152",-1220557879,null)], null);
}));

(cljs.core.async.t_cljs$core$async41151.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async41151.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async41151");

(cljs.core.async.t_cljs$core$async41151.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async41151");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async41151.
 */
cljs.core.async.__GT_t_cljs$core$async41151 = (function cljs$core$async$mix_$___GT_t_cljs$core$async41151(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta41152){
return (new cljs.core.async.t_cljs$core$async41151(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta41152));
});

}

return (new cljs.core.async.t_cljs$core$async41151(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__39218__auto___43510 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_41271){
var state_val_41273 = (state_41271[(1)]);
if((state_val_41273 === (7))){
var inst_41215 = (state_41271[(2)]);
var state_41271__$1 = state_41271;
if(cljs.core.truth_(inst_41215)){
var statearr_41279_43512 = state_41271__$1;
(statearr_41279_43512[(1)] = (8));

} else {
var statearr_41280_43514 = state_41271__$1;
(statearr_41280_43514[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (20))){
var inst_41205 = (state_41271[(7)]);
var state_41271__$1 = state_41271;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41271__$1,(23),out,inst_41205);
} else {
if((state_val_41273 === (1))){
var inst_41185 = calc_state();
var inst_41188 = cljs.core.__destructure_map(inst_41185);
var inst_41189 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_41188,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_41190 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_41188,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_41191 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_41188,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_41192 = inst_41185;
var state_41271__$1 = (function (){var statearr_41284 = state_41271;
(statearr_41284[(8)] = inst_41190);

(statearr_41284[(9)] = inst_41192);

(statearr_41284[(10)] = inst_41189);

(statearr_41284[(11)] = inst_41191);

return statearr_41284;
})();
var statearr_41287_43522 = state_41271__$1;
(statearr_41287_43522[(2)] = null);

(statearr_41287_43522[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (24))){
var inst_41195 = (state_41271[(12)]);
var inst_41192 = inst_41195;
var state_41271__$1 = (function (){var statearr_41289 = state_41271;
(statearr_41289[(9)] = inst_41192);

return statearr_41289;
})();
var statearr_41291_43523 = state_41271__$1;
(statearr_41291_43523[(2)] = null);

(statearr_41291_43523[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (4))){
var inst_41205 = (state_41271[(7)]);
var inst_41210 = (state_41271[(13)]);
var inst_41204 = (state_41271[(2)]);
var inst_41205__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_41204,(0),null);
var inst_41206 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_41204,(1),null);
var inst_41210__$1 = (inst_41205__$1 == null);
var state_41271__$1 = (function (){var statearr_41294 = state_41271;
(statearr_41294[(7)] = inst_41205__$1);

(statearr_41294[(14)] = inst_41206);

(statearr_41294[(13)] = inst_41210__$1);

return statearr_41294;
})();
if(cljs.core.truth_(inst_41210__$1)){
var statearr_41297_43528 = state_41271__$1;
(statearr_41297_43528[(1)] = (5));

} else {
var statearr_41299_43529 = state_41271__$1;
(statearr_41299_43529[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (15))){
var inst_41196 = (state_41271[(15)]);
var inst_41238 = (state_41271[(16)]);
var inst_41238__$1 = cljs.core.empty_QMARK_(inst_41196);
var state_41271__$1 = (function (){var statearr_41304 = state_41271;
(statearr_41304[(16)] = inst_41238__$1);

return statearr_41304;
})();
if(inst_41238__$1){
var statearr_41305_43534 = state_41271__$1;
(statearr_41305_43534[(1)] = (17));

} else {
var statearr_41306_43535 = state_41271__$1;
(statearr_41306_43535[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (21))){
var inst_41195 = (state_41271[(12)]);
var inst_41192 = inst_41195;
var state_41271__$1 = (function (){var statearr_41311 = state_41271;
(statearr_41311[(9)] = inst_41192);

return statearr_41311;
})();
var statearr_41312_43541 = state_41271__$1;
(statearr_41312_43541[(2)] = null);

(statearr_41312_43541[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (13))){
var inst_41225 = (state_41271[(2)]);
var inst_41226 = calc_state();
var inst_41192 = inst_41226;
var state_41271__$1 = (function (){var statearr_41313 = state_41271;
(statearr_41313[(17)] = inst_41225);

(statearr_41313[(9)] = inst_41192);

return statearr_41313;
})();
var statearr_41315_43545 = state_41271__$1;
(statearr_41315_43545[(2)] = null);

(statearr_41315_43545[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (22))){
var inst_41260 = (state_41271[(2)]);
var state_41271__$1 = state_41271;
var statearr_41317_43547 = state_41271__$1;
(statearr_41317_43547[(2)] = inst_41260);

(statearr_41317_43547[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (6))){
var inst_41206 = (state_41271[(14)]);
var inst_41213 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_41206,change);
var state_41271__$1 = state_41271;
var statearr_41321_43553 = state_41271__$1;
(statearr_41321_43553[(2)] = inst_41213);

(statearr_41321_43553[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (25))){
var state_41271__$1 = state_41271;
var statearr_41323_43555 = state_41271__$1;
(statearr_41323_43555[(2)] = null);

(statearr_41323_43555[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (17))){
var inst_41197 = (state_41271[(18)]);
var inst_41206 = (state_41271[(14)]);
var inst_41240 = (inst_41197.cljs$core$IFn$_invoke$arity$1 ? inst_41197.cljs$core$IFn$_invoke$arity$1(inst_41206) : inst_41197.call(null,inst_41206));
var inst_41241 = cljs.core.not(inst_41240);
var state_41271__$1 = state_41271;
var statearr_41325_43569 = state_41271__$1;
(statearr_41325_43569[(2)] = inst_41241);

(statearr_41325_43569[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (3))){
var inst_41266 = (state_41271[(2)]);
var state_41271__$1 = state_41271;
return cljs.core.async.impl.ioc_helpers.return_chan(state_41271__$1,inst_41266);
} else {
if((state_val_41273 === (12))){
var state_41271__$1 = state_41271;
var statearr_41330_43578 = state_41271__$1;
(statearr_41330_43578[(2)] = null);

(statearr_41330_43578[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (2))){
var inst_41195 = (state_41271[(12)]);
var inst_41192 = (state_41271[(9)]);
var inst_41195__$1 = cljs.core.__destructure_map(inst_41192);
var inst_41196 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_41195__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_41197 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_41195__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_41198 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_41195__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_41271__$1 = (function (){var statearr_41334 = state_41271;
(statearr_41334[(12)] = inst_41195__$1);

(statearr_41334[(18)] = inst_41197);

(statearr_41334[(15)] = inst_41196);

return statearr_41334;
})();
return cljs.core.async.ioc_alts_BANG_(state_41271__$1,(4),inst_41198);
} else {
if((state_val_41273 === (23))){
var inst_41249 = (state_41271[(2)]);
var state_41271__$1 = state_41271;
if(cljs.core.truth_(inst_41249)){
var statearr_41337_43589 = state_41271__$1;
(statearr_41337_43589[(1)] = (24));

} else {
var statearr_41339_43590 = state_41271__$1;
(statearr_41339_43590[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (19))){
var inst_41244 = (state_41271[(2)]);
var state_41271__$1 = state_41271;
var statearr_41342_43591 = state_41271__$1;
(statearr_41342_43591[(2)] = inst_41244);

(statearr_41342_43591[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (11))){
var inst_41206 = (state_41271[(14)]);
var inst_41222 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_41206);
var state_41271__$1 = state_41271;
var statearr_41345_43592 = state_41271__$1;
(statearr_41345_43592[(2)] = inst_41222);

(statearr_41345_43592[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (9))){
var inst_41196 = (state_41271[(15)]);
var inst_41206 = (state_41271[(14)]);
var inst_41234 = (state_41271[(19)]);
var inst_41234__$1 = (inst_41196.cljs$core$IFn$_invoke$arity$1 ? inst_41196.cljs$core$IFn$_invoke$arity$1(inst_41206) : inst_41196.call(null,inst_41206));
var state_41271__$1 = (function (){var statearr_41347 = state_41271;
(statearr_41347[(19)] = inst_41234__$1);

return statearr_41347;
})();
if(cljs.core.truth_(inst_41234__$1)){
var statearr_41350_43595 = state_41271__$1;
(statearr_41350_43595[(1)] = (14));

} else {
var statearr_41351_43596 = state_41271__$1;
(statearr_41351_43596[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (5))){
var inst_41210 = (state_41271[(13)]);
var state_41271__$1 = state_41271;
var statearr_41354_43598 = state_41271__$1;
(statearr_41354_43598[(2)] = inst_41210);

(statearr_41354_43598[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (14))){
var inst_41234 = (state_41271[(19)]);
var state_41271__$1 = state_41271;
var statearr_41355_43599 = state_41271__$1;
(statearr_41355_43599[(2)] = inst_41234);

(statearr_41355_43599[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (26))){
var inst_41254 = (state_41271[(2)]);
var state_41271__$1 = state_41271;
var statearr_41356_43600 = state_41271__$1;
(statearr_41356_43600[(2)] = inst_41254);

(statearr_41356_43600[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (16))){
var inst_41246 = (state_41271[(2)]);
var state_41271__$1 = state_41271;
if(cljs.core.truth_(inst_41246)){
var statearr_41357_43601 = state_41271__$1;
(statearr_41357_43601[(1)] = (20));

} else {
var statearr_41358_43603 = state_41271__$1;
(statearr_41358_43603[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (10))){
var inst_41264 = (state_41271[(2)]);
var state_41271__$1 = state_41271;
var statearr_41359_43605 = state_41271__$1;
(statearr_41359_43605[(2)] = inst_41264);

(statearr_41359_43605[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (18))){
var inst_41238 = (state_41271[(16)]);
var state_41271__$1 = state_41271;
var statearr_41361_43606 = state_41271__$1;
(statearr_41361_43606[(2)] = inst_41238);

(statearr_41361_43606[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41273 === (8))){
var inst_41205 = (state_41271[(7)]);
var inst_41220 = (inst_41205 == null);
var state_41271__$1 = state_41271;
if(cljs.core.truth_(inst_41220)){
var statearr_41362_43607 = state_41271__$1;
(statearr_41362_43607[(1)] = (11));

} else {
var statearr_41363_43608 = state_41271__$1;
(statearr_41363_43608[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mix_$_state_machine__38811__auto__ = null;
var cljs$core$async$mix_$_state_machine__38811__auto____0 = (function (){
var statearr_41367 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41367[(0)] = cljs$core$async$mix_$_state_machine__38811__auto__);

(statearr_41367[(1)] = (1));

return statearr_41367;
});
var cljs$core$async$mix_$_state_machine__38811__auto____1 = (function (state_41271){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_41271);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e41368){var ex__38814__auto__ = e41368;
var statearr_41369_43614 = state_41271;
(statearr_41369_43614[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_41271[(4)]))){
var statearr_41370_43618 = state_41271;
(statearr_41370_43618[(1)] = cljs.core.first((state_41271[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43625 = state_41271;
state_41271 = G__43625;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__38811__auto__ = function(state_41271){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__38811__auto____1.call(this,state_41271);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__38811__auto____0;
cljs$core$async$mix_$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__38811__auto____1;
return cljs$core$async$mix_$_state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_41372 = f__39219__auto__();
(statearr_41372[(6)] = c__39218__auto___43510);

return statearr_41372;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

var cljs$core$async$Pub$sub_STAR_$dyn_43650 = (function (p,v,ch,close_QMARK_){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5394__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__5392__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5392__auto__.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_43650(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_43657 = (function (p,v,ch){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5394__auto__.call(null,p,v,ch));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5392__auto__.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_43657(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_43663 = (function() {
var G__43664 = null;
var G__43664__1 = (function (p){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5394__auto__.call(null,p));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5392__auto__.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__43664__2 = (function (p,v){
var x__5393__auto__ = (((p == null))?null:p);
var m__5394__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5393__auto__)]);
if((!((m__5394__auto__ == null)))){
return (m__5394__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5394__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5394__auto__.call(null,p,v));
} else {
var m__5392__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5392__auto__ == null)))){
return (m__5392__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5392__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5392__auto__.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__43664 = function(p,v){
switch(arguments.length){
case 1:
return G__43664__1.call(this,p);
case 2:
return G__43664__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__43664.cljs$core$IFn$_invoke$arity$1 = G__43664__1;
G__43664.cljs$core$IFn$_invoke$arity$2 = G__43664__2;
return G__43664;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__41387 = arguments.length;
switch (G__41387) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_43663(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_43663(p,v);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2);


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__41411 = arguments.length;
switch (G__41411) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__5045__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__5045__auto__)){
return or__5045__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__41390_SHARP_){
if(cljs.core.truth_((p1__41390_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__41390_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__41390_SHARP_.call(null,topic)))){
return p1__41390_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__41390_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async41426 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async41426 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta41427){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta41427 = meta41427;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async41426.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_41428,meta41427__$1){
var self__ = this;
var _41428__$1 = this;
return (new cljs.core.async.t_cljs$core$async41426(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta41427__$1));
}));

(cljs.core.async.t_cljs$core$async41426.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_41428){
var self__ = this;
var _41428__$1 = this;
return self__.meta41427;
}));

(cljs.core.async.t_cljs$core$async41426.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41426.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async41426.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async41426.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async41426.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5804__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5804__auto__)){
var m = temp__5804__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async41426.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async41426.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async41426.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta41427","meta41427",-915489198,null)], null);
}));

(cljs.core.async.t_cljs$core$async41426.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async41426.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async41426");

(cljs.core.async.t_cljs$core$async41426.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async41426");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async41426.
 */
cljs.core.async.__GT_t_cljs$core$async41426 = (function cljs$core$async$__GT_t_cljs$core$async41426(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta41427){
return (new cljs.core.async.t_cljs$core$async41426(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta41427));
});

}

return (new cljs.core.async.t_cljs$core$async41426(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__39218__auto___43679 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_41562){
var state_val_41563 = (state_41562[(1)]);
if((state_val_41563 === (7))){
var inst_41546 = (state_41562[(2)]);
var state_41562__$1 = state_41562;
var statearr_41567_43681 = state_41562__$1;
(statearr_41567_43681[(2)] = inst_41546);

(statearr_41567_43681[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (20))){
var state_41562__$1 = state_41562;
var statearr_41570_43682 = state_41562__$1;
(statearr_41570_43682[(2)] = null);

(statearr_41570_43682[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (1))){
var state_41562__$1 = state_41562;
var statearr_41572_43683 = state_41562__$1;
(statearr_41572_43683[(2)] = null);

(statearr_41572_43683[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (24))){
var inst_41529 = (state_41562[(7)]);
var inst_41538 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_41529);
var state_41562__$1 = state_41562;
var statearr_41573_43684 = state_41562__$1;
(statearr_41573_43684[(2)] = inst_41538);

(statearr_41573_43684[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (4))){
var inst_41465 = (state_41562[(8)]);
var inst_41465__$1 = (state_41562[(2)]);
var inst_41466 = (inst_41465__$1 == null);
var state_41562__$1 = (function (){var statearr_41574 = state_41562;
(statearr_41574[(8)] = inst_41465__$1);

return statearr_41574;
})();
if(cljs.core.truth_(inst_41466)){
var statearr_41575_43686 = state_41562__$1;
(statearr_41575_43686[(1)] = (5));

} else {
var statearr_41577_43687 = state_41562__$1;
(statearr_41577_43687[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (15))){
var inst_41523 = (state_41562[(2)]);
var state_41562__$1 = state_41562;
var statearr_41579_43690 = state_41562__$1;
(statearr_41579_43690[(2)] = inst_41523);

(statearr_41579_43690[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (21))){
var inst_41543 = (state_41562[(2)]);
var state_41562__$1 = (function (){var statearr_41587 = state_41562;
(statearr_41587[(9)] = inst_41543);

return statearr_41587;
})();
var statearr_41588_43692 = state_41562__$1;
(statearr_41588_43692[(2)] = null);

(statearr_41588_43692[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (13))){
var inst_41498 = (state_41562[(10)]);
var inst_41504 = cljs.core.chunked_seq_QMARK_(inst_41498);
var state_41562__$1 = state_41562;
if(inst_41504){
var statearr_41589_43693 = state_41562__$1;
(statearr_41589_43693[(1)] = (16));

} else {
var statearr_41590_43694 = state_41562__$1;
(statearr_41590_43694[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (22))){
var inst_41535 = (state_41562[(2)]);
var state_41562__$1 = state_41562;
if(cljs.core.truth_(inst_41535)){
var statearr_41593_43695 = state_41562__$1;
(statearr_41593_43695[(1)] = (23));

} else {
var statearr_41595_43696 = state_41562__$1;
(statearr_41595_43696[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (6))){
var inst_41529 = (state_41562[(7)]);
var inst_41465 = (state_41562[(8)]);
var inst_41531 = (state_41562[(11)]);
var inst_41529__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_41465) : topic_fn.call(null,inst_41465));
var inst_41530 = cljs.core.deref(mults);
var inst_41531__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_41530,inst_41529__$1);
var state_41562__$1 = (function (){var statearr_41599 = state_41562;
(statearr_41599[(7)] = inst_41529__$1);

(statearr_41599[(11)] = inst_41531__$1);

return statearr_41599;
})();
if(cljs.core.truth_(inst_41531__$1)){
var statearr_41602_43698 = state_41562__$1;
(statearr_41602_43698[(1)] = (19));

} else {
var statearr_41603_43699 = state_41562__$1;
(statearr_41603_43699[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (25))){
var inst_41540 = (state_41562[(2)]);
var state_41562__$1 = state_41562;
var statearr_41606_43700 = state_41562__$1;
(statearr_41606_43700[(2)] = inst_41540);

(statearr_41606_43700[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (17))){
var inst_41498 = (state_41562[(10)]);
var inst_41513 = cljs.core.first(inst_41498);
var inst_41515 = cljs.core.async.muxch_STAR_(inst_41513);
var inst_41516 = cljs.core.async.close_BANG_(inst_41515);
var inst_41517 = cljs.core.next(inst_41498);
var inst_41475 = inst_41517;
var inst_41476 = null;
var inst_41477 = (0);
var inst_41478 = (0);
var state_41562__$1 = (function (){var statearr_41609 = state_41562;
(statearr_41609[(12)] = inst_41476);

(statearr_41609[(13)] = inst_41478);

(statearr_41609[(14)] = inst_41516);

(statearr_41609[(15)] = inst_41477);

(statearr_41609[(16)] = inst_41475);

return statearr_41609;
})();
var statearr_41616_43701 = state_41562__$1;
(statearr_41616_43701[(2)] = null);

(statearr_41616_43701[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (3))){
var inst_41548 = (state_41562[(2)]);
var state_41562__$1 = state_41562;
return cljs.core.async.impl.ioc_helpers.return_chan(state_41562__$1,inst_41548);
} else {
if((state_val_41563 === (12))){
var inst_41525 = (state_41562[(2)]);
var state_41562__$1 = state_41562;
var statearr_41621_43702 = state_41562__$1;
(statearr_41621_43702[(2)] = inst_41525);

(statearr_41621_43702[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (2))){
var state_41562__$1 = state_41562;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_41562__$1,(4),ch);
} else {
if((state_val_41563 === (23))){
var state_41562__$1 = state_41562;
var statearr_41623_43706 = state_41562__$1;
(statearr_41623_43706[(2)] = null);

(statearr_41623_43706[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (19))){
var inst_41465 = (state_41562[(8)]);
var inst_41531 = (state_41562[(11)]);
var inst_41533 = cljs.core.async.muxch_STAR_(inst_41531);
var state_41562__$1 = state_41562;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41562__$1,(22),inst_41533,inst_41465);
} else {
if((state_val_41563 === (11))){
var inst_41498 = (state_41562[(10)]);
var inst_41475 = (state_41562[(16)]);
var inst_41498__$1 = cljs.core.seq(inst_41475);
var state_41562__$1 = (function (){var statearr_41627 = state_41562;
(statearr_41627[(10)] = inst_41498__$1);

return statearr_41627;
})();
if(inst_41498__$1){
var statearr_41628_43707 = state_41562__$1;
(statearr_41628_43707[(1)] = (13));

} else {
var statearr_41629_43708 = state_41562__$1;
(statearr_41629_43708[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (9))){
var inst_41527 = (state_41562[(2)]);
var state_41562__$1 = state_41562;
var statearr_41631_43709 = state_41562__$1;
(statearr_41631_43709[(2)] = inst_41527);

(statearr_41631_43709[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (5))){
var inst_41472 = cljs.core.deref(mults);
var inst_41473 = cljs.core.vals(inst_41472);
var inst_41474 = cljs.core.seq(inst_41473);
var inst_41475 = inst_41474;
var inst_41476 = null;
var inst_41477 = (0);
var inst_41478 = (0);
var state_41562__$1 = (function (){var statearr_41634 = state_41562;
(statearr_41634[(12)] = inst_41476);

(statearr_41634[(13)] = inst_41478);

(statearr_41634[(15)] = inst_41477);

(statearr_41634[(16)] = inst_41475);

return statearr_41634;
})();
var statearr_41635_43710 = state_41562__$1;
(statearr_41635_43710[(2)] = null);

(statearr_41635_43710[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (14))){
var state_41562__$1 = state_41562;
var statearr_41642_43711 = state_41562__$1;
(statearr_41642_43711[(2)] = null);

(statearr_41642_43711[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (16))){
var inst_41498 = (state_41562[(10)]);
var inst_41506 = cljs.core.chunk_first(inst_41498);
var inst_41507 = cljs.core.chunk_rest(inst_41498);
var inst_41508 = cljs.core.count(inst_41506);
var inst_41475 = inst_41507;
var inst_41476 = inst_41506;
var inst_41477 = inst_41508;
var inst_41478 = (0);
var state_41562__$1 = (function (){var statearr_41645 = state_41562;
(statearr_41645[(12)] = inst_41476);

(statearr_41645[(13)] = inst_41478);

(statearr_41645[(15)] = inst_41477);

(statearr_41645[(16)] = inst_41475);

return statearr_41645;
})();
var statearr_41648_43712 = state_41562__$1;
(statearr_41648_43712[(2)] = null);

(statearr_41648_43712[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (10))){
var inst_41476 = (state_41562[(12)]);
var inst_41478 = (state_41562[(13)]);
var inst_41477 = (state_41562[(15)]);
var inst_41475 = (state_41562[(16)]);
var inst_41491 = cljs.core._nth(inst_41476,inst_41478);
var inst_41492 = cljs.core.async.muxch_STAR_(inst_41491);
var inst_41493 = cljs.core.async.close_BANG_(inst_41492);
var inst_41495 = (inst_41478 + (1));
var tmp41636 = inst_41476;
var tmp41637 = inst_41477;
var tmp41638 = inst_41475;
var inst_41475__$1 = tmp41638;
var inst_41476__$1 = tmp41636;
var inst_41477__$1 = tmp41637;
var inst_41478__$1 = inst_41495;
var state_41562__$1 = (function (){var statearr_41651 = state_41562;
(statearr_41651[(12)] = inst_41476__$1);

(statearr_41651[(17)] = inst_41493);

(statearr_41651[(13)] = inst_41478__$1);

(statearr_41651[(15)] = inst_41477__$1);

(statearr_41651[(16)] = inst_41475__$1);

return statearr_41651;
})();
var statearr_41652_43717 = state_41562__$1;
(statearr_41652_43717[(2)] = null);

(statearr_41652_43717[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (18))){
var inst_41520 = (state_41562[(2)]);
var state_41562__$1 = state_41562;
var statearr_41655_43718 = state_41562__$1;
(statearr_41655_43718[(2)] = inst_41520);

(statearr_41655_43718[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41563 === (8))){
var inst_41478 = (state_41562[(13)]);
var inst_41477 = (state_41562[(15)]);
var inst_41487 = (inst_41478 < inst_41477);
var inst_41489 = inst_41487;
var state_41562__$1 = state_41562;
if(cljs.core.truth_(inst_41489)){
var statearr_41656_43719 = state_41562__$1;
(statearr_41656_43719[(1)] = (10));

} else {
var statearr_41657_43720 = state_41562__$1;
(statearr_41657_43720[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38811__auto__ = null;
var cljs$core$async$state_machine__38811__auto____0 = (function (){
var statearr_41660 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41660[(0)] = cljs$core$async$state_machine__38811__auto__);

(statearr_41660[(1)] = (1));

return statearr_41660;
});
var cljs$core$async$state_machine__38811__auto____1 = (function (state_41562){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_41562);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e41663){var ex__38814__auto__ = e41663;
var statearr_41664_43721 = state_41562;
(statearr_41664_43721[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_41562[(4)]))){
var statearr_41666_43722 = state_41562;
(statearr_41666_43722[(1)] = cljs.core.first((state_41562[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43724 = state_41562;
state_41562 = G__43724;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$state_machine__38811__auto__ = function(state_41562){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38811__auto____1.call(this,state_41562);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38811__auto____0;
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38811__auto____1;
return cljs$core$async$state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_41669 = f__39219__auto__();
(statearr_41669[(6)] = c__39218__auto___43679);

return statearr_41669;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));


return p;
}));

(cljs.core.async.pub.cljs$lang$maxFixedArity = 3);

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__41676 = arguments.length;
switch (G__41676) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__41693 = arguments.length;
switch (G__41693) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_(p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_(p,topic);
}));

(cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__41705 = arguments.length;
switch (G__41705) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
if((cnt === (0))){
cljs.core.async.close_BANG_(out);
} else {
var c__39218__auto___43733 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_41802){
var state_val_41803 = (state_41802[(1)]);
if((state_val_41803 === (7))){
var state_41802__$1 = state_41802;
var statearr_41808_43734 = state_41802__$1;
(statearr_41808_43734[(2)] = null);

(statearr_41808_43734[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41803 === (1))){
var state_41802__$1 = state_41802;
var statearr_41816_43735 = state_41802__$1;
(statearr_41816_43735[(2)] = null);

(statearr_41816_43735[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41803 === (4))){
var inst_41737 = (state_41802[(7)]);
var inst_41738 = (state_41802[(8)]);
var inst_41742 = (inst_41738 < inst_41737);
var state_41802__$1 = state_41802;
if(cljs.core.truth_(inst_41742)){
var statearr_41817_43737 = state_41802__$1;
(statearr_41817_43737[(1)] = (6));

} else {
var statearr_41818_43738 = state_41802__$1;
(statearr_41818_43738[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41803 === (15))){
var inst_41780 = (state_41802[(9)]);
var inst_41786 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_41780);
var state_41802__$1 = state_41802;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41802__$1,(17),out,inst_41786);
} else {
if((state_val_41803 === (13))){
var inst_41780 = (state_41802[(9)]);
var inst_41780__$1 = (state_41802[(2)]);
var inst_41782 = cljs.core.some(cljs.core.nil_QMARK_,inst_41780__$1);
var state_41802__$1 = (function (){var statearr_41827 = state_41802;
(statearr_41827[(9)] = inst_41780__$1);

return statearr_41827;
})();
if(cljs.core.truth_(inst_41782)){
var statearr_41828_43739 = state_41802__$1;
(statearr_41828_43739[(1)] = (14));

} else {
var statearr_41829_43740 = state_41802__$1;
(statearr_41829_43740[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41803 === (6))){
var state_41802__$1 = state_41802;
var statearr_41831_43741 = state_41802__$1;
(statearr_41831_43741[(2)] = null);

(statearr_41831_43741[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41803 === (17))){
var inst_41788 = (state_41802[(2)]);
var state_41802__$1 = (function (){var statearr_41840 = state_41802;
(statearr_41840[(10)] = inst_41788);

return statearr_41840;
})();
var statearr_41842_43742 = state_41802__$1;
(statearr_41842_43742[(2)] = null);

(statearr_41842_43742[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41803 === (3))){
var inst_41793 = (state_41802[(2)]);
var state_41802__$1 = state_41802;
return cljs.core.async.impl.ioc_helpers.return_chan(state_41802__$1,inst_41793);
} else {
if((state_val_41803 === (12))){
var _ = (function (){var statearr_41843 = state_41802;
(statearr_41843[(4)] = cljs.core.rest((state_41802[(4)])));

return statearr_41843;
})();
var state_41802__$1 = state_41802;
var ex41838 = (state_41802__$1[(2)]);
var statearr_41846_43750 = state_41802__$1;
(statearr_41846_43750[(5)] = ex41838);


if((ex41838 instanceof Object)){
var statearr_41849_43751 = state_41802__$1;
(statearr_41849_43751[(1)] = (11));

(statearr_41849_43751[(5)] = null);

} else {
throw ex41838;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41803 === (2))){
var inst_41736 = cljs.core.reset_BANG_(dctr,cnt);
var inst_41737 = cnt;
var inst_41738 = (0);
var state_41802__$1 = (function (){var statearr_41852 = state_41802;
(statearr_41852[(7)] = inst_41737);

(statearr_41852[(11)] = inst_41736);

(statearr_41852[(8)] = inst_41738);

return statearr_41852;
})();
var statearr_41853_43759 = state_41802__$1;
(statearr_41853_43759[(2)] = null);

(statearr_41853_43759[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41803 === (11))){
var inst_41757 = (state_41802[(2)]);
var inst_41760 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_41802__$1 = (function (){var statearr_41855 = state_41802;
(statearr_41855[(12)] = inst_41757);

return statearr_41855;
})();
var statearr_41857_43760 = state_41802__$1;
(statearr_41857_43760[(2)] = inst_41760);

(statearr_41857_43760[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41803 === (9))){
var inst_41738 = (state_41802[(8)]);
var _ = (function (){var statearr_41859 = state_41802;
(statearr_41859[(4)] = cljs.core.cons((12),(state_41802[(4)])));

return statearr_41859;
})();
var inst_41766 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_41738) : chs__$1.call(null,inst_41738));
var inst_41767 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_41738) : done.call(null,inst_41738));
var inst_41768 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_41766,inst_41767);
var ___$1 = (function (){var statearr_41861 = state_41802;
(statearr_41861[(4)] = cljs.core.rest((state_41802[(4)])));

return statearr_41861;
})();
var state_41802__$1 = state_41802;
var statearr_41862_43763 = state_41802__$1;
(statearr_41862_43763[(2)] = inst_41768);

(statearr_41862_43763[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41803 === (5))){
var inst_41778 = (state_41802[(2)]);
var state_41802__$1 = (function (){var statearr_41865 = state_41802;
(statearr_41865[(13)] = inst_41778);

return statearr_41865;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_41802__$1,(13),dchan);
} else {
if((state_val_41803 === (14))){
var inst_41784 = cljs.core.async.close_BANG_(out);
var state_41802__$1 = state_41802;
var statearr_41868_43766 = state_41802__$1;
(statearr_41868_43766[(2)] = inst_41784);

(statearr_41868_43766[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41803 === (16))){
var inst_41791 = (state_41802[(2)]);
var state_41802__$1 = state_41802;
var statearr_41869_43768 = state_41802__$1;
(statearr_41869_43768[(2)] = inst_41791);

(statearr_41869_43768[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41803 === (10))){
var inst_41738 = (state_41802[(8)]);
var inst_41771 = (state_41802[(2)]);
var inst_41772 = (inst_41738 + (1));
var inst_41738__$1 = inst_41772;
var state_41802__$1 = (function (){var statearr_41871 = state_41802;
(statearr_41871[(14)] = inst_41771);

(statearr_41871[(8)] = inst_41738__$1);

return statearr_41871;
})();
var statearr_41873_43769 = state_41802__$1;
(statearr_41873_43769[(2)] = null);

(statearr_41873_43769[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41803 === (8))){
var inst_41776 = (state_41802[(2)]);
var state_41802__$1 = state_41802;
var statearr_41874_43772 = state_41802__$1;
(statearr_41874_43772[(2)] = inst_41776);

(statearr_41874_43772[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38811__auto__ = null;
var cljs$core$async$state_machine__38811__auto____0 = (function (){
var statearr_41875 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_41875[(0)] = cljs$core$async$state_machine__38811__auto__);

(statearr_41875[(1)] = (1));

return statearr_41875;
});
var cljs$core$async$state_machine__38811__auto____1 = (function (state_41802){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_41802);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e41877){var ex__38814__auto__ = e41877;
var statearr_41879_43774 = state_41802;
(statearr_41879_43774[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_41802[(4)]))){
var statearr_41884_43775 = state_41802;
(statearr_41884_43775[(1)] = cljs.core.first((state_41802[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43776 = state_41802;
state_41802 = G__43776;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$state_machine__38811__auto__ = function(state_41802){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38811__auto____1.call(this,state_41802);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38811__auto____0;
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38811__auto____1;
return cljs$core$async$state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_41886 = f__39219__auto__();
(statearr_41886[(6)] = c__39218__auto___43733);

return statearr_41886;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));

}

return out;
}));

(cljs.core.async.map.cljs$lang$maxFixedArity = 3);

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__41892 = arguments.length;
switch (G__41892) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__39218__auto___43778 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_41953){
var state_val_41954 = (state_41953[(1)]);
if((state_val_41954 === (7))){
var inst_41925 = (state_41953[(7)]);
var inst_41928 = (state_41953[(8)]);
var inst_41925__$1 = (state_41953[(2)]);
var inst_41928__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_41925__$1,(0),null);
var inst_41929 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_41925__$1,(1),null);
var inst_41930 = (inst_41928__$1 == null);
var state_41953__$1 = (function (){var statearr_41961 = state_41953;
(statearr_41961[(9)] = inst_41929);

(statearr_41961[(7)] = inst_41925__$1);

(statearr_41961[(8)] = inst_41928__$1);

return statearr_41961;
})();
if(cljs.core.truth_(inst_41930)){
var statearr_41963_43781 = state_41953__$1;
(statearr_41963_43781[(1)] = (8));

} else {
var statearr_41964_43782 = state_41953__$1;
(statearr_41964_43782[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41954 === (1))){
var inst_41899 = cljs.core.vec(chs);
var inst_41901 = inst_41899;
var state_41953__$1 = (function (){var statearr_41971 = state_41953;
(statearr_41971[(10)] = inst_41901);

return statearr_41971;
})();
var statearr_41976_43783 = state_41953__$1;
(statearr_41976_43783[(2)] = null);

(statearr_41976_43783[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41954 === (4))){
var inst_41901 = (state_41953[(10)]);
var state_41953__$1 = state_41953;
return cljs.core.async.ioc_alts_BANG_(state_41953__$1,(7),inst_41901);
} else {
if((state_val_41954 === (6))){
var inst_41946 = (state_41953[(2)]);
var state_41953__$1 = state_41953;
var statearr_42000_43784 = state_41953__$1;
(statearr_42000_43784[(2)] = inst_41946);

(statearr_42000_43784[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41954 === (3))){
var inst_41948 = (state_41953[(2)]);
var state_41953__$1 = state_41953;
return cljs.core.async.impl.ioc_helpers.return_chan(state_41953__$1,inst_41948);
} else {
if((state_val_41954 === (2))){
var inst_41901 = (state_41953[(10)]);
var inst_41916 = cljs.core.count(inst_41901);
var inst_41917 = (inst_41916 > (0));
var state_41953__$1 = state_41953;
if(cljs.core.truth_(inst_41917)){
var statearr_42009_43786 = state_41953__$1;
(statearr_42009_43786[(1)] = (4));

} else {
var statearr_42010_43787 = state_41953__$1;
(statearr_42010_43787[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41954 === (11))){
var inst_41901 = (state_41953[(10)]);
var inst_41939 = (state_41953[(2)]);
var tmp42005 = inst_41901;
var inst_41901__$1 = tmp42005;
var state_41953__$1 = (function (){var statearr_42015 = state_41953;
(statearr_42015[(10)] = inst_41901__$1);

(statearr_42015[(11)] = inst_41939);

return statearr_42015;
})();
var statearr_42016_43788 = state_41953__$1;
(statearr_42016_43788[(2)] = null);

(statearr_42016_43788[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41954 === (9))){
var inst_41928 = (state_41953[(8)]);
var state_41953__$1 = state_41953;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_41953__$1,(11),out,inst_41928);
} else {
if((state_val_41954 === (5))){
var inst_41944 = cljs.core.async.close_BANG_(out);
var state_41953__$1 = state_41953;
var statearr_42050_43789 = state_41953__$1;
(statearr_42050_43789[(2)] = inst_41944);

(statearr_42050_43789[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41954 === (10))){
var inst_41942 = (state_41953[(2)]);
var state_41953__$1 = state_41953;
var statearr_42053_43790 = state_41953__$1;
(statearr_42053_43790[(2)] = inst_41942);

(statearr_42053_43790[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_41954 === (8))){
var inst_41929 = (state_41953[(9)]);
var inst_41901 = (state_41953[(10)]);
var inst_41925 = (state_41953[(7)]);
var inst_41928 = (state_41953[(8)]);
var inst_41933 = (function (){var cs = inst_41901;
var vec__41921 = inst_41925;
var v = inst_41928;
var c = inst_41929;
return (function (p1__41889_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__41889_SHARP_);
});
})();
var inst_41935 = cljs.core.filterv(inst_41933,inst_41901);
var inst_41901__$1 = inst_41935;
var state_41953__$1 = (function (){var statearr_42054 = state_41953;
(statearr_42054[(10)] = inst_41901__$1);

return statearr_42054;
})();
var statearr_42056_43791 = state_41953__$1;
(statearr_42056_43791[(2)] = null);

(statearr_42056_43791[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38811__auto__ = null;
var cljs$core$async$state_machine__38811__auto____0 = (function (){
var statearr_42062 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_42062[(0)] = cljs$core$async$state_machine__38811__auto__);

(statearr_42062[(1)] = (1));

return statearr_42062;
});
var cljs$core$async$state_machine__38811__auto____1 = (function (state_41953){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_41953);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e42063){var ex__38814__auto__ = e42063;
var statearr_42065_43798 = state_41953;
(statearr_42065_43798[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_41953[(4)]))){
var statearr_42068_43802 = state_41953;
(statearr_42068_43802[(1)] = cljs.core.first((state_41953[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43804 = state_41953;
state_41953 = G__43804;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$state_machine__38811__auto__ = function(state_41953){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38811__auto____1.call(this,state_41953);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38811__auto____0;
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38811__auto____1;
return cljs$core$async$state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_42069 = f__39219__auto__();
(statearr_42069[(6)] = c__39218__auto___43778);

return statearr_42069;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));


return out;
}));

(cljs.core.async.merge.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__42080 = arguments.length;
switch (G__42080) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__39218__auto___43809 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_42118){
var state_val_42119 = (state_42118[(1)]);
if((state_val_42119 === (7))){
var inst_42098 = (state_42118[(7)]);
var inst_42098__$1 = (state_42118[(2)]);
var inst_42101 = (inst_42098__$1 == null);
var inst_42102 = cljs.core.not(inst_42101);
var state_42118__$1 = (function (){var statearr_42124 = state_42118;
(statearr_42124[(7)] = inst_42098__$1);

return statearr_42124;
})();
if(inst_42102){
var statearr_42125_43812 = state_42118__$1;
(statearr_42125_43812[(1)] = (8));

} else {
var statearr_42127_43813 = state_42118__$1;
(statearr_42127_43813[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42119 === (1))){
var inst_42090 = (0);
var state_42118__$1 = (function (){var statearr_42129 = state_42118;
(statearr_42129[(8)] = inst_42090);

return statearr_42129;
})();
var statearr_42130_43814 = state_42118__$1;
(statearr_42130_43814[(2)] = null);

(statearr_42130_43814[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42119 === (4))){
var state_42118__$1 = state_42118;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_42118__$1,(7),ch);
} else {
if((state_val_42119 === (6))){
var inst_42113 = (state_42118[(2)]);
var state_42118__$1 = state_42118;
var statearr_42133_43816 = state_42118__$1;
(statearr_42133_43816[(2)] = inst_42113);

(statearr_42133_43816[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42119 === (3))){
var inst_42115 = (state_42118[(2)]);
var inst_42116 = cljs.core.async.close_BANG_(out);
var state_42118__$1 = (function (){var statearr_42136 = state_42118;
(statearr_42136[(9)] = inst_42115);

return statearr_42136;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_42118__$1,inst_42116);
} else {
if((state_val_42119 === (2))){
var inst_42090 = (state_42118[(8)]);
var inst_42095 = (inst_42090 < n);
var state_42118__$1 = state_42118;
if(cljs.core.truth_(inst_42095)){
var statearr_42139_43817 = state_42118__$1;
(statearr_42139_43817[(1)] = (4));

} else {
var statearr_42140_43819 = state_42118__$1;
(statearr_42140_43819[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42119 === (11))){
var inst_42090 = (state_42118[(8)]);
var inst_42105 = (state_42118[(2)]);
var inst_42106 = (inst_42090 + (1));
var inst_42090__$1 = inst_42106;
var state_42118__$1 = (function (){var statearr_42141 = state_42118;
(statearr_42141[(8)] = inst_42090__$1);

(statearr_42141[(10)] = inst_42105);

return statearr_42141;
})();
var statearr_42142_43825 = state_42118__$1;
(statearr_42142_43825[(2)] = null);

(statearr_42142_43825[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42119 === (9))){
var state_42118__$1 = state_42118;
var statearr_42147_43827 = state_42118__$1;
(statearr_42147_43827[(2)] = null);

(statearr_42147_43827[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42119 === (5))){
var state_42118__$1 = state_42118;
var statearr_42150_43828 = state_42118__$1;
(statearr_42150_43828[(2)] = null);

(statearr_42150_43828[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42119 === (10))){
var inst_42110 = (state_42118[(2)]);
var state_42118__$1 = state_42118;
var statearr_42153_43830 = state_42118__$1;
(statearr_42153_43830[(2)] = inst_42110);

(statearr_42153_43830[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42119 === (8))){
var inst_42098 = (state_42118[(7)]);
var state_42118__$1 = state_42118;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42118__$1,(11),out,inst_42098);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38811__auto__ = null;
var cljs$core$async$state_machine__38811__auto____0 = (function (){
var statearr_42158 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_42158[(0)] = cljs$core$async$state_machine__38811__auto__);

(statearr_42158[(1)] = (1));

return statearr_42158;
});
var cljs$core$async$state_machine__38811__auto____1 = (function (state_42118){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_42118);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e42160){var ex__38814__auto__ = e42160;
var statearr_42161_43832 = state_42118;
(statearr_42161_43832[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_42118[(4)]))){
var statearr_42162_43834 = state_42118;
(statearr_42162_43834[(1)] = cljs.core.first((state_42118[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43836 = state_42118;
state_42118 = G__43836;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$state_machine__38811__auto__ = function(state_42118){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38811__auto____1.call(this,state_42118);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38811__auto____0;
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38811__auto____1;
return cljs$core$async$state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_42165 = f__39219__auto__();
(statearr_42165[(6)] = c__39218__auto___43809);

return statearr_42165;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async42173 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async42173 = (function (f,ch,meta42174){
this.f = f;
this.ch = ch;
this.meta42174 = meta42174;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async42173.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_42175,meta42174__$1){
var self__ = this;
var _42175__$1 = this;
return (new cljs.core.async.t_cljs$core$async42173(self__.f,self__.ch,meta42174__$1));
}));

(cljs.core.async.t_cljs$core$async42173.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_42175){
var self__ = this;
var _42175__$1 = this;
return self__.meta42174;
}));

(cljs.core.async.t_cljs$core$async42173.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async42173.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async42173.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async42173.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async42173.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async42196 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async42196 = (function (f,ch,meta42174,_,fn1,meta42197){
this.f = f;
this.ch = ch;
this.meta42174 = meta42174;
this._ = _;
this.fn1 = fn1;
this.meta42197 = meta42197;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async42196.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_42198,meta42197__$1){
var self__ = this;
var _42198__$1 = this;
return (new cljs.core.async.t_cljs$core$async42196(self__.f,self__.ch,self__.meta42174,self__._,self__.fn1,meta42197__$1));
}));

(cljs.core.async.t_cljs$core$async42196.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_42198){
var self__ = this;
var _42198__$1 = this;
return self__.meta42197;
}));

(cljs.core.async.t_cljs$core$async42196.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async42196.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async42196.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async42196.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__42169_SHARP_){
var G__42212 = (((p1__42169_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__42169_SHARP_) : self__.f.call(null,p1__42169_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__42212) : f1.call(null,G__42212));
});
}));

(cljs.core.async.t_cljs$core$async42196.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta42174","meta42174",1140740410,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async42173","cljs.core.async/t_cljs$core$async42173",-52856566,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta42197","meta42197",-1326116958,null)], null);
}));

(cljs.core.async.t_cljs$core$async42196.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async42196.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async42196");

(cljs.core.async.t_cljs$core$async42196.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async42196");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async42196.
 */
cljs.core.async.__GT_t_cljs$core$async42196 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async42196(f__$1,ch__$1,meta42174__$1,___$2,fn1__$1,meta42197){
return (new cljs.core.async.t_cljs$core$async42196(f__$1,ch__$1,meta42174__$1,___$2,fn1__$1,meta42197));
});

}

return (new cljs.core.async.t_cljs$core$async42196(self__.f,self__.ch,self__.meta42174,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__5043__auto__ = ret;
if(cljs.core.truth_(and__5043__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5043__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__42221 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__42221) : self__.f.call(null,G__42221));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async42173.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async42173.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async42173.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta42174","meta42174",1140740410,null)], null);
}));

(cljs.core.async.t_cljs$core$async42173.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async42173.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async42173");

(cljs.core.async.t_cljs$core$async42173.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async42173");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async42173.
 */
cljs.core.async.__GT_t_cljs$core$async42173 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async42173(f__$1,ch__$1,meta42174){
return (new cljs.core.async.t_cljs$core$async42173(f__$1,ch__$1,meta42174));
});

}

return (new cljs.core.async.t_cljs$core$async42173(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async42230 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async42230 = (function (f,ch,meta42231){
this.f = f;
this.ch = ch;
this.meta42231 = meta42231;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async42230.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_42232,meta42231__$1){
var self__ = this;
var _42232__$1 = this;
return (new cljs.core.async.t_cljs$core$async42230(self__.f,self__.ch,meta42231__$1));
}));

(cljs.core.async.t_cljs$core$async42230.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_42232){
var self__ = this;
var _42232__$1 = this;
return self__.meta42231;
}));

(cljs.core.async.t_cljs$core$async42230.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async42230.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async42230.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async42230.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async42230.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async42230.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async42230.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta42231","meta42231",-841957827,null)], null);
}));

(cljs.core.async.t_cljs$core$async42230.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async42230.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async42230");

(cljs.core.async.t_cljs$core$async42230.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async42230");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async42230.
 */
cljs.core.async.__GT_t_cljs$core$async42230 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async42230(f__$1,ch__$1,meta42231){
return (new cljs.core.async.t_cljs$core$async42230(f__$1,ch__$1,meta42231));
});

}

return (new cljs.core.async.t_cljs$core$async42230(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async42248 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async42248 = (function (p,ch,meta42249){
this.p = p;
this.ch = ch;
this.meta42249 = meta42249;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async42248.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_42250,meta42249__$1){
var self__ = this;
var _42250__$1 = this;
return (new cljs.core.async.t_cljs$core$async42248(self__.p,self__.ch,meta42249__$1));
}));

(cljs.core.async.t_cljs$core$async42248.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_42250){
var self__ = this;
var _42250__$1 = this;
return self__.meta42249;
}));

(cljs.core.async.t_cljs$core$async42248.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async42248.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async42248.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async42248.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async42248.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async42248.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async42248.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async42248.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta42249","meta42249",-295102280,null)], null);
}));

(cljs.core.async.t_cljs$core$async42248.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async42248.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async42248");

(cljs.core.async.t_cljs$core$async42248.cljs$lang$ctorPrWriter = (function (this__5330__auto__,writer__5331__auto__,opt__5332__auto__){
return cljs.core._write(writer__5331__auto__,"cljs.core.async/t_cljs$core$async42248");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async42248.
 */
cljs.core.async.__GT_t_cljs$core$async42248 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async42248(p__$1,ch__$1,meta42249){
return (new cljs.core.async.t_cljs$core$async42248(p__$1,ch__$1,meta42249));
});

}

return (new cljs.core.async.t_cljs$core$async42248(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__42281 = arguments.length;
switch (G__42281) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__39218__auto___43864 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_42318){
var state_val_42319 = (state_42318[(1)]);
if((state_val_42319 === (7))){
var inst_42312 = (state_42318[(2)]);
var state_42318__$1 = state_42318;
var statearr_42325_43866 = state_42318__$1;
(statearr_42325_43866[(2)] = inst_42312);

(statearr_42325_43866[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42319 === (1))){
var state_42318__$1 = state_42318;
var statearr_42326_43868 = state_42318__$1;
(statearr_42326_43868[(2)] = null);

(statearr_42326_43868[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42319 === (4))){
var inst_42294 = (state_42318[(7)]);
var inst_42294__$1 = (state_42318[(2)]);
var inst_42297 = (inst_42294__$1 == null);
var state_42318__$1 = (function (){var statearr_42331 = state_42318;
(statearr_42331[(7)] = inst_42294__$1);

return statearr_42331;
})();
if(cljs.core.truth_(inst_42297)){
var statearr_42336_43870 = state_42318__$1;
(statearr_42336_43870[(1)] = (5));

} else {
var statearr_42337_43871 = state_42318__$1;
(statearr_42337_43871[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42319 === (6))){
var inst_42294 = (state_42318[(7)]);
var inst_42303 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_42294) : p.call(null,inst_42294));
var state_42318__$1 = state_42318;
if(cljs.core.truth_(inst_42303)){
var statearr_42340_43873 = state_42318__$1;
(statearr_42340_43873[(1)] = (8));

} else {
var statearr_42341_43874 = state_42318__$1;
(statearr_42341_43874[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42319 === (3))){
var inst_42314 = (state_42318[(2)]);
var state_42318__$1 = state_42318;
return cljs.core.async.impl.ioc_helpers.return_chan(state_42318__$1,inst_42314);
} else {
if((state_val_42319 === (2))){
var state_42318__$1 = state_42318;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_42318__$1,(4),ch);
} else {
if((state_val_42319 === (11))){
var inst_42306 = (state_42318[(2)]);
var state_42318__$1 = state_42318;
var statearr_42342_43879 = state_42318__$1;
(statearr_42342_43879[(2)] = inst_42306);

(statearr_42342_43879[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42319 === (9))){
var state_42318__$1 = state_42318;
var statearr_42345_43883 = state_42318__$1;
(statearr_42345_43883[(2)] = null);

(statearr_42345_43883[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42319 === (5))){
var inst_42299 = cljs.core.async.close_BANG_(out);
var state_42318__$1 = state_42318;
var statearr_42346_43884 = state_42318__$1;
(statearr_42346_43884[(2)] = inst_42299);

(statearr_42346_43884[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42319 === (10))){
var inst_42309 = (state_42318[(2)]);
var state_42318__$1 = (function (){var statearr_42347 = state_42318;
(statearr_42347[(8)] = inst_42309);

return statearr_42347;
})();
var statearr_42348_43889 = state_42318__$1;
(statearr_42348_43889[(2)] = null);

(statearr_42348_43889[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42319 === (8))){
var inst_42294 = (state_42318[(7)]);
var state_42318__$1 = state_42318;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42318__$1,(11),out,inst_42294);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38811__auto__ = null;
var cljs$core$async$state_machine__38811__auto____0 = (function (){
var statearr_42351 = [null,null,null,null,null,null,null,null,null];
(statearr_42351[(0)] = cljs$core$async$state_machine__38811__auto__);

(statearr_42351[(1)] = (1));

return statearr_42351;
});
var cljs$core$async$state_machine__38811__auto____1 = (function (state_42318){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_42318);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e42352){var ex__38814__auto__ = e42352;
var statearr_42353_43896 = state_42318;
(statearr_42353_43896[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_42318[(4)]))){
var statearr_42354_43897 = state_42318;
(statearr_42354_43897[(1)] = cljs.core.first((state_42318[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43898 = state_42318;
state_42318 = G__43898;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$state_machine__38811__auto__ = function(state_42318){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38811__auto____1.call(this,state_42318);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38811__auto____0;
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38811__auto____1;
return cljs$core$async$state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_42358 = f__39219__auto__();
(statearr_42358[(6)] = c__39218__auto___43864);

return statearr_42358;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__42364 = arguments.length;
switch (G__42364) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__39218__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_42455){
var state_val_42456 = (state_42455[(1)]);
if((state_val_42456 === (7))){
var inst_42447 = (state_42455[(2)]);
var state_42455__$1 = state_42455;
var statearr_42461_43904 = state_42455__$1;
(statearr_42461_43904[(2)] = inst_42447);

(statearr_42461_43904[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (20))){
var inst_42417 = (state_42455[(7)]);
var inst_42428 = (state_42455[(2)]);
var inst_42429 = cljs.core.next(inst_42417);
var inst_42389 = inst_42429;
var inst_42390 = null;
var inst_42391 = (0);
var inst_42392 = (0);
var state_42455__$1 = (function (){var statearr_42463 = state_42455;
(statearr_42463[(8)] = inst_42428);

(statearr_42463[(9)] = inst_42391);

(statearr_42463[(10)] = inst_42389);

(statearr_42463[(11)] = inst_42390);

(statearr_42463[(12)] = inst_42392);

return statearr_42463;
})();
var statearr_42465_43909 = state_42455__$1;
(statearr_42465_43909[(2)] = null);

(statearr_42465_43909[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (1))){
var state_42455__$1 = state_42455;
var statearr_42466_43910 = state_42455__$1;
(statearr_42466_43910[(2)] = null);

(statearr_42466_43910[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (4))){
var inst_42375 = (state_42455[(13)]);
var inst_42375__$1 = (state_42455[(2)]);
var inst_42377 = (inst_42375__$1 == null);
var state_42455__$1 = (function (){var statearr_42467 = state_42455;
(statearr_42467[(13)] = inst_42375__$1);

return statearr_42467;
})();
if(cljs.core.truth_(inst_42377)){
var statearr_42469_43911 = state_42455__$1;
(statearr_42469_43911[(1)] = (5));

} else {
var statearr_42470_43912 = state_42455__$1;
(statearr_42470_43912[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (15))){
var state_42455__$1 = state_42455;
var statearr_42478_43913 = state_42455__$1;
(statearr_42478_43913[(2)] = null);

(statearr_42478_43913[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (21))){
var state_42455__$1 = state_42455;
var statearr_42479_43920 = state_42455__$1;
(statearr_42479_43920[(2)] = null);

(statearr_42479_43920[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (13))){
var inst_42391 = (state_42455[(9)]);
var inst_42389 = (state_42455[(10)]);
var inst_42390 = (state_42455[(11)]);
var inst_42392 = (state_42455[(12)]);
var inst_42413 = (state_42455[(2)]);
var inst_42414 = (inst_42392 + (1));
var tmp42475 = inst_42391;
var tmp42476 = inst_42389;
var tmp42477 = inst_42390;
var inst_42389__$1 = tmp42476;
var inst_42390__$1 = tmp42477;
var inst_42391__$1 = tmp42475;
var inst_42392__$1 = inst_42414;
var state_42455__$1 = (function (){var statearr_42481 = state_42455;
(statearr_42481[(9)] = inst_42391__$1);

(statearr_42481[(10)] = inst_42389__$1);

(statearr_42481[(14)] = inst_42413);

(statearr_42481[(11)] = inst_42390__$1);

(statearr_42481[(12)] = inst_42392__$1);

return statearr_42481;
})();
var statearr_42482_43927 = state_42455__$1;
(statearr_42482_43927[(2)] = null);

(statearr_42482_43927[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (22))){
var state_42455__$1 = state_42455;
var statearr_42483_43928 = state_42455__$1;
(statearr_42483_43928[(2)] = null);

(statearr_42483_43928[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (6))){
var inst_42375 = (state_42455[(13)]);
var inst_42385 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_42375) : f.call(null,inst_42375));
var inst_42386 = cljs.core.seq(inst_42385);
var inst_42389 = inst_42386;
var inst_42390 = null;
var inst_42391 = (0);
var inst_42392 = (0);
var state_42455__$1 = (function (){var statearr_42485 = state_42455;
(statearr_42485[(9)] = inst_42391);

(statearr_42485[(10)] = inst_42389);

(statearr_42485[(11)] = inst_42390);

(statearr_42485[(12)] = inst_42392);

return statearr_42485;
})();
var statearr_42487_43931 = state_42455__$1;
(statearr_42487_43931[(2)] = null);

(statearr_42487_43931[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (17))){
var inst_42417 = (state_42455[(7)]);
var inst_42421 = cljs.core.chunk_first(inst_42417);
var inst_42422 = cljs.core.chunk_rest(inst_42417);
var inst_42423 = cljs.core.count(inst_42421);
var inst_42389 = inst_42422;
var inst_42390 = inst_42421;
var inst_42391 = inst_42423;
var inst_42392 = (0);
var state_42455__$1 = (function (){var statearr_42488 = state_42455;
(statearr_42488[(9)] = inst_42391);

(statearr_42488[(10)] = inst_42389);

(statearr_42488[(11)] = inst_42390);

(statearr_42488[(12)] = inst_42392);

return statearr_42488;
})();
var statearr_42489_43932 = state_42455__$1;
(statearr_42489_43932[(2)] = null);

(statearr_42489_43932[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (3))){
var inst_42449 = (state_42455[(2)]);
var state_42455__$1 = state_42455;
return cljs.core.async.impl.ioc_helpers.return_chan(state_42455__$1,inst_42449);
} else {
if((state_val_42456 === (12))){
var inst_42437 = (state_42455[(2)]);
var state_42455__$1 = state_42455;
var statearr_42491_43934 = state_42455__$1;
(statearr_42491_43934[(2)] = inst_42437);

(statearr_42491_43934[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (2))){
var state_42455__$1 = state_42455;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_42455__$1,(4),in$);
} else {
if((state_val_42456 === (23))){
var inst_42445 = (state_42455[(2)]);
var state_42455__$1 = state_42455;
var statearr_42492_43935 = state_42455__$1;
(statearr_42492_43935[(2)] = inst_42445);

(statearr_42492_43935[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (19))){
var inst_42432 = (state_42455[(2)]);
var state_42455__$1 = state_42455;
var statearr_42493_43948 = state_42455__$1;
(statearr_42493_43948[(2)] = inst_42432);

(statearr_42493_43948[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (11))){
var inst_42389 = (state_42455[(10)]);
var inst_42417 = (state_42455[(7)]);
var inst_42417__$1 = cljs.core.seq(inst_42389);
var state_42455__$1 = (function (){var statearr_42494 = state_42455;
(statearr_42494[(7)] = inst_42417__$1);

return statearr_42494;
})();
if(inst_42417__$1){
var statearr_42495_43949 = state_42455__$1;
(statearr_42495_43949[(1)] = (14));

} else {
var statearr_42496_43950 = state_42455__$1;
(statearr_42496_43950[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (9))){
var inst_42439 = (state_42455[(2)]);
var inst_42440 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_42455__$1 = (function (){var statearr_42498 = state_42455;
(statearr_42498[(15)] = inst_42439);

return statearr_42498;
})();
if(cljs.core.truth_(inst_42440)){
var statearr_42499_43951 = state_42455__$1;
(statearr_42499_43951[(1)] = (21));

} else {
var statearr_42500_43952 = state_42455__$1;
(statearr_42500_43952[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (5))){
var inst_42379 = cljs.core.async.close_BANG_(out);
var state_42455__$1 = state_42455;
var statearr_42501_43954 = state_42455__$1;
(statearr_42501_43954[(2)] = inst_42379);

(statearr_42501_43954[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (14))){
var inst_42417 = (state_42455[(7)]);
var inst_42419 = cljs.core.chunked_seq_QMARK_(inst_42417);
var state_42455__$1 = state_42455;
if(inst_42419){
var statearr_42503_43955 = state_42455__$1;
(statearr_42503_43955[(1)] = (17));

} else {
var statearr_42504_43956 = state_42455__$1;
(statearr_42504_43956[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (16))){
var inst_42435 = (state_42455[(2)]);
var state_42455__$1 = state_42455;
var statearr_42505_43957 = state_42455__$1;
(statearr_42505_43957[(2)] = inst_42435);

(statearr_42505_43957[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42456 === (10))){
var inst_42390 = (state_42455[(11)]);
var inst_42392 = (state_42455[(12)]);
var inst_42408 = cljs.core._nth(inst_42390,inst_42392);
var state_42455__$1 = state_42455;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42455__$1,(13),out,inst_42408);
} else {
if((state_val_42456 === (18))){
var inst_42417 = (state_42455[(7)]);
var inst_42426 = cljs.core.first(inst_42417);
var state_42455__$1 = state_42455;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42455__$1,(20),out,inst_42426);
} else {
if((state_val_42456 === (8))){
var inst_42391 = (state_42455[(9)]);
var inst_42392 = (state_42455[(12)]);
var inst_42394 = (inst_42392 < inst_42391);
var inst_42395 = inst_42394;
var state_42455__$1 = state_42455;
if(cljs.core.truth_(inst_42395)){
var statearr_42507_43958 = state_42455__$1;
(statearr_42507_43958[(1)] = (10));

} else {
var statearr_42508_43959 = state_42455__$1;
(statearr_42508_43959[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__38811__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__38811__auto____0 = (function (){
var statearr_42511 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_42511[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__38811__auto__);

(statearr_42511[(1)] = (1));

return statearr_42511;
});
var cljs$core$async$mapcat_STAR__$_state_machine__38811__auto____1 = (function (state_42455){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_42455);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e42517){var ex__38814__auto__ = e42517;
var statearr_42518_43961 = state_42455;
(statearr_42518_43961[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_42455[(4)]))){
var statearr_42521_43962 = state_42455;
(statearr_42521_43962[(1)] = cljs.core.first((state_42455[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43963 = state_42455;
state_42455 = G__43963;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__38811__auto__ = function(state_42455){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__38811__auto____1.call(this,state_42455);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__38811__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__38811__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_42522 = f__39219__auto__();
(statearr_42522[(6)] = c__39218__auto__);

return statearr_42522;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));

return c__39218__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__42525 = arguments.length;
switch (G__42525) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__42532 = arguments.length;
switch (G__42532) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__42543 = arguments.length;
switch (G__42543) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__39218__auto___43970 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_42572){
var state_val_42573 = (state_42572[(1)]);
if((state_val_42573 === (7))){
var inst_42567 = (state_42572[(2)]);
var state_42572__$1 = state_42572;
var statearr_42577_43971 = state_42572__$1;
(statearr_42577_43971[(2)] = inst_42567);

(statearr_42577_43971[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42573 === (1))){
var inst_42549 = null;
var state_42572__$1 = (function (){var statearr_42578 = state_42572;
(statearr_42578[(7)] = inst_42549);

return statearr_42578;
})();
var statearr_42580_43972 = state_42572__$1;
(statearr_42580_43972[(2)] = null);

(statearr_42580_43972[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42573 === (4))){
var inst_42552 = (state_42572[(8)]);
var inst_42552__$1 = (state_42572[(2)]);
var inst_42553 = (inst_42552__$1 == null);
var inst_42554 = cljs.core.not(inst_42553);
var state_42572__$1 = (function (){var statearr_42582 = state_42572;
(statearr_42582[(8)] = inst_42552__$1);

return statearr_42582;
})();
if(inst_42554){
var statearr_42583_43973 = state_42572__$1;
(statearr_42583_43973[(1)] = (5));

} else {
var statearr_42584_43974 = state_42572__$1;
(statearr_42584_43974[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42573 === (6))){
var state_42572__$1 = state_42572;
var statearr_42586_43975 = state_42572__$1;
(statearr_42586_43975[(2)] = null);

(statearr_42586_43975[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42573 === (3))){
var inst_42569 = (state_42572[(2)]);
var inst_42570 = cljs.core.async.close_BANG_(out);
var state_42572__$1 = (function (){var statearr_42587 = state_42572;
(statearr_42587[(9)] = inst_42569);

return statearr_42587;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_42572__$1,inst_42570);
} else {
if((state_val_42573 === (2))){
var state_42572__$1 = state_42572;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_42572__$1,(4),ch);
} else {
if((state_val_42573 === (11))){
var inst_42552 = (state_42572[(8)]);
var inst_42561 = (state_42572[(2)]);
var inst_42549 = inst_42552;
var state_42572__$1 = (function (){var statearr_42588 = state_42572;
(statearr_42588[(10)] = inst_42561);

(statearr_42588[(7)] = inst_42549);

return statearr_42588;
})();
var statearr_42589_43976 = state_42572__$1;
(statearr_42589_43976[(2)] = null);

(statearr_42589_43976[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42573 === (9))){
var inst_42552 = (state_42572[(8)]);
var state_42572__$1 = state_42572;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42572__$1,(11),out,inst_42552);
} else {
if((state_val_42573 === (5))){
var inst_42549 = (state_42572[(7)]);
var inst_42552 = (state_42572[(8)]);
var inst_42556 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_42552,inst_42549);
var state_42572__$1 = state_42572;
if(inst_42556){
var statearr_42592_43977 = state_42572__$1;
(statearr_42592_43977[(1)] = (8));

} else {
var statearr_42594_43978 = state_42572__$1;
(statearr_42594_43978[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42573 === (10))){
var inst_42564 = (state_42572[(2)]);
var state_42572__$1 = state_42572;
var statearr_42600_43980 = state_42572__$1;
(statearr_42600_43980[(2)] = inst_42564);

(statearr_42600_43980[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42573 === (8))){
var inst_42549 = (state_42572[(7)]);
var tmp42590 = inst_42549;
var inst_42549__$1 = tmp42590;
var state_42572__$1 = (function (){var statearr_42602 = state_42572;
(statearr_42602[(7)] = inst_42549__$1);

return statearr_42602;
})();
var statearr_42603_43984 = state_42572__$1;
(statearr_42603_43984[(2)] = null);

(statearr_42603_43984[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38811__auto__ = null;
var cljs$core$async$state_machine__38811__auto____0 = (function (){
var statearr_42607 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_42607[(0)] = cljs$core$async$state_machine__38811__auto__);

(statearr_42607[(1)] = (1));

return statearr_42607;
});
var cljs$core$async$state_machine__38811__auto____1 = (function (state_42572){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_42572);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e42612){var ex__38814__auto__ = e42612;
var statearr_42614_43994 = state_42572;
(statearr_42614_43994[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_42572[(4)]))){
var statearr_42622_43995 = state_42572;
(statearr_42622_43995[(1)] = cljs.core.first((state_42572[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__43996 = state_42572;
state_42572 = G__43996;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$state_machine__38811__auto__ = function(state_42572){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38811__auto____1.call(this,state_42572);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38811__auto____0;
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38811__auto____1;
return cljs$core$async$state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_42627 = f__39219__auto__();
(statearr_42627[(6)] = c__39218__auto___43970);

return statearr_42627;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__42634 = arguments.length;
switch (G__42634) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__39218__auto___43998 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_42683){
var state_val_42684 = (state_42683[(1)]);
if((state_val_42684 === (7))){
var inst_42679 = (state_42683[(2)]);
var state_42683__$1 = state_42683;
var statearr_42686_43999 = state_42683__$1;
(statearr_42686_43999[(2)] = inst_42679);

(statearr_42686_43999[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42684 === (1))){
var inst_42645 = (new Array(n));
var inst_42646 = inst_42645;
var inst_42647 = (0);
var state_42683__$1 = (function (){var statearr_42687 = state_42683;
(statearr_42687[(7)] = inst_42646);

(statearr_42687[(8)] = inst_42647);

return statearr_42687;
})();
var statearr_42691_44000 = state_42683__$1;
(statearr_42691_44000[(2)] = null);

(statearr_42691_44000[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42684 === (4))){
var inst_42651 = (state_42683[(9)]);
var inst_42651__$1 = (state_42683[(2)]);
var inst_42652 = (inst_42651__$1 == null);
var inst_42653 = cljs.core.not(inst_42652);
var state_42683__$1 = (function (){var statearr_42692 = state_42683;
(statearr_42692[(9)] = inst_42651__$1);

return statearr_42692;
})();
if(inst_42653){
var statearr_42693_44001 = state_42683__$1;
(statearr_42693_44001[(1)] = (5));

} else {
var statearr_42694_44002 = state_42683__$1;
(statearr_42694_44002[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42684 === (15))){
var inst_42673 = (state_42683[(2)]);
var state_42683__$1 = state_42683;
var statearr_42695_44003 = state_42683__$1;
(statearr_42695_44003[(2)] = inst_42673);

(statearr_42695_44003[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42684 === (13))){
var state_42683__$1 = state_42683;
var statearr_42696_44004 = state_42683__$1;
(statearr_42696_44004[(2)] = null);

(statearr_42696_44004[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42684 === (6))){
var inst_42647 = (state_42683[(8)]);
var inst_42669 = (inst_42647 > (0));
var state_42683__$1 = state_42683;
if(cljs.core.truth_(inst_42669)){
var statearr_42698_44005 = state_42683__$1;
(statearr_42698_44005[(1)] = (12));

} else {
var statearr_42700_44006 = state_42683__$1;
(statearr_42700_44006[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42684 === (3))){
var inst_42681 = (state_42683[(2)]);
var state_42683__$1 = state_42683;
return cljs.core.async.impl.ioc_helpers.return_chan(state_42683__$1,inst_42681);
} else {
if((state_val_42684 === (12))){
var inst_42646 = (state_42683[(7)]);
var inst_42671 = cljs.core.vec(inst_42646);
var state_42683__$1 = state_42683;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42683__$1,(15),out,inst_42671);
} else {
if((state_val_42684 === (2))){
var state_42683__$1 = state_42683;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_42683__$1,(4),ch);
} else {
if((state_val_42684 === (11))){
var inst_42663 = (state_42683[(2)]);
var inst_42664 = (new Array(n));
var inst_42646 = inst_42664;
var inst_42647 = (0);
var state_42683__$1 = (function (){var statearr_42704 = state_42683;
(statearr_42704[(7)] = inst_42646);

(statearr_42704[(10)] = inst_42663);

(statearr_42704[(8)] = inst_42647);

return statearr_42704;
})();
var statearr_42709_44008 = state_42683__$1;
(statearr_42709_44008[(2)] = null);

(statearr_42709_44008[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42684 === (9))){
var inst_42646 = (state_42683[(7)]);
var inst_42661 = cljs.core.vec(inst_42646);
var state_42683__$1 = state_42683;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42683__$1,(11),out,inst_42661);
} else {
if((state_val_42684 === (5))){
var inst_42656 = (state_42683[(11)]);
var inst_42651 = (state_42683[(9)]);
var inst_42646 = (state_42683[(7)]);
var inst_42647 = (state_42683[(8)]);
var inst_42655 = (inst_42646[inst_42647] = inst_42651);
var inst_42656__$1 = (inst_42647 + (1));
var inst_42657 = (inst_42656__$1 < n);
var state_42683__$1 = (function (){var statearr_42710 = state_42683;
(statearr_42710[(11)] = inst_42656__$1);

(statearr_42710[(12)] = inst_42655);

return statearr_42710;
})();
if(cljs.core.truth_(inst_42657)){
var statearr_42712_44010 = state_42683__$1;
(statearr_42712_44010[(1)] = (8));

} else {
var statearr_42713_44011 = state_42683__$1;
(statearr_42713_44011[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42684 === (14))){
var inst_42676 = (state_42683[(2)]);
var inst_42677 = cljs.core.async.close_BANG_(out);
var state_42683__$1 = (function (){var statearr_42718 = state_42683;
(statearr_42718[(13)] = inst_42676);

return statearr_42718;
})();
var statearr_42719_44013 = state_42683__$1;
(statearr_42719_44013[(2)] = inst_42677);

(statearr_42719_44013[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42684 === (10))){
var inst_42667 = (state_42683[(2)]);
var state_42683__$1 = state_42683;
var statearr_42723_44014 = state_42683__$1;
(statearr_42723_44014[(2)] = inst_42667);

(statearr_42723_44014[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42684 === (8))){
var inst_42656 = (state_42683[(11)]);
var inst_42646 = (state_42683[(7)]);
var tmp42714 = inst_42646;
var inst_42646__$1 = tmp42714;
var inst_42647 = inst_42656;
var state_42683__$1 = (function (){var statearr_42725 = state_42683;
(statearr_42725[(7)] = inst_42646__$1);

(statearr_42725[(8)] = inst_42647);

return statearr_42725;
})();
var statearr_42726_44018 = state_42683__$1;
(statearr_42726_44018[(2)] = null);

(statearr_42726_44018[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38811__auto__ = null;
var cljs$core$async$state_machine__38811__auto____0 = (function (){
var statearr_42733 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_42733[(0)] = cljs$core$async$state_machine__38811__auto__);

(statearr_42733[(1)] = (1));

return statearr_42733;
});
var cljs$core$async$state_machine__38811__auto____1 = (function (state_42683){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_42683);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e42738){var ex__38814__auto__ = e42738;
var statearr_42739_44019 = state_42683;
(statearr_42739_44019[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_42683[(4)]))){
var statearr_42740_44020 = state_42683;
(statearr_42740_44020[(1)] = cljs.core.first((state_42683[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__44021 = state_42683;
state_42683 = G__44021;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$state_machine__38811__auto__ = function(state_42683){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38811__auto____1.call(this,state_42683);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38811__auto____0;
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38811__auto____1;
return cljs$core$async$state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_42748 = f__39219__auto__();
(statearr_42748[(6)] = c__39218__auto___43998);

return statearr_42748;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__42762 = arguments.length;
switch (G__42762) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__39218__auto___44023 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__39219__auto__ = (function (){var switch__38810__auto__ = (function (state_42824){
var state_val_42825 = (state_42824[(1)]);
if((state_val_42825 === (7))){
var inst_42817 = (state_42824[(2)]);
var state_42824__$1 = state_42824;
var statearr_42828_44024 = state_42824__$1;
(statearr_42828_44024[(2)] = inst_42817);

(statearr_42828_44024[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42825 === (1))){
var inst_42767 = [];
var inst_42768 = inst_42767;
var inst_42769 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_42824__$1 = (function (){var statearr_42829 = state_42824;
(statearr_42829[(7)] = inst_42768);

(statearr_42829[(8)] = inst_42769);

return statearr_42829;
})();
var statearr_42830_44025 = state_42824__$1;
(statearr_42830_44025[(2)] = null);

(statearr_42830_44025[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42825 === (4))){
var inst_42772 = (state_42824[(9)]);
var inst_42772__$1 = (state_42824[(2)]);
var inst_42773 = (inst_42772__$1 == null);
var inst_42774 = cljs.core.not(inst_42773);
var state_42824__$1 = (function (){var statearr_42833 = state_42824;
(statearr_42833[(9)] = inst_42772__$1);

return statearr_42833;
})();
if(inst_42774){
var statearr_42834_44026 = state_42824__$1;
(statearr_42834_44026[(1)] = (5));

} else {
var statearr_42835_44027 = state_42824__$1;
(statearr_42835_44027[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42825 === (15))){
var inst_42768 = (state_42824[(7)]);
var inst_42806 = cljs.core.vec(inst_42768);
var state_42824__$1 = state_42824;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42824__$1,(18),out,inst_42806);
} else {
if((state_val_42825 === (13))){
var inst_42800 = (state_42824[(2)]);
var state_42824__$1 = state_42824;
var statearr_42839_44028 = state_42824__$1;
(statearr_42839_44028[(2)] = inst_42800);

(statearr_42839_44028[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42825 === (6))){
var inst_42768 = (state_42824[(7)]);
var inst_42802 = inst_42768.length;
var inst_42803 = (inst_42802 > (0));
var state_42824__$1 = state_42824;
if(cljs.core.truth_(inst_42803)){
var statearr_42840_44029 = state_42824__$1;
(statearr_42840_44029[(1)] = (15));

} else {
var statearr_42841_44030 = state_42824__$1;
(statearr_42841_44030[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42825 === (17))){
var inst_42813 = (state_42824[(2)]);
var inst_42815 = cljs.core.async.close_BANG_(out);
var state_42824__$1 = (function (){var statearr_42843 = state_42824;
(statearr_42843[(10)] = inst_42813);

return statearr_42843;
})();
var statearr_42844_44031 = state_42824__$1;
(statearr_42844_44031[(2)] = inst_42815);

(statearr_42844_44031[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42825 === (3))){
var inst_42822 = (state_42824[(2)]);
var state_42824__$1 = state_42824;
return cljs.core.async.impl.ioc_helpers.return_chan(state_42824__$1,inst_42822);
} else {
if((state_val_42825 === (12))){
var inst_42768 = (state_42824[(7)]);
var inst_42793 = cljs.core.vec(inst_42768);
var state_42824__$1 = state_42824;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_42824__$1,(14),out,inst_42793);
} else {
if((state_val_42825 === (2))){
var state_42824__$1 = state_42824;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_42824__$1,(4),ch);
} else {
if((state_val_42825 === (11))){
var inst_42772 = (state_42824[(9)]);
var inst_42768 = (state_42824[(7)]);
var inst_42780 = (state_42824[(11)]);
var inst_42788 = inst_42768.push(inst_42772);
var tmp42845 = inst_42768;
var inst_42768__$1 = tmp42845;
var inst_42769 = inst_42780;
var state_42824__$1 = (function (){var statearr_42852 = state_42824;
(statearr_42852[(7)] = inst_42768__$1);

(statearr_42852[(8)] = inst_42769);

(statearr_42852[(12)] = inst_42788);

return statearr_42852;
})();
var statearr_42853_44033 = state_42824__$1;
(statearr_42853_44033[(2)] = null);

(statearr_42853_44033[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42825 === (9))){
var inst_42769 = (state_42824[(8)]);
var inst_42784 = cljs.core.keyword_identical_QMARK_(inst_42769,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_42824__$1 = state_42824;
var statearr_42858_44035 = state_42824__$1;
(statearr_42858_44035[(2)] = inst_42784);

(statearr_42858_44035[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42825 === (5))){
var inst_42772 = (state_42824[(9)]);
var inst_42780 = (state_42824[(11)]);
var inst_42769 = (state_42824[(8)]);
var inst_42781 = (state_42824[(13)]);
var inst_42780__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_42772) : f.call(null,inst_42772));
var inst_42781__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_42780__$1,inst_42769);
var state_42824__$1 = (function (){var statearr_42859 = state_42824;
(statearr_42859[(11)] = inst_42780__$1);

(statearr_42859[(13)] = inst_42781__$1);

return statearr_42859;
})();
if(inst_42781__$1){
var statearr_42860_44037 = state_42824__$1;
(statearr_42860_44037[(1)] = (8));

} else {
var statearr_42862_44038 = state_42824__$1;
(statearr_42862_44038[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42825 === (14))){
var inst_42772 = (state_42824[(9)]);
var inst_42780 = (state_42824[(11)]);
var inst_42795 = (state_42824[(2)]);
var inst_42796 = [];
var inst_42797 = inst_42796.push(inst_42772);
var inst_42768 = inst_42796;
var inst_42769 = inst_42780;
var state_42824__$1 = (function (){var statearr_42863 = state_42824;
(statearr_42863[(7)] = inst_42768);

(statearr_42863[(14)] = inst_42797);

(statearr_42863[(8)] = inst_42769);

(statearr_42863[(15)] = inst_42795);

return statearr_42863;
})();
var statearr_42864_44039 = state_42824__$1;
(statearr_42864_44039[(2)] = null);

(statearr_42864_44039[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42825 === (16))){
var state_42824__$1 = state_42824;
var statearr_42867_44040 = state_42824__$1;
(statearr_42867_44040[(2)] = null);

(statearr_42867_44040[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42825 === (10))){
var inst_42786 = (state_42824[(2)]);
var state_42824__$1 = state_42824;
if(cljs.core.truth_(inst_42786)){
var statearr_42871_44041 = state_42824__$1;
(statearr_42871_44041[(1)] = (11));

} else {
var statearr_42872_44042 = state_42824__$1;
(statearr_42872_44042[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42825 === (18))){
var inst_42810 = (state_42824[(2)]);
var state_42824__$1 = state_42824;
var statearr_42873_44043 = state_42824__$1;
(statearr_42873_44043[(2)] = inst_42810);

(statearr_42873_44043[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_42825 === (8))){
var inst_42781 = (state_42824[(13)]);
var state_42824__$1 = state_42824;
var statearr_42874_44046 = state_42824__$1;
(statearr_42874_44046[(2)] = inst_42781);

(statearr_42874_44046[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__38811__auto__ = null;
var cljs$core$async$state_machine__38811__auto____0 = (function (){
var statearr_42875 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_42875[(0)] = cljs$core$async$state_machine__38811__auto__);

(statearr_42875[(1)] = (1));

return statearr_42875;
});
var cljs$core$async$state_machine__38811__auto____1 = (function (state_42824){
while(true){
var ret_value__38812__auto__ = (function (){try{while(true){
var result__38813__auto__ = switch__38810__auto__(state_42824);
if(cljs.core.keyword_identical_QMARK_(result__38813__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__38813__auto__;
}
break;
}
}catch (e42876){var ex__38814__auto__ = e42876;
var statearr_42877_44047 = state_42824;
(statearr_42877_44047[(2)] = ex__38814__auto__);


if(cljs.core.seq((state_42824[(4)]))){
var statearr_42878_44048 = state_42824;
(statearr_42878_44048[(1)] = cljs.core.first((state_42824[(4)])));

} else {
throw ex__38814__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__38812__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__44049 = state_42824;
state_42824 = G__44049;
continue;
} else {
return ret_value__38812__auto__;
}
break;
}
});
cljs$core$async$state_machine__38811__auto__ = function(state_42824){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__38811__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__38811__auto____1.call(this,state_42824);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__38811__auto____0;
cljs$core$async$state_machine__38811__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__38811__auto____1;
return cljs$core$async$state_machine__38811__auto__;
})()
})();
var state__39220__auto__ = (function (){var statearr_42879 = f__39219__auto__();
(statearr_42879[(6)] = c__39218__auto___44023);

return statearr_42879;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__39220__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
