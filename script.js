const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');
const content = document.querySelector('.content'); // コンテンツ部分

menuIcon.addEventListener('click', (event) => {
    sidebar.classList.toggle('open');
    event.stopPropagation(); // クリックイベントが body に伝播しないようにする
});

// サイドバー以外の場所をクリックすると閉じる
document.body.addEventListener('click', (event) => {
    if (sidebar.classList.contains('open') && !sidebar.contains(event.target) && event.target !== menuIcon) {
        sidebar.classList.remove('open');
    }
});
