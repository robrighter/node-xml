var sys = require('sys');
var posix = require('posix');
var xml = require("./lib/node-xml");

var parser = new SAXDriver();

 parser.setDocumentHandler({
     startElement : function(name, atts) {
       sys.puts("=> Started: " + name + " (" + atts.getLength() + " Attributes)");
     },
     
     endElement : function(name) {
       sys.puts("<= End: " + name + "\n");
       parser.pause();// pause the parser
       setTimeout(function (){parser.resume();}, 200); //resume the parser
     }
 });
 
 parser.setErrorHandler({
      error : function(exception) {
        sys.puts("ERROR: " +exception.getMessage());
      },
  });

posix.cat("sample.xml").addCallback(function (content) {
  sys.puts('...starting parsing');
  parser.parse(content);
});
 


