// 単語データ（仮データ）
const words = [
    { korean: "사랑", meaning: "愛" },
    { korean: "행복", meaning: "幸福" },
    { korean: "시간", meaning: "時間" },
    { korean: "희망", meaning: "希望" },
  ];
  
  // DOM 要素の取得
  const searchInput = document.getElementById("search");
  const wordList = document.getElementById("word-list");
  
  // 単語リストの表示
  function displayWords(filteredWords) {
    wordList.innerHTML = ""; // リストをリセット
    filteredWords.forEach((word) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${word.korean}</strong>: ${word.meaning}`;
      wordList.appendChild(li);
    });
  }
  
  // 検索機能
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filteredWords = words.filter((word) =>
      word.korean.toLowerCase().includes(keyword) ||
      word.meaning.toLowerCase().includes(keyword)
    );
    displayWords(filteredWords);
  });
  
  // 初期表示
  displayWords(words);
  