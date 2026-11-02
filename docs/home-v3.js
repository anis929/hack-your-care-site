(() => {
  const story=document.querySelector('.signature-story');
  const hero=document.querySelector('.hero');
  const header=document.querySelector('.site-header');
  const windowClip=document.getElementById('signature-writing-window');
  const bridge=document.querySelector('.signature-bridge-line');
  const chapters=[...document.querySelectorAll('.signature-chapters>span')];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const motionEnabled=()=>!reduced.matches&&!document.documentElement.classList.contains('motion-off');
  const clamp=(n,min=0,max=1)=>Math.min(max,Math.max(min,n));
  let scheduled=false;
  function renderScroll(){
    scheduled=false;
    const enabled=motionEnabled();
    const height=innerHeight,top=header.getBoundingClientRect().height;
    const bounds=story.getBoundingClientRect();
    const p=enabled?clamp((height*.62-bounds.top)/(bounds.height-height*.35)):1;
    const ease=1-Math.pow(1-p,3);
    story.style.setProperty('--signature-progress',p.toFixed(4));
    story.style.setProperty('--signature-spread',((1-ease)*23).toFixed(2)+'px');
    story.style.setProperty('--signature-care-y',((1-ease)*5).toFixed(2)+'px');
    windowClip.setAttribute('width',String(150*clamp((p-.05)/.66)));
    bridge.style.strokeDashoffset=String(1-ease);
    chapters.forEach((chapter,index)=>chapter.classList.toggle('is-active',index===Math.min(2,Math.floor(p*3))));
    const heroBounds=hero.getBoundingClientRect();
    hero.style.setProperty('--hero-shift',enabled?(-clamp((top-heroBounds.top)/height,0,1)*24).toFixed(1)+'px':'0px');
  }
  function requestRender(){if(!scheduled){scheduled=true;requestAnimationFrame(renderScroll);}}
  addEventListener('scroll',requestRender,{passive:true});
  addEventListener('resize',requestRender,{passive:true});
  reduced.addEventListener('change',requestRender);
  addEventListener('message',event=>{
    if(event.source===parent&&event.data?.type==='hyc-motion')requestRender();
  });
  renderScroll();

  const steps=[
    {short:'Le besoin',tag:'POSER LES BONNES QUESTIONS',title:'Tout commence<br>par votre besoin.',description:'Le sujet, les objectifs, le bon format. Nous prenons le temps de comprendre ce qui fera avancer votre projet.',you:'Vous partagez votre enjeu, vos attentes et votre calendrier.',hyc:'Nous précisons le périmètre, le format et les expertises à mobiliser.',expertTitle:'Votre expérience.<br>Votre point de départ.',expertDescription:'Votre métier, vos sujets de prédilection et vos envies. Votre profil nous aide à vous proposer des missions pertinentes.',expertYou:'Vous partagez votre pratique, vos centres d’intérêt et vos disponibilités.',expertHyc:'Nous découvrons votre expertise pour identifier les bonnes opportunités.',state:'D’ABORD, VOUS ÉCOUTER.'},
    {short:'La rencontre',tag:'LES BONNES PERSONNES',title:'La bonne expertise.<br>La bonne rencontre.',description:'Nous identifions les profils pertinents, en santé humaine comme animale. Vous rencontrez les professionnels qui peuvent faire la différence.',you:'Vous échangez avec les profils proposés et validez l’adéquation au projet.',hyc:'Nous recherchons, qualifions et organisons la mise en relation.',expertTitle:'Une proposition<br>qui vous ressemble.',expertDescription:'Une mission correspond à votre expérience ? Nous vous présentons le sujet, le format et les conditions pour décider en connaissance de cause.',expertYou:'Vous posez vos questions et restez libre d’accepter ou de refuser.',expertHyc:'Nous vous présentons le projet et facilitons les premiers échanges.',state:'LES IDÉES RENCONTRENT LE TERRAIN.'},
    {short:'Le cadre',tag:'PARTIR SUR DE BONNES BASES',title:'Un cadre clair.<br>Pour chacun.',description:'Objectifs, livrables, calendrier, rémunération : les modalités de la collaboration sont définies avant de démarrer.',you:'Vous validez les conditions et les engagements de la mission.',hyc:'Nous coordonnons le devis, les documents et la contractualisation selon le périmètre confié.',expertTitle:'Tout est posé.<br>Avant de commencer.',expertDescription:'Le contenu de la mission, les attendus et la rémunération sont précisés en amont pour une collaboration sereine.',expertYou:'Vous prenez connaissance des conditions et validez votre participation.',expertHyc:'Nous formalisons le cadre et coordonnons la contractualisation.',state:'LE BON CADRE POUR AVANCER.'},
    {short:'Les déclarations',tag:'L’ADMINISTRATIF, ACCOMPAGNÉ',title:'La paperasse ?<br>On fait le point.',description:'Les formalités et déclarations nécessaires sont identifiées selon le cadre de la mission. Leur prise en charge est précisée avec vous.',you:'Vous transmettez les informations utiles et validez les éléments nécessaires.',hyc:'Nous coordonnons les formalités et les déclarations applicables, selon le périmètre convenu.',expertTitle:'Votre expertise.<br>Moins d’administratif.',expertDescription:'Nous vous accompagnons dans les documents et informations à fournir, selon votre statut et le cadre de la collaboration.',expertYou:'Vous nous transmettez les informations et documents requis.',expertHyc:'Nous vous guidons et coordonnons les formalités prévues pour la mission.',state:'LES FORMALITÉS TROUVENT LEUR PLACE.'},
    {short:'La mission',tag:'PLACE À L’EXPERTISE',title:'C’est le moment<br>de faire avancer l’idée.',description:'Entretien, atelier, contenu ou formation : les expertises se rencontrent et le projet prend forme.',you:'Vous collaborez avec les professionnels et partagez vos retours.',hyc:'Nous coordonnons les échanges, le suivi et les livrables selon l’accompagnement choisi.',expertTitle:'Votre quotidien<br>devient une contribution.',expertDescription:'Vous partagez votre expérience sur un sujet que vous connaissez, dans un format adapté à la mission.',expertYou:'Vous apportez votre regard terrain et réalisez la mission convenue.',expertHyc:'Nous préparons les échanges et restons votre point de contact.',state:'L’EXPERTISE ENTRE EN MOUVEMENT.'},
    {short:'La suite',tag:'FAIRE DURER LE LIEN',title:'Une mission aboutie.<br>Des perspectives ouvertes.',description:'Nous faisons le bilan de la collaboration et organisons sa clôture. Une rencontre peut en faire naître d’autres.',you:'Vous validez les livrables et partagez votre retour sur la collaboration.',hyc:'Nous suivons la clôture et le règlement, selon les modalités convenues.',expertTitle:'Une contribution.<br>Et de nouvelles envies.',expertDescription:'Votre mission se termine. Nous faisons le point avec vous et restons en lien pour les prochaines opportunités.',expertYou:'Vous partagez votre retour et les éléments utiles à la clôture.',expertHyc:'Nous suivons la rémunération selon les conditions convenues et restons en contact.',state:'LE PROJET AVANCE. LE LIEN RESTE.'}
  ];
  const tabs=[...document.querySelectorAll('[data-process]')];
  const perspectives=[...document.querySelectorAll('[data-perspective]')];
  const detail=document.querySelector('.process-detail');
  const visual=document.querySelector('.flow-visual');
  const previous=document.getElementById('process-prev'),next=document.getElementById('process-next');
  let selected=0,perspective='project',detailAnimation;
  function selectStep(index,focus=false,animate=true){
    selected=clamp(index,0,steps.length-1);
    const step=steps[selected],expert=perspective==='expert';
    tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===selected));tab.tabIndex=i===selected?0:-1;});
    document.getElementById('process-panel').setAttribute('aria-labelledby','process-tab-'+selected);
    document.getElementById('process-number').textContent=String(selected+1).padStart(2,'0');
    document.getElementById('process-tag').textContent=step.tag;
    document.getElementById('process-title').innerHTML=expert?step.expertTitle:step.title;
    document.getElementById('process-description').textContent=expert?step.expertDescription:step.description;
    document.getElementById('process-you').textContent=expert?step.expertYou:step.you;
    document.getElementById('process-hyc').textContent=expert?step.expertHyc:step.hyc;
    document.getElementById('flow-state').textContent=step.state;
    document.getElementById('process-short').textContent=step.short;
    document.querySelector('.flow-label-left').innerHTML=expert?'VOTRE<br>EXPERTISE':'VOTRE PROJET';
    document.querySelector('.flow-label-right').innerHTML=expert?'LE PROJET<br>À FAIRE AVANCER':'L’EXPERTISE<br>DU TERRAIN';
    visual.dataset.step=String(selected);
    previous.disabled=selected===0;next.disabled=selected===steps.length-1;
    detailAnimation?.cancel();
    if(animate&&motionEnabled())detailAnimation=detail.animate([{opacity:.2,transform:'translateY(9px)'},{opacity:1,transform:'none'}],{duration:360,easing:'ease-out'});
    if(focus)tabs[selected].focus();
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>selectStep(index));
    tab.addEventListener('keydown',event=>{
      let target;
      if(event.key==='ArrowRight'||event.key==='ArrowDown')target=(index+1)%steps.length;
      else if(event.key==='ArrowLeft'||event.key==='ArrowUp')target=(index+steps.length-1)%steps.length;
      else if(event.key==='Home')target=0;else if(event.key==='End')target=steps.length-1;else return;
      event.preventDefault();selectStep(target,true);
    });
  });
  perspectives.forEach(button=>button.addEventListener('click',()=>{
    perspective=button.dataset.perspective;
    perspectives.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    selectStep(selected);
  }));
  previous.addEventListener('click',()=>selectStep(selected-1));
  next.addEventListener('click',()=>selectStep(selected+1));
  selectStep(0,false,false);
})();
