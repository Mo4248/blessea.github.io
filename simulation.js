var Module = {
  onRuntimeInitialized: function() {
      document.getElementById("runButton").onclick = function() {
          // シミュレーションを実行
          Module._main();
      };
  },
  print: function(text) {
      // 結果を表示するためのエレメントを取得
      var outputElement = document.getElementById("output");
      outputElement.innerHTML += text + "<br>"; // 出力をHTMLに追加
  }
};
