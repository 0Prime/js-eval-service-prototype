'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const atob = require('atob')
const fetch = require('node-fetch')

// Constants
const PORT = 3000;
const HOST = '0.0.0.0'

const app = express()
app.use(bodyParser.json())


app.get('/', (req, res) =>
	res.send('Hello remote world!\n'));


app.post('/eval', (req, res) => {
	const script = atob(req.body.script)

	try {
		const result = eval(script)
		console.log('result:')
		console.log(result)

		if (result.then)
			result.then(r => res.json({ result: r }))
		else
			res.json({ result: result })
	}
	catch (err) {
		console.log(err)
		res.json({ error: err })
	}
})


app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)