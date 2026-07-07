# ============================================================
# sync-claude-config.ps1  (v2)
# Claude Code 設定を uds-shared リポジトリ経由で PC 間同期する
#
# 同期対象:
#   ~/.claude/CLAUDE.md
#   ~/.claude/commands/   (カスタムスラッシュコマンド)
#   ~/.claude/agents/     (存在する場合のみ)
#   ~/.claude/skills/     (存在する場合のみ)
#   ~/.claude/settings.json
#
# 同期しないもの (意図的):
#   settings.local.json   … PC固有のフック・環境変数
#   projects/ / sessions  … パス依存のローカルデータ
#   認証情報・トークン類
#
# 使い方:
#   .\sync-claude-config.ps1 -Mode push   # ローカル → GitHub
#   .\sync-claude-config.ps1 -Mode pull   # GitHub → ローカル
#   -DryRun を付けると変更内容の表示のみ (書き込みなし)
# ============================================================

param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("push", "pull")]
    [string]$Mode,

    [switch]$DryRun
)

# ---------- 設定 (環境に合わせてここだけ確認) ----------
# uds-shared のローカルクローンのパス。両PCで実パスが違ってもOK。
$RepoPath = "C:\coo\スキル・ルール\uds-shared"          # ← 実際のクローン先に合わせて変更
$RepoSubDir = "claude-config"            # リポジトリ内の格納フォルダ
# -------------------------------------------------------

$ClaudeDir = Join-Path $env:USERPROFILE ".claude"
$TargetDir = Join-Path $RepoPath $RepoSubDir
$PcName    = "$env:COMPUTERNAME ($env:USERNAME)"

$SyncFiles   = @("CLAUDE.md", "settings.json")
$SyncFolders = @("commands", "agents", "skills")

function Write-Step($msg) { Write-Host "==> $msg" -ForegroundColor Cyan }
function Write-Warn($msg) { Write-Host "!!  $msg" -ForegroundColor Yellow }

# ---------- 事前チェック ----------
if (-not (Test-Path $ClaudeDir)) {
    Write-Error ".claude ディレクトリが見つかりません: $ClaudeDir"
    exit 1
}
if (-not (Test-Path (Join-Path $RepoPath ".git"))) {
    Write-Error "uds-shared のクローンが見つかりません: $RepoPath`nRepoPath を確認するか、git clone してください。"
    exit 1
}
if (-not (Test-Path $TargetDir)) {
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
}

# settings.local.json が誤って混入していないか常に確認
$leak = Join-Path $TargetDir "settings.local.json"
if (Test-Path $leak) {
    Write-Warn "リポジトリ内に settings.local.json が存在します。同期対象外なので削除を推奨します: $leak"
}

Push-Location $RepoPath
try {
    # ---------- 最初に必ず pull (分岐の早期検出) ----------
    Write-Step "リモートの最新を取得中..."
    git pull --rebase
    if ($LASTEXITCODE -ne 0) {
        Write-Warn "git pull --rebase が失敗しました。衝突を解決してから再実行してください。"
        exit 1
    }

    if ($Mode -eq "push") {
        # ---------- ローカル → リポジトリ ----------
        Write-Step "ローカル設定をリポジトリへコピー中... ($PcName)"

        foreach ($f in $SyncFiles) {
            $src = Join-Path $ClaudeDir $f
            if (Test-Path $src) {
                if (-not $DryRun) { Copy-Item $src (Join-Path $TargetDir $f) -Force }
                Write-Host "    file:   $f"
            }
        }
        foreach ($d in $SyncFolders) {
            $src = Join-Path $ClaudeDir $d
            if (Test-Path $src) {
                $dst = Join-Path $TargetDir $d
                if (-not $DryRun) {
                    # /MIR: リポジトリ側をローカルの完全な鏡にする (削除も反映)
                    robocopy $src $dst /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
                }
                Write-Host "    folder: $d\"
            }
        }

        # ---------- diff 確認 → コミット ----------
        Write-Step "変更内容:"
        git status --short -- $RepoSubDir
        $diff = git status --porcelain -- $RepoSubDir
        if (-not $diff) {
            Write-Host "変更なし。同期済みです。" -ForegroundColor Green
            exit 0
        }
        git --no-pager diff -- $RepoSubDir

        if ($DryRun) {
            Write-Warn "DryRun のためコミットしません。"
            exit 0
        }

        $answer = Read-Host "この内容でコミット&プッシュしますか? (y/N)"
        if ($answer -ne "y") {
            Write-Warn "中断しました。リポジトリ内の変更は git checkout で戻せます。"
            exit 0
        }

        git add $RepoSubDir
        git commit -m "sync claude-config from $PcName $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
        git push
        Write-Host "✅ push 完了" -ForegroundColor Green
    }
    else {
        # ---------- リポジトリ → ローカル ----------
        Write-Step "リポジトリの設定をローカルへ反映します ($PcName)"
        Write-Warn "ローカルの CLAUDE.md / settings.json は上書きされます。"

        if (-not $DryRun) {
            # 念のためローカルをバックアップ
            $backup = Join-Path $ClaudeDir ("_backup_" + (Get-Date -Format "yyyyMMdd_HHmmss"))
            New-Item -ItemType Directory -Path $backup -Force | Out-Null
            foreach ($f in $SyncFiles) {
                $src = Join-Path $ClaudeDir $f
                if (Test-Path $src) { Copy-Item $src $backup }
            }
            Write-Host "    バックアップ: $backup"
        }

        $answer = if ($DryRun) { "y" } else { Read-Host "続行しますか? (y/N)" }
        if ($answer -ne "y") { Write-Warn "中断しました。"; exit 0 }

        foreach ($f in $SyncFiles) {
            $src = Join-Path $TargetDir $f
            if (Test-Path $src) {
                if (-not $DryRun) { Copy-Item $src (Join-Path $ClaudeDir $f) -Force }
                Write-Host "    file:   $f"
            }
        }
        foreach ($d in $SyncFolders) {
            $src = Join-Path $TargetDir $d
            if (Test-Path $src) {
                $dst = Join-Path $ClaudeDir $d
                if (-not $DryRun) {
                    # pull 側は削除を伴わない上書きコピー (/E)。
                    # ローカル限定のコマンドを消さないための安全策。
                    robocopy $src $dst /E /NFL /NDL /NJH /NJS /NP | Out-Null
                }
                Write-Host "    folder: $d\"
            }
        }
        if ($DryRun) { Write-Warn "DryRun のため書き込みしていません。" }
        else { Write-Host "✅ pull 完了。Claude Code Desktop を再起動すると反映されます。" -ForegroundColor Green }
    }
}
finally {
    Pop-Location
}
