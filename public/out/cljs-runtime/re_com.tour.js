goog.provide('re_com.tour');
/**
 * Returns a map containing
 *   - A reagent atom for each tour step controlling popover show/hide (boolean)
 *   - A standard atom holding the current step (integer)
 *   - A copy of the steps parameter passed in, to determine the order for prev/next functions
 *   It sets the first step atom to true so that it will be initially shown
 *   Sample return value:
 *   {:steps [:step1 :step2 :step3]
 *   :current-step (atom 0)
 *   :step1 (reagent/atom true)
 *   :step2 (reagent/atom false)
 *   :step3 (reagent/atom false)}
 */
re_com.tour.make_tour = (function re_com$tour$make_tour(tour_spec){
var tour_map = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"current-step","current-step",-2023410137),cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0)),new cljs.core.Keyword(null,"steps","steps",-128433302),tour_spec], null);
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (p1__39512_SHARP_,p2__39513_SHARP_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__39512_SHARP_,p2__39513_SHARP_,reagent.core.atom.cljs$core$IFn$_invoke$arity$1(false));
}),tour_map,tour_spec);
});
/**
 * Resets all poover atoms to false
 */
re_com.tour.initialise_tour = (function re_com$tour$initialise_tour(tour){
return cljs.core.doall.cljs$core$IFn$_invoke$arity$1((function (){var iter__5523__auto__ = (function re_com$tour$initialise_tour_$_iter__39518(s__39519){
return (new cljs.core.LazySeq(null,(function (){
var s__39519__$1 = s__39519;
while(true){
var temp__5804__auto__ = cljs.core.seq(s__39519__$1);
if(temp__5804__auto__){
var s__39519__$2 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(s__39519__$2)){
var c__5521__auto__ = cljs.core.chunk_first(s__39519__$2);
var size__5522__auto__ = cljs.core.count(c__5521__auto__);
var b__39521 = cljs.core.chunk_buffer(size__5522__auto__);
if((function (){var i__39520 = (0);
while(true){
if((i__39520 < size__5522__auto__)){
var step = cljs.core._nth(c__5521__auto__,i__39520);
cljs.core.chunk_append(b__39521,cljs.core.reset_BANG_((step.cljs$core$IFn$_invoke$arity$1 ? step.cljs$core$IFn$_invoke$arity$1(tour) : step.call(null,tour)),false));

var G__39622 = (i__39520 + (1));
i__39520 = G__39622;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__39521),re_com$tour$initialise_tour_$_iter__39518(cljs.core.chunk_rest(s__39519__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__39521),null);
}
} else {
var step = cljs.core.first(s__39519__$2);
return cljs.core.cons(cljs.core.reset_BANG_((step.cljs$core$IFn$_invoke$arity$1 ? step.cljs$core$IFn$_invoke$arity$1(tour) : step.call(null,tour)),false),re_com$tour$initialise_tour_$_iter__39518(cljs.core.rest(s__39519__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5523__auto__(new cljs.core.Keyword(null,"steps","steps",-128433302).cljs$core$IFn$_invoke$arity$1(tour));
})());
});
/**
 * Sets the first popover atom in the tour to true
 */
re_com.tour.start_tour = (function re_com$tour$start_tour(tour){
re_com.tour.initialise_tour(tour);

cljs.core.reset_BANG_(new cljs.core.Keyword(null,"current-step","current-step",-2023410137).cljs$core$IFn$_invoke$arity$1(tour),(0));

return cljs.core.reset_BANG_((function (){var fexpr__39560 = cljs.core.first(new cljs.core.Keyword(null,"steps","steps",-128433302).cljs$core$IFn$_invoke$arity$1(tour));
return (fexpr__39560.cljs$core$IFn$_invoke$arity$1 ? fexpr__39560.cljs$core$IFn$_invoke$arity$1(tour) : fexpr__39560.call(null,tour));
})(),true);
});
/**
 * Closes all tour popovers
 */
re_com.tour.finish_tour = (function re_com$tour$finish_tour(tour){
return re_com.tour.initialise_tour(tour);
});
re_com.tour.next_tour_step = (function re_com$tour$next_tour_step(tour){
var steps = new cljs.core.Keyword(null,"steps","steps",-128433302).cljs$core$IFn$_invoke$arity$1(tour);
var old_step = cljs.core.deref(new cljs.core.Keyword(null,"current-step","current-step",-2023410137).cljs$core$IFn$_invoke$arity$1(tour));
var new_step = (old_step + (1));
if((new_step < cljs.core.count(new cljs.core.Keyword(null,"steps","steps",-128433302).cljs$core$IFn$_invoke$arity$1(tour)))){
cljs.core.reset_BANG_(new cljs.core.Keyword(null,"current-step","current-step",-2023410137).cljs$core$IFn$_invoke$arity$1(tour),new_step);

cljs.core.reset_BANG_((function (){var fexpr__39578 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(steps,old_step);
return (fexpr__39578.cljs$core$IFn$_invoke$arity$1 ? fexpr__39578.cljs$core$IFn$_invoke$arity$1(tour) : fexpr__39578.call(null,tour));
})(),false);

return cljs.core.reset_BANG_((function (){var fexpr__39581 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(steps,new_step);
return (fexpr__39581.cljs$core$IFn$_invoke$arity$1 ? fexpr__39581.cljs$core$IFn$_invoke$arity$1(tour) : fexpr__39581.call(null,tour));
})(),true);
} else {
return null;
}
});
re_com.tour.prev_tour_step = (function re_com$tour$prev_tour_step(tour){
var steps = new cljs.core.Keyword(null,"steps","steps",-128433302).cljs$core$IFn$_invoke$arity$1(tour);
var old_step = cljs.core.deref(new cljs.core.Keyword(null,"current-step","current-step",-2023410137).cljs$core$IFn$_invoke$arity$1(tour));
var new_step = (old_step - (1));
if((new_step >= (0))){
cljs.core.reset_BANG_(new cljs.core.Keyword(null,"current-step","current-step",-2023410137).cljs$core$IFn$_invoke$arity$1(tour),new_step);

cljs.core.reset_BANG_((function (){var fexpr__39588 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(steps,old_step);
return (fexpr__39588.cljs$core$IFn$_invoke$arity$1 ? fexpr__39588.cljs$core$IFn$_invoke$arity$1(tour) : fexpr__39588.call(null,tour));
})(),false);

return cljs.core.reset_BANG_((function (){var fexpr__39592 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(steps,new_step);
return (fexpr__39592.cljs$core$IFn$_invoke$arity$1 ? fexpr__39592.cljs$core$IFn$_invoke$arity$1(tour) : fexpr__39592.call(null,tour));
})(),true);
} else {
return null;
}
});
/**
 * Generate the hr and previous/next buttons markup.
 *   If first button in tour, don't generate a Previous button.
 *   If last button in tour, change Next button to a Finish button
 */
re_com.tour.make_tour_nav = (function re_com$tour$make_tour_nav(tour){
var on_first_button = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(new cljs.core.Keyword(null,"current-step","current-step",-2023410137).cljs$core$IFn$_invoke$arity$1(tour)),(0));
var on_last_button = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(new cljs.core.Keyword(null,"current-step","current-step",-2023410137).cljs$core$IFn$_invoke$arity$1(tour)),(cljs.core.count(new cljs.core.Keyword(null,"steps","steps",-128433302).cljs$core$IFn$_invoke$arity$1(tour)) - (1)));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"hr","hr",1377740067),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([re_com.box.flex_child_style("none"),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin","margin",-995903681),"10px 0px 10px"], null)], 0))], null)], null),((on_first_button)?null:new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_com.buttons.button,new cljs.core.Keyword(null,"label","label",1718410804),"Previous",new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (event){
re_com.tour.prev_tour_step(tour);

return null;
}),new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"margin-right","margin-right",809689658),"15px"], null),new cljs.core.Keyword(null,"class","class",-2030961996),"btn-default"], null)),new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [re_com.buttons.button,new cljs.core.Keyword(null,"label","label",1718410804),((on_last_button)?"Finish":"Next"),new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (event){
if(on_last_button){
re_com.tour.finish_tour(tour);
} else {
re_com.tour.next_tour_step(tour);
}

return null;
}),new cljs.core.Keyword(null,"class","class",-2030961996),"btn-default"], null)], null);
});

//# sourceMappingURL=re_com.tour.js.map
