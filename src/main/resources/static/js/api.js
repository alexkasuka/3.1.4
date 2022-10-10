let url = "/api/admin";

function showAllUsers() {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((allUsers) => {
            let tbody = '';
            console.log(allUsers);
            tbody = document.getElementById('table_allusers');
            allUsers.forEach((user) => {
                let roles = "";
                user.roles.forEach((role) => {
                    roles = roles + role.name.replace("ROLE_", "") + ' '
                })
                let tr = document.createElement('tr');
                tr.innerHTML = '<td>' + user.id + '</td>' +
                    '<td>' + user.username + '</td>' +
                    '<td>' + user.fullname + '</td>' +
                    '<td>' + user.age + '</td>' +
                    '<td>' + user.email + '</td>' +
                    '<td>' +  roles + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-info btn-sm" data-toggle="modal" ' +
                    'data-whatever="' + user.id + '" data-target="#editModal">Edit</button>' + '</td>' +
                    '<td>' + '<button type="button" class="btn btn-danger btn-sm" ' +
                    'data-toggle="modal" data-whatever="' + user.id + '" data-target="#deleteModal">Delete</button>' + '</td>';
                tbody.appendChild(tr);
            });
        });
}

async function showEditModal(id) {
    let user = await getUser(id);
    document.getElementById("editId").value = user.id;
    document.getElementById("editUsername").value = user.username;
    document.getElementById("editFullname").value = user.fullname;
    document.getElementById("editAge").value = user.age;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editPassword").value = user.password;
    console.log(user);

    $("#editRoles").empty();
    let selectEdit = document.getElementById("editRoles");
    let allRoles = await getAllRoles();

    allRoles.forEach((role) => {
        let option = document.createElement('option');
        option.setAttribute('value', role.name);
        option.setAttribute('id', role.id);
        option.setAttribute('name', role.name);
        option.appendChild(document.createTextNode(role.name));
        selectEdit.appendChild(option);
    })
    let userRoles = [];
    let i = 0;
    user.roles.forEach((role) => userRoles[i++] = role);
    let optionToSelect;
    for (let i = 0; i < selectEdit.options.length; i++) {
        optionToSelect = selectEdit.options[i];
        userRoles.forEach((ur) => {
            if (optionToSelect.text == ur.name) {
                optionToSelect.selected = true;
            }
        });
    }
}

function editUser() {
    let editForm = document.getElementById("editForm");
    let formData = new FormData(editForm);

    let user = {
        id: formData.get('id'),
        username: formData.get('username'),
        fullname: formData.get('fullname'),
        age: formData.get('age'),
        email: formData.get('email'),
        password: formData.get('password'),
        roles: Array.from(document.getElementById("editRoles"))
            .filter(option => option.selected)
            .map(option => ({name: option.value, id: option.id}))
    }

    fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            document.getElementById('editForm').onsubmit;
        })
}

async function showNewModal() {
    $("#newRoles").empty();
    let selectNew = document.getElementById('newRoles');
    let allRoles = await getAllRoles();
    allRoles.forEach((role) => {
        let option = document.createElement('option');
        option.setAttribute('value', role.name);
        option.setAttribute('id', role.id);
        option.setAttribute('name', role.name);
        option.appendChild(document.createTextNode(role.name));
        selectNew.appendChild(option);
    })
    let i = 0;
    let optionToSelect;
    for (let i = 0; i < selectNew.options.length; i++) {
        optionToSelect = selectNew.options[i];
        if (optionToSelect.text == "USER") {
            optionToSelect.selected = true;
        }
    }
}

function newUser() {
    $('newUserForm').empty();
    let newUserForm = document.getElementById("newUserForm");
    let formData = new FormData(newUserForm);
    let user = {
        username: formData.get('username'),
        fullname: formData.get('fullname'),
        age: formData.get('age'),
        email: formData.get('email'),
        password: formData.get('password'),
        roles: Array.from(document.getElementById("newRoles"))
            .filter(option => option.selected)
            .map(option => ({name: option.value, id: option.id}))
    }
    fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    })
        .then((r) => {
            refreshTable();
            showAllUsers();
            $('#nav-home').tab('show')
            //

        })
}

function refreshTable() {
    let table = document.querySelector('#table_allusers')
    for (let i = table.rows.length - 1; i >= 0; i--) {
        table.deleteRow(i)
    }
}

async function showDeleteModal(id) {
    let deleteUser = await getUser(id);
    document.getElementById("deleteId").value = deleteUser.id;
    document.getElementById("deleteUsername").value = deleteUser.username;
    document.getElementById("deleteFullname").value = deleteUser.fullname;
    document.getElementById("deleteAge").value = deleteUser.age;
    document.getElementById("deleteEmail").value = deleteUser.email;
    $("#deleteRoles").empty();
    let selectDel = document.getElementById('deleteRoles');
    let allRoles = await getAllRoles();

    allRoles.forEach((role) => {
        let option = document.createElement('option');
        option.setAttribute('value', role.name);
        option.setAttribute('id', role.id);
        option.setAttribute('name', role.name);
        option.appendChild(document.createTextNode(role.name));
        selectDel.appendChild(option);
    })
    let userRoles = [];
    let i = 0;
    deleteUser.roles.forEach((role) => userRoles[i++] = role);
    let optionToSelect;
    for (let i = 0; i < selectDel.options.length; i++) {
        optionToSelect = selectDel.options[i];
        userRoles.forEach((ur) => {
            if (optionToSelect.text == ur.name) {
                optionToSelect.selected = true;
            }
        });
    }
}

async function deleteUser() {
    let deleteUserID = document.getElementById('deleteId').value;
    fetch(url + '/' + deleteUserID, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {

        })
        .then((r) => {
            $('#nav-home').tab('show');

        })
}



function getAllRoles() {
    return fetch("/api/admin/getRoles")
        .then((response) => {
            let res = response.json();
            return res;
        })
        .then((roles) => {
            console.log('all roles:')
            console.log(roles);
            return roles;
        })
}

async function getUser(id) {
    let response = await fetch(url + '/' + id);
    return await response.json();


}

async function getAllUsers() {
    let response = await fetch(url);
    return await response.json();
}


showAllUsers();