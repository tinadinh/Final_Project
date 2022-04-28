function init() {
    // Grabbing reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Using the list of names to populate the select options
    d3.json("covid.json").then((data) => {
        var names = data.name.PHU;
        console.log(data);
        Object.values(names).forEach((key) => {
            selector.append("option").text(key).property("value", key);
        });

      // Using the first name from the list to build the initial plots
      var firstName = names[0];
      
      buildCharts(firstName);
      buildMetadata(firstName);
    
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged() {
    var selector = document.getElementById("selDataset");
    var newSample = selector.value;
    // Fetching new data each time a new name is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    
  }

  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("covid.json").then((data) => {
      var metadata = data.info;
      // Filtering the data for the object for the associated selected name
      var resultArray = Object.values(metadata).filter(sampleObj => sampleObj.PHU == sample);
      console.log(resultArray);
      var result = resultArray[0];
      
      // Using d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Using `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Using `Object.entries` to add each key and value pair to the panel
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }
  
  // Createing the buildCharts function.
  function buildCharts(sample) {
    //  Using d3.json to load and retrieve the covid.json file 
    d3.json("covid.json").then((data) => {
      // Creating a variable that holds the stats array. 
      var stat = data.stats;
      var statArray = Object.values(stat).filter(sampleObj => sampleObj.PHU == sample);
      var statResult = statArray[0];
      console.log(statResult)
  
      // Creating variable to hold each attribute for each PHU
      var ageGroup = [statResult.Age_Under_20,statResult.Age_20s, statResult.Age_30s, statResult.Age_40s, statResult.Age_50s, 
        statResult.Age_60s, statResult.Age_70s, statResult.Age_80s, statResult.Age_Over_90s]
      var ageNames = ['Ages < 20', 'Age Group of 20s', 'Age Group of 30s', 'Age Group of 40s','Age Group of 50s',
      'Age Group of 60s','Age Group of 70s','Age Group of 80s','Ages 90 +']

      
      var genderGroup = [statResult.Female,statResult.Male,statResult.Unknown] 
      var genderNames = ['Female','Male','Unknown']
      
      var status = [statResult.Not_Resolved, statResult.Resolved, statResult.Fatal]
      var statusNames = ['Not Resolved','Resolved','Fatal']
    
    
      // Creating bar chart of age groups 
      var barData = [{
        x: genderGroup,
        y: genderNames,
        text: genderNames,
        type: "bar", 
        orientation: "h",
        width: 0.5,
        marker: {
          color: ['#ff0000',"#0000ff", '#ffff00']
        }
      }];
 
      // Creating the layout for the bar chart. 
      var barLayout = {
        title: {
          text: "<b>Cases by Gender</b>",
          font: {size: 22}
        },
        xaxis: {
          title: 'Number of Cases'
        },
        automargin: true,
        width: 1000,
        height: 500,
        
      };
  
      var config = {responsive: true}

      // Using Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", barData, barLayout, config);
  
      // Creating the bubble chart of gender
      var bubble = [{
         x: ageGroup,
         y: ageNames,
         mode: "markers",
         marker: {
           size: ageGroup,
           color: ageGroup,
           colorscale: 'Jet'
         }
       }];

      // Creating bubble chart layout
      var bubbleLayout = {
        title: {
          text: '<b>Cases by Age Group</b>',
          font: {size: 22}
        },
        xaxis: {
          title: "Number of Cases"},
          hovermode: 'closest',
          automargin: true,
          width: 1150,
          height: 500,
        };

      Plotly.newPlot("bubble", bubble,bubbleLayout);
  
     // Creating the pie chart for case status
      var pie = [{
        values: status,
        labels: statusNames,
        textposition: 'outside',
        automargin: true,
        hole: .4,
        type: 'pie'
      }];

      var pieLayout = {
        title: {
          text: "<b>% of Outcomes per PHU</b>", 
          font: {size: 22}
        },
        hovermode: "closest",
        width: 1150,
        height: 700
      };
      
      Plotly.newPlot('pie',pie, pieLayout);
      
    });
  }

  
    
      
  
  
  

  

  