var isUrl = false;
const DEFAULT_KEY_LIST = ["java", "c++", "javascript"];
var keylist;
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



$(function () {
    //initialize google charts
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(function () { Google_loaded = true; });

    $("#analyze_button").click(function () {


        var input = (isUrl) ? $("#urlText").val() : $("#pureText").val();
        var result;
        //concert anything to lower case to compare
        var lowerCaseKeyList = DEFAULT_KEY_LIST.map(function (x) {
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
                    console.log("parse success");
                }).fail(function () {
                    alert("cannot aceess the website, try use input column");
                });
        } else {
            result = wordMappinng(input, lowerCaseKeyList);
            generateGraph(result);
        }

    });
});