node-xml
===================

(C) Rob Righter (@robrighter) 2009 - 2010, Licensed under the MIT-LICENSE
Contributions from David Joham

 node-xml is an xml parser for node.js written in javascript. 

 
API
---
 
Node-xml supports sax style parsing. To use the parser you setup the event listeners:

    var parser = new libxml.SaxParser(function(cb) {
	  cb.onStartDocument(function() {});
	  cb.onEndDocument(function() {});
	  cb.onStartElementNS(function(elem, attrs, prefix, uri, namespaces) {});
	  cb.onEndElementNS(function(elem, prefix, uri) {});
	  cb.onCharacters(function(chars) {});
	  cb.onCdata(function(cdata) {});
	  cb.onComment(function(msg) {});
	  cb.onWarning(function(msg) {});
	  cb.onError(function(msg) {});
	});
	

EXAMPLE USAGE
-------------

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
           parser.pause();// pase the parser
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