// Barra do fundador e pop-up de tipos de site (apenas index.html)
const FOUNDER_DEADLINE = new Date(PROMO.end); // mesma data da promoção (promo.js)
    const founderBar = document.querySelector('.founder-bar');
    const founderLabel = document.getElementById('founderLabel');
    const daysLeft = Math.ceil((FOUNDER_DEADLINE - new Date()) / 86400000);
    if (daysLeft <= 0) {
        if (founderBar) founderBar.style.display = 'none'; // oferta terminada
    } else if (founderLabel) {
        founderLabel.textContent = daysLeft === 1 ? 'Último dia' : 'Faltam ' + daysLeft + ' dias';
    }

(function(){
// Edite aqui os tipos de site, preços e imagens do pop-up.
var S=[
{k:'Site institucional',d:'Até 5 páginas, rápido e feito para telemóvel.',n:9500,img:'ZAV_ex.jpg',c:'Exemplo real: Zavanna Build'},
{k:'Loja ou catálogo online',d:'Produtos, encomendas por WhatsApp e pagamento M-Pesa e E-Mola.',n:23100,img:'CW_ex.jpg',c:'Exemplo real: Casa Windows'},
{k:'Site com reservas',d:'Hotéis, residenciais e serviços com reserva direta no WhatsApp.',n:12900,img:'REI_ex.jpg',c:'Exemplo real: Residencial Indelével'},
{k:'Sistema web à medida',d:'Painéis, áreas de cliente e automações com IA.',p:'sob orçamento'}];
function lbl(s){return s.n?'a partir de '+(PROMO.on()?'<s>'+PROMO.fm(PROMO.reg(s.n))+'</s> ':'')+PROMO.fm(PROMO.ep(s.n))+' MT':s.p}
var sl=document.getElementById('sp-slides'),dt=document.getElementById('sp-dots'),bar=document.getElementById('sp-bar'),box=document.getElementById('sp'),cur=0,t;
sl.innerHTML=S.map(function(s){
 var im=s.img?'<div class="sp-img" style="background-image:url('+s.img+')"><span class="sp-badge">'+lbl(s)+'</span><span class="sp-cap">'+s.c+'</span></div>':'<div class="sp-img sp-dash"><span class="sp-badge">'+lbl(s)+'</span><i></i><i></i><i></i><i></i></div>';
 return '<div class="sp-s">'+im+'<div class="sp-b"><h4>'+s.k+'</h4><p>'+s.d+'</p><a href="https://wa.me/258864400354?text='+encodeURIComponent('Olá BGI! Tenho interesse em: '+s.k+'.')+'" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> Pedir orçamento</a></div></div>'}).join('');
dt.innerHTML=S.map(function(s,i){return '<button aria-label="Slide '+(i+1)+'" data-i="'+i+'"></button>'}).join('');
function go(i){
 cur=(i+S.length)%S.length;
 [].forEach.call(sl.children,function(e,j){e.classList.toggle('on',j===cur)});
 [].forEach.call(dt.children,function(e,j){e.classList.toggle('on',j===cur)});
 
 clearTimeout(t);
}
dt.addEventListener('click',function(e){if(e.target.dataset.i)go(+e.target.dataset.i)});
document.getElementById('sp-prev').onclick=function(){go(cur-1)};
document.getElementById('sp-next').onclick=function(){go(cur+1)};
box.addEventListener('mouseenter',function(){clearTimeout(t);bar.classList.remove('run')});
box.addEventListener('mouseleave',function(){go(cur)});
go(0);
})();
