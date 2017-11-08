var isUrl = false;
const DEFAULT_KEY_LIST = ["java", "c++", "javascript", "python", "c", "scala", "CSS", "html"];
const DEFAULT_TRANSITION_WORDS = ["Moreover", "In addition", "Furthermore", "Additionally"];
var keylist = [];

$.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors && options.type === "get") {
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

var analyze = function (type) {
    return function () {
        var input = (isUrl) ? $("#urlText").val() : $("#pureText").val();

        var googleSafeList = {
            "client": {
                "clientId": "sniper",
                "clientVersion": "1.0"
            },
            "threatInfo": {
                "threatTypes": ["MALWARE", "THREAT_TYPE_UNSPECIFIED", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                "platformTypes": ["ANY_PLATFORM"],
                "threatEntryTypes": ["URL"],
                "threatEntries": [
                    { "url": input }
                ]
            }
        };

        var list = (document.getElementById('default_list_indicator').checked) ? DEFAULT_KEY_LIST : getSkillList().map((ele) => ele.name);

        if (!list) return;

        var result;
        //concert anything to lower case to compare
        var lowerCaseKeyList = list.map(function (x) {
            return x.toLowerCase();
        });
        if (isUrl) {
            $.ajax({
                url: "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyDSUFaNYgWjgjhjABv3rOKLPunRycE-nhQ",
                type: "POST",
                data: JSON.stringify(googleSafeList),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    if (JSON.stringify(data) === '{}') {
                        $.get(
                            input,
                            function (response) {
                                document.getElementById("mainContent").innerHTML = response;

                                //store the context
                                var URLText = document.getElementById("mainContent").innerText.toLowerCase();

                                // remove the content to preserve local css
                                document.getElementById("mainContent").innerHTML = "";
                                result = wordMappinng(URLText, lowerCaseKeyList);
                                representResult(type, result);
                            }).fail(function () {
                                alert("cannot aceess the website, try use text input");
                            });
                    } else {
                        alert("the website you entered is unsafe")
                    }
                },
                error: function (error) {
                    alert("security check error, check your Internet Connection")
                }
            });

        } else {
            input = input.toLowerCase();
            result = wordMappinng(input, lowerCaseKeyList);
            representResult(type, result);
        }

    }
}

function representResult(type, result) {
    if (type == "chart") {
        generateChart(result);
        changeAnalyzeButtonToCloseButton();
    } else if (type == 'paragraph') {
        var sr = sortResult(result);
        generateParagraph(sr);
        clickGenerateButton();
    } else {
        alert("error" + type);
    }
}

function getSkillList() {
    if ($("#skillList").children().length > 0) {
        let result = [];
        let empty = false;
        $("#skillList").children().each(function (index) {
            if ($(this).children(".skillName")[0].value === "") {
                alert("Error: your Skill number " + (index + 1) + " have empty skill name");
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

$(function () {
    //initialize google charts
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(function () {
        Google_loaded = true;
    });


    $("#analyze_button").click(analyze('chart'));
    $("#generate_button").click(analyze('paragraph'));
    $("#back_button").click(backClick);
});
