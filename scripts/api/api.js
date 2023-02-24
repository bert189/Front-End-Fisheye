// fetch API json 

export async function getAPI(url) {    
	const response = await fetch(url);
	const data = await response.json();
	return data;
}