// script.css

let students = JSON.parse(localStorage.getItem("students")) || [];

function addStudent() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const grade = document.getElementById("grade").value;

  if (name && age && grade) {
    const student = { name, age, grade };
    students.push(student);
    alert("Student Record Added");
    clearForm();
    saveStudentsToLocalStorage();
  } else {
    alert("Please fill in all fields");
  }
}

function displayStudents() {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = "";

  students.forEach((student, index) => {
    const listItem = document.createElement("div");
    listItem.classList.add("student-item");
    listItem.innerHTML = `
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Age:</strong> ${student.age}</p>
            <p><strong>Grade:</strong> ${student.grade}</p>
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
        `;
    studentList.appendChild(listItem);
  });
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("grade").value = "";
}

function editStudent(index) {
  const student = students[index];

  // Store the selected student and its index in localStorage
  localStorage.setItem("editStudent", JSON.stringify(student));
  localStorage.setItem("editIndex", index);

  window.location.href = "edit.html";
}

function updateStudent() {
  const index = localStorage.getItem("editIndex");

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const grade = document.getElementById("grade").value;

  if (name && age && grade && index !== null) {
    // get original data from local storage
    const students = JSON.parse(localStorage.getItem("students")) || [];

    // Update the specic student data (using index)
    students[index] = { name, age, grade };

    // save the updated record to local storage
    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Record Updated");
    window.location.href = "display.html";
  } else {
    alert("Error: Unable to update student record");
  }
}

function deleteStudent(index) {
  students.splice(index, 1);
  saveStudentsToLocalStorage();
  alert("Student Record Deleted");
  displayStudents();
}

function saveStudentsToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

document.getElementById("displayButton").addEventListener("click", function () {
  window.location.href = "display.html";
});

document.addEventListener("DOMContentLoaded", function () {
  displayStudents();
});
