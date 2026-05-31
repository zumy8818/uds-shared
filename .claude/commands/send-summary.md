# 本日のまとめをSlackに送信するコマンド
# 使い方：Claude Codeで `/send-summary` と入力

セッション終了時に、以下の3点セットでSlackにまとめを送信する。

## Slack送信フォーマット（必須）

```
【表題】作業内容から分かりやすい名前（例：２PC連携、棚卸アプリ修正）
【本日の作業内容】
・完了：（完了したこと）
・未完了：（持ち越しタスク）
【引継ぎ → HomePC or ShopPC】
・（もう一方のPCでやること・確認すること）
```

## 手順

1. 上のフォーマットで本日のまとめ文章を作成する
2. 以下のコマンドで送信する：

```bash
bash "/c/dev/coo/スキル・ルール/uds-shared/scripts/slack-notify.sh" "【表題】２PC連携
【本日の作業内容】
・完了：（内容）
・未完了：（内容）
【引継ぎ → HomePC】
・（内容）"
```

3. 「✅ Slackに送信しました」を確認
4. 続けて `/sync-claude-md` を実行

## 注意
- 表題は毎回その日の作業にあわせた名前にすること
- 引継ぎ先はその日作業したPCの逆（ShopPCで作業→「→ HomePC」）
- SLACK_WEBHOOK_URLが未設定の場合はsettings.local.jsonを確認
