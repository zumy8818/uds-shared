# 本日のまとめをSlackに送信するコマンド
# 使い方：Claude Codeで `/send-summary` と入力

セッション終了時に「本日のまとめ」をSlackに送信します。

## 手順

1. 「本日の作業まとめ」を以下のフォーマットで作成する：
```
【本日の作業まとめ】
完了したこと：
未完了・持ち越し：
次回やること（1つだけ）：
保存したファイル・場所：
```

2. 以下のスクリプトでSlackに送信する：
```bash
bash /c/dev/UDS/uds-shared/scripts/slack-notify.sh "【本日の作業まとめ】
完了したこと：（内容）
未完了・持ち越し：（内容）
次回やること：（内容）
PC：ShopPC / $(date '+%Y-%m-%d %H:%M')"
```

3. 「✅ Slackに送信しました」が表示されたら完了

4. 続けて `/sync-claude-md` を実行してCLAUDE.mdを同期する

## 注意
- SLACK_WEBHOOK_URLが設定されていない場合はエラーになる
- HomePCでも同じ手順（settings.local.jsonにWebhook URLが必要）
