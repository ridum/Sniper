const SKILL_ROW_HTML = "<input placeholder='Skill Name' class='form-control skillName' onfocus='moveColumnToLeft()' onfocusout='resetColumn()'><textarea placeholder='Skill Description' class='skillTextArea form-control' onfocus='moveColumnToLeft()' onfocusout='resetColumn()' rows='4'></textarea><button class='btn btn-md btn-danger' onclick='removeSkill(this)'>delete</button>";

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
    list.innerHTML = SKILL_ROW_HTML;
    document.getElementById("skillList").appendChild(list);
    $(list).fadeIn(1000);
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

function removeChart() {
    $("#analyze_button").unbind("click");

    $(chart_div).fadeOut(500, function () {
        document.getElementById("chart_div").innerHTML = "";
        document.getElementById("chart_div").style.display = "block";
        document.getElementById('chart_div').style.zIndex = -1;
        $("#analyze_button").click(analyze('chart'));
        $("#analyze_button").removeClass("btn-danger").addClass("btn-success");
        $("#analyze_button").text("analyze!");
    });
}
function changeAnalyzeButtonToCloseButton() {
    $("#analyze_button").unbind("click");
    $("#analyze_button").click(removeChart);
    $("#analyze_button").removeClass("btn-success").addClass("btn-danger");
    $("#analyze_button").text("close chart");
}

function showChart(chart, data) {
    document.getElementById('chart_div').style.zIndex = 1;
    document.getElementById('leftRow').addEventListener('webkitTransitionEnd', function () {
        chart.draw(data, options);
    }, false);
    document.getElementById('leftRow').addEventListener('transitionend', function () {
        chart.draw(data, options);
    }, false);
}

function clickGenerateButton() {
    document.getElementById("main").style.display = "none";
    document.getElementById("result").style.display = "block";
}

function backClick() {
    document.getElementById("result").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("resultText").value = "";
}

function putOnTextArea(text) {
    var resultDiv = document.getElementById("resultText");
    resultDiv.value = text;
}

function generateSkillList(list) {
    var skillList = document.getElementById("skillList")
    skillList.innerHTML = "";
    skillList.style.display = "none";
    var newSkillList = "";
    for(let i=0; i<list.length; i++){
        let list = document.createElement("li");
        list.style.display = "none";
        list.className = "list-group-item";
        list.innerHTML = SKILL_ROW_HTML;
        skillList.appendChild(list);
    }
    list.foreach((ele, index) =>{
        $(skillList.children[index]).children(".skillName").val(ele.name);
        $(skillList.children[index]).children(".skillTextArea").val(ele.descr);
    });
    $(skillList).fadeIn(1000);
}


