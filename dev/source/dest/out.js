!function(){"use strict";var n=$("#game-bg"),l="bg";window._g.module(l,{flush:function(){this.game.canvas.call(this,n).clearRect(0,0,this.game.size().width,this.game.size().height)},dispatch:function(e){this.game.block.call(this,!0,l);var t=$.trim(e.value.replace(/^[a-z]+/i,""));t="bg$"+t.replace(/\//g,"$");var i=this.game.image(t);if(!1===i)return"wrong image name";var a=this.game.canvas.call(this,n);return this.module(l).flush.call(this),a.drawImage(i.img,0,0),this.game.block.call(this,!1,l),this.game.action.call(this,!0),!0}})}(),function(){"use strict";var a=$("#game-dialog-wrap"),n=$("#game-dialog-content"),l={},o="dialog";window._g.module(o,{dialogs:function(e){l=e},dispatch:function(e){var i=this;this.game.block.call(this,!0,o),a.show(),this.module("text").hide.call(this,!0);var t=l[e.value];return n.empty(),$.each(t,function(e,t){$("<div>").appendTo(n).html("<span>"+t.name+"</span>").on("click",function(){return a.hide(),console.log(t.label),i.game.block.call(i,!1,o),i.game.label.call(i,t.label),!1})}),!0}})}(),function(){"use strict";var l=window._g,t=$("#game-human-wrap"),o={};$.each(l.humanImages,function(e,t){var i=t.split("_");void 0===o[i[0]]&&(o[i[0]]={}),void 0===o[i[0]][i[1]]&&(o[i[0]][i[1]]={}),"emotion"===i[2]?(void 0===o[i[0]][i[1]].emotion&&(o[i[0]][i[1]].emotion={}),void 0===o[i[0]][i[1]].emotion[i[3]]&&(o[i[0]][i[1]].emotion[i[3]]={}),o[i[0]][i[1]].emotion[i[3]][i[4]]=!0):(void 0===o[i[0]][i[1]].body&&(o[i[0]][i[1]].body={}),void 0===o[i[0]][i[1]].body[i[2]]&&(o[i[0]][i[1]].body[i[2]]={}),o[i[0]][i[1]].body[i[2]][i[3]]=!0)});var s=function(e,i){var a=!1;return $.each(e,function(e,t){if(0<=$.inArray(e,i))return a=e,!1}),a},c={tl:null,tc:null,tr:null,bl:null,bc:null,br:null},r="human";l.module(r,{flush:function(){$.each(c,function(e,t){c[e]=null}),this.game.canvas.call(this,t).clearRect(0,0,this.game.size().width,this.game.size().height)},redraw:function(){var l=this.game.canvas.call(this,t),o=this.game.size().width,e=this.game.size().height;l.clearRect(0,0,o,e);var s=this.game.image;$.each(c,function(e,t){if(null===t)return!0;var i=0,a=0,n=s(t.img.b).width;s(t.img.b).height;"bottom"===t.pl.v&&(i+=100),"center"===t.pl.h?a=o/2-n/2:"right"===t.pl.h&&(a=o-n),l.drawImage(s(t.img.b).img,a,i),l.drawImage(s(t.img.e).img,a,i)})},dispatch:function(e){this.game.block.call(this,!1,r);var t=e.value.replace(/^human\s+/,"");t=$.trim(t.replace(/ {1,}/g," "));var i,a,n=(i=t.split(" "),a={a:"error",n:!1,p:!1,b:!1,bt:!1,e:!1,et:!1,img:{b:!1,e:!1},pl:{h:!1,v:!1}},0<=$.inArray("hide",i)&&(a.a="hide"),a.n=s(o,i),!1===a.n||(a.p=s(o[a.n],i),!1===a.p||void 0===o[a.n][a.p].body||(a.b=s(o[a.n][a.p].body,i),!1===a.b||(a.bt=s(o[a.n][a.p].body[a.b],[l.game.sun()]),!1===a.bt||void 0===o[a.n][a.p].emotion||(a.e=s(o[a.n][a.p].emotion,i),!1===a.e||(a.et=s(o[a.n][a.p].emotion[a.e],[l.game.sun()]),!1===a.et||(a.pl.h=s({left:!0,center:!0,right:!0},i),!1===a.pl.h&&(a.pl.h="center"),a.pl.v=s({top:!0,bottom:!0},i),!1===a.pl.v&&(a.pl.v="bottom"),a.img.b="human$"+[a.n,a.p,a.b,a.bt].join("_"),a.img.e="human$"+[a.n,a.p,"emotion",a.e,a.et].join("_"),a.a="show")))))),a);return"error"===n.a?"human error":("show"===n.a&&(c[n.pl.v[0]+n.pl.h[0]]=n,this._human.redraw.apply(this)),"hide"===n.a&&(!1===n.n?$.each(c,function(e,t){c[e]=null}):$.each(c,function(e,t){null!==t&&n.n===t.n&&(c[e]=null)}),this._human.redraw.apply(this)),this.game.block.call(this,!1,r),this.game.action.call(this,!0),!0)}})}(),function(){"use strict";var n=window._g,l=$("#game-screen-wrap"),a=function(e,t){return 0<(t-=e.toString().length)?new Array(t+(/\./.test(e)?2:1)).join("0")+e:e+""},e=function(e){var t=this.game.image(e).img,i=this.game.canvas.call(this,l);i.clearRect(0,0,this.game.size().width,this.game.size().height),i.drawImage(t,0,0),this.game.block.call(this,!1,s)},o=function(t){var i=this.game.canvas.apply(this,[l]),a=function(){var e=t.shift();void 0!==e?(i.clearRect(0,0,n.game.size().width,n.game.size().height),i.drawImage(e,0,0),setTimeout(a,160,t)):n.game.block.call(this,!1,s)};a()},i={landing:function(){e.call(this,"bg$screen$landing")},weekLater:function(){e.call(this,"bg$screen$date$weekLater")},shuttle:function(){e.call(this,"bg$screen$shuttle_fly")},prologue_start:function(){e.call(this,"bg$screen$prologue$001")},prologue_anim:function(){this.game.block.call(this,!0,s);for(var e=[],t=2;t<=22;t++)e.push(n.game.image("bg$screen$prologue$"+a(t,3)).img);o.call(this,e)},day01_dawn:function(){this.game.block.call(this,!0,s);for(var t=[],e=function(e){t.push(n.game.image("bg$screen$prologue$"+e).img)},i=22;i<=29;i++)e(a(i,3));e("029_dawn"),o.call(this,t)}},s="screen";n.module(s,{hide:function(){l.empty().hide(),this.module(s).active.call(this,!1)},active:function(e){l[e?"addClass":"removeClass"]("active")},dispatch:function(e){this.game.block.call(this,!0,s),l.show();var t=$.trim(e.value.replace(/^[a-z]+/i,""));return"function"==typeof i[t]?(this._screen.active.apply(this,[!0]),i[t].apply(this)):alert("Screen: "+t),!0}})}(),function(){"use strict";var l={},t=$("#game-text-wrap"),o=$("#game-text"),s=$("#game-text-name-wrap"),c=$("#game-text-name"),r="text";window._g.module(r,{hide:function(e){t[!0===e?"hide":"show"]()},dispatch:function(e){this.game.block.call(this,!0,r),this.module(r).hide.call(this,!1);var t=e.value.replace(/^(text|say)\s+/,""),i=t.match(/^define\s+([a-z_]+)/i);if(null!==i&&2===i.length)return this.game.block.call(this,!1,r),l[i[1]]=t.replace(/^define\s+([a-z_]+)\s+/i,""),this.game.action.call(this,!0),!0;var a=!1;null!==(i=t.match(/^([a-z_]+)/i))&&(a=void 0!==l[i[0]]);var n=!1===a?t:t.replace(/^[a-z_]+\s+/i,"");return s[a?"show":"hide"](),c.html(a?l[i[0]]:""),o.html(n),this.game.block.call(this,!1,r),!0}})}(),function(){"use strict";var f=[],s=-1,c="day",i=window._g,v={},t={},a={},p={},w=0,n=0,b=i.isDev,l=$("#dev_log"),o=$("#dev_wrapper"),m=$("#game-menu-btn-start");i.game={isBlock:function(){var i=!1;return $.each(a,function(e,t){if(!0===t)return!(i=!0)}),i},block:function(e,t){void 0===t&&(t="main"),a[t]=e},instance:function(){return n},sun:function(){return c},canvas:function(e){var t=e.attr("id")+"-canvas";0===$("#"+t).length&&$("<canvas>").prependTo(e).attr("id",t);var i=document.getElementById(t);return i.width=this.game.size().width,i.height=this.game.size().height,i.getContext("2d")},image:function(e){return void 0!==t[e]?t[e]:void 0!==t[e+"_"+c]&&t[e+"_"+c]},images:function(e){t=e},size:function(){return{width:1200,height:800}},time:function(e){return void 0===e&&0<=["day","night","sunset","dawn"].indexOf(e)&&(i=e),c},reset:function(){a={main:!0},c="day",n++,s=-1,$.each(i.modules,function(e,t){"function"==typeof i[t].flush&&i[t].flush.call(i)}),$("body").removeClass("production"),this.isDev&&$("#dev_wrapper").show(),$("#game-message").hide(),$("#game-wrapper").show(),$("#game-text-wrap").show(),$("#game-menu").show()},actions:function(e){var c=e.split(/\r|\n|\r\n/),t=function(e){l.prepend("<div>"+e+"</div>")};b&&(l.empty(),t("Начинаем обработку сюжета")),n++,s=-1,f=[],v={},p={};var r=w=0,h=$("<div>").appendTo("#game-message"),m=new RegExp("^("+["bg","human","screen","text","say","label","go","delay","shake","sun"].join("|")+")","i"),u=!1,g=!1,d=[];$.each(c,function(e,t){if(h.html("Обработка сюжета: "+(e+1)+"/"+c.length),t=$.trim(t.replace(/ {1,}/g," ")),r++,/^\/\*/.test(t))u=!0;else if(/\*\/$/.test(t))return!(u=!1);if(""===t||/^\/\//.test(t)||u)return!0;var i=f.length;if("dialog"===t&&!g)return d=[],g=!0;if("dialog"!==t&&g){var a={label:null,name:null};if(null!==(o=t.match(/^([a-z_0-9]+)/i))&&2===o.length){a.label=$.trim(o[1]);var n=new RegExp("^"+o[1],"i");a.name=$.trim(t.replace(n,"")),d.push(a)}return!0}if("dialog"===t&&g){var l=++w;return p[l]=d,g=!1,f.push({module:"dialog",id:{string:r,action:i},value:l}),!0}var o,s=t.match(m);("say"===(s=null===s?"text":s[0])&&(s="text"),"label"===s)&&(null!==(o=t.match(/^label\s+([a-z_0-9]+)/i))&&2===o.length&&(v[o[1]]=i));f.push({module:s,id:{string:r,action:i},value:t})}),this.module("dialog").dialogs.call(this,p),this.isDev&&t("Обработка окончена"),i.game.reset.call(this)},label:function(e){void 0!==v[e]?this.game.action.call(this,v[e]):alert("Label error: "+e)},action:function(e){var t=this;if(!this.game.isBlock()){if(!0===e?s++:Number.isInteger(e)&&(s=e),void 0===f[s])return alert("К сожалению дальнейшая часть игры ещё не готова :("),void this.game.reset.call(this);var i=f[s];if(b&&$("<div>").prependTo("#dev_log").html("Строка <b>"+i.id.string+"</b>: "+i.value),"label"!==i.module){if("go"===i.module)this.game.label.call(this,i.value.replace(/^go\s+/,""));else{if("delay"===i.module){var a=parseFloat(i.value.replace(/^delay/,""));return this.game.block.call(this,!0),void setTimeout(function(){t.game.block.call(this,!1),t.game.action.call(t,!0)},1e3*a)}if("shake"===i.module)this.game.block.call(this,!0),$("body").css("overflow","hidden"),$("#game-wrapper").effect("shake",{direction:"left",distance:20,times:2},200,function(){t.game.block.call(this,!1),$("body").removeAttr("style"),t.game.action.call(t,!0)});else if("sun"===i.module){var n=$.trim(i.value.replace(/^sun/,""));return 0<=$.inArray(n,["day","night","dawn","sunset"])&&(c=n),void this.game.action.call(this,!0)}}var l="_"+i.module;if("screen"!==i.module&&this.module("screen").hide.call(this),void 0===this[l]||"function"!=typeof this[l].dispatch);else{var o=this[l].dispatch.apply(this,[i]);!0!==o&&(console.warn(o,i),this.game.block.call(this,!0))}}else this.game.action.call(this,!0)}},preload:function(){var e,t,c=$("#game-message"),r=this.game,h=this;m.on("click",function(e){return r.reset.call(h),a={},r.action.call(h,!0),$("#game-menu").hide(),!1}),o.on("click",function(e){var t=$(e.target).closest(".game-dev-demo-btn");if(0<t.length){var i=o.find("input,button").prop("disabled",!0);$.get(t.data("href"),function(e){i.prop("disabled",!1),r.actions.call(h,e),m.trigger("click"),$("html,body").animate({scrollTop:0},600)})}}),$("#game").on("click",function(){r.action.call(h,!0)}),$(window).keydown(function(e){if(32===e.keyCode)return r.action.call(h,!0),!1}),$(window).on("mousedown",function(){t=setTimeout(function(){e=setInterval(function(){r.action.call(h,!0)},100)},1e3)}).on("mouseup",function(){clearTimeout(t),clearInterval(e)}),this.isDev&&$("#dev_file-btn").on("click",function(){if(window.File&&window.FileReader&&window.FileList&&window.Blob){var e=document.getElementById("dev_file");if(e.files)if(e.files[0]){var t=e.files[0],i=new FileReader;i.onload=function(){var e=i.result;alert("Файл загружен, можете начать новую игру."),$("html,body").scrollTop(0),r.actions.call(h,e)},i.readAsText(t,"windows-1251")}else alert("Файл не выбран");else alert("Ваш браузер не поддерживает .files")}else alert("Ваш браузер не поддерживает FileAPI")});var i=$("#image-loading");i.imagesLoaded().done(function(e){var t,l,o,s;t=i.children("img"),l=0,o=t.length,s={},t.each(function(e,t){var i=new Image,a=$(this).data("name"),n=$(this).attr("src");i.onload=function(){l++,s[a]={img:this,src:n,width:this.width,height:this.height},l===o&&(h.game.images(s),$("<div>").appendTo(c).html("Загрузка сюжета"),$.get(h.domain+"/story.txt?v="+(new Date).getTime(),function(e){r.actions.call(h,e)}).fail(function(){alert("Не удалось загрузить сюжет. Страница будет обновлена."),window.location.reload(!0)}))},i.src=n})}).fail(function(){alert("Не все изображения были загружены. Страница будет обновлена"),window.location.reload(!0)}).progress(function(e,t){var i=parseInt(h.imageCount);c.html("Загрузка изображений: "+e.progressedCount+"/"+i),t.isLoaded||console.warn(t)})}},i.game.preload.call(i)}();
//# sourceMappingURL=out.js.map