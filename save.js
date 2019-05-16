$("span[id|='spnRank']").each(function (i, el) {
	$(this).html('<input type="text" style="color:black;" class="prefRankByPP" value="'+i+'"></input>')
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
