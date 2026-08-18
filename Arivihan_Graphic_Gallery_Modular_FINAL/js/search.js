function getVisibleImages(){
  const q=document.getElementById('searchInput').value.trim().toLowerCase();

  return state.images
    .filter(x=>x.folder===state.currentFolder)
    .filter(x=>{
      if(!q) return true;
      return [x.name,x.text,(x.tags||[]).join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
}
