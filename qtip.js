// qTip - CSS Tool Tips - by Craig Erskine
// http://qrayg.com
//
// Multi-tag support by James Crooke
// http://www.cj-design.com
//
// Inspired by code from Travis Beckham
// http://www.squidfingers.com | http://www.podlob.com
//
// Slight (facebook) modifications + css expression and jquery and prototype support by Vann Ek
// http://innerfusion.net
// 
// Copyright (c) 2006 Craig Erskine
// Permission is granted to copy, distribute and/or modify this document
// under the terms of the GNU Free Documentation License, Version 1.3
// or any later version published by the Free Software Foundation;
// with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
// A copy of the license is included in the section entitled "GNU
// Free Documentation License".

function create_tooltips (elems, dir, x, y) {
  var qTipTag = !elems ? "a,label,input,img" : elems; //Which tag do you want to qTip-ize? Keep it lowercase!//
  var qTipX = !x ? -25 : x; //This is qTip's X offset//
  var qTipY = !y ? 15 : y; //This is qTip's Y offset//
  var dir = !dir ? "/qtip" : dir;

  //There's No need to edit anything below this line//
  tooltip = {
    name : "qTip",
    offsetX : qTipX,
    offsetY : qTipY,
    tip : null
  }

  tooltip.init = function () {
  	var tipNameSpaceURI = "http://www.w3.org/1999/xhtml";
  	if(!tipContainerID){ var tipContainerID = "qTip";}
  	var tipContainer = document.getElementById(tipContainerID);

  	if(!tipContainer) {
  	  tipContainer = document.createElementNS ? document.createElementNS(tipNameSpaceURI, "div") : document.createElement("div");
  		tipContainer.setAttribute("id", tipContainerID);
  	  document.getElementsByTagName("body").item(0).appendChild(tipContainer);
  	}

  	if (!document.getElementById) return;
  	this.tip = document.getElementById (this.name);
    if (this.tip) document.onmousemove = function (evt) {tooltip.move (evt)};

  	var a, sTitle, elements;

  	var elementList = qTipTag.split(",");
  	for(var j = 0; j < elementList.length; j++)
  	{	
  	  
  	  if (typeof(Prototype)=="object") {
        // prototype
  	    elements = $$(elementList[j]);
	    } else if(typeof(jQuery)=="function") {
        // jquery
	      elements = $(elementList[j]);
	    } else {
        // js lib agnostic, note that this only accepts tag strings...
	      elements = document.getElementsByTagName(elementList[j]);
  	  };
  		
  		if(elements)
  		{
  			for (var i = 0; i < elements.length; i ++)
  			{
  				a = elements[i];
  				sTitle = a.getAttribute("title");				
  				if(sTitle)
  				{
  					a.setAttribute("tiptitle", sTitle);
  					a.removeAttribute("title");
  					a.removeAttribute("alt");
  					a.onmouseover = function() { tooltip.show(this.getAttribute('tiptitle'));	};
  					a.onmouseout = function() {tooltip.hide()};
  				}
  			}
  		}
  	}
  }

  tooltip.move = function (evt) {
  	var x=0, y=0;
  	if (document.all) {//IE
  		x = (document.documentElement && document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
  		y = (document.documentElement && document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
  		x += window.event.clientX;
  		y += window.event.clientY;

  	} else {//Good Browsers
  		x = evt.pageX;
  		y = evt.pageY;
  	}
  	
    this.tip.style.left = (x + this.offsetX) + "px";
    this.tip.style.top = (y + this.offsetY) + "px";
  }
  
  tooltip.set_position = function (x,y) {
  	this.tip.style.left = (x + this.offsetX) + "px";
  	this.tip.style.top = (y + this.offsetY) + "px";
  }

  tooltip.show = function (text) {
  	if (!this.tip) return;
  	var image_path = dir + "/tip.gif";
  	this.tip.innerHTML = "<img src='" + image_path + "' />";
  	this.tip.innerHTML += "<p align='center'>" +  text + "</p>";
  	this.tip.style.display = "block";
  }

  tooltip.hide = function () {
  	if (!this.tip) return;
  	this.tip.innerHTML = "";
  	this.tip.style.display = "none";
  }
  
  window.onload = function () {
   tooltip.init ();
  }
}

