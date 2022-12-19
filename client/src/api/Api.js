const api = "http://localhost:3001";
export function getOptions() {
	return fetch(`${api}/getOptions`, { mode: "cors" }).then((response) => {
		return response.json();
	});
}
