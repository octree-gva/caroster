'use strict'
require('dotenv').config()

// Default to the Chrome config:
exports.config = require(`./conf/${process.env.NAV || 'chrome'}`).config
