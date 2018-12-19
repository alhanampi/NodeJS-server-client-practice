//editar usuario

//query params de la url
const webParam = new URLSearchParams (window.location.search);
//leer param que se pasa
const userEdit = webParam.get('id')

//llamar por ajax

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
			alert('usuario editado'); //cambiar por un modal 
			location.href = '/users'; //ver si esta es la direccion correcta
		  }
	})
  })