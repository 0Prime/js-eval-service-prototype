/* eslint-disable semi */
'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const atob = require('atob')
// used implicitly in js evaluation
// eslint-disable-next-line no-unused-vars
const fetch = require('node-fetch')

const PORT = 3000;
const HOST = '0.0.0.0'

const app = express()
app.use(bodyParser.json())


app.get('/', (_req, res) =>
	res.send('Hello remote world!\n'))


app.post('/eval', (req, res) => {
	const script = atob(req.body.script)

	try {
		const result = eval(script)

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