// 曲をクリックすると歌詞を表示/非表示にする
document.querySelectorAll('.song-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});
