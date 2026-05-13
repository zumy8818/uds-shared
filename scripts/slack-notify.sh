#!/bin/bash
# Slackにメッセージを送るスクリプト
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

# bash組み込みでダブルクォートをエスケープ
ESCAPED="${MESSAGE//\"/\\\"}"

# --data @- で標準入力からJSONを渡す（日本語文字化け対策）
RESULT=$(echo "{\"text\":\"${ESCAPED}\"}" | curl -s -X POST "$SLACK_WEBHOOK_URL" \
  -H 'Content-type: application/json; charset=utf-8' \
  --data @-)

if [ "$RESULT" = "ok" ]; then
  echo "✅ Slackに送信しました"
else
  echo "❌ 送信エラー: $RESULT"
  exit 1
fi
