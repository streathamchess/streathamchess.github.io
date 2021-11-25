---
title: Club calendar
layout: default
jq_disable: false
---



Face-to-face chess is returning to normal.  
Below is our calendar for the 2021/22 season, including fixtures in the London League, the Central London League and the Surrey League. We will also be entering teams in the Croydon & District League which will restart soon - fixture dates to follow.  
Our free weekly chess sessions at Streatham Library are held throughout the year (excluding bank holidays) 16:30 to 19:30.  
You can view upcoming events in Week, Month or Agenda view by clicking on the menu bar on the right. Just click on an event to call up further information.  
We also have a programme of online activities which includes leagues such as [4NCL Online](http://www.4ncl.co.uk/data/pairings_online.htm#onlinedates).  

{% include fewseconds.html %}

<iframe src="https://calendar.google.com/calendar/embed?src=hd72cr06g8mrl45piofljls7cs%40group.calendar.google.com&ctz=Europe%2FLondon" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>

<!-- comment out previous Excel embed which doesn't seem to work any more

<div id="myExcelDiv" style="width: 640px; height: 750px"></div>https://calendar.google.com/calendar/u/0?cid=aGQ3MmNyMDZnOG1ybDQ1cGlvZmxqbHM3Y3NAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ
<script type="text/javascript" src="https://r.office.microsoft.com/r/rlidExcelWLJS?v=1&kip=1"></script>
<script type="text/javascript">
	/*
	 * This code uses the Microsoft Office Excel Javascript object model to programmatically insert the
	 * Excel Web App into a div with id=myExcelDiv. The full API is documented at
	 * https://msdn.microsoft.com/en-GB/library/hh315812.aspx. There you can find out how to programmatically get
	 * values from your Excel file and how to use the rest of the object model. 
	 */

	// Use this file token to reference Calendar1718-jp.xlsx in Excel's APIs
	var fileToken = "SD8EB2B688CF6DF930!136/-8164262475757389520/t=0&s=0&v=!ACv-r5NcGUiUnHI";

	// run the Excel load handler on page load
	if (window.attachEvent) {
		window.attachEvent("onload", loadEwaOnPageLoad);
	} else {
		window.addEventListener("DOMContentLoaded", loadEwaOnPageLoad, false);
	}

	function loadEwaOnPageLoad() {
		var props = {
			item: "'Sheet1'!A1:O117",
			/* item: "'Sheet1'", */
			uiOptions: {
				showGridlines: false,
				showParametersTaskPane: false
			},
			interactivityOptions: {
				allowTypingAndFormulaEntry: false,
				allowParameterModification: false,
				allowSorting: false,
				allowFiltering: false,
				allowPivotTableInteractivity: false
			}
		};

		Ewa.EwaControl.loadEwaAsync(fileToken, "myExcelDiv", props, onEwaLoaded);
	}

	function onEwaLoaded(result) {
		/*
		 * Add code here to interact with the embedded Excel web app.
		 * Find out more at https://msdn.microsoft.com/en-GB/library/hh315812.aspx.
		 */
	}
</script>
//-->

<!-- Comment out old calendar code for now
{% include calendar.html json="'/assets/calendar2015.json'" %}

[Master calendar (PDF)](/assets/calendar2016.pdf)
//-->

