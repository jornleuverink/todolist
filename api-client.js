const apiUrl = "http://localhost:3000/";

const postData = async (body) => {
  try {
    await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
        console.log(error, 'error @ postData');
  }
};

const getData = async () => {
  try {
    const res = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  } catch (error) {
        console.log(error, 'error @ getData');
  }
};

const deleteData = async (itemId) => {
  const idUrl = `${apiUrl}${itemId}`;
  try {
    await fetch(idUrl, {
        method: "DELETE",
    });
  } catch (error) {
        console.log(error, 'error @ deleteData');
  }
};

const putData = async (body, itemId) => {
  try {
    const idUrl = `${apiUrl}${itemId}`;
    await fetch(idUrl, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
        console.log(error, 'error @ putData');
  }
};