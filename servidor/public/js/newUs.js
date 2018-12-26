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

function validate (newUser) {
	const checkMail = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/
	
	const checkNum = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/

	if (!checkMail.test(newUser.email)) {
		return false
	}
	if (!checkNum.test(newUser.phone)) {
		return false
	}
	return true
  }

if (name != '' && surname != '' && phone != '' && email !== '' && validate(newUser) != false) {
	$.ajax('http://localhost:3000/api/users', {
		method: 'POST',
		data: newUser,
		success: function () {
			Swal({
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
	Swal({ 
		type: 'error',
		title: 'Oops...',
		text: 'Revise los datos!'
		})
	}
})