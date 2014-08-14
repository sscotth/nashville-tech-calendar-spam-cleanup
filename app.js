;(function(){
  'use strict';

  var casper   = require('casper').create(),
      $x       = require('casper').selectXPath,

      KEYWORDS = [ 'hollister'             ,
                   'offeredat'             ,
                   'True Religion'         ,
                   'bnnklmn'               ,
                   'Ralph Lauren'          ,
                   'University or college' ,
                   'north face'            ,
                   'Vuitton'               ,
                   'designer bags'         ,
                   'well luxury'           ,
                   'true were beyond'      ,
                   'そこである'],

      URL      = 'http://cal.nashvl.org/events?utf8=%E2%9C%93&date%5Bstart%5D=2000-01-01&date%5Bend%5D=2099-12-31&commit=Filter',

      links    = [];

  casper.start(URL);
  casper.viewport(1280, 720);

  // Grab all cal.nashvl.org links that contain any KEYWORD
  casper.eachThen(KEYWORDS, function(response){
    var xpath = "//a[contains(text(),'" +
                  response.data +
                  "') and contains(@href,'cal.nashvl.org')]",

        nodes = $x(xpath);

    links.push(this.getElementsAttribute(nodes, 'href'));
  });

  // Then Flatten the links array
  casper.then(function(){
    links = links.reduce(function(a, b){
      return a.concat(b);
    });
  });

  // Then Submit a DELETE request to the url
  casper.then(function(){
    casper.eachThen(links, function(response){
      this.thenOpen(response.data, {method: 'delete'}, function(){
        this.echo('delete: ' + response.data);
      });
    });
  });

  casper.run(function(){
    this.exit();
  });

}());
