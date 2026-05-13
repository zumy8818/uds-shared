#!/bin/bash
# git push + Slack通知をセットで行うラッパースクリプト
# 使い方: ./git-push-notify.sh [git pushのオプション]
# 例: ./git-push-notify.sh origin main

# どちらのPCか判定（ユーザー名で識別）
USERNAME=$(whoami)
if [ "$USERNAME" = "owner" ]; then
  PC_NAME="ShopPC"
elif [ "$USERNAME" = "scare" ]; then
  PC_NAME="HomePC"
else
  PC_NAME="$USERNAME"
fi

# 現在のリポジトリ名を取得
REPO_NAME=$(basename "$(git rev-parse --show-toplevel)" 2>/dev/null || echo "不明なリポジトリ")

# 最新コミットメッセージを取得
COMMIT_MSG=$(git log -1 --pretty=format:"%s" 2>/dev/null || echo "（コミット情報なし）")

# git push 実行
echo "📤 git push を実行中..."
git push "$@"
PUSH_RESULT=$?

if [ $PUSH_RESULT -eq 0 ]; then
  # push成功時にSlack通知
  NOW=$(date "+%Y-%m-%d %H:%M")
  SLACK_MSG="📤 *[${PC_NAME}] GitHubにpushしました*\n🗂 リポジトリ: \`${REPO_NAME}\`\n📝 コミット: ${COMMIT_MSG}\n🕐 ${NOW}"
  bash "$(dirname "$0")/slack-notify.sh" "$SLACK_MSG"
else
  echo "❌ git push が失敗しました（Slack通知はスキップ）"
fi

exit $PUSH_RESULT
