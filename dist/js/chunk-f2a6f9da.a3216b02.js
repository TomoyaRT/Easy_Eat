(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f2a6f9da"],{"1dde":function(t,e,r){var c=r("d039"),i=r("b622"),n=r("2d00"),a=i("species");t.exports=function(t){return n>=51||!c((function(){var e=[],r=e.constructor={};return r[a]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},2532:function(t,e,r){"use strict";var c=r("23e7"),i=r("5a34"),n=r("1d80"),a=r("ab13");c({target:"String",proto:!0,forced:!a("includes")},{includes:function(t){return!!~String(n(this)).indexOf(i(t),arguments.length>1?arguments[1]:void 0)}})},"44e7":function(t,e,r){var c=r("861d"),i=r("c6b6"),n=r("b622"),a=n("match");t.exports=function(t){var e;return c(t)&&(void 0!==(e=t[a])?!!e:"RegExp"==i(t))}},"4de4":function(t,e,r){"use strict";var c=r("23e7"),i=r("b727").filter,n=r("1dde"),a=n("filter");c({target:"Array",proto:!0,forced:!a},{filter:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},"5a34":function(t,e,r){var c=r("44e7");t.exports=function(t){if(c(t))throw TypeError("The method doesn't accept regular expressions");return t}},"65f0":function(t,e,r){var c=r("861d"),i=r("e8b5"),n=r("b622"),a=n("species");t.exports=function(t,e){var r;return i(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!i(r.prototype)?c(r)&&(r=r[a],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},"83d0":function(t,e,r){"use strict";r("caad"),r("2532"),r("d81d"),r("99af"),r("a434");e["a"]={methods:{addToCart:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(this.shoppingCartProductList.carts.map((function(t){return t.product_id})).includes(t))this.$swal.fire("此商品以加入購物車");else{this.isLoading=!0;var r=this,c="".concat("https://vue3-course-api.hexschool.io","/api/").concat("ecommerce-website","/cart"),i={product_id:t,qty:e};r.$http.post(c,{data:i}).then((function(t){r.isLoading=!1,r.$httpMessageState(t,"加入購物車"),r.$emit("update-shopping-cart-products")}))}},localStorageFavoriteProductListManager:function(t,e){if("更新"===t){if(this.favoriteProductList.some((function(t){return t.id===e.id}))){var r=this.favoriteProductList.map((function(t){return t.id})).indexOf(e.id);return this.favoriteProductList.splice(r,1),localStorage.setItem("addedFavoriteProducts",JSON.stringify(this.favoriteProductList)),void this.$emit("update-favorite-products")}var c={id:e.id,imgUrl:e.imageUrl,title:e.title,price:e.price};this.favoriteProductList.push(c),localStorage.setItem("addedFavoriteProducts",JSON.stringify(this.favoriteProductList)),this.$emit("update-favorite-products")}else this.$emit("update-favorite-products")}}}},8418:function(t,e,r){"use strict";var c=r("c04e"),i=r("9bf2"),n=r("5c6c");t.exports=function(t,e,r){var a=c(e);a in t?i.f(t,a,n(0,r)):t[a]=r}},"962f":function(t,e,r){"use strict";e["a"]={data:function(){return{isLoading:!1,loadingObj:{bgc:"#FFFFFF",style:"dots",color:"#FF961F",height:128,width:128,opacity:.8}}}}},"99af":function(t,e,r){"use strict";var c=r("23e7"),i=r("d039"),n=r("e8b5"),a=r("861d"),o=r("7b0b"),s=r("50c4"),u=r("8418"),d=r("65f0"),l=r("1dde"),f=r("b622"),b=r("2d00"),p=f("isConcatSpreadable"),g=9007199254740991,j="Maximum allowed index exceeded",h=b>=51||!i((function(){var t=[];return t[p]=!1,t.concat()[0]!==t})),v=l("concat"),O=function(t){if(!a(t))return!1;var e=t[p];return void 0!==e?!!e:n(t)},m=!h||!v;c({target:"Array",proto:!0,forced:m},{concat:function(t){var e,r,c,i,n,a=o(this),l=d(a,0),f=0;for(e=-1,c=arguments.length;e<c;e++)if(n=-1===e?a:arguments[e],O(n)){if(i=s(n.length),f+i>g)throw TypeError(j);for(r=0;r<i;r++,f++)r in n&&u(l,f,n[r])}else{if(f>=g)throw TypeError(j);u(l,f++,n)}return l.length=f,l}})},"9fd0":function(t,e,r){"use strict";r.r(e);r("caad"),r("2532"),r("d81d");var c=r("7a23"),i={class:"user-page-home"},n={class:"carousel"},a={class:"carousel-page-list"},o={class:"recommend-product-container"},s=Object(c["j"])("span",{class:"recommend-product-name"},[Object(c["j"])("i",{class:"bi bi-hand-thumbs-up-fill"}),Object(c["i"])(" 優惠特價中 ")],-1),u=Object(c["i"])("查看更多 "),d=Object(c["j"])("i",{class:"bi bi-caret-right-fill"},null,-1),l={class:"recommend-product-list"},f={class:"product-item-title"},b={class:"ellipsis"},p={class:"product-price"},g={class:"origin-price"},j={class:"on-sale-price"},h={class:"card-btn-group"},v={key:1,class:"bi bi-heart"},O={key:0,class:"bi bi-cart-check-fill"},m={key:1,class:"bi bi-cart-plus-fill"},P={class:"featured-banner-top"},y=Object(c["j"])("img",{src:"images/04.jpg",alt:"橫幅卡片的圖片"},null,-1),w={class:"featured-banner-overlay-top"},k=Object(c["j"])("div",{class:"featured-banner-title"},[Object(c["i"])(" 專注健身有效率"),Object(c["j"])("br"),Object(c["i"])("生活飲食好均衡 ")],-1),x=Object(c["j"])("div",{class:"featured-banner-content"},[Object(c["i"])(" 疫情期間也享高品質服務"),Object(c["j"])("br"),Object(c["i"])("下單購買立刻出貨! ")],-1),C=Object(c["i"])("去逛逛"),L={class:"featured-banner-bottom"},S=Object(c["j"])("img",{src:"images/06.jpg",alt:"橫幅卡片的圖片"},null,-1),$={class:"featured-banner-overlay-bottom"},A=Object(c["j"])("div",{class:"featured-banner-title"},[Object(c["i"])(" 飲食均衡顧得好"),Object(c["j"])("br"),Object(c["i"])("身體健康沒煩惱 ")],-1),F=Object(c["j"])("div",{class:"featured-banner-content"},[Object(c["i"])(" 疫情期間也享高品質服務"),Object(c["j"])("br"),Object(c["i"])("下單購買立刻出貨! ")],-1),B=Object(c["i"])("去逛逛");function _(t,e,r,_,U,M){var T=Object(c["F"])("router-link"),E=Object(c["F"])("Loading");return Object(c["w"])(),Object(c["f"])("div",i,[Object(c["j"])("div",n,[Object(c["j"])(c["c"],{tag:"div",name:"prev"===U.direction?"prev":"next",class:"carousel-list"},{default:Object(c["R"])((function(){return[(Object(c["w"])(!0),Object(c["f"])(c["a"],null,Object(c["D"])(U.images,(function(t,e){return Object(c["S"])((Object(c["w"])(),Object(c["f"])("img",{key:t.id,src:t.src},null,8,["src"])),[[c["O"],e===U.current]])})),128))]})),_:1},8,["name"]),Object(c["j"])("div",{class:"carousel-btn carousel-btn-prev",onClick:e[1]||(e[1]=function(t){return M.changePage(U.current-1,U.changePageBtnStatus)})}," ❮ "),Object(c["j"])("div",{class:"carousel-btn carousel-btn-next",onClick:e[2]||(e[2]=function(t){return M.changePage(U.current+1,U.changePageBtnStatus)})}," ❯ "),Object(c["j"])("ul",a,[Object(c["j"])("li",{class:["carousel-page-item",{"carousel-page-item-active":0===U.current}],onClick:e[3]||(e[3]=function(t){return M.changePage(0,U.changePageBtnStatus)})},null,2),Object(c["j"])("li",{class:["carousel-page-item",{"carousel-page-item-active":1===U.current}],onClick:e[4]||(e[4]=function(t){return M.changePage(1,U.changePageBtnStatus)})},null,2),Object(c["j"])("li",{class:["carousel-page-item",{"carousel-page-item-active":2===U.current}],onClick:e[5]||(e[5]=function(t){return M.changePage(2,U.changePageBtnStatus)})},null,2),Object(c["j"])("li",{class:["carousel-page-item",{"carousel-page-item-active":3===U.current}],onClick:e[6]||(e[6]=function(t){return M.changePage(3,U.changePageBtnStatus)})},null,2),Object(c["j"])("li",{class:["carousel-page-item",{"carousel-page-item-active":4===U.current}],onClick:e[7]||(e[7]=function(t){return M.changePage(4,U.changePageBtnStatus)})},null,2)])]),Object(c["j"])("div",o,[s,Object(c["j"])(T,{class:"recommend-product-link",to:{name:"UserProducts"},onClick:e[8]||(e[8]=function(e){return t.$emit("change-current-page-style","UserProducts")})},{default:Object(c["R"])((function(){return[u,d]})),_:1})]),Object(c["j"])("div",l,[(Object(c["w"])(!0),Object(c["f"])(c["a"],null,Object(c["D"])(U.displayProducts,(function(e){return Object(c["w"])(),Object(c["f"])("div",{class:"product-item-card",key:e.id},[Object(c["j"])(T,{to:"/userproduct/".concat(e.id)},{default:Object(c["R"])((function(){return[Object(c["j"])("img",{src:e.imageUrl,alt:"商品圖片"},null,8,["src"])]})),_:2},1032,["to"]),Object(c["j"])("div",f,[Object(c["j"])("p",b,Object(c["I"])(e.title),1)]),Object(c["j"])("div",p,[Object(c["j"])("span",g,"$"+Object(c["I"])(t.$filters.currency(e.origin_price)),1),Object(c["j"])("span",j,"$"+Object(c["I"])(t.$filters.currency(e.price)),1)]),Object(c["j"])("div",h,[Object(c["j"])("div",{class:["favorite-list-btn",{"favorite-list-btn-disable":t.favoriteProductList.some((function(t){return t.id===e.id}))}],onClick:function(r){return t.localStorageFavoriteProductListManager("更新",e)}},[t.favoriteProductList.some((function(t){return t.id===e.id}))?(Object(c["w"])(),Object(c["f"])("i",{key:0,class:["bi bi-heart-fill",{"favorite-btn-disable":t.favoriteProductList.some((function(t){return t.id===e.id}))}]},null,2)):(Object(c["w"])(),Object(c["f"])("i",v))],10,["onClick"]),Object(c["j"])("div",{class:["shopping-cart-list-btn",{"shopping-cart-btn-disable":t.shoppingCartProductList.carts.map((function(t){return t.product_id})).includes(e.id)}],onClick:function(r){return t.addToCart(e.id)}},[t.shoppingCartProductList.carts.map((function(t){return t.product_id})).includes(e.id)?(Object(c["w"])(),Object(c["f"])("i",O)):(Object(c["w"])(),Object(c["f"])("i",m))],10,["onClick"])])])})),128))]),Object(c["j"])("div",P,[y,Object(c["j"])("div",w,[k,x,Object(c["j"])(T,{to:{name:"UserProducts"},onClick:e[9]||(e[9]=function(e){return t.$emit("change-current-page-style","UserProducts")}),class:"featured-banner-link"},{default:Object(c["R"])((function(){return[C]})),_:1})])]),Object(c["j"])("div",L,[S,Object(c["j"])("div",$,[A,F,Object(c["j"])(T,{to:{name:"UserProducts"},onClick:e[10]||(e[10]=function(e){return t.$emit("change-current-page-style","UserProducts")}),class:"featured-banner-link"},{default:Object(c["R"])((function(){return[B]})),_:1})])]),Object(c["j"])(E,{active:t.isLoading,"background-color":t.loadingObj.bgc,loader:t.loadingObj.style,color:t.loadingObj.color,opacity:t.loadingObj.opacity,height:t.loadingObj.height,width:t.loadingObj.width},null,8,["active","background-color","loader","color","opacity","height","width"])])}r("99af"),r("fb6a"),r("4de4");var U=r("83d0"),M=r("c668"),T=r("962f"),E={name:"Home",inject:["emitter"],mixins:[U["a"],M["a"],T["a"]],data:function(){return{current:0,direction:"",changePageBtnStatus:!0,images:[{id:1,src:"images/01.jpg"},{id:2,src:"images/02.jpg"},{id:3,src:"images/03.jpg"},{id:4,src:"images/04.jpg"},{id:5,src:"images/05.jpg"}],displayProducts:[]}},methods:{changePage:function(t,e){if(e){var r=this;r.changePageBtnStatus=!1,setTimeout((function(){r.changePageBtnStatus=!0}),1e3),r.direction=t>this.current?"next":"prev",r.current=(t+this.images.length)%this.images.length}},getProducts:function(){var t=this;this.isLoading=!0;var e=this,r="".concat("https://vue3-course-api.hexschool.io","/api/").concat("ecommerce-website","/products/all");e.$http.get(r).then((function(r){e.displayProducts=r.data.products.filter((function(t){return t.origin_price!==t.price})).slice(0,4),t.isLoading=!1}))}},created:function(){this.$emit("update-shopping-cart-products"),this.getProducts()}};E.render=_;e["default"]=E},a434:function(t,e,r){"use strict";var c=r("23e7"),i=r("23cb"),n=r("a691"),a=r("50c4"),o=r("7b0b"),s=r("65f0"),u=r("8418"),d=r("1dde"),l=d("splice"),f=Math.max,b=Math.min,p=9007199254740991,g="Maximum allowed length exceeded";c({target:"Array",proto:!0,forced:!l},{splice:function(t,e){var r,c,d,l,j,h,v=o(this),O=a(v.length),m=i(t,O),P=arguments.length;if(0===P?r=c=0:1===P?(r=0,c=O-m):(r=P-2,c=b(f(n(e),0),O-m)),O+r-c>p)throw TypeError(g);for(d=s(v,c),l=0;l<c;l++)j=m+l,j in v&&u(d,l,v[j]);if(d.length=c,r<c){for(l=m;l<O-c;l++)j=l+c,h=l+r,j in v?v[h]=v[j]:delete v[h];for(l=O;l>O-c+r;l--)delete v[l-1]}else if(r>c)for(l=O-c;l>m;l--)j=l+c-1,h=l+r-1,j in v?v[h]=v[j]:delete v[h];for(l=0;l<r;l++)v[l+m]=arguments[l+2];return v.length=O-c+r,d}})},ab13:function(t,e,r){var c=r("b622"),i=c("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(r){try{return e[i]=!1,"/./"[t](e)}catch(c){}}return!1}},b727:function(t,e,r){var c=r("0366"),i=r("44ad"),n=r("7b0b"),a=r("50c4"),o=r("65f0"),s=[].push,u=function(t){var e=1==t,r=2==t,u=3==t,d=4==t,l=6==t,f=7==t,b=5==t||l;return function(p,g,j,h){for(var v,O,m=n(p),P=i(m),y=c(g,j,3),w=a(P.length),k=0,x=h||o,C=e?x(p,w):r||f?x(p,0):void 0;w>k;k++)if((b||k in P)&&(v=P[k],O=y(v,k,m),t))if(e)C[k]=O;else if(O)switch(t){case 3:return!0;case 5:return v;case 6:return k;case 2:s.call(C,v)}else switch(t){case 4:return!1;case 7:s.call(C,v)}return l?-1:u||d?d:C}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6),filterOut:u(7)}},c668:function(t,e,r){"use strict";e["a"]={props:{favoriteProducts:{type:Array,default:function(){return[]}},shoppingCartProducts:{type:Object,default:function(){return{}}}},data:function(){return{favoriteProductList:this.favoriteProducts,shoppingCartProductList:{carts:[]}}},watch:{favoriteProducts:function(){this.favoriteProductList=this.favoriteProducts},shoppingCartProducts:function(){this.shoppingCartProductList=this.shoppingCartProducts}}}},caad:function(t,e,r){"use strict";var c=r("23e7"),i=r("4d64").includes,n=r("44d2");c({target:"Array",proto:!0},{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),n("includes")},d81d:function(t,e,r){"use strict";var c=r("23e7"),i=r("b727").map,n=r("1dde"),a=n("map");c({target:"Array",proto:!0,forced:!a},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},e8b5:function(t,e,r){var c=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==c(t)}},fb6a:function(t,e,r){"use strict";var c=r("23e7"),i=r("861d"),n=r("e8b5"),a=r("23cb"),o=r("50c4"),s=r("fc6a"),u=r("8418"),d=r("b622"),l=r("1dde"),f=l("slice"),b=d("species"),p=[].slice,g=Math.max;c({target:"Array",proto:!0,forced:!f},{slice:function(t,e){var r,c,d,l=s(this),f=o(l.length),j=a(t,f),h=a(void 0===e?f:e,f);if(n(l)&&(r=l.constructor,"function"!=typeof r||r!==Array&&!n(r.prototype)?i(r)&&(r=r[b],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return p.call(l,j,h);for(c=new(void 0===r?Array:r)(g(h-j,0)),d=0;j<h;j++,d++)j in l&&u(c,d,l[j]);return c.length=d,c}})}}]);
//# sourceMappingURL=chunk-f2a6f9da.a3216b02.js.map