#!/bin/bash
# Slackにメッセージを送るスクリプト（複数行・日本語対応）
# 使い方: ./slack-notify.sh "送りたいメッセージ"

MESSAGE="$1"

if [ -z "$SLACK_WEBHOOK_URL" ]; then
  echo "エラー: SLACK_WEBHOOK_URL が設定されていません"
  exit 1
fi

if [ -z "$MESSAGE" ]; then
  echo "エラー: メッセージを指定してください"
  exit 1
fi

# Node.jsでJSONを安全に生成（改行・日本語・特殊文字すべて対応）
RESULT=$(node -e "process.stdout.write(JSON.stringify({text: process.argv[1]}));" "$MESSAGE" \
  | curl -s -X POST "$SLACK_WEBHOOK_URL" \
    -H 'Content-type: application/json' \
    --data @-)

if [ "$RESULT" = "ok" ]; then
  echo "✅ Slackに送信しました"
else
  echo "❌ 送信エラー: $RESULT"
  exit 1
fi
