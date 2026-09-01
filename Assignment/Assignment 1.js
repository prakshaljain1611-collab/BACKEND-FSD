const http = require("http");
const fs = require("fs");

const PORT = 3000;
const DATA_FILE = "students.json";

function escapeHtml(value) {
	return String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function readStudents(callback) {
	fs.readFile(DATA_FILE, "utf8", (error, data) => {
		if (error && error.code === "ENOENT") {
			return callback(null, []);
		}

		if (error) {
			return callback(error);
		}

		try {
			const records = JSON.parse(data);
			callback(null, Array.isArray(records) ? records : records.students || []);
		} catch (parseError) {
			callback(parseError);
		}
	});
}

function sendPage(response, title, content, statusCode = 200) {
	response.writeHead(statusCode, { "Content-Type": "text/html; charset=utf-8" });
	response.end(`<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${escapeHtml(title)}</title>
</head>
<body>
	${content}
</body>
</html>`);
}

function formPage(response) {
	sendPage(response, "Student Records", `<h1>Welcome to Student Records</h1>
<p>Add a student or <a href="/students">view all student records</a>.</p>
<form method="POST" action="/add-student">
	<label>Student Name <input type="text" name="name" required></label><br><br>
	<label>Roll Number <input type="text" name="rollNo" required></label><br><br>
	<label>Course <input type="text" name="course" required></label><br><br>
	<label>Email <input type="email" name="email" required></label><br><br>
	<button type="submit">Add Student</button>
</form>`);
}

function studentsPage(response) {
	readStudents((error, students) => {
		if (error) {
			return sendPage(response, "Error", "<h1>Unable to read student records.</h1>", 500);
		}

		const rows = students.length
			? students.map((student) => `<tr>
	<td>${escapeHtml(student.name)}</td>
	<td>${escapeHtml(student.rollNo)}</td>
	<td>${escapeHtml(student.course)}</td>
	<td>${escapeHtml(student.email)}</td>
</tr>`).join("")
			: '<tr><td colspan="4">No student records found.</td></tr>';

		sendPage(response, "Student Records", `<h1>Student Records</h1>
<p><a href="/">Add another student</a></p>
<table border="1" cellpadding="8">
	<thead><tr><th>Name</th><th>Roll Number</th><th>Course</th><th>Email</th></tr></thead>
	<tbody>${rows}</tbody>
</table>`);
	});
}

function addStudent(request, response) {
	let body = "";

	request.on("data", (chunk) => {
		body += chunk;
		if (body.length > 10000) {
			request.destroy();
		}
	});

	request.on("end", () => {
		const submitted = new URLSearchParams(body);
		const student = {
			id: Date.now(),
			name: submitted.get("name")?.trim() || "",
			rollNo: submitted.get("rollNo")?.trim() || "",
			course: submitted.get("course")?.trim() || "",
			email: submitted.get("email")?.trim() || ""
		};

		if (!student.name || !student.rollNo || !student.course || !student.email) {
			return sendPage(response, "Invalid Student", "<h1>All fields are required.</h1><p><a href="/">Go back</a></p>", 400);
		}

		readStudents((error, students) => {
			if (error) {
				return sendPage(response, "Error", "<h1>Unable to save student record.</h1>", 500);
			}

			students.push(student);
			fs.writeFile(DATA_FILE, JSON.stringify({ students }, null, 2), "utf8", (writeError) => {
				if (writeError) {
					return sendPage(response, "Error", "<h1>Unable to save student record.</h1>", 500);
				}

				response.writeHead(303, { Location: "/students" });
				response.end();
			});
		});
	});
}

const server = http.createServer((request, response) => {
	if (request.method === "GET" && request.url === "/") {
		return formPage(response);
	}

	if (request.method === "GET" && request.url === "/students") {
		return studentsPage(response);
	}

	if (request.method === "POST" && request.url === "/add-student") {
		return addStudent(request, response);
	}

	sendPage(response, "Not Found", "<h1>404 - Page Not Found</h1>", 404);
});

server.listen(PORT, () => {
	console.log(`Student Records server running at http://localhost:${PORT}`);
});
