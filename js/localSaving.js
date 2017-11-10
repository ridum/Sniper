function saveList() {
    if (window.localStorage) {
        window.localStorage.setItem("skillList", JSON.stringify(getSkillList(true)));
    }
}

function getList() {
    if (window.localStorage) {
        return window.localStorage.getItem("skillList");
    }
}

function deleteList() {
    if (window.localStorage) {
        return window.localStorage.removeItem("skillList");
    }
}
