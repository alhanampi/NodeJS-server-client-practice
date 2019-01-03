//GET USERS
$.ajax('http://localhost:3000/api/users')
	.done(function (data) {
		for (let i = 0; i < data.length; i++) {
			$('#table').append(`
				<tr id="user-${data[i].id}" class="tableTr">
					<td> ${data[i].name} </td>
					<td> ${data[i].surname} </td>
					<td> ${data[i].phone} </td>
					<td> ${data[i].email} </td>
					<td> <button class= "btn" id="editB"> <a href="users/edit?id=${data[i].id}" type="button"> <i class="fas fa-pencil-alt"></i> </a> </button></td>
					<td> <button onclick="eraseB(${data[i].id})" class= "btn" id="eraseB"> <i class="fas fa-trash-alt"></i> </button></td>
					</tr>
			`)
		}
	})

//DELETE USERS
function eraseB(id) {
	$.ajax('http://localhost:3000/api/users/' + id, {
		method: 'DELETE',
		success: function () {
			$('#user' + id).remove();
			//sweet alert for the modals:
			Swal({ 
				title: '¿Quiere eliminar este usuario?',
				text: "Esta acción no puede deshacerse",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Sí'
			}).then((result) => {
				if (result.value) {
					Swal({
						showConfirmButton: false,
						type: 'success',
						title: 'Usuario eliminado',
					}
					)
					setTimeout(function () {
						location.href = '/users';
					}, 1500)
				}
			}
			)
		}
	}
	)
}

//SEARCH 
$('.filterBut').click(function searchButton () {
	const search = $('#searchBar').val()

	$('#table .tableTr').remove()

	$.ajax('http://localhost:3000/api/users?search=' + search)
		.done(function (data) {
			//erase list and populate it again
			for (var i = 0; i < data.length; i++) {
				$('#table').append(`
					<tr id="user-${data[i].id}" class="tableTr">
					<td> ${data[i].name} </td>
					<td> ${data[i].surname} </td>
					<td> ${data[i].phone} </td>
					<td> ${data[i].email} </td>
					<td> <button class= "btn" id="editB"> <a href="users/edit?id=${data[i].id}" type="button"> <i class="fas fa-pencil-alt"></i> </a> </button></td>
					<td> <button onclick="eraseB(${data[i].id})" class= "btn" id="eraseB"> <i class="fas fa-trash-alt"></i> </button></td>
					</tr>`)
			}
		}
		)
	})
	
	//SEARCH WITH ENTER
  $('#searchBar').keydown(function(e){
		if(e.which == 13){
				$('.filterBut').click()}})