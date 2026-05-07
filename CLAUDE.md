# CLAUDE.md — うぶやまデジタルサービス（UDS）作業ルール

> このファイルはClaude Codeが自動で読み込む「武史さんとClaudeの共通ルール集」です。
> 作業の質と継続性を高めるために、セッションのたびに参照します。

---

## 1. 作業開始ルーティン（必須）

Claude Codeで作業を始めるとき、Claudeは必ず以下を確認する：

1. **今日のゴールは何か？**（1文で言える粒度にする）
2. **前回の作業はどこまで進んだか？**（未完了タスクの確認）
3. **今日の作業はどのプロジェクトか？**（C:\dev\ 配下のどのフォルダか）
4. **どちらのPCか？**（HomePC / ShopPC）

> Claudeは武史さんが作業開始を宣言したら、上記4点を確認してから作業に入ること。

---

## 2. 脱線アイデアの管理ルール

武史さんは作業中に新しいアイデアが浮かびやすい。
**脱線を防ぐため、以下のルールを徹底する：**

- アイデアが浮かんだら → `C:\dev\_ideas\idea_log.md` に日付・一言メモを記録
- 記録したら **今の作業に戻る**（Claudeが「戻りましょう」と促す）
- アイデアログは週次レビュー時にまとめて整理する

---

## 3. ファイル・フォルダ管理ルール

### 基本構造（C:\dev\ 配下）
C:\dev
├── .claude\              ← Claude設定（触らない）
├── clients\              ← クライアント案件
│   ├── active\           ← 進行中
│   ├── lead\             ← 商談中
│   └── prospect\         ← 見込み
├── internal\             ← UDS内部ツール・自社開発
│   ├── active\           ← 稼働中
│   ├── archive\          ← アーカイブ
│   ├── dev\              ← 開発中
│   │   ├── nodai-lecture\  ← 農大講義資料
│   │   ├── cafe\           ← カフェ系
│   │   ├── finance\        ← 財務系
│   │   └── tools\          ← ツール系
│   ├── hold\             ← 保留中
│   ├── shared\           ← 共有
│   └── trial\            ← 試験的
└── UDS\                  ← UDS事業系
├── uds-project-manager
├── uds-invader-game
└── uds-shared\
### ファイル命名規則
- コミットプレフィックス：`feat / fix / update / docs / style / delete`
- 全リポジトリはPrivateで管理

### 「ファイルが見つからない」を防ぐルール
1. 作業ファイルは必ず `C:\dev\[プロジェクト名]\` の中に置く
2. デスクトップ・ダウンロードフォルダへの一時保存は禁止
3. 作業終了時に「どこに何を保存したか」をClaude Codeに記録させる

---

## 4. プロジェクト早見表

「どの作業をどのフォルダでやるか」一覧。迷ったらここを見る。

| やりたいこと | フォルダ | 起動ワード |
|---|---|---|
| 農大講義資料を作る | C:\dev\internal\dev\nodai-lecture | NODAI 第X回 作業開始 |
| カフェの炭火焼管理 | C:\dev\internal\dev\cafe\fs-sumiyaki-manager | 通常起動 |
| カフェの棚卸アプリ | C:\dev\internal\dev\cafe\FS-inventory-app | 通常起動 |
| レシート自動読込 | C:\dev\internal\dev\finance\20260101_AutoReceapt | 通常起動 |
| 弥生ガス代連携 | C:\dev\internal\dev\finance\receipt-to-yayoi-gas | 通常起動 |
| アプリ仕様チェック | C:\dev\internal\dev\tools\uds-app-spec-checklist | 通常起動 |
| Webサイト自動生成 | C:\dev\internal\dev\tools\uds-app-website-generator | 通常起動 |
| Webヒアリングシート | C:\dev\internal\dev\tools\web-site-hearing-sheet | 通常起動 |
| プロジェクト管理アプリ | C:\dev\UDS\uds-project-manager | 通常起動 |

### 新しいプロジェクトを作るとき
1. 上の表のどのカテゴリか確認する
2. 該当フォルダの中に新しいフォルダを作る
3. Notionの「UDSアプリ台帳」に登録する（カテゴリ・ローカルパスも記入）
4. GitHubにPrivateリポジトリを作成する

---

## 5. 自動化ロードマップ

優先度順に取り組む。1つ完成してから次へ。

### 🥇 Phase 1：財務自動化（最優先）
**目標：レシートを撮影 → 弥生オンラインに自動入力**
- [ ] Google Cloud Vision API でレシートOCR
- [ ] Google Drive にレシート画像を保存
- [ ] Google Sheets に項目を出力
- [ ] 弥生オンラインへデータ連携
- 関連フォルダ：`C:\dev\internal\dev\finance\20260101_AutoReceapt`

### 🥈 Phase 2：日次収支レポート自動化
**目標：毎朝、スマレジの昨日の収支がレポートされている**
- [ ] スマレジAPI連携
- [ ] 日次集計をGoogle Sheetsへ出力
- [ ] LINE or メールで朝8時に自動送信

### 🥉 Phase 3：情報整理・メモ自動化
**目標：アイデアメモが自動で整理・分類される**
- [ ] idea_log.md の定期レビュー仕組み化
- [ ] Claude API でカテゴリ分類
- 関連フォルダ：`C:\dev\_ideas\`

### Phase 4以降（将来）
- SNS投稿の半自動化
- HACCPカフェ管理システム

---

## 6. 使用ツール・サービス一覧

| カテゴリ | ツール | 用途 |
|---|---|---|
| 会計 | 弥生オンライン | 経費・売上管理 |
| POS | スマレジ | カフェ売上管理 |
| クラウド | Google Drive / Sheets | データ保存・集計 |
| OCR | Google Cloud Vision API | レシート読み取り |
| サーバー | Lolipop ハイスピードプラン | Web公開 |
| ドメイン | ubuyama-digital-service.com | UDS本番環境 |
| バージョン管理 | GitHub（zumy8818） | ソースコード管理 |
| IDE | VS Code + Claude Code | 開発環境 |
| AI | Claude API（uds-lolipopキー） | LP自動生成等 |

---

## 7. CLAUDE.md継続改善ルール

作業を通じて「今までよりこちらの方が良い」「効率が上がった」と気づいたことがあれば、Claudeは積極的にCLAUDE.mdの改善を提案する。

### 改善提案の仕方：
1. 「CLAUDE.mdをこう変えると良くなりそうです」と提案する
2. 武史さんがOKしたらCLAUDE.mdを更新する
3. HomePCとShopPC両方に反映する

---

## 8. Claudeへの応答スタイル指示

- **言語：日本語で回答する**
- 説明は簡潔に。専門用語は使う場合かならず一言で説明を添える
- コードを書くときはコメントを日本語で入れる
- 作業が脱線しそうなときは「今日のゴールに戻りましょう」と促す
- エラーが出たときは「原因 → 対処法 → 確認コマンド」の順で説明する
- 大きなタスクは必ず小さいステップに分解してから着手する

---

## 9. セッション終了ルーティン

作業を終えるとき、Claudeは以下を出力する：
【本日の作業まとめ】

完了したこと：
未完了・持ち越し：
次回やること（1つだけ）：
保存したファイル・場所：
---

*最終更新：2026-05-07*
*ShopPC：C:\Users\owner\.claude\CLAUDE.md*
*HomePC：C:\Users\scare\.claude\CLAUDE.md*
