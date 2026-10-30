const QUESTIONS = [
  {
    category: "WSL",
    question: "インストール済みのディストリビューションと、それぞれの WSL バージョンを一覧表示するコマンドはどれ？",
    choices: ["wsl --status", "wsl -l -v", "wsl --update", "wsl --install"],
    answer: 1,
    explanation: "wsl -l -v（wsl --list --verbose）で、ディストリビューション名・状態・WSL バージョンを確認できます。",
  },
  {
    category: "WSL",
    question: "WSL 2 の説明として正しいものはどれ？",
    choices: [
      "Linux のシステムコールを Windows の API に変換して動作する",
      "軽量なユーティリティ VM 上で本物の Linux カーネルを動かす",
      "Windows 上で Linux の GUI アプリだけを実行する仕組み",
      "Hyper-V を使わずに動作するエミュレーター",
    ],
    answer: 1,
    explanation: "WSL 2 は軽量なユーティリティ VM 上で実際の Linux カーネルを動かします。システムコール変換方式は WSL 1 の仕組みです。",
  },
  {
    category: "WSL",
    question: "実行中のすべてのディストリビューションと WSL 2 の VM を停止するコマンドはどれ？",
    choices: ["wsl --terminate", "wsl --unregister", "wsl --shutdown", "wsl --exit"],
    answer: 2,
    explanation: "wsl --shutdown はすべてのディストリビューションと WSL 2 の VM を即座に停止します。wsl --terminate <名前> は指定したディストリビューションだけを停止します。",
  },
  {
    category: "WSL",
    question: "WSL の Linux 側から Windows の C ドライブにアクセスするときのパスはどれ？",
    choices: ["/c", "/windows/c", "/mnt/c", "/media/c"],
    answer: 2,
    explanation: "Windows のドライブは /mnt 配下に自動マウントされ、C ドライブは /mnt/c でアクセスできます。",
  },
  {
    category: "WSL",
    question: "新しくインストールするディストリビューションの既定を WSL 2 にするコマンドはどれ？",
    choices: [
      "wsl --set-version 2",
      "wsl --default 2",
      "wsl --set-default-version 2",
      "wsl --upgrade 2",
    ],
    answer: 2,
    explanation: "wsl --set-default-version 2 で既定のバージョンを設定します。既存のディストリビューションを変換する場合は wsl --set-version <名前> 2 を使います。",
  },
  {
    category: "Git",
    question: "作業ツリーの変更をステージングエリアに追加するコマンドはどれ？",
    choices: ["git commit", "git add", "git push", "git stash"],
    answer: 1,
    explanation: "git add で変更をステージングエリア（インデックス）に追加し、git commit で記録します。",
  },
  {
    category: "Git",
    question: "新しいブランチを作成して、そのブランチに切り替えるコマンドはどれ？",
    choices: [
      "git branch -d <name>",
      "git merge <name>",
      "git switch -c <name>",
      "git restore <name>",
    ],
    answer: 2,
    explanation: "git switch -c <name> はブランチの作成と切り替えを同時に行います（git checkout -b <name> と同じ動作です）。",
  },
  {
    category: "Git",
    question: "リモートの変更を取得し、現在のブランチへの統合まで行うコマンドはどれ？",
    choices: ["git fetch", "git clone", "git pull", "git remote"],
    answer: 2,
    explanation: "git pull は git fetch（取得）と git merge（統合）を続けて実行します。git fetch は取得のみです。",
  },
  {
    category: "Git",
    question: "直前のコミットのメッセージを修正するコマンドはどれ？",
    choices: ["git commit --amend", "git revert HEAD", "git reset --hard", "git log --edit"],
    answer: 0,
    explanation: "git commit --amend で直前のコミットを作り直し、メッセージを修正できます。プッシュ済みのコミットへの使用は注意が必要です。",
  },
  {
    category: "Git",
    question: "Git で追跡しないファイルやディレクトリを指定するためのファイルはどれ？",
    choices: [".gitconfig", ".gitignore", ".gitkeep", ".gitattributes"],
    answer: 1,
    explanation: ".gitignore に記述したパターンに一致するファイルは、追跡対象外になります。",
  },
];

if (typeof module !== "undefined") {
  module.exports = { QUESTIONS };
}
