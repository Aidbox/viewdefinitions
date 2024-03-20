goog.provide('re_frisk.subs_graph');
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.subs_graph !== 'undefined') && (typeof re_frisk.subs_graph.network !== 'undefined')){
} else {
re_frisk.subs_graph.network = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.subs_graph !== 'undefined') && (typeof re_frisk.subs_graph.reaction__GT_operation !== 'undefined')){
} else {
re_frisk.subs_graph.reaction__GT_operation = re_frisk.inlined_deps.reagent.v1v0v0.reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.subs_graph !== 'undefined') && (typeof re_frisk.subs_graph.view__GT_reactions !== 'undefined')){
} else {
re_frisk.subs_graph.view__GT_reactions = re_frisk.inlined_deps.reagent.v1v0v0.reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.subs_graph !== 'undefined') && (typeof re_frisk.subs_graph.vis !== 'undefined')){
} else {
re_frisk.subs_graph.vis = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.subs_graph !== 'undefined') && (typeof re_frisk.subs_graph.doc !== 'undefined')){
} else {
re_frisk.subs_graph.doc = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.subs_graph !== 'undefined') && (typeof re_frisk.subs_graph.nodes !== 'undefined')){
} else {
re_frisk.subs_graph.nodes = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.subs_graph !== 'undefined') && (typeof re_frisk.subs_graph.edges !== 'undefined')){
} else {
re_frisk.subs_graph.edges = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.subs_graph !== 'undefined') && (typeof re_frisk.subs_graph.options !== 'undefined')){
} else {
re_frisk.subs_graph.options = cljs.core.clj__GT_js(new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"physics","physics",-1254209137),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"solver","solver",-744421825),"forceAtlas2Based",new cljs.core.Keyword(null,"maxVelocity","maxVelocity",1721643083),(30),new cljs.core.Keyword(null,"minVelocity","minVelocity",-32716928),(10),new cljs.core.Keyword(null,"stabilization","stabilization",-1209068026),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"iterations","iterations",-1402710890),(30)], null)], null)], null));
}
re_frisk.subs_graph.init = (function re_frisk$subs_graph$init(win,document){
cljs.core.reset_BANG_(re_frisk.subs_graph.vis,win.vis);

return cljs.core.reset_BANG_(re_frisk.subs_graph.doc,document);
});
re_frisk.subs_graph.set_root_node = (function re_frisk$subs_graph$set_root_node(reaction){
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.nodes),reaction))){
return null;
} else {
var data = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),"app-db",new cljs.core.Keyword(null,"label","label",1718410804),"app-db",new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),new cljs.core.Keyword(null,"yellow","yellow",-881035449)], null)], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.nodes,cljs.core.assoc,reaction,data);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.reaction__GT_operation,cljs.core.assoc,reaction,"app-db");

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
return new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).nodes.add(cljs.core.clj__GT_js(data));
} else {
return null;
}
}
});
re_frisk.subs_graph.destroy = (function re_frisk$subs_graph$destroy(){
var temp__5804__auto__ = new cljs.core.Keyword(null,"network","network",2050004697).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network));
if(cljs.core.truth_(temp__5804__auto__)){
var network_js = temp__5804__auto__;
network_js.destroy();

return cljs.core.reset_BANG_(re_frisk.subs_graph.network,null);
} else {
return null;
}
});
re_frisk.subs_graph.create = (function re_frisk$subs_graph$create(){
re_frisk.subs_graph.destroy();

if(cljs.core.truth_((function (){var and__5043__auto__ = cljs.core.deref(re_frisk.subs_graph.vis);
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.deref(re_frisk.subs_graph.doc);
} else {
return and__5043__auto__;
}
})())){
var Network = cljs.core.deref(re_frisk.subs_graph.vis).Network;
var DataSet = cljs.core.deref(re_frisk.subs_graph.vis).DataSet;
var nodes_ds = (new DataSet(cljs.core.clj__GT_js(cljs.core.vals(cljs.core.deref(re_frisk.subs_graph.nodes)))));
var edges_ds = (new DataSet(cljs.core.clj__GT_js(cljs.core.vals(cljs.core.deref(re_frisk.subs_graph.edges)))));
var data = ({"nodes": nodes_ds, "edges": edges_ds});
var temp__5804__auto__ = cljs.core.deref(re_frisk.subs_graph.doc).getElementById("global-subs-graph-container");
if(cljs.core.truth_(temp__5804__auto__)){
var container = temp__5804__auto__;
return cljs.core.reset_BANG_(re_frisk.subs_graph.network,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"data","data",-232669377),data,new cljs.core.Keyword(null,"network","network",2050004697),(new Network(container,data,re_frisk.subs_graph.options))], null));
} else {
return null;
}
} else {
return null;
}
});
re_frisk.subs_graph.update_subs = (function re_frisk$subs_graph$update_subs(traces){
var temp__5804__auto___37522 = new cljs.core.Keyword(null,"app-db-reaction","app-db-reaction",-269835135).cljs$core$IFn$_invoke$arity$1(cljs.core.first(traces));
if(cljs.core.truth_(temp__5804__auto___37522)){
var app_db_reaction_37523 = temp__5804__auto___37522;
re_frisk.subs_graph.set_root_node(app_db_reaction_37523);
} else {
}

var seq__36556_37524 = cljs.core.seq(traces);
var chunk__36557_37525 = null;
var count__36558_37526 = (0);
var i__36559_37527 = (0);
while(true){
if((i__36559_37527 < count__36558_37526)){
var map__36649_37528 = chunk__36557_37525.cljs$core$IIndexed$_nth$arity$2(null,i__36559_37527);
var map__36649_37529__$1 = cljs.core.__destructure_map(map__36649_37528);
var subs_37530 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36649_37529__$1,new cljs.core.Keyword(null,"subs","subs",-186681991));
var seq__36650_37531 = cljs.core.seq(subs_37530);
var chunk__36651_37532 = null;
var count__36652_37533 = (0);
var i__36653_37534 = (0);
while(true){
if((i__36653_37534 < count__36652_37533)){
var map__36663_37535 = chunk__36651_37532.cljs$core$IIndexed$_nth$arity$2(null,i__36653_37534);
var map__36663_37536__$1 = cljs.core.__destructure_map(map__36663_37535);
var operation_37537 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36663_37536__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var reaction_37538 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36663_37536__$1,new cljs.core.Keyword(null,"reaction","reaction",490869788));
if(cljs.core.truth_(reaction_37538)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.reaction__GT_operation,cljs.core.assoc,reaction_37538,operation_37537);
} else {
}


var G__37539 = seq__36650_37531;
var G__37540 = chunk__36651_37532;
var G__37541 = count__36652_37533;
var G__37542 = (i__36653_37534 + (1));
seq__36650_37531 = G__37539;
chunk__36651_37532 = G__37540;
count__36652_37533 = G__37541;
i__36653_37534 = G__37542;
continue;
} else {
var temp__5804__auto___37543 = cljs.core.seq(seq__36650_37531);
if(temp__5804__auto___37543){
var seq__36650_37545__$1 = temp__5804__auto___37543;
if(cljs.core.chunked_seq_QMARK_(seq__36650_37545__$1)){
var c__5568__auto___37546 = cljs.core.chunk_first(seq__36650_37545__$1);
var G__37547 = cljs.core.chunk_rest(seq__36650_37545__$1);
var G__37548 = c__5568__auto___37546;
var G__37549 = cljs.core.count(c__5568__auto___37546);
var G__37550 = (0);
seq__36650_37531 = G__37547;
chunk__36651_37532 = G__37548;
count__36652_37533 = G__37549;
i__36653_37534 = G__37550;
continue;
} else {
var map__36668_37551 = cljs.core.first(seq__36650_37545__$1);
var map__36668_37552__$1 = cljs.core.__destructure_map(map__36668_37551);
var operation_37553 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36668_37552__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var reaction_37554 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36668_37552__$1,new cljs.core.Keyword(null,"reaction","reaction",490869788));
if(cljs.core.truth_(reaction_37554)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.reaction__GT_operation,cljs.core.assoc,reaction_37554,operation_37553);
} else {
}


var G__37556 = cljs.core.next(seq__36650_37545__$1);
var G__37557 = null;
var G__37558 = (0);
var G__37559 = (0);
seq__36650_37531 = G__37556;
chunk__36651_37532 = G__37557;
count__36652_37533 = G__37558;
i__36653_37534 = G__37559;
continue;
}
} else {
}
}
break;
}


var G__37560 = seq__36556_37524;
var G__37561 = chunk__36557_37525;
var G__37562 = count__36558_37526;
var G__37563 = (i__36559_37527 + (1));
seq__36556_37524 = G__37560;
chunk__36557_37525 = G__37561;
count__36558_37526 = G__37562;
i__36559_37527 = G__37563;
continue;
} else {
var temp__5804__auto___37564 = cljs.core.seq(seq__36556_37524);
if(temp__5804__auto___37564){
var seq__36556_37566__$1 = temp__5804__auto___37564;
if(cljs.core.chunked_seq_QMARK_(seq__36556_37566__$1)){
var c__5568__auto___37567 = cljs.core.chunk_first(seq__36556_37566__$1);
var G__37568 = cljs.core.chunk_rest(seq__36556_37566__$1);
var G__37569 = c__5568__auto___37567;
var G__37570 = cljs.core.count(c__5568__auto___37567);
var G__37571 = (0);
seq__36556_37524 = G__37568;
chunk__36557_37525 = G__37569;
count__36558_37526 = G__37570;
i__36559_37527 = G__37571;
continue;
} else {
var map__36671_37572 = cljs.core.first(seq__36556_37566__$1);
var map__36671_37573__$1 = cljs.core.__destructure_map(map__36671_37572);
var subs_37574 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36671_37573__$1,new cljs.core.Keyword(null,"subs","subs",-186681991));
var seq__36672_37575 = cljs.core.seq(subs_37574);
var chunk__36673_37576 = null;
var count__36674_37577 = (0);
var i__36675_37578 = (0);
while(true){
if((i__36675_37578 < count__36674_37577)){
var map__36681_37579 = chunk__36673_37576.cljs$core$IIndexed$_nth$arity$2(null,i__36675_37578);
var map__36681_37580__$1 = cljs.core.__destructure_map(map__36681_37579);
var operation_37581 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36681_37580__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var reaction_37582 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36681_37580__$1,new cljs.core.Keyword(null,"reaction","reaction",490869788));
if(cljs.core.truth_(reaction_37582)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.reaction__GT_operation,cljs.core.assoc,reaction_37582,operation_37581);
} else {
}


var G__37584 = seq__36672_37575;
var G__37585 = chunk__36673_37576;
var G__37586 = count__36674_37577;
var G__37587 = (i__36675_37578 + (1));
seq__36672_37575 = G__37584;
chunk__36673_37576 = G__37585;
count__36674_37577 = G__37586;
i__36675_37578 = G__37587;
continue;
} else {
var temp__5804__auto___37589__$1 = cljs.core.seq(seq__36672_37575);
if(temp__5804__auto___37589__$1){
var seq__36672_37590__$1 = temp__5804__auto___37589__$1;
if(cljs.core.chunked_seq_QMARK_(seq__36672_37590__$1)){
var c__5568__auto___37591 = cljs.core.chunk_first(seq__36672_37590__$1);
var G__37592 = cljs.core.chunk_rest(seq__36672_37590__$1);
var G__37593 = c__5568__auto___37591;
var G__37594 = cljs.core.count(c__5568__auto___37591);
var G__37595 = (0);
seq__36672_37575 = G__37592;
chunk__36673_37576 = G__37593;
count__36674_37577 = G__37594;
i__36675_37578 = G__37595;
continue;
} else {
var map__36688_37596 = cljs.core.first(seq__36672_37590__$1);
var map__36688_37597__$1 = cljs.core.__destructure_map(map__36688_37596);
var operation_37598 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36688_37597__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var reaction_37599 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__36688_37597__$1,new cljs.core.Keyword(null,"reaction","reaction",490869788));
if(cljs.core.truth_(reaction_37599)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.reaction__GT_operation,cljs.core.assoc,reaction_37599,operation_37598);
} else {
}


var G__37602 = cljs.core.next(seq__36672_37590__$1);
var G__37603 = null;
var G__37604 = (0);
var G__37605 = (0);
seq__36672_37575 = G__37602;
chunk__36673_37576 = G__37603;
count__36674_37577 = G__37604;
i__36675_37578 = G__37605;
continue;
}
} else {
}
}
break;
}


var G__37606 = cljs.core.next(seq__36556_37566__$1);
var G__37607 = null;
var G__37608 = (0);
var G__37609 = (0);
seq__36556_37524 = G__37606;
chunk__36557_37525 = G__37607;
count__36558_37526 = G__37608;
i__36559_37527 = G__37609;
continue;
}
} else {
}
}
break;
}

var new_nodes = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var seq__36695_37610 = cljs.core.seq(traces);
var chunk__36696_37611 = null;
var count__36697_37612 = (0);
var i__36698_37613 = (0);
while(true){
if((i__36698_37613 < count__36697_37612)){
var map__37096_37615 = chunk__36696_37611.cljs$core$IIndexed$_nth$arity$2(null,i__36698_37613);
var map__37096_37616__$1 = cljs.core.__destructure_map(map__37096_37615);
var subs_37617 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37096_37616__$1,new cljs.core.Keyword(null,"subs","subs",-186681991));
var seq__37099_37618 = cljs.core.seq(subs_37617);
var chunk__37100_37619 = null;
var count__37101_37620 = (0);
var i__37102_37621 = (0);
while(true){
if((i__37102_37621 < count__37101_37620)){
var map__37214_37622 = chunk__37100_37619.cljs$core$IIndexed$_nth$arity$2(null,i__37102_37621);
var map__37214_37623__$1 = cljs.core.__destructure_map(map__37214_37622);
var op_type_37624 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37214_37623__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var input_signals_37625 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37214_37623__$1,new cljs.core.Keyword(null,"input-signals","input-signals",563633497));
var operation_37626 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37214_37623__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var reaction_37627 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37214_37623__$1,new cljs.core.Keyword(null,"reaction","reaction",490869788));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(op_type_37624,new cljs.core.Keyword(null,"create-class","create-class",1988524183))){
if(cljs.core.truth_((function (){var and__5043__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type_37624,new cljs.core.Keyword(null,"render","render",-1408033454));
if(and__5043__auto__){
return input_signals_37625;
} else {
return and__5043__auto__;
}
})())){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.view__GT_reactions,cljs.core.assoc,operation_37626,input_signals_37625);
} else {
}

var operation_37628__$1 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(operation_37626);
if(cljs.core.truth_(reaction_37627)){
var temp__5802__auto___37629 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.nodes),operation_37628__$1);
if(cljs.core.truth_(temp__5802__auto___37629)){
var old_reaction_37630 = temp__5802__auto___37629;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(op_type_37624,new cljs.core.Keyword(null,"op-type","op-type",-1636141668).cljs$core$IFn$_invoke$arity$1(old_reaction_37630))){
var updated_node_37631 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(old_reaction_37630,new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type_37624,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),cljs.core.get.cljs$core$IFn$_invoke$arity$2(re_frisk.ui.components.colors.sub_colors,op_type_37624)], null)], 0));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.nodes,cljs.core.assoc,operation_37628__$1,updated_node_37631);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(new_nodes),operation_37628__$1))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new_nodes,cljs.core.assoc,operation_37628__$1,updated_node_37631);
} else {
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).nodes.update(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [updated_node_37631], null)));
}
} else {
}
} else {
}
} else {
var data_37637 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),operation_37628__$1,new cljs.core.Keyword(null,"label","label",1718410804),operation_37628__$1,new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),cljs.core.get.cljs$core$IFn$_invoke$arity$2(re_frisk.ui.components.colors.sub_colors,op_type_37624)], null),new cljs.core.Keyword(null,"font","font",-1506159249),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"white","white",-483998618)], null),new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type_37624], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.nodes,cljs.core.assoc,operation_37628__$1,data_37637);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new_nodes,cljs.core.assoc,operation_37628__$1,data_37637);
}
} else {
}

if(cljs.core.truth_(input_signals_37625)){
var seq__37217_37643 = cljs.core.seq(input_signals_37625);
var chunk__37218_37644 = null;
var count__37219_37645 = (0);
var i__37220_37646 = (0);
while(true){
if((i__37220_37646 < count__37219_37645)){
var input_reaction_37647 = chunk__37218_37644.cljs$core$IIndexed$_nth$arity$2(null,i__37220_37646);
var input_operation_37648 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.reaction__GT_operation),input_reaction_37647));
var reaction_path_37649 = [input_operation_37648,"-",operation_37628__$1].join('');
var temp__5802__auto___37650 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.edges),reaction_path_37649);
if(cljs.core.truth_(temp__5802__auto___37650)){
var old_edge_37651 = temp__5802__auto___37650;
var updated_edge_37652 = cljs.core.update.cljs$core$IFn$_invoke$arity$3(old_edge_37651,new cljs.core.Keyword(null,"value","value",305978217),cljs.core.inc);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37649,updated_edge_37652);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.update(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [updated_edge_37652], null)));
} else {
}
} else {
var data_37653 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),reaction_path_37649,new cljs.core.Keyword(null,"from","from",1815293044),input_operation_37648,new cljs.core.Keyword(null,"to","to",192099007),operation_37628__$1,new cljs.core.Keyword(null,"value","value",305978217),(1)], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37649,data_37653);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.add(cljs.core.clj__GT_js(data_37653));
} else {
}
}


var G__37654 = seq__37217_37643;
var G__37655 = chunk__37218_37644;
var G__37656 = count__37219_37645;
var G__37657 = (i__37220_37646 + (1));
seq__37217_37643 = G__37654;
chunk__37218_37644 = G__37655;
count__37219_37645 = G__37656;
i__37220_37646 = G__37657;
continue;
} else {
var temp__5804__auto___37658 = cljs.core.seq(seq__37217_37643);
if(temp__5804__auto___37658){
var seq__37217_37659__$1 = temp__5804__auto___37658;
if(cljs.core.chunked_seq_QMARK_(seq__37217_37659__$1)){
var c__5568__auto___37660 = cljs.core.chunk_first(seq__37217_37659__$1);
var G__37661 = cljs.core.chunk_rest(seq__37217_37659__$1);
var G__37662 = c__5568__auto___37660;
var G__37663 = cljs.core.count(c__5568__auto___37660);
var G__37664 = (0);
seq__37217_37643 = G__37661;
chunk__37218_37644 = G__37662;
count__37219_37645 = G__37663;
i__37220_37646 = G__37664;
continue;
} else {
var input_reaction_37665 = cljs.core.first(seq__37217_37659__$1);
var input_operation_37666 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.reaction__GT_operation),input_reaction_37665));
var reaction_path_37667 = [input_operation_37666,"-",operation_37628__$1].join('');
var temp__5802__auto___37668 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.edges),reaction_path_37667);
if(cljs.core.truth_(temp__5802__auto___37668)){
var old_edge_37669 = temp__5802__auto___37668;
var updated_edge_37670 = cljs.core.update.cljs$core$IFn$_invoke$arity$3(old_edge_37669,new cljs.core.Keyword(null,"value","value",305978217),cljs.core.inc);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37667,updated_edge_37670);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.update(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [updated_edge_37670], null)));
} else {
}
} else {
var data_37671 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),reaction_path_37667,new cljs.core.Keyword(null,"from","from",1815293044),input_operation_37666,new cljs.core.Keyword(null,"to","to",192099007),operation_37628__$1,new cljs.core.Keyword(null,"value","value",305978217),(1)], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37667,data_37671);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.add(cljs.core.clj__GT_js(data_37671));
} else {
}
}


var G__37672 = cljs.core.next(seq__37217_37659__$1);
var G__37673 = null;
var G__37674 = (0);
var G__37675 = (0);
seq__37217_37643 = G__37672;
chunk__37218_37644 = G__37673;
count__37219_37645 = G__37674;
i__37220_37646 = G__37675;
continue;
}
} else {
}
}
break;
}
} else {
}
} else {
}


var G__37676 = seq__37099_37618;
var G__37677 = chunk__37100_37619;
var G__37678 = count__37101_37620;
var G__37679 = (i__37102_37621 + (1));
seq__37099_37618 = G__37676;
chunk__37100_37619 = G__37677;
count__37101_37620 = G__37678;
i__37102_37621 = G__37679;
continue;
} else {
var temp__5804__auto___37680 = cljs.core.seq(seq__37099_37618);
if(temp__5804__auto___37680){
var seq__37099_37681__$1 = temp__5804__auto___37680;
if(cljs.core.chunked_seq_QMARK_(seq__37099_37681__$1)){
var c__5568__auto___37682 = cljs.core.chunk_first(seq__37099_37681__$1);
var G__37683 = cljs.core.chunk_rest(seq__37099_37681__$1);
var G__37684 = c__5568__auto___37682;
var G__37685 = cljs.core.count(c__5568__auto___37682);
var G__37686 = (0);
seq__37099_37618 = G__37683;
chunk__37100_37619 = G__37684;
count__37101_37620 = G__37685;
i__37102_37621 = G__37686;
continue;
} else {
var map__37244_37688 = cljs.core.first(seq__37099_37681__$1);
var map__37244_37689__$1 = cljs.core.__destructure_map(map__37244_37688);
var op_type_37690 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37244_37689__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var input_signals_37691 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37244_37689__$1,new cljs.core.Keyword(null,"input-signals","input-signals",563633497));
var operation_37692 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37244_37689__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var reaction_37693 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37244_37689__$1,new cljs.core.Keyword(null,"reaction","reaction",490869788));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(op_type_37690,new cljs.core.Keyword(null,"create-class","create-class",1988524183))){
if(cljs.core.truth_((function (){var and__5043__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type_37690,new cljs.core.Keyword(null,"render","render",-1408033454));
if(and__5043__auto__){
return input_signals_37691;
} else {
return and__5043__auto__;
}
})())){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.view__GT_reactions,cljs.core.assoc,operation_37692,input_signals_37691);
} else {
}

var operation_37694__$1 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(operation_37692);
if(cljs.core.truth_(reaction_37693)){
var temp__5802__auto___37696 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.nodes),operation_37694__$1);
if(cljs.core.truth_(temp__5802__auto___37696)){
var old_reaction_37697 = temp__5802__auto___37696;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(op_type_37690,new cljs.core.Keyword(null,"op-type","op-type",-1636141668).cljs$core$IFn$_invoke$arity$1(old_reaction_37697))){
var updated_node_37698 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(old_reaction_37697,new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type_37690,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),cljs.core.get.cljs$core$IFn$_invoke$arity$2(re_frisk.ui.components.colors.sub_colors,op_type_37690)], null)], 0));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.nodes,cljs.core.assoc,operation_37694__$1,updated_node_37698);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(new_nodes),operation_37694__$1))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new_nodes,cljs.core.assoc,operation_37694__$1,updated_node_37698);
} else {
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).nodes.update(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [updated_node_37698], null)));
}
} else {
}
} else {
}
} else {
var data_37701 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),operation_37694__$1,new cljs.core.Keyword(null,"label","label",1718410804),operation_37694__$1,new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),cljs.core.get.cljs$core$IFn$_invoke$arity$2(re_frisk.ui.components.colors.sub_colors,op_type_37690)], null),new cljs.core.Keyword(null,"font","font",-1506159249),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"white","white",-483998618)], null),new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type_37690], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.nodes,cljs.core.assoc,operation_37694__$1,data_37701);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new_nodes,cljs.core.assoc,operation_37694__$1,data_37701);
}
} else {
}

if(cljs.core.truth_(input_signals_37691)){
var seq__37249_37703 = cljs.core.seq(input_signals_37691);
var chunk__37250_37704 = null;
var count__37251_37705 = (0);
var i__37252_37706 = (0);
while(true){
if((i__37252_37706 < count__37251_37705)){
var input_reaction_37707 = chunk__37250_37704.cljs$core$IIndexed$_nth$arity$2(null,i__37252_37706);
var input_operation_37708 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.reaction__GT_operation),input_reaction_37707));
var reaction_path_37709 = [input_operation_37708,"-",operation_37694__$1].join('');
var temp__5802__auto___37710 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.edges),reaction_path_37709);
if(cljs.core.truth_(temp__5802__auto___37710)){
var old_edge_37711 = temp__5802__auto___37710;
var updated_edge_37712 = cljs.core.update.cljs$core$IFn$_invoke$arity$3(old_edge_37711,new cljs.core.Keyword(null,"value","value",305978217),cljs.core.inc);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37709,updated_edge_37712);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.update(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [updated_edge_37712], null)));
} else {
}
} else {
var data_37714 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),reaction_path_37709,new cljs.core.Keyword(null,"from","from",1815293044),input_operation_37708,new cljs.core.Keyword(null,"to","to",192099007),operation_37694__$1,new cljs.core.Keyword(null,"value","value",305978217),(1)], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37709,data_37714);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.add(cljs.core.clj__GT_js(data_37714));
} else {
}
}


var G__37716 = seq__37249_37703;
var G__37717 = chunk__37250_37704;
var G__37718 = count__37251_37705;
var G__37719 = (i__37252_37706 + (1));
seq__37249_37703 = G__37716;
chunk__37250_37704 = G__37717;
count__37251_37705 = G__37718;
i__37252_37706 = G__37719;
continue;
} else {
var temp__5804__auto___37720__$1 = cljs.core.seq(seq__37249_37703);
if(temp__5804__auto___37720__$1){
var seq__37249_37721__$1 = temp__5804__auto___37720__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37249_37721__$1)){
var c__5568__auto___37722 = cljs.core.chunk_first(seq__37249_37721__$1);
var G__37723 = cljs.core.chunk_rest(seq__37249_37721__$1);
var G__37724 = c__5568__auto___37722;
var G__37725 = cljs.core.count(c__5568__auto___37722);
var G__37726 = (0);
seq__37249_37703 = G__37723;
chunk__37250_37704 = G__37724;
count__37251_37705 = G__37725;
i__37252_37706 = G__37726;
continue;
} else {
var input_reaction_37727 = cljs.core.first(seq__37249_37721__$1);
var input_operation_37728 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.reaction__GT_operation),input_reaction_37727));
var reaction_path_37729 = [input_operation_37728,"-",operation_37694__$1].join('');
var temp__5802__auto___37730 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.edges),reaction_path_37729);
if(cljs.core.truth_(temp__5802__auto___37730)){
var old_edge_37731 = temp__5802__auto___37730;
var updated_edge_37732 = cljs.core.update.cljs$core$IFn$_invoke$arity$3(old_edge_37731,new cljs.core.Keyword(null,"value","value",305978217),cljs.core.inc);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37729,updated_edge_37732);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.update(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [updated_edge_37732], null)));
} else {
}
} else {
var data_37733 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),reaction_path_37729,new cljs.core.Keyword(null,"from","from",1815293044),input_operation_37728,new cljs.core.Keyword(null,"to","to",192099007),operation_37694__$1,new cljs.core.Keyword(null,"value","value",305978217),(1)], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37729,data_37733);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.add(cljs.core.clj__GT_js(data_37733));
} else {
}
}


var G__37736 = cljs.core.next(seq__37249_37721__$1);
var G__37737 = null;
var G__37738 = (0);
var G__37739 = (0);
seq__37249_37703 = G__37736;
chunk__37250_37704 = G__37737;
count__37251_37705 = G__37738;
i__37252_37706 = G__37739;
continue;
}
} else {
}
}
break;
}
} else {
}
} else {
}


var G__37740 = cljs.core.next(seq__37099_37681__$1);
var G__37741 = null;
var G__37742 = (0);
var G__37743 = (0);
seq__37099_37618 = G__37740;
chunk__37100_37619 = G__37741;
count__37101_37620 = G__37742;
i__37102_37621 = G__37743;
continue;
}
} else {
}
}
break;
}


var G__37744 = seq__36695_37610;
var G__37745 = chunk__36696_37611;
var G__37746 = count__36697_37612;
var G__37747 = (i__36698_37613 + (1));
seq__36695_37610 = G__37744;
chunk__36696_37611 = G__37745;
count__36697_37612 = G__37746;
i__36698_37613 = G__37747;
continue;
} else {
var temp__5804__auto___37748 = cljs.core.seq(seq__36695_37610);
if(temp__5804__auto___37748){
var seq__36695_37749__$1 = temp__5804__auto___37748;
if(cljs.core.chunked_seq_QMARK_(seq__36695_37749__$1)){
var c__5568__auto___37750 = cljs.core.chunk_first(seq__36695_37749__$1);
var G__37751 = cljs.core.chunk_rest(seq__36695_37749__$1);
var G__37752 = c__5568__auto___37750;
var G__37753 = cljs.core.count(c__5568__auto___37750);
var G__37754 = (0);
seq__36695_37610 = G__37751;
chunk__36696_37611 = G__37752;
count__36697_37612 = G__37753;
i__36698_37613 = G__37754;
continue;
} else {
var map__37278_37755 = cljs.core.first(seq__36695_37749__$1);
var map__37278_37756__$1 = cljs.core.__destructure_map(map__37278_37755);
var subs_37757 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37278_37756__$1,new cljs.core.Keyword(null,"subs","subs",-186681991));
var seq__37279_37758 = cljs.core.seq(subs_37757);
var chunk__37280_37759 = null;
var count__37281_37760 = (0);
var i__37282_37761 = (0);
while(true){
if((i__37282_37761 < count__37281_37760)){
var map__37346_37762 = chunk__37280_37759.cljs$core$IIndexed$_nth$arity$2(null,i__37282_37761);
var map__37346_37763__$1 = cljs.core.__destructure_map(map__37346_37762);
var op_type_37764 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37346_37763__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var input_signals_37765 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37346_37763__$1,new cljs.core.Keyword(null,"input-signals","input-signals",563633497));
var operation_37766 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37346_37763__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var reaction_37767 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37346_37763__$1,new cljs.core.Keyword(null,"reaction","reaction",490869788));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(op_type_37764,new cljs.core.Keyword(null,"create-class","create-class",1988524183))){
if(cljs.core.truth_((function (){var and__5043__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type_37764,new cljs.core.Keyword(null,"render","render",-1408033454));
if(and__5043__auto__){
return input_signals_37765;
} else {
return and__5043__auto__;
}
})())){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.view__GT_reactions,cljs.core.assoc,operation_37766,input_signals_37765);
} else {
}

var operation_37768__$1 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(operation_37766);
if(cljs.core.truth_(reaction_37767)){
var temp__5802__auto___37769 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.nodes),operation_37768__$1);
if(cljs.core.truth_(temp__5802__auto___37769)){
var old_reaction_37770 = temp__5802__auto___37769;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(op_type_37764,new cljs.core.Keyword(null,"op-type","op-type",-1636141668).cljs$core$IFn$_invoke$arity$1(old_reaction_37770))){
var updated_node_37772 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(old_reaction_37770,new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type_37764,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),cljs.core.get.cljs$core$IFn$_invoke$arity$2(re_frisk.ui.components.colors.sub_colors,op_type_37764)], null)], 0));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.nodes,cljs.core.assoc,operation_37768__$1,updated_node_37772);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(new_nodes),operation_37768__$1))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new_nodes,cljs.core.assoc,operation_37768__$1,updated_node_37772);
} else {
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).nodes.update(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [updated_node_37772], null)));
}
} else {
}
} else {
}
} else {
var data_37775 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),operation_37768__$1,new cljs.core.Keyword(null,"label","label",1718410804),operation_37768__$1,new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),cljs.core.get.cljs$core$IFn$_invoke$arity$2(re_frisk.ui.components.colors.sub_colors,op_type_37764)], null),new cljs.core.Keyword(null,"font","font",-1506159249),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"white","white",-483998618)], null),new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type_37764], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.nodes,cljs.core.assoc,operation_37768__$1,data_37775);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new_nodes,cljs.core.assoc,operation_37768__$1,data_37775);
}
} else {
}

if(cljs.core.truth_(input_signals_37765)){
var seq__37353_37777 = cljs.core.seq(input_signals_37765);
var chunk__37354_37778 = null;
var count__37355_37779 = (0);
var i__37356_37780 = (0);
while(true){
if((i__37356_37780 < count__37355_37779)){
var input_reaction_37781 = chunk__37354_37778.cljs$core$IIndexed$_nth$arity$2(null,i__37356_37780);
var input_operation_37782 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.reaction__GT_operation),input_reaction_37781));
var reaction_path_37783 = [input_operation_37782,"-",operation_37768__$1].join('');
var temp__5802__auto___37784 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.edges),reaction_path_37783);
if(cljs.core.truth_(temp__5802__auto___37784)){
var old_edge_37785 = temp__5802__auto___37784;
var updated_edge_37786 = cljs.core.update.cljs$core$IFn$_invoke$arity$3(old_edge_37785,new cljs.core.Keyword(null,"value","value",305978217),cljs.core.inc);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37783,updated_edge_37786);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.update(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [updated_edge_37786], null)));
} else {
}
} else {
var data_37787 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),reaction_path_37783,new cljs.core.Keyword(null,"from","from",1815293044),input_operation_37782,new cljs.core.Keyword(null,"to","to",192099007),operation_37768__$1,new cljs.core.Keyword(null,"value","value",305978217),(1)], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37783,data_37787);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.add(cljs.core.clj__GT_js(data_37787));
} else {
}
}


var G__37789 = seq__37353_37777;
var G__37790 = chunk__37354_37778;
var G__37791 = count__37355_37779;
var G__37792 = (i__37356_37780 + (1));
seq__37353_37777 = G__37789;
chunk__37354_37778 = G__37790;
count__37355_37779 = G__37791;
i__37356_37780 = G__37792;
continue;
} else {
var temp__5804__auto___37793__$1 = cljs.core.seq(seq__37353_37777);
if(temp__5804__auto___37793__$1){
var seq__37353_37794__$1 = temp__5804__auto___37793__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37353_37794__$1)){
var c__5568__auto___37795 = cljs.core.chunk_first(seq__37353_37794__$1);
var G__37798 = cljs.core.chunk_rest(seq__37353_37794__$1);
var G__37799 = c__5568__auto___37795;
var G__37800 = cljs.core.count(c__5568__auto___37795);
var G__37801 = (0);
seq__37353_37777 = G__37798;
chunk__37354_37778 = G__37799;
count__37355_37779 = G__37800;
i__37356_37780 = G__37801;
continue;
} else {
var input_reaction_37804 = cljs.core.first(seq__37353_37794__$1);
var input_operation_37805 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.reaction__GT_operation),input_reaction_37804));
var reaction_path_37806 = [input_operation_37805,"-",operation_37768__$1].join('');
var temp__5802__auto___37807 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.edges),reaction_path_37806);
if(cljs.core.truth_(temp__5802__auto___37807)){
var old_edge_37811 = temp__5802__auto___37807;
var updated_edge_37812 = cljs.core.update.cljs$core$IFn$_invoke$arity$3(old_edge_37811,new cljs.core.Keyword(null,"value","value",305978217),cljs.core.inc);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37806,updated_edge_37812);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.update(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [updated_edge_37812], null)));
} else {
}
} else {
var data_37813 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),reaction_path_37806,new cljs.core.Keyword(null,"from","from",1815293044),input_operation_37805,new cljs.core.Keyword(null,"to","to",192099007),operation_37768__$1,new cljs.core.Keyword(null,"value","value",305978217),(1)], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37806,data_37813);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.add(cljs.core.clj__GT_js(data_37813));
} else {
}
}


var G__37814 = cljs.core.next(seq__37353_37794__$1);
var G__37815 = null;
var G__37816 = (0);
var G__37817 = (0);
seq__37353_37777 = G__37814;
chunk__37354_37778 = G__37815;
count__37355_37779 = G__37816;
i__37356_37780 = G__37817;
continue;
}
} else {
}
}
break;
}
} else {
}
} else {
}


var G__37818 = seq__37279_37758;
var G__37819 = chunk__37280_37759;
var G__37820 = count__37281_37760;
var G__37821 = (i__37282_37761 + (1));
seq__37279_37758 = G__37818;
chunk__37280_37759 = G__37819;
count__37281_37760 = G__37820;
i__37282_37761 = G__37821;
continue;
} else {
var temp__5804__auto___37822__$1 = cljs.core.seq(seq__37279_37758);
if(temp__5804__auto___37822__$1){
var seq__37279_37823__$1 = temp__5804__auto___37822__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37279_37823__$1)){
var c__5568__auto___37824 = cljs.core.chunk_first(seq__37279_37823__$1);
var G__37825 = cljs.core.chunk_rest(seq__37279_37823__$1);
var G__37826 = c__5568__auto___37824;
var G__37827 = cljs.core.count(c__5568__auto___37824);
var G__37828 = (0);
seq__37279_37758 = G__37825;
chunk__37280_37759 = G__37826;
count__37281_37760 = G__37827;
i__37282_37761 = G__37828;
continue;
} else {
var map__37383_37829 = cljs.core.first(seq__37279_37823__$1);
var map__37383_37830__$1 = cljs.core.__destructure_map(map__37383_37829);
var op_type_37831 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37383_37830__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var input_signals_37832 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37383_37830__$1,new cljs.core.Keyword(null,"input-signals","input-signals",563633497));
var operation_37833 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37383_37830__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var reaction_37834 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37383_37830__$1,new cljs.core.Keyword(null,"reaction","reaction",490869788));
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(op_type_37831,new cljs.core.Keyword(null,"create-class","create-class",1988524183))){
if(cljs.core.truth_((function (){var and__5043__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(op_type_37831,new cljs.core.Keyword(null,"render","render",-1408033454));
if(and__5043__auto__){
return input_signals_37832;
} else {
return and__5043__auto__;
}
})())){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.view__GT_reactions,cljs.core.assoc,operation_37833,input_signals_37832);
} else {
}

var operation_37835__$1 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(operation_37833);
if(cljs.core.truth_(reaction_37834)){
var temp__5802__auto___37836 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.nodes),operation_37835__$1);
if(cljs.core.truth_(temp__5802__auto___37836)){
var old_reaction_37838 = temp__5802__auto___37836;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(op_type_37831,new cljs.core.Keyword(null,"op-type","op-type",-1636141668).cljs$core$IFn$_invoke$arity$1(old_reaction_37838))){
var updated_node_37839 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(old_reaction_37838,new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type_37831,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),cljs.core.get.cljs$core$IFn$_invoke$arity$2(re_frisk.ui.components.colors.sub_colors,op_type_37831)], null)], 0));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.nodes,cljs.core.assoc,operation_37835__$1,updated_node_37839);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(new_nodes),operation_37835__$1))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new_nodes,cljs.core.assoc,operation_37835__$1,updated_node_37839);
} else {
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).nodes.update(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [updated_node_37839], null)));
}
} else {
}
} else {
}
} else {
var data_37841 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),operation_37835__$1,new cljs.core.Keyword(null,"label","label",1718410804),operation_37835__$1,new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),cljs.core.get.cljs$core$IFn$_invoke$arity$2(re_frisk.ui.components.colors.sub_colors,op_type_37831)], null),new cljs.core.Keyword(null,"font","font",-1506159249),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"white","white",-483998618)], null),new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type_37831], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.nodes,cljs.core.assoc,operation_37835__$1,data_37841);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(new_nodes,cljs.core.assoc,operation_37835__$1,data_37841);
}
} else {
}

if(cljs.core.truth_(input_signals_37832)){
var seq__37388_37843 = cljs.core.seq(input_signals_37832);
var chunk__37389_37844 = null;
var count__37390_37845 = (0);
var i__37391_37846 = (0);
while(true){
if((i__37391_37846 < count__37390_37845)){
var input_reaction_37847 = chunk__37389_37844.cljs$core$IIndexed$_nth$arity$2(null,i__37391_37846);
var input_operation_37848 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.reaction__GT_operation),input_reaction_37847));
var reaction_path_37849 = [input_operation_37848,"-",operation_37835__$1].join('');
var temp__5802__auto___37851 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.edges),reaction_path_37849);
if(cljs.core.truth_(temp__5802__auto___37851)){
var old_edge_37852 = temp__5802__auto___37851;
var updated_edge_37853 = cljs.core.update.cljs$core$IFn$_invoke$arity$3(old_edge_37852,new cljs.core.Keyword(null,"value","value",305978217),cljs.core.inc);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37849,updated_edge_37853);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.update(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [updated_edge_37853], null)));
} else {
}
} else {
var data_37855 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),reaction_path_37849,new cljs.core.Keyword(null,"from","from",1815293044),input_operation_37848,new cljs.core.Keyword(null,"to","to",192099007),operation_37835__$1,new cljs.core.Keyword(null,"value","value",305978217),(1)], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37849,data_37855);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.add(cljs.core.clj__GT_js(data_37855));
} else {
}
}


var G__37856 = seq__37388_37843;
var G__37857 = chunk__37389_37844;
var G__37858 = count__37390_37845;
var G__37859 = (i__37391_37846 + (1));
seq__37388_37843 = G__37856;
chunk__37389_37844 = G__37857;
count__37390_37845 = G__37858;
i__37391_37846 = G__37859;
continue;
} else {
var temp__5804__auto___37860__$2 = cljs.core.seq(seq__37388_37843);
if(temp__5804__auto___37860__$2){
var seq__37388_37861__$1 = temp__5804__auto___37860__$2;
if(cljs.core.chunked_seq_QMARK_(seq__37388_37861__$1)){
var c__5568__auto___37862 = cljs.core.chunk_first(seq__37388_37861__$1);
var G__37863 = cljs.core.chunk_rest(seq__37388_37861__$1);
var G__37864 = c__5568__auto___37862;
var G__37865 = cljs.core.count(c__5568__auto___37862);
var G__37866 = (0);
seq__37388_37843 = G__37863;
chunk__37389_37844 = G__37864;
count__37390_37845 = G__37865;
i__37391_37846 = G__37866;
continue;
} else {
var input_reaction_37867 = cljs.core.first(seq__37388_37861__$1);
var input_operation_37868 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.reaction__GT_operation),input_reaction_37867));
var reaction_path_37869 = [input_operation_37868,"-",operation_37835__$1].join('');
var temp__5802__auto___37871 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(re_frisk.subs_graph.edges),reaction_path_37869);
if(cljs.core.truth_(temp__5802__auto___37871)){
var old_edge_37872 = temp__5802__auto___37871;
var updated_edge_37873 = cljs.core.update.cljs$core$IFn$_invoke$arity$3(old_edge_37872,new cljs.core.Keyword(null,"value","value",305978217),cljs.core.inc);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37869,updated_edge_37873);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.update(cljs.core.clj__GT_js(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [updated_edge_37873], null)));
} else {
}
} else {
var data_37875 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"id","id",-1388402092),reaction_path_37869,new cljs.core.Keyword(null,"from","from",1815293044),input_operation_37868,new cljs.core.Keyword(null,"to","to",192099007),operation_37835__$1,new cljs.core.Keyword(null,"value","value",305978217),(1)], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(re_frisk.subs_graph.edges,cljs.core.assoc,reaction_path_37869,data_37875);

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).edges.add(cljs.core.clj__GT_js(data_37875));
} else {
}
}


var G__37876 = cljs.core.next(seq__37388_37861__$1);
var G__37877 = null;
var G__37878 = (0);
var G__37879 = (0);
seq__37388_37843 = G__37876;
chunk__37389_37844 = G__37877;
count__37390_37845 = G__37878;
i__37391_37846 = G__37879;
continue;
}
} else {
}
}
break;
}
} else {
}
} else {
}


var G__37880 = cljs.core.next(seq__37279_37823__$1);
var G__37881 = null;
var G__37882 = (0);
var G__37883 = (0);
seq__37279_37758 = G__37880;
chunk__37280_37759 = G__37881;
count__37281_37760 = G__37882;
i__37282_37761 = G__37883;
continue;
}
} else {
}
}
break;
}


var G__37884 = cljs.core.next(seq__36695_37749__$1);
var G__37885 = null;
var G__37886 = (0);
var G__37887 = (0);
seq__36695_37610 = G__37884;
chunk__36696_37611 = G__37885;
count__36697_37612 = G__37886;
i__36698_37613 = G__37887;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.network))){
if((cljs.core.count(cljs.core.deref(new_nodes)) > (20))){
return re_frisk.subs_graph.create();
} else {
var seq__37416 = cljs.core.seq(cljs.core.vals(cljs.core.deref(new_nodes)));
var chunk__37417 = null;
var count__37418 = (0);
var i__37419 = (0);
while(true){
if((i__37419 < count__37418)){
var data = chunk__37417.cljs$core$IIndexed$_nth$arity$2(null,i__37419);
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).nodes.add(cljs.core.clj__GT_js(data));


var G__37888 = seq__37416;
var G__37889 = chunk__37417;
var G__37890 = count__37418;
var G__37891 = (i__37419 + (1));
seq__37416 = G__37888;
chunk__37417 = G__37889;
count__37418 = G__37890;
i__37419 = G__37891;
continue;
} else {
var temp__5804__auto__ = cljs.core.seq(seq__37416);
if(temp__5804__auto__){
var seq__37416__$1 = temp__5804__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__37416__$1)){
var c__5568__auto__ = cljs.core.chunk_first(seq__37416__$1);
var G__37892 = cljs.core.chunk_rest(seq__37416__$1);
var G__37893 = c__5568__auto__;
var G__37894 = cljs.core.count(c__5568__auto__);
var G__37895 = (0);
seq__37416 = G__37892;
chunk__37417 = G__37893;
count__37418 = G__37894;
i__37419 = G__37895;
continue;
} else {
var data = cljs.core.first(seq__37416__$1);
new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(re_frisk.subs_graph.network)).nodes.add(cljs.core.clj__GT_js(data));


var G__37896 = cljs.core.next(seq__37416__$1);
var G__37897 = null;
var G__37898 = (0);
var G__37899 = (0);
seq__37416 = G__37896;
chunk__37417 = G__37897;
count__37418 = G__37898;
i__37419 = G__37899;
continue;
}
} else {
return null;
}
}
break;
}
}
} else {
return null;
}
});
if((typeof re_frisk !== 'undefined') && (typeof re_frisk.subs_graph !== 'undefined') && (typeof re_frisk.subs_graph.event_network !== 'undefined')){
} else {
re_frisk.subs_graph.event_network = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
re_frisk.subs_graph.create_event_subs = (function re_frisk$subs_graph$create_event_subs(p__37429){
var map__37430 = p__37429;
var map__37430__$1 = cljs.core.__destructure_map(map__37430);
var app_db_reaction = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37430__$1,new cljs.core.Keyword(null,"app-db-reaction","app-db-reaction",-269835135));
var subs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37430__$1,new cljs.core.Keyword(null,"subs","subs",-186681991));
if(cljs.core.truth_(cljs.core.deref(re_frisk.subs_graph.event_network))){
cljs.core.deref(re_frisk.subs_graph.event_network).destroy();

cljs.core.reset_BANG_(re_frisk.subs_graph.event_network,null);
} else {
}

if(cljs.core.truth_((function (){var and__5043__auto__ = cljs.core.deref(re_frisk.subs_graph.vis);
if(cljs.core.truth_(and__5043__auto__)){
return cljs.core.deref(re_frisk.subs_graph.doc);
} else {
return and__5043__auto__;
}
})())){
var temp__5804__auto__ = cljs.core.deref(re_frisk.subs_graph.doc).getElementById("event-subs-graph-container");
if(cljs.core.truth_(temp__5804__auto__)){
var container = temp__5804__auto__;
var Network = cljs.core.deref(re_frisk.subs_graph.vis).Network;
var DataSet = cljs.core.deref(re_frisk.subs_graph.vis).DataSet;
var nodes = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.createAsIfByAssoc([app_db_reaction,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),app_db_reaction,new cljs.core.Keyword(null,"label","label",1718410804),"app-db",new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),new cljs.core.Keyword(null,"yellow","yellow",-881035449)], null)], null)]));
var edges = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var seq__37440_37902 = cljs.core.seq(subs);
var chunk__37441_37903 = null;
var count__37442_37904 = (0);
var i__37443_37905 = (0);
while(true){
if((i__37443_37905 < count__37442_37904)){
var map__37476_37906 = chunk__37441_37903.cljs$core$IIndexed$_nth$arity$2(null,i__37443_37905);
var map__37476_37907__$1 = cljs.core.__destructure_map(map__37476_37906);
var op_type_37908 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37476_37907__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var reaction_37909 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37476_37907__$1,new cljs.core.Keyword(null,"reaction","reaction",490869788));
var input_signals_37910 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37476_37907__$1,new cljs.core.Keyword(null,"input-signals","input-signals",563633497));
var operation_37911 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37476_37907__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var temp__5802__auto___37912 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(nodes),reaction_37909);
if(cljs.core.truth_(temp__5802__auto___37912)){
var old_reaction_37913 = temp__5802__auto___37912;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(op_type_37908,new cljs.core.Keyword(null,"op-type","op-type",-1636141668).cljs$core$IFn$_invoke$arity$1(old_reaction_37913))){
var updated_node_37915 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(old_reaction_37913,new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type_37908,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),cljs.core.get.cljs$core$IFn$_invoke$arity$2(re_frisk.ui.components.colors.sub_colors,op_type_37908)], null)], 0));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(nodes,cljs.core.assoc,reaction_37909,updated_node_37915);
} else {
}
} else {
var data_37917 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),reaction_37909,new cljs.core.Keyword(null,"label","label",1718410804),operation_37911,new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),cljs.core.get.cljs$core$IFn$_invoke$arity$2(re_frisk.ui.components.colors.sub_colors,op_type_37908)], null),new cljs.core.Keyword(null,"font","font",-1506159249),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"white","white",-483998618)], null),new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type_37908], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(nodes,cljs.core.assoc,reaction_37909,data_37917);
}

if(cljs.core.truth_(input_signals_37910)){
var seq__37481_37919 = cljs.core.seq(input_signals_37910);
var chunk__37482_37920 = null;
var count__37483_37921 = (0);
var i__37484_37922 = (0);
while(true){
if((i__37484_37922 < count__37483_37921)){
var input_reaction_37923 = chunk__37482_37920.cljs$core$IIndexed$_nth$arity$2(null,i__37484_37922);
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(edges),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(input_reaction_37923),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(reaction_37909)].join('')))){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(edges,cljs.core.assoc,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(input_reaction_37923),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(reaction_37909)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"from","from",1815293044),input_reaction_37923,new cljs.core.Keyword(null,"to","to",192099007),reaction_37909], null));
}


var G__37930 = seq__37481_37919;
var G__37931 = chunk__37482_37920;
var G__37932 = count__37483_37921;
var G__37933 = (i__37484_37922 + (1));
seq__37481_37919 = G__37930;
chunk__37482_37920 = G__37931;
count__37483_37921 = G__37932;
i__37484_37922 = G__37933;
continue;
} else {
var temp__5804__auto___37934__$1 = cljs.core.seq(seq__37481_37919);
if(temp__5804__auto___37934__$1){
var seq__37481_37935__$1 = temp__5804__auto___37934__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37481_37935__$1)){
var c__5568__auto___37936 = cljs.core.chunk_first(seq__37481_37935__$1);
var G__37937 = cljs.core.chunk_rest(seq__37481_37935__$1);
var G__37938 = c__5568__auto___37936;
var G__37939 = cljs.core.count(c__5568__auto___37936);
var G__37940 = (0);
seq__37481_37919 = G__37937;
chunk__37482_37920 = G__37938;
count__37483_37921 = G__37939;
i__37484_37922 = G__37940;
continue;
} else {
var input_reaction_37941 = cljs.core.first(seq__37481_37935__$1);
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(edges),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(input_reaction_37941),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(reaction_37909)].join('')))){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(edges,cljs.core.assoc,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(input_reaction_37941),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(reaction_37909)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"from","from",1815293044),input_reaction_37941,new cljs.core.Keyword(null,"to","to",192099007),reaction_37909], null));
}


var G__37942 = cljs.core.next(seq__37481_37935__$1);
var G__37943 = null;
var G__37944 = (0);
var G__37945 = (0);
seq__37481_37919 = G__37942;
chunk__37482_37920 = G__37943;
count__37483_37921 = G__37944;
i__37484_37922 = G__37945;
continue;
}
} else {
}
}
break;
}
} else {
}


var G__37946 = seq__37440_37902;
var G__37947 = chunk__37441_37903;
var G__37948 = count__37442_37904;
var G__37949 = (i__37443_37905 + (1));
seq__37440_37902 = G__37946;
chunk__37441_37903 = G__37947;
count__37442_37904 = G__37948;
i__37443_37905 = G__37949;
continue;
} else {
var temp__5804__auto___37950__$1 = cljs.core.seq(seq__37440_37902);
if(temp__5804__auto___37950__$1){
var seq__37440_37951__$1 = temp__5804__auto___37950__$1;
if(cljs.core.chunked_seq_QMARK_(seq__37440_37951__$1)){
var c__5568__auto___37952 = cljs.core.chunk_first(seq__37440_37951__$1);
var G__37953 = cljs.core.chunk_rest(seq__37440_37951__$1);
var G__37954 = c__5568__auto___37952;
var G__37955 = cljs.core.count(c__5568__auto___37952);
var G__37956 = (0);
seq__37440_37902 = G__37953;
chunk__37441_37903 = G__37954;
count__37442_37904 = G__37955;
i__37443_37905 = G__37956;
continue;
} else {
var map__37490_37958 = cljs.core.first(seq__37440_37951__$1);
var map__37490_37959__$1 = cljs.core.__destructure_map(map__37490_37958);
var op_type_37960 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37490_37959__$1,new cljs.core.Keyword(null,"op-type","op-type",-1636141668));
var reaction_37961 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37490_37959__$1,new cljs.core.Keyword(null,"reaction","reaction",490869788));
var input_signals_37962 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37490_37959__$1,new cljs.core.Keyword(null,"input-signals","input-signals",563633497));
var operation_37963 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37490_37959__$1,new cljs.core.Keyword(null,"operation","operation",-1267664310));
var temp__5802__auto___37964 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(nodes),reaction_37961);
if(cljs.core.truth_(temp__5802__auto___37964)){
var old_reaction_37965 = temp__5802__auto___37964;
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(op_type_37960,new cljs.core.Keyword(null,"op-type","op-type",-1636141668).cljs$core$IFn$_invoke$arity$1(old_reaction_37965))){
var updated_node_37967 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(old_reaction_37965,new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type_37960,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),cljs.core.get.cljs$core$IFn$_invoke$arity$2(re_frisk.ui.components.colors.sub_colors,op_type_37960)], null)], 0));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(nodes,cljs.core.assoc,reaction_37961,updated_node_37967);
} else {
}
} else {
var data_37969 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"id","id",-1388402092),reaction_37961,new cljs.core.Keyword(null,"label","label",1718410804),operation_37963,new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"background","background",-863952629),cljs.core.get.cljs$core$IFn$_invoke$arity$2(re_frisk.ui.components.colors.sub_colors,op_type_37960)], null),new cljs.core.Keyword(null,"font","font",-1506159249),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"white","white",-483998618)], null),new cljs.core.Keyword(null,"op-type","op-type",-1636141668),op_type_37960], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(nodes,cljs.core.assoc,reaction_37961,data_37969);
}

if(cljs.core.truth_(input_signals_37962)){
var seq__37496_37971 = cljs.core.seq(input_signals_37962);
var chunk__37497_37972 = null;
var count__37498_37973 = (0);
var i__37499_37974 = (0);
while(true){
if((i__37499_37974 < count__37498_37973)){
var input_reaction_37975 = chunk__37497_37972.cljs$core$IIndexed$_nth$arity$2(null,i__37499_37974);
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(edges),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(input_reaction_37975),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(reaction_37961)].join('')))){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(edges,cljs.core.assoc,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(input_reaction_37975),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(reaction_37961)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"from","from",1815293044),input_reaction_37975,new cljs.core.Keyword(null,"to","to",192099007),reaction_37961], null));
}


var G__37977 = seq__37496_37971;
var G__37978 = chunk__37497_37972;
var G__37979 = count__37498_37973;
var G__37980 = (i__37499_37974 + (1));
seq__37496_37971 = G__37977;
chunk__37497_37972 = G__37978;
count__37498_37973 = G__37979;
i__37499_37974 = G__37980;
continue;
} else {
var temp__5804__auto___37981__$2 = cljs.core.seq(seq__37496_37971);
if(temp__5804__auto___37981__$2){
var seq__37496_37982__$1 = temp__5804__auto___37981__$2;
if(cljs.core.chunked_seq_QMARK_(seq__37496_37982__$1)){
var c__5568__auto___37983 = cljs.core.chunk_first(seq__37496_37982__$1);
var G__37984 = cljs.core.chunk_rest(seq__37496_37982__$1);
var G__37985 = c__5568__auto___37983;
var G__37986 = cljs.core.count(c__5568__auto___37983);
var G__37987 = (0);
seq__37496_37971 = G__37984;
chunk__37497_37972 = G__37985;
count__37498_37973 = G__37986;
i__37499_37974 = G__37987;
continue;
} else {
var input_reaction_37988 = cljs.core.first(seq__37496_37982__$1);
if(cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(edges),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(input_reaction_37988),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(reaction_37961)].join('')))){
} else {
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(edges,cljs.core.assoc,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(input_reaction_37988),"-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(reaction_37961)].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"from","from",1815293044),input_reaction_37988,new cljs.core.Keyword(null,"to","to",192099007),reaction_37961], null));
}


var G__37989 = cljs.core.next(seq__37496_37982__$1);
var G__37990 = null;
var G__37991 = (0);
var G__37992 = (0);
seq__37496_37971 = G__37989;
chunk__37497_37972 = G__37990;
count__37498_37973 = G__37991;
i__37499_37974 = G__37992;
continue;
}
} else {
}
}
break;
}
} else {
}


var G__37993 = cljs.core.next(seq__37440_37951__$1);
var G__37994 = null;
var G__37995 = (0);
var G__37996 = (0);
seq__37440_37902 = G__37993;
chunk__37441_37903 = G__37994;
count__37442_37904 = G__37995;
i__37443_37905 = G__37996;
continue;
}
} else {
}
}
break;
}

return cljs.core.reset_BANG_(re_frisk.subs_graph.event_network,(new Network(container,({"nodes": (new DataSet(cljs.core.clj__GT_js(cljs.core.vals(cljs.core.deref(nodes))))), "edges": (new DataSet(cljs.core.clj__GT_js(cljs.core.vals(cljs.core.deref(edges)))))}),re_frisk.subs_graph.options)));
} else {
return null;
}
} else {
return null;
}
});

//# sourceMappingURL=re_frisk.subs_graph.js.map
