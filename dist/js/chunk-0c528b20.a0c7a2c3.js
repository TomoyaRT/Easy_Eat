(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0c528b20"],{"03d2":function(t,e,n){t.exports=n.p+"img/promotion-title.d9845d79.svg"},"1a5c":function(t,e,n){t.exports=n.p+"img/5.1ee7c437.jpg"},"1dde":function(t,e,n){var o=n("d039"),a=n("b622"),r=n("2d00"),c=a("species");t.exports=function(t){return r>=51||!o((function(){var e=[],n=e.constructor={};return n[c]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"25f0":function(t,e,n){"use strict";var o=n("6eeb"),a=n("825a"),r=n("d039"),c=n("ad6d"),u="toString",s=RegExp.prototype,i=s[u],p=r((function(){return"/a/b"!=i.call({source:"a",flags:"b"})})),l=i.name!=u;(p||l)&&o(RegExp.prototype,u,(function(){var t=a(this),e=String(t.source),n=t.flags,o=String(void 0===n&&t instanceof RegExp&&!("flags"in s)?c.call(t):n);return"/"+e+"/"+o}),{unsafe:!0})},4713:function(t,e,n){t.exports=n.p+"img/3.76c3797c.jpg"},"557c":function(t,e,n){"use strict";n.r(e);var o=n("7a23"),a=n("6eac"),r=n.n(a),c=n("03d2"),u=n.n(c),s={class:"user-page-coupon"},i={class:"coupon-container"},p=Object(o["j"])("img",{class:"jigsaw-puzzle-bg",src:r.a,alt:"拼圖的背景圖片"},null,-1),l=Object(o["j"])("img",{class:"jigsaw-puzzle-title",src:u.a,alt:"優惠券頁面標題"},null,-1),d={class:"how-to-play"},g=Object(o["j"])("i",{class:"bi bi-arrow-left-right"},null,-1),f={class:"jigsaw-puzzle-container"},m={class:"jigsaw-puzzle"};function j(t,e,a,r,c,u){var j=Object(o["F"])("CouponModal");return Object(o["w"])(),Object(o["f"])("div",s,[Object(o["j"])("div",i,[p,l,Object(o["j"])("div",d,[Object(o["i"])(Object(o["I"])(c.playMethod)+"交換位置 ",1),g]),Object(o["j"])("div",f,[Object(o["j"])("div",m,[(Object(o["w"])(),Object(o["f"])(o["a"],null,Object(o["D"])(9,(function(t){return Object(o["j"])("div",{class:"jigsaw-puzzle-piece",key:t},[Object(o["j"])("img",{src:n("71d0")("./".concat(c.currentImgNameOrder[t-1],".jpg")),alt:"拼圖的部分圖片",class:{start:c.targetStartNum===t-1,enter:c.targetEnterNum===t-1},draggable:"true",onMousedown:e[1]||(e[1]=function(t){return u.classChange(t,"start")}),onMouseup:e[2]||(e[2]=function(t){return u.classChange(t,"cancel")}),onDragstart:e[3]||(e[3]=function(){return u.dragStart&&u.dragStart.apply(u,arguments)}),onDragover:e[4]||(e[4]=Object(o["T"])((function(){}),["prevent"])),onDragenter:e[5]||(e[5]=Object(o["T"])((function(){return u.dragEnter&&u.dragEnter.apply(u,arguments)}),["prevent"])),onDragend:e[6]||(e[6]=function(){return u.dragEnd&&u.dragEnd.apply(u,arguments)}),onDrop:e[7]||(e[7]=function(){return u.dropped&&u.dropped.apply(u,arguments)}),onTouchstart:e[8]||(e[8]=function(){return u.touchStart&&u.touchStart.apply(u,arguments)}),"data-num":t-1},null,42,["src","data-num"])])})),64))])]),Object(o["j"])(j,{"coupon-modal-status":c.couponModalStatus,onCloseCouponModal:e[9]||(e[9]=function(t){return c.couponModalStatus=!1}),onRandomPuzzle:u.getRandomOrder,onCopyCouponCode:u.copyCoupon},null,8,["coupon-modal-status","onRandomPuzzle","onCopyCouponCode"])])])}n("a434"),n("d3b7"),n("25f0");var b={class:"coupon-header"},h=Object(o["j"])("div",{class:"title"},"完成拼圖",-1),v={class:"coupon-main"},O=Object(o["j"])("h3",null,"恭喜獲得",-1),y=Object(o["j"])("h2",null,"八折券序號一組",-1),C=Object(o["j"])("p",null,"在購物車輸入此序號可享七折優惠",-1),w={class:"coupon-footer"};function x(t,e,n,a,r,c){return Object(o["w"])(),Object(o["f"])("div",{class:["user-page-coupon-modal",{"coupon-modal-active":n.couponModalStatus}]},[Object(o["j"])("div",{class:["coupon-modal",{"modal-active":n.couponModalStatus}]},[Object(o["j"])("div",b,[h,Object(o["j"])("i",{class:"bi bi-x-lg",onClick:e[1]||(e[1]=function(){return c.closeModal&&c.closeModal.apply(c,arguments)})})]),Object(o["j"])("div",v,[O,y,C,Object(o["j"])("input",{type:"text",readonly:"readonly",class:"coupon-code",value:r.couponCode},null,8,["value"])]),Object(o["j"])("div",w,[Object(o["j"])("button",{type:"button",class:"coupon-btn",onClick:e[2]||(e[2]=function(){return c.copyCoupon&&c.copyCoupon.apply(c,arguments)})}," 複製 ")])],2)],2)}var z={props:{couponModalStatus:{type:Boolean,default:function(){return!1}}},data:function(){return{couponCode:"A5566"}},methods:{closeModal:function(){var t=this;this.$swal.fire({title:"再次確認",text:"拼圖已完成，是否確定不領取優惠券!?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"領取優惠券",cancelButtonText:"不領取"}).then((function(e){e.isConfirmed?t.copyCoupon():(t.$emit("random-puzzle"),t.$emit("close-coupon-modal"))}))},copyCoupon:function(){var t=this;navigator.clipboard.writeText(t.couponCode).then((function(){t.$emit("copy-coupon-code")})).catch((function(e){t.$httpMessageState(e,"複製優惠券")}))}}};z.render=x;var M=z,S={components:{CouponModal:M},data:function(){return{couponModalStatus:!1,correctImgNameOrder:["9","8","7","6","5","4","3","2","1"],currentImgNameOrder:[],targetStartNum:!1,targetEnterNum:!1,playMethod:"拖移",coupon:""}},methods:{getRandomOrder:function(){var t=this;this.currentImgNameOrder=[];var e,n=[0,1,2,3,4,5,6,7,8],o=[],a=0;while(a<9)e=Math.floor(Math.random()*n.length),o.push(n[e]),n.splice(e,1),a+=1;o.forEach((function(e){var n="".concat(t.correctImgNameOrder[e]);t.currentImgNameOrder.push(n)}))},classChange:function(t,e){var n=this;switch(e){case"start":n.targetStartNum=parseInt(t.target.dataset.num,10);break;case"enter":n.targetEnterNum=parseInt(t.target.dataset.num,10);break;case"cancel":n.targetStartNum=!1,n.targetEnterNum=!1;break;default:break}},dragStart:function(t){var e=this;e.classChange(t,"start"),t.dataTransfer.setData("text/plain",t.target.dataset.num)},dragEnter:function(t){var e=this;e.classChange(t,"enter")},dragEnd:function(){var t=this;t.classChange("none","cancel")},dropped:function(t){var e=this,n=t.dataTransfer.getData("text/plain"),o=parseInt(t.target.dataset.num,10);e.changePuzzlePlace(n,o),e.classChange("none","cancel"),e.isPuzzleComplete()},changePuzzlePlace:function(t,e){var n=this,o=n.currentImgNameOrder,a=[o[e],o[t]];o[t]=a[0],o[e]=a[1],n.currentImgNameOrder=o},touchStart:function(t){var e=this,n=parseInt(t.target.dataset.num,10),o=e.targetStartNum;t.preventDefault(),n!==o?o?(e.classChange("none","cancel"),e.changePuzzlePlace(n,o),e.isPuzzleComplete()):e.classChange(t,"start"):e.classChange("none","cancel")},isPuzzleComplete:function(){var t=this,e=this;e.correctImgNameOrder.toString()===e.currentImgNameOrder.toString()&&setTimeout((function(){t.couponModalStatus=!0}),300)},copyCoupon:function(){this.$swal.fire("複製成功!","您已獲得優惠券代碼","success"),this.couponModalStatus=!1,this.getRandomOrder()}},created:function(){this.getRandomOrder(),null===window.ontouchstart&&(this.playMethod="點擊")}};S.render=j;e["default"]=S},"65f0":function(t,e,n){var o=n("861d"),a=n("e8b5"),r=n("b622"),c=r("species");t.exports=function(t,e){var n;return a(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?o(n)&&(n=n[c],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},"66b0":function(t,e,n){t.exports=n.p+"img/7.69bc74de.jpg"},"6ace":function(t,e,n){t.exports=n.p+"img/8.71de04d5.jpg"},"6adb":function(t,e,n){t.exports=n.p+"img/6.9326ec15.jpg"},"6eac":function(t,e,n){t.exports=n.p+"img/promotion-bg.c16be229.svg"},"71d0":function(t,e,n){var o={"./1.jpg":"9253","./2.jpg":"73b0","./3.jpg":"4713","./4.jpg":"83ee","./5.jpg":"1a5c","./6.jpg":"6adb","./7.jpg":"66b0","./8.jpg":"6ace","./9.jpg":"d0e5"};function a(t){var e=r(t);return n(e)}function r(t){if(!n.o(o,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return o[t]}a.keys=function(){return Object.keys(o)},a.resolve=r,t.exports=a,a.id="71d0"},"73b0":function(t,e,n){t.exports=n.p+"img/2.f0ee3817.jpg"},"83ee":function(t,e,n){t.exports=n.p+"img/4.6cc0703e.jpg"},8418:function(t,e,n){"use strict";var o=n("c04e"),a=n("9bf2"),r=n("5c6c");t.exports=function(t,e,n){var c=o(e);c in t?a.f(t,c,r(0,n)):t[c]=n}},9253:function(t,e,n){t.exports=n.p+"img/1.e0363df2.jpg"},a434:function(t,e,n){"use strict";var o=n("23e7"),a=n("23cb"),r=n("a691"),c=n("50c4"),u=n("7b0b"),s=n("65f0"),i=n("8418"),p=n("1dde"),l=p("splice"),d=Math.max,g=Math.min,f=9007199254740991,m="Maximum allowed length exceeded";o({target:"Array",proto:!0,forced:!l},{splice:function(t,e){var n,o,p,l,j,b,h=u(this),v=c(h.length),O=a(t,v),y=arguments.length;if(0===y?n=o=0:1===y?(n=0,o=v-O):(n=y-2,o=g(d(r(e),0),v-O)),v+n-o>f)throw TypeError(m);for(p=s(h,o),l=0;l<o;l++)j=O+l,j in h&&i(p,l,h[j]);if(p.length=o,n<o){for(l=O;l<v-o;l++)j=l+o,b=l+n,j in h?h[b]=h[j]:delete h[b];for(l=v;l>v-o+n;l--)delete h[l-1]}else if(n>o)for(l=v-o;l>O;l--)j=l+o-1,b=l+n-1,j in h?h[b]=h[j]:delete h[b];for(l=0;l<n;l++)h[l+O]=arguments[l+2];return h.length=v-o+n,p}})},d0e5:function(t,e,n){t.exports=n.p+"img/9.404e4bfe.jpg"},e8b5:function(t,e,n){var o=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==o(t)}}}]);
//# sourceMappingURL=chunk-0c528b20.a0c7a2c3.js.map