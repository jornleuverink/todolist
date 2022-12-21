const todoList = document.getElementById("list");

const clearList = () => {
  todoList.innerHTML = "";
};

const input = document.getElementById("input");
const button = document.getElementById("add"); 

const addTodo = () => {
  button.addEventListener("click", () => {
    const data = input.value;
    if (data !== "") {
      const body = { description: data, done: false };
      postData(body);
      input.value = "";
      setTodo();
    } else {
      alert("Tell me: what do you want to do?");
    }
  });
};

const setTodo = async () => {
  clearList();
  const data = await getData();
  data.forEach((item) => {
    const li = document.createElement("li");
      li.id = item._id;
    const liContent = document.createElement("textarea");
      liContent.className = "textfield";
      liContent.value = item.description;
    const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "done";
      checkbox.className = "checkbox";   
    const img = document.createElement("img");
      img.src = "trashcan.png";
      img.alt = "trashcan icon";
      img.className = "trashcan";
    const status = item.done;
      if (status === true) {
        checkbox.checked = true;
        liContent.className = "textfield done";
      } else {
        checkbox.checked = false;
      }
    todoList.append(li);
    li.appendChild(checkbox);
    li.appendChild(liContent);
    li.appendChild(img);
    });
  const checkboxes = document.getElementsByClassName("checkbox");
  const trashcans = document.getElementsByClassName("trashcan");
  const textfields = document.getElementsByClassName("textfield");
  itemDone(checkboxes);
  delData(trashcans);
  updateItem(textfields);
};

const itemDone = (checkboxes) => {
  Array.from(checkboxes).forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      const textItem = e.target.nextElementSibling;
      const item = e.target.parentElement;
      const itemId = item.id;
      textItem.classList.toggle("done");
      if (textItem.classList[1] === "done") {
        let body = { done: true };
        putData(body, itemId);
      } else {
        const body = { done: false };
        putData(body, itemId);
      }
    });
  });
};

const delData = (trashcans) => {
  Array.from(trashcans).forEach((trashcan) => {
    trashcan.addEventListener("click", (e) => {
      const item = e.target.parentElement;
      const itemId = item.id;
      deleteData(itemId);
      item.parentNode.removeChild(item);
    });
  });
};

const updateItem = (textfields) => {
  Array.from(textfields).forEach((textfield) => {
    textfield.addEventListener("change", (e) => {
      const item = e.target.parentElement;
      const itemId = item.id;
      const itemValue = e.target.value;
      const body = { description: itemValue };
      putData(body, itemId);
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  addTodo();
  setTodo();
});