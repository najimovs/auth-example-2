import "./main.css"

const homeElement = document.getElementById( "home" )
const whoAmIElement = document.getElementById( "whoAmI" )
const logoutBtnElement = document.getElementById( "logoutBtn" )

const loginElement = document.getElementById( "login" )
const errorMsgElement = document.getElementById( "errorMsg" )
const usernameElement = document.getElementById( "username" )
const passwordElement = document.getElementById( "password" )

init()

function init() {

	if ( location.pathname === "/" ) {

		if ( !localStorage.getItem( "app_user" ) ) {

			location.href = "/login"
		}

		homeElement.style.display = "flex"

		const { username } = JSON.parse( localStorage.getItem( "app_user" ) )

		whoAmIElement.textContent = username.toUpperCase()[ 0 ] + username.substr( 1 )

		logoutBtnElement.onclick = () => {

			localStorage.removeItem( "app_user" )

			location.href = "/login"
		}
	}
	else if ( location.pathname === "/login" ) {

		if ( localStorage.getItem( "app_user" ) ) {

			location.href = "/"

			return
		}

		loginElement.style.display = "flex"
	}
}

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

		localStorage.setItem( "app_user", JSON.stringify( user ) )

		location.href = "/"
	}
	catch( error ) {

		errorMsgElement.textContent = error
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
