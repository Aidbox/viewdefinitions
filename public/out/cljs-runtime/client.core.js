goog.provide('client.core');
client.core.dev_setup = (function client$core$dev_setup(){
if(client.config.debug_QMARK_){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["dev mode"], 0));
} else {
return null;
}
});
client.core.compiler = reagent.core.create_compiler(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"function-components","function-components",1492814963),true], null));
client.core.mount_root = (function client$core$mount_root(){
re_frame.core.clear_subscription_cache_BANG_();

var root_el = document.getElementById("app");
reagent.dom.unmount_component_at_node(root_el);

return reagent.dom.render.cljs$core$IFn$_invoke$arity$3(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [client.views.core.main_panel], null),root_el,client.core.compiler);
});
client.core.init = (function client$core$init(){
client.routes.start_BANG_();

re_frame.core.dispatch(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("client.events","initialize-db","client.events/initialize-db",402622516)], null));

client.core.dev_setup();

return client.core.mount_root();
});
client.core.init();

//# sourceMappingURL=client.core.js.map
