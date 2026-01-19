import express from "express"
import cors from "cors"
import { readFile } from "node:fs/promises"
import bcrypt from "bcrypt"

const users = JSON.parse( await readFile( "./users.json", "utf8" ) )

const PORT = process.env.PORT
const app = express()

app.use( express.json() )
app.use( cors() )

app.post( "/login", async ( req, res ) => {

	const { username, password } = req.body

	if ( !username || !password ) {

		res.status( 400 ).send( { message: "`username` and `password` must include body" } )
	}

	if ( !users[ username ] ) {

		res.status( 401 ).send( { message: `${ username } not found` } )

		return
	}

	const user = users[ username ]

	const isValid = await bcrypt.compare( password, user.password )

	if ( !isValid ) {

		res.status( 401 ).send( { message: `Wrong password` } )

		return
	}

	res.send( { ok: true } )
} )

app.listen( PORT, () => console.log( PORT ) )

//

async function hashPassword( plainPassword ) {

	return await bcrypt.hash( plainPassword, 10 )
}
