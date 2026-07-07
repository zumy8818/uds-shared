---
description: Claude Code設定（CLAUDE.md/commands/settings.json）をuds-shared経由でPC間同期する
argument-hint: push | pull
---

# Claude設定同期

引数 `$ARGUMENTS`（push または pull）に応じて同期スクリプトを実行してください。

手順:

1. 引数が push でも pull でもない場合は、ユーザーに「push（このPC→GitHub）と pull（GitHub→このPC）のどちらですか？」と確認する。
2. 次のコマンドを実行する:

```powershell
powershell -ExecutionPolicy Bypass -File "C:\coo\uds-shared\scripts\sync-claude-config.ps1" -Mode $ARGUMENTS
```

3. スクリプトが diff と確認プロンプト（y/N）を表示するので、diff の要約をユーザーに日本語で報告してから、ユーザーの指示に従って y または N を入力する。**勝手に y を入力しないこと。**
4. pull を実行した場合は、反映には Claude Code Desktop の再起動が必要である旨をユーザーに伝える。

注意:
- settings.local.json は同期対象外。リポジトリ内に混入している警告が出たら削除を提案する。
- git pull --rebase が衝突した場合は、衝突ファイルを提示してユーザーの判断を仰ぐ。
