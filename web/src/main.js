import "./main.css"

const body = {
	username: "tolmas",
	password: "hello",
}

const response = await fetch( "http://localhost:3000/login", {
	method: "post",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify( body ),
} )

if ( response.status >= 200 && response.status <= 207 ) {

	try {

		const json = await response.json()

		console.log( json )
	}
	catch( error ) {

		console.log( error )
	}
}
else {

	console.log( response.statusText || response.status )
}
