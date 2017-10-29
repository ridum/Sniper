$.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
        //options.url = "http://cors.corsproxy.io/url=" + options.url;
    }
});

$.get(
    'https://www.glassdoor.ca/job-listing/ixp-intern-software-developer-sap-JV_IC2278756_KO0,29_KE30,33.htm?jl=2562254803&ctt=1509053712570',
    function (response) {
        document.getElementById("mainContent").innerHTML = response;
        console.log(document.getElementById("mainContent").innerText);
        $("#mainContent").remove();
    });

JSON.stringify({}) === '{}' // check if json object is null