var chart = dc.rowChart("#member_age");

d3.json("member_data.json", function(error, data) {
  var dateFormat = d3.time.format("%Y-%m")
  var ct_data = data.data.age_of_members
  var ndx = crossfilter(ct_data);

  var ageDim = ndx.dimension(function (d) {return d.age_range;});
  var member_sum = ageDim.group().reduceSum(function(d) {return d.count;});

  chart
    .width(768)
    .height(480)
    .dimension(ageDim)
    .margins({top: 30, right: 50, bottom: 40, left: 60})
    .group(member_sum, "Number of members")
    .valueAccessor(function (d) {return d.value;})
  dc.renderAll();
});
