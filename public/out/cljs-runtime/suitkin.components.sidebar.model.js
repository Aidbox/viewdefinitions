goog.provide('suitkin.components.sidebar.model');
suitkin.components.sidebar.model.open_menu_item_QMARK_ = (function suitkin$components$sidebar$model$open_menu_item_QMARK_(item){
return cljs.core.some(new cljs.core.Keyword(null,"active","active",1895962068),new cljs.core.Keyword(null,"items","items",1031954938).cljs$core$IFn$_invoke$arity$1(item));
});
suitkin.components.sidebar.model.on_open_menu = (function suitkin$components$sidebar$model$on_open_menu(item){
return suitkin.utils.set_storage_item(new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item),true);
});
suitkin.components.sidebar.model.on_close_menu = (function suitkin$components$sidebar$model$on_close_menu(item){
return suitkin.utils.remove_storage_item(new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item));
});
suitkin.components.sidebar.model.open_before_QMARK_ = (function suitkin$components$sidebar$model$open_before_QMARK_(item){
return suitkin.utils.get_storage_item(new cljs.core.Keyword(null,"title","title",636505583).cljs$core$IFn$_invoke$arity$1(item));
});

//# sourceMappingURL=suitkin.components.sidebar.model.js.map
