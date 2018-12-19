$('#put').on('click', function () {
	const name = $('#name').val()
	const surname = $('#surname').val()
	const phone = $('#phone').val()
	const email = $('#email').val()

	let newUser = {
		name: name,
		surname: surname,
		phone: phone,
		email: email
	}
	

//hay una forma más elegante de escribir esto?
		if (name != '' && surname != '' && phone != '' && email !== '') {
			
			$.ajax('http://localhost:3000/api/users', {
				method: 'POST', 
				data: newUser,
				success: function () {
					//aca mostrar modal?
					location.href = '/users'
					}
				}
				) 
		} else {
			alert('inserte un valor correcto')
		} 
	

})