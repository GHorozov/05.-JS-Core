function solution() {
    const appKey = 'kid_BJXTsSi-e';
    const username = 'guest';
    const password = 'guest';
    const authHeaders = 'Basic ' + btoa(username + ":" + password);
    const URL = `https://baas.kinvey.com/appdata/${appKey}/students`;

    loadStudents();
    function loadStudents() {
        $.ajax({
            method: 'GET',
            url: URL,
            headers: {
                'Content-type': 'application/json',
                'Authorization': authHeaders
            },
            success: displayStudents
        });
    }

    function displayStudents(data) {
        $('#results').find('tr').nextAll().remove();
        let orderedStudents = data.sort((a,b) => a.ID - b.ID);
        for (const student of orderedStudents) {
            let row = $(`<tr><td>${student.ID}</td><td>${student.FirstName}</td><td>${student.LastName}</td><td>${student.FacultyNumber}</td><td>${student.Grade}</td></td></td></tr>`);
            $('#results').append(row);
        }
    }


    $('#btnAdd').on('click', addStudent);

    function addStudent() {
        let studentID = Number($('#inputID').val());
        let studentFirstName = $('#inputFirstName').val();
        let studentLastName = $('#inputLastName').val();
        let studentFacultyNumber = $('#inputFacultyNumber').val();
        let studentGrade = Number($('#inputGrade').val());

        if(studentID !== 0 && studentFirstName.length > 0 && studentLastName.length > 0 && studentFacultyNumber.length > 0 && studentGrade !== 0) {
            let objData = {
                FacultyNumber: studentFacultyNumber,
                FirstName: studentFirstName,
                Grade: studentGrade,
                ID: studentID,
                LastName: studentLastName
            };

            $.ajax({
                method: 'POST',
                url: URL,
                data: JSON.stringify(objData),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': authHeaders
                },
                success: loadStudents
            });
            
            $('#inputID').val('');
            $('#inputFirstName').val('');
            $('#inputLastName').val('');
            $('#inputFacultyNumber').val('');
            $('#inputGrade').val('');
        }
    }
}