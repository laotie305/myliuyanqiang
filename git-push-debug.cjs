const { execSync } = require('child_process');
const gitPath = 'C:\\Program Files\\Git\\cmd\\git.exe';
try {
  console.log('Adding all files...');
  execSync(`"${gitPath}" add .`, { cwd: 'c:/myproject/myorder', stdio: 'inherit' });
  
  try {
    console.log('Committing...');
    execSync(`"${gitPath}" commit -m "Add debug information"`, { cwd: 'c:/myproject/myorder', stdio: 'inherit' });
  } catch (e) {
    console.log('Nothing to commit, already up to date');
  }
  
  console.log('Pushing to GitHub...');
  execSync(`"${gitPath}" push origin master`, { cwd: 'c:/myproject/myorder', stdio: 'inherit' });
  console.log('Done!');
} catch (error) {
  console.error('Error:', error.message);
}