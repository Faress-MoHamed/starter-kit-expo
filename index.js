#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const projectName = process.argv[2];

if (!projectName) {
	console.error("❌ Please provide a project name: npx new-expo my-app");
	process.exit(1);
}

const targetDir = path.join(process.cwd(), projectName);

if (fs.existsSync(targetDir)) {
	console.error(`❌ Directory "${projectName}" already exists!`);
	process.exit(1);
}

console.log(`🚀 Creating new Expo project: ${projectName}...`);

execSync(
	`git clone https://github.com/YOUR_GITHUB_USERNAME/new-expo-template.git ${projectName}`,
	{
		stdio: "inherit",
	}
);

fs.rmSync(path.join(targetDir, ".git"), { recursive: true, force: true });

console.log("📦 Installing dependencies...");
execSync(`cd ${projectName} && npm install`, { stdio: "inherit" });

console.log("✅ Done! Run the following commands:");
console.log(`cd ${projectName}`);
console.log("npx expo start");
