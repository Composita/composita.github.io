(this["webpackJsonpcomposita.github.io"]=this["webpackJsonpcomposita.github.io"]||[]).push([[0],{40:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a,r=n(0),o=n(1),c=n.n(o),s=n(24),l=n.n(s),i=n(3),u=n(4),d=n(7),j=n(6),h=n(8),b=n(2),p=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"renderHome",value:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)("p",{children:"This page will be the new home for the Composita language (at least for now)."}),Object(r.jsxs)("p",{children:["Please check out the ",Object(r.jsx)(h.b,{to:"/play",children:"Playground"})," if you want to try it out yourself."]}),Object(r.jsxs)("p",{children:["If you want to check out the implementation itself please visit the ",Object(r.jsx)(h.b,{to:"/dev",children:"Developer"})," ","page for further information."]}),Object(r.jsxs)("p",{children:["If you want to know more about the language and its history checkout ",Object(r.jsx)(h.b,{to:"/about",children:"About"}),"."]})]})}},{key:"render",value:function(){return Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)("h3",{children:"Welcome to the Composita Website"}),this.renderHome()]})}}]),n}(o.Component),m=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"renderAbout",value:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)("p",{children:"Thank you for checking out the Composita language."}),Object(r.jsx)("p",{children:"This site was created as part of my master thesis and is still a work in progress."}),Object(r.jsx)("p",{children:"If you want to know more about the Composita ystem and languge feel free to check out any of the following links:"}),Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{children:Object(r.jsx)("a",{href:"https://concurrency.ch/Research/Composita",children:"HSR Concurrency Lab (Composita)"})}),Object(r.jsx)("li",{children:Object(r.jsx)("a",{href:"http://www.composita.net/",children:"The original Composita website"})}),Object(r.jsx)("li",{children:Object(r.jsx)("a",{href:"https://github.com/Composita/original",children:"Github repository containing code examples and the Composita EBNF"})})]}),Object(r.jsx)("p",{children:"Cheers and have a great day"}),Object(r.jsx)("p",{children:"Hansruedi"})]})}},{key:"render",value:function(){return Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)("h3",{children:"About"}),this.renderAbout()]})}}]),n}(o.Component),O=n(27),f=n(14),v=n.n(f),x=n(19),C=n(26),N=(n(38),n(39),function(){function e(){Object(i.a)(this,e),this.samples=new Map([["ComponentHelloWorld.Com",'INTERFACE HelloWorld;\n  { IN Hello(hello: TEXT) OUT World(world: TEXT) } IN Done\nEND HelloWorld;\n\nCOMPONENT CompHelloWorld OFFERS HelloWorld;\n  CONSTANT world = "World"; \n  VARIABLE input: TEXT;\n  IMPLEMENTATION HelloWorld;\n    BEGIN\n      WRITE("Waiting for input\\n");\n      WHILE ?Hello DO\n        ?Hello(input);\n        WRITE("Server Received\\n");\n        WRITE(input); WRITELINE;\n        WRITE("Server Sending\\n");\n        !World(world)\n      END\n  END HelloWorld;\n  BEGIN\n    WRITE("Hello World Starting\\n")\n  FINALLY\n    WRITE("Goodbye Hello World\\n")\nEND CompHelloWorld;\n\nCOMPONENT CompSender REQUIRES HelloWorld;\n  VARIABLE world: TEXT; i: INTEGER;\n  ACTIVITY\n    WRITE("Starting Sender\\n");\n    FOR i := 1 TO 10 DO\n      WRITE("Client Sending\\n");\n      HelloWorld!Hello("Hello");\n      WRITE("Client Receiving\\n");\n      HelloWorld?World(world);\n      WRITE(world); WRITELINE\n    END;\n    HelloWorld!Done\nEND CompSender;\n\nCOMPONENT { ENTRYPOINT } Connector;\n  VARIABLE helloWorld: CompHelloWorld; sender: CompSender;\n  BEGIN\n    WRITE("STARTING CONNECTOR\\n");\n    NEW(helloWorld);\n    NEW(sender);\n    CONNECT(HelloWorld(helloWorld), sender);\n    DELETE(helloWorld);\n    DELETE(sender)\nEND Connector;']])}return Object(u.a)(e,[{key:"getSamples",value:function(){return this.samples}}]),e}());function E(){return new Worker(n.p+"static/js/system.worker.526f85ec.worker.js")}var g=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).runner=void 0,a.runCode=Object(x.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.setState({output:a.state.output+"Compiling and Running Code...\n"}),null===(t=a.runner)||void 0===t||t.postMessage({fn:"run",uri:a.state.selectedSample,code:a.state.code});case 2:case"end":return e.stop()}}),e)}))),a.cancelRunCode=Object(x.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:null===(t=a.runner)||void 0===t||t.postMessage({fn:"stop"});case 1:case"end":return e.stop()}}),e)}))),a.updateDropdownSelection=function(e){a.setState({selectedSample:e.target.value})},a.loadSample=function(){var e;n.lastCode=null!==(e=n.samples.getSamples().get(a.state.selectedSample))&&void 0!==e?e:n.lastCode,a.updateCode()},a.clearOutput=function(){a.setState({output:"> "})},a.state={code:n.lastCode,output:"> ",selectedSample:n.defaultSelection,runningCode:!1},a}return Object(u.a)(n,[{key:"updateOutput",value:function(e){void 0!==e&&this.setState({output:this.state.output+e})}},{key:"updateCode",value:function(){this.setState({code:n.lastCode})}},{key:"renderDropdown",value:function(){var e,t=new Array,a=Object(O.a)(n.samples.getSamples().keys());try{for(a.s();!(e=a.n()).done;){var o=e.value;t.push(Object(r.jsx)("option",{"data-tokens":"".concat(o),children:o},o))}}catch(c){a.e(c)}finally{a.f()}return Object(r.jsxs)("div",{className:"d-flex mr-2",children:[Object(r.jsx)("select",{className:"form-control pt-1","data-live-search":"true",onChange:this.updateDropdownSelection,children:t}),Object(r.jsx)("button",{type:"button",className:"btn btn-info mr-1 pt-1",onClick:this.loadSample,children:"Load"})]})}},{key:"renderRunCancelButton",value:function(e,t,n){return Object(r.jsx)("button",{type:"button",className:"btn btn-".concat(e," pt-1 mr-1"),onClick:n.bind(this),children:t})}},{key:"componentDidMount",value:function(){var e=this;this.runner=new E,this.runner.addEventListener("message",(function(t){e.updateOutput(t.data.output),e.setState({runningCode:t.data.running})}))}},{key:"componentWillUnmount",value:function(){var e,t;null===(e=this.runner)||void 0===e||e.postMessage({fn:"stop",uri:"",code:""}),null===(t=this.runner)||void 0===t||t.terminate()}},{key:"renderPlayground",value:function(){var e=this;return Object(r.jsxs)("div",{children:[Object(r.jsxs)("div",{className:"mb-1 pb-1",children:[Object(r.jsx)(C.UnControlled,{value:this.state.code,options:{mode:"javascript",lineNumbers:!0,viewportMargin:1/0},onChange:function(t,a,r){var o=t.getCursor();e.setState({code:r}),n.lastCode=r,t.setCursor(o.line,o.ch)}}),Object(r.jsxs)("div",{className:"d-flex justify-content-between pt-1",children:[Object(r.jsxs)("div",{children:[this.state.runningCode?this.renderRunCancelButton("danger","Cancel",this.cancelRunCode):this.renderRunCancelButton("success","Run",this.runCode),Object(r.jsx)("button",{type:"button",className:"btn btn-secondary pt-1",onClick:this.clearOutput,children:"Clear Output"})]}),this.renderDropdown()]})]}),Object(r.jsxs)("div",{className:"pt-3",children:[Object(r.jsx)("div",{children:"Output:"}),Object(r.jsx)("div",{className:"border",children:Object(r.jsx)("pre",{className:"pre-scrollable pt-1 m-1",children:this.state.output})})]})]})}},{key:"render",value:function(){return Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)("h3",{children:"Composita Language Playground"}),this.renderPlayground()]})}}]),n}(o.Component);g.defaultSelection="ComponentHelloWorld.Com",g.samples=new N,g.lastCode=null!==(a=g.samples.getSamples().get(g.defaultSelection))&&void 0!==a?a:"";var y=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"renderDev",value:function(){return Object(r.jsxs)("div",{children:[Object(r.jsxs)("p",{children:["All source code is published and freely available on"," ",Object(r.jsx)("a",{href:"https://www.github.com/Composita",children:"github.com/Composita"})]}),Object(r.jsxs)("p",{children:["The node packages are published under the"," ",Object(r.jsx)("a",{href:"https://www.npmjs.com/org/composita",children:"@composita organisation"})]})]})}},{key:"render",value:function(){return Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)("h3",{children:"Developer Information"}),this.renderDev()]})}}]),n}(o.Component),S=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)("h3",{children:"License"}),Object(r.jsx)("pre",{children:n.text})]})}}]),n}(o.Component);S.text='Copyright (C) 2020 by Hansruedi Patzen <hp@revy.ch>\n\nPermission to use, copy, modify, and/or distribute this software for any\npurpose with or without fee is hereby granted.\n\nTHE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES\nWITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF\nMERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR\nANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES\nWHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN\nACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF\nOR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.';var T=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object(r.jsx)("div",{className:"footer",children:Object(r.jsx)("footer",{className:"footer mt-auto py-3 bg-light",children:Object(r.jsxs)("p",{className:"text-center",children:["Copyright \xa9 2020 Hansruedi Patzen, licensed under ",Object(r.jsx)(h.b,{to:"/license",children:"0BSD"}),"."]})})})}}]),n}(o.Component),I=Object(b.f)(T),R=n(20),A=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object(r.jsxs)("svg",Object(R.a)(Object(R.a)({viewBox:"0 0 512 512",height:"1em",width:"1em"},this.props),{},{children:[Object(r.jsxs)("g",{fontWeight:400,fontFamily:"Gill Sans",children:[Object(r.jsxs)("g",{"aria-label":"O",style:{lineHeight:1.25,fontVariantLigatures:"normal",fontVariantCaps:"normal",fontVariantNumeric:"normal",fontVariantEastAsian:"normal"},fontSize:377.536,fill:"#ff2a2a",strokeWidth:9.438,children:[Object(r.jsx)("path",{style:{fontVariantLigatures:"normal",fontVariantCaps:"normal",fontVariantNumeric:"normal",fontVariantEastAsian:"normal"},d:"M299.364 180c-35.928-.63-76.21 13.061-94.108 46.357-14.237 27.25-6.704 63.624 18.016 82.266 32.024 26.431 78.11 29.838 116.76 18.191 30.047-9.596 58.908-35.294 59.034-68.888 1.829-28.896-19.435-53.484-44.122-65.569-17.08-8.825-36.468-12.396-55.58-12.357zm-1.475-50c45.746-.995 92.374 19.517 118.61 57.775 32.73 47.014 26.387 118.154-17.145 156.453-39.502 37.366-99.804 45.71-150.759 30.973-47.363-14.166-86.108-57.814-88.255-108.159-3.788-40.678 13.428-82.676 46.25-107.434 25.542-20.76 58.75-29.834 91.3-29.608zm137.787 106H512v40h-76.324v-40z"}),Object(r.jsx)("path",{d:"M432.808 223.002l1.366 5.08a10.519 10.519 37.692 0010.077 7.786l17.7.135a.578.578 86.305 01.075 1.15l-21.816 3a7.408 7.408 39.373 01-8.403-6.897l-.599-9.993a.814.814 170.76 011.6-.26zM432.898 288.985l1.325-5.053a10.45 10.45 142.127 0110.028-7.8l17.7-.134a.578.578 93.695 00.075-1.15l-21.816-3a7.368 7.368 140.474 00-8.36 6.899l-.545 9.989a.81.81 8.905 001.593.25z",fillRule:"evenodd"})]}),Object(r.jsx)("g",{style:{lineHeight:1.25,fontVariantLigatures:"normal",fontVariantCaps:"normal",fontVariantNumeric:"normal",fontVariantEastAsian:"normal"},children:Object(r.jsx)("path",{d:"M109.863 107.973c-.598.674-1.202 1.346-1.79 2.025.588-.679 1.192-1.35 1.79-2.025zm-5.994 7.023c-.514.628-1.034 1.254-1.54 1.885.506-.632 1.025-1.257 1.54-1.885zm-6.035 7.688c-.306.407-.618.81-.92 1.218.302-.408.614-.812.92-1.218zm-5.203 7.228c-.27.391-.547.78-.815 1.172.268-.393.545-.78.815-1.172zm-2.229 3.293c-.344.519-.694 1.034-1.033 1.555.34-.52.69-1.037 1.033-1.555zm-2.681 4.137c-.219.346-.442.69-.659 1.037.217-.347.44-.691.659-1.037zm-2.44 3.957c-.16.267-.325.531-.484.799.159-.268.324-.533.484-.8zm-4.377 7.633c-.13.237-.263.473-.392.71.128-.237.263-.473.392-.71zm-3.918 7.529c-.15.302-.303.602-.45.904.147-.302.3-.602.45-.904zm-5.552 12.178c-.068.16-.139.32-.205.48.066-.16.137-.32.205-.48zm-10.72 33.076c-.038.162-.08.323-.118.486.038-.163.08-.324.119-.486zm-2.747 13.4a1.203 1.203 0 01-1.112.885h.954c.05-.296.107-.59.158-.885zM56.537 296a1.203 1.203 0 011.09.982l.277 1.52a1.2 1.2 0 00.032.121c-.155-.874-.319-1.746-.463-2.623zm5.6 21.563l.115.423-.115-.423zm1.322 4.718l.12.406-.12-.406zm1.396 4.602l.221.69c-.073-.23-.148-.46-.22-.69zm1.504 4.594c.1.295.205.59.307.884-.102-.295-.206-.589-.307-.884zm1.666 4.728c.072.196.147.392.22.588-.073-.196-.148-.392-.22-.588zm1.71 4.531c.128.331.263.66.394.99-.13-.33-.266-.659-.395-.99zm1.806 4.49c.205.494.419.985.627 1.477-.208-.492-.422-.983-.627-1.476zm1.94 4.54c.248.565.51 1.127.763 1.691-.254-.564-.514-1.126-.764-1.691zm2.046 4.513c.316.676.645 1.348.967 2.022-.322-.674-.651-1.346-.967-2.022zm2.164 4.512c.3.608.615 1.212.92 1.818-.305-.606-.62-1.21-.92-1.818zM296.064 26.67c-68.163 0-125.535 22.22-172.117 66.666C87.845 127.94 65.802 168.83 57.81 216H0v80h57.473c4.4 26.738 13.522 52.134 27.37 76.188 20.3 35.257 47.864 62.93 82.694 83.015 34.83 20.086 77.245 30.127 127.246 30.127 60.418 0 120.597-10.46 160.6-44.555l1.46-1.271a2.2 2.2 0 00.757-1.656l.004-3.578a1.468 1.468 0 01.002-.307v-61.16l-.016-4.918a2.508 2.508 0 00-4.275-1.772l-7.305 7.26a3.297 3.297 0 01-.14.13c-38.96 38.5-98.197 52.852-147.24 52.852-51.925 0-94.554-15.813-127.888-47.437-33.334-31.625-50.002-72.008-50.002-121.154 0-48.72 16.882-89.211 50.643-121.477 33.975-32.48 76.604-48.719 127.887-48.719 45.1 0 99.036 14.867 140.484 49.05a3.408 3.408 0 01.22.165l.37.309 7.799 6.494a2.824 2.824 0 004.63-2.16l.018-4.918a1.298 1.298 0 01.008-.127V76.428a1.468 1.468 0 01-.002-.307l-.004-3.578a1.897 1.897 0 00-.828-1.564l-1.592-1.088C399.603 35.63 342.337 26.67 296.064 26.67z",style:{fontVariantLigatures:"normal",fontVariantCaps:"normal",fontVariantNumeric:"normal",fontVariantEastAsian:"normal"},"aria-label":"C",fontSize:656.422,fill:"#333",strokeWidth:16.411})})]}),Object(r.jsxs)("g",{style:{mixBlendMode:"multiply"},opacity:.6,children:[Object(r.jsx)("g",{style:{lineHeight:1.25,fontVariantLigatures:"normal",fontVariantCaps:"normal",fontVariantNumeric:"normal",fontVariantEastAsian:"normal",mixBlendMode:"normal"},children:Object(r.jsx)("path",{style:{fontVariantLigatures:"normal",fontVariantCaps:"normal",fontVariantNumeric:"normal",fontVariantEastAsian:"normal"},d:"M184.11 182.404c-16.07 21.01-24.11 45.92-24.11 74.739 0 35.757 12.905 65.535 38.713 89.334C224.643 370.158 257.026 382 295.86 382c40.679 0 74.351-11.842 101.02-35.523 11.06-9.826 19.832-20.713 26.326-32.657l-36.197-19.894c-4.413 6.124-10.027 11.797-16.858 17.015-19.171 14.742-43.137 22.114-71.894 22.114-28.635 0-52.477-7.227-71.526-21.68-19.048-14.453-28.574-32.566-28.574-54.342 0-21.227 8.467-38.877 25.387-52.955z",fill:"purple","aria-label":"O",fontWeight:400,fontSize:377.536,fontFamily:"Gill Sans",strokeWidth:9.438})}),Object(r.jsx)("path",{d:"M91.535 131.521zM56.537 296a1.203 1.203 0 011.09.982l.277 1.52a1.2 1.2 0 00.032.121c-.155-.874-.319-1.746-.463-2.623zm5.6 21.563l.115.423-.115-.423zm1.322 4.718l.12.406-.12-.406zm1.396 4.602l.221.69c-.073-.23-.148-.46-.22-.69zm1.504 4.594c.1.295.205.59.307.884-.102-.295-.206-.589-.307-.884zm1.666 4.728c.072.196.147.392.22.588-.073-.196-.148-.392-.22-.588zm1.71 4.531c.128.331.263.66.394.99-.13-.33-.266-.659-.395-.99zm1.806 4.49c.205.494.419.985.627 1.477-.208-.492-.422-.983-.627-1.476zm1.94 4.54c.248.565.51 1.127.763 1.691-.254-.564-.514-1.126-.764-1.691zm2.046 4.513c.316.676.645 1.348.967 2.022-.322-.674-.651-1.346-.967-2.022zm2.164 4.512c.3.608.615 1.212.92 1.818-.305-.606-.62-1.21-.92-1.818zm2.78-209.023c-.214.394-.438.783-.649 1.18.21-.396.435-.786.649-1.18zm-5.256 10.394c-.132.28-.272.557-.403.838.131-.28.27-.558.403-.838zm-4.611 10.526c-.084.206-.173.41-.256.617.083-.207.172-.411.256-.617zM57.98 215.055a1.203 1.203 0 01-1.113.945h.942c.053-.317.117-.63.171-.945zm9.96.945H0c.008 34.04.855 48.87 0 80h67.94zm23.595-84.479C74.285 156.996 63.036 185.151 57.81 216c-4.158 33.993-3.722 44.34-.336 80 4.4 26.738 13.522 52.134 27.37 76.188 20.3 35.257 47.864 62.93 82.694 83.015 34.83 20.086 77.245 30.127 127.246 30.127 60.418 0 120.597-10.46 160.6-44.555l1.46-1.271a2.2 2.2 0 00.757-1.656l.004-3.578a1.496 1.496 0 01.002-.307v-61.16l-.016-4.918c-.006-2.227-2.696-3.342-4.275-1.772l-7.305 7.26a3.299 3.299 0 01-.14.13c-38.96 38.501-98.196 52.852-147.24 52.852-51.925 0-94.554-15.813-127.888-47.437-33.334-31.625-50.002-72.008-50.002-121.154 0-36.15 9.304-67.768 27.893-94.86z",fill:"purple"})]})]}))}}]),n}(o.Component),W=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).onNavbarCollaps=function(){console.log(a.state.navbarCollapsed),a.setState({navbarCollapsed:!a.state.navbarCollapsed})},a.state={navbarCollapsed:!0},a}return Object(u.a)(n,[{key:"setActiveCSS",value:function(e){return this.props.location.pathname===e?"active":""}},{key:"setSRCurrent",value:function(e){return Object(r.jsx)("span",{className:"sr-only",children:this.props.location.pathname===e?"(current)":""})}},{key:"render",value:function(){return Object(r.jsx)("header",{children:Object(r.jsx)("nav",{className:"navbar navbar-expand-lg navbar-light bg-light",children:Object(r.jsxs)("div",{className:"container",children:[Object(r.jsx)(h.b,{className:"navbar-brand",to:"/",children:Object(r.jsx)(A,{width:"40px",height:"40px"})}),Object(r.jsx)(h.b,{className:"navbar-brand",to:"/",children:"Composita"}),Object(r.jsx)("button",{className:"navbar-toggler collapsed",type:"button",onClick:this.onNavbarCollaps,"aria-expanded":"true","aria-label":"Toggle navigation",children:Object(r.jsx)("span",{className:"navbar-toggler-icon"})}),Object(r.jsxs)("div",{className:"".concat(this.state.navbarCollapsed?"collapse":""," navbar-collapse"),id:"navbarItems",children:[Object(r.jsxs)("ul",{className:"navbar-nav mr-auto",children:[Object(r.jsx)("li",{className:"nav-item ".concat(this.setActiveCSS("/")),children:Object(r.jsxs)(h.b,{className:"nav-link",to:"/",children:["Home",this.setSRCurrent("/")]})}),Object(r.jsx)("li",{className:"nav-item ".concat(this.setActiveCSS("/play")),children:Object(r.jsxs)(h.b,{className:"nav-link",to:"/play",children:["Playground",this.setSRCurrent("/play")]})}),Object(r.jsx)("li",{className:"nav-item ".concat(this.setActiveCSS("/dev")),children:Object(r.jsxs)(h.b,{className:"nav-link",to:"/dev",children:["Developer",this.setSRCurrent("/dev")]})}),Object(r.jsx)("li",{className:"nav-item ".concat(this.setActiveCSS("/about")),children:Object(r.jsxs)(h.b,{className:"nav-link",to:"/about",children:["About",this.setSRCurrent("/about")]})})]}),Object(r.jsx)("span",{className:"navbar-text",children:"Thinking Components."})]})]})})})}}]),n}(o.Component),w=Object(b.f)(W),k=function(e){Object(d.a)(n,e);var t=Object(j.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(u.a)(n,[{key:"render",value:function(){return Object(r.jsx)("div",{className:"d-flex flex-column overflow-hidden min-vh-100 vh-100",children:Object(r.jsxs)(h.a,{basename:"/",children:[Object(r.jsx)(w,{}),Object(r.jsx)("main",{role:"main",className:"flex-grow-1 overflow-auto pt-2 mb-4",children:Object(r.jsxs)(b.c,{children:[Object(r.jsx)(b.a,{path:"/",exact:!0,component:function(){return Object(r.jsx)(p,{})}}),Object(r.jsx)(b.a,{path:"/play",exact:!0,component:function(){return Object(r.jsx)(g,{})}}),Object(r.jsx)(b.a,{path:"/dev",exact:!0,component:function(){return Object(r.jsx)(y,{})}}),Object(r.jsx)(b.a,{path:"/about",exact:!0,component:function(){return Object(r.jsx)(m,{})}}),Object(r.jsx)(b.a,{path:"/license",exact:!0,component:function(){return Object(r.jsx)(S,{})}})]})}),Object(r.jsx)(I,{})]})})}}]),n}(o.Component);n(40),n(41);l.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(k,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.6698901d.chunk.js.map