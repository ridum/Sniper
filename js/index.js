var isUrl = false;
``
function pressUrlButton() {
    if (!isUrl) {
        isUrl = true;
        document.getElementById("pureText").style.display = "none";
        document.getElementById("urlText").style.display = "block";
        $("#textButton").animate({ fontSize: '1rem', opacity: '0.3' }, "slow");
        $("#urlButton").animate({ fontSize: '1.2rem', opacity: '1' }, "slow");
    }
}

function pressTextButton() {
    if (isUrl) {
        isUrl = false;
        document.getElementById("pureText").style.display = "block";
        document.getElementById("urlText").style.display = "none";
        $("#textButton").animate({ fontSize: '1.2rem', opacity: '1' }, "slow");
        $("#urlButton").animate({ fontSize: '1rem', opacity: '0.3' }, "slow");
    }
}

$.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    }
})

function wordMappinng(string, list) {
    //filter all punctuation
    var words = string.replace(/[.,?!$%\^&\*;:{}=\-_`~()]|\+[^\+]/g, ' ');
    console.log(words);

    //convert into list
    var stringArray = words.split(/\s/);
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
    var keyList = ["java", "c++", "javascript"];
    var lowerCaseKeyList = keyList.map(function (x) {
        return x.toLowerCase();
    });
    $("#analyze_button").click(function () {
        var input = (isUrl) ? $("#urlText").val() : $("#pureText").val();
        if (isUrl) {
            $.get(
                input,
                function (response) {
                    document.getElementById("mainContent").innerHTML = response;

                    //store the context
                    var URLText = document.getElementById("mainContent").innerText.toLowerCase();

                    // remove the content to preserve local css
                    document.getElementById("mainContent").innerHTML = "";

                    //concert anything to lower case to compare

                    var result = wordMappinng(URLText, lowerCaseKeyList);
                    console.log(result);

                }).done(function () {
                    console.log("parse success");
                }).fail(function () {
                    alert("cannot aceess the file, try use input column");
                });
        } else {
            console.log($("#pureText").val());
            var result = wordMappinng(input, lowerCaseKeyList);
            console.log(result);
        }
    });

});