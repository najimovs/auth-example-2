import express from "express"
import cors from "cors"

const PORT = process.env.PORT
const app = express()

app.use( express.json() )
app.use( cors() )

app.post( "/login", ( req, res ) => {

	const { username, password } = req.body

	console.log( username )

	if ( !username || !password ) {

		res.status( 400 ).send( { message: "`username` and `password` must include body" } )
	}

	if ( username === "tolmas" && password === "abc" ) {

		res.send( { success: true } )
	}
	else {

		res.status( 401 ).send( { success: false, } )
	}
} )

app.listen( PORT, () => console.log( PORT ) )
