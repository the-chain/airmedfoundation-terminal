/* INIT GENERAL */

$('.js-tooltip').tooltip();

var hashSentTable = $('#hash-sent-table').DataTable({
	'dom':  '<"row"<"col-sm-12 info-margin"i>>' +
         	'<"row"<"col-sm-12"tr>>' +
			 '<"row"<"col-sm-12 pagination-margin"p>>',
	'pagingType': 'full_numbers',
	'bLengthChange': false,
	'bSort': false,
	'columnDefs': [
		{
			'targets': [0, 1],
			render: function (data, type, row) {
				return data.length > 40 ?
				data.substr(0, 40) +'…' :
				data;
			}
		},
		{
			'targets': 2,
			'data': null,
			'defaultContent': "<button type='button' class='btn btn-primary btn-block viewed-sent'><i class='fa fa-eye' aria-hidden='true'></i></button>"
		}
	]
});

var hashReceivedTable = $('#hash-received-table').DataTable({
    'dom':  '<"row"<"col-sm-12 info-margin"i>>' +
         	'<"row"<"col-sm-12"tr>>' +
			 '<"row"<"col-sm-12 pagination-margin"p>>',
	'pagingType': 'full_numbers',
	'bLengthChange': false,
	'bSort': false,
	'columnDefs': [
		{
			'targets': [0, 1],
			render: function (data, type, row) {
				return data.length > 40 ?
				data.substr(0, 40) +'…' :
				data;
			}
		},
		{
			'targets': 2,
			'data': null,
			'defaultContent': "<button type='button' class='btn btn-primary btn-block viewed-received'><i class='fa fa-eye' aria-hidden='true'></i></button>"
		}
	]
});

$(document.body).on('click', '.viewed-received', function () {
	var from, hash;
	hashReceivedTable.$('tr.selected').removeClass('selected');
	if (!$(this).closest('tr').hasClass('child')) $(this).closest('tr').addClass('selected');
	else $(this).closest('tr').prev().addClass('selected');
	from = hashReceivedTable.row('.selected').data()[0];
	hash = hashReceivedTable.row('.selected').data()[1];
	$('#from').text(from)
	$('#hash-received').text(hash);
	$('#modal-viewed-received').modal('show');
});

$(document.body).on('click', '.viewed-sent', function () {
	var to, hash;
	hashSentTable.$('tr.selected').removeClass('selected');
	if (!$(this).closest('tr').hasClass('child')) $(this).closest('tr').addClass('selected');
	else $(this).closest('tr').prev().addClass('selected');
	to = hashSentTable.row('.selected').data()[0];
	hash = hashSentTable.row('.selected').data()[1];
	$('#to').text(to)
	$('#hash-sent').text(hash);
	$('#modal-viewed-sent').modal('show');
});


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
			minlength: 46,
			maxlength: 128
		},
		encrypted: {
			required: true
		},
		secretKey: {
			required: true,
			minlength: 920,
			maxlength: 924,
		}
	},
	errorPlacement: function(error,element) {
		return true;
	},
	highlight: function(element) {
		if ($(element).attr('type') == 'radio')
			$(element).parent().prev('h6').addClass('tag-error');
		else
			$(element).prev('h6').addClass('tag-error');
	},
	unhighlight: function(element) {
		if ($(element).attr('type') == 'radio')
			$(element).parent().prev('h6').removeClass('tag-error');
		else
			$(element).prev('h6').removeClass('tag-error');
	}
});

$('#btn-find-image').click(function() {
	if ($('#form-download').valid())
		getImage();
	else
		downloadValidator.focusInvalid();
});

function clearDownloadData() {
	$('#ipfs-hash').val('');
	$('#secret-key').val('');
	$('input:radio').prop('checked', false);
}

function getImage() {
	var sendInfo, encrypted;
	
	encrypted = ($('input[name=encrypted]:checked').val() === 'true');
	
	sendInfo = {
		'ipfsHash': $('#ipfs-hash').val(),
		'encrypted': encrypted
	};
	
	if (encrypted) sendInfo.secretKey = $('#secret-key').val();
	
	$('#wait-response').removeClass('d-none');
	$('#custom-search-input').addClass('d-none');
	
	$.ajax({
		type: 'GET',
		url: '/medical-file',
		dataType: 'json',
		data: sendInfo,
		error: function (xhr, ajaxOptions, thrownError)
		{
			clearDownloadData();
			$('#secret-key-text-box').addClass('d-none');
			$('#custom-search-input').removeClass('d-none');
			$('#wait-response').addClass('d-none');
			$('#message-error-text').html(xhr.responseJSON.message);
			$('#message-error').removeClass('d-none');
			$('#message-error').show();
		},
		success: function(result) {
			if(result.success) {
				clearDownloadData();
				$('#secret-key-text-box').addClass('d-none');
				$('#btn-download').attr('href', result.image);
				$('#btn-download').attr('download', result.imageName);
				if (result.imageType.match('image.*')) {
					var img = new Image();
					img.src = result.image;
					img.onload = function() { $('#medical-image').attr('src', img.src).fadeIn('slow'); }
				}
				if (!result.encrypted) {
					$('#message-info-text').html(result.ipfsMessage + '<a href="' + result.ipfsUrl + '" target="_blank">' + result.ipfsUrl + '</a>');
					$('#message-info').removeClass('d-none');
					$('#message-info').show();
				}
				$('#message-success-text').text(result.message);
				$('#message-success').removeClass('d-none');
				$('#custom-search-image').removeClass('d-none');
				$('#wait-response').addClass('d-none');
				$('#message-success').show();
			}
		}
	});
}

$('#btn-download').click(function() {
	$('#custom-search-image').addClass('d-none');
	$('#message-success').hide();
	$('#custom-search-input').removeClass('d-none');
});

$(function() {
    $('input[name="encrypted"]').on('click', function() {
        if ($(this).val() == 'true')
            $('#secret-key-text-box').removeClass('d-none');
        else
            $('#secret-key-text-box').addClass('d-none');
    });
});
/* END DOWNLOAD */

/* INIT UPLOAD */
var uploadValidator = $('#form-upload').validate({
	ignore: ':hidden:not(input[type="file"])',
	rules: {
		imageFile: {
			required: true
		},
		encrypt: {
			required: true
		},
		senderPrivateKey: {
			required: true,
			minlength: 300,
			maxlength: 924
		},
		receiverPublicKey: {
			required: true,
			minlength: 300,
			maxlength: 300
		}
	},
	errorPlacement: function(error,element) {
		return true;
	},
	highlight: function(element) {
		switch ($(element).attr('type')) {
			case 'radio':
				$(element).parent().prev('h6').addClass('tag-error');
				break;
			case 'file':
				$(element).parent().parent().prev('h6').addClass('tag-error');
				$(element).parent().parent().addClass('box-error');
				break;
			default:
				$(element).prev('h6').addClass('tag-error');
				break;
		}	
	},
	unhighlight: function(element) {
		switch ($(element).attr('type')) {
			case 'radio':
				$(element).parent().prev('h6').removeClass('tag-error');
				break;
			case 'file':
				$(element).parent().parent().prev('h6').removeClass('tag-error');
				$(element).parent().parent().removeClass('box-error');
				break;
			default:
				$(element).prev('h6').removeClass('tag-error');
				break;
		}
	}
});

var isAdvancedUpload = function() {
	var div = document.createElement('div');
	return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

var $dropZone = $('.upload-drop-zone');
var $form = $('.box-form');
var $image = $('#image-preview');

showFiles = function(file) {
	$('#file-name').text(file.name);
	$('#file-name').removeClass('d-none');
	if (file.type.match('image.*')) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$image.attr('src', e.target.result).fadeIn('slow');
		}
		reader.readAsDataURL(file);
	}
	else {
		if($('#file-name').hasClass('sr-trans'))
			$image.attr('src', '../../images/general/file.png');
		else if($('#file-name').hasClass('sr-pres'))
			$image.attr('src', '../../../images/general/file.png');
		else
			$image.attr('src', './images/general/file.png');
	}
};

if (isAdvancedUpload) {
	$dropZone.addClass('has-advanced-upload');
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
		if(e.originalEvent.dataTransfer.files[0].size < 8000000){
			$('input[type=file]')[0].files = e.originalEvent.dataTransfer.files;
			showFiles($('input[type=file]')[0].files[0]);
			$('#ipfsFile').removeClass('tag-error');
			$('.upload-drop-zone').removeClass('box-error');
		}
		else {
			$('#message-error-text').text('File is too big (max size 15MB). Please, try again with other file.');
			$('#message-error').removeClass('d-none');
			$('#message-error').show();
			this.value = '';
		}
	});
}

$('#btn-upload').click(function() {
	if ($('#form-upload').valid())
		postImage();
	else
		uploadValidator.focusInvalid();
});

function clearUploadData() {
	$image.attr('src', 'images/general/upload.png');
	$('#file-name').text('');
	$('#sender-private-key').val('');
	$('#receiver-public-key').val('');
	$('#file-hidden').val('');
	$('input:radio').prop('checked', false);
}

function postImage() {
	if ($dropZone.hasClass('is-uploading')) return false;
	  
	$('#custom-upload-input').addClass('d-none');
	$('#wait-response').removeClass('d-none');
	
	$dropZone.addClass('is-uploading').removeClass('is-error');

	var formData, encrypt;
	
	formData = new FormData();
	encrypt = ($('input[name=encrypt]:checked').val() === 'true');
	
	formData.append('encrypt', encrypt);
	if (encrypt) {
		formData.append('senderPrivateKey', $('#sender-private-key').val());
		formData.append('receiverPublicKey', $('#receiver-public-key').val());
	}
	formData.append('imageName', $('input[type=file]')[0].files[0].name);
	formData.append('imageFile', $('input[type=file]')[0].files[0]);
	
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
		error: function (xhr, ajaxOptions, thrownError){
			clearUploadData();
			$('#custom-upload-input').removeClass('d-none');
			$('#wait-response').addClass('d-none');
			$('#message-error-text').html(xhr.responseJSON.message);
			$('#message-error').removeClass('d-none');
			$('#message-error').show();
		},
		success: function(result) {
			if (result.success){
				clearUploadData();
				$('#wait-response').addClass('d-none');
				if (result.encrypted) {
					$('#ipfs-label').html('Encrypted IPFS hash');
					$('#message-info-text').html('<strong>' + result.transactionMessage + '</strong>' +  result.transactionHash);
				} else {
					$('#ipfs-label').html('IPFS hash');
					$('#message-info-text').html(result.ipfsMessage + '<a href="' + result.ipfsUrl + '" target="_blank">' + result.ipfsUrl + '</a>');
				}
				$('#image-hash').text(result.hash);
				$('#ipfs-btn').attr('data-copy', result.hash);
				$('#message-success-text').html(result.message);
				$('#image-hash-box').removeClass('d-none');
				$('#message-success').removeClass('d-none');
				$('#message-info').removeClass('d-none');
				$('#message-success').show();
				$('#message-info').show();
			}
		}
	});
}

$('#file-preview').click(function() {
    $('#file-hidden').trigger('click');
});

$('#file-hidden').change(function() {
	var files = this.files[0];
	if (files != undefined && files != null) {
		if(files.size < 15000000){
			showFiles(files);
			$('#ipfsFile').removeClass('tag-error');
			$('.upload-drop-zone').removeClass('box-error');
		}
		else {
			$('#message-error-text').text('File is too big (max size 15MB). Please, try again with other file.');
			$('#message-error').removeClass('d-none');
			$('#message-error').show();
			this.value = '';
		}
	}
	else {
		if($('#file-name').hasClass('sr-trans'))
			$image.attr('src', '../../images/general/upload.png');
		else
			$image.attr('src', './images/general/upload.png');
		$('#message-error-text').text('No file chosen');
		$('#file-name').text('');
		$('#file-name').addClass('d-none');
		$('#message-error').removeClass('d-none');
		$('#message-error').show();
		this.value = '';
	}
});

$(function() {
    $('input[name="encrypt"]').on('click', function() {
        if ($(this).val() == 'true')
            $('#keys-text-box').removeClass('d-none');
        else
            $('#keys-text-box').addClass('d-none');
    });
});
/* END UPLOAD */

/* INIT FILES */
var filesValidator = $('#form-get-files').validate({
	rules: {
		key: {
			required: true,
			minlength: 300,
			maxlength: 924
		}
	},
	errorPlacement: function(error,element) {
		return true;
	},
	highlight: function(element) {
		$(element).prev('h6').addClass('tag-error');
	},
	unhighlight: function(element) {
		$(element).prev('h6').removeClass('tag-error');
	}
});

$('#btn-find-files').click(function() {
	if ($('#form-get-files').valid())
		getFiles();
	else
		filesValidator.focusInvalid();
});

function getFiles() {
	var sendInfo = {
		'key': $('#key').val()
	};

	$('#custom-files-search-input').addClass('d-none');
	$('#wait-response').removeClass('d-none');

	$.ajax({
		type: 'GET',
		url: '/get-files',
		data: sendInfo,
		dataType: 'json',
		error: function (xhr, ajaxOptions, thrownError)
		{
			$('#message-error-text').html(xhr.responseJSON.message);
			$('#message-error').removeClass('d-none');
			$('#message-error').show();
			$('#key').val('');
			$('#custom-files-search-input').removeClass('d-none');
			$('#wait-response').addClass('d-none');
		},
		success: function(result) {
			if (result.success){
				var userSender = result.userSender;
				if (Object.keys(userSender).length > 0) {
					userSender['hashSent'].forEach(function (item) {
						hashSentTable.row.add({ 
							'0': item['to'],
                            '1': item['hash'],
                        }).draw().node();
					});
					
					userSender['hashReceived'].forEach(function (item) {
						hashReceivedTable.row.add({ 
							'0': item['from'],
                            '1': item['hash'],
                        }).draw().node();
					});
				}
				$('#wait-response').addClass('d-none');
				$('#hash-tables').removeClass('d-none');
				hashSentTable.responsive.recalc();
				hashReceivedTable.responsive.recalc();
			}
		}
	});
}
/* END FILES */

/* INIT IDENTITY */
$('#btn-new-keys').click(function() {
	$('#custom-new-identity').addClass('d-none');
	$('#wait-response').removeClass('d-none');
	$.ajax({
		type: 'GET',
		url: '/new-identity',
		error: function (xhr, ajaxOptions, thrownError)
		{
			$('#message-error-text').html(xhr.responseJSON.message);
			$('#message-error').removeClass('d-none');
			$('#message-error').show();
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
				$('#message-success').show();
			}
		}
	});
});
/* END IDENTITY */

/* INIT RECOVERY */
var recoveryValidator = $('#form-recovery-key').validate({
	rules: {
		privateKey: {
			required: true,
			minlength: 920,
			maxlength: 924
		}
	},
	errorPlacement: function(error,element) {
		return true;
	},
	highlight: function(element) {
		$(element).prev('h6').addClass('tag-error');
	},
	unhighlight: function(element) {
		$(element).prev('h6').removeClass('tag-error');
	}
});

$('#btn-recovery-key').click(function() {
	if ($('#form-recovery-key').valid())
		recoveryKey();
	else
		recoveryValidator.focusInvalid();
});

function recoveryKey() {
	var sendInfo = {
		'privateKey': $('#private-key').val()
	};

	$('#custom-recovery-key-input').addClass('d-none');
	$('#wait-response').removeClass('d-none');

	$.ajax({
		type: 'POST',
		url: '/recovery-key',
		data: sendInfo,
		dataType: 'json',
		error: function (xhr, ajaxOptions, thrownError)
		{
			$('#message-error-text').html(xhr.responseJSON.message);
			$('#message-error').removeClass('d-none');
			$('#message-error').show();
			$('#private-key').val('');
			$('#custom-recovery-key-input').removeClass('d-none');
			$('#wait-response').addClass('d-none');
		},
		success: function(result) {
			if (result.success) {
				$('#message-success-text').text(result.message);
				$('#public-key').text(result.publicKey);
				$('#wait-response').addClass('d-none');
				$('#identity-public-key').removeClass('d-none');
				$('#message-success').removeClass('d-none');
				$('#message-success').show();
			}
		}
	});
}
/* END RECOVERY */