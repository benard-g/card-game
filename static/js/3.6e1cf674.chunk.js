(this["webpackJsonp@packages/frontend"]=this["webpackJsonp@packages/frontend"]||[]).push([[3],{126:function(e,t,c){"use strict";c.r(t),c.d(t,"default",(function(){return y}));var b=c(4),r=c(2),j=c(10),n=c(67),a=c(36),s=c(69),i=c(33),o=c(66),l=c(57),d=c.n(l),O=c(68),x=c(25),u=function(){var e=Object(j.g)(),t=Object(o.b)(),c=Object(x.a)(t,2),n=c[0],a=c[1].loading,s=Object(r.useCallback)((function(){Object(O.a)(d.a.mark((function t(){var c,b,r,j;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n();case 2:b=t.sent,r=b.data,(j=null===r||void 0===r||null===(c=r.createLobby.lobby)||void 0===c?void 0:c.id)&&e.replace("/lobbies/".concat(j));case 6:case"end":return t.stop()}}),t)})))()}),[n,e]);return Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:"Create lobby"}),Object(b.jsx)("br",{}),Object(b.jsx)("br",{}),Object(b.jsx)("br",{}),Object(b.jsx)("button",{disabled:a,onClick:s,children:"Create a new lobby"})]})},h=function(){var e=Object(o.a)(),t=e.data,c=e.loading,r=e.error,j=null===t||void 0===t?void 0:t.viewer.lobby;return c?Object(b.jsx)(i.a,{}):r||!t?Object(b.jsx)(s.a,{error:r}):Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(n.a,{children:Object(b.jsx)("title",{children:"Card game - Create a new Lobby"})}),j?Object(b.jsxs)("div",{children:[Object(b.jsx)("p",{children:"You already are in a lobby."}),Object(b.jsx)("br",{}),Object(b.jsx)("br",{}),Object(b.jsx)("br",{}),Object(b.jsx)(a.b,{to:"/lobbies/".concat(j.id),replace:!0,children:"Go to lobby"})]}):Object(b.jsx)(u,{})]})},v=c(125),p=function(e){var t=e.lobby,c=Object(v.a)().t,n=Object(j.g)(),a=Object(o.e)(),s=Object(x.a)(a,2),i=s[0],l=s[1].loading,u=Object(r.useCallback)((function(){Object(O.a)(d.a.mark((function e(){return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i();case 2:n.push("/");case 3:case"end":return e.stop()}}),e)})))()}),[n,i]);return Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:c("pages.Lobby.CreateLobby.title")}),Object(b.jsx)("br",{}),Object(b.jsx)("br",{}),Object(b.jsx)("br",{}),Object(b.jsxs)("p",{children:["Code: ",t.id]}),Object(b.jsx)("button",{disabled:l,onClick:u,children:"Leave lobby"})]})},f=function(){var e=Object(j.h)().id,t=Object(o.d)(),c=t.data,l=t.loading,d=t.error,O=Object(r.useState)(void 0),u=Object(x.a)(O,2),h=u[0],v=u[1];return Object(r.useEffect)((function(){if(!l&&c){var t=c.viewer.lobby;v((null===t||void 0===t?void 0:t.id)===e)}}),[l,c,e]),l?Object(b.jsx)(i.a,{}):d||!c?Object(b.jsx)(s.a,{error:d}):void 0===h?Object(b.jsx)(i.a,{}):Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)(n.a,{children:Object(b.jsxs)("title",{children:["Card game - ",e]})}),h&&c.viewer.lobby?Object(b.jsx)(p,{lobby:c.viewer.lobby}):Object(b.jsxs)("div",{children:[Object(b.jsxs)("p",{children:["Lobby ",e," not accessible"]}),Object(b.jsx)(a.b,{to:"/",children:"Go to home"})]})]})},y=function(){var e=Object(j.i)().url;return Object(b.jsxs)(j.d,{children:[Object(b.jsx)(j.b,{path:"".concat(e,"/create"),children:Object(b.jsx)(h,{})}),Object(b.jsx)(j.b,{path:"".concat(e,"/:id"),children:Object(b.jsx)(f,{})}),Object(b.jsx)(j.b,{path:"*",children:Object(b.jsx)(j.a,{to:"/"})})]})}}}]);
//# sourceMappingURL=3.6e1cf674.chunk.js.map