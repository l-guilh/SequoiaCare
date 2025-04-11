const { handler } = require('../../../main')

exports.handler = async (event, context) => {
  try {
    return await handler(event, context)
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
} 