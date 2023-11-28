import{d as oe,u as ne,r as m,c as k,w as ie,b as u,e as de,f as a,g as ue,i as e,m as o,l as b,t as c,n as r,q as re}from"./index-B8j9Fg8x.js";import{n as w}from"./rules-6ndjMkCM.js";import{i as ce}from"./items-R1paJi57.js";import{l as me}from"./lodash-kvVwPKOQ.js";import{g as pe,u as ve,c as fe,d as _e}from"./user-cdA6JsuI.js";import"./index-_h905p1k.js";import"./axios-QLjAsgXu.js";const ge={class:"responsive-datatable"},be=["data-label"],ye=r("span",null,null,-1),he=["data-label"],xe=["data-label"],Ve=["data-label"],ke=["data-label"],we=["data-label"],Ue={class:"text-body-2 text-grey"},Ce={class:"text-body-2 text-grey"},je={class:"text-body-2 text-grey"},ze={class:"text-body-2 text-grey"},Ie={class:"text-body-2 text-grey"},Xe={class:"text-body-2 text-grey"},Te=oe({__name:"Users",setup($e){const T=[{title:"users.image",key:"image",sortable:!0},{title:"users.name",key:"name",sortable:!0},{title:"booking.phone",key:"phone",sortable:!1},{title:"booking.email",key:"email",sortable:!1},{title:"users.role",key:"role",sortable:!1},{title:"actions",key:"actions",sortable:!1,align:"end"}],{t:n}=ne(),f=m(!1),U=m(!1),z=m(null),_=m([]),q=k(()=>[{title:n("users.admin"),value:"ADMIN"},{title:n("users.employe"),value:"STAFF"}]),i=m({name:"",email:"",phone:"",role:null}),y=m([]),h=m(null),I=m(!1),x=m(1),v=m(25),C=m(0),j=m(""),B=k(()=>{const l=new URLSearchParams;return x.value&&l.append("page",x.value),v.value&&l.append("perpage",v.value),j.value.trim()&&l.append("search",j.value),l.append("broadcast","1"),l.toString()}),L=k(()=>{const l=(x.value-1)*v.value;return`${l+1}-${l+_.value.length} / ${C.value}`}),M=me.debounce(l=>{j.value=l,x.value=1},500),P=k(()=>T.map(l=>({...l,title:n(l.title)}))),E=k(()=>{var l,s;return(l=y.value)!=null&&l[0]?URL.createObjectURL(y.value[0]):(s=i.value)!=null&&s.image?i.value.image:"/icons/noimg.jpg"}),H=async()=>{const{valid:l}=await z.value.validate();l&&G()},X=async()=>{I.value=!0;const{data:l}=await pe(B.value);l.status==="ok"&&(_.value=l.users,C.value=l.totalCount),I.value=!1},G=async()=>{var s,p;const l=new FormData;if((s=y.value)!=null&&s[0]&&l.append("file",y.value[0]),(p=i.value.password)!=null&&p.trim()&&l.append("password",i.value.password),l.append("email",i.value.email),l.append("name",i.value.name),l.append("phone",i.value.phone),l.append("role",i.value.role),h.value){const{data:d}=await ve(h.value,l);if(d.status!=="ok")return;const V=_.value.findIndex(g=>g.id===h.value);Object.assign(_.value[V],d.result)}else{const{data:d}=await fe(l);if(d.status!=="ok")return;_.value.push(d.user)}$()},J=l=>{h.value=l.id,i.value=Object.assign({},l),f.value=!0},K=async(l,s)=>{confirm("Ushbu malumotni o'chirmoqchimisiz?")&&(await _e(s),_.value.splice(l,1))},$=()=>{f.value=!1,re(()=>{var l;i.value=Object.assign({},{name:"",email:"",phone:"",role:null}),h.value=null,(l=z.value)==null||l.reset()})};return ie(f,l=>l||$()),(l,s)=>{const p=u("v-text-field"),d=u("v-col"),V=u("v-icon"),g=u("v-btn"),S=u("v-card-title"),Q=u("v-chip"),F=u("v-img"),N=u("v-avatar"),W=u("v-data-table-server"),A=u("v-card-text"),D=u("v-card"),O=u("v-select"),Y=u("v-pagination"),R=u("v-row"),Z=u("v-file-input"),ee=u("v-form"),ae=u("v-dialog"),le=u("v-container");return ue(),de(le,{fluid:""},{default:a(()=>[e(R,{justify:"space-between",align:"center"},{default:a(()=>[e(d,{cols:"9",sm:"6",md:"4",class:"pb-0 pr-0"},{default:a(()=>[e(p,{"onUpdate:modelValue":o(M),placeholder:o(n)("search"),"append-inner-icon":"mdi-magnify","hide-details":"",flat:"",density:"compact",variant:"solo"},null,8,["onUpdate:modelValue","placeholder"])]),_:1}),e(d,{cols:"3",sm:"4",md:"2",class:"pb-0 d-flex justify-end"},{default:a(()=>[e(g,{onClick:s[0]||(s[0]=t=>f.value=!0),flat:"",color:"primary",size:"43",width:"100%"},{default:a(()=>[e(V,null,{default:a(()=>[b("mdi-plus")]),_:1})]),_:1})]),_:1}),e(d,{cols:"12"},{default:a(()=>[e(D,{flat:""},{default:a(()=>[e(S,{class:"px-4 pt-3"},{default:a(()=>[b(c(o(n)("users.title")),1)]),_:1}),e(A,{class:"px-0"},{default:a(()=>[r("div",ge,[e(W,{"items-per-page":v.value,"onUpdate:itemsPerPage":s[1]||(s[1]=t=>v.value=t),search:j.value,"items-length":C.value,loading:I.value,"no-data-text":o(n)("nodata"),"loading-text":o(n)("load_data"),"onUpdate:options":X,items:_.value,"item-value":"id",headers:P.value,density:"comfortable"},{bottom:a(()=>[]),"item.actions":a(({item:t,index:te})=>[r("td",{"data-label":o(n)("actions"),class:"d-flex justify-space-between align-center"},[ye,r("div",null,[e(g,{onClick:se=>J(t),color:"light-blue-accent-4",size:"30",flat:"",class:"mr-1"},{default:a(()=>[e(V,null,{default:a(()=>[b("mdi-pencil")]),_:1})]),_:2},1032,["onClick"]),e(g,{onClick:se=>K(te,t.id),color:"light-blue-accent-4",size:"30",flat:""},{default:a(()=>[e(V,null,{default:a(()=>[b("mdi-delete")]),_:1})]),_:2},1032,["onClick"])])],8,be)]),"item.role":a(({item:t})=>[r("td",{"data-label":o(n)("users.role")},[e(Q,{label:"",color:"green-accent-3",variant:"flat"},{default:a(()=>[b(c(o(n)("users."+{ADMIN:"admin",STAFF:"employe"}[t.role])),1)]),_:2},1024)],8,he)]),"item.name":a(({item:t})=>[r("td",{"data-label":o(n)("users.name")},c(t.name),9,xe)]),"item.phone":a(({item:t})=>[r("td",{"data-label":o(n)("booking.phone")},c(t.phone),9,Ve)]),"item.email":a(({item:t})=>[r("td",{"data-label":o(n)("booking.email")},c(t.email),9,ke)]),"item.image":a(({item:t})=>[r("td",{"data-label":o(n)("users.image")},[e(N,{rounded:"",size:"35"},{default:a(()=>[e(F,{cover:"",src:(t==null?void 0:t.image)||"/icons/noimg.jpg"},null,8,["src"])]),_:2},1024)],8,we)]),_:1},8,["items-per-page","search","items-length","loading","no-data-text","loading-text","items","headers"])])]),_:1})]),_:1})]),_:1}),e(d,{cols:"12",sm:"4",class:"pt-0 pb-1 d-flex align-center"},{default:a(()=>[e(O,{modelValue:v.value,"onUpdate:modelValue":s[2]||(s[2]=t=>v.value=t),transition:"fade-transition","hide-details":"",flat:"",density:"compact",variant:"solo",items:o(ce)},null,8,["modelValue","items"]),e(p,{class:"ml-3","hide-details":"",flat:"",density:"compact",variant:"solo","model-value":L.value,readonly:""},null,8,["model-value"])]),_:1}),e(d,{cols:"12",sm:"4",md:"4",class:"pt-0 pl-0 pb-1 pr-2 d-flex justify-end align-center"},{default:a(()=>[e(Y,{modelValue:x.value,"onUpdate:modelValue":[s[3]||(s[3]=t=>x.value=t),X],length:Math.ceil(C.value/v.value),"active-color":"primary",size:"40","total-visible":"3",variant:"flat"},null,8,["modelValue","length"])]),_:1})]),_:1}),e(ae,{modelValue:f.value,"onUpdate:modelValue":s[12]||(s[12]=t=>f.value=t),width:"500",transition:"fade-transition"},{default:a(()=>[e(D,{elevation:"1"},{default:a(()=>[e(S,{class:"px-5 d-flex justify-space-between align-center"},{default:a(()=>[r("span",null,c(o(n)("users.title")),1),e(g,{flat:"",onClick:s[4]||(s[4]=t=>f.value=!1),size:"32",color:"primary"},{default:a(()=>[e(V,{size:"small"},{default:a(()=>[b("mdi-close")]),_:1})]),_:1})]),_:1}),e(A,{class:"px-5 py-4"},{default:a(()=>[e(ee,{class:"w-100",ref_key:"form",ref:z},{default:a(()=>[e(R,null,{default:a(()=>[e(d,{cols:"12",class:"pb-0 pt-0"},{default:a(()=>[r("span",Ue,c(o(n)("users.name")),1),e(p,{rules:o(w),modelValue:i.value.name,"onUpdate:modelValue":s[5]||(s[5]=t=>i.value.name=t),class:"mt-1","hide-details":"",density:"compact",flat:"",variant:"outlined"},null,8,["rules","modelValue"])]),_:1}),e(d,{cols:"12",class:"pb-0"},{default:a(()=>[r("span",Ce,c(o(n)("booking.phone")),1),e(p,{modelValue:i.value.phone,"onUpdate:modelValue":s[6]||(s[6]=t=>i.value.phone=t),rules:o(w),class:"mt-1","hide-details":"",density:"compact",placeholder:"998 XX XXX XX XX",flat:"",variant:"outlined"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",class:"pb-0"},{default:a(()=>[r("span",je,c(o(n)("booking.email")),1),e(p,{modelValue:i.value.email,"onUpdate:modelValue":s[7]||(s[7]=t=>i.value.email=t),rules:o(w),class:"mt-1","hide-details":"",density:"compact",placeholder:"example@mail.com",flat:"",variant:"outlined"},null,8,["modelValue","rules"])]),_:1}),e(d,{cols:"12",class:"pb-0"},{default:a(()=>[r("span",ze,c(o(n)("login.password")),1),e(p,{modelValue:i.value.password,"onUpdate:modelValue":s[8]||(s[8]=t=>i.value.password=t),class:"mt-1","hide-details":"",density:"compact",flat:"",variant:"outlined",autocomplete:"off",color:"primary",dirty:"","append-inner-icon":U.value?"mdi-eye":"mdi-eye-off",type:U.value?"text":"password",rules:h.value?[]:o(w),"onClick:appendInner":s[9]||(s[9]=t=>U.value=!U.value)},null,8,["modelValue","append-inner-icon","type","rules"])]),_:1}),e(d,{cols:"12",class:"pb-0"},{default:a(()=>[r("span",Ie,c(o(n)("users.role")),1),e(O,{items:q.value,rules:o(w),"item-title":"title","item-value":"value",modelValue:i.value.role,"onUpdate:modelValue":s[10]||(s[10]=t=>i.value.role=t),transition:"fade-transition",class:"mt-1","hide-details":"",density:"compact",flat:"",variant:"outlined"},null,8,["items","rules","modelValue"])]),_:1}),e(d,{cols:"12",class:"pb-0"},{default:a(()=>[r("span",Xe,c(o(n)("users.image")),1),e(Z,{"prepend-icon":"",modelValue:y.value,"onUpdate:modelValue":s[11]||(s[11]=t=>y.value=t),class:"mt-1",chips:"","hide-details":"",density:"compact",flat:"",variant:"outlined"},{prepend:a(()=>[e(N,{rounded:"",size:"45"},{default:a(()=>[e(F,{src:E.value,cover:""},null,8,["src"])]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(d,{cols:"12"},{default:a(()=>[e(g,{height:"40",class:"mt-1",color:"primary",block:"",flat:"",onClick:H},{default:a(()=>[b(c(o(n)("save")),1)]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}});export{Te as default};
