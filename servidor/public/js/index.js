//GET USERS

$.ajax('http://localhost:3000/api/users')
	.done(function (data) { //data es lo que contesta el server
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
			alert('usuario eliminado')
			location.href = '/users';
		}
	})
}

//SEARCH 

$('.filterBut').click(function () {
	const search = $('#searchBar').val()

	$('#table .tableTr').remove() //remover tabla

	$.ajax('http://localhost:3000/api/users?search=' + search)
		.done(function (data) {
			//tengo que apendear de nuevo la lista una vez que se eliminó
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