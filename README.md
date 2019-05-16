# Bits-PS2-form-helper

Instead of the old drag-n-drop, this script will provide you with text boxes to input the preference numbers.


### How to use
  1. Go to station preference page on psd site.
  1. Open the console in developer tools of your browser (`Ctrl+Shift+i` for chrome).
  1. Copy and paste the code below in the console. You can also use the save.js file present in this repo.
  1. Text boxes will appear on page with current preference for each station.
  1. Use these input boxes to assign preference number to each station.
  1. Make sure there are no duplicate value. If there are, then the page will prompt you that there are 
  	invalid values present.
  1. Make sure that all the values between `0` and `(total number of stations) - 1` are present. If not, page 
  	will alert you that all ranks are not available.
  1. Save the form using `Save All Preferences` button.
  1. Re-visit the page again, and make sure all the changes are saved.


### UPDATE
Now this script supports swapping of preference numbers !!!

Suppose you have have `station A` on perference `5` and another `station B` on `190`. Now if you enter
`5` against `station B`, preference of `station A` will automatically be updated to `190`.


### Code
```
$("span[id|='spnRank']").each(function (i, el) {
	$(this).html('<input type="text" style="color:black;" class="prefRankByPP" value="'+i+'">')
});

function save() {
	len = $('.col-sm-12.item-blue').length
	cnt = new Array(len).fill(0)
	$('.col-sm-12.item-blue').each(function () {
			rank = parseInt($(this).find('input.prefRankByPP').val())
			cnt[rank] += 1
		})
	sum = 0
	b = false
	for(i in cnt) {
		e = cnt[i]
		sum += e
		console.log(cnt[i])
		if(e != 1) {
			alert("Invalid value at index" + (parseInt(i)+1))
			b = true
			return
	    }
	}
	if(!b && sum!=len) {
		alert('All ranks not available. values should be between 0-'+(len-1))
		return
	}
	// check = ok
	// now save
	var accomo = "false";
		var contistation = 1;
		var i = 0;
		jsondata = "";
		jsonvalue = "";
		jsondata = "[";

	$('.col-sm-12.item-blue').each(function () {
		spn = $(this).find('span.spanclass').attr('spn')
		accomo = "false"
		if ($('.accomo[chkaccomo="' + spn + '"]').is(':checked') == true) {
	    		accomo = "true";
	    	}
	    	else {
			accomo = "false";
	    	}
		rank = parseInt($(this).find('input.prefRankByPP').val()) + 1
		jsondata += "{"
		jsondata += "'isActive':'1',"
		jsondata += "'PreferenceNo':'" + rank + "','StationId':'" + spn + "',"
		jsondata += "'Accommodation':'" + accomo + "',"
		jsondata += "},"
	})
	jsondata = jsondata.substr(0, jsondata.length - 1);
	jsondata += "]";

	if ($('#consta').is(":checked")) {
	    contistation = 1;
	    jsonvalue += "'isActive':'1',"
	    jsonvalue += "'ContinueStation':'"+ contistation+"',"
	    jsonvalue = jsonvalue.substr(0, jsonvalue.length - 1);
	    jsonvalue = '{' + jsonvalue + '}';
	}
	else {
	    contistation = 0;
	}
	saveprefdata(jsondata, jsonvalue, contistation);
}
$('#btnSave').one("click", save)

// swap preference numbers
$('.prefRankByPP').each(function () {
	$(this).data('val', $(this).val())
})
$('.prefRankByPP').change(function () {
	preVal = $(this).data('val')
	curVal = $(this).val()
	b = false
	ct = this
	$('.prefRankByPP').each(function () {
		swapVal = $(this).val()
		if(swapVal == curVal && this != ct) {
			$(this).val(preVal)
			$(this).data('val', preVal)
			b = true
		}
	})
	if(!b) {
		$(this).val(preVal)
	} else {
		$(this).data('val', $(this).val())
    	}
})

```
