var isUrl = false;

function pressUrlButton() {
    if(!isUrl) {
        isUrl = true;
        document.getElementById("pureText").style.display = "none";
        document.getElementById("urlText").style.display = "block";
        $("#textButton").animate({fontSize: '1rem', opacity: '0.4'}, "slow");        
        $("#urlButton").animate({fontSize: '1.2rem'}, "slow");
    }
}

function pressTextButton() {
    if(isUrl) {
        isUrl = false;
        document.getElementById("pureText").style.display = "block";
        document.getElementById("urlText").style.display = "none";
        $("#textButton").animate({fontSize: '1.2rem'}, "slow");        
        $("#urlButton").animate({fontSize: '1rem', opacity: '0.4'}, "slow");
    }
}

$.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
        //options.url = "http://cors.corsproxy.io/url=" + options.url;
    }
})
// JSON.stringify({}) === '{}' // check if json object is null

function wordMappinng(string, list) {
    //filter all period
    var words = string.replace(/[.]/g, '');

    console.log(list.indexOf('java'));
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
    var url = 'https://www.glassdoor.ca/job-listing/ixp-intern-software-developer-sap-JV_IC2278756_KO0,29_KE30,33.htm?jl=2562254803&ctt=1509053712570';
    var text;
    $.get(
        url,
        function (response) {
            document.getElementById("mainContent").innerHTML = response;

            //store the context
            text = document.getElementById("mainContent").innerText.toLowerCase();

            // remove the content to keep local css
            $("#mainContent").remove();

            //concert anything to lower case to compare
            var lowerCaseKeyList = keyList.map(function (x) {
                return x.toLowerCase();
            });
            var result = wordMappinng(text, lowerCaseKeyList);
            console.log(result);

        }).done(function () {
            console.log("parse success");
        }).fail(function () {
            alert("cannot aceess the file, try use input column");
        });
});