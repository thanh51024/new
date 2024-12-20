let items = [];

function addItem() {
    const name = document.getElementById("name").value;
    const birthDate = document.getElementById("birthDate").value;
    const className = document.getElementById("class").value;
    const school = document.getElementById("school").value;

    if (name && birthDate && className && school) {
        const newItem = { name, birthDate, className, school };
        items.push(newItem);
        
        document.getElementById("name").value = '';
        document.getElementById("birthDate").value = '';
        document.getElementById("class").value = '';
        document.getElementById("school").value = '';
        
        renderList();
    } else {
        alert("Vui lòng nhập đầy đủ thông tin.");
    }
}

function renderList() {
    const itemList = document.getElementById("item-list");
    itemList.innerHTML = '';

    items.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.innerHTML = `
            <div class="info-row">
                <div class="info">Họ Tên: ${item.name}</div>
                <div class="info">Ngày Sinh: ${item.birthDate}</div>
                <div class="info">Lớp: ${item.className}</div>
                <div class="info">Trường: ${item.school}</div>
            </div>
                <button onclick="deleteItem(${index})">Xóa</button>
        `;
        itemList.appendChild(li);
    });
}

function deleteItem(index) {
    items.splice(index, 1);
    renderList();
}
function sortList(order) {
    items.sort((a, b) => {
        const nameA = a.name.trim().split(" ").pop();
        const nameB = b.name.trim().split(" ").pop(); 
        
        return nameA.localeCompare(nameB, 'vi'); 
    });
    
    if (order === 'desc') {
        items.reverse();
    }
    renderList();
}  

