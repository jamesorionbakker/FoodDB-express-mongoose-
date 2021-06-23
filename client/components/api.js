export async function getItems() {
    let apiResponse = await fetch('/api/get');
    if (!apiResponse.ok) {
        throw Error(apiResponse.statusText);
    }
    return await apiResponse.json();
}

export async function postItem(data) {
    let apiResponse = await fetch('/api/post', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!apiResponse.ok) {
        throw Error(apiResponse.statusText);
    }
    return await apiResponse.json();
}

export async function deleteItem(id) {
    let data = { id: id };
    let apiResponse = await fetch('/api/delete', {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!apiResponse.ok) {
        throw Error(apiResponse.statusText);
    }
    return await apiResponse.json();
}
