const { handler } = require('../../main.py')

exports.handler = async (event, context) => {
  return await handler(event, context)
} 