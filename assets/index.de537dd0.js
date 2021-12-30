import{S as I,P as A,W as M,T as S,M as g,a as m,b as O,A as R,c as y,B as C,d as F,e as E,f as r,E as h,V as q,g as U}from"./vendor.08afcdd2.js";const W=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const x of i.addedNodes)x.tagName==="LINK"&&x.rel==="modulepreload"&&s(x)}).observe(document,{childList:!0,subtree:!0});function a(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(e){if(e.ep)return;e.ep=!0;const i=a(e);fetch(e.href,i)}};W();let f=0,p=0;const c=new I,t=new A(75,window.innerWidth/window.innerHeight,.1,1e3),u=new M({canvas:document.querySelector("#bg")});u.setPixelRatio(window.devicePixelRatio);u.setSize(window.innerWidth,window.innerHeight);t.position.setZ(30);t.position.setX(-3);u.render(c,t);function v(o,n,a){let s=0,e=0;o.addEventListener("animationend",()=>{s===0&&(o.classList.remove("fade-out"),a===!1?n.style.cssText="padding-top: 125px;":n.style.cssText="padding-top: 250px;",n.classList.add("fade-in"),a===!1?o.style.cssText="padding-top: 250px; display: none;":o.style.cssText="padding-top: 125px; display: none;",n.addEventListener("animationend",()=>{e===0&&(n.classList.remove("fade-in"),e+=1)},!0),document.getElementById("body").appendChild(n),s+=1)},!0),o.classList.add("fade-out")}const j=new S(10,3,16,100),k=new g({color:16737095}),w=new m(j,k);c.add(w);const b=new O(16777215);b.position.set(5,5,5);const G=new R(16777215);c.add(b,G);function N(){const o=new E(.25,24,24),n=new g({color:16777215}),a=new m(o,n),[s,e,i]=Array(3).fill().map(()=>U.randFloatSpread(100));a.position.set(s,e,i),c.add(a)}Array(200).fill().forEach(N);const Q=new y().load("https://the-nova-system.github.io/extra-assets/space.jpg");c.background=Q;const H=new y().load("https://the-nova-system.github.io/extra-assets/logo.svg"),d=new m(new C(3,3,3),new F({map:H}));d.rotation.x+=20;d.rotation.y-=20;d.rotation.z+=20;c.add(d);const X=new y().load("https://the-nova-system.github.io/extra-assets/moon.jpg"),V=new y().load("https://the-nova-system.github.io/extra-assets/normal.jpg"),l=new m(new E(3,32,32),new g({map:X,normalMap:V}));c.add(l);l.position.z=30;l.position.setX(-10);d.position.z=-5;d.position.x=2;function L(){const o=document.body.getBoundingClientRect().top;l.rotation.x+=.05,l.rotation.y+=.075,l.rotation.z+=.05,d.rotation.y+=.01,d.rotation.z+=.01,t.position.z=o*-.01,t.position.x=o*-2e-4,t.rotation.y=o*-2e-4}document.body.onscroll=L;L();window.onload=function(){location.hash==="#contact"&&z();const o=document.getElementById("contact-form"),n=document.getElementById("home"),a=document.getElementById("home-named");o.onclick=function(){return location.hash!=="#contact"&&z(),location.hash="#contact",!1},n.onclick=function(){return location.hash!=="#home"&&T(),location.hash="#home",!1},a.onclick=function(){return location.hash!=="#home"&&T(),location.hash="#home",!1}};function z(){if(f===-1)f=0;else{if(requestAnimationFrame(z),f===0){v(document.getElementById("home-page"),document.getElementById("contact-page"),!1);let o={x:t.position.x,y:t.position.y,z:t.position.z},n={x:20,y:25,z:-15};const a=new r.Tween(o).to(n,2e3);a.easing(r.Easing.Quadratic.InOut),a.onUpdate(function(){t.position.x=o.x,t.position.y=o.y,t.position.z=o.z});let s=new h().copy(t.rotation);t.lookAt(new q(n.x,n.y,n.z));let e=new h().copy(t.rotation);t.rotation.copy(s);const i=new r.Tween(s).to({x:e.x,y:e.y,z:e.z},2e3);i.easing(r.Easing.Quadratic.InOut),i.onUpdate(function(){t.rotation.x=s.x,t.rotation.y=s.y,t.rotation.z=s.z}),a.onComplete(function(){f=-1}),a.start(),i.start()}f+=1,r.update(),u.render(c,t)}}function T(){if(p===-1)p=0;else{if(requestAnimationFrame(T),p===0){v(document.getElementById("contact-page"),document.getElementById("home-page"),!0);let o={x:t.position.x,y:t.position.y,z:t.position.z},n={x:0,y:0,z:0};const a=new r.Tween(o).to(n,2e3);a.easing(r.Easing.Quadratic.InOut),a.onUpdate(function(){(document.body.scrollTop!==0||document.documentElement.scrollTop!==0)&&window.scrollBy(0,-80),t.position.x=o.x,t.position.y=o.y,t.position.z=o.z});let s=new h().copy(t.rotation),e=new h(0,0,0,"XYZ");const i=new r.Tween(s).to({x:e.x,y:e.y,z:e.z},2e3);i.easing(r.Easing.Quadratic.InOut),i.onUpdate(function(){t.rotation.x=s.x,t.rotation.y=s.y,t.rotation.z=s.z}),a.onComplete(function(){p=-1}),a.start(),i.start()}p+=1,r.update(),u.render(c,t)}}function B(){requestAnimationFrame(B),w.rotation.x+=.01,w.rotation.y+=.005,w.rotation.z+=.01,l.rotation.x+=.005,u.render(c,t)}B();
