(function(){
var h=location.hash;
if(h.indexOf('#/')===0){var p=h.slice(2).split('/').filter(Boolean),f=p[0]||'',u='/';
 if(/^(branding|website|marketing|termos)$/.test(f))u='/'+f+'/'+(p[1]?'#'+p[1]:'');
 else if(f==='portfolio'||f==='precos')u='/#'+f;
 else if(f==='pedido')u='/pedido/'+(p[1]?'?plano='+p[1]+(p[2]?'&servico='+p[2]:''):'');
 location.replace(u);return}
function closeMenu(){var n=document.getElementById('navLinks');if(n)n.classList.remove('active');var i=document.querySelector('.menu-icon i');if(i){i.classList.add('fa-bars');i.classList.remove('fa-times')}}
window.toggleMenu=function(){var n=document.getElementById('navLinks'),i=document.querySelector('.menu-icon i');n.classList.toggle('active');i.classList.toggle('fa-bars');i.classList.toggle('fa-times')};
var mi=document.querySelector('.menu-icon');if(mi)mi.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();window.toggleMenu()}});
[].forEach.call(document.querySelectorAll('.nav-links a'),function(a){a.addEventListener('click',closeMenu)});
document.addEventListener('click',function(e){if(!e.target.closest('.nav-links,.menu-icon'))closeMenu()});
var bar=document.getElementById('myBar');
window.addEventListener('scroll',function(){var s=document.documentElement,m=s.scrollHeight-s.clientHeight;bar.style.width=(m>0?s.scrollTop/m*100:0)+'%'},{passive:true});
var rv=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible','active')}})},{threshold:.08});[].forEach.call(rv,function(el){o.observe(el)})}
else[].forEach.call(rv,function(el){el.classList.add('visible','active')});
[].forEach.call(document.querySelectorAll('.pricing-grid,.portfolio-grid'),function(g){
 var d=document.createElement('div');d.className='cdots';
 d.innerHTML=[].map.call(g.children,function(c,i){return '<button type="button" aria-label="Cartão '+(i+1)+'"></button>'}).join('');
 g.parentNode.insertBefore(d,g.nextSibling);
 function kids(){return [].slice.call(g.children).sort(function(a,b){return a.offsetLeft-b.offsetLeft})}
 function upd(){var k=kids(),best=0,m=1e9;k.forEach(function(c,i){var x=Math.abs(c.offsetLeft-g.offsetLeft-g.scrollLeft-g.clientWidth*.07);if(x<m){m=x;best=i}});[].forEach.call(d.children,function(b,i){b.classList.toggle('on',i===best)})}
 g.addEventListener('scroll',function(){window.requestAnimationFrame(upd)},{passive:true});
 d.addEventListener('click',function(e){var i=[].indexOf.call(d.children,e.target);if(i>-1){var c=kids()[i];g.scrollTo({left:c.offsetLeft-g.offsetLeft-g.clientWidth*.07,behavior:'smooth'})}});
 upd()});
})();
