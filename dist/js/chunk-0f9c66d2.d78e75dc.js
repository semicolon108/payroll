(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0f9c66d2"],{"0aff":function(t,n,e){"use strict";e("8200")},"2bcd":function(t,n,e){"use strict";e.d(n,"c",(function(){return b})),e.d(n,"a",(function(){return h})),e.d(n,"d",(function(){return k})),e.d(n,"b",(function(){return g}));var a,r,o,i,c=e("c7eb"),s=e("1da1"),u=(e("d3b7"),e("8785")),d=e("5184"),l=Object(d["a"])(a||(a=Object(u["a"])(["\n\n{\n  getWorkingLocations {\n    _id\n    name\n    provinceId {\n      _id\n      name\n    }\n    employeesCount\n  }\n}\n\n"]))),p=Object(d["a"])(r||(r=Object(u["a"])(["\n\n\nmutation(\n  $name: String!\n  $provinceId: ID!\n) {\n  addWorkingLocation(\n    name: $name\n    provinceId: $provinceId\n  )\n}\n\n\n"]))),v=Object(d["a"])(o||(o=Object(u["a"])(["\n\nmutation(\n  $workingLocationId: ID!\n  $name: String!\n  $provinceId: ID!\n) {\n  updateWorkingLocation(\n    workingLocationId: $workingLocationId\n    name: $name\n    provinceId: $provinceId\n  )\n}\n\n"]))),f=Object(d["a"])(i||(i=Object(u["a"])(["\n\n    mutation(\n    $workingLocationId: ID!\n    ) {\n    deleteWorkingLocation(\n        workingLocationId: $workingLocationId\n    )\n    }\n\n"]))),m=e("47b6"),b=function(){return new Promise(function(){var t=Object(s["a"])(Object(c["a"])().mark((function t(n,e){var a;return Object(c["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m["a"].query({query:l});case 3:a=t.sent,n(a.data.getWorkingLocations),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),e(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(n,e){return t.apply(this,arguments)}}())},h=function(t){return new Promise(function(){var n=Object(s["a"])(Object(c["a"])().mark((function n(e,a){var r;return Object(c["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,m["a"].mutate({mutation:p,variables:t});case 3:r=n.sent,e(r.data.addWorkingLocation),n.next=10;break;case 7:n.prev=7,n.t0=n["catch"](0),a(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(t,e){return n.apply(this,arguments)}}())},k=function(t){return new Promise(function(){var n=Object(s["a"])(Object(c["a"])().mark((function n(e,a){var r;return Object(c["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,m["a"].mutate({mutation:v,variables:t});case 3:r=n.sent,e(r.data.updateWorkingLocation),n.next=10;break;case 7:n.prev=7,n.t0=n["catch"](0),a(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(t,e){return n.apply(this,arguments)}}())},g=function(t){return new Promise(function(){var n=Object(s["a"])(Object(c["a"])().mark((function n(e,a){var r;return Object(c["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,m["a"].mutate({mutation:f,variables:t});case 3:r=n.sent,e(r.data.deleteWorkingLocation),n.next=10;break;case 7:n.prev=7,n.t0=n["catch"](0),a(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(t,e){return n.apply(this,arguments)}}())}},7811:function(t,n,e){"use strict";e.d(n,"a",(function(){return c}));var a=e("c7eb"),r=e("1da1"),o=(e("d3b7"),e("47b6")),i=e("e896"),c=function(t){return new Promise(function(){var n=Object(r["a"])(Object(a["a"])().mark((function n(e,r){var c;return Object(a["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,o["a"].query({query:i["a"],variables:{type:t}});case 3:c=n.sent,e(c.data.getReuses),n.next=10;break;case 7:n.prev=7,n.t0=n["catch"](0),r(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})));return function(t,e){return n.apply(this,arguments)}}())}},8200:function(t,n,e){},ab43:function(t,n,e){"use strict";var a=e("23e7"),r=e("d024"),o=e("c430");a({target:"Iterator",proto:!0,real:!0,forced:o},{map:r})},d024:function(t,n,e){"use strict";var a=e("c65b"),r=e("59ed"),o=e("825a"),i=e("46c4"),c=e("c5cc"),s=e("9bdd"),u=c((function(){var t=this.iterator,n=o(a(this.next,t)),e=this.done=!!n.done;if(!e)return s(t,this.mapper,[n.value,this.counter++],!0)}));t.exports=function(t){return o(this),r(t),new u(i(this),{mapper:t})}},d81d:function(t,n,e){"use strict";var a=e("23e7"),r=e("b727").map,o=e("1dde"),i=o("map");a({target:"Array",proto:!0,forced:!i},{map:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}})},e896:function(t,n,e){"use strict";e.d(n,"a",(function(){return i}));var a,r=e("8785"),o=e("5184"),i=Object(o["a"])(a||(a=Object(r["a"])(["\n    \n    query (\n        $type: String!\n    ) {\n        getReuses(\n            type: $type\n        ) {\n            _id\n            name\n        }\n    }\n    \n"])))},fe21:function(t,n,e){"use strict";e.r(n);e("b0c0");var a=function(){var t=this,n=t._self._c;return n("div",{staticClass:"page-container"},[n("div",{staticClass:"page-header"},[n("div",{staticClass:"header-start"},[n("h3",{staticClass:"page-title"},[t._v("Work Location")]),n("button",{staticClass:"button primary",on:{click:function(n){return t.ModalClick()}}},[t._v(" Add Location ")])])]),n("div",{staticClass:"page-content"},[n("table",{staticClass:"table is-fullwidth",attrs:{id:"my-table"}},[t._m(0),n("tbody",t._l(t.workingLocations,(function(e){return n("tr",{key:e._id},[n("td",[t._v(t._s(e.name))]),n("td",[t._v(t._s(e.provinceId.name))]),n("td",[t._v(t._s(e.employeesCount))]),n("td",{staticClass:"is-right"},[n("div",{staticClass:"icons"},[n("span",{staticClass:"icon hover-primary",on:{click:function(n){return t.editModal(e)}}},[n("i",{staticClass:"fas fa-pen"})]),n("span",{staticClass:"icon alert hover-alert",on:{click:function(n){return t.deleteWorkingLocation(e._id)}}},[n("i",{staticClass:"fas fa-trash"})])])])])})),0)])]),t.ModalAddLocation?n("AddLocation",{ref:"WorkingLocation",on:{CloseModal:function(n){t.ModalAddLocation=!1,t.getWorkingLocations()}}}):t._e()],1)},r=[function(){var t=this,n=t._self._c;return n("thead",[n("tr",[n("th",[t._v("Location Name")]),n("th",{staticClass:"is-md"},[t._v("Province")]),n("th",{staticClass:"is-sm"},[t._v("No. of employee")]),n("th",{staticClass:"is-xxs is-right"},[t._v("Option")])])])}],o=e("c7eb"),i=e("1da1"),c=(e("d9e2"),e("4de4"),e("d81d"),e("e9f5"),e("ab43"),e("d3b7"),function(){var t=this,n=t._self._c;return n("div",{staticClass:"modal is-active"},[n("div",{staticClass:"modal-background",on:{click:t.CloseModal}}),n("div",{staticClass:"modal-card"},[n("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.handleSubmit;return[n("div",{staticClass:"modal-card-head"},[n("h3",[t._v(" "+t._s(t.isEditMode?"Update Work Location":"Add Work Location")+" ")]),n("button",{staticClass:"modal-close is-large",attrs:{"aria-label":"close"},on:{click:function(n){return t.CloseModal()}}})]),n("section",{staticClass:"modal-card-body"},[n("div",{staticClass:"field"},[n("label",{staticClass:"label",attrs:{for:""}},[t._v("Location Name")]),n("div",{staticClass:"control"},[n("ValidationProvider",{attrs:{rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[n("input",{directives:[{name:"model",rawName:"v-model",value:t.form.name,expression:"form.name"}],staticClass:"input",attrs:{type:"text",placeholder:"Headquarters"},domProps:{value:t.form.name},on:{input:function(n){n.target.composing||t.$set(t.form,"name",n.target.value)}}}),n("p",{staticClass:"has-text-danger"},[t._v(t._s(a[0]))])]}}],null,!0)})],1)]),n("div",{staticClass:"field"},[n("label",{staticClass:"label",attrs:{for:""}},[t._v("Province")]),n("div",{staticClass:"control"},[n("ValidationProvider",{attrs:{rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[n("select",{directives:[{name:"model",rawName:"v-model",value:t.form.provinceId,expression:"form.provinceId"}],staticClass:"input",on:{change:function(n){var e=Array.prototype.filter.call(n.target.options,(function(t){return t.selected})).map((function(t){var n="_value"in t?t._value:t.value;return n}));t.$set(t.form,"provinceId",n.target.multiple?e:e[0])}}},t._l(t.provinces,(function(e){return n("option",{key:e._id,domProps:{value:e._id}},[t._v(t._s(e.name))])})),0),n("p",{staticClass:"has-text-danger"},[t._v(t._s(a[0]))])]}}],null,!0)})],1)])]),n("div",{staticClass:"modal-card-foot"},[t.isEditMode?n("button",{staticClass:"button primary",on:{click:function(n){return a(t.updateWorkingLocation)}}},[t._v("Update")]):n("button",{staticClass:"button primary",on:{click:function(n){return a(t.addWorkingLocation)}}},[t._v("Save")])])]}}])})],1)])}),s=[],u=e("7811"),d=e("2bcd"),l={data:function(){return{provinces:[],form:{name:"",provinceId:""},isEditMode:!1,workingLocationId:""}},methods:{CloseModal:function(){this.$emit("CloseModal")},getProvinces:function(){var t=this;return Object(i["a"])(Object(o["a"])().mark((function n(){return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(u["a"])("Province");case 2:t.provinces=n.sent,t.isEditMode||(t.form.provinceId=t.provinces[0]._id);case 4:case"end":return n.stop()}}),n)})))()},addWorkingLocation:function(){var t=this;return Object(i["a"])(Object(o["a"])().mark((function n(){return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,t.$store.dispatch("loading"),n.next=4,Object(d["a"])(t.form);case 4:t.$store.dispatch("completed"),t.CloseModal(),n.next=12;break;case 8:throw n.prev=8,n.t0=n["catch"](0),t.$store.dispatch("error"),new Error(n.t0);case 12:case"end":return n.stop()}}),n,null,[[0,8]])})))()},updateWorkingLocation:function(){var t=this;return Object(i["a"])(Object(o["a"])().mark((function n(){return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,t.$store.dispatch("loading"),t.form.workingLocationId=t.workingLocationId,n.next=5,Object(d["d"])(t.form);case 5:t.$store.dispatch("completed"),t.CloseModal(),n.next=13;break;case 9:throw n.prev=9,n.t0=n["catch"](0),t.$store.dispatch("error"),new Error(n.t0);case 13:case"end":return n.stop()}}),n,null,[[0,9]])})))()}},created:function(){this.getProvinces()}},p=l,v=e("2877"),f=Object(v["a"])(p,c,s,!1,null,"3c4d3836",null),m=f.exports,b={components:{AddLocation:m},data:function(){return{ModalAddLocation:!1,workingLocations:[]}},methods:{ModalClick:function(){this.ModalAddLocation=!0},editModal:function(t){var n=this;this.ModalAddLocation=!0,this.$nextTick((function(){n.$refs.WorkingLocation.isEditMode=t._id,n.$refs.WorkingLocation.workingLocationId=t._id,n.$refs.WorkingLocation.form.name=t.name,n.$refs.WorkingLocation.form.provinceId=t.provinceId._id}))},getWorkingLocations:function(){var t=this;return Object(i["a"])(Object(o["a"])().mark((function n(){return Object(o["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Object(d["c"])();case 3:t.workingLocations=n.sent,n.next=9;break;case 6:throw n.prev=6,n.t0=n["catch"](0),new Error(n.t0);case 9:case"end":return n.stop()}}),n,null,[[0,6]])})))()},deleteWorkingLocation:function(t){var n=this;return Object(i["a"])(Object(o["a"])().mark((function e(){var a;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n.$dialog.confirm("Sure ?");case 2:if(a=e.sent,a){e.next=5;break}return e.abrupt("return");case 5:return e.prev=5,n.$store.dispatch("loading"),e.next=9,Object(d["b"])({workingLocationId:t});case 9:n.$store.dispatch("completed"),n.getWorkingLocations(),e.next=17;break;case 13:throw e.prev=13,e.t0=e["catch"](5),n.$store.dispatch("error"),new Error(e.t0);case 17:case"end":return e.stop()}}),e,null,[[5,13]])})))()}},created:function(){this.getWorkingLocations()}},h=b,k=(e("0aff"),Object(v["a"])(h,a,r,!1,null,"6b34eda6",null));n["default"]=k.exports}}]);
//# sourceMappingURL=chunk-0f9c66d2.d78e75dc.js.map