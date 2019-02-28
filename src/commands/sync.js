const program = require('commander');
const gitPullOrClone = require('ensure-git-repo');
const fs = require('fs');
const pkg = require('../../package.json');
const path = require('path');
const os = require('os');
const copyfiles = require('copyfiles2');

// command args '<>' is must
// command args '[]' is options
program
  .command('sync <project_name> <dest_dir>')
  .description('sync the project from poppy repo')
  .option('-g, --ignore', 'ignore the .poppyrc file')
  .option('-v, --verbose', 'verbose the progress')
  .action(async function(projectName, destDir, opts) {
    // console.log('sdfsdfsadadasdasd');
    // console.log('exec "%s" using %s mode', value, options.exec_mode);
    // console.log(project_name, dir);
    //
    const poppyDir = path.join(os.homedir(), '.poppy');
    await syncRepo(poppyDir, projectName);
    await copyFiles(poppyDir, projectName, destDir, opts.ignore);

  })
  .on('--help', function() {
    console.log('  Example:');
    console.log("  create test.md -p -A 'Alex' -t 'Example'");
    console.log('');
    console.log('');
  });


async function syncRepo(poppyDir, projectName) {
  await new Promise((resolve, reject)=>{
    gitPullOrClone('git@e.coding.net:value/ifpay-poppy.git',
      poppyDir, err => {
        if (err) {
          console.error(err.stack);
          reject(reject);
          return;
        }

        if (!fs.existsSync(path.join(poppyDir, projectName))) {
          reject(new Error(`Error projectName (${projectName}) Error Not Exists`));
          return;
        }

        resolve();
      });
  });
}

async function copyFiles(poppyDir, projectName, destDir, ignore) {
  // 读取 ignore file
  if (!destDir) {
    destDir = '.';
  }

  if (!destDir.startsWith('/') &&
    !destDir.startsWith('~')) {
    destDir = path.join(process.cwd(), destDir);
  }

  const projectDir = path.join(poppyDir, projectName);

  console.info(`[poppy-cli] sync project ${projectName} to ${destDir}`);

  const opts = {
    soft: false,
    // verbose: true,
    all: true,
    up: function(fromPath) {
      return fromPath.substring(projectDir.length + 1);
    },
  };

  const ignoreFilePath = path.join(destDir, '.poppyignore');
  if (!ignore && fs.existsSync(ignoreFilePath)) {
    const contents = fs.readFileSync(ignoreFilePath, 'utf8');
    opts.exclude = contents;
  }

  await new Promise((resolve, reject)=>{
    copyfiles([
      projectDir + '/**',
      destDir
    ], opts, (err)=> {
      if (err) {
        reject();
        return;
      }
      resolve();
    });
  });
}
