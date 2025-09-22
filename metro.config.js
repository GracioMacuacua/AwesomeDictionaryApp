const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure SQLite files are included
config.resolver.assetExts.push('db', 'sqlite', 'sqlite3');

module.exports = config;