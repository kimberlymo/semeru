(this["webpackJsonpsemeru-time-boxing"]=this["webpackJsonpsemeru-time-boxing"]||[]).push([[0],{327:function(e,t,n){},328:function(e,t,n){},813:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(16),s=n.n(c),i=(n(327),n(328),n(24)),o=n(13),l=n(819),u=n(313),j=n(314),b=n(36),h=b.a.initializeApp({apiKey:"AIzaSyB-FtRRuqWMdiV5iDHiZKfxDNQI5o64qAI",authDomain:"semeru-52985.firebaseapp.com",projectId:"semeru-52985",storageBucket:"semeru-52985.appspot.com",messagingSenderId:"1090112397950",appId:"1:1090112397950:web:5c5937829ee10694802e2f",measurementId:"G-FPBQ133JL7"}),d=n(59),m=n(3);function O(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),s=Object(o.a)(c,2),i=s[0],b=s[1],O=[{fn:function(){return i.match(/.+@.+\..+/)},message:"Es wurde keine g\xfcltige E-Mail-Adresse angegeben"},{fn:function(){return n.length>6},message:"Ihres Passwort muss mindestens 6 Zeichen enthalten"}];return Object(m.jsxs)(l.a,{children:[Object(m.jsx)("h2",{children:"Anmeldung"}),Object(m.jsx)("br",{}),Object(m.jsx)("label",{htmlFor:"email",children:"E-Mail Adresse: "}),Object(m.jsx)(u.a,{value:i,onChange:function(e){return b(e.target.value)},id:"email"}),Object(m.jsx)("br",{}),Object(m.jsx)("label",{htmlFor:"password",children:"Passwort: "}),Object(m.jsx)(u.a,{value:n,onChange:function(e){return r(e.target.value)},type:"password",id:"password"}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)(j.a,{className:"col-8",onClick:function(e){var t=O.filter((function(e){return!e.fn()}));t.length?t.forEach((function(e){return alert(e.message)})):h.auth().signInWithEmailAndPassword(i,n).then((function(){localStorage.set("email",i),e.history.push("schnellmenu")})).catch((function(){return alert("Ihre E-Mail Adresse stimmt nicht \xfcberein mit dem Passwort.")}))},variant:"secondary",children:"Anmelden"}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)(d.b,{to:"/registrieren",children:"Kein Konto? Melden Sie sich hier an!"})]})}var f=n(820),g=n(829),x=n(830),v=n(20),p=n(21),w={today:"Heute",thisWeek:"Diese Woche",thisMonth:"Dieser Monat"},k=n(317),D=n(33),S=function(){function e(){Object(v.a)(this,e)}return Object(p.a)(e,[{key:"calculateDifferenceDates",value:function(e,t){var n=Math.floor((e-t)%864e5/36e5),a=Math.floor((e-t)%864e5%36e5/6e4);return(n<10?"0":"")+n+":"+(a<10?"0":"")+a}},{key:"getDateFromHours",value:function(e){e=e.split(":");var t=new Date;return Object(k.a)(Date,[t.getFullYear(),t.getMonth(),t.getDate()].concat(Object(D.a)(e)))}},{key:"subtractTimeInHours",value:function(e,t){return((e=this.getDateFromHours(e))-(t=this.getDateFromHours(t)))%864e5/36e5}},{key:"showTask",value:function(e){return e.name+" "+e.plannedFrom+"-"+e.plannedTill}},{key:"formatDate",value:function(e){return(e.getHours()<10?"0":"")+e.getHours()+":"+(e.getMinutes()<10?"0":"")+e.getMinutes()}}]),e}(),I=b.a.firestore(),T="tasks",F=new S,y=function(){function e(){Object(v.a)(this,e)}return Object(p.a)(e,[{key:"create",value:function(e,t,n,a,r){I.collection(T).doc().set({name:e,plannedFrom:t,plannedTill:n,editTime:[],pause:[],priority:a,user:r}).catch((function(e){return alert("Ein Fehler ist aufgetreten: "+e)}))}},{key:"getFromUser",value:function(e){var t=[];return e.forEach((function(e){e.data().user===localStorage.getItem("email")&&t.push(e.data())})),t}},{key:"getDocIdsFromUser",value:function(e){var t=[];return e.docs.forEach((function(e){e.data().user===localStorage.getItem("email")&&t.push(e.id)})),t}},{key:"updateTask",value:function(e,t,n,a){I.collection(T).doc(e).update({name:t.name,plannedFrom:t.plannedFrom,plannedTill:t.plannedTill,editTime:n,pause:a,priority:t.priority,user:t.user}).catch((function(e){return alert("Ein Fehler ist aufgetreten: "+e)}))}},{key:"deleteATask",value:function(e){I.collection(T).doc(e).delete().then((function(){return alert("Ihr Eintrag wurde erfolgreich gel\xf6scht.")}))}},{key:"getStatsFromTask",value:function(e,t){var n=this.getFromUser(e),a=[];return n.forEach((function(e,r){var c=-1,s=0,i=F.subtractTimeInHours(e.plannedTill,e.plannedFrom),o=0;e.editTime.forEach((function(e){var n=new Date(e.from.toMillis()),a=new Date(e.till.toMillis());M(t,a,n)&&(c=r,s+=(a-n)%864e5/36e5)})),e.pause.forEach((function(e){var n=new Date(e.from.toMillis()),a=new Date(e.till.toMillis());M(t,a,n)&&(o+=(a-n)%864e5/36e5)})),c===r&&a.push({name:n[r].name,worked:s,planned:i,pause:o})})),a}}]),e}();function M(e,t,n){var a=(new Date).toDateString(),r=new Date((new Date).setDate((new Date).getDate()-(new Date).getDay()+1)).toDateString();switch(e){case w.today:return n.toDateString()===a||t.toDateString()===a;case w.thisWeek:return n.toDateString()>=r||n.toDateString()<=a;case w.thisMonth:return n.getMonth()===(new Date).getMonth()||t.getMonth()===(new Date).getMonth();default:return!1}}var N=b.a.firestore(),E=new y;function P(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(w.today),s=Object(o.a)(c,2),i=s[0],u=s[1];return Object(a.useEffect)((function(){N.collection("tasks").get().then((function(e){r(E.getStatsFromTask(e,i)),console.log(E.getStatsFromTask(e,i))}))}),[i]),Object(m.jsxs)(l.a,{className:"col-12 col-lg-8",children:[Object(m.jsx)("h3",{children:"Ihre Statistiken"}),Object(m.jsx)("br",{}),Object(m.jsx)(f.a,{className:"me-2",children:[w.today,w.thisWeek,w.thisMonth].map((function(e,t){return Object(m.jsx)(j.a,{onClick:function(){return u(e)},variant:"outline-secondary",active:e===i,children:e},"stats-"+t)}))}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),n.map((function(e,t){return Object(m.jsxs)("div",{children:[Object(m.jsxs)(g.a,{children:[Object(m.jsx)(g.a.Body,{children:Object(m.jsx)(g.a.Title,{children:e.name})}),Object(m.jsx)(x.a,{children:Object(m.jsx)(x.a.Item,{children:"gearbeitet: "+B(e.worked)})})]}),Object(m.jsx)("br",{})]},t)}))]})}function B(e){var t=Math.floor(e),n=60*(e-t);return t+" h "+Math.round(n)+" min"}function C(e){var t=e.stopwatch,n=Object(a.useState)(0),r=Object(o.a)(n,2),c=r[0],s=r[1];return t.onTime((function(e){return s(e.ms)})),Object(m.jsx)("div",{children:Object(m.jsx)("h5",{children:A(c)})})}function A(e){var t=Math.floor(e/36e5%24),n=Math.floor(e/6e4%60),a=Math.floor(e/1e3%60);return(t=(t<10?"0":"")+t)+":"+(n=(n<10?"0":"")+n)+":"+(a=(a<10?"0":"")+a)}var H=n(827);function V(e){var t=e.timer,n=e.startValue,r=Object(a.useState)(),c=Object(o.a)(r,2),s=c[0],i=c[1];return t.onTime((function(e){return i(n-e.ms)})),Object(m.jsx)("div",{children:Object(m.jsx)(H.a,{variant:"warning",children:Object(m.jsx)("h4",{children:0===s?"Ihre eingeplante Zeit ist vorbei ":Z(s)})})})}function Z(e){var t=Math.floor(e/36e5%24),n=Math.floor(e/6e4%60),a=Math.floor(e/1e3%60);return t=(t<10?"0":"")+t,n=(n<10?"0":"")+n,a=(a<10?"0":"")+a,isNaN(t)||isNaN(n)||isNaN(a)?"00:00:00":t+":"+n+":"+a}var U=n(224),z=new U,W=new U,K=b.a.firestore(),R=new y,J=new S;function L(){var e=Object(a.useState)({values:[],docIds:[]}),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(-1),s=Object(o.a)(c,2),i=s[0],l=s[1],u=Object(a.useState)({from:new Date,till:new Date}),b=Object(o.a)(u,2),h=b[0],d=b[1],O=Object(a.useState)(!1),f=Object(o.a)(O,2),g=f[0],x=f[1];function v(e){l(e),x(!g),d({from:h.from,till:new Date}),z.start(),W.start(),e===i&&l(-1),g&&(d({from:new Date,till:new Date}),window.location.reload()),function(e){var t=[h],a=n.values[e];a.editTime.length>0&&(t=[].concat(Object(D.a)(a.editTime),[h]));R.updateTask(n.docIds[e],a,t,a.pause)}(e)}return Object(a.useEffect)((function(){K.collection("tasks").get().then((function(e){r({docIds:R.getDocIdsFromUser(e),values:R.getFromUser(e)})}))}),[]),Object(m.jsxs)("div",{children:[Object(m.jsx)("h3",{children:"Schnell Menu"}),Object(m.jsx)("h4",{children:i<0?"":n.values[i].name}),Object(m.jsx)("br",{}),Object(m.jsx)("h6",{children:"berechnete Zeit: "}),Object(m.jsx)(C,{stopwatch:z}),Object(m.jsx)("br",{}),Object(m.jsx)("h6",{children:"verf\xfcgbare Zeit:"}),Object(m.jsx)(V,{startValue:i<0?0:J.getDateFromHours(n.values[i].plannedTill)-J.getDateFromHours(n.values[i].plannedFrom),timer:W}),Object(m.jsx)("br",{}),Object(m.jsx)("hr",{}),n.values.map((function(e,t){return Object(m.jsxs)("div",{children:[Object(m.jsx)(j.a,{onClick:function(){return v(t)},className:"col-8",active:t===i,variant:"outline-secondary",children:J.showTask(e)}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{})]},"tasks"+t)}))]})}var q=n(821),Q=n(822),G=n(823),Y=n(323),X=n(220),$=n.n(X),_=(n(512),{high:"hoch",normal:"normal",low:"tief"}),ee=new S,te=new y;function ne(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),s=Object(o.a)(c,2),i=s[0],b=s[1],h=Object(a.useState)(""),d=Object(o.a)(h,2),O=d[0],f=d[1],g=Object(a.useState)(""),x=Object(o.a)(g,2),v=x[0],p=x[1],w=[{fn:function(){return n.length<31},message:"Die T\xe4tigkeit muss max. 30 Buchstaben enthalten"},{fn:function(){return Boolean(i)},message:"Sie m\xfcssen eine Priorit\xe4t setzen"},{fn:function(){return Boolean(O)},message:"Sie m\xfcssen eine Startzeit setzen"},{fn:function(){return Boolean(v)},message:"Sie m\xfcssen eine Endzeit setzen"},{fn:function(){return n.length>2},message:"Die T\xe4tigkeit muss mind. 3 Buchstaben enthalten"}];return Object(m.jsxs)(l.a,{className:"col-10 col-lg-8",children:[Object(m.jsx)("h3",{children:"T\xe4tigkeit erfassen"}),Object(m.jsx)("br",{}),Object(m.jsxs)(q.a,{children:[Object(m.jsx)(q.a.Prepend,{className:"col-4 col-lg-3",children:Object(m.jsx)(q.a.Text,{children:"T\xe4tigkeit"})}),Object(m.jsx)(u.a,{value:n,onChange:function(e){return r(e.target.value)},id:"name"})]}),Object(m.jsx)("br",{}),Object(m.jsx)("hr",{}),Object(m.jsx)("h5",{children:Boolean(O)&&Boolean(v)?"dauer: "+ee.calculateDifferenceDates(ee.getDateFromHours(v),ee.getDateFromHours(O)):""}),Object(m.jsxs)(H.a,{variant:"warning",children:[Object(m.jsx)("label",{children:"Von: "}),Object(m.jsx)($.a,{colorPalette:"dark",onTimeChange:function(e){return f(e.hour+":"+e.minute)},time:O,phrases:{confirm:"Sind Sie sicher?",cancel:"abbrechen?",close:"schliessen"}}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)("label",{children:"Bis: "}),Object(m.jsx)($.a,{colorPalette:"dark",onTimeChange:function(e){return p(e.hour+":"+e.minute)},time:v,pharese:{confirm:"Sind Sie sicher?",cancel:"abbrechen?",close:"schliessen"}})]}),Object(m.jsx)("hr",{}),Object(m.jsx)("br",{}),Object(m.jsxs)(Q.a,{children:[Object(m.jsx)("label",{className:"col-4 col-lg-3 offset-lg-2",children:"Priorit\xe4t: "}),Object(m.jsxs)(G.a,{id:"dropdown-basic-button",className:"col-3",variant:"light",title:Boolean(i)?i:"Bitte etwas ausw\xe4hlen",children:[Object(m.jsx)(Y.a.Item,{onSelect:function(){return b(_.high)},children:"hoch"}),Object(m.jsx)(Y.a.Item,{onSelect:function(){return b(_.normal)},children:"normal"}),Object(m.jsx)(Y.a.Item,{onSelect:function(){return b(_.low)},children:"niedrig"})]})]}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)(j.a,{onClick:function(){var e=w.filter((function(e){return!e.fn()}));e.length?e.forEach((function(e){return alert(e.message)})):(te.create(n,O,v,i,localStorage.getItem("email")),r(""),f(""),p(""),b(""))},className:"col-5",variant:"secondary",children:"speichern"})]})}var ae=n(224),re=new ae,ce=new ae,se=b.a.firestore(),ie=new y,oe=new S;function le(){var e=Object(a.useState)({value:[],docIds:[]}),t=Object(o.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(-1),s=Object(o.a)(c,2),i=s[0],u=s[1],b=Object(a.useState)({from:new Date,till:new Date}),h=Object(o.a)(b,2),d=h[0],O=h[1],f=Object(a.useState)({from:new Date,till:new Date}),g=Object(o.a)(f,2),x=g[0],v=g[1],p=Object(a.useState)(!1),w=Object(o.a)(p,2),k=w[0],S=w[1],I=Object(a.useState)(!1),T=Object(o.a)(I,2),F=T[0],y=T[1];function M(){var e=[d],t=[x];n.value[i].editTime.length>0&&(e=[].concat(Object(D.a)(n.value[i].editTime),[d])),n.value[i].pause.length>0&&(t=[].concat(Object(D.a)(n.value[i].pause),[x])),ie.updateTask(n.docIds[i],n.value[i],e,t)}return Object(a.useEffect)((function(){se.collection("tasks").get().then((function(e){r({docIds:ie.getDocIdsFromUser(e),value:ie.getFromUser(e)})}))}),[]),Object(m.jsxs)(l.a,{className:"col-11 col-lg-8",children:[Object(m.jsx)("h3",{children:"Zeiten erfassen"}),Object(m.jsx)("br",{}),Object(m.jsx)(G.a,{title:i>=0?oe.showTask(n.value[i]):"Bitte etwas ausw\xe4hlen",variant:"warning",children:n.value.map((function(e,t){return Object(m.jsx)(Y.a.Item,{onSelect:function(){return function(e){re.reset(),ce.reset(),y(!1),u(e),O({from:new Date,till:new Date}),v({from:new Date,till:new Date})}(t)},children:oe.showTask(e)},"tasks"+t)}))}),Object(m.jsx)("br",{}),Object(m.jsx)("hr",{}),Object(m.jsx)("h6",{children:"Vorhandene Zeit: "}),Object(m.jsx)(V,{startValue:i<0?0:oe.getDateFromHours(n.value[i].plannedTill)-oe.getDateFromHours(n.value[i].plannedFrom),timer:ce}),Object(m.jsx)("br",{}),Object(m.jsx)(j.a,{onClick:function(){y(!F),O({from:d.from,till:new Date}),F?(re.stop(),re.reset(),ce.stop(),ce.reset()):(re.start(),ce.start(),O({from:new Date,till:new Date})),M()},variant:"light",disabled:i<0||x.isActive,children:F?"Stopp":"Start"}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)("hr",{}),Object(m.jsx)("h6",{children:"angefangen: "+(F?oe.formatDate(d.from):"nicht definiert.")}),Object(m.jsx)("p",{children:"berechnete Zeit:"}),Object(m.jsx)(C,{stopwatch:re}),Object(m.jsx)("br",{}),Object(m.jsx)(j.a,{className:"col-6",disabled:i<0,onClick:function(){S(!k),re.start(),ce.start(),v({from:x.from,till:new Date}),k||(v({from:new Date,till:new Date}),re.stop(),ce.stop()),M()},variant:"light",children:k?"weiter":"pausieren"}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{})]})}var ue=n(826),je=n(828);function be(e){var t=e.component;return Object(m.jsxs)(l.a,{children:[Object(m.jsx)(ue.a,{bg:"dark",expand:"lg",variant:"dark",children:Object(m.jsxs)(l.a,{children:[Object(m.jsx)(d.b,{to:"/schnellmenu",className:"navbar-brand",children:"Semeru"}),Object(m.jsx)(ue.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(m.jsx)(ue.a.Collapse,{id:"basic-navbar-nav",children:Object(m.jsxs)(je.a,{className:"me-auto",children:[Object(m.jsx)(d.b,{className:"nav-link",to:"/statistiken",children:"Statistiken"}),Object(m.jsx)(d.b,{className:"nav-link",to:"/t\xe4tigkeit/erfassen",children:"Zeiten erfassen"}),Object(m.jsx)(d.b,{className:"nav-link",to:"/t\xe4tigkeit/erstellen",children:"T\xe4tigkeit erfassen"})]})})]})}),Object(m.jsx)("br",{}),t]})}var he=n(320),de=n(12),me=n(825),Oe=b.a.firestore(),fe="user",ge=function(){function e(){Object(v.a)(this,e)}return Object(p.a)(e,[{key:"create",value:function(e,t,n){Oe.collection(fe).doc(e).set({firstname:t,lastname:n}).catch((function(e){return alert("Es ist ein Fehler aufgetreten: "+e)}))}},{key:"getAUser",value:function(e){Oe.collection(fe).get().then((function(t){t.forEach((function(t){if(t.id===e)return t.data()}))}))}}]),e}();function xe(e){var t=Object(a.useState)(""),n=Object(o.a)(t,2),r=n[0],c=n[1],s=Object(a.useState)(""),i=Object(o.a)(s,2),h=i[0],d=i[1],O=Object(a.useState)(""),f=Object(o.a)(O,2),g=f[0],x=f[1],v=Object(a.useState)({value:"",confirmPwd:""}),p=Object(o.a)(v,2),w=p[0],k=p[1],D=[{fn:function(){return h.length<31},message:"Ihr Vorname muss max. 30 Buchstaben enthalten"},{fn:function(){return h.length>2},message:"Ihr Vorname muss mind. 3 Buchstaben enthalten"},{fn:function(){return h.match(/\w+/)},message:"Ihr Vorname muss Buchstaben enthalten"},{fn:function(){return g.length<31},message:"Ihr Nachname muss max. 30 Buchstaben enthalten"},{fn:function(){return g.match(/\w+/)},message:"Ihr Nachname kann nur Buchstaben enthalten"},{fn:function(){return g.length>2},message:"Ihr Nachname muss mind. 3 Buchstaben enthalten"},{fn:function(){return r.match(/.+@.+\..+/)},message:"Es wurde keine g\xfcltige E-Mail-Adresse angegeben"},{fn:function(){return w.value.length>6},message:"Ihres Passwort muss mind. 6 Zeichen enthalten"},{fn:function(){return w.confirmPwd===w.value},message:"Ihre Passw\xf6rter sind nicht identisch"}];return Object(m.jsxs)(l.a,{className:"col-10",children:[Object(m.jsx)("h3",{children:"Registrieren"}),Object(m.jsx)("br",{}),Object(m.jsxs)(me.a,{children:[Object(m.jsxs)(q.a,{children:[Object(m.jsx)(q.a.Prepend,{className:"col-4",children:Object(m.jsx)(q.a.Text,{children:"E-Mail"})}),Object(m.jsx)(u.a,{value:r,type:"e-mail",onChange:function(e){return c(e.target.value)},isValid:r.match(/.+@.+\..+/)})]}),Object(m.jsx)("br",{}),Object(m.jsxs)(q.a,{children:[Object(m.jsx)(q.a.Prepend,{className:"col-4",children:Object(m.jsx)(q.a.Text,{children:"Vorname"})}),Object(m.jsx)(u.a,{value:h,onChange:function(e){return d(e.target.value)}})]}),Object(m.jsx)("br",{}),Object(m.jsx)("label",{htmlFor:"lastname",children:"Nachname"}),Object(m.jsx)(u.a,{value:g,id:"lastname",onChange:function(e){return x(e.target.value)}}),Object(m.jsx)("br",{}),Object(m.jsx)("label",{htmlFor:"password",children:"Passwort"}),Object(m.jsx)(u.a,{value:w.value,onChange:function(e){return k(Object(de.a)(Object(de.a)({},w),{},{value:e.target.value}))},type:"password",id:"password"}),Object(m.jsx)("br",{}),Object(m.jsx)("label",{htmlFor:"password",children:"Passwort best\xe4tigen"}),Object(m.jsx)(u.a,{value:w.confirmPwd,type:"password",id:"confirmPassword",onChange:function(e){return k(Object(de.a)(Object(de.a)({},w),{},{confirmPwd:e.target.value}))}}),Object(m.jsx)("br",{}),Object(m.jsx)("br",{}),Object(m.jsx)(j.a,{className:"col-4",onClick:function(){var t=D.filter((function(e){return!e.fn()})),n=new ge;t.length?t.forEach((function(e){return alert(e.message)})):b.a.auth().createUserWithEmailAndPassword(r,w.value).then((function(){n.create(r,h,g),localStorage.setItem("email",r),e.history.push("schnellmenu")})).catch((function(e){return alert("Es ist ein Fehler aufgetreten: "+e)}))},children:"Registrieren"})]})]})}var ve=n(824);function pe(e){return Object(a.useEffect)((function(){return b.a.auth().onAuthStateChanged((function(t){e.history.push(t?"schnellmenu":"anmelden")})),function(){Object(he.a)()}})),Object(m.jsx)("div",{children:Object(m.jsx)(ve.a,{animation:"border",variant:"secondary"})})}var we=function(){return Object(m.jsx)("div",{className:"App",children:Object(m.jsxs)(i.c,{children:[Object(m.jsx)(i.a,{exact:!0,path:"/",component:pe}),Object(m.jsx)(i.a,{path:"/anmelden",component:O}),Object(m.jsx)(i.a,{path:"/registrieren",component:xe}),Object(m.jsx)(i.a,{path:"/statistiken",children:Object(m.jsx)(be,{component:Object(m.jsx)(P,{})})}),Object(m.jsx)(i.a,{path:"/schnellmenu",children:Object(m.jsx)(be,{component:Object(m.jsx)(L,{})})}),Object(m.jsx)(i.a,{path:"/t\xe4tigkeit/erstellen",children:Object(m.jsx)(be,{component:Object(m.jsx)(ne,{})})}),Object(m.jsx)(i.a,{path:"/t\xe4tigkeit/erfassen",children:Object(m.jsx)(be,{component:Object(m.jsx)(le,{})})}),Object(m.jsx)(i.a,{path:"/",children:"404"})]})})},ke=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,831)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};n(814),n(812);s.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(d.a,{children:Object(m.jsx)(we,{})})}),document.getElementById("root")),ke()}},[[813,1,2]]]);
//# sourceMappingURL=main.1345c224.chunk.js.map