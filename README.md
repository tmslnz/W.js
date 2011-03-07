# W.js

JavaScript Framework for Node.js and Client-side Browser

## Usage

     git clone git@github.com:rc1/W.js.git
     cd W.js
     git submodule update --init

## Libraries

### _Node + Client Side_

* W
* W.text
* W.console

### _Client Side Only_

* W.slideshow.*

### _Client Side + Node Compatable_
* W.event 	_not required by node see: [Node's implementation](http://nodejs.org/docs/v0.4.2/api/events.html )_


### Roadmap

* add
	* W.safeJSON    parse if not already JSON
    * W.warn, W.log, W.stub to node.js
    * W.flashcomm
		* *evented flash communication*
    * W.symphony
        * *symphpny datasource and event utilities*
	* W.slideshow
		* all for a transition delegate pattern. this will allow for custom transitions.
		* make jQuery independant
	* W.event
		* @todo   bind events by default
		* @todo   check for non-blocking implemetation
		* <s>@todo   implement bubbling</s> << this is in node. needed for browser? maybe later

-------------

		////////////////////////////
		//    ///////////////    ///    Copyright (c) 2011 The Workers
		///    /////////////    ////    Authors: Ross Cairns
		////    ///// /////    /////
		/////    ///   ///    //////
		//////    /     /    ///////
		///////             ////////
		////////    //     /////////
		/////////  ////   //////////
		////////////////////////////