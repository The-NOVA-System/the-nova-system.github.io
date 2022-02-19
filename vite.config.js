// vite.config.js
const { resolve } = require('path')
const { defineConfig } = require('vite')
import path from "path";

console.log(__dirname);

module.exports = defineConfig({
    root: 'src',
    build: {
        outDir: path.join(__dirname, "dist"),
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src", 'index.html'),
                nested: resolve(__dirname, "src", 'privacy-policy/index.html')
            }
        }
    }
})
