
shadow.cljs.devtools.client.env.module_loaded('app');

try { client.core.init(); } catch (e) { console.error("An error occurred when calling (client.core/init)"); throw(e); }