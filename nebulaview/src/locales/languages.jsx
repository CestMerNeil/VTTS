// src/locales/languages.js

const createTranslations = (config) => ({
    common: {
        loading: config.loading,
        error: config.error,
        success: config.success,
        confirm: config.confirm,
        cancel: config.cancel,
        save: config.save,
        delete: config.delete,
        edit: config.edit,
    },
    nav: {
        home: config.nav.home,
        generate: config.nav.generate,
        audio: config.nav.audio,
        settings: config.nav.settings,
    },
    audio: {
        title: config.audio.title,
        player: config.audio.player,
        selectAudio: config.audio.selectAudio,
        loopMode: {
            title: config.audio.loopMode.title,
            none: config.audio.loopMode.none,
            single: config.audio.loopMode.single,
            all: config.audio.loopMode.all,
        },
        controls: {
            play: config.audio.controls.play,
            pause: config.audio.controls.pause,
            next: config.audio.controls.next,
            previous: config.audio.controls.previous,
        },
        noFiles: config.audio.noFiles,
        loadingError: config.audio.loadingError,
    },
    tts: {
        title: config.tts.title,
        inputLabel: config.tts.inputLabel,
        placeholder: config.tts.placeholder,
        generate: config.tts.generate,
        generating: config.tts.generating,
        success: config.tts.success,
        error: config.tts.error,
        options: {
            voice: config.tts.options.voice,
            speed: config.tts.options.speed,
            pitch: config.tts.options.pitch,
        },
    },
    settings: {
        title: config.settings.title,
        language: {
            title: config.settings.language.title,
            current: config.settings.language.current,
            systemDefault: config.settings.language.systemDefault,
        },
        theme: {
            title: config.settings.theme.title,
            colorful: config.settings.theme.colorful,
            classic: config.settings.theme.classic,
            dark: config.settings.theme.dark,
            special: config.settings.theme.special,
            names: config.settings.theme.names // 添加这个以支持主题名称翻译
        },
        about: {
            title: config.settings.about.title,
            version: config.settings.about.version,
        },
    },
});

export const zh = createTranslations({
    loading: "加载中...",
    error: "发生错误",
    success: "操作成功",
    confirm: "确认",
    cancel: "取消",
    save: "保存",
    delete: "删除",
    edit: "编辑",
    nav: {
        home: "首页",
        generate: "生成",
        audio: "音频",
        settings: "设置",
    },
    audio: {
        title: "音频列表",
        player: "播放器",
        selectAudio: "请从列表中选择一个音频文件",
        loopMode: {
            title: "循环模式",
            none: "不循环",
            single: "单曲循环",
            all: "列表循环",
        },
        controls: {
            play: "播放",
            pause: "暂停",
            next: "下一首",
            previous: "上一首",
        },
        noFiles: "暂无音频文件",
        loadingError: "加载音频文件失败",
    },
    tts: {
        title: "文字转语音",
        inputLabel: "输入文本内容",
        placeholder: "请输入要转换为语音的文本内容...",
        generate: "开始生成",
        generating: "生成中...",
        success: "音频生成成功！请到音频列表查看。",
        error: "生成过程中出现错误，请重试",
        options: {
            voice: "语音",
            speed: "语速",
            pitch: "音调",
        },
    },
    settings: {
        title: "设置",
        language: {
            title: "语言设置",
            current: "当前语言",
            systemDefault: "系统默认",
        },
        theme: {
            title: "主题设置",
            colorful: "🌈 彩色主题",
            classic: "🎨 经典主题",
            dark: "🌙 暗色主题",
            special: "🎯 特殊主题",
            names: {
                // 经典主题
                light: "明亮",
                dark: "暗黑",
                emerald: "翠绿",
                corporate: "商务",
                business: "职业",
                winter: "冬季",

                // 彩色主题
                cupcake: "蛋糕",
                valentine: "粉红",
                garden: "花园",
                autumn: "秋季",
                pastel: "柔和",
                fantasy: "梦幻",

                // 暗色主题
                synthwave: "合成波",
                cyberpunk: "赛博朋克",
                halloween: "万圣节",
                forest: "森林",
                luxury: "奢华",
                dracula: "德古拉",
                night: "夜晚",
                coffee: "咖啡",

                // 特殊主题
                retro: "复古",
                aqua: "水色",
                lofi: "低保真",
                wireframe: "线框",
                black: "纯黑",
                cmyk: "青色",
                acid: "酸性",
                lemonade: "柠檬"
            }
        },
        about: {
            title: "关于",
            version: "版本",
        },
    },
});

export const en = createTranslations({
    loading: "Loading...",
    error: "An error occurred",
    success: "Operation successful",
    confirm: "Confirm",
    cancel: "Cancel",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    nav: {
        home: "Home",
        generate: "Generate",
        audio: "Audio",
        settings: "Settings",
    },
    audio: {
        title: "Audio List",
        player: "Player",
        selectAudio: "Please select an audio file from the list",
        loopMode: {
            title: "Loop Mode",
            none: "No Loop",
            single: "Single Loop",
            all: "Loop All",
        },
        controls: {
            play: "Play",
            pause: "Pause",
            next: "Next",
            previous: "Previous",
        },
        noFiles: "No audio files available",
        loadingError: "Failed to load audio files",
    },
    tts: {
        title: "Text to Speech",
        inputLabel: "Input Text",
        placeholder: "Enter text to convert to speech...",
        generate: "Generate",
        generating: "Generating...",
        success: "Audio generated successfully! Check the audio list.",
        error: "Error occurred during generation, please try again",
        options: {
            voice: "Voice",
            speed: "Speed",
            pitch: "Pitch",
        },
    },
    settings: {
        title: "Settings",
        language: {
            title: "Language Settings",
            current: "Current Language",
            systemDefault: "System Default",
        },
        theme: {
            title: "Theme Settings",
            colorful: "🌈 Colorful Theme",
            classic: "🎨 Classic Theme",
            dark: "🌙 Dark Theme",
            special: "🎯 Special Theme",
            names: {
                // Classic Themes
                light: "Light",
                dark: "Dark",
                emerald: "Emerald",
                corporate: "Corporate",
                business: "Business",
                winter: "Winter",

                // Colorful Themes
                cupcake: "Cupcake",
                valentine: "Valentine",
                garden: "Garden",
                autumn: "Autumn",
                pastel: "Pastel",
                fantasy: "Fantasy",

                // Dark Themes
                synthwave: "Synthwave",
                cyberpunk: "Cyberpunk",
                halloween: "Halloween",
                forest: "Forest",
                luxury: "Luxury",
                dracula: "Dracula",
                night: "Night",
                coffee: "Coffee",

                // Special Themes
                retro: "Retro",
                aqua: "Aqua",
                lofi: "Lofi",
                wireframe: "Wireframe",
                black: "Pure Black",
                cmyk: "CMYK",
                acid: "Acid",
                lemonade: "Lemonade"
            }
        },
        about: {
            title: "About",
            version: "Version",
        },
    },
});

export const fr = createTranslations({
    loading: "Chargement...",
    error: "Une erreur est survenue",
    success: "Opération réussie",
    confirm: "Confirmer",
    cancel: "Annuler",
    save: "Enregistrer",
    delete: "Supprimer",
    edit: "Modifier",
    nav: {
        home: "Accueil",
        generate: "Générer",
        audio: "Audio",
        settings: "Paramètres",
    },
    audio: {
        title: "Liste audio",
        player: "Lecteur",
        selectAudio: "Veuillez sélectionner un fichier audio dans la liste",
        loopMode: {
            title: "Mode de boucle",
            none: "Pas de boucle",
            single: "Boucle simple",
            all: "Boucle totale",
        },
        controls: {
            play: "Lecture",
            pause: "Pause",
            next: "Suivant",
            previous: "Précédent",
        },
        noFiles: "Aucun fichier audio disponible",
        loadingError: "Échec du chargement des fichiers audio",
    },
    tts: {
        title: "Texte en parole",
        inputLabel: "Saisir le texte",
        placeholder: "Entrez le texte à convertir en parole...",
        generate: "Générer",
        generating: "Génération...",
        success: "Audio généré avec succès ! Consultez la liste audio.",
        error: "Une erreur s'est produite lors de la génération, veuillez réessayer",
        options: {
            voice: "Voix",
            speed: "Vitesse",
            pitch: "Hauteur",
        },
    },
    settings: {
        title: "Paramètres",
        language: {
            title: "Paramètres de langue",
            current: "Langue actuelle",
            systemDefault: "Par défaut du système",
        },
        theme: {
            title: "Paramètres du thème",
            colorful: "🌈 Thème coloré",
            classic: "🎨 Thème classique",
            dark: "🌙 Thème sombre",
            special: "🎯 Thème spécial",
            names: {
                // Thèmes classiques
                light: "Lumineux",
                dark: "Sombre",
                emerald: "Émeraude",
                corporate: "Entreprise",
                business: "Professionnel",
                winter: "Hiver",

                // Thèmes colorés
                cupcake: "Cupcake",
                valentine: "Saint-Valentin",
                garden: "Jardin",
                autumn: "Automne",
                pastel: "Pastel",
                fantasy: "Fantaisie",

                // Thèmes sombres
                synthwave: "Synthwave",
                cyberpunk: "Cyberpunk",
                halloween: "Halloween",
                forest: "Forêt",
                luxury: "Luxe",
                dracula: "Dracula",
                night: "Nuit",
                coffee: "Café",

                // Thèmes spéciaux
                retro: "Rétro",
                aqua: "Aqua",
                lofi: "Lofi",
                wireframe: "Fil de fer",
                black: "Noir pur",
                cmyk: "CMJN",
                acid: "Acide",
                lemonade: "Citronnade"
            }
        },
        about: {
            title: "À propos",
            version: "Version",
        },
    },
});

export const ja = createTranslations({
    loading: "読み込み中...",
    error: "エラーが発生しました",
    success: "操作が成功しました",
    confirm: "確認",
    cancel: "キャンセル",
    save: "保存",
    delete: "削除",
    edit: "編集",
    nav: {
        home: "ホーム",
        generate: "生成",
        audio: "オーディオ",
        settings: "設定",
    },
    audio: {
        title: "オーディオリスト",
        player: "プレイヤー",
        selectAudio: "リストからオーディオファイルを選択してください",
        loopMode: {
            title: "ループモード",
            none: "ループなし",
            single: "1曲リピート",
            all: "すべてリピート",
        },
        controls: {
            play: "再生",
            pause: "一時停止",
            next: "次へ",
            previous: "前へ",
        },
        noFiles: "オーディオファイルがありません",
        loadingError: "オーディオファイルの読み込みに失敗しました",
    },
    tts: {
        title: "テキスト読み上げ",
        inputLabel: "テキスト入力",
        placeholder: "音声に変換するテキストを入力してください...",
        generate: "生成開始",
        generating: "生成中...",
        success: "音声が正常に生成されました！オーディオリストを確認してください。",
        error: "生成中にエラーが発生しました。再試行してください",
        options: {
            voice: "音声",
            speed: "速度",
            pitch: "ピッチ",
        },
    },
    settings: {
        title: "設定",
        language: {
            title: "言語設定",
            current: "現在の言語",
            systemDefault: "システムデフォルト",
        },
        theme: {
            title: "テーマ設定",
            colorful: "🌈 カラフルテーマ",
            classic: "🎨 クラシックテーマ",
            dark: "🌙 ダークテーマ",
            special: "🎯 特別テーマ",
            names: {
                // クラシックテーマ
                light: "ライト",
                dark: "ダーク",
                emerald: "エメラルド",
                corporate: "コーポレート",
                business: "ビジネス",
                winter: "ウィンター",

                // カラフルテーマ
                cupcake: "カップケーキ",
                valentine: "バレンタイン",
                garden: "ガーデン",
                autumn: "秋",
                pastel: "パステル",
                fantasy: "ファンタジー",

                // ダークテーマ
                synthwave: "シンセウェーブ",
                cyberpunk: "サイバーパンク",
                halloween: "ハロウィン",
                forest: "森",
                luxury: "ラグジュアリー",
                dracula: "ドラキュラ",
                night: "ナイト",
                coffee: "コーヒー",

                // 特別テーマ
                retro: "レトロ",
                aqua: "アクア",
                lofi: "ローファイ",
                wireframe: "ワイヤーフレーム",
                black: "純粋な黒",
                cmyk: "CMYK",
                acid: "アシッド",
                lemonade: "レモネード"
            }
        },
        about: {
            title: "情報",
            version: "バージョン",
        },
    },
});

export const ko = createTranslations({
    loading: "로딩 중...",
    error: "오류가 발생했습니다",
    success: "작업이 성공했습니다",
    confirm: "확인",
    cancel: "취소",
    save: "저장",
    delete: "삭제",
    edit: "편집",
    nav: {
        home: "홈",
        generate: "생성",
        audio: "오디오",
        settings: "설정",
    },
    audio: {
        title: "오디오 목록",
        player: "플레이어",
        selectAudio: "목록에서 오디오 파일을 선택하세요",
        loopMode: {
            title: "반복 모드",
            none: "반복 없음",
            single: "단일 반복",
            all: "전체 반복",
        },
        controls: {
            play: "재생",
            pause: "일시 정지",
            next: "다음 곡",
            previous: "이전 곡",
        },
        noFiles: "오디오 파일이 없습니다",
        loadingError: "오디오 파일을 불러오는 데 실패했습니다",
    },
    tts: {
        title: "텍스트 음성 변환",
        inputLabel: "텍스트 입력",
        placeholder: "음성으로 변환할 텍스트를 입력하세요...",
        generate: "생성 시작",
        generating: "생성 중...",
        success: "오디오가 성공적으로 생성되었습니다! 오디오 목록을 확인하세요.",
        error: "생성 중 오류가 발생했습니다. 다시 시도해주세요",
        options: {
            voice: "음성",
            speed: "속도",
            pitch: "음높이",
        },
    },
    settings: {
        title: "설정",
        language: {
            title: "언어 설정",
            current: "현재 언어",
            systemDefault: "시스템 기본값",
        },
        theme: {
            title: "테마 설정",
            colorful: "🌈 컬러풀 테마",
            classic: "🎨 클래식 테마",
            dark: "🌙 다크 테마",
            special: "🎯 특별 테마",
            names: {
                // 클래식 테마
                light: "라이트",
                dark: "다크",
                emerald: "에메랄드",
                corporate: "기업",
                business: "비즈니스",
                winter: "겨울",

                // 컬러풀 테마
                cupcake: "컵케이크",
                valentine: "발렌타인",
                garden: "정원",
                autumn: "가을",
                pastel: "파스텔",
                fantasy: "판타지",

                // 다크 테마
                synthwave: "신스웨이브",
                cyberpunk: "사이버펑크",
                halloween: "할로윈",
                forest: "숲",
                luxury: "럭셔리",
                dracula: "드라큘라",
                night: "밤",
                coffee: "커피",

                // 특별 테마
                retro: "레트로",
                aqua: "아쿠아",
                lofi: "로우파이",
                wireframe: "와이어프레임",
                black: "순수한 검정",
                cmyk: "CMYK",
                acid: "애시드",
                lemonade: "레모네이드"
            }
        },
        about: {
            title: "정보",
            version: "버전",
        },
    },
});