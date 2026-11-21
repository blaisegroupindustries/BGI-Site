// Promoção: preços atuais = promoção até PROMO.end; depois passam a normais (+15%). Mude a data/fator aqui.
window.PROMO=(function(){var P={end:Date.parse('2026-12-31T23:59:59+02:00'),f:1.15};
P.on=function(){return Date.now()<P.end};
P.reg=function(n){return Math.round(n*P.f/100)*100};
P.ep=function(n){return P.on()?n:P.reg(n)};
P.fm=function(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.')};
P.price=function(n,u){var o=P.fm(P.ep(n))+' <span>'+(u||'MT')+'</span>';return P.on()?'<s class="p-old">'+P.fm(P.reg(n))+'</s> '+o:o};
function pad(x){return x<10?'0'+x:x}
function tick(){var d=P.end-Date.now();if(d<=0){location.reload();return}
var s=Math.floor(d/1000),dd=Math.floor(s/86400),hh=Math.floor(s%86400/3600),mm=Math.floor(s%3600/60);
document.getElementById('pb-c').textContent=dd+'d '+pad(hh)+'h '+pad(mm)+'m '+pad(s%60)+'s'}
P.apply=function(){
 [].forEach.call(document.querySelectorAll('[data-p]'),function(e){e.innerHTML=P.price(+e.getAttribute('data-p'),e.getAttribute('data-u'))});
 [].forEach.call(document.querySelectorAll('[data-ps]'),function(e){var n=+e.getAttribute('data-ps');e.textContent='Promoção: poupa '+P.fm(P.reg(n)-n)+' MT até 31/12';e.hidden=!P.on()});
 if(P.on()){document.getElementById('promo-bar').hidden=false;document.body.classList.add('promo-on');tick();setInterval(tick,1000)}};
document.addEventListener('DOMContentLoaded',P.apply);
return P})();
