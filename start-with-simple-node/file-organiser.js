const fs = require('fs');
const path = require('path');

const source_dir = path.join(__dirname, 'output', 'messy-files');
const organizedDir = path.join(__dirname, 'output', 'organized');

// console.log(source_dir,organizedDir)



const categories = {
    images: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"],
    documents: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
    videos: [".mp4", ".avi", ".mkv", ".mov", ".wmv"],
    audio: [".mp3", ".wav", ".flac", ".aac", ".ogg"],
    code: [".js", ".py", ".java", ".cpp", ".html", ".css"],
    archives: [".zip", ".rar", ".tar", ".gz", ".7z"],
    spreadsheets: [".xls", ".xlsx", ".csv"],
    others: [],
};
const testFiles = [
    "vacation.jpg",
    "report.pdf",
    "presentation.pptx",
    "music.mp3",
    "video.mp4",
    "script.js",
    "data.csv",
    "archive.zip",
    "photo.png",
    "notes.txt",
    "app.py",
    "movie.avi",
    "song.wav",
    "backup.tar.gz",
    "random.xyz",
    "nodejs.zip",
];


function initializeDirectory() {
    if (!fs.existsSync(source_dir)) {
        fs.mkdirSync(source_dir, { recursive: true });

        testFiles.forEach(file => {
            fs.writeFileSync(path.join(source_dir, file), `content of ${path.basename(file, path.extname(file))}`)
        })

    }

    console.log('messy files created');

    if (!fs.existsSync(organizedDir)) {
        fs.mkdirSync(organizedDir, { recursive: true });
    }

    Object.keys(categories).forEach((category) => {
        const categoryPath = path.join(organizedDir, category);
        if (!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath)
        }
    })

}


function getCategory(fileName) {
    console.log('started')
    const ext = path.extname(fileName).toLowerCase(); // .pdf, .img, .mp3
    console.log(ext)
    for (const [category, extensions] of Object.entries(categories)) {
        if (extensions.includes(ext)) {
            return category
        }
    }

    return 'others'
}


function organizeFiles() {
    console.log('organizing file\n');
    console.log('source dir', source_dir)
    console.log("destination", organizedDir);
    console.log("\n" + "-".repeat(50) + "\n");

    const files = fs.readdirSync(source_dir);
    if (files.length === 0) {
        console.log('no files found');
        return;
    }
    console.log(`found ${files.length}`);

    const stats = {
        total: 0,
        byCategory: {}
    }

    files.forEach((file) => {
        const sourcePath = path.join(source_dir, file);
        const stat = fs.statSync(sourcePath);
        console.log(`source path: ${sourcePath}\nstat: ${stat}`);

        if (stat.isDirectory()) {
            return;
        }

        const category = getCategory(file);
        const destDir = path.join(organizedDir,category);
        const destPath = path.join(destDir,file);
        console.log(`category: ${category}\ndestDir: ${destDir}\ndestPath: ${destPath}`);

        fs.copyFileSync(sourcePath,destPath);

        stats.total++;
        stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;

        console.log(`category: ${category}\nfile: ${file}\nsize:${stat.size}`);

    })

};


function showHelp(){
    console.log(`
        FILE ORGANIZER USAGE
        --------------------
        Commands: init -- organize
        --------------------------
        node file_name init -- for initialize
        node file_name organize -- for organize
        `)
}

const command = process.argv[2];

switch(command){
    case 'init':
        initializeDirectory();
        break;
    case 'organize':
        organizeFiles();
        break;
    default:
        showHelp();
        break;
}

