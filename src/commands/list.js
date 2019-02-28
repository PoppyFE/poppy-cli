const path = require('path');
const fs = require('fs');
const os = require('os');
const program = require('commander');
const ignoreParse = require('gitignore-globs');

const gitPullOrClone = require('../utils/ensure-git-repo');

// command args '<>' is must
// command args '[]' is options
program
  .command('list')
  .description('list the poppy project name list')
  .action(async function() {
    // console.log('sdfsdfsadadasdasd');
    // console.log('exec "%s" using %s mode', value, options.exec_mode);
    // console.log(project_name, dir);
    const poppyDir = path.join(os.homedir(), '.poppy');
    await syncRepo(poppyDir);

    program.logger(`projects:`);
    const names = fs.readdirSync(poppyDir).filter(filename => {
      if (filename.includes('.')) {
        return false;
      }

      if (!fs.lstatSync(path.join(poppyDir, filename)).isDirectory()) {
        return false;
      }

      return true;
    }).map(filename => {
      return `poppy sync ${filename} dir`;
    });
    program.logger(names.join('\n'), {notitle: true, color: 'red'});
  });


async function syncRepo(poppyDir) {
  await new Promise((resolve, reject)=>{
    gitPullOrClone('git@e.coding.net:value/ifpay-poppy.git',
      poppyDir, err => {
        if (err) {
          console.error(err.stack);
          reject(reject);
          return;
        }

        resolve();
      });
  });
}
