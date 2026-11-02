(() => {
  const assetUrl=name=>window.HYC_ASSETS?.[name]||'assets/'+name;
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion');
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.07});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  const header=document.querySelector('.site-header');
  const updateHeader=()=>header.classList.toggle('scrolled',scrollY>15);addEventListener('scroll',updateHeader,{passive:true});updateHeader();
  const menuButton=document.querySelector('.menu-toggle'),menu=document.getElementById('mobile-menu');
  function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Ouvrir le menu');}
  menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');});
  menu.querySelectorAll('a,button').forEach(el=>el.addEventListener('click',closeMenu));
  addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  const joinDialog=document.getElementById('join-dialog');
  document.querySelectorAll('[data-join]').forEach(b=>b.addEventListener('click',()=>{joinDialog.showModal();document.body.classList.add('dialog-open');}));
  joinDialog.querySelector('.dialog-close').addEventListener('click',()=>joinDialog.close());
  joinDialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
  joinDialog.addEventListener('click',e=>{if(e.target===joinDialog){const r=joinDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)joinDialog.close();}});

  const regionPicker=document.getElementById('region-picker'),regions=[...document.querySelectorAll('.atlas-region')];
  const regionNames=Object.fromEntries([...regionPicker.options].map(o=>[o.value,o.textContent]));
  let selectedRegion='all',universe='all';
  const universeData={
    all:{label:'HUMAINE & ANIMALE',professions:['Médecins','Infirmiers','Vétérinaires','Pharmaciens','Sages-femmes','ASV'],copy:'Votre adresse ne définit pas votre potentiel. En visio ou sur le terrain, votre regard peut faire la différence.'},
    human:{label:'LES REGARDS DE LA SANTÉ HUMAINE',professions:['Médecins','Infirmiers','Pharmaciens','Sages-femmes','Kinésithérapeutes','Chirurgiens-dentistes'],copy:'Du cabinet à l’hôpital, votre quotidien nourrit les idées de demain. Partagez ce que votre pratique vous a appris.'},
    animal:{label:'LES REGARDS DE LA SANTÉ ANIMALE',professions:['Vétérinaires praticiens','ASV','Spécialistes','Chercheurs','Enseignants'],copy:'En clinique, sur le terrain ou en recherche, votre expérience éclaire l’innovation en santé animale.'}
  };
  function updateAtlas(){
    const data=universeData[universe];
    document.querySelector('.atlas-map').dataset.universe=universe;
    document.getElementById('atlas-universe-label').textContent=data.label;
    const title=document.getElementById('region-name');
    if(selectedRegion==='all'){title.innerHTML='Des expériences<br>qui se rencontrent.';}else{title.textContent=regionNames[selectedRegion];}
    document.getElementById('region-copy').textContent=selectedRegion==='all'?data.copy:'Votre expérience peut contribuer à des projets de santé depuis votre région, à distance comme sur le terrain.';
    document.getElementById('map-caption').textContent=selectedRegion==='all'?'Sélectionnez une région':regionNames[selectedRegion]+' · '+(universe==='all'?'Tous les regards':universe==='human'?'Santé humaine':'Santé animale');
    document.getElementById('profession-list').replaceChildren(...data.professions.map(name=>{const s=document.createElement('span');s.textContent=name;return s;}));
    regionPicker.value=selectedRegion;
    regions.forEach(r=>{const active=r.dataset.region===selectedRegion;r.classList.toggle('is-selected',active);r.setAttribute('aria-pressed',String(active));});
  }
  regions.forEach(region=>{
    const select=()=>{selectedRegion=region.dataset.region;updateAtlas();};
    region.addEventListener('click',select);region.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();}});
  });
  regionPicker.addEventListener('change',()=>{selectedRegion=regionPicker.value;updateAtlas();});
  document.querySelectorAll('[data-universe]').forEach(button=>button.addEventListener('click',()=>{universe=button.dataset.universe;document.querySelectorAll('[data-universe]').forEach(b=>{if(b.tagName==='BUTTON')b.setAttribute('aria-pressed',String(b===button));});updateAtlas();}));

  const fields={human:{image:'medical-team.webp',alt:'Professionnels de santé en discussion',word:'Transmettre.',missions:[['Challenger une solution.','Partager votre expérience lors d’un entretien ou d’un test utilisateur.'],['Faire grandir les savoirs.','Contribuer à une formation ou transmettre une pratique de terrain.'],['Éclairer un contenu.','Rédiger ou valider une information de santé dans votre spécialité.']]},animal:{image:'veterinaire.jpg',alt:'Une équipe vétérinaire examine un chien',word:'Ouvrir le champ.',missions:[['Éclairer une innovation.','Tester une solution ou participer à un focus group en santé animale.'],['Partager une pratique.','Contribuer à une formation vétérinaire avec votre expérience du terrain.'],['Faire comprendre la santé animale.','Participer à la rédaction ou à la validation de contenus spécialisés.']]}};
  const fieldTabs=[...document.querySelectorAll('[data-field]')];
  function setField(key,focus=false){const data=fields[key];fieldTabs.forEach(b=>{const active=b.dataset.field===key;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;if(active&&focus)b.focus();});const img=document.getElementById('field-image');img.src=assetUrl(data.image);img.alt=data.alt;document.getElementById('field-picture-word').textContent=data.word;document.getElementById('field-panel').setAttribute('aria-labelledby',key+'-tab');document.getElementById('mission-examples').replaceChildren(...data.missions.map(([title,text],i)=>{const row=document.createElement('div'),num=document.createElement('span'),h=document.createElement('h3'),p=document.createElement('p');num.textContent='0'+(i+1);h.textContent=title;p.textContent=text;row.append(num,h,p);return row;}));}
  fieldTabs.forEach((b,i)=>{b.addEventListener('click',()=>setField(b.dataset.field));b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();setField(fieldTabs[1-i].dataset.field,true);}});});

  const voices=[
    {name:'Dr Anne-Sophie Darrigade',role:'Dermatologue et allergologue',quote:'Aujourd’hui, je veux conjuguer médecine, entrepreneuriat et innovation.',context:'Une rencontre avec Solène, puis une mission de formation auprès de confrères dermatologues.',image:'portrait-anne-sophie.png',crop:'anne-crop',universe:'SANTÉ HUMAINE'},
    {name:'Sophie Reynaud',role:'Sage-femme',quote:'La santé des femmes est au cœur de mon engagement.',context:'Un engagement en santé des femmes, partagé dans son portrait de la communauté.',image:'portrait-sophie.png',crop:'sophie-crop',universe:'SANTÉ HUMAINE'},
    {name:'Grégory Santaner',role:'Vétérinaire · Fondateur de VetoNetwork',quote:'Les professionnels de la santé animale ont une connaissance terrain au quotidien dans leurs cliniques.',context:'Un regard de praticien et de partenaire sur l’innovation en santé animale.',image:'portrait-gregory.png',crop:'gregory-crop',universe:'SANTÉ ANIMALE'}
  ];
  let voiceIndex=0;
  function setVoice(index){voiceIndex=(index+voices.length)%voices.length;const v=voices[voiceIndex];document.getElementById('voice-quote').textContent=v.quote;document.getElementById('voice-name').textContent=v.name;document.getElementById('voice-role').textContent=v.role;document.getElementById('voice-context').textContent=v.context;document.getElementById('voice-universe').textContent=v.universe;document.getElementById('voice-index').textContent=String(voiceIndex+1).padStart(2,'0');const img=document.getElementById('voice-image');img.src=assetUrl(v.image);img.alt=v.name;document.getElementById('voice-portrait').className='voice-portrait portrait-crop '+v.crop;}
  document.getElementById('voice-prev').addEventListener('click',()=>setVoice(voiceIndex-1));document.getElementById('voice-next').addEventListener('click',()=>setVoice(voiceIndex+1));

  const steps=[
    {title:'Tout commence<br>par vous.',you:'Vous partagez votre métier, vos sujets d’intérêt et vos envies de collaboration.',us:'Nous découvrons votre profil pour vous proposer des opportunités pertinentes.'},
    {title:'Une envie.<br>Une opportunité.',you:'Vous prenez connaissance d’une mission proposée selon votre profil.',us:'Nous vous présentons le contexte, le format et les modalités de la collaboration.'},
    {title:'Votre temps.<br>Votre choix.',you:'Vous acceptez ou refusez selon votre intérêt et vos disponibilités.',us:'Nous préparons la coordination et les formalités pour que vous puissiez vous concentrer sur la mission.'},
    {title:'Le terrain<br>fait la différence.',you:'Vous apportez votre expertise, vos retours et votre regard de praticien.',us:'Nous assurons le suivi de la collaboration et la gestion administrative de votre rémunération.'}
  ];
  const stepTabs=[...document.querySelectorAll('[data-step]')];
  function setStep(i,focus=false){const s=steps[i];stepTabs.forEach((b,n)=>{b.setAttribute('aria-selected',String(n===i));b.tabIndex=n===i?0:-1;});document.getElementById('step-panel').setAttribute('aria-labelledby','step-tab-'+i);document.getElementById('step-number').textContent=String(i+1).padStart(2,'0');document.getElementById('step-title').innerHTML=s.title;document.getElementById('step-you').textContent=s.you;document.getElementById('step-us').textContent=s.us;if(focus)stepTabs[i].focus();}
  stepTabs.forEach((b,i)=>{b.addEventListener('click',()=>setStep(i));b.addEventListener('keydown',e=>{let n=i;if(['ArrowRight','ArrowDown'].includes(e.key))n=(i+1)%4;else if(['ArrowLeft','ArrowUp'].includes(e.key))n=(i+3)%4;else if(e.key==='Home')n=0;else if(e.key==='End')n=3;else return;e.preventDefault();setStep(n,true);});});
  addEventListener('message',event=>{if(event.source===parent&&event.data?.type==='hyc-motion')document.documentElement.classList.toggle('motion-off',!event.data.enabled);});
})();
