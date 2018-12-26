//edit user

const webParam = new URLSearchParams (window.location.search);
const userEdit = webParam.get('id')

const name = $('#name').val()
const surname = $('#surname').val()
const phone = $('#phone').val()
const email = $('#email').val()

let data = {
		name: name,
		surname: surname,
		phone: phone,
		email: email
	}

	function validate (data) {
		const checkMail = /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/
		
		const checkNum = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/
	
		if (!checkMail.test(data.email)) {
			return false
		}
		if (!checkNum.test(data.phone)) {
			return false
		}
		return true
		}

$.ajax('http://localhost:3000/api/users/' + userEdit)
.done(function(data) {
	$('#name').val(data.name);
	$('#surname').val(data.surname);
	$('#phone').val(data.phone);
	$('#email').val(data.email);
})
						
$('#put').on('click', function () {
	if (name != '' && surname != '' && phone != '' && email !== '' && validate(data) != false) {

		$.ajax('http://localhost:3000/api/users/' + userEdit, {
			method: 'PUT',
			data: data,
			
			success: function () {
				console.log('usuario modificado')
				Swal({
					type: 'success',
					title: 'Usuario editado',
					showConfirmButton: false,
					timer: 1500
				})
				setTimeout( function() {
					location.href = '/users'; 
					
				}, 1500)
			}
		})
	
} else {
	console.log('no entra')
	Swal({ 
		type: 'error',
		title: 'Oops...',
		text: 'Revise los datos!'
		})
	}
  })