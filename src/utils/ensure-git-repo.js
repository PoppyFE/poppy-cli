const crossSpawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');

// gitPullOrClone('git@e.coding.net:value/ifpay-poppy.git', '/Users/alex/Projects/test/ccc', ()=>{
//   console.log('111');
// });

function gitPullOrClone (url, outPath, cb) {
  // ensure rw
  // is a exist git repo
  if (fs.existsSync(outPath) && fs.existsSync(path.join(outPath, '/.git'))) {
    gitPull();
  } else {
    gitClone();
  }

  function gitClone () {
    const args = [ 'clone', url, outPath ]
    spawn('git', args, {}, function (err) {
      if (err) err.message += ' (git clone) (' + url + ')'
      cb(err)
    })
  }

  function gitPull () {
    const args = [ 'pull']
    spawn('git', args, { cwd: outPath }, function (err) {
      if (err) err.message += ' (git pull) (' + url + ')'
      cb(err)
    })
  }
}

function spawn (command, args, opts, cb) {
  opts.stdio = 'inherit';

  const child = crossSpawn(command, args, opts)
  child.on('error', cb);
  child.on('close', function (code) {
    if (code !== 0) return cb(new Error('Non-zero exit code: ' + code))
    cb(null)
  });
  return child
}

module.exports = gitPullOrClone;
