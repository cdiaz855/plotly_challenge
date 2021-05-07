function createData(){
d3.json("samples.json").then(function(data){
    console.log(data);

    for (var i = 0; i < data.names.length; i++) {
        if (i == 0) {
            var defaultId = data.names[i];
          }
    var dataOptions = d3.selectAll("#selectDataOptions").node();
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = data.names[i];
    dataOptions.appendChild(opt);
}
var sampData = document.getElementById("sample-metadata");
    const retData = data.metadata.find(
      (entry) => entry.id == defaultId
    );
    const dispInfo = Object.entries(retData);
    for (var j = 0; j < dispInfo.length; j++) {
      var p = document.createElement("p");
      const [key, value] = dispInfo[j];
      p.innerHTML = `${key}: ${value}`;
      sampData.appendChild(p);
    }
var x = data.samples
.find((sample) => sample.id === defaultId)
.sample_values.slice(0, 10).reverse();
var y = data.samples
.find((sample) => sample.id === defaultId)
.otu_ids.slice(0, 10).reverse()
.map((id) => `OTU ${id}`);
var hText = data.samples
.find((sample) => sample.id === defaultId)
.otu_labels.slice(0, 10).reverse();

var optionSel = data.names[i];
var xL = data.samples.find((sample) => sample.id === defaultId).otu_ids;
var yL = data.samples.find((sample) => sample.id === defaultId).sample_values;
var sizeB = data.samples.find((sample) => sample.id === defaultId).sample_values;
var colorB = data.samples.find((sample) => sample.id === defaultId).otu_ids;
var labelTxt = data.samples.find((sample) => sample.id === defaultId).otu_labels;

barGraph = [
{
  type: "bar",
  x: x,
  y: y,
  orientation: "h",
  name: "Bellybutton",
  marker: {
    width: 1,
  },
},
];
var bcLyt = {
title: `Selected ID & OTU`,
xaxis: { title: "Sample Value" },
};
var configuration = { responsive: true };
Plotly.newPlot("bar", barGraph, bcLyt, configuration);

var bbGraph = [
{
  type: "scatter",
  mode: "markers",
  x: xL,
  y: yL,
  text: labelTxt,
  marker: {
    color: colorB,
    colorscale: "blue",

    size: sizeB.map((x) => x * 10),
    sizemode: "area",
  },
},
];
var bbLyt = {
title: " Selected ID & OUT (Scatter)",
xaxis: { title: "OTU ID" },
yaxis: { title: "Sample Value" },
};
Plotly.newPlot("bubble", bbGraph, bbLyt, configuration);

d3.selectAll("#selectDataOptions").on("change", update_all);
});
}

function demData() {
d3.json("samples.json").then(function (data) {

var selData = d3.select("#selectDataOptions");
var selOpt = data.names[selData.property("value")];

var sampData = document.getElementById("sample-metadata");
sampData.innerHTML = "";
const retData = data.metadata.find(
(entry) => entry.id == selOpt
);
const dispInfo = Object.entries(retData);
for (var j = 0; j < dispInfo.length; j++) {
var p = document.createElement("p");
const [key, value] = dispInfo[j];
p.innerHTML = `${key}: ${value}`;
sampData.appendChild(p);
}
});
}

function barChartCreate() {
d3.json("samples.json").then(function (data) {
console.log(data);

var selData = d3.select("#selectDataOptions");
var selOpt = selData.property("value");
var dataset = data.samples[selOpt];

var x = dataset.sample_values.slice(0, 10).reverse();
var y = dataset.otu_ids
.slice(0, 10)
.reverse()
.map((id) => `OTU ${id}`);

Plotly.restyle("bar", "x", [x]);
Plotly.restyle("bar", "y", [y]);
});
}

function bblChartCreate() {
d3.json("samples.json").then(function (data) {

var selData = d3.select("#selectDataOptions");
var selOpt = selData.property("value");
var dataset = data.samples[selOpt];

var xL = dataset.otu_ids;
var yL = dataset.sample_values;
var sizeB = dataset.sample_values;
var colorB = dataset.otu_ids;
// var labelTxt = dataset.otu_labels;
Plotly.restyle("bubble", "x", [xL]);
Plotly.restyle("bubble", "y", [yL]);
Plotly.restyle("bubble", "size", [sizeB]);
Plotly.restyle("bubble", "color", [colorB]);
Plotly.restyle("bubble", "text", [labelTxt]);
})
};

createData();
demData();
barChartCreate();
bblChartCreate();