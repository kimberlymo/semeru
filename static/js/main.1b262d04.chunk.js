(this["webpackJsonpsemeru-time-boxing"]=this["webpackJsonpsemeru-time-boxing"]||[]).push([[0],{337:function(e,t,n){},338:function(e,t,n){},824:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(17),s=n.n(c),i=(n(337),n(338),n(25)),l=n(10),o=n(831),j=n(323),u=n(324),h=n(38),b=h.a.initializeApp({apiKey:"AIzaSyB-FtRRuqWMdiV5iDHiZKfxDNQI5o64qAI",authDomain:"semeru-52985.firebaseapp.com",projectId:"semeru-52985",storageBucket:"semeru-52985.appspot.com",messagingSenderId:"1090112397950",appId:"1:1090112397950:web:5c5937829ee10694802e2f",measurementId:"G-FPBQ133JL7"}),d=n(2);function m(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),s=Object(l.a)(c,2),i=s[0],h=s[1],m=[{fn:function(){return i.match(/.+@.+\..+/)},message:"Es wurde keine g\xfcltige E-Mail-Adresse angegeben"},{fn:function(){return n.length>6},message:"Ihres Passwort muss mindestens 6 Zeichen enthalten"}];return Object(d.jsxs)(o.a,{children:[Object(d.jsx)("br",{}),Object(d.jsx)("h2",{children:"Anmeldung"}),Object(d.jsx)("br",{}),Object(d.jsx)("label",{htmlFor:"email",children:"E-Mail Adresse: "}),Object(d.jsx)(j.a,{value:i,onChange:function(e){return h(e.target.value)},id:"email"}),Object(d.jsx)("br",{}),Object(d.jsx)("label",{htmlFor:"password",children:"Passwort: "}),Object(d.jsx)(j.a,{value:n,onChange:function(e){return r(e.target.value)},type:"password",id:"password"}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsx)(u.a,{className:"col-8",onClick:function(e){var t=m.filter((function(e){return!e.fn()}));t.length?t.forEach((function(e){return alert(e.message)})):b.auth().signInWithEmailAndPassword(i,n).then((function(){localStorage.set("email",i),e.history.push("schnellmenu")})).catch((function(){return alert("Ihre E-Mail Adresse stimmt nicht \xfcberein mit dem Passwort.")}))},variant:"secondary",children:"Anmelden"}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsx)("a",{href:"/registrieren",children:"Kein Konto? Melden Sie sich hier an!"})]})}var f=n(832),O=n(833),x=n(22),g=n(23),v={today:"Heute",thisWeek:"Diese Woche",thisMonth:"Dieser Monat"},p=n(325),w=n(27),k=function(){function e(){Object(x.a)(this,e)}return Object(g.a)(e,[{key:"calculateDifferenceDates",value:function(e,t){var n=Math.floor((e-t)%864e5/36e5),a=Math.floor((e-t)%864e5%36e5/6e4);return(n<10?"0":"")+n+":"+(a<10?"0":"")+a}},{key:"getDateFromHours",value:function(e){e=e.split(":");var t=new Date;return Object(p.a)(Date,[t.getFullYear(),t.getMonth(),t.getDate()].concat(Object(w.a)(e)))}},{key:"subtractTimeInHours",value:function(e,t){return((e=this.getDateFromHours(e))-(t=this.getDateFromHours(t)))%864e5/36e5}},{key:"showTask",value:function(e){return e.name+" "+e.plannedFrom+"-"+e.plannedTill}},{key:"formatDate",value:function(e){return(e.getHours()<10?"0":"")+e.getHours()+":"+(e.getMinutes()<10?"0":"")+e.getMinutes()}}]),e}(),D=h.a.firestore(),S="tasks",F=new k,I=function(){function e(){Object(x.a)(this,e)}return Object(g.a)(e,[{key:"create",value:function(e,t,n,a,r){D.collection(S).doc().set({name:e,plannedFrom:t,plannedTill:n,editTime:[],pause:[],priority:a,user:r}).catch((function(e){return alert("Ein Fehler ist aufgetreten: "+e)}))}},{key:"getFromUser",value:function(e){var t=[];return e.forEach((function(e){e.data().user===localStorage.getItem("email")&&t.push(e.data())})),t}},{key:"getDocIdsFromUser",value:function(e){var t=[];return e.docs.forEach((function(e){e.data().user===localStorage.getItem("email")&&t.push(e.id)})),t}},{key:"updateTask",value:function(e,t,n,a){D.collection(S).doc(e).update({name:t.name,plannedFrom:t.plannedFrom,plannedTill:t.plannedTill,editTime:n,pause:a,priority:t.priority,user:t.user}).catch((function(e){return alert("Ein Fehler ist aufgetreten: "+e)}))}},{key:"deleteATask",value:function(e){D.collection(S).doc(e).delete().then((function(){return alert("Ihr Eintrag wurde erfolgreich gel\xf6scht.")}))}},{key:"getStatsFromTask",value:function(e,t){var n=this.getFromUser(e),a=[];return n.forEach((function(e,r){var c=-1,s=0,i=F.subtractTimeInHours(e.plannedTill,e.plannedFrom),l=0;e.editTime.forEach((function(e){var n=new Date(e.from.toMillis()),a=new Date(e.till.toMillis());T(t,a,n)&&(c=r,s+=(a-n)%864e5/36e5)})),e.pause.forEach((function(e){var n=new Date(e.from.toMillis()),a=new Date(e.till.toMillis());T(t,a,n)&&(l+=(a-n)%864e5/36e5)})),c===r&&a.push({name:n[r].name,worked:s,planned:i,pause:l})})),a}}]),e}();function T(e,t,n){var a=(new Date).toDateString(),r=new Date((new Date).setDate((new Date).getDate()-(new Date).getDay()+1)).toDateString();switch(e){case v.today:return n.toDateString()===a||t.toDateString()===a;case v.thisWeek:return n.toDateString()>=r||n.toDateString()<=a;case v.thisMonth:return n.getMonth()===(new Date).getMonth()||t.getMonth()===(new Date).getMonth();default:return!1}}var y=h.a.firestore(),M=new I;function N(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(v.today),s=Object(l.a)(c,2),i=s[0],j=s[1];return Object(a.useEffect)((function(){y.collection("tasks").get().then((function(e){r(M.getStatsFromTask(e,i)),console.log(M.getStatsFromTask(e,i))}))}),[i]),Object(d.jsxs)(o.a,{className:"col-12 col-lg-8",children:[Object(d.jsx)("h3",{children:"Ihre Statistiken"}),Object(d.jsx)("br",{}),Object(d.jsx)(f.a,{className:"me-2",children:[v.today,v.thisWeek,v.thisMonth].map((function(e,t){return Object(d.jsx)(u.a,{onClick:function(){return j(e)},variant:"outline-secondary",active:e===i,children:e},"stats-"+t)}))}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsxs)(O.a,{responsive:!0,variant:"light",children:[Object(d.jsx)("thead",{children:Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{children:"T\xe4tigkeit"}),Object(d.jsx)("th",{children:"Arbeitszeit"}),Object(d.jsx)("th",{children:"Pause"})]})}),Object(d.jsx)("tbody",{children:n.map((function(e,t){return Object(d.jsxs)("tr",{children:[Object(d.jsx)("td",{children:e.name}),Object(d.jsx)("td",{children:E(e.worked)}),Object(d.jsx)("td",{children:E(e.pause)})]},"statistics-"+t)}))})]})]})}function E(e){var t=Math.floor(e),n=60*(e-t);return t+" h "+Math.round(n)+" min"}function B(e){var t=e.stopwatch,n=Object(a.useState)(0),r=Object(l.a)(n,2),c=r[0],s=r[1];return t.onTime((function(e){return s(e.ms)})),Object(d.jsx)("div",{children:Object(d.jsx)("h5",{children:P(c)})})}function P(e){var t=Math.floor(e/36e5%24),n=Math.floor(e/6e4%60),a=Math.floor(e/1e3%60);return(t=(t<10?"0":"")+t)+":"+(n=(n<10?"0":"")+n)+":"+(a=(a<10?"0":"")+a)}var C=n(841);function A(e){var t=e.timer,n=e.startValue,r=Object(a.useState)(),c=Object(l.a)(r,2),s=c[0],i=c[1];return t.onTime((function(e){return i(n-e.ms)})),Object(d.jsx)("div",{children:Object(d.jsx)(C.a,{variant:"warning",children:Object(d.jsx)("h4",{children:0===s?"Ihre eingeplante Zeit ist vorbei ":H(s)})})})}function H(e){var t=Math.floor(e/36e5%24),n=Math.floor(e/6e4%60),a=Math.floor(e/1e3%60);return t=(t<10?"0":"")+t,n=(n<10?"0":"")+n,a=(a<10?"0":"")+a,isNaN(t)||isNaN(n)||isNaN(a)?"00:00:00":t+":"+n+":"+a}var V=n(233),Z=new V,U=new V,z=h.a.firestore(),W=new I,L=new k;function K(){var e=Object(a.useState)({values:[],docIds:[]}),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(-1),s=Object(l.a)(c,2),i=s[0],o=s[1],j=Object(a.useState)({from:new Date,till:new Date}),h=Object(l.a)(j,2),b=h[0],m=h[1],f=Object(a.useState)(!1),O=Object(l.a)(f,2),x=O[0],g=O[1];function v(e){o(e),g(!x),m({from:b.from,till:new Date}),Z.start(),U.start(),e===i&&o(-1),x&&(m({from:new Date,till:new Date}),window.location.reload()),function(e){var t=[b],a=n.values[e];a.editTime.length>0&&(t=[].concat(Object(w.a)(a.editTime),[b]));W.updateTask(n.docIds[e],a,t,a.pause)}(e)}return Object(a.useEffect)((function(){z.collection("tasks").get().then((function(e){r({docIds:W.getDocIdsFromUser(e),values:W.getFromUser(e)})}))}),[]),Object(d.jsxs)("div",{children:[Object(d.jsx)("h3",{children:"Schnell Menu"}),Object(d.jsx)("h4",{children:i<0?"":n.values[i].name}),Object(d.jsx)("br",{}),Object(d.jsx)("h6",{children:"berechnete Zeit: "}),Object(d.jsx)(B,{stopwatch:Z}),Object(d.jsx)("br",{}),Object(d.jsx)("h6",{children:"verf\xfcgbare Zeit:"}),Object(d.jsx)(A,{startValue:i<0?0:L.getDateFromHours(n.values[i].plannedTill)-L.getDateFromHours(n.values[i].plannedFrom),timer:U}),Object(d.jsx)("br",{}),Object(d.jsx)("hr",{}),n.values.map((function(e,t){return Object(d.jsxs)("div",{children:[Object(d.jsx)(u.a,{onClick:function(){return v(t)},className:"col-8",active:t===i,variant:"outline-secondary",children:L.showTask(e)}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{})]},"tasks"+t)}))]})}var R=n(834),J=n(835),q=n(836),Q=n(333),G=n(228),Y=n.n(G),X=(n(519),{high:"hoch",normal:"normal",low:"tief"}),$=new k,_=new I;function ee(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(""),s=Object(l.a)(c,2),i=s[0],h=s[1],b=Object(a.useState)(""),m=Object(l.a)(b,2),f=m[0],O=m[1],x=Object(a.useState)(""),g=Object(l.a)(x,2),v=g[0],p=g[1],w=[{fn:function(){return n.length<31},message:"Die T\xe4tigkeit muss max. 30 Buchstaben enthalten"},{fn:function(){return Boolean(i)},message:"Sie m\xfcssen eine Priorit\xe4t setzen"},{fn:function(){return Boolean(f)},message:"Sie m\xfcssen eine Startzeit setzen"},{fn:function(){return Boolean(v)},message:"Sie m\xfcssen eine Endzeit setzen"},{fn:function(){return n.length>2},message:"Die T\xe4tigkeit muss mind. 3 Buchstaben enthalten"}];return Object(d.jsxs)(o.a,{className:"col-10 col-lg-8",children:[Object(d.jsx)("h3",{children:"T\xe4tigkeit erfassen"}),Object(d.jsx)("br",{}),Object(d.jsxs)(R.a,{children:[Object(d.jsx)(R.a.Prepend,{className:"col-4 col-lg-3",children:Object(d.jsx)(R.a.Text,{children:"T\xe4tigkeit"})}),Object(d.jsx)(j.a,{value:n,onChange:function(e){return r(e.target.value)},id:"name"})]}),Object(d.jsx)("br",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("h5",{children:Boolean(f)&&Boolean(v)?"dauer: "+$.calculateDifferenceDates($.getDateFromHours(v),$.getDateFromHours(f)):""}),Object(d.jsxs)(C.a,{variant:"warning",children:[Object(d.jsx)("label",{children:"Von: "}),Object(d.jsx)(Y.a,{colorPalette:"dark",onTimeChange:function(e){return O(e.hour+":"+e.minute)},time:f,phrases:{confirm:"Sind Sie sicher?",cancel:"abbrechen?",close:"schliessen"}}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsx)("label",{children:"Bis: "}),Object(d.jsx)(Y.a,{colorPalette:"dark",onTimeChange:function(e){return p(e.hour+":"+e.minute)},time:v,pharese:{confirm:"Sind Sie sicher?",cancel:"abbrechen?",close:"schliessen"}})]}),Object(d.jsx)("hr",{}),Object(d.jsx)("br",{}),Object(d.jsxs)(J.a,{children:[Object(d.jsx)("label",{className:"col-4 col-lg-3 offset-lg-2",children:"Priorit\xe4t: "}),Object(d.jsxs)(q.a,{id:"dropdown-basic-button",className:"col-3",variant:"light",title:Boolean(i)?i:"Bitte etwas ausw\xe4hlen",children:[Object(d.jsx)(Q.a.Item,{onSelect:function(){return h(X.high)},children:"hoch"}),Object(d.jsx)(Q.a.Item,{onSelect:function(){return h(X.normal)},children:"normal"}),Object(d.jsx)(Q.a.Item,{onSelect:function(){return h(X.low)},children:"niedrig"})]})]}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsx)(u.a,{onClick:function(){var e=w.filter((function(e){return!e.fn()}));e.length?e.forEach((function(e){return alert(e.message)})):(_.create(n,f,v,i,localStorage.getItem("email")),r(""),O(""),p(""),h(""))},className:"col-5",variant:"secondary",children:"speichern"})]})}var te=n(233),ne=new te,ae=new te,re=h.a.firestore(),ce=new I,se=new k;function ie(){var e=Object(a.useState)({value:[],docIds:[]}),t=Object(l.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(-1),s=Object(l.a)(c,2),i=s[0],j=s[1],h=Object(a.useState)({from:new Date,till:new Date}),b=Object(l.a)(h,2),m=b[0],f=b[1],O=Object(a.useState)({from:new Date,till:new Date}),x=Object(l.a)(O,2),g=x[0],v=x[1],p=Object(a.useState)(!1),k=Object(l.a)(p,2),D=k[0],S=k[1],F=Object(a.useState)(!1),I=Object(l.a)(F,2),T=I[0],y=I[1];function M(){var e=[m],t=[g];n.value[i].editTime.length>0&&(e=[].concat(Object(w.a)(n.value[i].editTime),[m])),n.value[i].pause.length>0&&(t=[].concat(Object(w.a)(n.value[i].pause),[g])),ce.updateTask(n.docIds[i],n.value[i],e,t)}return Object(a.useEffect)((function(){re.collection("tasks").get().then((function(e){r({docIds:ce.getDocIdsFromUser(e),value:ce.getFromUser(e)})}))}),[]),Object(d.jsxs)(o.a,{className:"col-11 col-lg-8",children:[Object(d.jsx)("h3",{children:"Zeiten erfassen"}),Object(d.jsx)("br",{}),Object(d.jsx)("h5",{children:i<0?" ":n.value[i].name}),Object(d.jsx)("br",{}),Object(d.jsx)("hr",{}),Object(d.jsx)("h6",{children:"Vorhandene Zeit: "}),Object(d.jsx)(A,{startValue:i<0?0:se.getDateFromHours(n.value[i].plannedTill)-se.getDateFromHours(n.value[i].plannedFrom),timer:ae}),Object(d.jsx)("br",{}),Object(d.jsx)(u.a,{onClick:function(){y(!T),f({from:m.from,till:new Date}),T?(ne.stop(),ne.reset(),ae.stop(),ae.reset()):(ne.start(),ae.start(),f({from:new Date,till:new Date})),M()},variant:"light",disabled:i<0||g.isActive,children:T?"Stopp":"Start"}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsx)("hr",{}),Object(d.jsx)(q.a,{title:i>=0?se.showTask(n.value[i]):"Bitte etwas ausw\xe4hlen",variant:"warning",children:n.value.map((function(e,t){return Object(d.jsx)(Q.a.Item,{onSelect:function(){return function(e){ne.reset(),ae.reset(),y(!1),j(e),f({from:new Date,till:new Date}),v({from:new Date,till:new Date})}(t)},children:se.showTask(e)},"tasks"+t)}))}),Object(d.jsx)("br",{}),Object(d.jsx)("h6",{children:"angefangen: "+(T?se.formatDate(m.from):"nicht definiert.")}),Object(d.jsx)("p",{children:"berechnete Zeit:"}),Object(d.jsx)(B,{stopwatch:ne}),Object(d.jsx)("br",{}),Object(d.jsx)(u.a,{className:"col-6",disabled:i<0,onClick:function(){S(!D),ne.start(),ae.start(),v({from:g.from,till:new Date}),D||(v({from:new Date,till:new Date}),ne.stop(),ae.stop()),M()},variant:"light",children:D?"weiter":"pausieren"}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{})]})}var le=n(840),oe=n(839);function je(e){var t=e.component;return Object(d.jsxs)(o.a,{children:[Object(d.jsx)(le.a,{bg:"dark",expand:"lg",variant:"dark",children:Object(d.jsxs)(o.a,{children:[Object(d.jsx)(le.a.Brand,{href:"/schnellmenu",children:"Semeru"}),Object(d.jsx)(le.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(d.jsx)(le.a.Collapse,{id:"basic-navbar-nav",children:Object(d.jsxs)(oe.a,{className:"me-auto",children:[Object(d.jsx)(oe.a.Link,{href:"/statistiken",children:"Statistiken"}),Object(d.jsx)(oe.a.Link,{href:"/t\xe4tigkeit/erfassen",children:"Zeiten erfassen"}),Object(d.jsx)(oe.a.Link,{href:"/t\xe4tigkeit/erstellen",children:"T\xe4tigkeit erfassen"})]})})]})}),Object(d.jsx)("br",{}),t]})}var ue=n(329),he=n(4),be=n(838),de=h.a.firestore(),me="user",fe=function(){function e(){Object(x.a)(this,e)}return Object(g.a)(e,[{key:"create",value:function(e,t,n){de.collection(me).doc(e).set({firstname:t,lastname:n}).catch((function(e){return alert("Es ist ein Fehler aufgetreten: "+e)}))}},{key:"getAUser",value:function(e){de.collection(me).get().then((function(t){t.forEach((function(t){if(t.id===e)return t.data()}))}))}}]),e}();function Oe(e){var t=Object(a.useState)(""),n=Object(l.a)(t,2),r=n[0],c=n[1],s=Object(a.useState)(""),i=Object(l.a)(s,2),b=i[0],m=i[1],f=Object(a.useState)(""),O=Object(l.a)(f,2),x=O[0],g=O[1],v=Object(a.useState)({value:"",confirmPwd:""}),p=Object(l.a)(v,2),w=p[0],k=p[1],D=[{fn:function(){return b.length<31},message:"Ihr Vorname muss max. 30 Buchstaben enthalten"},{fn:function(){return b.length>2},message:"Ihr Vorname muss mind. 3 Buchstaben enthalten"},{fn:function(){return b.match(/\w+/)},message:"Ihr Vorname muss Buchstaben enthalten"},{fn:function(){return x.length<31},message:"Ihr Nachname muss max. 30 Buchstaben enthalten"},{fn:function(){return x.match(/\w+/)},message:"Ihr Nachname kann nur Buchstaben enthalten"},{fn:function(){return x.length>2},message:"Ihr Nachname muss mind. 3 Buchstaben enthalten"},{fn:function(){return r.match(/.+@.+\..+/)},message:"Es wurde keine g\xfcltige E-Mail-Adresse angegeben"},{fn:function(){return w.value.length>6},message:"Ihres Passwort muss mind. 6 Zeichen enthalten"},{fn:function(){return w.confirmPwd===w.value},message:"Ihre Passw\xf6rter sind nicht identisch"}];return Object(d.jsxs)(o.a,{className:"col-10",children:[Object(d.jsx)("br",{}),Object(d.jsx)("h3",{children:"Registrierung"}),Object(d.jsx)("br",{}),Object(d.jsxs)(be.a,{children:[Object(d.jsxs)("div",{className:"form-floating mb-3",children:[Object(d.jsx)(j.a,{type:"email",id:"email",placeholder:"name@example.com",value:r,onChange:function(e){return c(e.target.value)}}),Object(d.jsx)("label",{htmlFor:"email",children:"Email-Adresse"})]}),Object(d.jsx)("br",{}),Object(d.jsxs)("div",{className:"form-floating col-md col-8",children:[Object(d.jsx)(j.a,{type:"text",id:"firstname",placeholder:"name@example.com",value:b,onChange:function(e){return m(e.target.value)}}),Object(d.jsx)("label",{htmlFor:"firstname",children:"Vorname"})]}),Object(d.jsx)("br",{}),Object(d.jsxs)("div",{className:"form-floating col-md col-8",children:[Object(d.jsx)(j.a,{type:"text",id:"firstname",placeholder:"name@example.com",value:x,onChange:function(e){return g(e.target.value)}}),Object(d.jsx)("label",{htmlFor:"lastname",children:"Nachname"})]}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsxs)("div",{className:"form-floating col-md",children:[Object(d.jsx)(j.a,{type:"password",id:"firstname",placeholder:"name@example.com",value:w.value,onChange:function(e){return k(Object(he.a)(Object(he.a)({},w),{},{value:e.target.value}))}}),Object(d.jsx)("label",{htmlFor:"lastname",children:"Passwort"})]}),Object(d.jsx)("label",{htmlFor:"password",children:"Passwort best\xe4tigen"}),Object(d.jsx)(j.a,{value:w.confirmPwd,type:"password",id:"confirmPassword",onChange:function(e){return k(Object(he.a)(Object(he.a)({},w),{},{confirmPwd:e.target.value}))}}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsx)(u.a,{className:"col-6",onClick:function(){var t=D.filter((function(e){return!e.fn()})),n=new fe;t.length?t.forEach((function(e){return alert(e.message)})):h.a.auth().createUserWithEmailAndPassword(r,w.value).then((function(){n.create(r,b,x),localStorage.setItem("email",r),e.history.push("schnellmenu")})).catch((function(e){return alert("Es ist ein Fehler aufgetreten: "+e)}))},children:"Registrieren"})]})]})}var xe=n(837);function ge(e){return Object(a.useEffect)((function(){return h.a.auth().onAuthStateChanged((function(t){e.history.push(t?"schnellmenu":"anmelden")})),function(){Object(ue.a)()}})),Object(d.jsx)("div",{children:Object(d.jsx)(xe.a,{animation:"border",variant:"secondary"})})}var ve=function(){return Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)(i.c,{children:[Object(d.jsx)(i.a,{exact:!0,path:"/",component:ge}),Object(d.jsx)(i.a,{path:"/anmelden",component:m}),Object(d.jsx)(i.a,{path:"/registrieren",component:Oe}),Object(d.jsx)(i.a,{path:"/statistiken",children:Object(d.jsx)(je,{component:Object(d.jsx)(N,{})})}),Object(d.jsx)(i.a,{path:"/schnellmenu",children:Object(d.jsx)(je,{component:Object(d.jsx)(K,{})})}),Object(d.jsx)(i.a,{path:"/t\xe4tigkeit/erstellen",children:Object(d.jsx)(je,{component:Object(d.jsx)(ee,{})})}),Object(d.jsx)(i.a,{path:"/t\xe4tigkeit/erfassen",children:Object(d.jsx)(je,{component:Object(d.jsx)(ie,{})})})]})})},pe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,842)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))},we=n(226);n(825),n(823);s.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(we.a,{children:Object(d.jsx)(ve,{})})}),document.getElementById("root")),pe()}},[[824,1,2]]]);
//# sourceMappingURL=main.1b262d04.chunk.js.map