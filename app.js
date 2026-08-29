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
  ["5W1H", "不足あり", "missing", "Whatはありますが、Who、Why、Howが弱いです。"],
  ["誰主導", "不足あり", "missing", "自分で判断した範囲と指示を受けた範囲が分かりません。"],
  ["規模感", "不足あり", "missing", "期間、チーム人数、利用者、処理件数がありません。"],
  ["役割", "一部不足", "partial", "実装・テスト経験は見えますが、担当工程が曖昧です。"],
  ["数字・成果", "不足あり", "missing", "問い合わせ削減や作業時間短縮などの材料が必要です。"],
  ["技術の使い方", "一部不足", "partial", "Java、Spring Boot、Reactを何に使ったかを補うと強くなります。"],
  ["工夫・改善", "不足あり", "missing", "調査方法、影響範囲確認、レビュー対応の説明が足りません。"],
  ["今後の志向", "十分", "ok", "バックエンド志向は明確に書けています。"],
];

const questions = [
  {
    text: "その業務システムは誰が使うものでしたか？ 社内向け、取引先向け、一般ユーザー向けのどれですか？",
    placeholder: "例: 物流会社の倉庫担当者が使う在庫管理システムでした。",
    sampleAnswer: "物流会社の倉庫担当者が使う在庫管理システムでした。",
  },
  {
    text: "チーム人数と、あなたが参加していた期間を教えてください。",
    placeholder: "例: PM1人、リーダー1人、エンジニア4人の6名体制で、10か月ほど参加しました。",
    sampleAnswer: "PM1人、リーダー1人、エンジニア4人の6名体制で、10か月ほど参加しました。",
  },
  {
    text: "検索条件追加では、画面だけでなくバックエンドやSQLも修正しましたか？",
    placeholder: "例: 画面、Controller、Service、Repository、SQLを修正しました。",
    sampleAnswer: "画面、Controller、Service、Repository、SQLを修正しました。",
  },
  {
    text: "不具合修正では、どのような原因を調べ、どう直しましたか？",
    placeholder: "例: CSV出力で特定文字が入ると列ずれする問題を調査し、エスケープ処理を追加しました。",
    sampleAnswer: "CSV出力で特定文字が入ると列ずれする問題を調査し、エスケープ処理を追加しました。",
  },
  {
    text: "改修によって、問い合わせ削減、作業時間短縮、手作業削減などにつながったものはありますか？",
    placeholder: "例: 検索条件追加で手作業の絞り込みが減り、CSV不具合は月に数回あった問い合わせを減らせました。",
    sampleAnswer: "検索条件追加で手作業の絞り込みが減り、CSV不具合は月に数回あった問い合わせを減らせました。",
  },
];

const draftFields = [
  "person-name",
  "experience",
  "current-role",
  "target-role",
  "target-context",
  "career-memo",
];

const draftKey = "career-sheet-a4-draft-v1";
const resumeRenderDelay = 280;
let draftTimer;
let resumeTimer;

function getTodayText() {
  const date = new Date();
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function getFieldValue(id, fallback = "") {
  return document.querySelector(`#${id}`)?.value.trim() || fallback;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getMemoInsights() {
  const memo = getFieldValue("career-memo", "");
  const lowerMemo = memo.toLowerCase();
  const technologyCandidates = [
    "Java",
    "Spring Boot",
    "React",
    "JavaScript",
    "TypeScript",
    "Go",
    "Kubernetes",
    "Docker",
    "AWS",
    "GCP",
    "Azure",
    "PostgreSQL",
    "MySQL",
    "SQL",
    "Linux",
    "Git",
    "GitHub",
  ];
  const technologies = technologyCandidates.filter((tech) =>
    lowerMemo.includes(tech.toLowerCase()),
  );
  const uniqueTechnologies = [...new Set(technologies)];
  const hasSreContext = /sre|kubernetes|運用|監視|障害|インフラ/i.test(memo);
  const hasFrontendContext = /react|vue|frontend|フロント|画面|ui/i.test(memo);
  const hasBackendContext = /api|backend|バックエンド|spring|java|go|sql/i.test(memo);
  const projectTheme = hasSreContext
    ? "サービス基盤・運用改善"
    : hasFrontendContext && !hasBackendContext
      ? "Web画面・管理画面改修"
      : "Webアプリケーション開発・業務システム改修";
  const workSummary = hasSreContext
    ? "監視、運用改善、コンテナ基盤まわりの調査・改善"
    : hasFrontendContext && !hasBackendContext
      ? "画面改修、表示調整、レビュー対応"
      : "機能改修、不具合修正、テスト";
  const improvement = hasSreContext
    ? "障害調査や運用作業の流れを整理し、再発防止や作業負荷軽減につながる改善を進めました。"
    : "既存仕様と影響範囲を確認しながら改修し、利用者の手作業や問い合わせの削減につながる改善を進めました。";

  return {
    technologies: uniqueTechnologies.length ? uniqueTechnologies : ["Java", "Spring Boot", "SQL", "Git"],
    projectTheme,
    workSummary,
    improvement,
  };
}

function buildResumeHtml() {
  const personName = escapeHtml(getFieldValue("person-name", ""));
  const experience = escapeHtml(getFieldValue("experience", "約1年8か月"));
  const targetRole = escapeHtml(getFieldValue("target-role", "バックエンドエンジニア"));
  const targetContext = escapeHtml(getFieldValue("target-context", "Webサービス開発"));
  const insights = getMemoInsights();
  const technologies = insights.technologies.map(escapeHtml);
  const mainTechnologies = technologies.slice(0, 4).join(" / ");
  const projectTheme = escapeHtml(insights.projectTheme);
  const workSummary = escapeHtml(insights.workSummary);
  const improvement = escapeHtml(insights.improvement);
  const nameLine = personName
    ? `<span>氏名: ${personName}</span>`
    : `<span>氏名: </span>`;

  return `
  <h3>職務経歴書</h3>
  <div class="resume-meta">${nameLine}<span>作成日: ${getTodayText()}</span></div>

  <h4>職務要約</h4>
  <p>Webアプリケーション開発・運用に${experience}携わり、${mainTechnologies}を用いた${workSummary}を経験してきました。${projectTheme}では、既存仕様や影響範囲を確認しながら、実装・調査・テストを進めました。今後は${targetRole}を軸に、設計意図を理解した実装力と、運用改善につながる提案力を高めたいと考えています。</p>

  <h4>技術スキル</h4>
  <p>使用技術: ${technologies.join(", ")}<br>
  担当領域: 実装, 不具合調査, テスト, 既存機能改修, レビュー対応<br>
  補足: 入力メモから読み取れる技術を中心に整理しています</p>

  <h4>主なプロジェクト経験</h4>
  <p class="project-title">【プロジェクト1】${projectTheme}</p>
  <p>期間: 追加質問で確認 / チーム規模: 追加質問で確認 / 担当役割: 実装、調査、テスト、レビュー対応<br>
  使用技術: ${technologies.join(", ")}</p>
  <ul>
    <li>入力メモに含まれる技術・作業内容をもとに、${workSummary}を担当</li>
    <li>不具合や変更要望に対して、既存コード・設定・データの影響範囲を確認しながら対応</li>
    <li>${improvement}</li>
  </ul>

  <p class="project-title">【プロジェクト2】追加で深掘りしたい経験</p>
  <p>期間: 追加質問で確認 / チーム規模: 追加質問で確認 / 担当役割: 詳細確認中<br>
  使用技術: ${technologies.slice(0, 3).join(", ")}</p>
  <ul>
    <li>追加質問で、利用者、規模、担当範囲、成果の数字を確認すると具体性が増します</li>
    <li>「誰のために」「何を改善したか」を補うことで、単なる作業内容から職務経歴に変換できます</li>
    <li>必要に応じて、面談前に確認する項目として保留できます</li>
  </ul>

  <h4>強み</h4>
  <ul>
    <li>既存コードを読み解き、画面からバックエンド、SQLまで影響範囲を確認しながら改修できる</li>
    <li>不具合の再現条件を整理し、原因調査から修正、確認まで粘り強く進められる</li>
    <li>レビュー指摘を受け止め、保守性を意識して改善できる</li>
  </ul>

  <h4>今後の志向</h4>
  <p>${targetRole}を軸に、詳細設計から実装、テスト、運用改善まで一貫して対応できるエンジニアを目指しています。今後は${mainTechnologies}の理解を深め、${targetContext}に関わりたいと考えています。</p>
`;
}

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
  window.requestAnimationFrame(updatePaperScale);
  document.querySelector(".workspace")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function renderChecks() {
  const container = document.querySelector("#checks");
  container.innerHTML = checks
    .map(
      ([label, status, level, comment]) => `
        <article class="check-card ${level}">
          <strong>${label}<span class="status">${status}</span></strong>
          <p>${comment}</p>
        </article>
      `,
    )
    .join("");
  document.querySelector(".diagnosis-summary").insertAdjacentHTML(
    "afterend",
    `<div class="diagnosis-progress">まずは規模感・役割・成果の3つを補えば、A4出力に使える材料がかなり揃います。</div>`,
  );
}

function renderQuestions() {
  const container = document.querySelector("#question-list");
  container.innerHTML = questions
    .map(
      (question, index) => `
        <label class="question-card">
          <span>${index + 1}</span>
          <p>${question.text}</p>
          <textarea data-question-index="${index}" placeholder="${question.placeholder}"></textarea>
          <button class="text-button" type="button" data-unknown="${index}">わからない</button>
        </label>
      `,
    )
    .join("");
}

function fillQuestionSamples() {
  document.querySelectorAll("[data-question-index]").forEach((textarea) => {
    textarea.value = questions[Number(textarea.dataset.questionIndex)].sampleAnswer;
  });
}

function saveDraft() {
  const draft = Object.fromEntries(
    draftFields.map((id) => [id, document.querySelector(`#${id}`)?.value || ""]),
  );
  draft.questionAnswers = Array.from(
    document.querySelectorAll("[data-question-index]"),
  ).map((textarea) => textarea.value);
  localStorage.setItem(draftKey, JSON.stringify(draft));
}

function scheduleDraftSave() {
  window.clearTimeout(draftTimer);
  draftTimer = window.setTimeout(saveDraft, resumeRenderDelay);
}

function scheduleResumeRender() {
  window.clearTimeout(resumeTimer);
  resumeTimer = window.setTimeout(renderResume, resumeRenderDelay);
}

function restoreDraft() {
  const rawDraft = localStorage.getItem(draftKey);
  if (!rawDraft) return;

  try {
    const draft = JSON.parse(rawDraft);
    draftFields.forEach((id) => {
      const field = document.querySelector(`#${id}`);
      if (field && typeof draft[id] === "string") field.value = draft[id];
    });
    document.querySelectorAll("[data-question-index]").forEach((textarea) => {
      const savedValue = draft.questionAnswers?.[Number(textarea.dataset.questionIndex)];
      if (typeof savedValue === "string") textarea.value = savedValue;
    });
  } catch {
    localStorage.removeItem(draftKey);
  }
}

function renderResume() {
  document.querySelector("#resume-paper").innerHTML = buildResumeHtml();
  updatePaperScale();
}

function updatePaperScale() {
  const frame = document.querySelector(".resume-preview-frame");
  const paper = document.querySelector(".resume-paper");
  if (!frame || !paper) return;

  if (window.matchMedia("(max-width: 860px)").matches) {
    const parent = frame.parentElement;
    const parentStyles = parent ? getComputedStyle(parent) : null;
    const parentWidth = parent
      ? parent.clientWidth -
        Number.parseFloat(parentStyles.paddingLeft) -
        Number.parseFloat(parentStyles.paddingRight)
      : window.innerWidth - 72;
    const availableWidth = Math.max(240, Math.min(parentWidth, window.innerWidth - 72));
    const scale = Math.min(1, availableWidth / 794);
    frame.style.width = `${availableWidth}px`;
    frame.style.height = `${1123 * scale}px`;
    frame.style.minHeight = "0";
    paper.style.setProperty("--paper-scale", scale);
    return;
  }

  frame.style.width = "";
  frame.style.height = "";
  frame.style.minHeight = "";
  paper.style.removeProperty("--paper-scale");
}

function getResumeText() {
  return document.querySelector("#resume-paper").innerText.trim();
}

renderChecks();
renderQuestions();
restoreDraft();
renderResume();

document.querySelector("#fill-sample").addEventListener("click", () => {
  document.querySelector("#person-name").value = "山田 太郎";
  document.querySelector("#experience").value = "1年8か月";
  document.querySelector("#current-role").value = "SES企業のWebエンジニア";
  document.querySelector("#target-role").value =
    "自社開発企業のバックエンドエンジニア";
  document.querySelector("#target-context").value =
    "Webサービス開発、バックエンド中心";
  document.querySelector("#career-memo").value = sampleMemo;
  fillQuestionSamples();
  saveDraft();
  renderResume();
  showToast("サンプルを入力しました");
});

document.addEventListener("input", (event) => {
  if (event.target.matches("input, textarea")) {
    scheduleDraftSave();
    if (
      event.target.matches(
        "#person-name, #experience, #target-role, #target-context, #career-memo",
      )
    ) {
      scheduleResumeRender();
    }
  }
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-unknown]");
  if (!button) return;

  const textarea = document.querySelector(
    `[data-question-index="${button.dataset.unknown}"]`,
  );
  textarea.value = "わからないため、面談前に確認する";
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
});

window.addEventListener("resize", updatePaperScale);

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
