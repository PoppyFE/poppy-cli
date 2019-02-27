const program = require('commander');
const gitDownload = require('git-download');
const pkg = require('../../package.json');

// command args '<>' is must
// command args '[]' is options
program
  .command('sync <project_name> <dir>')
  .description('sync the project from poppy repo')
  .option('-g, --ignore', 'ignore the .poppyrc file')
  .action(function(project_name, dir) {
    // console.log('sdfsdfsadadasdasd');
    // console.log('exec "%s" using %s mode', value, options.exec_mode);
    console.log(project_name, dir)

    gitDownload({
      source: 'ssh://git@github.com:ValueFE/poppy-cli.git',
      branch: 'master:' + project_name,
      savetar: false,
      dest: '/Users/alex/Projects/test/aaa'
    }, function(err, tarfile) {
      if (err) {
        console.error('Error occurred downloading '+err);
        return;
      }
      console.log('Successfully downloaded ');
      if (tarfile) {
        console.log('Output: '+tarfile);
      }
    });
  })
  .on('--help', function() {
    console.log('  Example:');
    console.log("  create test.md -p -A 'Alex' -t 'Example'");
    console.log('');
    console.log('');
  });
