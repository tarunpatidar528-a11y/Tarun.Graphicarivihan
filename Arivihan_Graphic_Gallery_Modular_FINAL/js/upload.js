function fileToDataURL(file){
  return new Promise((resolve,reject)=>{
    const r=new FileReader();
    r.onload=()=>resolve(r.result);
    r.onerror=reject;
    r.readAsDataURL(file);
  });
}

function makeTagsFromFilename(name){
  const clean=name.replace(/\.[^.]+$/,'').replace(/[_-]+/g,' ');
  const words=clean.split(/\s+/).filter(Boolean);
  const tags=[];
  const known=[
    'VVIP','MATHS','MATH','ENGLISH','HINDI','PHYSICS','CHEMISTRY',
    'BIOLOGY','NEET','MP BOARD','BIHAR BOARD','UP BOARD',
    'CLASS 10','CLASS 12','15 AUGUST','INDEPENDENCE DAY'
  ];

  const upper=clean.toUpperCase();
  known.forEach(k=>{
    if(upper.includes(k) && !tags.includes(k)) tags.push(k);
  });

  words.slice(0,5).forEach(w=>{
    if(w.length>2 && !tags.includes(w.toUpperCase())) tags.push(w.toUpperCase());
  });

  return tags.slice(0,8);
}

async function handleUpload(files){
  for(const file of files){
    if(!file.type.startsWith('image/')) continue;

    const item={
      id:Date.now()+'_'+Math.random().toString(36).slice(2),
      name:file.name,
      folder:state.currentFolder,
      data:await fileToDataURL(file),
      text:'',
      tags:makeTagsFromFilename(file.name),
      date:new Date().toISOString()
    };

    state.images.unshift(item);
    saveState();
    renderAll();
  }

  document.getElementById('imageInput').value='';
}
