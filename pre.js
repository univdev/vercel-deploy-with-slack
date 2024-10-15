import * as child from 'child_process';

const run = (command) => {
  return new Promise((resolve, reject) => {
    child.exec(command, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stdout);
    });
  });
};

const main = async () => {
  try {
    console.log("Starting npm install and build process...");

    // Run npm install
    await run("npm install");

    // Run npm build
    await run("npm run build");

    console.log("npm install and build completed successfully!");
  } catch (error) {
    console.error("Process failed:", error);
    process.exit(1); // Exit with an error code
  }
};

export default main;
