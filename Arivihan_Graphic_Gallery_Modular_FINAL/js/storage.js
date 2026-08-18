const STORAGE_KEY='arivihan_graphic_gallery_v5';
const DEFAULT_FOLDERS=[
  'Thumbnails',
  'Social Media Post',
  'Google Ads',
  'Banner',
  'Pamplet',
  'Community Post',
  'Background Reference'
];

window.state={
  folders:[...DEFAULT_FOLDERS],
  currentFolder:'Thumbnails',
  images:[],
  thumbnailSubfolders:[]
};

function loadState(){
  try{
    const saved=localStorage.getItem(STORAGE_KEY);
    if(saved) window.state=JSON.parse(saved);
  }catch(e){}

  if(!Array.isArray(state.folders)) state.folders=[...DEFAULT_FOLDERS];
  if(!Array.isArray(state.thumbnailSubfolders)) state.thumbnailSubfolders=[];
  if(!Array.isArray(state.images)) state.images=[];

  state.folders=DEFAULT_FOLDERS.concat(
    state.thumbnailSubfolders.map(x=>'Thumbnails/'+x)
  );

  if(!state.currentFolder || !state.folders.includes(state.currentFolder)){
    state.currentFolder='Thumbnails';
  }
}

function saveState(){
  try{
    localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
  }catch(e){
    alert('Browser storage is full. Please delete old images or use smaller files.');
  }
}
