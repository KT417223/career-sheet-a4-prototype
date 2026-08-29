const sampleMemo = `JavaとSpring Bootを使って業務システムの開発をしていました。
主に既存機能の改修やバグ修正を担当しました。
画面の入力チェックを追加したり、検索条件を追加したりしました。
SQLも少し書きました。
テストもやりました。

別の案件では、社内向けの管理画面をReactで修正しました。
ボタン追加や表示項目の変更などをしました。
Gitを使ってチーム開発をしていました。

まだ設計はあまりやっていませんが、詳細設計書を見ながら実装しました。
今後はバックエンドをもっとできるようになりたいです。`;

const checks = [
  ["5W1H", "不足あり", "Whatはありますが、Who、Why、Howが弱いです。"],
  ["誰主導", "不足あり", "自分で判断した範囲と指示を受けた範囲が分かりません。"],
  ["規模感", "不足あり", "期間、チーム人数、利用者、処理件数がありません。"],
  ["役割", "一部不足", "実装・テスト経験は見えますが、担当工程が曖昧です。"],
  ["数字・成果", "不足あり", "問い合わせ削減や作業時間短縮などの材料が必要です。"],
  ["技術の使い方", "一部不足", "Java、Spring Boot、Reactを何に使ったかを補うと強くなります。"],
  ["工夫・改善", "不足あり", "調査方法、影響範囲確認、レビュー対応の説明が足りません。"],
  ["今後の志向", "十分", "バックエンド志向は明確に書けています。"],
];

const questions = [
  {
    text: "その業務システムは誰が使うものでしたか？ 社内向け、取引先向け、一般ユーザー向けのどれですか？",
    answer: "物流会社の倉庫担当者が使う在庫管理システムでした。",
  },
  {
    text: "チーム人数と、あなたが参加していた期間を教えてください。",
    answer: "PM1人、リーダー1人、エンジニア4人の6名体制で、10か月ほど参加しました。",
  },
  {
    text: "検索条件追加では、画面だけでなくバックエンドやSQLも修正しましたか？",
    answer: "画面、Controller、Service、Repository、SQLを修正しました。",
  },
  {
    text: "不具合修正では、どのような原因を調べ、どう直しましたか？",
    answer: "CSV出力で特定文字が入ると列ずれする問題を調査し、エスケープ処理を追加しました。",
  },
  {
    text: "改修によって、問い合わせ削減、作業時間短縮、手作業削減などにつながったものはありますか？",
    answer: "検索条件追加で手作業の絞り込みが減り、CSV不具合は月に数回あった問い合わせを減らせました。",
  },
];

const resumeHtml = `
  <h3>職務経歴書</h3>
  <div class="resume-meta"><span>氏名: 山田 太郎</span><span>作成日: 2026年8月29日</span></div>

  <h4>職務要約</h4>
  <p>Webアプリケーション開発を約1年8か月経験し、Java / Spring Bootを用いた業務システムの機能改修、不具合修正、テストを担当してきました。物流会社向け在庫管理システムでは、検索条件追加、入力チェック追加、CSV出力不具合の修正を担当し、画面からバックエンド、SQLまで既存構成を確認しながら改修を行いました。今後はバックエンド開発を軸に、設計意図を理解した実装力と、運用改善につながる提案力を高めたいと考えています。</p>

  <h4>技術スキル</h4>
  <p>言語: Java, JavaScript, SQL<br>
  フレームワーク: Spring Boot, React<br>
  DB: PostgreSQL<br>
  インフラ/クラウド: Linux基礎<br>
  ツール: Git, GitHub, Backlog, IntelliJ IDEA, VS Code<br>
  その他: 単体テスト, 結合テスト, 既存機能改修, 不具合調査</p>

  <h4>主なプロジェクト経験</h4>
  <p class="project-title">【プロジェクト1】物流会社向け在庫管理システム改修</p>
  <p>期間: 10か月 / チーム規模: 6名 / 担当役割: 詳細設計書をもとにした実装、単体テスト、結合テストの一部<br>
  使用技術: Java, Spring Boot, PostgreSQL, JavaScript, Git</p>
  <ul>
    <li>在庫検索画面の検索条件追加に伴い、画面、Controller、Service、Repository、SQLを修正</li>
    <li>CSV出力時に特定文字で列ずれが発生する不具合を調査し、エスケープ処理を追加</li>
    <li>検索条件追加により、担当者がCSV出力後に手作業で絞り込む負担を軽減</li>
  </ul>

  <p class="project-title">【プロジェクト2】社内向け申請管理画面の改修</p>
  <p>期間: 5か月 / チーム規模: 3名 / 担当役割: フロントエンド改修、表示確認、レビュー対応<br>
  使用技術: React, JavaScript, Git</p>
  <ul>
    <li>申請一覧画面への表示項目追加、申請ステータスによる絞り込み表示を追加</li>
    <li>既存コンポーネントを流用し、画面ごとの差分が増えすぎないように実装</li>
    <li>レビュー指摘をもとに、命名やコンポーネント分割を見直し、読みやすいコードを意識</li>
  </ul>

  <h4>強み</h4>
  <ul>
    <li>既存コードを読み解き、画面からバックエンド、SQLまで影響範囲を確認しながら改修できる</li>
    <li>不具合の再現条件を整理し、原因調査から修正、確認まで粘り強く進められる</li>
    <li>レビュー指摘を受け止め、保守性を意識して改善できる</li>
  </ul>

  <h4>今後の志向</h4>
  <p>バックエンド開発を軸に、詳細設計から実装、テスト、運用改善まで一貫して対応できるエンジニアを目指しています。今後はSpring BootでのAPI設計やDB設計の理解を深め、ユーザーや運用担当者にとって使いやすい業務システム開発に関わりたいと考えています。</p>
`;

const panels = {
  input: document.querySelector("#input-panel"),
  diagnosis: document.querySelector("#diagnosis-panel"),
  questions: document.querySelector("#questions-panel"),
  output: document.querySelector("#output-panel"),
};

const toast = document.querySelector("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function goTo(step) {
  Object.entries(panels).forEach(([name, panel]) => {
    panel.classList.toggle("active", name === step);
  });
  document.querySelectorAll(".step").forEach((button) => {
    button.classList.toggle("active", button.dataset.step === step);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderChecks() {
  const container = document.querySelector("#checks");
  container.innerHTML = checks
    .map(
      ([label, status, comment]) => `
        <article class="check-card">
          <strong>${label}<span class="status">${status}</span></strong>
          <p>${comment}</p>
        </article>
      `,
    )
    .join("");
}

function renderQuestions() {
  const container = document.querySelector("#question-list");
  container.innerHTML = questions
    .map(
      (question, index) => `
        <label class="question-card">
          <span>${index + 1}</span>
          <p>${question.text}</p>
          <textarea>${question.answer}</textarea>
        </label>
      `,
    )
    .join("");
}

function getResumeText() {
  return document.querySelector("#resume-paper").innerText.trim();
}

document.querySelector("#career-memo").value = sampleMemo;
document.querySelector("#resume-paper").innerHTML = resumeHtml;
renderChecks();
renderQuestions();

document.querySelector("#fill-sample").addEventListener("click", () => {
  document.querySelector("#career-memo").value = sampleMemo;
  showToast("サンプルを入力しました");
});

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => goTo(button.dataset.next));
});

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(`#${button.dataset.scroll}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

document.querySelectorAll(".step").forEach((button) => {
  button.addEventListener("click", () => goTo(button.dataset.step));
});

document.querySelector("#copy-resume").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(getResumeText());
    showToast("職務経歴書をコピーしました");
  } catch {
    showToast("コピーできませんでした");
  }
});

document.querySelector("#print-resume").addEventListener("click", () => {
  window.print();
});
