const program = require('commander');
const fs = require('fs');
const path = require('path');
const colors = require('colors');

const pkg = require('../package.json');

// Provide a title to the process in `ps`
process.title = 'poppy';

program._name = process.title;
program.version(pkg.version);
program.pkg = pkg;
program.logger = (msg) => {
  console.info(colors.green(`[poppy-cli]: ${msg}`));
};

// here is fulfill commands

fs.readdirSync(path.join(__dirname, 'commands'))
  .filter(filename => {
    if (!filename.endsWith('.js')) {
      return false;
    }
    if (filename.startsWith('_')) {
      return false;
    }
    // console.log(`${filename}`);
    return true;
  })
  .forEach(filename => {
    require(`./commands/${filename}`);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp((txt)=>{
    return colors.red(txt); //display the help text in red on the console
  });
};
