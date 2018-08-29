(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery"],function(c){return(b(c));});}else{if(typeof exports==="object"){module.exports=b(require("jquery"));}else{b(jQuery);}}}(this,function(f){var l,m;m={ESC:27,TAB:9,ENTER:13,CTRL:17,A:65,P:80,N:78,LEFT:37,UP:38,RIGHT:39,DOWN:40,BACKSPACE:8,SPACE:32};l={beforeSave:function(n){return e.arrayToDefaultHash(n);},matcher:function(s,v,p,q){var u,t,o,r,n;s=s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");if(p){s="(?:^|\\s)"+s;}u=decodeURI("%C3%80");t=decodeURI("%C3%BF");n=q?" ":"";r=new RegExp(s+"([A-Za-z"+u+"-"+t+"0-9_"+n+"'.+-]*)$|"+s+"([^\\x00-\\xff]*)$","gi");o=r.exec(v);if(o){return o[2]||o[1];}else{return null;}},filter:function(s,r,t){var o,p,q,n;o=[];for(p=0,n=r.length;p<n;p++){q=r[p];if(~new String(q[t]).toLowerCase().indexOf(s.toLowerCase())){o.push(q);}}return o;},remoteFilter:null,sorter:function(s,p,t){var o,q,r,n;if(!s){return p;}o=[];for(q=0,n=p.length;q<n;q++){r=p[q];r.atwho_order=new String(r[t]).toLowerCase().indexOf(s.toLowerCase());if(r.atwho_order>-1){o.push(r);}}return o.sort(function(v,u){return v.atwho_order-u.atwho_order;});},tplEval:function(o,q){var n,r,p;p=o;try{if(typeof o!=="string"){p=o(q);}return p.replace(/\$\{([^\}]*)\}/g,function(s,t,u){return q[t];});}catch(r){n=r;return"";}},highlighter:function(n,p){var o;if(!p){return n;}o=new RegExp(">\\s*([^<]*?)("+p.replace("+","\\+")+")([^<]*)\\s*<","ig");return n.replace(o,function(s,q,t,r){return"> "+q+"<strong>"+t+"</strong>"+r+" <";});},beforeInsert:function(n,p,o){return n;},beforeReposition:function(n){return n;},afterMatchFailed:function(n,o){}};var d;d=(function(){function n(o){this.currentFlag=null;this.controllers={};this.aliasMaps={};this.$inputor=f(o);this.setupRootElement();this.listen();}n.prototype.createContainer=function(p){var o;if((o=this.$el)!=null){o.remove();}return f(p.body).append(this.$el=f("<div class='atwho-container'></div>"));};n.prototype.setupRootElement=function(p,r){var o,q;if(r==null){r=false;}if(p){this.window=p.contentWindow;this.document=p.contentDocument||this.window.document;this.iframe=p;}else{this.document=this.$inputor[0].ownerDocument;this.window=this.document.defaultView||this.document.parentWindow;try{this.iframe=this.window.frameElement;}catch(q){o=q;this.iframe=null;if(f.fn.atwho.debug){throw new Error("iframe auto-discovery is failed.\nPlease use `setIframe` to set the target iframe manually.\n"+o);}}}return this.createContainer((this.iframeAsRoot=r)?this.document:document);};n.prototype.controller=function(o){var s,q,r,p;if(this.aliasMaps[o]){q=this.controllers[this.aliasMaps[o]];}else{p=this.controllers;for(r in p){s=p[r];if(r===o){q=s;break;}}}if(q){return q;}else{return this.controllers[this.currentFlag];}};n.prototype.setContextFor=function(o){this.currentFlag=o;return this;};n.prototype.reg=function(p,q){var r,o;o=(r=this.controllers)[p]||(r[p]=this.$inputor.is("[contentEditable]")?new b(this,p):new g(this,p));if(q.alias){this.aliasMaps[q.alias]=p;}o.init(q);return this;};n.prototype.listen=function(){return this.$inputor.on("compositionstart",(function(o){return function(q){var p;if((p=o.controller())!=null){p.view.hide();}o.isComposing=true;return null;};})(this)).on("compositionend",(function(o){return function(p){o.isComposing=false;setTimeout(function(q){return o.dispatch(q);});return null;};})(this)).on("keyup.atwhoInner",(function(o){return function(p){return o.onKeyup(p);};})(this)).on("keydown.atwhoInner",(function(o){return function(p){return o.onKeydown(p);};})(this)).on("blur.atwhoInner",(function(o){return function(p){var q;if(q=o.controller()){q.expectedQueryCBId=null;return q.view.hide(p,q.getOpt("displayTimeout"));}};})(this)).on("click.atwhoInner",(function(o){return function(p){return o.dispatch(p);};})(this)).on("scroll.atwhoInner",(function(o){return function(){var p;p=o.$inputor.scrollTop();return function(s){var r,q;r=s.target.scrollTop;if(p!==r){if((q=o.controller())!=null){q.view.hide(s);}}p=r;return true;};};})(this)());};n.prototype.shutdown=function(){var o,q,p;p=this.controllers;for(o in p){q=p[o];q.destroy();delete this.controllers[o];}this.$inputor.off(".atwhoInner");return this.$el.remove();};n.prototype.dispatch=function(r){var o,s,q,p;q=this.controllers;p=[];for(o in q){s=q[o];p.push(s.lookUp(r));}return p;};n.prototype.onKeyup=function(p){var o;switch(p.keyCode){case m.ESC:p.preventDefault();if((o=this.controller())!=null){o.view.hide();}break;case m.DOWN:case m.UP:case m.CTRL:case m.ENTER:f.noop();break;case m.P:case m.N:if(!p.ctrlKey){this.dispatch(p);}break;default:this.dispatch(p);}};n.prototype.onKeydown=function(q){var p,o;o=(p=this.controller())!=null?p.view:void 0;if(!(o&&o.visible())){return;}switch(q.keyCode){case m.ESC:q.preventDefault();o.hide(q);break;case m.UP:q.preventDefault();o.prev();break;case m.DOWN:q.preventDefault();o.next();break;case m.P:if(!q.ctrlKey){return;}q.preventDefault();o.prev();break;case m.N:if(!q.ctrlKey){return;}q.preventDefault();o.next();break;case m.TAB:case m.ENTER:case m.SPACE:if(!o.visible()){return;}if(!this.controller().getOpt("spaceSelectsMatch")&&q.keyCode===m.SPACE){return;}if(!this.controller().getOpt("tabSelectsMatch")&&q.keyCode===m.TAB){return;}if(o.highlighted()){q.preventDefault();o.choose(q);}else{o.hide(q);}break;default:f.noop();}};return n;})();var e,k=[].slice;e=(function(){n.prototype.uid=function(){return(Math.random().toString(16)+"000000000").substr(2,8)+(new Date().getTime());};function n(p,o){this.app=p;this.at=o;this.$inputor=this.app.$inputor;this.id=this.$inputor[0].id||this.uid();this.expectedQueryCBId=null;this.setting=null;this.query=null;this.pos=0;this.range=null;if((this.$el=f("#atwho-ground-"+this.id,this.app.$el)).length===0){this.app.$el.append(this.$el=f("<div id='atwho-ground-"+this.id+"'></div>"));}this.model=new c(this);this.view=new a(this);}n.prototype.init=function(o){this.setting=f.extend({},this.setting||f.fn.atwho["default"],o);this.view.init();return this.model.reload(this.setting.data);};n.prototype.destroy=function(){this.trigger("beforeDestroy");this.model.destroy();this.view.destroy();return this.$el.remove();};n.prototype.callDefault=function(){var p,o,r,q;q=arguments[0],p=2<=arguments.length?k.call(arguments,1):[];try{return l[q].apply(this,p);}catch(r){o=r;return f.error(o+" Or maybe At.js doesn't have function "+q);}};n.prototype.trigger=function(p,r){var q,o;if(r==null){r=[];}r.push(this);q=this.getOpt("alias");o=q?p+"-"+q+".atwho":p+".atwho";return this.$inputor.trigger(o,r);};n.prototype.callbacks=function(o){return this.getOpt("callbacks")[o]||l[o];};n.prototype.getOpt=function(p,o){var q,r;try{return this.setting[p];}catch(r){q=r;return null;}};n.prototype.insertContentFor=function(q){var p,o;o=this.getOpt("insertTpl");p=f.extend({},q.data("item-data"),{"atwho-at":this.at});return this.callbacks("tplEval").call(this,o,p,"onInsert");};n.prototype.renderView=function(o){var p;p=this.getOpt("searchKey");o=this.callbacks("sorter").call(this,this.query.text,o.slice(0,1001),p);return this.view.render(o.slice(0,this.getOpt("limit")));};n.arrayToDefaultHash=function(s){var q,r,o,p;if(!f.isArray(s)){return s;}p=[];for(q=0,o=s.length;q<o;q++){r=s[q];if(f.isPlainObject(r)){p.push(r);}else{p.push({name:r});}}return p;};n.prototype.lookUp=function(q){var o,p;if(q&&q.type==="click"&&!this.getOpt("lookUpOnClick")){return;}if(this.getOpt("suspendOnComposing")&&this.app.isComposing){return;}o=this.catchQuery(q);if(!o){this.expectedQueryCBId=null;return o;}this.app.setContextFor(this.at);if(p=this.getOpt("delay")){this._delayLookUp(o,p);}else{this._lookUp(o);}return o;};n.prototype._delayLookUp=function(q,r){var o,p;o=Date.now?Date.now():new Date().getTime();this.previousCallTime||(this.previousCallTime=o);p=r-(o-this.previousCallTime);if((0<p&&p<r)){this.previousCallTime=o;this._stopDelayedCall();return this.delayedCallTimeout=setTimeout((function(s){return function(){s.previousCallTime=0;s.delayedCallTimeout=null;return s._lookUp(q);};})(this),r);}else{this._stopDelayedCall();if(this.previousCallTime!==o){this.previousCallTime=0;}return this._lookUp(q);}};n.prototype._stopDelayedCall=function(){if(this.delayedCallTimeout){clearTimeout(this.delayedCallTimeout);return this.delayedCallTimeout=null;}};n.prototype._generateQueryCBId=function(){return{};};n.prototype._lookUp=function(p){var o;o=function(r,q){if(r!==this.expectedQueryCBId){return;}if(q&&q.length>0){return this.renderView(this.constructor.arrayToDefaultHash(q));}else{return this.view.hide();}};this.expectedQueryCBId=this._generateQueryCBId();return this.model.query(p.text,f.proxy(o,this,this.expectedQueryCBId));};return n;})();var g,j=function(q,o){for(var n in o){if(i.call(o,n)){q[n]=o[n];}}function p(){this.constructor=q;}p.prototype=o.prototype;q.prototype=new p();q.__super__=o.prototype;return q;},i={}.hasOwnProperty;g=(function(n){j(o,n);function o(){return o.__super__.constructor.apply(this,arguments);}o.prototype.catchQuery=function(){var r,t,q,p,u,v,s;t=this.$inputor.val();r=this.$inputor.caret("pos",{iframe:this.app.iframe});s=t.slice(0,r);u=this.callbacks("matcher").call(this,this.at,s,this.getOpt("startWithSpace"),this.getOpt("acceptSpaceBar"));p=typeof u==="string";if(p&&u.length<this.getOpt("minLen",0)){return;}if(p&&u.length<=this.getOpt("maxLen",20)){v=r-u.length;q=v+u.length;this.pos=v;u={text:u,headPos:v,endPos:q};this.trigger("matched",[this.at,u.text]);}else{u=null;this.view.hide();}return this.query=u;};o.prototype.rect=function(){var r,q,p;if(!(r=this.$inputor.caret("offset",this.pos-1,{iframe:this.app.iframe}))){return;}if(this.app.iframe&&!this.app.iframeAsRoot){q=f(this.app.iframe).offset();r.left+=q.left;r.top+=q.top;}p=this.app.document.selection?0:2;return{left:r.left,top:r.top,bottom:r.top+r.height+p};};o.prototype.insert=function(q,v){var t,r,p,s,u;t=this.$inputor;r=t.val();p=r.slice(0,Math.max(this.query.headPos-this.at.length,0));s=(s=this.getOpt("suffix"))===""?s:s||" ";q+=s;u=""+p+q+(r.slice(this.query.endPos||0));t.val(u);t.caret("pos",p.length+q.length,{iframe:this.app.iframe});if(!t.is(":focus")){t.focus();}return t.change();};return o;})(e);var b,j=function(q,o){for(var n in o){if(i.call(o,n)){q[n]=o[n];}}function p(){this.constructor=q;}p.prototype=o.prototype;q.prototype=new p();q.__super__=o.prototype;return q;},i={}.hasOwnProperty;b=(function(o){j(n,o);function n(){return n.__super__.constructor.apply(this,arguments);}n.prototype._getRange=function(){var p;p=this.app.window.getSelection();if(p.rangeCount>0){return p.getRangeAt(0);}};n.prototype._setRange=function(p,r,q){if(q==null){q=this._getRange();}if(!(q&&r)){return;}r=f(r)[0];if(p==="after"){q.setEndAfter(r);q.setStartAfter(r);}else{q.setEndBefore(r);q.setStartBefore(r);}q.collapse(false);return this._clearRange(q);};n.prototype._clearRange=function(p){var q;if(p==null){p=this._getRange();}q=this.app.window.getSelection();if(this.ctrl_a_pressed==null){q.removeAllRanges();return q.addRange(p);}};n.prototype._movingEvent=function(q){var p;return q.type==="click"||((p=q.which)===m.RIGHT||p===m.LEFT||p===m.UP||p===m.DOWN);};n.prototype._unwrap=function(q){var p;q=f(q).unwrap().get(0);if((p=q.nextSibling)&&p.nodeValue){q.nodeValue+=p.nodeValue;f(p).remove();}return q;};n.prototype.catchQuery=function(w){var A,y,x,v,t,r,p,q,s,z,B,u;if(!(u=this._getRange())){return;}if(!u.collapsed){return;}if(w.which===m.ENTER){(y=f(u.startContainer).closest(".atwho-query")).contents().unwrap();if(y.is(":empty")){y.remove();}(y=f(".atwho-query",this.app.document)).text(y.text()).contents().last().unwrap();this._clearRange();return;}if(/firefox/i.test(navigator.userAgent)){if(f(u.startContainer).is(this.$inputor)){this._clearRange();return;}if(w.which===m.BACKSPACE&&u.startContainer.nodeType===document.ELEMENT_NODE&&(s=u.startOffset-1)>=0){x=u.cloneRange();x.setStart(u.startContainer,s);if(f(x.cloneContents()).contents().last().is(".atwho-inserted")){t=f(u.startContainer).contents().get(s);this._setRange("after",f(t).contents().last());}}else{if(w.which===m.LEFT&&u.startContainer.nodeType===document.TEXT_NODE){A=f(u.startContainer.previousSibling);if(A.is(".atwho-inserted")&&u.startOffset===0){this._setRange("after",A.contents().last());}}}}f(u.startContainer).closest(".atwho-inserted").addClass("atwho-query").siblings().removeClass("atwho-query");if((y=f(".atwho-query",this.app.document)).length>0&&y.is(":empty")&&y.text().length===0){y.remove();}if(!this._movingEvent(w)){y.removeClass("atwho-inserted");}if(y.length>0){switch(w.which){case m.LEFT:this._setRange("before",y.get(0),u);y.removeClass("atwho-query");return;case m.RIGHT:this._setRange("after",y.get(0).nextSibling,u);y.removeClass("atwho-query");return;}}if(y.length>0&&(B=y.attr("data-atwho-at-query"))){y.empty().html(B).attr("data-atwho-at-query",null);this._setRange("after",y.get(0),u);}x=u.cloneRange();x.setStart(u.startContainer,0);q=this.callbacks("matcher").call(this,this.at,x.toString(),this.getOpt("startWithSpace"),this.getOpt("acceptSpaceBar"));r=typeof q==="string";if(y.length===0&&r&&(v=u.startOffset-this.at.length-q.length)>=0){u.setStart(u.startContainer,v);y=f("<span/>",this.app.document).attr(this.getOpt("editableAtwhoQueryAttrs")).addClass("atwho-query");u.surroundContents(y.get(0));p=y.contents().last().get(0);if(p){if(/firefox/i.test(navigator.userAgent)){u.setStart(p,p.length);u.setEnd(p,p.length);this._clearRange(u);}else{this._setRange("after",p,u);}}}if(r&&q.length<this.getOpt("minLen",0)){return;}if(r&&q.length<=this.getOpt("maxLen",20)){z={text:q,el:y};this.trigger("matched",[this.at,z.text]);return this.query=z;}else{this.view.hide();this.query={el:y};if(y.text().indexOf(this.at)>=0){if(this._movingEvent(w)&&y.hasClass("atwho-inserted")){y.removeClass("atwho-query");}else{if(false!==this.callbacks("afterMatchFailed").call(this,this.at,y)){this._setRange("after",this._unwrap(y.text(y.text()).contents().first()));}}}return null;}};n.prototype.rect=function(){var r,q,p;p=this.query.el.offset();if(!(p&&this.query.el[0].getClientRects().length)){return;}if(this.app.iframe&&!this.app.iframeAsRoot){q=(r=f(this.app.iframe)).offset();p.left+=q.left-this.$inputor.scrollLeft();p.top+=q.top-this.$inputor.scrollTop();}p.bottom=p.top+this.query.el.height();return p;};n.prototype.insert=function(r,v){var s,u,p,t,q;if(!this.$inputor.is(":focus")){this.$inputor.focus();}u=this.getOpt("functionOverrides");if(u.insert){return u.insert.call(this,r,v);}t=(t=this.getOpt("suffix"))===""?t:t||"\u00A0";s=v.data("item-data");this.query.el.removeClass("atwho-query").addClass("atwho-inserted").html(r).attr("data-atwho-at-query",""+s["atwho-at"]+this.query.text).attr("contenteditable","false");if(p=this._getRange()){if(this.query.el.length){p.setEndAfter(this.query.el[0]);}p.collapse(false);p.insertNode(q=this.app.document.createTextNode(""+t));this._setRange("after",q,p);}if(!this.$inputor.is(":focus")){this.$inputor.focus();}return this.$inputor.change();};return n;})(e);var c;c=(function(){function n(o){this.context=o;this.at=this.context.at;this.storage=this.context.$inputor;}n.prototype.destroy=function(){return this.storage.data(this.at,null);};n.prototype.saved=function(){return this.fetch()>0;};n.prototype.query=function(p,s){var r,o,q;o=this.fetch();q=this.context.getOpt("searchKey");o=this.context.callbacks("filter").call(this.context,p,o,q)||[];r=this.context.callbacks("remoteFilter");if(o.length>0||(!r&&o.length===0)){return s(o);}else{return r.call(this.context,p,s);}};n.prototype.fetch=function(){return this.storage.data(this.at)||[];};n.prototype.save=function(o){return this.storage.data(this.at,this.context.callbacks("beforeSave").call(this.context,o||[]));};n.prototype.load=function(o){if(!(this.saved()||!o)){return this._load(o);}};n.prototype.reload=function(o){return this._load(o);};n.prototype._load=function(o){if(typeof o==="string"){return f.ajax(o,{dataType:"json"}).done((function(p){return function(q){return p.save(q);};})(this));}else{return this.save(o);}};return n;})();var a;a=(function(){function n(o){this.context=o;this.$el=f("<div class='atwho-view'><ul class='atwho-view-ul'></ul></div>");this.$elUl=this.$el.children();this.timeoutID=null;this.context.$el.append(this.$el);this.bindEvent();}n.prototype.init=function(){var o,p;p=this.context.getOpt("alias")||this.context.at.charCodeAt(0);o=this.context.getOpt("headerTpl");if(o&&this.$el.children().length===1){this.$el.prepend(o);}return this.$el.attr({id:"at-view-"+p});};n.prototype.destroy=function(){return this.$el.remove();};n.prototype.bindEvent=function(){var o,q,p;o=this.$el.find("ul");q=0;p=0;return o.on("mousemove.atwho-view","li",(function(r){return function(t){var s;if(q===t.clientX&&p===t.clientY){return;}q=t.clientX;p=t.clientY;s=f(t.currentTarget);if(s.hasClass("cur")){return;}o.find(".cur").removeClass("cur");return s.addClass("cur");};})(this)).on("click.atwho-view","li",(function(r){return function(s){o.find(".cur").removeClass("cur");f(s.currentTarget).addClass("cur");r.choose(s);return s.preventDefault();};})(this));};n.prototype.visible=function(){return f.expr.filters.visible(this.$el[0]);};n.prototype.highlighted=function(){return this.$el.find(".cur").length>0;};n.prototype.choose=function(p){var q,o;if((q=this.$el.find(".cur")).length){o=this.context.insertContentFor(q);this.context._stopDelayedCall();this.context.insert(this.context.callbacks("beforeInsert").call(this.context,o,q,p),q);this.context.trigger("inserted",[q,p]);this.hide(p);}if(this.context.getOpt("hideWithoutSuffix")){return this.stopShowing=true;}};n.prototype.reposition=function(q){var s,r,o,p;s=this.context.app.iframeAsRoot?this.context.app.window:window;if(q.bottom+this.$el.height()-f(s).scrollTop()>f(s).height()){q.bottom=q.top-this.$el.height();}if(q.left>(o=f(s).width()-this.$el.width()-5)){q.left=o;}r={left:q.left,top:q.bottom};if((p=this.context.callbacks("beforeReposition"))!=null){p.call(this.context,r);}this.$el.offset(r);return this.context.trigger("reposition",[r]);};n.prototype.next=function(){var r,p,o,q;r=this.$el.find(".cur").removeClass("cur");p=r.next();if(!p.length){p=this.$el.find("li:first");}p.addClass("cur");o=p[0];q=o.offsetTop+o.offsetHeight+(o.nextSibling?o.nextSibling.offsetHeight:0);return this.scrollTop(Math.max(0,q-this.$el.height()));};n.prototype.prev=function(){var r,q,p,o;r=this.$el.find(".cur").removeClass("cur");p=r.prev();if(!p.length){p=this.$el.find("li:last");}p.addClass("cur");o=p[0];q=o.offsetTop+o.offsetHeight+(o.nextSibling?o.nextSibling.offsetHeight:0);return this.scrollTop(Math.max(0,q-this.$el.height()));};n.prototype.scrollTop=function(o){var p;p=this.context.getOpt("scrollDuration");if(p){return this.$elUl.animate({scrollTop:o},p);}else{return this.$elUl.scrollTop(o);}};n.prototype.show=function(){var o;if(this.stopShowing){this.stopShowing=false;return;}if(!this.visible()){this.$el.show();this.$el.scrollTop(0);this.context.trigger("shown");}if(o=this.context.rect()){return this.reposition(o);}};n.prototype.hide=function(p,o){var q;if(!this.visible()){return;}if(isNaN(o)){this.$el.hide();return this.context.trigger("hidden",[p]);}else{q=(function(r){return function(){return r.hide();};})(this);clearTimeout(this.timeoutID);return this.timeoutID=setTimeout(q,o);}};n.prototype.render=function(u){var v,r,s,t,p,o,q;if(!(f.isArray(u)&&u.length>0)){this.hide();return;}this.$el.find("ul").empty();r=this.$el.find("ul");q=this.context.getOpt("displayTpl");for(s=0,p=u.length;s<p;s++){t=u[s];t=f.extend({},t,{"atwho-at":this.context.at});o=this.context.callbacks("tplEval").call(this.context,q,t,"onDisplay");v=f(this.context.callbacks("highlighter").call(this.context,o,this.context.query.text));v.data("item-data",t);r.append(v);}this.show();if(this.context.getOpt("highlightFirst")){return r.find("li:first").addClass("cur");}};return n;})();var h;h={load:function(n,o){var p;if(p=this.controller(n)){return p.model.load(o);}},isSelecting:function(){var n;return !!((n=this.controller())!=null?n.view.visible():void 0);},hide:function(){var n;return(n=this.controller())!=null?n.view.hide():void 0;},reposition:function(){var n;if(n=this.controller()){return n.view.reposition(n.rect());}},setIframe:function(n,o){this.setupRootElement(n,o);return null;},run:function(){return this.dispatch();},destroy:function(){this.shutdown();return this.$inputor.data("atwho",null);}};f.fn.atwho=function(p){var o,n;o=arguments;n=null;this.filter('textarea, input, [contenteditable=""], [contenteditable=true]').each(function(){var q,r;if(!(r=(q=f(this)).data("atwho"))){q.data("atwho",(r=new d(this)));}if(typeof p==="object"||!p){return r.reg(p.at,p);}else{if(h[p]&&r){return n=h[p].apply(r,Array.prototype.slice.call(o,1));}else{return f.error("Method "+p+" does not exist on jQuery.atwho");}}});if(n!=null){return n;}else{return this;}};f.fn.atwho["default"]={at:void 0,alias:void 0,data:null,displayTpl:"<li>${name}</li>",insertTpl:"${atwho-at}${name}",headerTpl:null,callbacks:l,functionOverrides:{},searchKey:"name",suffix:void 0,hideWithoutSuffix:false,startWithSpace:true,acceptSpaceBar:false,highlightFirst:true,limit:5,maxLen:20,minLen:0,displayTimeout:300,delay:null,spaceSelectsMatch:false,tabSelectsMatch:true,editableAtwhoQueryAttrs:{},scrollDuration:150,suspendOnComposing:true,lookUpOnClick:true};f.fn.atwho.debug=false;}));