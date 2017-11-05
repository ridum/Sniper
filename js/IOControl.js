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
        delete (node);
    });
}

function createSkill() {
    var list = document.createElement("li");
    list.style.display = "none";
    list.className = "list-group-item";
    list.innerHTML = "<input placeholder='Skill Name' class='form-control skillName' onfocus='moveColumnToLeft()' onfocusout='resetColumn()'><textarea placeholder='Skill Description' class='skillTextArea form-control' onfocus='moveColumnToLeft()' onfocusout='resetColumn()' rows='4'></textarea><button class='btn btn-md btn-danger' onclick='removeSkill(this)'>delete</button>";
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

function moveColumnToRight() {
    document.getElementById("leftRow").className = "col-md-8";
    document.getElementById("rightRow").className = "col-md-4";
}

function moveColumnToLeft() {
    document.getElementById("leftRow").className = "col-md-4";
    document.getElementById("rightRow").className = "col-md-8";
}

function resetColumn() {
    document.getElementById("leftRow").className = "col-md-6";
    document.getElementById("rightRow").className = "col-md-6";
}

function removeGraph() {
    $("#analyze_button").unbind("click");
    $(chart_div).fadeOut(500, function () {
        document.getElementById("chart_div").innerHTML = "";
        document.getElementById("chart_div").style.display = "block";
        document.getElementById('chart_div').style.zIndex = -1;        
        $("#analyze_button").click(analyzeClick);
        $("#analyze_button").removeClass("btn-danger").addClass("btn-success");
        $("#analyze_button").text("analyze!");
    });
}
function changeAnalyzeButtonToCloseButton() {
    $("#analyze_button").unbind("click");
    $("#analyze_button").click(removeGraph);
    $("#analyze_button").removeClass("btn-success").addClass("btn-danger");
    $("#analyze_button").text("close graph");
}