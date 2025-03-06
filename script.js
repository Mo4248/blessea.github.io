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

// 検索機能
document.addEventListener('DOMContentLoaded', function() {
    const searchType = document.getElementById('searchType');
    const searchInput = document.getElementById('searchInput');
    const writerFilter = document.getElementById('writerFilter');
    const composerFilter = document.getElementById('composerFilter');
    const albumFilter = document.getElementById('albumFilter');
    const liveFilter = document.getElementById('liveFilter');
    const artistFilter = document.getElementById('artistFilter');
    const songItems = document.querySelectorAll('.song-item');
    const sortBy = document.getElementById('sortBy');
    const sortOrder = document.getElementById('sortOrder');
    const songList = document.querySelector('.song-list');
    const searchFilters = document.querySelector('.search-filters');

    // 検索タイプに応じてプレースホルダーとフィルターの表示を更新
    function updateSearchInterface() {
        const type = searchType.value;
        const searchRow = document.querySelector('.search-row');
        const searchFilters = document.querySelector('.search-filters');
        
        // 全てのフィルターを非表示に
        searchInput.style.display = 'block';
        writerFilter.style.display = 'none';
        composerFilter.style.display = 'none';
        albumFilter.style.display = 'none';
        liveFilter.style.display = 'none';
        artistFilter.style.display = 'none';

        // 並べ替えオプションを更新
        updateSortOptions(type);
        
        switch(type) {
            case 'free':
                searchInput.placeholder = 'フリーワードで検索...';
                searchFilters.style.display = 'none';
                break;
            case 'title':
                searchInput.placeholder = '曲名を入力...';
                searchFilters.style.display = 'none';
                break;
            case 'lyrics':
                searchInput.placeholder = '歌詞を入力...';
                searchFilters.style.display = 'none';
                break;
            case 'credit':
                searchInput.style.display = 'none';
                searchFilters.style.display = 'grid';
                writerFilter.style.display = 'block';
                composerFilter.style.display = 'block';
                break;
            case 'album':
                searchInput.style.display = 'none';
                searchFilters.style.display = 'grid';
                albumFilter.style.display = 'block';
                break;
            case 'live':
                searchInput.style.display = 'none';
                searchFilters.style.display = 'grid';
                liveFilter.style.display = 'block';
                break;
            case 'artist':
                searchInput.style.display = 'none';
                searchFilters.style.display = 'grid';
                artistFilter.style.display = 'block';
                break;
        }
    }

    // 検索機能を更新
    function performSearch() {
        const type = searchType.value;
        const searchTerm = searchInput.value.toLowerCase();
        const writer = writerFilter.value.toLowerCase();
        const composer = composerFilter.value.toLowerCase();
        const album = albumFilter.value.toLowerCase();
        const live = liveFilter.value.toLowerCase();
        const artist = artistFilter.value.toLowerCase();

        // カタカナをひらがなに変換する関数
        function kataToHira(str) {
            return str.replace(/[\u30A1-\u30F6]/g, function(match) {
                var chr = match.charCodeAt(0) - 0x60;
                return String.fromCharCode(chr);
            });
        }

        // ひらがなをカタカナに変換する関数
        function hiraToKata(str) {
            return str.replace(/[\u3041-\u3096]/g, function(match) {
                var chr = match.charCodeAt(0) + 0x60;
                return String.fromCharCode(chr);
            });
        }

        // テキストを検索用に正規化する関数
        function normalizeText(text) {
            const lower = text.toLowerCase();
            const hira = kataToHira(lower);
            const kata = hiraToKata(lower);
            return [lower, hira, kata];
        }

        // 検索語を含むかチェックする関数
        function includesSearchTerm(text, term) {
            const [normalizedText, hiraText, kataText] = normalizeText(text);
            const [normalizedTerm, hiraTerm, kataTerm] = normalizeText(term);
            return normalizedText.includes(normalizedTerm) || 
                   hiraText.includes(hiraTerm) || 
                   kataText.includes(kataTerm);
        }

        songItems.forEach(item => {
            let matches = false;
            
            switch(type) {
                case 'free':
                    matches = includesSearchTerm(item.textContent, searchTerm);
                    break;
                case 'title':
                    matches = includesSearchTerm(item.querySelector('h3').textContent, searchTerm);
                    break;
                case 'lyrics':
                    matches = includesSearchTerm(item.querySelector('.lyrics-beginning').textContent, searchTerm);
                    break;
                case 'credit':
                    const songwriting = item.querySelector('.songwriting').textContent.toLowerCase();
                    const dataWriter = (item.dataset.writer || '').toLowerCase();
                    const dataComposer = (item.dataset.composer || '').toLowerCase();

                    const writerMatches = !writer || 
                        includesSearchTerm(songwriting, writer) || 
                        includesSearchTerm(dataWriter, writer);

                    const composerMatches = !composer || 
                        includesSearchTerm(songwriting, composer) || 
                        includesSearchTerm(dataComposer, composer);

                    matches = writerMatches && composerMatches;
                    break;
                case 'album':
                    matches = (!album || (item.dataset.album || '').toLowerCase() === album);
                    break;
                case 'live':
                    matches = (!live || (item.dataset.lives || '').toLowerCase().includes(live));
                    break;
                case 'artist':
                    matches = (!artist || (item.dataset.artist || '').toLowerCase().includes(artist));
                    break;
            }

            item.style.display = matches ? '' : 'none';
        });

        // 検索結果が0件の場合のメッセージ表示
        const noResults = document.querySelector('.no-results');
        const hasVisibleItems = Array.from(songItems).some(item => item.style.display !== 'none');
        
        if (!hasVisibleItems) {
            if (!noResults) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.textContent = '検索結果が見つかりませんでした';
                document.querySelector('.song-list').appendChild(message);
            }
        } else if (noResults) {
            noResults.remove();
        }

        // 検索後に並べ替えを適用
        sortSongs();
    }

    // 並べ替えオプションを動的に更新する関数
    function updateSortOptions(searchType) {
        const sortBy = document.getElementById('sortBy');
        
        // 基本的な並べ替えオプション
        let options = `
            <option value="">並べ替え項目</option>
            <option value="title">曲名</option>
            <option value="release">リリース日</option>
        `;
        
        // 検索タイプに応じて追加のオプションを表示
        switch(searchType) {
            case 'album':
                if (albumFilter.value) {
                    options = `
                        <option value="">並べ替え項目</option>
                        <option value="title">曲名</option>
                        <option value="release">リリース日</option>
                        <option value="album-order">アルバム収録順</option>
                    `;
                }
                break;
            case 'live':
                const selectedLive = liveFilter.value;
                if (selectedLive) {
                    const liveName = selectedLive.toLowerCase().replace(/\s+/g, '');
                    options = `
                        <option value="">並べ替え項目</option>
                        <option value="title">曲名</option>
                        <option value="release">リリース日</option>
                        <option value="${liveName}-order">セットリスト順</option>
                    `;
                }
                break;
            default:
                // デフォルトの並べ替えオプション（すでに設定済み）
                break;
        }
        
        // オプションを更新
        sortBy.innerHTML = options;
    }

    // 並べ替え関数を更新
    function sortSongs() {
        const songs = Array.from(songItems);
        const sortType = sortBy.value;
        const order = sortOrder.value;

        if (!sortType) return;

        songs.sort((a, b) => {
            let valueA, valueB;

            if (sortType === 'title') {
                valueA = a.querySelector('h3').textContent;
                valueB = b.querySelector('h3').textContent;
            } else if (sortType === 'release') {
                valueA = a.dataset.release || '9999-99-99';
                valueB = b.dataset.release || '9999-99-99';
                return order === 'asc' ? 
                    valueA.localeCompare(valueB) : 
                    valueB.localeCompare(valueA);
            } else if (sortType === 'album-order') {
                valueA = parseInt(a.dataset.albumOrder) || 999;
                valueB = parseInt(b.dataset.albumOrder) || 999;
                return order === 'asc' ? valueA - valueB : valueB - valueA;
            } else if (sortType.endsWith('-order')) {
                valueA = parseInt(a.dataset[sortType]) || 999;
                valueB = parseInt(b.dataset[sortType]) || 999;
                return order === 'asc' ? valueA - valueB : valueB - valueA;
            }

            if (order === 'asc') {
                return valueA.localeCompare(valueB, 'ja');
            } else {
                return valueB.localeCompare(valueA, 'ja');
            }
        });

        // DOMを並べ替え
        songs.forEach(song => {
            const parent = song.parentElement;
            if (parent.classList.contains('song-link')) {
                songList.appendChild(parent);
            } else {
                songList.appendChild(song);
            }
        });
    }

    // フィルター変更時のイベントリスナーを更新
    albumFilter.addEventListener('change', () => {
        updateSortOptions('album');
        performSearch();
    });
    
    liveFilter.addEventListener('change', () => {
        if (searchType.value === 'live') {
            updateSortOptions('live');
        }
        performSearch();
    });

    // 初期化時にソートオプションを設定
    updateSortOptions('album');

    // イベントリスナーを追加
    sortBy.addEventListener('change', sortSongs);
    sortOrder.addEventListener('change', sortSongs);

    // 検索タイプ変更時のイベントリスナーを追加
    searchType.addEventListener('change', () => {
        updateSearchInterface();
        searchInput.value = '';
        performSearch();
    });

    // 初期化時に検索インターフェースを設定
    updateSearchInterface();

    // 既存のイベントリスナー
    searchInput.addEventListener('input', performSearch);
    writerFilter.addEventListener('change', performSearch);
    composerFilter.addEventListener('change', performSearch);
    albumFilter.addEventListener('change', performSearch);
    liveFilter.addEventListener('change', performSearch);
});
