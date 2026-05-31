const pptxgen = require("pptxgenjs");

async function createPamphlet() {
  const pres = new pptxgen();

  // A4縦向きカスタムレイアウト（単位：インチ）
  pres.defineLayout({ name: "A4_PORTRAIT", width: 8.27, height: 11.69 });
  pres.layout = "A4_PORTRAIT";
  pres.title = "うぶやMAP 参加者募集パンフレット";

  // カラーパレット（農村・温かみイメージ）
  const C = {
    GREEN_DARK:  "2C5F2D",  // 森の緑（メイン）
    GREEN_MID:   "6B9E3E",  // 明るい緑
    GREEN_PALE:  "B8D98B",  // 淡い緑
    ORANGE:      "D4721A",  // 収穫オレンジ
    ORANGE_LIGHT:"F0A042",  // 薄いオレンジ
    CREAM:       "FAF6EF",  // 温かみクリーム（背景）
    SAND:        "EDE8DC",  // サンド（カード背景）
    TEXT_DARK:   "2C2C2C",  // 濃いテキスト
    WHITE:       "FFFFFF",
  };

  // =========================================================
  // スライド1：表面（興味を引く）
  // =========================================================
  const s1 = pres.addSlide();
  s1.background = { color: C.CREAM };

  // --- ヘッダー緑バー ---
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 8.27, h: 1.75,
    fill: { color: C.GREEN_DARK }, line: { color: C.GREEN_DARK },
  });

  // メインタイトル
  s1.addText("うぶやMAP", {
    x: 0, y: 0.12, w: 8.27, h: 0.95,
    fontSize: 58, bold: true, color: C.WHITE, align: "center",
    fontFace: "Georgia", margin: 0,
  });

  // サブタイトル
  s1.addText("産山村 共同無人販売所マップ", {
    x: 0, y: 1.1, w: 8.27, h: 0.42,
    fontSize: 15, color: C.GREEN_PALE, align: "center",
    fontFace: "Calibri", margin: 0, charSpacing: 3,
  });

  // オレンジアクセントライン
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 1.75, w: 8.27, h: 0.08,
    fill: { color: C.ORANGE }, line: { color: C.ORANGE },
  });

  // 募集バッジ
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 2.14, y: 1.98, w: 4.0, h: 0.55,
    fill: { color: C.ORANGE }, line: { color: C.ORANGE },
  });
  s1.addText("参加店舗 募集中！", {
    x: 2.14, y: 1.99, w: 4.0, h: 0.53,
    fontSize: 19, bold: true, color: C.WHITE, align: "center", margin: 0,
  });

  // キャッチコピー
  s1.addText([
    { text: "LINEで写真を1枚送るだけ。", options: { breakLine: true } },
    { text: "あなたの野菜が、村に来た", options: { breakLine: true } },
    { text: "お客さんに届きます。", options: {} },
  ], {
    x: 0.3, y: 2.7, w: 7.67, h: 1.65,
    fontSize: 28, bold: true, color: C.GREEN_DARK, align: "center",
    fontFace: "Calibri",
  });

  // --- 参加の流れセクション ---
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 4.5, w: 7.67, h: 0.48,
    fill: { color: C.GREEN_DARK }, line: { color: C.GREEN_DARK },
  });
  s1.addText("こんなに簡単！参加の流れ", {
    x: 0.3, y: 4.52, w: 7.67, h: 0.44,
    fontSize: 16, bold: true, color: C.WHITE, align: "center", margin: 0,
  });

  // フロー5ステップ
  const steps = [
    { num: "1", label: "野菜を\n並べる" },
    { num: "2", label: "写真を\n撮る" },
    { num: "3", label: "LINEで\n送る" },
    { num: "4", label: "マップに\n掲載！" },
    { num: "5", label: "お客さんが\n来る！" },
  ];

  const sW = 1.22;
  const sGap = 0.13;
  const sTotalW = 5 * sW + 4 * sGap;
  const sStartX = (8.27 - sTotalW) / 2;
  const sY = 5.07;

  steps.forEach((step, i) => {
    const x = sStartX + i * (sW + sGap);
    const isLast = i === 4;
    const circleColor = isLast ? C.ORANGE : C.GREEN_MID;

    // 丸背景
    s1.addShape(pres.shapes.OVAL, {
      x: x + 0.21, y: sY, w: 0.8, h: 0.8,
      fill: { color: circleColor }, line: { color: circleColor },
    });

    // 番号
    s1.addText(step.num, {
      x: x + 0.21, y: sY, w: 0.8, h: 0.8,
      fontSize: 22, bold: true, color: C.WHITE, align: "center",
      valign: "middle", margin: 0,
    });

    // ラベル
    s1.addText(step.label, {
      x, y: sY + 0.83, w: sW, h: 0.6,
      fontSize: 10.5, color: C.TEXT_DARK, align: "center", fontFace: "Calibri",
    });

    // 矢印（最後以外）
    if (!isLast) {
      s1.addShape(pres.shapes.RECTANGLE, {
        x: x + sW - 0.02, y: sY + 0.33, w: sGap + 0.04, h: 0.1,
        fill: { color: C.GREEN_PALE }, line: { color: C.GREEN_PALE },
      });
    }
  });

  // --- メリットセクション ---
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 6.2, w: 7.67, h: 0.48,
    fill: { color: C.GREEN_MID }, line: { color: C.GREEN_MID },
  });
  s1.addText("参加するとこんなメリットがあります", {
    x: 0.3, y: 6.22, w: 7.67, h: 0.44,
    fontSize: 15, bold: true, color: C.WHITE, align: "center", margin: 0,
  });

  const merits = [
    { mark: "CHECK", title: "難しい操作は不要！", body: "LINEで写真を\n送るだけ" },
    { mark: "PEOPLE", title: "お客さんが来る！",   body: "観光客がマップで\n販売所を探してくれる" },
    { mark: "FREE",   title: "完全無料！",          body: "参加費用は\n一切かかりません" },
  ];

  const mW = 2.35;
  const mGap = 0.11;
  const mStartX = (8.27 - 3 * mW - 2 * mGap) / 2;
  const mY = 6.78;
  const mH = 1.9;

  const markSymbols = { CHECK: "OK", PEOPLE: "GO", FREE: "0円" };

  merits.forEach((m, i) => {
    const x = mStartX + i * (mW + mGap);

    // カード背景
    s1.addShape(pres.shapes.RECTANGLE, {
      x, y: mY, w: mW, h: mH,
      fill: { color: C.SAND }, line: { color: C.GREEN_PALE, width: 1.5 },
    });

    // 上部オレンジライン
    s1.addShape(pres.shapes.RECTANGLE, {
      x, y: mY, w: mW, h: 0.07,
      fill: { color: C.ORANGE }, line: { color: C.ORANGE },
    });

    // マーク用丸
    s1.addShape(pres.shapes.OVAL, {
      x: x + (mW - 0.7) / 2, y: mY + 0.13, w: 0.7, h: 0.7,
      fill: { color: C.GREEN_MID }, line: { color: C.GREEN_MID },
    });
    s1.addText("✓", {
      x: x + (mW - 0.7) / 2, y: mY + 0.13, w: 0.7, h: 0.7,
      fontSize: 20, bold: true, color: C.WHITE, align: "center",
      valign: "middle", margin: 0,
    });

    // タイトル
    s1.addText(m.title, {
      x: x + 0.05, y: mY + 0.87, w: mW - 0.1, h: 0.42,
      fontSize: 12, bold: true, color: C.GREEN_DARK, align: "center",
      fontFace: "Calibri",
    });

    // 本文
    s1.addText(m.body, {
      x: x + 0.05, y: mY + 1.3, w: mW - 0.1, h: 0.55,
      fontSize: 11.5, color: C.TEXT_DARK, align: "center", fontFace: "Calibri",
    });
  });

  // --- 下部メッセージ ---
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 8.85, w: 7.67, h: 1.55,
    fill: { color: C.GREEN_PALE }, line: { color: C.GREEN_MID, width: 1 },
  });
  s1.addText([
    { text: "産山村の豊かな農作物を", options: { breakLine: true } },
    { text: "必要としているお客さんに届けましょう。", options: { breakLine: true } },
    { text: "参加方法の詳細はウラ面をご覧ください。", options: {} },
  ], {
    x: 0.5, y: 8.95, w: 7.27, h: 1.35,
    fontSize: 15, color: C.GREEN_DARK, align: "center",
    fontFace: "Calibri",
  });

  // --- フッター ---
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 11.05, w: 8.27, h: 0.08,
    fill: { color: C.ORANGE }, line: { color: C.ORANGE },
  });
  s1.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 11.13, w: 8.27, h: 0.56,
    fill: { color: C.GREEN_DARK }, line: { color: C.GREEN_DARK },
  });
  s1.addText("うぶやMAP｜産山村 共同無人販売所マップ　2026年", {
    x: 0, y: 11.16, w: 8.27, h: 0.5,
    fontSize: 11, color: C.GREEN_PALE, align: "center", margin: 0, fontFace: "Calibri",
  });

  // =========================================================
  // スライド2：裏面（参加方法と詳細）
  // =========================================================
  const s2 = pres.addSlide();
  s2.background = { color: C.CREAM };

  // --- ヘッダー ---
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 8.27, h: 1.05,
    fill: { color: C.GREEN_DARK }, line: { color: C.GREEN_DARK },
  });
  s2.addText("うぶやMAP　参加のご案内", {
    x: 0, y: 0.1, w: 8.27, h: 0.85,
    fontSize: 28, bold: true, color: C.WHITE, align: "center",
    fontFace: "Georgia", margin: 0,
  });
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 1.05, w: 8.27, h: 0.08,
    fill: { color: C.ORANGE }, line: { color: C.ORANGE },
  });

  // --- セクション①：うぶやMAPってなに？ ---
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 1.25, w: 7.67, h: 0.47,
    fill: { color: C.GREEN_MID }, line: { color: C.GREEN_MID },
  });
  s2.addText("  うぶやMAPってなに？", {
    x: 0.3, y: 1.27, w: 7.67, h: 0.43,
    fontSize: 15, bold: true, color: C.WHITE, align: "left", margin: 0,
  });

  s2.addText([
    { text: "産山村の無人販売所を一覧できるスマートフォン用マップです。", options: { breakLine: true } },
    { text: "村に来たお客さんがQRコードを読み取るだけで、どこにどんな野菜が", options: { breakLine: true } },
    { text: "売っているか確認できます。スマホが使える方なら誰でも使えます！", options: {} },
  ], {
    x: 0.4, y: 1.8, w: 7.47, h: 0.95,
    fontSize: 13, color: C.TEXT_DARK, align: "left",
    fontFace: "Calibri",
  });

  // --- セクション②：参加の流れ（3ステップ） ---
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 2.9, w: 7.67, h: 0.47,
    fill: { color: C.GREEN_DARK }, line: { color: C.GREEN_DARK },
  });
  s2.addText("  参加の流れ（3ステップ）", {
    x: 0.3, y: 2.92, w: 7.67, h: 0.43,
    fontSize: 15, bold: true, color: C.WHITE, align: "left", margin: 0,
  });

  const joinSteps = [
    {
      num: "STEP 1",
      title: "担当者にご連絡ください",
      body: "下記のお問い合わせ先に\n「参加したい」とご連絡ください。",
      accent: C.GREEN_MID,
    },
    {
      num: "STEP 2",
      title: "販売所をマップに登録します",
      body: "担当者があなたの販売所をマップに登録します。\n作業はすべてお任せ！",
      accent: C.GREEN_MID,
    },
    {
      num: "STEP 3",
      title: "LINEで写真を送るだけ！",
      body: "販売日の朝、野菜の写真をLINEで送るだけで\nマップに自動掲載されます。",
      accent: C.ORANGE,
    },
  ];

  const jsY = 3.45;
  const jsH = 1.1;
  const jsGap = 0.13;

  joinSteps.forEach((js, i) => {
    const y = jsY + i * (jsH + jsGap);

    // カード背景
    s2.addShape(pres.shapes.RECTANGLE, {
      x: 0.3, y, w: 7.67, h: jsH,
      fill: { color: C.SAND }, line: { color: C.GREEN_PALE, width: 1 },
    });

    // 左アクセント（ステップ番号）
    s2.addShape(pres.shapes.RECTANGLE, {
      x: 0.3, y, w: 1.4, h: jsH,
      fill: { color: js.accent }, line: { color: js.accent },
    });
    s2.addText(js.num, {
      x: 0.3, y: y + 0.02, w: 1.4, h: jsH - 0.04,
      fontSize: 14, bold: true, color: C.WHITE, align: "center",
      valign: "middle", margin: 0,
    });

    // タイトル
    s2.addText(js.title, {
      x: 1.8, y: y + 0.1, w: 6.05, h: 0.38,
      fontSize: 13, bold: true, color: C.GREEN_DARK, align: "left",
      fontFace: "Calibri",
    });

    // 本文
    s2.addText(js.body, {
      x: 1.8, y: y + 0.47, w: 6.05, h: 0.58,
      fontSize: 11.5, color: C.TEXT_DARK, align: "left",
      fontFace: "Calibri",
    });
  });

  // --- セクション③：よくある質問 ---
  const faqY = 6.9;
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: faqY, w: 7.67, h: 0.47,
    fill: { color: C.GREEN_MID }, line: { color: C.GREEN_MID },
  });
  s2.addText("  よくある質問", {
    x: 0.3, y: faqY + 0.02, w: 7.67, h: 0.43,
    fontSize: 15, bold: true, color: C.WHITE, align: "left", margin: 0,
  });

  const faqs = [
    {
      q: "Q. スマホが苦手でも大丈夫？",
      a: "大丈夫です！LINEで写真を送る操作だけ覚えれば参加できます。",
    },
    {
      q: "Q. お金はかかりますか？",
      a: "参加費は無料です。費用は一切かかりません。",
    },
    {
      q: "Q. 毎日やらないといけない？",
      a: "販売する日だけでOKです。休みの日は送らなくて大丈夫です。",
    },
  ];

  faqs.forEach((faq, i) => {
    const y = faqY + 0.57 + i * 0.75;

    // Q行
    s2.addShape(pres.shapes.RECTANGLE, {
      x: 0.3, y, w: 7.67, h: 0.34,
      fill: { color: C.GREEN_PALE }, line: { color: C.GREEN_PALE },
    });
    s2.addText(faq.q, {
      x: 0.45, y, w: 7.42, h: 0.34,
      fontSize: 12.5, bold: true, color: C.GREEN_DARK, align: "left",
      fontFace: "Calibri", valign: "middle",
    });

    // A行
    s2.addText("→  " + faq.a, {
      x: 0.45, y: y + 0.36, w: 7.42, h: 0.36,
      fontSize: 11.5, color: C.TEXT_DARK, align: "left",
      fontFace: "Calibri",
    });
  });

  // --- セクション④：お問い合わせ・参加申込 ---
  const contactY = 9.2;
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: contactY, w: 7.67, h: 0.47,
    fill: { color: C.ORANGE }, line: { color: C.ORANGE },
  });
  s2.addText("  お問い合わせ・参加申込", {
    x: 0.3, y: contactY + 0.02, w: 7.67, h: 0.43,
    fontSize: 15, bold: true, color: C.WHITE, align: "left", margin: 0,
  });

  // 連絡先カード
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: contactY + 0.57, w: 7.67, h: 1.75,
    fill: { color: C.SAND }, line: { color: C.ORANGE, width: 1.5 },
  });

  s2.addText([
    { text: "うぶやまデジタルサービス　代表　魚住　武史", options: { breakLine: true } },
    { text: "TEL  ：090-8959-9993",                options: { breakLine: true } },
    { text: "Mail ：zumy@aso.ne.jp",               options: {} },
  ], {
    x: 0.6, y: contactY + 0.67, w: 7.27, h: 1.55,
    fontSize: 16, color: C.TEXT_DARK, align: "left",
    fontFace: "Calibri",
  });

  // --- フッター ---
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 11.05, w: 8.27, h: 0.08,
    fill: { color: C.ORANGE }, line: { color: C.ORANGE },
  });
  s2.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 11.13, w: 8.27, h: 0.56,
    fill: { color: C.GREEN_DARK }, line: { color: C.GREEN_DARK },
  });
  s2.addText("うぶやMAP｜産山村 共同無人販売所マップ　2026年", {
    x: 0, y: 11.16, w: 8.27, h: 0.5,
    fontSize: 11, color: C.GREEN_PALE, align: "center", margin: 0, fontFace: "Calibri",
  });

  // 保存
  const outPath = "C:\\dev\\UDS\\uds-shared\\ubuyamap-pamphlet.pptx";
  await pres.writeFile({ fileName: outPath });
  console.log("完了: " + outPath);
}

createPamphlet().catch(console.error);
