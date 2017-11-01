function pressUrlButton() {
    if (!isUrl) {
        isUrl = true;
        document.getElementById("pureText").style.display = "none";
        document.getElementById("urlText").style.display = "block";
        $("#textButton").animate({
            fontSize: '1rem',
            opacity: '0.3'
        }, "slow");
        $("#urlButton").animate({
            fontSize: '1.2rem',
            opacity: '1'
        }, "slow");
    }
}

function pressTextButton() {
    if (isUrl) {
        isUrl = false;
        document.getElementById("pureText").style.display = "block";
        document.getElementById("urlText").style.display = "none";
        $("#textButton").animate({
            fontSize: '1.2rem',
            opacity: '1'
        }, "slow");
        $("#urlButton").animate({
            fontSize: '1rem',
            opacity: '0.3'
        }, "slow");
    }
}

function removeSkill(element) {
    var node = element.parentNode
    $(node).fadeOut(500, () => {
        node.parentNode.removeChild(node);
        delete(node);
    });
}

function createSkill() {
    var list = document.createElement("li");
    list.style.display = "none";
    list.className = "list-group-item";
    list.innerHTML = "<input placeholder='Skill Name' class='form-control skillName'><textarea placeholder='Skill Description' class='skillTextArea form-control' rows='4'></textarea><button class='btn btn-md btn-danger' onclick='removeSkill(this)'>delete</button>";
    document.getElementById("skillList").appendChild(list);
    $(list).fadeIn(1000);
}

function getSkillList() {
    if ($("#skillList").children().length > 0) {
        let result = new Array();
        let empty = false;
        $("#skillList").children().each(function (index) {
            if ($(this).children(".skillName")[0].value === "" || $(this).children(".skillTextArea")[0].value === "") {
                alert("Error: your Skill number " + (index + 1) + " contains empty field(s)");
                empty = true;
                return;
            }
            result.push({
                id: index,
                name: $(this).children(".skillName")[0].value,
                descr: $(this).children(".skillTextArea")[0].value
            });
        });
        if (empty) return false;
        return result;
    } else {
        alert("Error: please create at least one skill");
        return false;
    }
}
