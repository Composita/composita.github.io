(this["webpackJsonpcomposita.github.io"]=this["webpackJsonpcomposita.github.io"]||[]).push([[0],{20:function(e,t,n){e.exports=n(31)},25:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var o=n(7),a=n.n(o),r=n(16),c=n.n(r),u=(n(25),n(1)),s=n.n(u),i=n(5),l=n(0),d=n(2),m=n(3),h=n(4),p=n(17),v=n(19),E=(n(29),n(30),function(e){Object(m.a)(n,e);var t=Object(h.a)(n);function n(e){var o;return Object(l.a)(this,n),(o=t.call(this,e)).output="",o.system=new v.a((function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.forEach((function(e){console.log(e),o.output=o.output+e}))})),o.runCode=Object(i.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o.output="",e.next=3,o.system.run("",o.state.code);case 3:o.setState({runCode:!0});case 4:case"end":return e.stop()}}),e)}))),o.state={runCode:!1,code:'COMPONENT HelloWorld;\n  BEGIN\n    WRITE("Hello World"); WRITELINE;\nEND HelloWorld;'},o}return Object(d.a)(n,[{key:"render",value:function(){var e=this;return a.a.createElement("div",null,a.a.createElement("div",null,a.a.createElement("h1",null,"Composita Language Playground")),a.a.createElement(p.UnControlled,{value:this.state.code,options:{mode:"javascript",lineNumbers:!0},onChange:function(t,n,o){var a=t.getCursor();e.setState({runCode:!0,code:o}),t.setCursor(a.line,a.ch)}}),a.a.createElement("button",{onClick:this.runCode},"run code"),a.a.createElement("div",{className:"Output"},a.a.createElement("pre",null,this.state.runCode&&this.output)))}}]),n}(o.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[20,1,2]]]);
//# sourceMappingURL=main.421d4ea0.chunk.js.map