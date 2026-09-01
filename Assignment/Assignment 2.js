function fetchData() {
	return new Promise((resolve) => {
		setTimeout(() => resolve("Data fetched successfully"), 2000);
	});
}

function checkAge(age) {
	return new Promise((resolve, reject) => {
		if (age >= 18) {
			resolve("Eligible");
		} else {
			reject("Not Eligible");
		}
	});
}

function loginUser() {
	return Promise.resolve("User logged in");
}

function getUserDetails() {
	return Promise.resolve("User details fetched");
}

function getUserOrders() {
	return Promise.resolve("User orders fetched");
}

function fetchUsers() {
	return new Promise((resolve) => {
		setTimeout(() => resolve("Users fetched"), 1000);
	});
}

function fetchProducts() {
	return new Promise((resolve) => {
		setTimeout(() => resolve("Products fetched"), 1500);
	});
}

function fetchOrders() {
	return new Promise((resolve) => {
		setTimeout(() => resolve("Orders fetched"), 500);
	});
}

function getData() {
	return new Promise((resolve) => {
		setTimeout(() => resolve("Data received"), 2000);
	});
}

async function displayData() {
	const result = await getData();
	console.log(result);
}

function fetchUnavailableData() {
	return Promise.reject(new Error("Unable to fetch data"));
}

async function fetchDataWithErrorHandling() {
	try {
		await fetchUnavailableData();
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}
}

async function getUser() {
	return "User fetched";
}

async function getProfile() {
	return "Profile fetched";
}

async function getPosts() {
	return "Posts fetched";
}

async function runExamples() {
	console.log(await fetchData());

	checkAge(20)
		.then((result) => console.log(result))
		.catch((error) => console.log(error));

	loginUser()
		.then((result) => {
			console.log(result);
			return getUserDetails();
		})
		.then((result) => {
			console.log(result);
			return getUserOrders();
		})
		.then((result) => console.log(result));

	const results = await Promise.all([
		fetchUsers(),
		fetchProducts(),
		fetchOrders()
	]);
	console.log(results);

	await displayData();
	await fetchDataWithErrorHandling();

	console.log(await getUser());
	console.log(await getProfile());
	console.log(await getPosts());
}

runExamples();
