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
5. **uds-sharedをpullしてCLAUDE.mdを最新化する**
```bash
   cd "C:\coo\スキル・ルール\uds-shared"
   git pull origin main
   copy "C:\coo\スキル・ルール\uds-shared\CLAUDE.md" "$env:USERPROFILE\.claude\CLAUDE.md"
```
6. **`C:\coo\.env` を確認し、作業に必要なキーが揃っているか確認する**（→ 詳細は「14. .env管理ルール」参照）

> Claudeは武史さんが作業開始を宣言したら、上記6点を確認してから作業に入ること。

---

## 2. 脱線アイデアの管理ルール

武史さんは作業中に新しいアイデアが浮かびやすい。
**脱線を防ぐため、以下のルールを徹底する：**

- アイデアが浮かんだら → `C:\dev\_ideas\idea_log.md` に日付・一言メモを記録
- 記録したら **今の作業に戻る**（Claudeが「戻りましょう」と促す）
- アイデアログは週次レビュー時にまとめて整理する

---

## 3. ファイル・フォルダ管理ルール

> ⚠️ **【最重要ルール】全作業は `C:\coo\` 配下で行う。**
> `C:\dev\clients\`・`C:\dev\internal\`・`C:\dev\UDS\` などの旧フォルダは使用しない。
> フォルダの配置・管理ルールは `C:\coo\` の構造に従うこと。

### coo フォルダ構造（C:\coo\ 配下）
C:\coo
├── クライアント管理\
│   ├── 01_見積中\         ← 見込み・商談中案件（例: ikeyamaspring.jp）
│   ├── 02_契約済み\       ← 正式受注・進行中案件（例: aso-jh-farm-site, jhf-website）
│   └── 03_アーカイブ（失注）\ ← 失注・終了案件
├── コンテンツ制作\        ← LP・UDSサイト・講義資料・イラスト等
│   └── school\           ← 農大等の講義資料（nodai-lecture）
├── スキル・ルール\        ← ツール・ワークフロー・チェックリスト・uds-shared
├── プロジェクトマネージャー\ ← uds-project-manager等
├── プロダクト\            ← カフェアプリ・各種内部ツール・ゲーム等
├── マーケティング\        ← 見込み客管理・提案書・SNS
├── 経理\                  ← receipt-to-yayoi-gas・AutoReceipt等
└── 秘書\                  ← スケジュール・タスク管理

### 各部門への配置ルール（新規フォルダはここを参照）

| やりたいこと | 配置先 |
|---|---|
| クライアントのWebサイト・案件ファイル | `クライアント管理\01_見積中\` または `02_契約済み\` |
| UDS自社LP・ポートフォリオ・UDSサイト | `コンテンツ制作\` |
| 農大・学校向け講義資料 | `コンテンツ制作\school\` |
| カフェ・農場向けアプリ・内部ツール | `プロダクト\` |
| Webヒアリング・仕様書ツール等 | `プロダクト\` |
| プロジェクト管理アプリ | `プロジェクトマネージャー\` |
| レシート・弥生・経費管理系 | `経理\` |
| チェックリスト・ワークフロー・スクリプト | `スキル・ルール\` |
| 見込み客リスト・提案書・SNS投稿 | `マーケティング\` |

### 新しいクライアント案件を作るとき
1. 受注前（見込み・見積中）→ `クライアント管理\01_見積中\` へ
2. 正式受注後 → `クライアント管理\02_契約済み\` へ
3. 失注・終了 → `クライアント管理\03_アーカイブ（失注）\` へ

### ファイル命名規則
- コミットプレフィックス：`feat / fix / update / docs / style / delete`
- 全リポジトリはPrivateで管理

### 「ファイルが見つからない」を防ぐルール
1. 作業ファイルは必ず `C:\coo\[該当フォルダ]\` の中に置く
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
3. `/sync-claude-md` で両PC・GitHubに反映する

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

作業を終えるとき、Claudeは以下を順番に実行する：

### ① 本日のまとめをSlack形式で作成・送信する（`/send-summary`）

Slackに送る内容は必ず以下の3点セットにする：

```
【表題】作業内容から分かりやすい名前（例：２PC連携、棚卸アプリ修正）
【本日の作業内容】
・完了：（完了したこと）
・未完了：（持ち越しタスク）
【引継ぎ → HomePC or ShopPC】
・（もう一方のPCでやること・確認すること）
・引継ぎ先でコマンド実行が必要な場合は、そのままコピペできる形で書く
　例）PowerShell用コマンドをそのまま貼る、git pullコマンドも明記する
```

送信コマンド：
```bash
bash "/c/coo/スキル・ルール/uds-shared/scripts/slack-notify.sh" "メッセージ"
```

### ② CLAUDE.mdを同期する（`/sync-claude-md`）

---

## 10. UDS会社情報（連絡先）

各種資料・チラシ・Webサイト等で使い回す公式連絡先情報。

| 項目 | 内容 |
|---|---|
| 会社名 | うぶやまデジタルサービス（UDS） |
| Tel | 090-8959-9993 |
| e-mail | info@ubuyama-digital-service.com |
| URL | https://ubuyama-digital-service.com |

> チラシ・LP・名刺・Webサイト等を制作する際は必ずこの情報を使用する。

---

## 11. Web開発時のSEO対策ルール

Webサイトを構築する際は、Google アナリティクスの最新情報に基づき最良のSEO対策を行うこと。

### 実施すべき主なSEO対策：
- メタタグ（title・description）の適切な設定
- OGP（Open Graph Protocol）タグの設定
- 構造化データ（Schema.org）の実装
- Core Web Vitals（LCP・FID・CLS）の最適化
- モバイルファーストデザイン
- 画像のalt属性・WebP対応・遅延読み込み
- Google Analytics / Search Console の設置
- サイトマップ（sitemap.xml）・robots.txt の設置

---

## 12. git pushするときのルール

git pushは必ず通知スクリプト経由で行う：
```bash
bash "/c/coo/スキル・ルール/uds-shared/scripts/git-push-notify.sh" origin main
```
→ push成功時に自動でSlack通知が飛ぶ（どのPCから・何をpushしたか）

---

## 13. SSD-PUTA への同期ルール

作業後はSSD-PUTAの `coo` フォルダにも `git pull` で同期する。
ただし、SSD-PUTAはドライブレターが毎回変わる可能性がある（D:\ / E:\ / F:\ 等）。

### 同期手順
1. `Get-PSDrive -PSProvider FileSystem` でドライブ一覧を確認
2. 各ドライブに `coo` フォルダがあるか探す
3. 見つかった場合：`cd [ドライブ]:\coo` → `git pull origin main`
4. **見つからない場合は「今日はSSD-PUTAのcooフォルダはどこにありますか？」と武史さんに確認する**

---

## 14. .env 管理ルール（APIキー・認証情報の一元管理）

### 基本方針
- **全プロジェクト共通の認証情報は `C:\coo\.env` だけで管理する**
- プロジェクト固有のキーもここに追記していく（後から移動しない）
- `.env` は絶対にGitにコミットしない

### Claudeが作業開始時にやること

1. `C:\coo\.env` を読み込む
2. 今日の作業に必要なキーが揃っているか確認する
3. **不足しているキーがあれば、作業に入る前に武史さんに請求する**

例：
```
以下のキーが .env に見当たりません。教えていただければ追加します：
- STRIPE_API_KEY（決済機能に必要）
- NOTION_TOKEN（Notion連携に必要）
```

4. 武史さんから受け取ったら、即座に `.env` に追記する：

```powershell
# 追記フォーマット（末尾に追加）
# --- [サービス名] ---
# KEYNAME=value
```

### Claudeが .env に書き込む際のルール

- 既存のキーは上書きしない（変更が必要なときは武史さんに確認してから）
- カテゴリコメント（`# --- Xxx ---`）を付けて整理する
- 追記後に「`C:\coo\.env` に追加しました」と報告する

### GitHub Secrets との同期

`.env` に追加・変更があったら、影響するリポジトリに対して同期コマンドを実行する：

```bash
bash "/c/coo/スキル・ルール/uds-shared/scripts/sync-gh-secrets.sh" "zumy8818/リポジトリ名"
```

### 現在管理しているキー一覧（カテゴリ）

| カテゴリ | キー prefix |
|---|---|
| Lolipop MySQL | `LOLIPOP_DB_*` |
| Lolipop FTP | `LOLIPOP_FTP_*` |
| Lolipop SSH | `LOLIPOP_SSH_*` |
| Lolipop PHP API | `LOLIPOP_API_*` |
| VPS（さくら） | `VPS_*` |
| Claude / Anthropic | `ANTHROPIC_API_KEY` |
| OpenAI | `OPENAI_API_KEY` |
| Google Maps | `GOOGLE_MAPS_API_KEY` |
| GitHub Actions | `GH_ACTIONS_TOKEN` |
| Facebook（クライアントSNS） | `FB_*` |

---

## 15. クライアントSNS運用ルール

UDSがクライアントのSNS（Facebook・Instagram等）を制作・運用する際の体制ルール。

### 基本方針
- ページ作成・初期設定・技術連携（サイト埋め込み等）はUDSが担当
- 日々の投稿はクライアント側スタッフ（編集者権限で招待）
- **武史さんは常にメイン管理者として残る**（バックアップ・引継ぎ・トラブル対応のため）
- 管理者が常に1人以上残るよう運用すること

### 引継ぎが必要になった場合
- 武史さんが管理者を抜ける際は、必ず先にクライアント側を「管理者」に昇格してから降りる
- ページ所有権・フォロワー資産は維持する（ページ削除→再作成はしない）

### 担当中のFBページ一覧

| 所有者 | ページ名 | URL（.envキー） | 連携先サイト |
|---|---|---|---|
| UDS（自社） | うぶやまデジタルサービス | `FB_UDS_PAGE_URL` | ubuyama-digital-service.com |
| ㈱阿蘇J・Hファーム | 株式会社阿蘇J・Hファーム | `FB_ASOJHFARM_PAGE_URL` | aso-jh-farm-site/diary.html |

### 武史さん個人FBアカウント（管理者用）
- 全FBページの**メイン管理者**として使用
- 登録メール / プロフィールURL / パスワードは `.env` の `FB_TAKESHI_*` で一元管理
- 登録メール：`zumy8818@gmail.com`（UDSページの連絡先メールと同一）
- `.env`は絶対にgitにcommitしないこと（`.gitignore`済み）

---

## 16. クライアント別プロジェクト地図（迷子防止）

> ⚠️ **作業開始前に必ずこの表を見て、正しいフォルダ・リポジトリ・本番URLを確認すること。**
> 同名フォルダが複数あるクライアントが多いので、推測で進めず必ずこの表を参照する。

### 株式会社阿蘇J・Hファーム（aso-jh-farm.jp）

| 用途 | ローカルパス | GitHub | 本番URL | 状態 |
|---|---|---|---|---|
| **公式Webサイト**（本流） | `コンテンツ制作\web\jhf-website\` | `zumy8818/jhf-website` (public) | https://aso-jh-farm.jp | ✅ 稼働中 |
| 農場日誌 | 同上 `blog/index.html` | 同上 | https://aso-jh-farm.jp/blog/ | ✅ 稼働中（FB埋込） |
| 旧公式（参照用・触らない） | `クライアント管理\02_契約済み\aso-jh-farm-site\` | `zumy8818/aso-jh-farm-site` (private) | （未稼働 `/aso-jh-farm/` ） | 🗄 旧版・参考 |
| 多言語Slackボット（構想Phase1） | `プロダクト\slack-multilingual-bot\` | （未確認） | （開発中） | 🚧 実装中 |
| 統合管理DX「AgroLink」（構想） | （未着手） | （未着手） | （未着手） | 📝 構想書のみ |

📄 **構想書**: `マーケティング\見込み客管理\02_フォローアップリスト\構想_農場統合管理システム_阿蘇JHファーム.md`
📄 **Slack提案書**: `マーケティング\見込み客管理\02_フォローアップリスト\提案書_多言語Slack_株式会社阿蘇JHファーム様.md`

### うぶやまデジタルサービス（UDS自社）

| 用途 | ローカルパス | GitHub | 本番URL | 状態 |
|---|---|---|---|---|
| 公式Webサイト | （要確認） | （要確認） | https://ubuyama-digital-service.com | ✅ 稼働中 |
| FBページ | - | - | `FB_UDS_PAGE_URL`（.env参照） | ✅ 稼働中 |

> 💡 **このセクションは新規クライアント受注時に必ず追記する。** 漏れがあると武史さんが迷子になる。

---

## 17. coo作業時の迷走防止ルール

> 武史さんは作業中に類似プロジェクト・類似フォルダで迷子になりやすい。
> Claudeはこのルールに従って武史さんを脱線から守ること。

### ルール①：作業開始時の「3点確認」（必須）

Claudeはクライアント案件に着手する前に、以下を**声に出して確認**してから手を動かす：

1. **どのクライアントか？**（例: 阿蘇J・Hファーム）
2. **どの用途か？**（例: 公式Webサイト / バックオフィスDX / SNS運用）
3. **正しいローカルパス・リポジトリ・本番URLは？**（→ 第16章の表を見る）

→ 表に該当エントリがなければ、**推測で進めずに武史さんに確認**する。

### ルール②：「これ本物?」検証ステップ

同名・類似フォルダが見つかったら、以下を確認するまで作業しない：

| 確認項目 | コマンド・方法 |
|---|---|
| 最終更新日 | `ls -la` で確認、古いものは旧版の可能性大 |
| `.git` の有無 | git管理されていれば本流の可能性が高い |
| `git remote -v` | リモートURLで本物リポジトリか判定 |
| `.github/workflows/*.yml` | デプロイ先パス（server-dir / target）で本番との紐付き確認 |
| 本番との一致 | `curl -sI 本番URL` で最終更新ヘッダ照合 |

### ルール③：新規プロジェクト命名規則（散らかり防止）

- **フォルダ名 ≒ GitHubリポジトリ名**にする（同一が理想）
- 本番ドメインがある場合は **ドメイン名ベース**で命名する
  - 例: `aso-jh-farm.jp` 本番 → リポジトリ・フォルダ名は `aso-jh-farm-jp-website`
- 旧版を残す場合は **`-old` / `-archive` サフィックス**を付ける

### ルール④：散らかったら即整理

同一クライアントの空フォルダ・wireframe残骸が**2箇所以上**できたら、その日のうちに：
- 不要フォルダ削除
- 第16章の地図を更新
- `/sync-claude-md` で同期

### ルール⑤：武史さんが「これ何だっけ?」と聞いたら必ず検証する

Claudeは**推測で答えてはいけない**。以下を必ず確認してから回答：
- `ls` で実体確認
- `git remote -v` でリポジトリ確認
- `.github/workflows/` でデプロイ先確認
- `curl -sI` で本番状態確認

**「memory says X」は「X が今もある」を意味しない**。必ず現物を見る。

### ルール⑥：本番デプロイは「リポジトリ経由」が原則

緊急時はFTP直接アップでもよいが、**必ず後でリポジトリにも反映**してpushする。
リポジトリ管理外のファイルは、次のGitHub Actions実行時に削除されるリスクがある。

---

*最終更新：2026-06-28*
*ShopPC：C:\Users\owner\.claude\CLAUDE.md*
*HomePC：C:\Users\scare\.claude\CLAUDE.md*
