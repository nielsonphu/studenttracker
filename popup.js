$(function() {	
	if (localStorage.getItem('studentListData')) {
		$('#studentlist').html(localStorage.getItem('studentListData'));
		}
	
	$('#studentlist li').live('click', function() {
		var studentid = $(this).html();
		$('.active').removeClass('active');
		$(this).addClass('active');
		if (localStorage.getItem(studentid)) {
		var content = localStorage.getItem(studentid);
		} else {
		var content = '<div><span class="sid">' + studentid + '</span><br /> \
					  <input type="button" value="Remove Student" id="removestudent" /><br />\
					  <b class="klass">Class 1:</b><img class="addspace" src="addicon.png" alt="Add Space"></img> <img class="removespace" src="minussign.png" alt="Remove Space"></img><br /> \
					  <div> \
					  <span class="inclass">In-class:</span> <span class="hwk">Hwk:</span> <span class="other">Other Notes:</span><br/> \
					  <textarea rows="2" col="10"></textarea> \
					  <textarea rows="2" col="10"></textarea> \
					  <textarea rows="2" col="10"></textarea> \
					  <input type="button" value="Add Class" id="addclass" /><br /> \
					  </div> \
					  </div>';
		}
		$('#classinfo').html(content);
		
		$('#classinfo textarea').each(function(i) {
			if (localStorage.getItem(studentid + i)) {
				$(this).val(localStorage.getItem(studentid + i));
			} else {
			$(this).val('');
			}
		
		localStorage.setItem('studentListData', $('#studentlist').html());
		
		});
		});
		
	$('#addstudent').click(function() {
		var studentName = $.trim($('#studentbox').val());
		var anyPrevious = $('li').filter(function() {
			return $(this).text() == studentName;});
		if (studentName == "" || anyPrevious.text() == studentName) {
			alert("Field is blank or a student already exists with that name.");
			return;
		} else {
		$('.active').removeClass('active');
		$('<li>' + studentName + '</li>').appendTo('#studentlist').addClass('active');
		$('.active').trigger('click');
		$('#studentbox').val('');
		localStorage.setItem('studentListData', $('#studentlist').html());
		}
		});
	
	$('.active').trigger('click');
	
	
	$('#addclass').live('click', function() {
		var classes2 = $('#classinfo div').size() / 2 + 1;
		var content2 = '<div> \
					  <b class="klass">Class ' + classes2 + ':</b><img class="addspace" src="addicon.png" alt="Add Space"></img> <img class="removespace" src="minussign.png" alt="Remove Space"></img><br />\
					  <div> \
					  <span class="inclass">In-class:</span> <span class="hwk">Hwk:</span> <span class="other">Other Notes:</span><br/> \
					  <textarea rows="2" col="10"></textarea> \
					  <textarea rows="2" col="10"></textarea> \
					  <textarea rows="2" col="10"></textarea> \
					  </div> \
					  </div>';
		$(content2).appendTo('#classinfo');
		$('#addclass').appendTo('#classinfo');
		});
		
	$('#removestudent').live('click', function() {
		var answer = confirm("Are you sure you want to remove this student?");
		if (answer) {
			var studentid = $('.sid').text();
			$('#classinfo textarea').each(function(i) {
				localStorage.removeItem(studentid + i);
			});
			localStorage.removeItem(studentid);
			$('#classinfo div').remove();
			$('#addclass').remove();
			$('.sid').remove();
			$('li').filter(function() {
				return $(this).text() === studentid;}).remove();
			localStorage.setItem('studentListData', $('#studentlist').html());
			} else {
			return;
			}
		});
		
	$('.addspace').live('click', function() {
		var index = $('img.addspace').index(this);
		var begin = index * 3;
		var end = begin + 2;
		for (var i = begin; i < end + 1; i++) {
		var textArea = $('textarea').get(i);
		var rows = textArea.getAttribute('rows');
		textArea.setAttribute('rows', parseInt(rows) + 1);
		}
		
		$('textarea').trigger('keyup');
		});
		
	$('.removespace').live('click', function() {
		var index = $('img.removespace').index(this);
		var begin = index * 3;
		var end = begin + 2;
		for (var i = begin; i < end + 1; i++) {
		var textArea = $('textarea').get(i);
		var rows = textArea.getAttribute('rows');
		if (parseInt(rows) > 2) {
		textArea.setAttribute('rows', parseInt(rows) - 1);
		}
		}
		
		$('textarea').trigger('keyup');
		});
		
	$('textarea').live('keyup', function() {
		localStorage.setItem($('.sid').text(), $('#classinfo').html());
		$('#classinfo textarea').each(function(i) {
			localStorage.setItem($('.sid').text() + i, $(this).val());
		
		});
	
	});
	
	$('.klass').live('click', function() {
		var childDiv = $(this).parent('div').children('div');
		if (childDiv.is(":visible")) {
		childDiv.hide();
		$(this).parent('div').children('img').hide();
		}
		else {
		childDiv.show();
		$(this).parent('div').children('img').show();
		}
	
		$('textarea').trigger('keyup');
	
	
	});
	
	
	

});