queue()
    .defer(d3.csv, "data/Salaries.csv")
    .await(makeGraph);



function makeGraph(error, salaryData) {




    // sex comparison chart
    let ndx = crossfilter(salaryData);
    let sexDim = ndx.dimension(dc.pluck("sex"));
    let numberGroup = sexDim.group();
    let sexChart = dc.barChart("#sex-chart");

    sexChart
        .width(500)
        .height(300)
        .dimension(sexDim)
        .group(numberGroup)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Gender");

    let sexWageDim = ndx.dimension(dc.pluck("sex"));
    let salaryGroup = sexWageDim.group().reduce(
        function(p, v) {
            ++p.count;
            p.total += +v["salary"];
            p.average = p.total / p.count;
            return p;
        },
        function(p, v) {
            --p.count;
            if (p.count == 0) {
                p.total = 0;
                p.average = 0;
            }
            else {
                p.total -= v.salary;
                p.average = p.total / p.count;
            }
            return p;
        },

        function() {
            // init runs first and it returns p
            return { count: 0, total: 0, average: 0 };
        }
    );

console.log(salaryGroup.all());



    // use valueAccessor to get a value from the custom reduce 

    let sexSalaryChart = dc.barChart("#sex-salary-chart");

    sexSalaryChart
        .width(500)
        .height(300)
        .margins({ left: 60, right: 60, top: 40, bottom: 40 })
        .dimension(sexWageDim)
        .group(salaryGroup)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Gender")
        .valueAccessor(function(p) {
            return p.value.average;
        });


    dc.renderAll();

    // by default reduces take three functions as arguments



}
