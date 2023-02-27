const {defaults} = require('jest-config');

/** @type {import('jest').Config} */ 
const config = {
    verbose: true,
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
};

module.exports = config;