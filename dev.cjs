const { execSync } = require('child_process');
try {
  console.log('Starting dev server...');
  execSync('npm run dev', {
    cwd: 'c:/myproject/myorder',
    stdio: 'inherit'
  });
} catch (error) {
  console.error('Error:', error.message);
}