const { execSync } = require('child_process');


const buildProject = () => {
    console.log('Building project...');
    execSync('npm run build'); // Replace with your build command
  };
  
  const deployToHostingService = () => {
    console.log('Deploying to hosting service...');
    execSync('your-deployment-command-here'); // Replace with your deployment command
  };

  const main = () => {
    buildProject();
    deployToHostingService();
    console.log('Deployment completed.');
  };
  
  main();
  