/* INIT GENERAL */
$('.js-tooltip').tooltip();

function copyToClipboard(text, el) {
	var copyTest, elOriginalText;
	copyTest = document.queryCommandSupported('copy');
	elOriginalText = el.attr('data-original-title');
	if (copyTest === true) {
		var $temp = $('<input>');
		$('body').append($temp);
		$temp.val(text).select();
		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'Copied!' : 'Whoops, not copied!';
			el.attr('data-original-title', msg).tooltip('show');
		} catch (err) {
			console.log('Oops, unable to copy');
		}
		$temp.remove();
		el.attr('data-original-title', elOriginalText);
	} else
		alert(xhr.responseJSON.message);
}

$('.js-copy').click(function() {
	var text, el;
	text = $(this).attr('data-copy');
	el = $(this);
	copyToClipboard(text, el);
});
/* END GENERAL */


/* INIT DOWNLOAD */
var downloadValidator = $('#form-download').validate({
	rules: {
		ipfsHash: {
			required: true,
			maxlength: 46
		},
		encrypted: {
			required: true
		},
		publicKey: {
			required: true,
			minlength: 44,
		}
	},
	errorPlacement: function(error,element) {
		return true;
	},
	highlight: function(element) {
		if ($(element).attr('type') == 'radio')
			$(element).parent().prev('h6').addClass('tag_error');
		else
			$(element).prev('h6').addClass('tag_error');
	},
	unhighlight: function(element) {
		if ($(element).attr('type') == 'radio')
			$(element).parent().prev('h6').removeClass('tag_error');
		else
			$(element).prev('h6').removeClass('tag_error');
	}
});

$('#btn-find-image').click(function() {
	if ($('#form-download').valid())
		getImage();
	else
		downloadValidator.focusInvalid();
});

function getImage() {
	var sendInfo, encrypted;

	encrypted = ($('input[name=encrypted]:checked').val() === 'true');
	
	sendInfo = {
		'ipfsHash': $('#ipfs-hash').val(),
		'encrypted': encrypted
	};
	
	if (encrypted)
		sendInfo.publicKey = $('#public-key').val();
	
	$('#wait-response').removeClass('d-none');
	$('#custom-search-input').addClass('d-none');
	
	$.ajax({
		type: 'GET',
		url: '/medical-file',
		dataType: 'json',
		data: sendInfo,
		error: function (xhr, ajaxOptions, thrownError)
		{
			console.log(xhr);
			$('#ipfs-hash').val('');
			$('#public-key').val('');
			$('#public-key-text-box').addClass('d-none');
			$("input:radio").prop("checked", false);
			$('#custom-search-input').removeClass('d-none');
			$('#wait-response').addClass('d-none');
			alert(xhr.responseJSON.message);
		},
		success: function(result)
		{
			if(result.image) {
				$('#btn-download').attr('href', result.image);
				$('#btn-download').attr('download', result.imageName);
				var img = new Image();
				img.src = result.image;
				img.onload = function() { $('#medical-image').attr('src', img.src); }
				$('#message-success').removeClass('d-none');
				$('#message-success-text').text(result.message);
				$('#message-info').removeClass('d-none');
				$('#message-info-text').html(result.ipfsMessage + '<a href="'+result.ipfsUrl+'" target="_blank">'+result.ipfsUrl+'</a>');
				$('#custom-search-image').removeClass('d-none');
			} else {
				$('#ipfs-hash').val('');
				$('#public-key').val('');
				$('#public-key-text-box').addClass('d-none');
				$("input:radio").prop("checked", false);
				$('#custom-search-input').removeClass('d-none');
			}
			$('#wait-response').addClass('d-none');
		}
	});
}

$('#btn-download').click(function() {
	$('#custom-search-image').addClass('d-none');
	$('#search-image').val('');
	$('#custom-search-input').removeClass('d-none');
});

$(function() {
    $('input[name="encrypted"]').on('click', function() {
        if ($(this).val() == 'true')
            $('#public-key-text-box').removeClass('d-none');
        else
            $('#public-key-text-box').addClass('d-none');
    });
});
/* END DOWNLOAD */

/* INIT UPLOAD */
var isAdvancedUpload = function() {
	var div = document.createElement('div');
	return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

var $dropZone = $('.upload-drop-zone');
var $form = $('.box-form');
var $image = $('#image-preview');

showFiles = function(file) {
  	$('#file-name').text(file.name);
  	var reader = new FileReader();

    reader.onload = function (e) {
        $image.attr('src', e.target.result).fadeIn('slow');
	}
	
    reader.readAsDataURL(file);
};

if (isAdvancedUpload) {
	$dropZone.addClass('has-advanced-upload');
	var droppedFile = false;
	var $input = $form.find('input[type="file"]');
    
	$dropZone.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
	})
	.on('dragover dragenter', function() {
		$dropZone.addClass('is-dragover');
	})
	.on('dragleave dragend drop', function() {
		$dropZone.removeClass('is-dragover');
	})
	.on('drop', function(e) {
		droppedFile = e.originalEvent.dataTransfer.files[0];
		showFiles(droppedFile);
	});
}

$('#btn-upload').click(function() {
	if (!droppedFile && $('input[type=file]')[0].files[0] == undefined) 
		return alert('No file dragged');

	if ($dropZone.hasClass('is-uploading')) return false;
	  
	$('#custom-upload-input').addClass('d-none');
	$('#wait-response').removeClass('d-none');
	
	$dropZone.addClass('is-uploading').removeClass('is-error');

	var formData = new FormData();
	
	if (isAdvancedUpload && droppedFile) {
		formData.append('imagename', droppedFile.name);
		formData.append('imagefile', droppedFile);
	}
	else {
		formData.append('imagename', $('input[type=file]')[0].files[0].name);
		formData.append('imagefile', $('input[type=file]')[0].files[0]);
	}
	
	$.ajax({
		type: 'POST',
		url: '/medical-file',
		data: formData,
		dataType: 'json',
		cache: false,
		contentType: false,
		processData: false,
		complete: function() {
			$dropZone.removeClass('is-uploading');
		},
		error: function (xhr, ajaxOptions, thrownError)
		{
			console.log(xhr);
			alert(xhr.responseJSON.message)
			$('#custom-upload-input').removeClass('d-none');
			$('#wait-response').addClass('d-none');
		},
		success: function(result) {
			if (result.success){
				$image.attr('src', 'images/upload.png');
				$('#file-name').text('');
				droppedFile = null;
				$('input[type=file]')[0].files[0] = null;
				$('#wait-response').addClass('d-none');
				$('#image-hash-box').removeClass('d-none');
				$('#message-success').removeClass('d-none');
				$('#message-success-text').text(result.message);
				$('#message-info').removeClass('d-none');
				$('#message-info-text').html(result.ipfsMessage + '<a href="'+result.ipfsUrl+'" target="_blank">'+result.ipfsUrl+'</a>');
				$('#image-hash').text(result.hash);
			}
		}
	});
});

$('#file-preview').click(function()
{
    $('#file-hidden').trigger('click');
});

$('#file-hidden').change(function()
{
	droppedFile = null;
	showFiles(this.files[0]);
});

$(function() {
    $('input[name="encrypt"]').on('click', function() {
        if ($(this).val() == 'true')
            $('#secret-key-text-box').removeClass('d-none');
        else
            $('#secret-key-text-box').addClass('d-none');
    });
});
/* END UPLOAD */


/* INIT IDENTITY */
$('#btn-new-keys').click(function() {
	$('#custom-new-identity').addClass('d-none');
	$('#wait-response').removeClass('d-none');
	$.ajax({
		type: 'GET',
		url: '/identity',
		error: function (xhr, ajaxOptions, thrownError)
		{
			console.log(xhr);
			alert(xhr.responseJSON.message)
			$('#custom-new-identity').removeClass('d-none');
			$('#wait-response').addClass('d-none');
		},
		success: function(result) {
			if (result.success){
				$('#message-success-text').text(result.message);
				$('#secret-btn').attr('data-copy', result.secretKey);
				$('#secret-key').text(result.secretKey);
				$('#public-btn').attr('data-copy', result.publicKey);
				$('#public-key').text(result.publicKey);
				$('#wait-response').addClass('d-none');
				$('#new-identity-keys').removeClass('d-none');
				$('#message-success').removeClass('d-none');
			}
		}
	});
});
/* END IDENTITY */