function showViewer(src){document.getElementById('viewerImage').src=src;document.getElementById('viewerModal').classList.add('show')}
function hideViewer(){document.getElementById('viewerModal').classList.remove('show')}
document.getElementById('closeViewer').onclick=hideViewer;
document.getElementById('viewerModal').onclick=e=>{if(e.target.id==='viewerModal')hideViewer()};
document.addEventListener('keydown',e=>{if(e.key==='Escape')hideViewer()});
