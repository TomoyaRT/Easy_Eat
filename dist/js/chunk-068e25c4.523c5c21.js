(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-068e25c4"],{1276:function(t,e,i){"use strict";var c=i("d784"),n=i("44e7"),r=i("825a"),a=i("1d80"),o=i("4840"),s=i("8aa5"),d=i("50c4"),l=i("14c3"),u=i("9263"),j=i("9f7f"),b=j.UNSUPPORTED_Y,O=[].push,v=Math.min,p=4294967295;c("split",2,(function(t,e,i){var c;return c="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,i){var c=String(a(this)),r=void 0===i?p:i>>>0;if(0===r)return[];if(void 0===t)return[c];if(!n(t))return e.call(c,t,r);var o,s,d,l=[],j=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),b=0,v=new RegExp(t.source,j+"g");while(o=u.call(v,c)){if(s=v.lastIndex,s>b&&(l.push(c.slice(b,o.index)),o.length>1&&o.index<c.length&&O.apply(l,o.slice(1)),d=o[0].length,b=s,l.length>=r))break;v.lastIndex===o.index&&v.lastIndex++}return b===c.length?!d&&v.test("")||l.push(""):l.push(c.slice(b)),l.length>r?l.slice(0,r):l}:"0".split(void 0,0).length?function(t,i){return void 0===t&&0===i?[]:e.call(this,t,i)}:e,[function(e,i){var n=a(this),r=void 0==e?void 0:e[t];return void 0!==r?r.call(e,n,i):c.call(String(n),e,i)},function(t,n){var a=i(c,t,this,n,c!==e);if(a.done)return a.value;var u=r(t),j=String(this),O=o(u,RegExp),h=u.unicode,f=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(b?"g":"y"),g=new O(b?"^(?:"+u.source+")":u,f),m=void 0===n?p:n>>>0;if(0===m)return[];if(0===j.length)return null===l(g,j)?[j]:[];var w=0,y=0,I=[];while(y<j.length){g.lastIndex=b?0:y;var S,k=l(g,b?j.slice(y):j);if(null===k||(S=v(d(g.lastIndex+(b?y:0)),j.length))===w)y=s(j,y,h);else{if(I.push(j.slice(w,y)),I.length===m)return I;for(var x=1;x<=k.length-1;x++)if(I.push(k[x]),I.length===m)return I;y=w=S}}return I.push(j.slice(w)),I}]}),b)},"1ccc":function(t,e,i){"use strict";i.r(e);i("ac1f"),i("1276");var c=i("7a23"),n={class:"admin-page-orders"},r={class:"orders-container"},a={class:"orders-title-container"},o=Object(c["h"])('<div class="purchase-time">購買日期</div><div class="customer-email">顧客信箱</div><div class="bought-products">購買款項</div><div class="amounts-payable">應付金額</div><div class="payment-status">付款狀態</div>',5),s={class:"order-edit-btn-group"},d={class:"purchase-time"},l={class:"customer-email"},u={class:"bought-products-container"},j={class:"product-title"},b={class:"product-qty"},O={class:"product-unit"},v={class:"amounts-payable"},p={key:0,class:"payment-paid-status"},h={key:1,class:"payment-unpaid-status"},f={class:"order-edit-btn-group"};function g(t,e,i,g,m,w){var y=Object(c["F"])("Loading"),I=Object(c["F"])("Pagination"),S=Object(c["F"])("OrderModal"),k=Object(c["F"])("DeletModal");return Object(c["w"])(),Object(c["f"])("div",n,[Object(c["j"])("div",r,[Object(c["j"])("div",a,[o,Object(c["j"])("div",s,[m.orderEditStatus?(Object(c["w"])(),Object(c["f"])("i",{key:1,class:"bi bi-toggle2-on",onClick:e[2]||(e[2]=function(t){return m.orderEditStatus=!1})})):(Object(c["w"])(),Object(c["f"])("i",{key:0,class:"bi bi-toggle2-off",onClick:e[1]||(e[1]=function(t){return m.orderEditStatus=!0})}))])]),(Object(c["w"])(!0),Object(c["f"])(c["a"],null,Object(c["D"])(m.orderList,(function(e){return Object(c["w"])(),Object(c["f"])("div",{class:"orders-content-container",key:e.id},[Object(c["j"])("div",d,Object(c["I"])(e.is_paid?new Date(1e3*e.paid_date).toISOString().split("T")[0]:"未付款狀態"),1),Object(c["j"])("div",l,Object(c["I"])(e.user.email),1),Object(c["j"])("div",u,[(Object(c["w"])(!0),Object(c["f"])(c["a"],null,Object(c["D"])(e.products,(function(t){return Object(c["w"])(),Object(c["f"])("div",{class:"bought-products",key:t.id},[Object(c["j"])("div",j,Object(c["I"])("".concat(t.product.title," :")),1),Object(c["j"])("div",b,Object(c["I"])(t.qty),1),Object(c["j"])("div",O,Object(c["I"])(t.product.unit),1)])})),128))]),Object(c["j"])("div",v,"$"+Object(c["I"])(t.$filters.currency(e.total)),1),e.is_paid?(Object(c["w"])(),Object(c["f"])("div",p,"已付款")):(Object(c["w"])(),Object(c["f"])("div",h,"尚未付款")),Object(c["j"])("div",f,[m.orderEditStatus?(Object(c["w"])(),Object(c["f"])("i",{key:0,class:"bi bi-eye-fill",onClick:function(t){return w.openModal("檢視訂單",e)}},null,8,["onClick"])):(Object(c["w"])(),Object(c["f"])("i",{key:1,class:"bi bi-trash",onClick:function(t){return w.openModal("刪除訂單",e)}},null,8,["onClick"]))])])})),128))]),Object(c["j"])(y,{active:t.isLoading,"background-color":t.loadingObj.bgc,loader:t.loadingObj.style,color:t.loadingObj.color,opacity:t.loadingObj.opacity,height:t.loadingObj.height,width:t.loadingObj.width},null,8,["active","background-color","loader","color","opacity","height","width"]),Object(c["j"])(I,{pagination:t.pagination,onChangePage:w.getOrders},null,8,["pagination","onChangePage"]),Object(c["j"])(S,{class:{"modal-active":m.orderModalStatus},onCloseOrderModal:e[3]||(e[3]=function(t){return m.orderModalStatus=!1}),"order-data":m.tempOrder},null,8,["class","order-data"]),Object(c["j"])(k,{class:{"modal-active":m.deletModalStatus},onCloseModal:e[4]||(e[4]=function(t){return m.deletModalStatus=!1}),"delet-modal":m.tempOrder,onDeleteProduct:w.deleteOrder},null,8,["class","delet-modal","onDeleteProduct"])])}var m=i("5530"),w=(i("99af"),i("b0c0"),{class:"admin-page-order-modal"}),y={class:"order-modal-container"},I={class:"order-modal-header"},S=Object(c["j"])("div",{class:"header-title"},"訂單資訊",-1),k={class:"order-modal-main"},x={class:"order-detail-container"},C=Object(c["j"])("div",{class:"order-detail-title"},"訂單細節",-1),M={class:"order-detail-content-container"},$=Object(c["j"])("div",{class:"title"},"訂單編號",-1),D={class:"content"},L={class:"order-detail-content-container"},E=Object(c["j"])("div",{class:"title"},"下單時間",-1),_={class:"content"},P={class:"order-detail-content-container"},T=Object(c["j"])("div",{class:"title"},"付款時間",-1),B={class:"content"},F={class:"order-detail-content-container"},q=Object(c["j"])("div",{class:"title"},"付款狀態",-1),R={class:"content"},A={class:"order-detail-content-container"},J=Object(c["j"])("div",{class:"title"},"總金額",-1),U={class:"content"},N={class:"user-information-container"},Y=Object(c["j"])("div",{class:"user-information-title"},"用戶資料",-1),z={class:"user-information-content-container"},G=Object(c["j"])("div",{class:"title"},"姓名",-1),H={class:"content"},K={class:"user-information-content-container"},Q=Object(c["j"])("div",{class:"title"},"Email",-1),V={class:"content"},W={class:"user-information-content-container"},X=Object(c["j"])("div",{class:"title"},"電話",-1),Z={class:"content"},tt={class:"user-information-content-container"},et=Object(c["j"])("div",{class:"title"},"地址",-1),it={class:"content"},ct={class:"user-information-content-container"},nt=Object(c["j"])("div",{class:"title"},"備註",-1),rt={class:"content"},at=Object(c["j"])("div",{class:"purchased-products-title"},"選購商品",-1),ot={class:"purchased-products-content-container"},st={class:"title"},dt={class:"qty-unit"},lt={class:"price"},ut={class:"order-modal-footer"};function jt(t,e,i,n,r,a){var o,s,d,l;return Object(c["w"])(),Object(c["f"])("div",w,[Object(c["j"])("div",y,[Object(c["j"])("div",I,[S,Object(c["j"])("i",{class:"bi bi-x-lg",onClick:e[1]||(e[1]=function(e){return t.$emit("close-order-modal")})})]),Object(c["j"])("div",k,[Object(c["j"])("div",x,[C,Object(c["j"])("div",M,[$,Object(c["j"])("div",D,Object(c["I"])(r.order.id),1)]),Object(c["j"])("div",L,[E,Object(c["j"])("div",_,Object(c["I"])(void 0!==r.order.create_at?new Date(1e3*r.order.create_at).toISOString().split("T")[0]:"下單時間有誤"),1)]),Object(c["j"])("div",P,[T,Object(c["j"])("div",B,Object(c["I"])(r.order.is_paid?new Date(1e3*r.order.paid_date).toISOString().split("T")[0]:"屬尚未付款狀態"),1)]),Object(c["j"])("div",F,[q,Object(c["j"])("div",R,Object(c["I"])(r.order.is_paid?"已付款":"未付款"),1)]),Object(c["j"])("div",A,[J,Object(c["j"])("div",U,"$"+Object(c["I"])(t.$filters.currency(r.order.total)),1)])]),Object(c["j"])("div",N,[Y,Object(c["j"])("div",z,[G,Object(c["j"])("div",H,Object(c["I"])(null===(o=r.order.user)||void 0===o?void 0:o.name),1)]),Object(c["j"])("div",K,[Q,Object(c["j"])("div",V,Object(c["I"])(null===(s=r.order.user)||void 0===s?void 0:s.email),1)]),Object(c["j"])("div",W,[X,Object(c["j"])("div",Z,Object(c["I"])(null===(d=r.order.user)||void 0===d?void 0:d.tel),1)]),Object(c["j"])("div",tt,[et,Object(c["j"])("div",it,Object(c["I"])(null===(l=r.order.user)||void 0===l?void 0:l.address),1)]),Object(c["j"])("div",ct,[nt,Object(c["j"])("div",rt,Object(c["I"])(void 0===r.order.message?"顧客無留言":r.order.message),1)])]),(Object(c["w"])(!0),Object(c["f"])(c["a"],null,Object(c["D"])(r.order.products,(function(e){return Object(c["w"])(),Object(c["f"])("div",{class:"purchased-products-container",key:e.product.id},[at,Object(c["j"])("div",ot,[Object(c["j"])("div",st,Object(c["I"])(e.product.title),1),Object(c["j"])("div",dt,Object(c["I"])(e.qty)+" / "+Object(c["I"])(e.product.unit),1),Object(c["j"])("div",lt,"$"+Object(c["I"])(t.$filters.currency(e.final_total)),1)])])})),128))]),Object(c["j"])("div",ut,[Object(c["j"])("button",{type:"button",onClick:e[2]||(e[2]=function(e){return t.$emit("close-order-modal")})},"取消"),Object(c["j"])("button",{type:"button",onClick:e[3]||(e[3]=function(e){return t.$emit("close-order-modal")})},"確認")])])])}var bt={props:{orderData:{type:Object,default:function(){return{}}}},data:function(){return{order:{}}},watch:{orderData:function(){this.order=this.orderData}}};bt.render=jt;var Ot=bt,vt=i("e434"),pt=i("962f"),ht={mixins:[vt["a"],pt["a"]],components:{OrderModal:Ot},data:function(){return{orderList:{},tempOrder:{},orderEditStatus:!0,orderModalStatus:!1,deletModalStatus:!1,orderStatus:""}},methods:{getOrders:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.isLoading=!0;var i="".concat("https://vue3-course-api.hexschool.io","/api/").concat("ecommerce-website","/admin/orders?page=").concat(e);this.$http.get(i).then((function(e){t.isLoading=!1,e.data.success&&(t.orderList=e.data.orders,t.pagination=e.data.pagination)}))},openModal:function(t,e){this.orderStatus=t,this.tempOrder=Object(m["a"])({},e),"檢視訂單"===t?this.orderModalStatus=!0:this.deletModalStatus=!0},deleteOrder:function(t){var e=this;this.isLoading=!0;var i="".concat("https://vue3-course-api.hexschool.io","/api/").concat("ecommerce-website","/admin/order/").concat(t.id);this.$http.delete(i).then((function(t){e.isLoading=!1,t.data.success&&(e.getOrders(),e.$emit("update-orders-number"),e.deletModalStatus=!1,e.$httpMessageState(t,"該訂單已被刪除"))}))},deleteAllOrder:function(){var t=this;this.isLoading=!0;var e=this,i="".concat("https://vue3-course-api.hexschool.io","/api/").concat("ecommerce-website","/admin/orders/all");e.$swal.fire({title:"再次確認",text:"是否要刪除所有的訂單資料",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:"取消",confirmButtonText:"確定刪除"}).then((function(c){c.isConfirmed?e.$http.delete(i).then((function(i){t.isLoading=!1,i.data.success&&(e.getOrders(),t.$emit("update-orders-number"),e.$swal.fire("刪除成功!","你已刪除所有訂單資料","success"))})):t.isLoading=!1}))}},created:function(){var t=this;this.$emit("change-navbar-page-title","訂單管理"),this.$emit("change-navbar-btn-title","清除所有訂單"),this.emitter.on("open-modal",(function(e){"訂單管理"===e&&t.deleteAllOrder()})),this.getOrders()}};ht.render=g;e["default"]=ht},"44e7":function(t,e,i){var c=i("861d"),n=i("c6b6"),r=i("b622"),a=r("match");t.exports=function(t){var e;return c(t)&&(void 0!==(e=t[a])?!!e:"RegExp"==n(t))}},b0c0:function(t,e,i){var c=i("83ab"),n=i("9bf2").f,r=Function.prototype,a=r.toString,o=/^\s*function ([^ (]*)/,s="name";c&&!(s in r)&&n(r,s,{configurable:!0,get:function(){try{return a.call(this).match(o)[1]}catch(t){return""}}})}}]);
//# sourceMappingURL=chunk-068e25c4.523c5c21.js.map