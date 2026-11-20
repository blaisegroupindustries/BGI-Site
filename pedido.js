(function(){
// Preços e componentes: edite aqui. t = 'once' (único) ou 'month' (mensal).
var PLANS={
 start:{n:'Start',p:9500,d:'Site até 5 páginas, SEO básico e WhatsApp.',inc:['site5','seo','wa']},
 growth:{n:'Growth',p:20400,tag:'Mais popular',d:'Site até 10 páginas, SEO avançado e login de clientes.',inc:['site10','seoa','wab','login']},
 solo:{n:'Só um serviço',p:0,d:'Escolha apenas o que precisa, sem pacote.',inc:[]},
 help:{n:'Ainda não sei',p:0,d:'Conversa gratuita para escolhermos juntos.',inc:[]}};
var PK=['start','growth','solo','help'],ALL=['start','growth','solo'];
var COMP=[
 {id:'site5',n:'Site até 5 páginas',d:'Rápido e pensado para telemóvel.',ic:'fas fa-globe',pl:['start','solo'],p:9500,g:'Website'},
 {id:'site10',n:'Site até 10 páginas',d:'Mais espaço para serviços e conteúdo.',ic:'fas fa-globe',pl:['growth'],g:'Website'},
 {id:'seo',n:'SEO básico',d:'Para aparecer nas pesquisas locais.',ic:'fas fa-magnifying-glass',pl:['start'],g:'Website'},
 {id:'seoa',n:'SEO avançado',d:'Mais visibilidade no Google.',ic:'fas fa-chart-line',pl:ALL,p:3400,g:'Website',r:1},
 {id:'wa',n:'WhatsApp e Facebook Business',d:'Contacto direto a partir do site.',ic:'fab fa-whatsapp',pl:['start'],g:'Website'},
 {id:'wab',n:'WhatsApp Business configurado',d:'Contacto direto a partir do site.',ic:'fab fa-whatsapp',pl:['growth'],g:'Website'},
 {id:'login',n:'Login de clientes',d:'Área reservada com contas para os seus clientes.',ic:'fas fa-user-lock',pl:ALL,p:5100,g:'Website',r:1},
 {id:'pages',n:'+3 páginas',d:'Mais espaço para os seus serviços.',ic:'fas fa-file-circle-plus',pl:ALL,p:3400,g:'Website',r:1},
 {id:'cat',n:'Catálogo de produtos',d:'Mostre o que vende, com encomenda fácil.',ic:'fas fa-store',pl:ALL,p:6800,g:'Website',r:1},
 {id:'pay',n:'Pagamentos M-Pesa e E-Mola',d:'Receba do cliente no próprio site.',ic:'fas fa-mobile-screen',pl:ALL,p:6800,g:'Website',r:1},
 {id:'ia',n:'Assistente com IA',d:'Responde a clientes a qualquer hora.',ic:'fas fa-robot',pl:ALL,p:5100,g:'Website',r:1},
 {id:'book',n:'Reservas via WhatsApp',d:'Para hotéis, salões e serviços.',ic:'fas fa-calendar-check',pl:ALL,p:3400,g:'Website',r:1},
 {id:'dom',n:'Domínio e alojamento (1 ano)',d:'O seu endereço próprio no ar.',ic:'fas fa-globe-africa',pl:ALL,p:3400,g:'Website'},
 {id:'logo',n:'Logótipo e identidade visual',d:'Uma marca que transmite confiança.',ic:'fas fa-gem',pl:ALL,p:6800,g:'Branding'},
 {id:'posts',n:'12 posts prontos',d:'Conteúdo para as redes sociais.',ic:'fas fa-images',pl:ALL,p:4250,g:'Marketing'}
];
var MON=[
 {id:'care',n:'Acompanhamento mensal',d:'Gestão do site, 12 a 16 posts por mês, relatório mensal e suporte prioritário.',ic:'fas fa-screwdriver-wrench',p:6800},
 {id:'ads',n:'Gestão de anúncios',d:'Google e Meta, com resultados medidos.',ic:'fas fa-bullhorn',p:3400,need:'care'},
 {id:'more',n:'+8 posts por mês',d:'Mais conteúdo para as redes.',ic:'fas fa-plus',p:2550,need:'care'}
];
(function(){function n(o){if(o.p){o.p0=o.p;o.p=PROMO.ep(o.p0);o.r=PROMO.reg(o.p0)}}for(var k in PLANS)n(PLANS[k]);COMP.forEach(n);MON.forEach(n)})();
var WA='258864400354',FORM='https://formspree.io/f/xojjvvjk';
var st={plan:'',sel:{}};
function $(i){return document.getElementById(i)}
function mt(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.')+' MT'}
function shown(){return st.plan?COMP.filter(function(c){return c.pl.indexOf(st.plan)>-1}):[]}
function isInc(c){return !!st.plan&&PLANS[st.plan].inc.indexOf(c.id)>-1}
function ln(a,b){return '<div class="ck-ln"><span>'+a+'</span><span>'+b+'</span></div>'}
function renderPlans(){
 $('ck-plans').innerHTML=PK.map(function(k){var p=PLANS[k];
  var pr=k==='help'?'Grátis':k==='solo'?'<small>preço por serviço</small>':(PROMO.on()?'<s class="p-old">'+mt(p.r)+'</s> ':'')+mt(p.p)+'<small>a partir de</small>';
  return '<label><input type="radio" name="plan" value="'+k+'"'+(st.plan===k?' checked':'')+'><span class="ck-pc"><span class="ck-pn">'+p.n+(p.tag?'<em>'+p.tag+'</em>':'')+'</span><span class="ck-pp">'+pr+'</span><span class="ck-pd">'+p.d+'</span></span></label>'}).join('');
}
function row(c,inc,on,solo,mon){
 var tag=inc?'<span class="ck-ct">Incluído</span>':'<span class="ck-ct">'+(PROMO.on()?'<s class="p-old">'+mt(c.r)+'</s> ':'')+'+'+mt(c.p)+'<i>'+(mon?'por mês':'valor único')+'</i></span>';
 var body='<span class="ck-ic"><i class="'+c.ic+'" aria-hidden="true"></i></span><span><span class="ck-cn">'+c.n+'</span><span class="ck-cd" style="display:block">'+c.d+(solo&&c.r?' Precisa de site.':'')+'</span></span>'+tag;
 if(inc)return '<div class="inc"><span class="ck-cc">'+body+'</span></div>';
 return '<label><input type="checkbox" value="'+c.id+'"'+(on?' checked':'')+'><span class="ck-cc">'+body+'</span></label>'}
function renderMonth(){
 $('ck-month').innerHTML=MON.filter(function(c){return !c.need||st.sel[c.need]}).map(function(c){return row(c,false,st.sel[c.id],false,true)}).join('')}
function renderComps(){
 var has=st.plan&&st.plan!=='help';
 $('ck-more').style.display=has?'':'none';$('ck-monthbox').style.display=has?'':'none';
 $('n-dados').textContent=has?'4':'2';
 if(!has){$('ck-comps').innerHTML='';$('ck-month').innerHTML='';return}
 var solo=st.plan==='solo',list=shown(),gs=[];
 list.forEach(function(c){if(gs.indexOf(c.g)<0)gs.push(c.g)});
 $('h-ext-t').textContent=solo?'Escolha os serviços':'Extras opcionais';
 $('ck-hint').textContent=solo?'Marque só o que precisa. O total atualiza sozinho.':'O que diz "Incluído" já faz parte do pacote. Marque os extras que quiser juntar.';
 $('ck-comps').innerHTML=gs.map(function(g){
  var it=list.filter(function(c){return c.g===g}).sort(function(a,b){return isInc(b)-isInc(a)});
  return '<div class="ck-g"><h4>'+g+'</h4><div class="ck-comps">'+it.map(function(c){return row(c,isInc(c),st.sel[c.id],solo,false)}).join('')+'</div></div>'}).join('');
 renderMonth()}
function calc(){
 var p=PLANS[st.plan]||{n:'',p:0},once=p.p,mon=0,ex=[],ml=[],sv={o:p.r?p.r-p.p:0,m:0};
 shown().forEach(function(c){if(!isInc(c)&&st.sel[c.id]){ex.push(c);once+=c.p;sv.o+=c.r-c.p}});
 if(st.plan&&st.plan!=='help')MON.forEach(function(c){if(st.sel[c.id]&&(!c.need||st.sel[c.need])){ml.push(c);mon+=c.p;sv.m+=c.r-c.p}});
 return {p:p,once:once,mon:mon,ex:ex,ml:ml,sv:sv}}
function totTxt(r){
 if(st.plan==='help')return 'Grátis';
 var a=[];if(r.once)a.push(mt(r.once));if(r.mon)a.push(mt(r.mon)+'/mês');return a.join(' + ')||'0 MT'}
function renderSum(){
 var r=calc(),h='';
 if(!st.plan)h='<p class="ck-note">Escolha uma opção para ver o resumo.</p>';
 else if(st.plan==='help')h=ln('Conversa gratuita','Grátis');
 else{
  if(r.p.p)h+=ln('Pacote '+r.p.n,mt(r.p.p));
  r.ex.forEach(function(c){h+=ln(c.n,'+'+mt(c.p))});
  r.ml.forEach(function(c){h+=ln(c.n,'+'+mt(c.p)+'/mês')});
  if(!h)h='<p class="ck-note">Ainda não escolheu nada.</p>'}
 $('ck-lines').innerHTML=h;
 var t='';
 if(st.plan==='help')t='<div class="ck-tot"><span>Total</span><b>Grátis</b></div>';
 else{if(r.once)t+='<div class="ck-tot"><span>Valor único</span><b>'+mt(r.once)+'</b></div>';if(r.mon)t+='<div class="ck-tot"><span>Mensalidade</span><b>'+mt(r.mon)+'</b></div>'}
 if(PROMO.on()&&st.plan!=='help'&&(r.sv.o||r.sv.m))t+='<div class="ck-save">Promoção de fim de ano: poupa '+(r.sv.o?mt(r.sv.o):'')+(r.sv.o&&r.sv.m?' + ':'')+(r.sv.m?mt(r.sv.m)+'/mês':'')+'</div>';$('ck-tots').innerHTML=t;$('ck-bt').textContent=totTxt(r);
 var near=(st.plan==='start'||st.plan==='solo')&&r.once>=Math.round(PLANS.growth.p*.83),up=$('ck-up');
 up.hidden=!near;if(near)up.textContent='Está perto do pacote Growth ('+mt(PLANS.growth.p)+'), que inclui site até 10 páginas, SEO avançado e login de clientes. Vale a pena comparar.';
 $('ck-selerr').hidden=true}
function render(){renderPlans();renderComps();renderSum()}
$('ck-plans').addEventListener('change',function(e){
 if(e.target.name==='plan'){st.plan=e.target.value;st.sel={};renderComps();renderSum()}});
$('ck-comps').addEventListener('change',function(e){st.sel[e.target.value]=e.target.checked;renderSum()});
$('ck-month').addEventListener('change',function(e){
 st.sel[e.target.value]=e.target.checked;
 if(e.target.value==='care'){if(!e.target.checked){delete st.sel.ads;delete st.sel.more}renderMonth();var f=document.querySelector('#ck-month input[value="care"]');if(f)f.focus()}
 renderSum()});
$('ck-go').addEventListener('click',function(e){e.preventDefault();$('ck-sum').scrollIntoView({behavior:'smooth',block:'start'})});
function bad(id,on){var w=$(id);w.classList.toggle('bad',on);w.querySelector('input').setAttribute('aria-invalid',on?'true':'false');return on}
function orderText(r){
 var l=['Olá BGI! Quero pedir um orçamento:','Opção: '+r.p.n+(r.p.p?' ('+mt(r.p.p)+')':'')];
 if(r.ex.length)l.push((st.plan==='solo'?'Serviços: ':'Extras: ')+r.ex.map(function(c){return c.n}).join(', '));
 if(r.ml.length)l.push('Mensal: '+r.ml.map(function(c){return c.n}).join(', '));
 if(PROMO.on())l.push('Promoção de fim de ano (válida até 31/12)');l.push('Total: '+totTxt(r));
 l.push('Nome: '+$('ck-nome').value.trim());
 if($('ck-biz').value.trim())l.push('Negócio: '+$('ck-biz').value.trim());
 if($('ck-msg').value.trim())l.push('Nota: '+$('ck-msg').value.trim());
 return l.join('\n')}
function done(saved,r){
 $('ck-main').hidden=true;$('ck-done').hidden=false;
 $('ck-dt').textContent=saved?'Pedido enviado!':'Quase lá';
 $('ck-dp').textContent=saved?'Entramos em contacto em até 24h úteis. Se preferir falar já, continue no WhatsApp.':'Não conseguimos guardar online. Envie o pedido pelo WhatsApp para não o perder.';
 $('ck-wa').href='https://wa.me/'+WA+'?text='+encodeURIComponent(orderText(r));
 window.scrollTo(0,0)}
$('ck-form').addEventListener('submit',function(e){e.preventDefault();var r0=calc();if(!st.plan||(st.plan==='solo'&&!r0.ex.length)){var se=$('ck-selerr');se.textContent=!st.plan?'Escolha o que precisa antes de enviar.':'Escolha pelo menos um serviço.';se.hidden=false;$('ck-plans').scrollIntoView({behavior:'smooth',block:'center'});return}
 var b1=bad('f-nome',$('ck-nome').value.trim().length<2),b2=bad('f-tel',$('ck-tel').value.replace(/\D/g,'').length<9);
 if(b1||b2){(b1?$('ck-nome'):$('ck-tel')).focus();return}
 var r=r0,btn=$('ck-send');btn.disabled=true;btn.textContent='A enviar...';
 var f=new FormData();
 f.append('Plano',r.p.n);f.append('Extras',r.ex.map(function(c){return c.n}).join(', ')||'nenhum');f.append('Mensal',r.ml.map(function(c){return c.n}).join(', ')||'nenhum');f.append('Promocao',PROMO.on()?'Promoção de fim de ano (até 31/12)':'nao');f.append('Total',totTxt(r));
 f.append('Nome',$('ck-nome').value);f.append('WhatsApp',$('ck-tel').value);f.append('Negócio',$('ck-biz').value);f.append('Email',$('ck-mail').value);
 f.append('Mensagem',$('ck-msg').value);
 fetch(FORM,{method:'POST',body:f,headers:{Accept:'application/json'}}).then(function(x){done(x.ok,r)}).catch(function(){done(false,r)}).then(function(){btn.disabled=false;btn.innerHTML='<i class="fas fa-paper-plane"></i> Pedir orçamento'});
});
$('ck-new').addEventListener('click',function(){$('ck-done').hidden=true;$('ck-main').hidden=false;window.scrollTo(0,0)});
window.ckInit=function(plan,pre){if(plan&&PLANS[plan]&&plan!==st.plan){st.plan=plan;st.sel={}}if(pre&&plan===st.plan&&COMP.some(function(c){return c.id===pre}))st.sel[pre]=true;$('ck-done').hidden=true;$('ck-main').hidden=false;render()};
render();
// Pré-seleção por endereço: pedido.html#start | #solo/logo | #growth
function fromHash(first){
 var h=location.hash.replace(/^#\/?/,'');
 if(h&&!first&&!PLANS[h.split('/')[0]])return;
 var p=h.split('/').filter(Boolean);
 window.ckInit(p[0],p[1]);
}
window.addEventListener('hashchange',function(){fromHash(false)});
fromHash(true);
})();
