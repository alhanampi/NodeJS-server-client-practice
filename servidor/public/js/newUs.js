$('#postUs').on('click', function () {
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

if (name != '' && surname != '' && phone != '' && email !== '') {
	$.ajax('http://localhost:3000/api/users', {
		method: 'POST',
		data: newUser,
		success: function () {
			Swal({
				position: 'top-end',
				type: 'success',
				title: 'Usuario ingresado correctamente',
				showConfirmButton: false,
				timer: 1500
			})
			setTimeout(function () {
				location.href = '/users';
			}, 1500)
		}
		}
	)
} else {
	Swal({ //sweet alert
		type: 'error',
		title: 'Oops...',
		text: 'Revise los datos!'
		})
	}
})