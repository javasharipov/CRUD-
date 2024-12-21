const BASE_URL = 'http://localhost:3000'
const wrapperEl = document.querySelector('.wrapper')
const formEl = document.querySelector('.form')
const nameForm = document.querySelector('.name')
const nicknameForm = document.querySelector('.nickname')
const passwordForm = document.querySelector('.password')
const genderForm = document.querySelector('.gender')

async function fetchUsers() {
	try {
		const response = await fetch(`${BASE_URL}/user`)
		const data = await response.json()
		displayUsers(data)
	} catch (error) {
		console.error('Error fetching users:', error)
	}
}

function displayUsers(users) {
	wrapperEl.innerHTML = ''
	users.forEach(user => {
		const userCard = document.createElement('div')
		userCard.innerHTML = `
      <h2>User Profile</h2>
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Nickname:</strong> ${user.nickname}</p>
      <p><strong>Gender:</strong> ${user.gender}</p>
      <p><strong>Password:</strong> ${user.password}</p>
    `
		wrapperEl.appendChild(userCard)
	})
}

formEl.addEventListener('submit', async e => {
	e.preventDefault()

	const newUser = {
		name: nameForm.value.trim(),
		nickname: nicknameForm.value.trim(),
		password: passwordForm.value.trim(),
		gender: genderForm.value.trim(),
	}

	if (
		!newUser.name ||
		!newUser.nickname ||
		!newUser.password ||
		!newUser.gender
	) {
		alert('Please fill in all fields.')
		return
	}

	try {
		const response = await fetch(`${BASE_URL}/user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUser),
		})

		if (response.status >= 200 && response.status < 300) {
			alert('User added successfully!')
			formEl.reset()
			fetchUsers()
		} else {
			alert(`Failed to add user. Status code: ${response.status}`)
		}
	} catch (error) {
		console.error('Error adding user:', error)
	}
})

window.onload = fetchUsers
