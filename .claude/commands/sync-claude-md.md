# CLAUDE.md同期コマンド
# 使い方：Claude Codeで `/sync-claude-md` と入力

以下の手順でCLAUDE.mdを両PC間で同期します。

## 手順

1. `~\.claude\CLAUDE.md` を `uds-shared` にコピーする
```bash
copy "$env:USERPROFILE\.claude\CLAUDE.md" "C:\dev\coo\スキル・ルール\uds-shared\CLAUDE.md"
```

2. GitHubにpushする
```bash
cd C:\dev\coo\スキル・ルール\uds-shared
git add CLAUDE.md
git commit -m "update: CLAUDE.md同期 $(Get-Date -Format 'yyyy-MM-dd')"
git push origin main
```

3. 完了を報告する
「✅ CLAUDE.mdをGitHubに同期しました」と出力する

## 注意
- 必ず作業終了時に実行すること
- もう一方のPCで作業開始時に `git pull origin main` を実行すること
