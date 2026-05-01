const { execSync } = require('child_process');
const gitPath = 'C:\\Program Files\\Git\\cmd\\git.exe';
const fs = require('fs');
try {
  console.log('Configuring git user...');
  execSync(`"${gitPath}" config --global user.email "developer@example.com"`, { stdio: 'inherit' });
  execSync(`"${gitPath}" config --global user.name "Developer"`, { stdio: 'inherit' });

  const gitDir = 'c:/myproject/myorder/.git';
  if (fs.existsSync(gitDir)) {
    console.log('Removing existing .git folder...');
    fs.rmSync(gitDir, { recursive: true });
  }

  console.log('Initializing git...');
  execSync(`"${gitPath}" init`, { cwd: 'c:/myproject/myorder', stdio: 'inherit' });
  console.log('Adding remote origin...');
  execSync(`"${gitPath}" remote add origin https://github.com/laotie305/myliuyanqiang.git`, { cwd: 'c:/myproject/myorder', stdio: 'inherit' });
  console.log('Adding files...');
  execSync(`"${gitPath}" add .`, { cwd: 'c:/myproject/myorder', stdio: 'inherit' });
  console.log('Committing...');
  execSync(`"${gitPath}" commit -m "Initial commit: Vue 3 message board with Supabase"`, { cwd: 'c:/myproject/myorder', stdio: 'inherit' });
  console.log('Pushing to GitHub...');
  execSync(`"${gitPath}" push -u origin master --force`, { cwd: 'c:/myproject/myorder', stdio: 'inherit' });
  console.log('Done!');
} catch (error) {
  console.error('Error:', error.message);
}