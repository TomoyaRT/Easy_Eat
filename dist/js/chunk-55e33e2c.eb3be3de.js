(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-55e33e2c"],{"1dde":function(t,r,e){var c=e("d039"),i=e("b622"),n=e("2d00"),o=i("species");t.exports=function(t){return n>=51||!c((function(){var r=[],e=r.constructor={};return e[o]=function(){return{foo:1}},1!==r[t](Boolean).foo}))}},2532:function(t,r,e){"use strict";var c=e("23e7"),i=e("5a34"),n=e("1d80"),o=e("ab13");c({target:"String",proto:!0,forced:!o("includes")},{includes:function(t){return!!~String(n(this)).indexOf(i(t),arguments.length>1?arguments[1]:void 0)}})},"44e7":function(t,r,e){var c=e("861d"),i=e("c6b6"),n=e("b622"),o=n("match");t.exports=function(t){var r;return c(t)&&(void 0!==(r=t[o])?!!r:"RegExp"==i(t))}},5899:function(t,r){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,r,e){var c=e("1d80"),i=e("5899"),n="["+i+"]",o=RegExp("^"+n+n+"*"),a=RegExp(n+n+"*$"),s=function(t){return function(r){var e=String(c(r));return 1&t&&(e=e.replace(o,"")),2&t&&(e=e.replace(a,"")),e}};t.exports={start:s(1),end:s(2),trim:s(3)}},"5a34":function(t,r,e){var c=e("44e7");t.exports=function(t){if(c(t))throw TypeError("The method doesn't accept regular expressions");return t}},"65f0":function(t,r,e){var c=e("861d"),i=e("e8b5"),n=e("b622"),o=n("species");t.exports=function(t,r){var e;return i(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!i(e.prototype)?c(e)&&(e=e[o],null===e&&(e=void 0)):e=void 0),new(void 0===e?Array:e)(0===r?0:r)}},7156:function(t,r,e){var c=e("861d"),i=e("d2bb");t.exports=function(t,r,e){var n,o;return i&&"function"==typeof(n=r.constructor)&&n!==e&&c(o=n.prototype)&&o!==e.prototype&&i(t,o),t}},"83d0":function(t,r,e){"use strict";e("caad"),e("2532"),e("d81d"),e("99af"),e("a434");r["a"]={methods:{addToCart:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;if(this.shoppingCartProductList.carts.map((function(t){return t.product_id})).includes(t))this.$swal.fire("此商品以加入購物車");else{this.isLoading=!0;var e=this,c="".concat("https://vue3-course-api.hexschool.io","/api/").concat("ecommerce-website","/cart"),i={product_id:t,qty:r};e.$http.post(c,{data:i}).then((function(t){e.isLoading=!1,e.$httpMessageState(t,"加入購物車"),e.$emit("update-shopping-cart-products")}))}},localStorageFavoriteProductListManager:function(t,r){if("更新"===t){if(this.favoriteProductList.some((function(t){return t.id===r.id}))){var e=this.favoriteProductList.map((function(t){return t.id})).indexOf(r.id);return this.favoriteProductList.splice(e,1),localStorage.setItem("addedFavoriteProducts",JSON.stringify(this.favoriteProductList)),void this.$emit("update-favorite-products")}var c={id:r.id,imgUrl:r.imageUrl,title:r.title,price:r.price};this.favoriteProductList.push(c),localStorage.setItem("addedFavoriteProducts",JSON.stringify(this.favoriteProductList)),this.$emit("update-favorite-products")}else this.$emit("update-favorite-products")}}}},8418:function(t,r,e){"use strict";var c=e("c04e"),i=e("9bf2"),n=e("5c6c");t.exports=function(t,r,e){var o=c(r);o in t?i.f(t,o,n(0,e)):t[o]=e}},"85a6":function(t,r,e){"use strict";r["a"]={created:function(){this.$emit("update-shopping-cart-products")}}},"962f":function(t,r,e){"use strict";r["a"]={data:function(){return{isLoading:!1,loadingObj:{bgc:"#FFFFFF",style:"dots",color:"#FF961F",height:128,width:128,opacity:.8}}}}},"99af":function(t,r,e){"use strict";var c=e("23e7"),i=e("d039"),n=e("e8b5"),o=e("861d"),a=e("7b0b"),s=e("50c4"),u=e("8418"),d=e("65f0"),l=e("1dde"),p=e("b622"),f=e("2d00"),b=p("isConcatSpreadable"),h=9007199254740991,j="Maximum allowed index exceeded",g=f>=51||!i((function(){var t=[];return t[b]=!1,t.concat()[0]!==t})),v=l("concat"),O=function(t){if(!o(t))return!1;var r=t[b];return void 0!==r?!!r:n(t)},m=!g||!v;c({target:"Array",proto:!0,forced:m},{concat:function(t){var r,e,c,i,n,o=a(this),l=d(o,0),p=0;for(r=-1,c=arguments.length;r<c;r++)if(n=-1===r?o:arguments[r],O(n)){if(i=s(n.length),p+i>h)throw TypeError(j);for(e=0;e<i;e++,p++)e in n&&u(l,p,n[e])}else{if(p>=h)throw TypeError(j);u(l,p++,n)}return l.length=p,l}})},a434:function(t,r,e){"use strict";var c=e("23e7"),i=e("23cb"),n=e("a691"),o=e("50c4"),a=e("7b0b"),s=e("65f0"),u=e("8418"),d=e("1dde"),l=d("splice"),p=Math.max,f=Math.min,b=9007199254740991,h="Maximum allowed length exceeded";c({target:"Array",proto:!0,forced:!l},{splice:function(t,r){var e,c,d,l,j,g,v=a(this),O=o(v.length),m=i(t,O),y=arguments.length;if(0===y?e=c=0:1===y?(e=0,c=O-m):(e=y-2,c=f(p(n(r),0),O-m)),O+e-c>b)throw TypeError(h);for(d=s(v,c),l=0;l<c;l++)j=m+l,j in v&&u(d,l,v[j]);if(d.length=c,e<c){for(l=m;l<O-c;l++)j=l+c,g=l+e,j in v?v[g]=v[j]:delete v[g];for(l=O;l>O-c+e;l--)delete v[l-1]}else if(e>c)for(l=O-c;l>m;l--)j=l+c-1,g=l+e-1,j in v?v[g]=v[j]:delete v[g];for(l=0;l<e;l++)v[l+m]=arguments[l+2];return v.length=O-c+e,d}})},a9e3:function(t,r,e){"use strict";var c=e("83ab"),i=e("da84"),n=e("94ca"),o=e("6eeb"),a=e("5135"),s=e("c6b6"),u=e("7156"),d=e("c04e"),l=e("d039"),p=e("7c73"),f=e("241c").f,b=e("06cf").f,h=e("9bf2").f,j=e("58a8").trim,g="Number",v=i[g],O=v.prototype,m=s(p(O))==g,y=function(t){var r,e,c,i,n,o,a,s,u=d(t,!1);if("string"==typeof u&&u.length>2)if(u=j(u),r=u.charCodeAt(0),43===r||45===r){if(e=u.charCodeAt(2),88===e||120===e)return NaN}else if(48===r){switch(u.charCodeAt(1)){case 66:case 98:c=2,i=49;break;case 79:case 111:c=8,i=55;break;default:return+u}for(n=u.slice(2),o=n.length,a=0;a<o;a++)if(s=n.charCodeAt(a),s<48||s>i)return NaN;return parseInt(n,c)}return+u};if(n(g,!v(" 0o1")||!v("0b1")||v("+0x1"))){for(var C,I=function(t){var r=arguments.length<1?0:t,e=this;return e instanceof I&&(m?l((function(){O.valueOf.call(e)})):s(e)!=g)?u(new v(y(r)),e,I):y(r)},x=c?f(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),P=0;x.length>P;P++)a(v,C=x[P])&&!a(I,C)&&h(I,C,b(v,C));I.prototype=O,O.constructor=I,o(i,g,I)}},ab13:function(t,r,e){var c=e("b622"),i=c("match");t.exports=function(t){var r=/./;try{"/./"[t](r)}catch(e){try{return r[i]=!1,"/./"[t](r)}catch(c){}}return!1}},b727:function(t,r,e){var c=e("0366"),i=e("44ad"),n=e("7b0b"),o=e("50c4"),a=e("65f0"),s=[].push,u=function(t){var r=1==t,e=2==t,u=3==t,d=4==t,l=6==t,p=7==t,f=5==t||l;return function(b,h,j,g){for(var v,O,m=n(b),y=i(m),C=c(h,j,3),I=o(y.length),x=0,P=g||a,S=r?P(b,I):e||p?P(b,0):void 0;I>x;x++)if((f||x in y)&&(v=y[x],O=C(v,x,m),t))if(r)S[x]=O;else if(O)switch(t){case 3:return!0;case 5:return v;case 6:return x;case 2:s.call(S,v)}else switch(t){case 4:return!1;case 7:s.call(S,v)}return l?-1:u||d?d:S}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6),filterOut:u(7)}},c2ca:function(t,r,e){"use strict";e.r(r);e("caad"),e("2532"),e("d81d");var c=e("7a23"),i={class:"user-page-product"},n={class:"product-container"},o={class:"product-img-container"},a={key:1,class:"overlay-img"},s={class:"product-detail-container"},u={class:"product-tag"},d={class:"product-title"},l={class:"product-price-container"},p={class:"product-promotional-price"},f={class:"product-origin-price"},b={class:"product-nutrient-content"},h=Object(c["j"])("div",{class:"product-nutrition-title"},"營養成分",-1),j={class:"nutrient-content"},g=Object(c["j"])("div",{class:"content-group"},[Object(c["j"])("i",{class:"fas fa-fire-alt"}),Object(c["j"])("span",{class:"content"},"熱量 ")],-1),v={class:"number-group"},O={class:"number"},m=Object(c["j"])("span",{class:"unit"}," 卡",-1),y=Object(c["j"])("div",{class:"content-group"},[Object(c["j"])("i",{class:"fas fa-drumstick-bite"}),Object(c["j"])("span",{class:"content"},"蛋白質 ")],-1),C={class:"number-group"},I={class:"number"},x=Object(c["j"])("span",{class:"unit"}," 克",-1),P=Object(c["j"])("div",{class:"content-group"},[Object(c["j"])("i",{class:"fas fa-tint"}),Object(c["j"])("span",{class:"content"},"油脂 ")],-1),S={class:"number-group"},w={class:"number"},F=Object(c["j"])("span",{class:"unit"}," 克",-1),N=Object(c["j"])("div",{class:"content-group"},[Object(c["j"])("i",{class:"fas fa-seedling"}),Object(c["j"])("span",{class:"content"},"碳水化合物 ")],-1),L={class:"number-group"},A={class:"number"},q=Object(c["j"])("span",{class:"unit"}," 克",-1),E={class:"product-information"},k=Object(c["j"])("div",{class:"product-information-title"},"商品資訊",-1),T={class:"product-information-content"},_={class:"product-purchase-quantity"},$=Object(c["j"])("span",{class:"product-purchase-quantity-title"},"選購數量 ",-1),M={class:"product-btn-group"};function U(t,r,e,U,R,V){var J=Object(c["F"])("Loading");return Object(c["w"])(),Object(c["f"])("div",i,[Object(c["j"])("div",n,[Object(c["j"])("div",o,[R.productStatus?(Object(c["w"])(),Object(c["f"])("img",{key:0,src:R.product.imageUrl,alt:"產品圖片"},null,8,["src"])):(Object(c["w"])(),Object(c["f"])("div",a))]),Object(c["j"])("div",s,[Object(c["j"])("div",u,Object(c["I"])(R.productStatus?R.product.category:"類別"),1),Object(c["j"])("h1",d,Object(c["I"])(R.productStatus?R.product.title:"商品名稱"),1),Object(c["j"])("div",l,[Object(c["j"])("div",p," $"+Object(c["I"])(R.productStatus?V.priceCalculation:0),1),Object(c["j"])("div",f,Object(c["I"])(R.productStatus?V.originPriceCalculation:""),1)]),Object(c["j"])("div",b,[h,Object(c["j"])("ul",j,[Object(c["j"])("li",null,[g,Object(c["j"])("div",v,[Object(c["j"])("span",O,Object(c["I"])(R.productStatus?V.caloriesCalculation:0),1),m])]),Object(c["j"])("li",null,[y,Object(c["j"])("div",C,[Object(c["j"])("span",I,Object(c["I"])(R.productStatus?V.proteinCalculation:0),1),x])]),Object(c["j"])("li",null,[P,Object(c["j"])("div",S,[Object(c["j"])("span",w,Object(c["I"])(R.productStatus?V.fatCalculation:0),1),F])]),Object(c["j"])("li",null,[N,Object(c["j"])("div",L,[Object(c["j"])("span",A,Object(c["I"])(R.productStatus?V.carbohydratesCalculation:0),1),q])])])]),Object(c["j"])("div",E,[k,Object(c["j"])("p",T,Object(c["I"])(R.productStatus?R.product.content:"商品的簡介..."),1)]),Object(c["j"])("div",_,[$,Object(c["j"])("i",{class:["bi bi-dash-lg",{"dash-disabled":R.qty<=1}],onClick:r[1]||(r[1]=function(t){return R.qty--})},null,2),Object(c["S"])(Object(c["j"])("input",{type:"text","onUpdate:modelValue":r[2]||(r[2]=function(t){return R.qty=t}),minlength:"1",maxlength:"2",required:""},null,512),[[c["N"],R.qty]]),Object(c["j"])("i",{class:["bi bi-plus-lg",{"plus-disabled":R.qty>=99}],onClick:r[3]||(r[3]=function(t){return R.qty++})},null,2)]),Object(c["j"])("div",M,[Object(c["j"])("button",{class:["product-add-like",{"add-like-btn-disable":t.favoriteProductList.some((function(t){return t.id===R.product.id}))}],onClick:r[4]||(r[4]=function(r){return t.localStorageFavoriteProductListManager("更新",R.product)})},Object(c["I"])(t.favoriteProductList.some((function(t){return t.id===R.product.id}))?"已加入我的最愛":"加入我的最愛"),3),Object(c["j"])("button",{class:["product-add-cart",{"add-cart-btn-disable":t.shoppingCartProductList.carts.map((function(t){return t.product_id})).includes(R.product.id)}],onClick:r[5]||(r[5]=function(r){return t.addToCart(R.product.id,R.qty)})},Object(c["I"])(t.shoppingCartProductList.carts.map((function(t){return t.product_id})).includes(R.product.id)?"已加入購物車":"加入購物車"),3)])])]),Object(c["j"])(J,{active:R.isLoading,"background-color":t.loadingObj.bgc,loader:t.loadingObj.style,color:t.loadingObj.color,opacity:t.loadingObj.opacity,height:t.loadingObj.height,width:t.loadingObj.width},null,8,["active","background-color","loader","color","opacity","height","width"])])}e("b680"),e("a9e3"),e("99af");var R=e("83d0"),V=e("c668"),J=e("962f"),G=e("85a6"),X={name:"Product",inject:["emitter"],mixins:[R["a"],V["a"],J["a"],G["a"]],data:function(){return{productId:"",product:{nutrientContent:{}},qty:1,isLoading:!1,productStatus:!1}},watch:{qty:function(t){if(t<1||isNaN(t))return this.qty=1}},computed:{priceCalculation:function(){return this.product.price*this.qty},originPriceCalculation:function(){return this.product.origin_price*this.qty},caloriesCalculation:function(){return parseFloat(Number(this.product.nutrientContent.calories*this.qty).toFixed(2))},proteinCalculation:function(){return parseFloat(Number(this.product.nutrientContent.protein*this.qty).toFixed(2))},fatCalculation:function(){return parseFloat(Number(this.product.nutrientContent.fat*this.qty).toFixed(2))},carbohydratesCalculation:function(){return parseFloat(Number(this.product.nutrientContent.carbohydrates*this.qty).toFixed(2))}},methods:{getProduct:function(){var t=this,r="".concat("https://vue3-course-api.hexschool.io","/api/").concat("ecommerce-website","/product/").concat(t.productId);t.$http.get(r).then((function(r){r.data.success&&(t.product=r.data.product,t.productStatus=!0)}))}},created:function(){this.productId=this.$route.params.id,this.getProduct()}};X.render=U;r["default"]=X},c668:function(t,r,e){"use strict";r["a"]={props:{favoriteProducts:{type:Array,default:function(){return[]}},shoppingCartProducts:{type:Object,default:function(){return{}}}},data:function(){return{favoriteProductList:this.favoriteProducts,shoppingCartProductList:{carts:[]}}},watch:{favoriteProducts:function(){this.favoriteProductList=this.favoriteProducts},shoppingCartProducts:function(){this.shoppingCartProductList=this.shoppingCartProducts}}}},caad:function(t,r,e){"use strict";var c=e("23e7"),i=e("4d64").includes,n=e("44d2");c({target:"Array",proto:!0},{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),n("includes")},d81d:function(t,r,e){"use strict";var c=e("23e7"),i=e("b727").map,n=e("1dde"),o=n("map");c({target:"Array",proto:!0,forced:!o},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},e8b5:function(t,r,e){var c=e("c6b6");t.exports=Array.isArray||function(t){return"Array"==c(t)}}}]);
//# sourceMappingURL=chunk-55e33e2c.eb3be3de.js.map