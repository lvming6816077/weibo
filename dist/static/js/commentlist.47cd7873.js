(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["commentlist"],{"3d77":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"item-wrap"},[a("avatar",{staticClass:"left-avatar",attrs:{user:t.data.user}}),a("div",{staticClass:"item-right"},[a("div",{staticClass:"nickname"},[t._v(t._s(t.data.user.screen_name))]),a("div",{staticClass:"content",domProps:{innerHTML:t._s(t.formatText(t.data.text))}}),"list"==t.type&&t.data.more_info_users&&t.data.more_info_users[0]?a("div",{staticClass:"comment-inner"},[a("div",{staticClass:"text"},[a("span",{staticClass:"inner-blue"},[t._v(t._s(t.data.more_info_users[0].screen_name))]),t._v("等人"),a("span",{staticClass:"inner-spec inner-blue",on:{click:t.goMoreComment}},[t._v("共"+t._s(t.data.more_info_users.length)+"条回复 >")])])]):t._e(),a("div",{staticClass:"item-info"},[a("div",{staticClass:"time-info"},[t._v(" "+t._s(t._f("formatTime")(t.data.created_at))+" ")]),a("div",{staticClass:"tool-box"},[a("div",{staticClass:"like-content"},[a("div",{staticClass:"like-icon"}),a("div",{staticClass:"like-num"},[t._v(t._s(t.data.like_count||""))])]),t._m(0)])])])],1)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"comment-content"},[a("div",{staticClass:"comment-icon"})])}],r=(a("ac1f"),a("466d"),a("5319"),a("fd5a")),i={name:"citem",components:{avatar:r["a"]},props:{data:{type:Object,default:function(){return{}}},type:{type:String,default:"list"}},methods:{goMoreComment:function(){this.$router.push({name:"morecomment",params:{mainCommentData:this.data}})},formatText:function(t){var e=/href=("|')(.+?)("|')/gi,a=t.match(e);if(a&&a[0]){var n=a[0].replace(/^href="/,"").replace(/"$/,"");if(/\.(gif|png|jpg)$/.test(n)){var s='data-preview-src="'+n+'" data-preview-group="'+(this.data.id+Date.now())+'"';t=t.replace(e,s)}}return t.replace(/<br \/><br \/>/g,"<br />").replace(/<span.*?class='url-icon'.*?>.*?<\/span>/gi,"")}}},c=i,o=(a("b771"),a("2877")),d=Object(o["a"])(c,n,s,!1,null,"9fefea6c",null);e["a"]=d.exports},"7c85":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("scrollview",{attrs:{isend:t.isend,readyToLoad:t.readyToLoad,dataList:t.dataList},on:{loadCallback:t.loadCallback}},[a("div",{staticClass:"content-list"},t._l(t.dataList,(function(t,e){return a("citem",{key:e,attrs:{data:t}})})),1)])},s=[],r=(a("96cf"),a("1da1")),i=a("d9f1"),c=a("3d77"),o=a("9efd"),d={name:"commentlist",components:{scrollview:i["a"],citem:c["a"]},data:function(){return{isend:!1,readyToLoad:!0,pageIndex:0}},computed:{dataList:function(){return this.$store.state.commentDataList}},mounted:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.loadCallback();case 1:case"end":return e.stop()}}),e)})))()},methods:{loadCallback:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(2!=t.pageIndex){e.next=3;break}return t.isend=!0,e.abrupt("return");case 3:return t.readyToLoad=!1,e.next=6,o["a"].get("json/comment/"+t.$route.params.id+".json");case 6:a=e.sent,t.readyToLoad=!0,n=a.data.data||[],t.$store.dispatch("setCommentDataList",n),t.pageIndex++;case 11:case"end":return e.stop()}}),e)})))()}}},l=d,u=a("2877"),m=Object(u["a"])(l,n,s,!1,null,"2bce10c2",null);e["default"]=m.exports},b771:function(t,e,a){"use strict";var n=a("bc11"),s=a.n(n);s.a},bc11:function(t,e,a){}}]);
//# sourceMappingURL=commentlist.47cd7873.js.map