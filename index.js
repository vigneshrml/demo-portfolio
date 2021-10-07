   
        var obj;
        var todayDate = new Date();

        var dataPoints = [];
        var dataRecovered = [];
        var dataDeath = [];

        fetch('https://covid19.mathdro.id/api')
        .then(res => res.json())
        .then(data => obj = data)
        .then(() => {
            setInfected(obj.confirmed.value)
            setRecovered(obj.recovered.value)
            console.log(obj)
            setDeath(obj.deaths.value)
        })

        function setInfected(value){
            document.getElementById("infected").innerHTML = value;
            document.querySelector(".todayDate1").innerHTML = `<small>${todayDate.toDateString()}</small>`
        }

        function setRecovered(value){
            document.getElementById("recovered").innerHTML = value;
            document.querySelector(".todayDate2").innerHTML = `<small>${todayDate.toDateString()}</small>`
        }

        function setDeath(value){
            document.getElementById("death").innerHTML = value;
            document.querySelector(".todayDate3").innerHTML = `<small>${todayDate.toDateString()}</small>`
        }


        function addData(data) {
            for (var i = 0; i < data.length; i++) {
                dataPoints.push({
                    x: new Date(data[i].reportDate.replaceAll("-",",")),
                    y: data[i].totalConfirmed
                });
            }
        }

        function addRecover(data) {
            for (var i = 0; i < data.length; i++) {
                dataRecovered.push({
                    x: new Date(data[i].reportDate.replaceAll("-",",")),
                    y: data[i].totalRecovered
                });
            }
        }

        function addDeath(data) {
            for (var i = 0; i < data.length; i++) {
                dataDeath.push({
                    x: new Date(data[i].reportDate.replaceAll("-",",")),
                    y: data[i].deaths.total
                });
            }
        }


        $.getJSON("https://covid19.mathdro.id/api/daily", addData);
        $.getJSON("https://covid19.mathdro.id/api/daily", addRecover);
        $.getJSON("https://covid19.mathdro.id/api/daily", addDeath);

        


        window.onload = function () {

            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                title:{
                    text: "Daily Tracker for Corona Virus"
                },
                axisX: {
                    valueFormatString: "DD MM,YY"
                },
                axisY: {
                    title: "Number of People",
                    suffix: " "
                },
                legend:{
                    cursor: "pointer",
                    fontSize: 16,
                    itemclick: toggleDataSeries
                },
                toolTip:{
                    shared: true
                },
                data: [{
                    name: "Total Death",
                    type: "spline",
                    showInLegend: true,
                    dataPoints:dataDeath
                },
                {
                    name: "Total Infected",
                    type: "spline",
                    showInLegend: true,
                    dataPoints: dataRecovered
                },
                {
                    name: "Total Recovered",
                    type: "spline",
                    showInLegend: true,
                    dataPoints: dataPoints
                }]
            });
            chart.render();
            
            function toggleDataSeries(e){
                if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                }
                else{
                    e.dataSeries.visible = true;
                }
                chart.render();
            }
            
            }