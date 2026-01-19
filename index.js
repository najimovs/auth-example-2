import express from "express"
import cors from "cors"
import { readFile } from "node:fs/promises"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const users = JSON.parse( await readFile( "./users.json", "utf8" ) )

const PORT = process.env.PORT
const app = express()

app.use( express.json() )
app.use( cors() )

app.get( "/data", async ( req, res ) => {

	if ( !req.headers.jwt_token ) {

		res.status( 401 ).send( { message: "Unauthorized" } )

		return
	}

	const token = req.headers.jwt_token

	try {

		const user = await jwt.verify( token, process.env.JWT_SECRET )

		if ( user.isAdmin ) {

			res.send( [ 1, 2, 3, 4 ] )
		}
		else {

			res.send( [] )
		}
	}
	catch( error ) {

		res.status( 401 ).send( { message: error.message } )

		console.log( error )
	}
} )

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

	const token = jwt.sign( { username, isAdmin: user.isAdmin }, process.env.JWT_SECRET )

	res.send( { username, token } )
} )

app.listen( PORT, () => console.log( PORT ) )

//

async function hashPassword( plainPassword ) {

	return await bcrypt.hash( plainPassword, 10 )
}
