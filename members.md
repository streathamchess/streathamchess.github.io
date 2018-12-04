---
title: Latest Members Grades
layout: default
---
{% include fewseconds.html %}

<iframe width="452" height="750" frameborder="0" scrolling="no" src="https://onedrive.live.com/embed?resid=8EB2B688CF6DF930%21138&authkey=%21AOEz_cQEXwsF1L4&em=2&wdAllowInteractivity=False&Item='Sheet1'!A1%3AE100&wdHideGridlines=True&wdDownloadButton=True&wdInConfigurator=True"></iframe>

<!-- Comment out previous embed code which does not seem to be supported any more

<div id="myExcelDiv" style="width: 452px; height: 750px"></div>
<script type="text/javascript" src="https://r.office.microsoft.com/r/rlidExcelWLJS?v=1&kip=1"></script>
<script type="text/javascript">
	/*
	 * This code uses the Microsoft Office Excel Javascript object model to programmatically insert the
	 * Excel Web App into a div with id=myExcelDiv. The full API is documented at
	 * https://msdn.microsoft.com/en-GB/library/hh315812.aspx. There you can find out how to programmatically get
	 * values from your Excel file and how to use the rest of the object model. 
	 */

	// Use this file token to reference SBCC -Grades-Sep2017.xlsx in Excel's APIs
	var fileToken = "SD8EB2B688CF6DF930!138/-8164262475757389520/t=0&s=0&v=!AOEz_cQEXwsF1L4";

	// run the Excel load handler on page load
	if (window.attachEvent) {
		window.attachEvent("onload", loadEwaOnPageLoad);
	} else {
		window.addEventListener("DOMContentLoaded", loadEwaOnPageLoad, false);
	}

	function loadEwaOnPageLoad() {
		var props = {
			item: "'Sheet1'!A1:E85",
			uiOptions: {
				showGridlines: false
			},
			interactivityOptions: {
				allowTypingAndFormulaEntry: false
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

<!-- Comment out previous grades code
### {% include build/currentlistversion.html %}

Click <a href="http://www.ecfgrading.org.uk/new/glist.php?Code=7152&Club=Streatham" target="_blank">here</a>
to open list in separate page.
//-->

If you would like to know how grades are calculated, see the
[ECF grading database](http://www.ecfgrading.org.uk/).

<!-- Comment out previous grades code
{% include build/currentlist.html %}
//-->

