(() => {
  const assetUrl = name => window.HYC_ASSETS?.[name] || 'assets/' + name;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!reduceMotion.matches) document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), {threshold: .08});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const header = document.querySelector('.site-header');
  const updateHeader = () => header.classList.toggle('scrolled', scrollY > 15);
  window.addEventListener('scroll', updateHeader, {passive: true}); updateHeader();

  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const closeMenu = () => { menu.hidden = true; menuButton.setAttribute('aria-expanded','false'); menuButton.setAttribute('aria-label','Ouvrir le menu'); };
  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menu.hidden = !opening; menuButton.setAttribute('aria-expanded',String(opening));
    menuButton.setAttribute('aria-label',opening?'Fermer le menu':'Ouvrir le menu');
  });
  menu.querySelectorAll('a,button').forEach(el => el.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e => { if(e.key==='Escape') closeMenu(); });

  // Affichage fidèle des logos à partir du visuel transmis, sans redessin.
  const references = [
    ['UFSBD',130,433,315,95],['Pierre Fabre Oral Care',595,435,350,95],
    ['VIDAL',1035,450,250,65],['Philips',1475,450,335,90],
    ['Alan',150,625,275,80],['PmSm',624,618,258,92],
    ['GRAAD Santé',1020,600,415,120],['AppThera',1435,620,385,80],
    ['Dassault Systèmes',120,790,330,110],['Interaction Healthcare',610,790,340,100],
    ['Olaqin',1070,796,200,100],['Sova',1520,810,235,80]
  ];
  const track=document.getElementById('logo-track');
  const group=document.createElement('div'); group.className='logo-group';
  group.setAttribute('role','list'); group.setAttribute('aria-label','Références');
  references.forEach(([name,x,y,w,h]) => {
    const scale=Math.min(154/w,48/h), item=document.createElement('span');
    item.className='logo-crop';item.setAttribute('role','listitem');item.setAttribute('aria-label',name);
    const cleanAssets={'VIDAL':'ref-vidal.svg','GRAAD Santé':'ref-graad.svg','AppThera':'ref-appthera.png'};
    const img=document.createElement('img'); img.src=assetUrl(cleanAssets[name]||'references.jpg');img.alt=name;
    img.width=1920;img.height=1080;img.loading='eager';
    if(cleanAssets[name]){
      Object.assign(img.style,{width:'150px',height:'48px',left:'10px',top:'8.5px',objectFit:'contain'});
    }else{
      Object.assign(img.style,{width:(1920*scale)+'px',height:(1080*scale)+'px',left:((170-w*scale)/2-x*scale)+'px',top:((65-h*scale)/2-y*scale)+'px'});
    }
    item.append(img);group.append(item);
  });
  track.append(group);
  const duplicate=group.cloneNode(true); duplicate.setAttribute('aria-hidden','true'); duplicate.removeAttribute('aria-label');
  duplicate.querySelectorAll('img').forEach(img=>img.alt=''); track.append(duplicate);
  const marqueeButton=document.getElementById('marquee-toggle');
  marqueeButton.addEventListener('click',()=>{
    const paused=track.classList.toggle('is-paused');
    marqueeButton.setAttribute('aria-pressed',String(paused));
    marqueeButton.setAttribute('aria-label',paused?'Reprendre le défilement des logos':'Mettre le défilement des logos en pause');
    marqueeButton.querySelector('span').textContent=paused?'▷':'Ⅱ';
  });

  const offers=[
    {label:'COMPRENDRE AVANT D’AVANCER',title:'Et si vous posiez la question<br>à ceux qui vivent le terrain ?',description:'Testez une idée, challengez un dispositif, comprenez les usages. Nous réunissons les professionnels de santé pertinents pour votre projet.',image:'medical-research.webp',alt:'Un professionnel de santé au microscope'},
    {label:'LES BONNES PERSONNES, AU BON MOMENT',title:'Une expertise qui fait<br>la différence dans votre projet.',description:'Formateur, investigateur clinique, membre de comité scientifique : nous identifions les profils adaptés à votre sujet, en santé humaine comme animale.',image:'medical-team.webp',alt:'Des professionnels de santé échangent entre collègues'},
    {label:'DU SAVOIR AUX CONTENUS',title:'Des contenus de santé.<br>La force de l’expertise en plus.',description:'Rédaction, relecture et validation : des professionnels de santé vous accompagnent pour créer des contenus pertinents et ancrés dans la pratique.',image:'mission.jpg',alt:'Une équipe échange autour d’un projet de santé'},
    {label:'LE TERRAIN A BEAUCOUP À TRANSMETTRE',title:'Les savoirs évoluent.<br>Les formations aussi.',description:'DPC, formation médicale hors DPC, formation vétérinaire : construisons des parcours pédagogiques avec les professionnels qui maîtrisent votre sujet.',image:'veterinaire-terrain.jpg',alt:'Une vétérinaire au bloc opératoire'}
  ];
  const tabs=[...document.querySelectorAll('[data-offer]')];
  function selectOffer(index,focus=false){
    const offer=offers[index];
    tabs.forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
    document.getElementById('offer-panel').setAttribute('aria-labelledby','offer-tab-'+index);
    document.getElementById('offer-label').textContent=offer.label;
    document.getElementById('offer-title').innerHTML=offer.title;
    document.getElementById('offer-description').textContent=offer.description;
    const img=document.getElementById('offer-image');img.src=assetUrl(offer.image);img.alt=offer.alt;
    if(focus) tabs[index].focus();
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>selectOffer(index));
    tab.addEventListener('keydown',e=>{
      let next=index;
      if(e.key==='ArrowDown'||e.key==='ArrowRight') next=(index+1)%tabs.length;
      else if(e.key==='ArrowUp'||e.key==='ArrowLeft') next=(index+tabs.length-1)%tabs.length;
      else if(e.key==='Home') next=0;else if(e.key==='End') next=tabs.length-1;else return;
      e.preventDefault();selectOffer(next,true);
    });
  });
  document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>{
    const dialog=document.getElementById(button.dataset.dialog+'-dialog');
    dialog.showModal(); document.body.classList.add('dialog-open');
  }));
  document.querySelectorAll('dialog').forEach(dialog=>{
    dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
    dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  });
  window.addEventListener('message',event=>{
    if(event.source!==window.parent || event.data?.type!=='hyc-motion')return;
    document.documentElement.classList.toggle('motion-off',!event.data.enabled);
  });
})();
