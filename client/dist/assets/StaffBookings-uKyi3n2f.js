import{d as de,u as ce,r as _,c as h,w as re,b as m,e as R,f as a,g as C,i as e,m as o,l as y,t as d,n as c,p as ue,j as me,k as pe,F as _e,q as ve}from"./index-B8j9Fg8x.js";import{i as fe}from"./items-R1paJi57.js";import{g as be,c as ye}from"./booking-M7MEwy1G.js";import{l as ge}from"./lodash-kvVwPKOQ.js";import{n as v}from"./rules-6ndjMkCM.js";import{g as ke,a as he,d as xe}from"./roomtype-E1NtJmk8.js";import"./index-_h905p1k.js";import"./axios-QLjAsgXu.js";const Ve={class:"responsive-datatable"},we=["data-label"],Ue=["data-label"],Ce=["data-label"],De=["data-label"],je=["data-label"],Se=["data-label"],ze=["data-label"],$e=["data-label"],Be=["data-label"],Le={class:"text-body-2 text-grey"},Ne={class:"text-body-2 text-grey"},Re={class:"text-caption text-grey"},Te={class:"text-body-2 text-grey"},Ie={class:"text-body-2 text-grey"},Pe={class:"text-body-2 text-grey"},qe={class:"text-body-2 text-grey"},Ee={class:"text-body-2 text-grey"},Fe={class:"text-body-2 text-grey"},Oe={class:"text-body-2 text-grey"},He={class:"text-body-2 text-grey"},Me={class:"text-body-2 text-grey"},Ae={class:"text-body-2 text-grey"},Ge={class:"text-body-2 text-grey"},at=de({__name:"StaffBookings",setup(Je){const{t:i}=ce(),M=[{title:"booking.client",key:"client",sortable:!0},{title:"rooms.room_no",key:"room",sortable:!1},{title:"rooms.room_type",key:"room_type",sortable:!1},{title:"booking.email",key:"email",sortable:!1},{title:"booking.check_in",key:"check_in",sortable:!1},{title:"booking.check_out",key:"check_out",sortable:!1},{title:"booking.total_amount",key:"total_price",sortable:!1}],n=_({room:null,room_type:null,check_in:null,check_out:null,total_price:0,client:"",phone:"",email:"",address:""}),b=_(!1),D=_(!1),g=_(1),f=_(25),x=_(0),V=_(""),j=_(null),A=h(()=>{const l=new URLSearchParams;return g.value&&l.append("page",g.value),f.value&&l.append("perpage",f.value),V.value.trim()&&l.append("search",V.value),l.toString()}),G=h(()=>{const l=(g.value-1)*f.value;return`${l+1}-${l+k.value.length} / ${x.value}`}),J=ge.debounce(l=>{V.value=l,g.value=1},500),K=h(()=>M.map(l=>({...l,title:i(l.title)}))),S=h(()=>{const l=new Date(n.value.check_in),s=new Date(n.value.check_out);if(l&&s){const u=s.getTime()-l.getTime(),r=u/(1e3*3600*24);return u<=0?0:r}else return 0}),k=_([]),T=_([]),z=_([]),Q=h(()=>z.value.filter(l=>!l.booked)),W=async()=>{const{data:l}=await ke();l.status==="ok"&&(T.value=l.types)},X=async()=>{const{valid:l}=await j.value.validate();l&&Z()},Y=async l=>{if(!(l!=null&&l.id))return;const{data:s}=await he(l.id);s.status==="ok"&&(z.value=s.result)},I=async()=>{D.value=!0;const{data:l}=await be(A.value);l.status==="ok"&&(k.value=l.result,x.value=l.totalCount),D.value=!1},Z=async()=>{n.value.total_price=S.value*n.value.room.price,n.value.room_type_id=n.value.room_type.id,n.value.room_id=n.value.room.id;const{data:l}=await ye(n.value);l.status==="ok"&&(k.value.push(l.result),P())},P=()=>{b.value=!1,ve(()=>{var l;n.value=Object.assign({},{room:null,room_type:null,check_in:null,check_out:null,total_price:0,client:"",phone:"",email:"",address:""}),(l=j.value)==null||l.reset()})},ee=async(l,s)=>{if(!s)return;const{data:u}=await xe(s);u.status==="ok"&&Object.assign(k.value[l].room,{...k.value[l].room,booked:!1})};return W(),re(b,l=>l||P()),(l,s)=>{const u=m("v-text-field"),r=m("v-col"),$=m("v-icon"),w=m("v-btn"),q=m("v-card-title"),te=m("v-data-table-server"),E=m("v-card-text"),F=m("v-card"),B=m("v-select"),ae=m("v-pagination"),L=m("v-row"),le=m("v-chip"),oe=m("v-sheet"),O=m("v-divider"),se=m("v-form"),ne=m("v-dialog"),ie=m("v-container");return C(),R(ie,{fluid:""},{default:a(()=>[e(L,{align:"center",justify:"space-between"},{default:a(()=>[e(r,{cols:"9",sm:"6",md:"4",class:"pb-0 pr-0"},{default:a(()=>[e(u,{"onUpdate:modelValue":o(J),placeholder:o(i)("search"),"append-inner-icon":"mdi-magnify",flat:"","hide-details":"",density:"compact",variant:"solo"},null,8,["onUpdate:modelValue","placeholder"])]),_:1}),e(r,{cols:"3",sm:"4",md:"2",class:"pb-0 d-flex justify-end"},{default:a(()=>[e(w,{flat:"",onClick:s[0]||(s[0]=t=>b.value=!b.value),color:"primary",size:"43",width:"100%"},{default:a(()=>[e($,null,{default:a(()=>[y("mdi-plus")]),_:1})]),_:1})]),_:1}),e(r,{cols:"12"},{default:a(()=>[e(F,{flat:""},{default:a(()=>[e(q,{class:"px-4 pt-3"},{default:a(()=>[y(d(o(i)("booking.title")),1)]),_:1}),e(E,{class:"px-0"},{default:a(()=>[c("div",Ve,[e(te,{"items-per-page":f.value,"onUpdate:itemsPerPage":s[1]||(s[1]=t=>f.value=t),search:V.value,"items-length":x.value,loading:D.value,"no-data-text":o(i)("nodata"),"loading-text":o(i)("load_data"),"onUpdate:options":I,items:k.value,headers:K.value,density:"comfortable"},{bottom:a(()=>[]),"item.client":a(({item:t})=>[c("td",{"data-label":o(i)("booking.client")},d(t.client),9,we)]),"item.room":a(({item:t})=>{var p;return[c("td",{"data-label":o(i)("rooms.room_no")},d((p=t.room)==null?void 0:p.name),9,Ue)]}),"item.phone":a(({item:t})=>[c("td",{"data-label":o(i)("booking.phone")},d(t.phone),9,Ce)]),"item.email":a(({item:t})=>[c("td",{"data-label":o(i)("booking.email")},d(t.email),9,De)]),"item.address":a(({item:t})=>[c("td",{"data-label":o(i)("booking.address")},d(t.address),9,je)]),"item.total_price":a(({item:t})=>[c("td",{"data-label":o(i)("booking.total_amount")},d(t.total_price),9,Se)]),"item.room_type":a(({item:t})=>{var p;return[c("td",{"data-label":o(i)("rooms.room_type")},d((p=t.room_type)==null?void 0:p.name),9,ze)]}),"item.check_in":a(({item:t})=>[c("td",{"data-label":o(i)("booking.check_in")},d(t.check_in),9,$e)]),"item.check_out":a(({index:t,item:p})=>{var U;return[c("td",{"data-label":o(i)("booking.check_out")},[c("div",null,[y(d(p.check_out)+" ",1),(U=p.room)!=null&&U.booked?(C(),R(w,{key:0,size:"30",color:new Date(p.check_out).toLocaleDateString()===new Date().toLocaleDateString()?"red":"primary",variant:"flat",onClick:N=>{var H;return ee(t,(H=p.room)==null?void 0:H.id)}},{default:a(()=>[e($,null,{default:a(()=>[y("mdi-account-cancel")]),_:1})]),_:2},1032,["color","onClick"])):ue("",!0)])],8,Be)]}),_:1},8,["items-per-page","search","items-length","loading","no-data-text","loading-text","items","headers"])])]),_:1})]),_:1})]),_:1}),e(r,{cols:"12",sm:"4",class:"pt-0 pb-1 d-flex align-center"},{default:a(()=>[e(B,{modelValue:f.value,"onUpdate:modelValue":s[2]||(s[2]=t=>f.value=t),transition:"fade-transition","hide-details":"",flat:"",density:"compact",variant:"solo",items:o(fe)},null,8,["modelValue","items"]),e(u,{class:"ml-3","hide-details":"",flat:"",density:"compact",variant:"solo","model-value":G.value,readonly:""},null,8,["model-value"])]),_:1}),e(r,{cols:"12",sm:"4",md:"4",class:"pt-0 pl-0 pb-1 pr-2 d-flex justify-end align-center"},{default:a(()=>[e(ae,{modelValue:g.value,"onUpdate:modelValue":[s[3]||(s[3]=t=>g.value=t),I],length:Math.ceil(x.value/f.value),size:"40","total-visible":"3",variant:"flat","active-color":"primary"},null,8,["modelValue","length"])]),_:1})]),_:1}),e(ne,{transition:"fade-transition",modelValue:b.value,"onUpdate:modelValue":s[15]||(s[15]=t=>b.value=t),"max-width":"600"},{default:a(()=>[e(F,null,{default:a(()=>[e(q,{class:"px-4 d-flex justify-space-between align-center"},{default:a(()=>[c("span",null,d(o(i)("booking.create_booking")),1),e(w,{onClick:s[4]||(s[4]=t=>b.value=!1),flat:"",size:"30",color:"primary"},{default:a(()=>[e($,{size:"small"},{default:a(()=>[y("mdi-close")]),_:1})]),_:1})]),_:1}),e(E,{class:"px-4 py-3"},{default:a(()=>[e(se,{ref_key:"form",ref:j},{default:a(()=>[e(L,null,{default:a(()=>[e(r,{cols:"12",sm:"6",class:"pb-0"},{default:a(()=>[c("span",Le,d(o(i)("rooms.room_type")),1),e(B,{rules:o(v),items:T.value,modelValue:n.value.room_type,"onUpdate:modelValue":[s[5]||(s[5]=t=>n.value.room_type=t),Y],"return-object":"","item-title":"name",transition:"fade-transition",class:"mt-1","hide-details":"",density:"compact",flat:"",variant:"outlined"},null,8,["rules","items","modelValue"])]),_:1}),e(r,{cols:"12",sm:"6",class:"pb-0"},{default:a(()=>[c("span",Ne,d(o(i)("rooms.room_no")),1),e(B,{modelValue:n.value.room,"onUpdate:modelValue":s[6]||(s[6]=t=>n.value.room=t),items:Q.value,"item-title":"name","return-object":"",rules:o(v),transition:"fade-transition",class:"mt-1","hide-details":"",density:"compact",flat:"",variant:"outlined"},null,8,["modelValue","items","rules"])]),_:1}),e(r,{cols:"12",class:"pb-0"},{default:a(()=>[e(oe,{width:"100%",rounded:"",class:"px-3",border:""},{default:a(()=>[e(L,null,{default:a(()=>[(C(!0),me(_e,null,pe(z.value,t=>(C(),R(r,{cols:"2",key:t.id,class:"d-flex flex-column align-center pt-5 pb-4"},{default:a(()=>[e(le,{label:"",variant:"flat",color:t.booked?"red":"green"},{default:a(()=>[y(d(t.name),1)]),_:2},1032,["color"]),c("span",Re,d(t.price)+" "+d(o(i)("sum"))+"/d ",1)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1}),e(r,{cols:"12",sm:"6",class:"pb-0"},{default:a(()=>[c("span",Te,d(o(i)("booking.check_in_date")),1),e(u,{modelValue:n.value.check_in,"onUpdate:modelValue":s[7]||(s[7]=t=>n.value.check_in=t),rules:o(v),class:"mt-1",type:"date","hide-details":"",density:"compact",flat:"",variant:"outlined"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",sm:"6",class:"pb-0"},{default:a(()=>[c("span",Ie,d(o(i)("booking.check_in_date")),1),e(u,{modelValue:n.value.check_out,"onUpdate:modelValue":s[8]||(s[8]=t=>n.value.check_out=t),rules:o(v),class:"mt-1",type:"date","hide-details":"",density:"compact",flat:"",variant:"outlined"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",class:"pb-0"},{default:a(()=>[e(O)]),_:1}),e(r,{cols:"4",sm:"4",class:"pb-0 pr-0"},{default:a(()=>[c("span",Pe,d(o(i)("booking.total_days")),1),e(u,{"model-value":S.value,class:"mt-1",readonly:"","hide-details":"",density:"compact",flat:"",variant:"outlined"},null,8,["model-value"])]),_:1}),e(r,{cols:"8",sm:"4",class:"pb-0"},{default:a(()=>{var t,p;return[c("span",qe,d(o(i)("booking.rent")),1),e(u,{type:"number",min:"1",disabled:!((t=n.value.room)!=null&&t.price),"onUpdate:modelValue":s[9]||(s[9]=U=>{var N;((N=n.value.room)==null?void 0:N.price)!==void 0&&(n.value.room.price=U)}),"model-value":((p=n.value.room)==null?void 0:p.price)||0,rules:o(v),class:"mt-1","hide-details":"",density:"compact",flat:"",variant:"outlined"},null,8,["disabled","model-value","rules"])]}),_:1}),e(r,{cols:"12",sm:"4",class:"pb-0"},{default:a(()=>{var t;return[c("span",Ee,d(o(i)("booking.total_amount")),1),e(u,{onInput:s[10]||(s[10]=p=>n.value.total_price=p.target.value),"model-value":S.value*(((t=n.value.room)==null?void 0:t.price)||0),type:"number",class:"mt-1",readonly:"","hide-details":"",density:"compact",flat:"",variant:"outlined"},null,8,["model-value"])]}),_:1}),e(r,{cols:"12",class:"pb-0"},{default:a(()=>[e(O)]),_:1}),e(r,{cols:"12",sm:"6",class:"pb-0"},{default:a(()=>[c("span",Fe,d(o(i)("booking.client")),1),e(u,{modelValue:n.value.client,"onUpdate:modelValue":s[11]||(s[11]=t=>n.value.client=t),rules:o(v),class:"mt-1","hide-details":"",density:"compact",placeholder:"",flat:"",variant:"outlined"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",sm:"6",class:"pb-0"},{default:a(()=>[c("span",Oe,d(o(i)("booking.phone")),1),e(u,{modelValue:n.value.phone,"onUpdate:modelValue":s[12]||(s[12]=t=>n.value.phone=t),rules:o(v),class:"mt-1",type:"text","hide-details":"",density:"compact",placeholder:"998 00 000 00 00",flat:"",variant:"outlined"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",sm:"6",class:"pb-0"},{default:a(()=>[c("span",He,d(o(i)("booking.email")),1),e(u,{modelValue:n.value.email,"onUpdate:modelValue":s[13]||(s[13]=t=>n.value.email=t),rules:o(v),class:"mt-1","hide-details":"",density:"compact",placeholder:"example@mail.com",flat:"",variant:"outlined"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"12",sm:"6",class:"pb-0"},{default:a(()=>[c("span",Me,d(o(i)("booking.address")),1),e(u,{modelValue:n.value.address,"onUpdate:modelValue":s[14]||(s[14]=t=>n.value.address=t),rules:o(v),class:"mt-1",type:"text","hide-details":"",density:"compact",flat:"",variant:"outlined"},null,8,["modelValue","rules"])]),_:1}),e(r,{cols:"4",sm:"6",class:"pb-0"},{default:a(()=>[c("span",Ae,d(o(i)("booking.card_exp")),1),e(u,{rules:o(v),class:"mt-1","hide-details":"",density:"compact",placeholder:"00/00",flat:"",variant:"outlined"},null,8,["rules"])]),_:1}),e(r,{cols:"8",sm:"6",class:"pb-0"},{default:a(()=>[c("span",Ge,d(o(i)("booking.card_num")),1),e(u,{rules:o(v),class:"mt-1","hide-details":"",density:"compact",placeholder:"0000 0000 0000 0000",flat:"",variant:"outlined"},null,8,["rules"])]),_:1}),e(r,{cols:"12"},{default:a(()=>[e(w,{height:"40",class:"mt-1",color:"primary",block:"",flat:"",onClick:X},{default:a(()=>[y(d(o(i)("save")),1)]),_:1})]),_:1})]),_:1})]),_:1},512)]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})}}});export{at as default};