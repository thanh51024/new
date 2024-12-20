let students = [];
let classes = [];

// Tạo học sinh
function addStudent() {
    const name = document.getElementById("student-name").value;
    const birthDate = document.getElementById("student-birthDate").value;
    const className = document.getElementById("student-className").value;
    const school = document.getElementById("student-school").value;

    const form = document.getElementById("create-student-form");
    if (form.checkValidity()) {  
        // Xử lý thêm lớp nếu form hợp lệ
        // Kiểm tra trùng lặp học sinh
        if (students.some(student => student.name === name && student.birthDate === birthDate)) {
            alert("Học sinh này đã tồn tại!");
            return;
        }

        const newStudent = { name, birthDate, className, school };
        students.push(newStudent);
        updateStudentList();
        updateStudentSelect();
        clearForm("create-student-form");
    } else {
        form.reportValidity(); // Hiển thị cảnh báo nếu form không hợp lệ
    }
}

// Hiển thị danh sách học sinh
function updateStudentList() {
    const studentList = document.getElementById("student-list");
    studentList.innerHTML = '';
    students.forEach((student, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="info">Tên: ${student.name} - Ngày sinh: ${student.birthDate} -Lớp: ${student.className} - Trường: ${student.school}</div>
            <button class="btn btn-danger" onclick="deleteStudent(${index})">Xóa</button>
        `;
        studentList.appendChild(li);
    });
}

// Cập nhật danh sách chọn học sinh
function updateStudentSelect() {
    const studentSelect = document.getElementById("student-select");
    studentSelect.innerHTML = '';
    students.forEach((student, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = student.name;
        studentSelect.appendChild(option);
    });
}

// Xóa học sinh
function deleteStudent(index) {
    students.splice(index, 1);
    updateStudentList();
    updateStudentSelect();
}

// Tạo lớp học
function addClass() {
    const className = document.getElementById("class-name").value;
    const room = document.getElementById("class-room").value;
    const startTime = document.getElementById("class-start-time").value;
    const endTime = document.getElementById("class-end-time").value;
    const schedule = Array.from(document.querySelectorAll('input[name="class-schedule"]:checked'))
                            .map(el => el.value);
                       
    const form = document.getElementById("create-class-form");
    if (form.checkValidity()) {
        
        // Xử lý thêm lớp nếu form hợp lệ
        // Kiểm tra trùng lặp lớp học
        if (classes.some(cls => cls.className === className)) {
            alert("Lớp học này đã tồn tại!");
            return;
        }

        const newClass = { className, room, startTime, endTime, schedule, students: [] };
        classes.push(newClass);
        updateClassList();
        updateClassSelect();
        clearForm("create-class-form");
        
    } else {
        form.reportValidity(); // Hiển thị cảnh báo nếu form không hợp lệ
    }
}

// Hiển thị danh sách lớp học
function updateClassList() {
    const classList = document.getElementById("class-list");
    classList.innerHTML = '';
    classes.forEach((cls, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="info">Lớp: ${cls.className} - Phòng: ${cls.room} - Thời gian: ${cls.startTime} - ${cls.endTime}</div>
            <div>Thời gian học: ${cls.schedule.join(', ')}</div>
            <button class="btn btn-primary" onclick="showStudentsInClass(${index})">Hiển thị học sinh</button>
            <button class="btn btn-danger" onclick="deleteClass(${index})">Xóa</button>
        `;
        classList.appendChild(li);
    });
}

// Xóa lớp học
function deleteClass(index) {
    classes.splice(index, 1);
    updateClassList();
    updateClassSelect();
}

// Hiển thị danh sách học sinh trong lớp học
function showStudentsInClass(classIndex) {
    const classObj = classes[classIndex];
    const studentListDiv = document.getElementById("class-schedule-list");
    studentListDiv.innerHTML = `<h3>Danh sách học sinh trong lớp ${classObj.className}</h3>`;

    if (classObj.students.length === 0) {
        studentListDiv.innerHTML += `<p>Không có học sinh trong lớp này.</p>`;
    } else {
        const ul = document.createElement("ul");
        classObj.students.forEach((student, studentIndex) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${student.name}
                <button class="btn btn-danger" onclick="removeStudentFromClass(${classIndex}, ${studentIndex})">Xóa</button>
            `;
            ul.appendChild(li);
        });
        studentListDiv.appendChild(ul);
    }
}

// Xóa học sinh khỏi lớp học
function removeStudentFromClass(classIndex, studentIndex) {
    classes[classIndex].students.splice(studentIndex, 1);
    showStudentsInClass(classIndex);
}

// Thêm học sinh vào lớp học
function addStudentToClass() {
    const studentIndex = document.getElementById("student-select").value;
    const classIndex = document.getElementById("class-select").value;

    if (studentIndex === "" || classIndex === "") return;

    const student = students[studentIndex];
    const classObj = classes[classIndex];

    // Kiểm tra học sinh đã có trong lớp chưa
    if (classObj.students.includes(student)) {
        alert("Học sinh đã có trong lớp!");
        return;
    }

    classObj.students.push(student);
    alert(`Đã thêm ${student.name} vào lớp ${classObj.className}.`);
}

// Hiển thị danh sách lớp học theo ngày
function showClassesForDay() {
    const selectedDate = new Date(document.getElementById("class-schedule-date").value);
    const selectedDay = selectedDate.toLocaleDateString('vi-VN', { weekday: 'long' }); // Xác định thứ trong tuần
    const classScheduleList = document.getElementById("class-schedule-list");
    classScheduleList.innerHTML = '';

    // Tìm các lớp học có lịch vào ngày đã chọn
    const classesForDay = classes.filter(cls => cls.schedule.includes(selectedDay));
    if (classesForDay.length === 0) {
        classScheduleList.innerHTML = "<p>Không có lớp học nào vào ngày này.</p>";
        return;
    }

    // Hiển thị các lớp học trùng lịch với ngày đã chọn
    classesForDay.forEach((cls, index) => {
        const div = document.createElement("div");
        div.className = "class-info";
        div.innerHTML = `
            <h3>${cls.className} - Phòng ${cls.room}</h3>
            <button class="btn btn-primary" onclick="showStudentsInClass(${index})">Hiển thị học sinh</button>
            <button class="btn btn-danger" onclick="deleteClass(${index})">Xóa Lớp</button>
        `;
        classScheduleList.appendChild(div);
    });
}


// Cập nhật danh sách chọn lớp học
function updateClassSelect() {
    const classSelect = document.getElementById("class-select");
    classSelect.innerHTML = '';
    classes.forEach((cls, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = cls.className;
        classSelect.appendChild(option);
    });
}

// Chuyển chế độ tối
function toggleMode() {
    document.body.classList.toggle("dark-mode");
}

// Xóa thông tin nhập liệu sau khi thêm
function clearForm(formId) {
    document.getElementById(formId).reset();
}
