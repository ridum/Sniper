var Google_loaded = false;
function generateGraph(result) {
    if (Google_loaded) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Key words');
        data.addColumn('number', 'Times of appearances');
        //convert object to data
        for (var key in result) {
            var row = [];
            row.push(key);
            row.push(result[key]);
            data.addRow(row);
        }


        var options = {
            animation: { "startup": true, duration: 1500, easing: 'out' },
            legend: { position: "none" },
            vAxis: {
                minValue: 10
            },
            hAxis: {
                title: 'Frequency graph',
                titleTextStyle: {
                    fontSize: 20,
                }
            },
        };

        var chart = new google.visualization.ColumnChart(
            document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}