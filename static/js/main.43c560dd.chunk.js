(this["webpackJsonpsemeru-time-boxing"]=this["webpackJsonpsemeru-time-boxing"]||[]).push([[0],{326:function(e,t,n){},327:function(e,t,n){},812:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),s=n(16),r=n.n(s),i=(n(326),n(327),n(23)),l=n(14),o=n(819),j=n(312),u=n(313),h=n(35),b=h.a.initializeApp({apiKey:"AIzaSyB-FtRRuqWMdiV5iDHiZKfxDNQI5o64qAI",authDomain:"semeru-52985.firebaseapp.com",projectId:"semeru-52985",storageBucket:"semeru-52985.appspot.com",messagingSenderId:"1090112397950",appId:"1:1090112397950:web:5c5937829ee10694802e2f",measurementId:"G-FPBQ133JL7"}),d=n(61),m=n(3);function f(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(""),r=Object(l.a)(s,2),i=r[0],h=r[1],f=[{fn:function(){return i.match(/.+@.+\..+/)},message:"Es wurde keine g\xfcltige E-Mail-Adresse angegeben"},{fn:function(){return n.length>6},message:"Ihres Passwort muss mindestens 6 Zeichen enthalten"}];return Object(m.jsxs)(o.a,{children:[Object(m.jsx)("h2",{children:"Anmeldung"}),Object(m.jsx)("br",{}),Object(m.jsx)("label",{htmlFor:"email",children:"E-Mail Adresse: "}),Object(m.jsx)(j.a,{value:i,onChange:function(e){return h(e.target.value)},id:"email"}),Object(m.jsx)("br",{}),Object(m.jsx)("label",{htmlFor:"password",children:"Passwort: "}),Object(m.jsx)(j.a,{value:n,onChange:function(e){return c(e.target.value)},type:"password",id:"password"}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)(u.a,{className:"col-8",onClick:function(e){var t=f.filter((function(e){return!e.fn()}));t.length?t.forEach((function(e){return alert(e.message)})):b.auth().signInWithEmailAndPassword(i,n).then((function(){localStorage.setItem("email",i),e.history.push("schnellmenu")})).catch((function(e){return alert(e+"Ihre E-Mail Adresse stimmt nicht \xfcberein mit dem Passwort.")}))},variant:"secondary",children:"Anmelden"}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)(d.b,{to:"/registrieren",children:"Kein Konto? Melden Sie sich hier an!"})]})}var O=n(820),g=n(19),x=n(20),v={today:"Heute",thisWeek:"Diese Woche",thisMonth:"Dieser Monat"},p=n(316),w=n(32),k=function(){function e(){Object(g.a)(this,e)}return Object(x.a)(e,[{key:"calculateDifferenceDates",value:function(e,t){var n=Math.floor((e-t)%864e5/36e5),a=Math.floor((e-t)%864e5%36e5/6e4);return(n<10?"0":"")+n+":"+(a<10?"0":"")+a}},{key:"getDateFromHours",value:function(e){e=e.split(":");var t=new Date;return Object(p.a)(Date,[t.getFullYear(),t.getMonth(),t.getDate()].concat(Object(w.a)(e)))}},{key:"subtractTimeInHours",value:function(e,t){return((e=this.getDateFromHours(e))-(t=this.getDateFromHours(t)))%864e5/36e5}},{key:"showTask",value:function(e){return e.name+" "+e.plannedFrom+"-"+e.plannedTill}},{key:"formatDate",value:function(e){return(e.getHours()<10?"0":"")+e.getHours()+":"+(e.getMinutes()<10?"0":"")+e.getMinutes()}}]),e}(),D=h.a.firestore(),S="tasks",y=new k,I=function(){function e(){Object(g.a)(this,e)}return Object(x.a)(e,[{key:"create",value:function(e,t,n,a,c){D.collection(S).doc().set({name:e,plannedFrom:t,plannedTill:n,editTime:[],pause:[],priority:a,user:c}).catch((function(e){return alert("Ein Fehler ist aufgetreten: "+e)}))}},{key:"getFromUser",value:function(e){var t=[];return e.forEach((function(e){e.data().user===localStorage.getItem("email")&&t.push(e.data())})),t}},{key:"getDocIdsFromUser",value:function(e){var t=[];return e.docs.forEach((function(e){e.data().user===localStorage.getItem("email")&&t.push(e.id)})),t}},{key:"updateTask",value:function(e,t,n){D.collection(S).doc(e).update({editTime:t,pause:n}).catch((function(e){return alert("Ein Fehler ist aufgetreten: "+e)}))}},{key:"deleteATask",value:function(e){D.collection(S).doc(e).delete().then((function(){alert("Ihr Eintrag wurde erfolgreich gel\xf6scht."),window.location.reload()}))}},{key:"getStatsFromTask",value:function(e,t){var n=this.getFromUser(e),a=[];return n.forEach((function(e,c){var s=-1,r=0,i=y.subtractTimeInHours(e.plannedTill,e.plannedFrom);e.editTime.forEach((function(e){var n=new Date(e.from.toMillis()),a=new Date(e.till.toMillis());(function(e,t,n){var a=(new Date).toDateString(),c=new Date((new Date).setDate((new Date).getDate()-(new Date).getDay()+1)).toDateString();switch(e){case v.today:return n.toDateString()===a||t.toDateString()===a;case v.thisWeek:return n.toDateString()>=c||n.toDateString()===a;case v.thisMonth:return n.getMonth()===(new Date).getMonth()||t.getMonth()===(new Date).getMonth();default:return!1}})(t,a,n)&&(s=c,r+=(a-n)%864e5/36e5)})),s===c&&a.push({name:n[c].name,worked:r,planned:i})})),a}}]),e}();var T=n(825),F=h.a.firestore(),M=new I;function N(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(v.today),r=Object(l.a)(s,2),i=r[0],j=r[1];return Object(a.useEffect)((function(){F.collection("tasks").get().then((function(e){c(M.getStatsFromTask(e,i)),console.log(M.getStatsFromTask(e,i))}))}),[i]),Object(m.jsxs)(o.a,{className:"col-12 col-lg-8",children:[Object(m.jsx)("h3",{children:"Ihre Statistiken"}),Object(m.jsx)("br",{}),Object(m.jsx)(O.a,{className:"me-2",children:[v.today,v.thisWeek,v.thisMonth].map((function(e,t){return Object(m.jsx)(T.a.button,{onClick:function(){return j(e)},className:"btn btn-outline-secondary "+(i===e?"active":""),initial:{scale:1.1,rotate:10},animate:{rotate:0,scale:1},whileHover:{scale:1.1,rotate:2},whileTap:{scale:1.1,rotate:2},transition:{type:"spring",stiffness:260,damping:20},children:e},"stats-"+t)}))}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),n.map((function(e,t){return Object(m.jsxs)(T.a.div,{whileHover:{scale:1.1,rotate:0},children:[Object(m.jsxs)("table",{className:"table table-striped",children:[Object(m.jsx)("thead",{children:Object(m.jsx)("tr",{children:Object(m.jsx)("th",{children:e.name})})}),Object(m.jsxs)("tbody",{children:[Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"gearbeitet"}),Object(m.jsx)("td",{children:E(e.worked)})]}),Object(m.jsxs)("tr",{children:[Object(m.jsx)("td",{children:"eingeplannt pro Tag"}),Object(m.jsx)("td",{children:E(e.planned)})]})]})]}),Object(m.jsx)("br",{})]},t)}))]})}function E(e){var t=Math.floor(e),n=60*(e-t);return t+" h "+Math.round(n)+" min"}function C(e){var t=e.stopwatch,n=Object(a.useState)(0),c=Object(l.a)(n,2),s=c[0],r=c[1];return t.onTime((function(e){return r(e.ms)})),Object(m.jsx)("div",{children:Object(m.jsx)("h5",{children:P(s)})})}function P(e){var t=Math.floor(e/36e5%24),n=Math.floor(e/6e4%60),a=Math.floor(e/1e3%60);return(t=(t<10?"0":"")+t)+":"+(n=(n<10?"0":"")+n)+":"+(a=(a<10?"0":"")+a)}var B=n(829);function H(e){var t=e.timer,n=e.startValue,c=Object(a.useState)(),s=Object(l.a)(c,2),r=s[0],i=s[1];return t.onTime((function(e){return i(n-e.ms)})),Object(m.jsx)("div",{children:Object(m.jsx)(B.a,{variant:"warning",children:Object(m.jsx)("h4",{children:0===r?"Ihre eingeplante Zeit ist vorbei ":V(r)})})})}function V(e){var t=Math.floor(e/36e5%24),n=Math.floor(e/6e4%60),a=Math.floor(e/1e3%60);return t=(t<10?"0":"")+t,n=(n<10?"0":"")+n,a=(a<10?"0":"")+a,isNaN(t)||isNaN(n)||isNaN(a)?"00:00:00":t+":"+n+":"+a}var A=new I;function z(e){var t=e.docId;return Object(m.jsx)(u.a,{onClick:function(){window.confirm("Sind Sie sich sicher, dass Sie diese T\xe4tigkeit l\xf6schen m\xf6chten?")&&A.deleteATask(t)},variant:"danger",children:Object(m.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"bi bi-trash",viewBox:"0 0 16 16",children:[Object(m.jsx)("path",{d:"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"}),Object(m.jsx)("path",{fillRule:"evenodd",d:"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"})]})})}var U=n(223),Z=new U,W=new U,R=h.a.firestore(),K=new I,L=new k;function J(){var e=Object(a.useState)({values:[],docIds:[]}),t=Object(l.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(-1),r=Object(l.a)(s,2),i=r[0],j=r[1],h=new Date,b=new Date,d=Object(a.useState)(!1),f=Object(l.a)(d,2),O=f[0],g=f[1];function x(e){j(e),g(!O),b=new Date,Z.start(),W.start(),e===i&&j(-1),O||(h=new Date,console.log("hjsjkf")),function(e){var t=[{from:h,till:b}],a=n.values[e];a.editTime.length>0&&(t=[].concat(Object(w.a)(a.editTime),[t[0]]));K.updateTask(n.docIds[e],t,a.pause)}(e),O&&window.location.reload()}return Object(a.useEffect)((function(){R.collection("tasks").get().then((function(e){c({docIds:K.getDocIdsFromUser(e),values:K.getFromUser(e)})}))}),[]),Object(m.jsx)(o.a,{className:"col-11 col-lg-8",children:Object(m.jsxs)(T.a.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{type:"keyframes",stiffness:200,damping:20},children:[Object(m.jsx)("h3",{children:"Schnell Menu"}),Object(m.jsx)("h4",{children:i<0?"":n.values[i].name}),Object(m.jsx)("br",{}),Object(m.jsx)("p",{children:"Hier k\xf6nnen Sie schnell und eifach Ihre Zeiten erfassen. Dazu m\xfcssen Sie nur die gewollte T\xe4tigkeit ausw\xe4hlen und die Stoppuhr l\xe4uft. "}),Object(m.jsx)("br",{}),Object(m.jsx)("h6",{children:"berechnete Zeit: "}),Object(m.jsx)(C,{stopwatch:Z}),Object(m.jsx)("br",{}),Object(m.jsx)("h6",{children:"verf\xfcgbare Zeit:"}),Object(m.jsx)(H,{startValue:i<0?0:L.getDateFromHours(n.values[i].plannedTill)-L.getDateFromHours(n.values[i].plannedFrom),timer:W}),Object(m.jsx)("br",{}),Object(m.jsx)("hr",{}),n.values.map((function(e,t){return Object(m.jsxs)(T.a.div,{initial:{scale:0,rotate:-10},animate:{rotate:0,scale:1},whileHover:{scale:1.05,rotate:0},whileTap:{scale:1.05,rotate:0},transition:{type:"spring",stiffness:260,damping:20},children:[Object(m.jsx)(u.a,{onClick:function(){return x(t)},className:"col-8",active:t===i,variant:"outline-secondary",children:L.showTask(e)})," ",Object(m.jsx)(z,{docId:n.docIds[t]}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{})]},"tasks"+t)}))]})})}var q=n(821),Q=n(822),G=n(823),Y=n(322),X=n(219),$=n.n(X),_=(n(511),{high:"hoch",normal:"normal",low:"niedrig"}),ee=new k,te=new I;function ne(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(""),r=Object(l.a)(s,2),i=r[0],h=r[1],b=Object(a.useState)(""),d=Object(l.a)(b,2),f=d[0],O=d[1],g=Object(a.useState)(""),x=Object(l.a)(g,2),v=x[0],p=x[1],w=[{fn:function(){return n.length<31},message:"Die T\xe4tigkeit muss max. 30 Buchstaben enthalten"},{fn:function(){return Boolean(i)},message:"Sie m\xfcssen eine Priorit\xe4t setzen"},{fn:function(){return Boolean(f)},message:"Sie m\xfcssen eine Startzeit setzen"},{fn:function(){return Boolean(v)},message:"Sie m\xfcssen eine Endzeit setzen"},{fn:function(){return n.length>2},message:"Die T\xe4tigkeit muss mind. 3 Buchstaben enthalten"}];return Object(m.jsx)(o.a,{className:"col-10 col-lg-8",children:Object(m.jsxs)(T.a.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{type:"keyframes",stiffness:200,damping:20},children:[Object(m.jsx)("h3",{children:"T\xe4tigkeit erfassen"}),Object(m.jsx)("br",{}),Object(m.jsxs)(q.a,{children:[Object(m.jsx)(q.a.Prepend,{className:"col-4 col-lg-3",children:Object(m.jsx)(q.a.Text,{children:"T\xe4tigkeit"})}),Object(m.jsx)(j.a,{value:n,onChange:function(e){return c(e.target.value)},id:"name"})]}),Object(m.jsx)("br",{}),Object(m.jsx)("hr",{}),Object(m.jsx)("h5",{children:Boolean(f)&&Boolean(v)?"dauer: "+ee.calculateDifferenceDates(ee.getDateFromHours(v),ee.getDateFromHours(f)):""}),Object(m.jsxs)(B.a,{variant:"warning",children:[Object(m.jsx)("label",{children:"Von: "}),Object(m.jsx)($.a,{colorPalette:"dark",onTimeChange:function(e){return O(e.hour+":"+e.minute)},time:f,phrases:{confirm:"Sind Sie sicher?",cancel:"abbrechen?",close:"schliessen"}}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)("label",{children:"Bis: "}),Object(m.jsx)($.a,{colorPalette:"dark",onTimeChange:function(e){return p(e.hour+":"+e.minute)},time:v,pharese:{confirm:"Sind Sie sicher?",cancel:"abbrechen?",close:"schliessen"}})]}),Object(m.jsx)("hr",{}),Object(m.jsx)("br",{}),Object(m.jsxs)(Q.a,{children:[Object(m.jsx)("label",{className:"col-4 col-lg-3 offset-lg-2",children:"Priorit\xe4t: "}),Object(m.jsxs)(G.a,{id:"dropdown-basic-button",className:"col-3",variant:"light",title:Boolean(i)?i:"Bitte etwas ausw\xe4hlen",children:[Object(m.jsx)(Y.a.Item,{onSelect:function(){return h(_.high)},children:_.high}),Object(m.jsx)(Y.a.Item,{onSelect:function(){return h(_.normal)},children:_.normal}),Object(m.jsx)(Y.a.Item,{onSelect:function(){return h(_.low)},children:_.low})]})]}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)(u.a,{onClick:function(){var e=w.filter((function(e){return!e.fn()}));e.length?e.forEach((function(e){return alert(e.message)})):(te.create(n,f,v,i,localStorage.getItem("email")),c(""),O(""),p(""),h(""))},className:"col-5",variant:"secondary",children:"speichern"})]})})}var ae=n(223),ce=new ae,se=new ae,re=h.a.firestore(),ie=new I,le=new k;function oe(){var e=Object(a.useState)({value:[],docIds:[]}),t=Object(l.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(-1),r=Object(l.a)(s,2),i=r[0],j=r[1],h=new Date,b=new Date,d=new Date,f=new Date,O=Object(a.useState)(!1),g=Object(l.a)(O,2),x=g[0],v=g[1],p=Object(a.useState)(!1),k=Object(l.a)(p,2),D=k[0],S=k[1];function y(){var e=[{from:b,till:h}],t=[{from:d,till:f}];n.value[i].editTime.length>0&&Object(w.a)(n.value[i].editTime).forEach((function(t){e.push({from:new Date(t.from.toMillis()),till:new Date(t.till.toMillis())})})),n.value[i].pause.length>0&&Object(w.a)(n.value[i].pause).forEach((function(e){t.push({from:new Date(e.from.toMillis()),till:new Date(e.till.toMillis())})})),ie.updateTask(n.docIds[i],e,t),re.collection("tasks").get().then((function(e){c({docIds:ie.getDocIdsFromUser(e),value:ie.getFromUser(e)})}))}return Object(a.useEffect)((function(){re.collection("tasks").get().then((function(e){c({docIds:ie.getDocIdsFromUser(e),value:ie.getFromUser(e)})})),console.log("useEffectt")}),[]),Object(m.jsx)(o.a,{className:"col-11 col-lg-8",children:Object(m.jsxs)(T.a.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{type:"keyframes",stiffness:200,damping:20},children:[Object(m.jsx)("h3",{children:"Zeiten erfassen"}),Object(m.jsx)("br",{}),Object(m.jsx)(G.a,{title:i>=0?le.showTask(n.value[i]):"Bitte etwas ausw\xe4hlen",variant:"warning",children:n.value.map((function(e,t){return Object(m.jsx)(Y.a.Item,{onSelect:function(){return function(e){ce.reset(),se.reset(),S(!1),j(e),h=new Date,f=new Date,d=new Date}(t)},children:le.showTask(e)},"tasks"+t)}))}),Object(m.jsx)("br",{}),Object(m.jsx)("hr",{}),Object(m.jsx)("h6",{children:"Vorhandene Zeit: "}),Object(m.jsx)(H,{startValue:i<0?0:le.getDateFromHours(n.value[i].plannedTill)-le.getDateFromHours(n.value[i].plannedFrom),timer:se}),Object(m.jsx)("br",{}),Object(m.jsx)(u.a,{onClick:function(){h=new Date,S(!D),D?(ce.stop(),ce.reset(),se.stop(),se.reset()):(ce.start(),se.start(),b=new Date),y()},variant:"light",disabled:i<0||x,children:D?"Stopp":"Start"}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)("hr",{}),Object(m.jsx)("p",{children:"berechnete Zeit:"}),Object(m.jsx)(C,{stopwatch:ce}),Object(m.jsx)("br",{}),Object(m.jsx)(u.a,{className:"col-6",disabled:i<0,onClick:function(){h=new Date,v(!x),ce.start(),se.start(),f=new Date,x?b=new Date:(d=new Date,f=new Date,ce.stop(),se.stop()),y()},variant:"light",children:x?"weiter":"pausieren"}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{})]})})}var je=n(828),ue=n(827);function he(e){var t=e.component;return Object(m.jsxs)(o.a,{children:[Object(m.jsx)(je.a,{bg:"dark",expand:"lg",variant:"dark",children:Object(m.jsxs)(o.a,{children:[Object(m.jsx)(d.b,{to:"/schnellmenu",className:"navbar-brand",children:"Semeru"}),Object(m.jsx)(je.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(m.jsx)(je.a.Collapse,{id:"basic-navbar-nav",children:Object(m.jsxs)(ue.a,{className:"me-auto",children:[Object(m.jsx)(d.b,{className:"nav-link",to:"/statistiken",children:"Statistiken"}),Object(m.jsx)(d.b,{className:"nav-link",to:"/t\xe4tigkeit/erfassen",children:"Zeiten erfassen"}),Object(m.jsx)(d.b,{className:"nav-link",to:"/t\xe4tigkeit/erstellen",children:"T\xe4tigkeit erfassen"})]})})]})}),Object(m.jsx)("br",{}),t]})}var be=n(319),de=n(12),me=n(826),fe=h.a.firestore(),Oe="user",ge=function(){function e(){Object(g.a)(this,e)}return Object(x.a)(e,[{key:"create",value:function(e,t,n){fe.collection(Oe).doc(e).set({firstname:t,lastname:n}).catch((function(e){return alert("Es ist ein Fehler aufgetreten: "+e)}))}},{key:"getAUser",value:function(e){fe.collection(Oe).get().then((function(t){t.forEach((function(t){if(t.id===e)return t.data()}))}))}}]),e}();function xe(e){var t=Object(a.useState)(""),n=Object(l.a)(t,2),c=n[0],s=n[1],r=Object(a.useState)(""),i=Object(l.a)(r,2),b=i[0],d=i[1],f=Object(a.useState)(""),O=Object(l.a)(f,2),g=O[0],x=O[1],v=Object(a.useState)({value:"",confirmPwd:""}),p=Object(l.a)(v,2),w=p[0],k=p[1],D=[{fn:function(){return b.length<31},message:"Ihr Vorname muss max. 30 Buchstaben enthalten"},{fn:function(){return b.length>2},message:"Ihr Vorname muss mind. 3 Buchstaben enthalten"},{fn:function(){return b.match(/\w+/)},message:"Ihr Vorname muss Buchstaben enthalten"},{fn:function(){return g.length<31},message:"Ihr Nachname muss max. 30 Buchstaben enthalten"},{fn:function(){return g.match(/\w+/)},message:"Ihr Nachname kann nur Buchstaben enthalten"},{fn:function(){return g.length>2},message:"Ihr Nachname muss mind. 3 Buchstaben enthalten"},{fn:function(){return c.match(/.+@.+\..+/)},message:"Es wurde keine g\xfcltige E-Mail-Adresse angegeben"},{fn:function(){return w.value.length>6},message:"Ihres Passwort muss mind. 6 Zeichen enthalten"},{fn:function(){return w.confirmPwd===w.value},message:"Ihre Passw\xf6rter sind nicht identisch"}];return Object(m.jsxs)(o.a,{className:"col-10",children:[Object(m.jsx)("h3",{children:"Registrieren"}),Object(m.jsx)("br",{}),Object(m.jsxs)(me.a,{children:[Object(m.jsxs)(q.a,{children:[Object(m.jsx)(q.a.Prepend,{className:"col-4",children:Object(m.jsx)(q.a.Text,{children:"E-Mail"})}),Object(m.jsx)(j.a,{value:c,type:"e-mail",onChange:function(e){return s(e.target.value)},isValid:c.match(/.+@.+\..+/)})]}),Object(m.jsx)("br",{}),Object(m.jsxs)(q.a,{children:[Object(m.jsx)(q.a.Prepend,{className:"col-4",children:Object(m.jsx)(q.a.Text,{children:"Vorname"})}),Object(m.jsx)(j.a,{value:b,onChange:function(e){return d(e.target.value)}})]}),Object(m.jsx)("br",{}),Object(m.jsx)("label",{htmlFor:"lastname",children:"Nachname"}),Object(m.jsx)(j.a,{value:g,id:"lastname",onChange:function(e){return x(e.target.value)}}),Object(m.jsx)("br",{}),Object(m.jsx)("label",{htmlFor:"password",children:"Passwort"}),Object(m.jsx)(j.a,{value:w.value,onChange:function(e){return k(Object(de.a)(Object(de.a)({},w),{},{value:e.target.value}))},type:"password",id:"password"}),Object(m.jsx)("br",{}),Object(m.jsx)("label",{htmlFor:"password",children:"Passwort best\xe4tigen"}),Object(m.jsx)(j.a,{value:w.confirmPwd,type:"password",id:"confirmPassword",onChange:function(e){return k(Object(de.a)(Object(de.a)({},w),{},{confirmPwd:e.target.value}))}}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)(u.a,{className:"col-4",onClick:function(){var t=D.filter((function(e){return!e.fn()})),n=new ge;t.length?t.forEach((function(e){return alert(e.message)})):h.a.auth().createUserWithEmailAndPassword(c,w.value).then((function(){n.create(c,b,g),localStorage.setItem("email",c),e.history.push("schnellmenu")})).catch((function(e){return alert("Es ist ein Fehler aufgetreten: "+e)}))},children:"Registrieren"})]})]})}var ve=n(824);function pe(e){return Object(a.useEffect)((function(){return h.a.auth().onAuthStateChanged((function(t){e.history.push(t?"schnellmenu":"anmelden")})),function(){Object(be.a)()}})),Object(m.jsx)("div",{children:Object(m.jsx)(ve.a,{animation:"border",variant:"secondary"})})}var we=function(){return Object(m.jsx)("div",{className:"App",children:Object(m.jsxs)(i.c,{children:[Object(m.jsx)(i.a,{exact:!0,path:"/",component:pe}),Object(m.jsx)(i.a,{path:"/anmelden",component:f}),Object(m.jsx)(i.a,{path:"/registrieren",component:xe}),Object(m.jsx)(i.a,{path:"/statistiken",children:Object(m.jsx)(he,{component:Object(m.jsx)(N,{})})}),Object(m.jsx)(i.a,{path:"/schnellmenu",children:Object(m.jsx)(he,{component:Object(m.jsx)(J,{})})}),Object(m.jsx)(i.a,{path:"/t\xe4tigkeit/erstellen",children:Object(m.jsx)(he,{component:Object(m.jsx)(ne,{})})}),Object(m.jsx)(i.a,{path:"/t\xe4tigkeit/erfassen",children:Object(m.jsx)(he,{component:Object(m.jsx)(oe,{})})}),Object(m.jsx)(i.a,{path:"/",children:"404"})]})})},ke=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,830)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),s(e),r(e)}))};n(813),n(811);r.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(d.a,{children:Object(m.jsx)(we,{})})}),document.getElementById("root")),ke()}},[[812,1,2]]]);
//# sourceMappingURL=main.43c560dd.chunk.js.map