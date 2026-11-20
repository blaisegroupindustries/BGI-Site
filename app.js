// Comportamento comum a todas as páginas (menu, progresso, animações, carrosséis)

// Endereços antigos do site de página única (#/pedido, #/portfolio...) -> páginas novas
function legacyRoute(){
 var h=location.hash;if(h.indexOf('#/')!==0)return;
 var p=h.slice(2).split('/').filter(Boolean),f=p[0]||'';
 var M={'':'index.html',branding:'branding.html',website:'website.html',marketing:'marketing.html',termos:'termos.html',pedido:'pedido.html'};
 var to;
 if(f==='portfolio'||f==='precos')to='index.html#'+f;
 else if(M[f]!==undefined)to=M[f]+(p.length>1?'#'+p.slice(1).join('/'):'');
 else to='index.html';
 location.replace(to);
}
legacyRoute();
window.addEventListener('hashchange',legacyRoute);

function toggleMenu(){
 var nl=document.getElementById('navLinks'),ic=document.querySelector('.menu-icon i');
 if(!nl)return;
 nl.classList.toggle('active');
 if(ic){ic.classList.toggle('fa-bars');ic.classList.toggle('fa-times')}
}
function closeMenu(){
 var nl=document.getElementById('navLinks');if(nl)nl.classList.remove('active');
 var ic=document.querySelector('.menu-icon i');if(ic){ic.classList.add('fa-bars');ic.classList.remove('fa-times')}
}
(function(){
 var mi=document.querySelector('.menu-icon');
 if(mi)mi.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleMenu()}});

 // barra de progresso de leitura
 var bar=document.getElementById('myBar');
 function prog(){
  if(!bar)return;
  var st=document.body.scrollTop||document.documentElement.scrollTop;
  var h=document.documentElement.scrollHeight-document.documentElement.clientHeight;
  bar.style.width=(h>0?(st/h)*100:0)+'%';
 }
 window.addEventListener('scroll',prog,{passive:true});prog();

 // cliques em links: fecha o menu; se o link aponta para a página atual, desliza em vez de recarregar
 function norm(p){return p.replace(/index\.html$/,'').replace(/\.html$/,'')}
 document.addEventListener('click',function(e){
  var a=e.target.closest&&e.target.closest('a[href]');
  if(a&&!e.defaultPrevented&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&e.button===0&&!a.target){
   var u;try{u=new URL(a.href,location.href)}catch(x){u=null}
   if(u&&u.origin===location.origin&&norm(u.pathname)===norm(location.pathname)&&!u.search){
    if(!u.hash){e.preventDefault();closeMenu();window.scrollTo({top:0,behavior:'smooth'});return}
    var el=document.getElementById(decodeURIComponent(u.hash.slice(1)));
    if(el){e.preventDefault();closeMenu();el.scrollIntoView({behavior:'smooth'});
     try{history.pushState(null,'',u.pathname+u.hash)}catch(x){}return}
   }
  }
  if(!e.target.closest('.nav-links,.menu-icon'))closeMenu();
  else if(a)closeMenu();
 });

 // revelar elementos .reveal
 var rv=document.querySelectorAll('.reveal');
 if('IntersectionObserver' in window){
  var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible','active');o.unobserve(e.target)}})},{threshold:.08});
  [].forEach.call(rv,function(el){o.observe(el)});
 }else [].forEach.call(rv,function(el){el.classList.add('visible','active')});

 // pontos nos carrosséis
 [].forEach.call(document.querySelectorAll('.pricing-grid,.portfolio-grid'),function(g){
  var d=document.createElement('div');d.className='cdots';
  d.innerHTML=[].map.call(g.children,function(c,i){return '<button type="button" aria-label="Cartão '+(i+1)+'"></button>'}).join('');
  g.parentNode.insertBefore(d,g.nextSibling);
  function kids(){return [].slice.call(g.children).sort(function(a,b){return a.offsetLeft-b.offsetLeft})}
  function upd(){var k=kids(),best=0,m=1e9;k.forEach(function(c,i){var x=Math.abs(c.offsetLeft-g.offsetLeft-g.scrollLeft-g.clientWidth*.07);if(x<m){m=x;best=i}});
   [].forEach.call(d.children,function(b,i){b.classList.toggle('on',i===best)})}
  g.addEventListener('scroll',function(){window.requestAnimationFrame(upd)},{passive:true});
  d.addEventListener('click',function(e){var i=[].indexOf.call(d.children,e.target);if(i>-1){var c=kids()[i];g.scrollTo({left:c.offsetLeft-g.offsetLeft-g.clientWidth*.07,behavior:'smooth'})}});
  upd();
 });

 // deslizar o pop-up com o dedo
 var sp=document.getElementById('sp');
 if(sp){var x0=null;
  sp.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  sp.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;
   if(Math.abs(dx)>40)document.getElementById(dx<0?'sp-next':'sp-prev').click()},{passive:true});}
})();
