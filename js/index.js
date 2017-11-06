var isUrl = false;
const DEFAULT_KEY_LIST = ["java", "c++", "javascript", "python", "c", "scala", "CSS", "html"];
var keylist = [];

$.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    }
})

function wordMappinng(string, list) {
    //filter all punctuation
    var words = string.replace(/[.,?!$%\^&\*;:{}=\-_`~()]|\+[^\+]/g, ' ');
    var wordsWithithPlus = words.replace(/\+/g, '++ ');

    //convert into list
    var stringArray = wordsWithithPlus.split(/\s/);
    var freqMap = {};

    //initial each word count to be 0
    list.forEach(function (w) {
        freqMap[w] = 0;
    });


    stringArray.forEach(function (w) {
        if (list.indexOf(w) != -1) {
            freqMap[w] += 1;
        }
    });

    return freqMap;
}

function analyzeClick() {
    var input = (isUrl) ? $("#urlText").val() : $("#pureText").val();

    if (!document.getElementById('default_list_indicator').checked) {
        var skillArray = getSkillList();
        skillArray.forEach((ele)=>{
            keylist.push(ele.name);
        })
    }

    var list = (document.getElementById('default_list_indicator').checked) ? DEFAULT_KEY_LIST : keylist;
    
    var result;
    //concert anything to lower case to compare
    var lowerCaseKeyList = list.map(function (x) {
        return x.toLowerCase();
    });
    if (isUrl) {
        $.get(
            input,
            function (response) {
                document.getElementById("mainContent").innerHTML = response;

                //store the context
                var URLText = document.getElementById("mainContent").innerText.toLowerCase();

                // remove the content to preserve local css
                document.getElementById("mainContent").innerHTML = "";
                result = wordMappinng(URLText, lowerCaseKeyList);
                generateGraph(result);
            }).done(function () {
                changeAnalyzeButtonToCloseButton();
            }).fail(function () {
                alert("cannot aceess the website, try use text input");
            });
    } else {
        input = input.toLowerCase();
        result = wordMappinng(input, lowerCaseKeyList);
        generateGraph(result);
        changeAnalyzeButtonToCloseButton();
    }
}

$(function () {
    //initialize google charts
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(function () {
        Google_loaded = true;
    });


    $("#analyze_button").click(analyzeClick);
});

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