# React + Vite
npm create vite@4
npm i
npm run dev
npm run server

npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev

- create .eslintrc.json
{
    "extends": "react-app"
}

- modify vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
});


npm i react-router-dom@6