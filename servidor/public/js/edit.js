//edit user

const webParam = new URLSearchParams (window.location.search);
const userEdit = webParam.get('id')

$.ajax('http://localhost:3000/api/users/' + userEdit)
.done(function(data) {
	$('#name').val(data.name);
	$('#surname').val(data.surname);
	$('#phone').val(data.phone);
	$('#email').val(data.email);
})

$('#put').on('click', function () {
	$.ajax('http://localhost:3000/api/users/' + userEdit, {
		method: "PUT",
		data: {
			name: $('#name').val(),
			surname: $('#surname').val(),
			phone: $('#phone').val(),
			email: $('#email').val(),
		},
		success: function () {
			Swal({
				position: 'top-end',
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
  })