(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["message"],{"022b":function(t,a,e){},"1d11":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("headerbar",{attrs:{useBack:!1,title:"消息列表"}}),e("div",{staticClass:"content-list"},t._l(t.dataList,(function(t,a){return e("item",{key:a,attrs:{data:t}})})),1),e("tabbar",{attrs:{currentKey:"message"}})],1)},n=[],r=(e("96cf"),e("1da1")),i=e("73b0"),c=e("1c80"),u=e("9efd"),d=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"item-wrap"},[e("avatar",{staticClass:"left-avatar",attrs:{user:t.user}}),e("div",{staticClass:"item-right"},[e("div",{staticClass:"nickname"},[t._v(t._s(t.data.user.screen_name))]),e("div",{staticClass:"content one-line"},[t._v(t._s(t.data.text))])]),e("div",{staticClass:"time-info"},[t._v(" "+t._s(t.data.created_at)+" ")])],1)},o=[],l=e("fd5a"),f={name:"item",components:{headerbar:c["a"],tabbar:i["a"],avatar:l["a"]},props:{data:{type:Object,default:function(){return{}}}},data:function(){var t={profile_image_url:this.data.user.avatar_large,badge:{user_name_certificate:this.data.user.verified}};return{user:t}}},m=f,v=(e("778b"),e("2877")),b=Object(v["a"])(m,d,o,!1,null,"0a83f6da",null),_=b.exports,p={name:"message",components:{headerbar:c["a"],tabbar:i["a"],item:_},data:function(){return{dataList:[]}},mounted:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var e;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,u["a"].get("json/messagelist.json");case 2:e=a.sent,t.dataList=e.data||[];case 4:case"end":return a.stop()}}),a)})))()}},h=p,g=(e("3347"),Object(v["a"])(h,s,n,!1,null,"423449c4",null));a["default"]=g.exports},3347:function(t,a,e){"use strict";var s=e("022b"),n=e.n(s);n.a},"778b":function(t,a,e){"use strict";var s=e("eb98"),n=e.n(s);n.a},eb98:function(t,a,e){}}]);
//# sourceMappingURL=message.b54216f5.js.map