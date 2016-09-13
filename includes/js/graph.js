mindMap.controller("graphCtrl", function($scope,$http){
  $scope.graph = function(txt,graphId){
    var rem = d3.select("#graph");
    rem.remove();
    $scope.grp = null;
    $scope.data = {"nodes":[],"links":[]};
    $scope.data1 = {"nodes":[],"links":[]};
    $http.get('http://localhost:3000/nodes')
              .success(function (data, status, headers, config) {
                 $scope.data.nodes = data;
                 for(i=0;i<$scope.data.nodes.length;i++)
                 {
                   if(txt.toLowerCase()==($scope.data.nodes[i].id.toLowerCase() )){
                     $scope.grp=$scope.data.nodes[i].group;
                   }
                 }//for_end
                //
                if ($scope.grp == null) {
                  var noGraph = angular.element( document.querySelector('#noGraph') );
                  noGraph.removeClass("ng-hide");
                  return;
                } else {
                  var noGraph = angular.element( document.querySelector('#noGraph') );
                  noGraph.addClass("ng-hide");
                }
                $http.get('http://localhost:3000/links')
                           .success(function (data, status, headers, config) {
                              $scope.data.links = data;
                               //console.log($scope.data.links);
                           });

                  $http.get('http://localhost:3000/nodes?group='+$scope.grp)
                     .success(function (data, status, headers, config) {
                          $scope.data1.nodes = data;
                          //console.log($scope.data1.nodes);
                           });
                    $http.get('http://localhost:3000/links?id_like='+txt)
                      .success(function (data, status, headers, config) {
                        $scope.data1.links = data;
                var select = d3.select(graphId);
                var svg = select.append("svg");
                     svg.attr("width",760);
                     svg.attr("height",400);
                     svg.attr("id","graph");
                     var width = +svg.attr("width"),
                     height = +svg.attr("height");
                var color = d3.scaleOrdinal(d3.schemeCategory20);
              var simulation = d3.forceSimulation()
                  .force("link", d3.forceLink().id(function(d) {return d.id}).distance(200))
                  .force("collision", d3.forceCollide().radius(30))
                  .force("gravity",d3.forceManyBody().strength(30))
                  .force("center", d3.forceCenter(width/ 2, height / 2));
              var groupOfLinksAndNodes = svg.append("g");
              var groupLinks = groupOfLinksAndNodes.append("g").attr("class","links");
              var groupOfNodes = groupOfLinksAndNodes.append("g").attr("class", "nodes");
              var groupOfNodeElements = groupOfNodes.selectAll("g").data($scope.data1.nodes).enter().append("g")
                      .call(d3.drag()
                      .on("start", dragstarted)
                      .on("drag", dragged)
                      .on("end", dragended)
                      )
                      .call(d3.drag()
                      .on("start", dragstarted)
                      .on("drag", dragged)
                      .on("end", dragended)
                      )
              groupOfNodeElements.append("circle")
                .attr("r", 30)
                .attr("fill", function(d) { return color(d.group); })
              groupOfNodeElements.append("text")
                .text(function(d) {return d.id;});
              var link = groupLinks
                .selectAll("path")
                .data($scope.data1.links)
                .enter().append("path")
                simulation
                  .nodes($scope.data1.nodes)
                  .on("tick", ticked);
                simulation
                  .force("link")
                  .links(  $scope.data1.links)
              var nodeLabels = groupOfNodes
                .selectAll("text")
                .data($scope.data1.nodes)
                .enter().append("text")
                .text(function(d) { return d.value; })
                .attr("text-anchor","middle")
              // var linkLabels = groupLinks
              //  .selectAll("text")
              //  .data(graph1.links)
              //  .enter().append("text")
              //  .text(function(d) { return d.relation })
              //  .attr("text-anchor","middle")
                function ticked() {
                  link.attr("d", function(d) {
                    dx = d.target.x - d.source.x;
                    dy = d.target.y - d.source.y;
                    dr = Math.sqrt(dx*dx + dy*dy);
                    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
                  })
                // link
                //    .attr("x1", function(d) {return d.source.x;})
                //    .attr("y1", function(d) {return d.source.y;})
                //    .attr("x2", function(d) {return d.target.x;})
                //    .attr("y2", function(d) {return d.target.y;})
                groupOfNodes
                  .selectAll("circle")
                  .attr("cx", function(d) {return d.x;})
                  .attr("cy", function(d) {return d.y;})
                groupOfNodes
                  .selectAll("text")
                  .attr("x", function(d) { return d.x - 20 })
                  .attr("y", function(d) { return d.y; });
                // linkLabels
                //    .attr("x", function(d) { return (d.source.x + d.target.x) / 2; })
                //    .attr("y", function(d) { return (d.source.y + d.target.y) / 2; })
                nodeLabels
                  .attr("x",function(d) {return d.x})
                  .attr("y",function(d) {return d.y})
              }
              //graphone
              function dragstarted(d) {
              if (!d3.event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
              }
              function dragged(d) {
              d.fx = d3.event.x;
              d.fy = d3.event.y;
              }
              function dragended(d) {
              // if (!d3.event.active) simulation.alphaTarget(0);
              // d.fx = null;
              // d.fy = null;
              d.fixed = true;
              // simulation.restart();
              }
                      });



                //
              });


  };
    //search_function_end
});
