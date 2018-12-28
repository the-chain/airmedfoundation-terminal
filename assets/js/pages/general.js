/* INIT DOWNLOAD */
$(function() {
    $('#search-image').keypress(function(e) {
        if(e.which == 10 || e.which == 13)
            getImage(this.value);
    });
});

function getImage(hash) {
	var sendInfo = { 'hash': hash };
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
			$('#custom-search-input').removeClass('d-none');
			$('#search-image').val('');
			$('#wait-response').addClass('d-none');
			alert(xhr.responseJSON.message)
		},
		success: function(result)
		{
			if(result.image) {
				$('#btn-download').attr('href', result.image);
				$('#btn-download').attr('download', result.imageName);
				$('#medical-image').attr('src', result.image);
				$('#message-success').removeClass('d-none');
				$('#message-success-text').text(result.message);
				$('#custom-search-image').removeClass('d-none');
			} else {
				$('#custom-search-input').removeClass('d-none');
				$('#search-image').val('');
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
		url: $form.attr('action'),
		type: $form.attr('method'),
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

/* END UPLOAD */