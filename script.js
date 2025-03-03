const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');
const menuItems = sidebar.querySelectorAll('ul li');

// ハンバーガーメニューをクリックしたらサイドバーを開閉
menuIcon.addEventListener('click', (event) => {
    sidebar.classList.toggle('open');

    if (sidebar.classList.contains('open')) {
        // 1つずつアニメーションを遅らせる
        menuItems.forEach((item, index) => {
            item.style.transitionDelay = `${0.1 * index}s`;
        });
    } else {
        // 閉じるときは遅延をリセット
        menuItems.forEach((item) => {
            item.style.transitionDelay = '0s';
        });
    }

    event.stopPropagation(); // クリックイベントの伝播を防ぐ
});

// サイドバー以外をクリックすると閉じる
document.addEventListener('click', (event) => {
    if (sidebar.classList.contains('open') && !sidebar.contains(event.target) && event.target !== menuIcon) {
        sidebar.classList.remove('open');
        
        // アニメーション遅延をリセット
        menuItems.forEach((item) => {
            item.style.transitionDelay = '0s';
        });
    }
});
