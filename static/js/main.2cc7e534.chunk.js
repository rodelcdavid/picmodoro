(this.webpackJsonppicmodoro=this.webpackJsonppicmodoro||[]).push([[0],{87:function(A,e,t){"use strict";t.r(e);var n,a=t(0),c=t.n(a),o=t(26),r=t.n(o),i=t(11),l=t(15),s=t(123),j=t(124),b=t(127),d=t(20),u=t(29),m=u.default.div(n||(n=Object(d.a)(["\n  /* background-color: rgba(255, 255, 255, 0.8); */\n  background-color: ",";\n  /* border: solid 1px black; */\n\n  border: ",";\n  /* transition: border 500ms; */\n"])),(function(A){return A.reveal?"none":"rgba(255, 255, 255, 1)"}),(function(A){return A.isDone?"none":"solid 1px black"})),g=t(2);function O(A){for(var e,t,n=A.numPomodoro,c=A.reveal,o=A.isDone,r=A.goalImg,i=Object(a.useCallback)((function(){for(var A=[],e=1;e<=n;e++)A.push(Object(g.jsx)(m,{index:e,reveal:c[e-1],isDone:o},e));return A}),[n,c,o]),l=350,s=10;s>1;s--){if(4===n){e=2,t=2;break}if(n%s===0&&n>=3*s){e=n/s,t=s;break}e=n,t=1}var j=l/e;l/e%10!==0&&(console.log(l/e%10),j+=.04);var b=300/t;return Object(g.jsx)("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"},children:Object(g.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat( ".concat(e,", ").concat(j,"px"),gridTemplateRows:"repeat( ".concat(t,", ").concat(b,"px )"),width:l,height:300,background:"url(".concat(r,")"),backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center",border:"solid 1px black",boxShadow:"0 10px 20px grey",overflow:"hidden",boxSizing:"content-box"},children:Object(g.jsx)(i,{})})})}var x=t(118),f=t(119),v=t(126);function p(A){var e=A.numPomodoro,t=A.setNumPomodoro,n=A.reveal,a=A.isDone,c=A.setIsDone,o=A.isActive,r=A.setReveal;return Object(g.jsxs)("div",{children:[Object(g.jsx)("h3",{children:"How many Pomodoro sessions?"}),Object(g.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[Object(g.jsx)(v.a,{color:"primary",disabled:!(!a&&1!==e&&!o),onClick:function(){if(1!==e){var A=e-1;t(A);var a=Object(l.a)(n);console.log("lastindex",a.lastIndexOf(!1)),!0===a[a.length-1]?a.splice(a.lastIndexOf(!1),1):a.pop(),console.log("tempReveal on splice",a),r(a),console.log("reveal on minus",n);var o=a.filter((function(A){return!0===A})).length;console.log("plusreveal",o,A),c(o>=A)}},children:Object(g.jsx)(x.a,{})}),Object(g.jsx)("p",{style:{margin:"0 5px"},children:e}),Object(g.jsx)(v.a,{color:"primary",disabled:!!o,onClick:function(){var A=e+1;t(A);var a=Object(l.a)(n);a.push(!1),r(a);var o=a.filter((function(A){return!0===A})).length;console.log("plusreveal",o,A),c(o>=A)},children:Object(g.jsx)(f.a,{})})]})]})}var h=function(A){var e=A.onReveal,t=A.isActive,n=A.setIsActive,c=A.isDone,o=Object(a.useState)(25),r=Object(i.a)(o,2),l=r[0],s=r[1],j=Object(a.useState)(l),d=Object(i.a)(j,2),u=d[0],m=d[1],O=Object(a.useState)(0),p=Object(i.a)(O,2),h=p[0],E=p[1],S=Object(a.useState)(!1),y=Object(i.a)(S,2),D=y[0],B=y[1];Object(a.useEffect)((function(){m(l)}),[l]),Object(a.useEffect)((function(){var A=null;return t?A=setInterval((function(){0===h?0!==u?(E(59),m(u-1)):(n(!1),B(!0),e()):E(h-1)}),10):clearInterval(A),function(){clearInterval(A)}}),[h,u,t]);var w=u<10?"0".concat(u):u,I=h<10?"0".concat(h):h;return Object(g.jsxs)("div",{children:[Object(g.jsx)("h3",{children:"How many minutes?"}),Object(g.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[Object(g.jsx)(v.a,{color:"primary",onClick:function(){s(l-5)},disabled:!(25!==l&&!t&&!D),children:Object(g.jsx)(x.a,{})}),Object(g.jsxs)("div",{className:"timer",children:[w,":",I]}),Object(g.jsx)(v.a,{color:"primary",onClick:function(){s(l+5)},disabled:!(!t&&!D),children:Object(g.jsx)(f.a,{})})]}),D&&Object(g.jsx)(b.a,{style:{display:"block",margin:"0 auto"},onClick:function(){m(l),E(0),B(!1)},variant:"contained",color:"warning",children:"Reset Timer"}),t?Object(g.jsx)(b.a,{onClick:function(){m(l),E(0),n(!1)},variant:"contained",color:"error",children:"Discard session"}):Object(g.jsx)(b.a,{style:{display:c||D?"none":"block",margin:"0 auto"},onClick:function(){return n(!0)},variant:"contained",color:"primary",children:"Start timer"})]})};var E,S,y=function(A){var e=A.goalImg,t=A.goalName,n=A.defaultImg,c=A.setGoalImg,o=A.setGoalName,r=A.setScreenState,d=Object(a.useState)(1),u=Object(i.a)(d,2),m=u[0],x=u[1],f=Object(a.useState)(Array(m).fill(!1)),v=Object(i.a)(f,2),E=v[0],S=v[1],y=Object(a.useState)(!1),D=Object(i.a)(y,2),B=D[0],w=D[1],I=Object(a.useState)(!1),Y=Object(i.a)(I,2),R=Y[0],M=Y[1],Q=Object(a.useState)(!1),z=Object(i.a)(Q,2),C=z[0],N=z[1];return Object(a.useEffect)((function(){console.log("reveal",E),Object(l.a)(E).filter((function(A){return!0===A})).length===m&&w(!0)}),[E]),Object(g.jsxs)("div",{style:{textAlign:"center"},children:[Object(g.jsx)("h1",{children:t}),Object(g.jsxs)("h2",{children:["Progress: ",function(){var A=Object(l.a)(E);return[A.filter((function(A){return!0===A})).length,A]}(),"/",m]}),Object(g.jsx)(O,{numPomodoro:m,reveal:E,isDone:B,goalImg:e}),Object(g.jsx)(s.a,{control:Object(g.jsx)(j.a,{checked:C,onChange:function(A){N(A.target.checked)}}),label:"Random Reveal"}),Object(g.jsx)(p,{numPomodoro:m,setNumPomodoro:x,isDone:B,setIsDone:w,reveal:E,isActive:R,setReveal:S}),Object(g.jsx)(h,{onReveal:function(){var A=Object(l.a)(E);if(C){var e=A.reduce((function(A,e,t){return!1===e&&A.push(t),A}),[]);A[e[Math.floor(Math.random()*e.length)]]=!0}else null!=A.indexOf(!1)&&(A[A.indexOf(!1)]=!0);S(A)},isActive:R,setIsActive:M,isDone:B}),Object(g.jsx)(b.a,{onClick:function(){r(0),c(n),o("")},variant:"contained",color:"success",children:"New Goal"})]})},D=t(121),B=u.default.div(E||(E=Object(d.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"]))),w=u.default.div(S||(S=Object(d.a)(["\n  width: 400px;\n"])));function I(A){var e=A.goalImg,t=A.goalName,n=A.imageHandler,a=A.nameHandler,c=A.onSubmit,o=A.textRef;return Object(g.jsx)("div",{className:"page",children:Object(g.jsxs)(B,{children:[Object(g.jsxs)("h1",{style:{marginBottom:"5px"},children:[Object(g.jsx)("span",{style:{color:"#00ADB5"},children:"Step 1: "}),"What is your goal?"]}),Object(g.jsx)(D.a,{inputRef:o,id:"outlined-name",label:"Enter goal name",value:t,onChange:a,style:{width:"500px",marginBottom:"5px"}}),Object(g.jsxs)("h1",{style:{marginBottom:"5px"},children:[Object(g.jsx)("span",{style:{color:"#00ADB5"},children:"Step 2: "}),"Upload an image for your goal"]}),Object(g.jsxs)(w,{children:[console.log(e),Object(g.jsx)("img",{src:e,width:"100%",alt:"",id:"img",className:"img"})]}),Object(g.jsx)("input",{style:{cursor:"pointer",fontSize:"1rem",border:"solid 2px black",padding:"10px",borderRadius:"5px",borderWidth:"1px",marginRight:"5px"},type:"file",accept:"image/*",name:"image-upload",id:"input",onChange:n}),Object(g.jsx)("p",{style:{color:"red"},children:"Max file size: 5MB"}),Object(g.jsxs)("h1",{children:[Object(g.jsx)("span",{style:{color:"#00ADB5"},children:"Step 3: "}),"Submit and start!"]}),Object(g.jsx)(b.a,{onClick:c,variant:"contained",children:"Submit"})]})})}var Y,R=function(){var A="data:image/jpeg;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2Q==",e=Object(a.useState)(A),t=Object(i.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),r=Object(i.a)(o,2),l=r[0],s=r[1],j=Object(a.useState)(0),b=Object(i.a)(j,2),d=b[0],u=b[1];Object(a.useEffect)((function(){var e=JSON.parse(localStorage.getItem("imgFile"))||A,t=JSON.parse(localStorage.getItem("screenState"))||0,n=JSON.parse(localStorage.getItem("goalName")||"");s(n),c(e),u(t)}),[A]),Object(a.useEffect)((function(){localStorage.imgFile=JSON.stringify(n),localStorage.screenState=JSON.stringify(d),localStorage.goalName=JSON.stringify(l)}),[n,l,d]);var m=Object(a.useRef)();return 0===d?Object(g.jsx)(I,{goalImg:n,goalName:l,imageHandler:function(A){var e=A.target.files[0],t=new FileReader;t.onload=function(){if(console.log("hello",e.size),!(e.size>5e6))return 2!==t.readyState?Object(g.jsx)("h1",{children:"Loading"}):void c(t.result);alert("File size limit reached")},e&&e.type.match("image.*")?t.readAsDataURL(e):alert("Please choose a valid image file")},nameHandler:function(A){s(A.target.value)},setScreenState:u,onSubmit:function(){n===A?alert("Please choose an image first"):l?u(1):(alert("Please enter name for your goal"),m.current.focus())},textRef:m}):Object(g.jsx)(y,{goalImg:n,goalName:l,defaultImg:A,setGoalImg:c,setGoalName:s,setScreenState:u})},M=(0,t(29).createGlobalStyle)(Y||(Y=Object(d.a)(["\n*{\n    margin: 0;\n    padding:0;\n    box-sizing: border-box;\n}\nbody{\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n}\n"]))),Q=function(A){A&&A instanceof Function&&t.e(3).then(t.bind(null,128)).then((function(e){var t=e.getCLS,n=e.getFID,a=e.getFCP,c=e.getLCP,o=e.getTTFB;t(A),n(A),a(A),c(A),o(A)}))};r.a.render(Object(g.jsxs)(c.a.StrictMode,{children:[Object(g.jsx)(M,{}),Object(g.jsx)(R,{})]}),document.getElementById("root")),Q()}},[[87,1,2]]]);
//# sourceMappingURL=main.2cc7e534.chunk.js.map