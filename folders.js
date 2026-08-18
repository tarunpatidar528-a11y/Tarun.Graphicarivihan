const MAIN_FOLDER_ICONS={
  'Thumbnails':'🖼️','Social Media Post':'📱','Google Ads':'📣','Banner':'🖥️',
  'Pamplet':'📄','Community Post':'👥','Background Reference':'🧩'
};
function renderFolders(){
  const box=document.getElementById('folders');box.innerHTML='';
  const main=state.folders.filter(f=>!f.startsWith('Thumbnails/'));
  main.forEach(folder=>{
    const count=state.images.filter(x=>x.folder===folder).length;
    const d=document.createElement('div');d.className='folder '+(state.currentFolder===folder?'active':'');
    d.innerHTML=`<span>${MAIN_FOLDER_ICONS[folder]||'📂'}</span><span>${escapeHtml(folder)}</span><span class="folder-count">${count}</span>`;
    d.onclick=()=>{state.currentFolder=folder;document.getElementById('searchInput').value='';renderAll()};box.appendChild(d);
    if(folder==='Thumbnails'){
      const add=document.createElement('button');add.className='subfolder-add';add.textContent='+ Add Folder';add.onclick=(e)=>{e.stopPropagation();createThumbnailFolder()};box.appendChild(add);
      state.thumbnailSubfolders.forEach(sub=>{
        const full='Thumbnails/'+sub;
        const subCount=state.images.filter(x=>x.folder===full).length;
        const sd=document.createElement('div');sd.className='folder subfolder '+(state.currentFolder===full?'active':'');
        sd.innerHTML=`<span>📁</span><span>${escapeHtml(sub)}</span><span class="folder-count">${subCount}</span>`;
        sd.onclick=()=>{state.currentFolder=full;document.getElementById('searchInput').value='';renderAll()};box.appendChild(sd);
      });
    }
  });
}
function createThumbnailFolder(){
  const n=prompt('Thumbnail folder name:');if(!n)return;
  const name=n.trim().replace(/\s+/g,' ');if(!name)return;
  if(state.thumbnailSubfolders.some(x=>x.toLowerCase()===name.toLowerCase()))return alert('Folder already exists.');
  state.thumbnailSubfolders.push(name);state.folders.push('Thumbnails/'+name);state.currentFolder='Thumbnails/'+name;saveState();renderAll();
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
