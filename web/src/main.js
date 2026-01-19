import "./main.css"

const loginElement = document.getElementById( "login" )
const usernameElement = document.getElementById( "username" )
const passwordElement = document.getElementById( "password" )

loginElement.onsubmit = async e => {

	e.preventDefault()

	const username = usernameElement.value.trim()
	const password = passwordElement.value.trim()

	if ( username.length < 2 ) {

		alert( "Username must include at least 2 characters" )

		return
	}

	if ( password.length < 4 ) {

		alert( "Password must include at least 2 characters" )

		return
	}

	try {

		const user = await makeLogin( { username, password } )

		console.log( "Successfull:", user.username )
	}
	catch( error ) {

		console.log( error )
	}
}

async function makeLogin( body ) {

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

			return json
		}
		catch( error ) {

			throw error
		}
	}
	else {

		throw response.statusText || response.status
	}
}
