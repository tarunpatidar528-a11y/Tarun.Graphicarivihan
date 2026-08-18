const STORAGE_KEY='arivihan_graphic_gallery_v4';
const DEFAULT_FOLDERS=['Thumbnails','Social Media Post','Google Ads','Banner','Pamplet','Community Post','Background Reference'];
window.state={folders:[...DEFAULT_FOLDERS],currentFolder:'Thumbnails',images:[],thumbnailSubfolders:[]};
function loadState(){
  try{const s=localStorage.getItem(STORAGE_KEY);if(s)window.state=JSON.parse(s)}catch(e){}
  if(!Array.isArray(state.folders))state.folders=[...DEFAULT_FOLDERS];
  state.folders=DEFAULT_FOLDERS.concat(state.folders.filter(f=>!DEFAULT_FOLDERS.includes(f)&&String(f).startsWith('Thumbnails/')));
  if(!Array.isArray(state.thumbnailSubfolders)){
    state.thumbnailSubfolders=state.folders.filter(f=>f.startsWith('Thumbnails/')).map(f=>f.slice('Thumbnails/'.length));
  }
  state.thumbnailSubfolders=state.thumbnailSubfolders.filter((v,i,a)=>v&&a.indexOf(v)===i);
  state.thumbnailSubfolders.forEach(n=>{const f='Thumbnails/'+n;if(!state.folders.includes(f))state.folders.push(f)});
  if(!state.currentFolder||!state.folders.includes(state.currentFolder))state.currentFolder='Thumbnails';
  if(!Array.isArray(state.images))state.images=[];
}
function saveState(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}catch(e){alert('Browser storage is full. Large image libraries should use cloud storage.')}}
