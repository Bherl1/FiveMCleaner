const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const colors = require('colors');

console.log(`
  ${'______           __         ________'.yellow}
  ${'/ ____/___ ______/ /_  ___  / ____/ /__  ____ _____  ___  _____'.yellow}
  ${'/ /   / __ `/ ___/ __ \/ _ \/ /   / / _ \/ __ `/ __ \/ _ \/ ___/'.yellow}
  ${'/ /___/ /_/ / /__/ / / /  __/ /___/ /  __/ /_/ / / / /  __/ /'.yellow}
  ${'\____/\__,_/\___/_/ /_/\___/\____/_/\___/\__,_/_/ /_/\___/_/'.yellow}
`.bold);

console.log(colors.green("\nYou need Discord Bot/Software Development Services? Contact Me via Discord: bherl1\n"));
console.log(colors.cyan("Press Enter to optimize FiveM and Clear the cache..."));
process.stdin.once('data', () => {
  console.clear();

  console.log(colors.red("\nClearing FiveM Cache...\n"));

  const cachePaths = [
    "%LocalAppData%/FiveM/FiveM.app/data/cache",
    "%LocalAppData%/FiveM/FiveM.app/data/game-storage",
    "%LocalAppData%/FiveM/FiveM.app/data/nui-storage",
    "%LocalAppData%/FiveM/FiveM.app/data/server-cache",
    "%LocalAppData%/FiveM/FiveM.app/data/server-cache-priv",
    "%LocalAppData%/FiveM/FiveM.app/logs",
    "%LocalAppData%/FiveM/FiveM.app/crashes",
    "%Temp%"
  ];

  cachePaths.forEach((cachePath) => {
    const resolvedPath = path.resolve(cachePath.replace(/%([^%]+)%/g, (_, v) => process.env[v] || ''));
    if (fs.existsSync(resolvedPath)) {
      try {
        fs.rmSync(resolvedPath, { recursive: true, force: true });
        console.log(colors.green(`Cleared: ${resolvedPath}`));
      } catch (err) {
        console.error(colors.red(`Failed to clear: ${resolvedPath}`), err);
      }
    } else {
      console.log(colors.yellow(`Path not found: ${resolvedPath}`));
    }
  });

  console.log(colors.green("\nCache Cleared Successfully!\n"));

  console.log(colors.blue("\nOptimizing Your Computer for FiveM...\n"));

  try {
    execSync("powercfg -s 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c");
    console.log(colors.green("Power plan set to high performance."));

    const processesToKill = [
      "GTAVLauncher.exe",
      "FiveM.exe",
      "FiveM_b2612_GTAProcess.exe",
      "FiveM_b2372_GTAProcess.exe",
      "TeamViewer_Service.exe",
      "Cortana.exe",
      "AnyDesk.exe"
    ];

    processesToKill.forEach((process) => {
      try {
        execSync(`taskkill /f /im ${process}`);
        console.log(colors.green(`Killed process: ${process}`));
      } catch {
        console.log(colors.yellow(`Process not found or could not be killed: ${process}`));
      }
    });

    console.log(colors.green("\nComputer optimized for FiveM!\n"));
  } catch (err) {
    console.error(colors.red("Optimization failed."), err);
  }

  console.log(`
  ${'______           __         ________'.yellow}
  ${'/ ____/___ ______/ /_  ___  / ____/ /__  ____ _____  ___  _____'.yellow}
  ${'/ /   / __ `/ ___/ __ \/ _ \/ /   / / _ \/ __ `/ __ \/ _ \/ ___/'.yellow}
  ${'/ /___/ /_/ / /__/ / / /  __/ /___/ /  __/ /_/ / / / /  __/ /'.yellow}
  ${'\____/\__,_/\___/_/ /_/\___/\____/_/\___/\__,_/_/ /_/\___/_/'.yellow}
`.bold);

  console.log(colors.green("\nCleared Cache and PC Optimized!\n"));
  process.exit(0);
});
