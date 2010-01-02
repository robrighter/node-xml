node-xml
===================

(C) Rob Righter (@robrighter) 2009 - 2010, Licensed under the GNU Lesser General Public License (http://www.gnu.org/copyleft/lesser.html)

 node-xml is an xml parser for node.js written in javascript. 

 This library repackages components from the "XML for Script" library released
 under LGPL (http://xmljs.sourceforge.net). That library was written by
 David Joham (djoham@yahoo.com) and Scott Severtson. 
 It has been modified into node-xml to:
    (1) become asynchronous
    (2) become interruptible
    (3) utilize javascript closures

API
---

Node-xml supports sax style parsing. To use the parser you can register for 3 types of events:

    (1) Document Events ( via setDocumentHandler() ):
    characters : function(data, start, length)
    endDocument : function()
    endElement : function(name)
    processingInstruction : function(target, data) 
    setDocumentLocator : function(locator) 
    startElement : function(name, atts)
    startDocument : function() 
    comment : function(data, start, length)
    endCDATA : function()
    startCDATA : function() {


    (2) Error Events (via setErrorHandler()):
    error : function(exception)
    fatalError : function(exception)
    warning : function(exception)
    
    Exception objects have 3 methods:
    a. exception.getMessage()
    b. exception.getLineNumber()
    c. exception.getColumnNumber()


    (3) Lexical Events (via setLexicalHandler()):
    _fullCharacterDataReceived = function(fullCharacterData)
    _handleCharacterData = function()  {


As an example, you can register for the document events that you are interested in like this:
    
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