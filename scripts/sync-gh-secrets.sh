#!/usr/bin/env bash
# sync-gh-secrets.sh
# C:\coo\.env の値を GitHub Secrets に一括登録するスクリプト
#
# 使い方:
#   bash sync-gh-secrets.sh <owner/repo>
#
# 例:
#   bash sync-gh-secrets.sh zumy8818/uds-receipt-ai
#   bash sync-gh-secrets.sh zumy8818/web-site-hearing-sheet

set -e

REPO="${1}"
ENV_FILE="/c/coo/.env"

if [ -z "$REPO" ]; then
  echo "使い方: bash sync-gh-secrets.sh <owner/repo>"
  echo "例:     bash sync-gh-secrets.sh zumy8818/uds-receipt-ai"
  exit 1
fi

if [ ! -f "$ENV_FILE" ]; then
  echo "エラー: $ENV_FILE が見つかりません"
  exit 1
fi

# gh コマンド確認
if ! command -v gh &> /dev/null; then
  echo "エラー: gh コマンドがインストールされていません"
  echo "→ https://cli.github.com/ からインストールしてください"
  exit 1
fi

echo "================================================"
echo " GitHub Secrets 同期"
echo " リポジトリ: $REPO"
echo " .env ファイル: $ENV_FILE"
echo "================================================"

# .env を読み込んで gh secret set を実行
# コメント行・空行・GOOGLE_MAPS_API_KEY などプロジェクト固有でないものは全て登録する
# （リポジトリ側で使わないSecretは無害なので全部登録でOK）

count=0
errors=0

while IFS= read -r line || [ -n "$line" ]; do
  # コメント行・空行をスキップ
  [[ "$line" =~ ^[[:space:]]*# ]] && continue
  [[ -z "${line// }" ]] && continue

  # KEY=VALUE の形式のみ処理
  if [[ "$line" =~ ^([A-Za-z_][A-Za-z0-9_]*)=(.*)$ ]]; then
    key="${BASH_REMATCH[1]}"
    value="${BASH_REMATCH[2]}"

    # 値の前後のクォートを除去
    value="${value%\"}"
    value="${value#\"}"
    value="${value%\'}"
    value="${value#\'}"

    printf "  %-35s → 登録中... " "$key"
    if gh secret set "$key" --body "$value" --repo "$REPO" 2>/dev/null; then
      echo "✅ OK"
      count=$((count + 1))
    else
      echo "❌ 失敗"
      errors=$((errors + 1))
    fi
  fi
done < "$ENV_FILE"

echo ""
echo "================================================"
echo " 完了: ${count}件登録, ${errors}件失敗"
echo " 確認: gh secret list --repo $REPO"
echo "================================================"
