const server = require('./api/server')

const port = 5000

server.listen(port, () => {
    console.log('server listening opn port 5000')
})
