/* INIT DECLARATION OF FORMS */

var secureRecRecoverInfo = $('#form-secure-rec-recovery').validate({
	rules: {
		email: {
			required: true,
			maxlength: 200
		}
	},
	errorPlacement: function(error, element) {
		return true;
	},
	highlight: function(element) {
		$(element).prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		$(element).prev('label').removeClass('tag-error');
	}
});

var secureRecChangePassword = $('#form-secure-rec-change-pass').validate({
	rules: {
		oldpassword: {
            required: true,
            minlength: 8,
		},
		password: {
            required: true,
            minlength: 8,
		},
		passwordRepeat: {
			required: true,
            equalTo : '#password',
            minlength: 8
        }
	},
	errorPlacement: function(error, element) {
		return true;
	},
	highlight: function(element) {
		$(element).prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		$(element).prev('label').removeClass('tag-error');
	}
});

var secureRecTransaction = $('#form-secure-rec-upload').validate({
	ignore: ':hidden:not(input[type="file"])',
	rules: {
		medicalFile: {
			required: true
		},
		'providers[]': {
			required: true,
            minlength: 1
		},
		selfPayment: {
			required: true
		},
		'companies[]': {
			required: true,
            minlength: 1
		},
		'doctors[]': {
			required: true,
            minlength: 1
		},
		patients: {
			required: true
		},
		fileDescription: {
			required: true,
			minlength: 15,
			maxlength: 250,
		},
		notes: {
			required: true,
			minlength: 15,
			maxlength: 250,
		},
	},
	errorPlacement: function(error, element) {
		return true;
	},
	highlight: function(element) {
		let inputType = $(element).attr('type');
		if (inputType != undefined) {
			switch (inputType) {
				case 'radio':
					$(element).parent().prev('label').addClass('tag-error');
					break;
				case 'file':
					$(element).parent().parent().prev('label').addClass('tag-error');
					$(element).parent().parent().addClass('box-error');
					break;
				default:
					$(element).prev('label').addClass('tag-error');
					break;
			}
		} else if ($(element).hasClass('selectpicker')) {
			$(element).parent().prev('label').addClass('tag-error');
		} else
			$(element).prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		let inputType = $(element).attr('type');
		if (inputType != undefined) {
			switch (inputType) {
				case 'radio':
					$(element).parent().prev('label').removeClass('tag-error');
					break;
				case 'file':
					$(element).parent().parent().prev('label').removeClass('tag-error');
					$(element).parent().parent().removeClass('box-error');
					break;
				default:
					$(element).prev('label').removeClass('tag-error');
					break;
			}
		} else if ($(element).hasClass('selectpicker')) {
			$(element).parent().prev('label').removeClass('tag-error');
		} else
			$(element).prev('label').removeClass('tag-error');
	}
});

var secureRecEditNote = $('#form-secure-rec-edit-note').validate({
	rules: {
		notes: {
			required: true,
			minlength: 15,
			maxlength: 250,
		},
	},
	errorPlacement: function(error, element) {
		return true;
	},
	highlight: function(element) {
		$(element).prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		$(element).prev('label').removeClass('tag-error');
	}
});

var secureRecNewPrescription = $('#form-secure-rec-new-prescription').validate({
	ignore: ':hidden:not(input[type="file"])',
	rules: {
		patients: {
			required: true
		},
		description: {
			required: true,
			minlength: 25,
			maxlength: 250,
		}
	},
	errorPlacement: function(error, element) {
		return true;
	},
	highlight: function(element) {
		if ($(element).hasClass('selectpicker'))
			$(element).parent().prev('label').addClass('tag-error');
		else
			$(element).prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		if ($(element).hasClass('selectpicker'))
			$(element).parent().prev('label').removeClass('tag-error');
		else
			$(element).prev('label').removeClass('tag-error');
	}
});

var secureRecEditPrescription = $('#sr-edit-prescription-form').validate({
	rules: {
		hash: {
			required: true
		},
		pharmacy: {
			required: true
		},
		selfPayment: {
			required: true
		},
		company: {
			required: true
		},
	},
	errorPlacement: function(error, element) {
		return true;
	},
	highlight: function(element) {
		let inputType = $(element).attr('type');
		if (inputType !== undefined && inputType === 'radio')
			$(element).parent().prev('label').addClass('tag-error');
		else if ($(element).hasClass('selectpicker'))
			$(element).parent().prev('label').addClass('tag-error');
		else
			$(element).prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		let inputType = $(element).attr('type');
		if (inputType !== undefined && inputType === 'radio')
			$(element).parent().prev('label').removeClass('tag-error');
		else if ($(element).hasClass('selectpicker'))
			$(element).parent().prev('label').removeClass('tag-error');
		else
			$(element).prev('label').removeClass('tag-error');
	}
});
/* END DECLARATION OF FORMS */

/* INIT DECLARATION OF TABLES */
var srHashSent = $('#sr-hash-sent').DataTable({
	'dom':  '<"row"<"col-sm-12 info-margin"i>>' +
         	'<"row"<"col-sm-12"tr>>' +
			 '<"row"<"col-sm-12 pagination-margin"p>>',
	'pagingType': 'full_numbers',
	'bLengthChange': false,
	'bSort': false,
	'columnDefs': [
		{
			'targets': [0, 1, 2],
			render: function (data, type, row) {
				return data.length > 40 ?
				data.substr(0, 40) +'…' :
				data;
			}
		},
		{
			'targets': [3, 4, 5, 6, 7],
			'visible': false,
            'searchable': false
		},
		{
			'targets': 8,
			'data': null,
			'defaultContent': "<button type='button' class='btn btn-primary btn-block sr-viewed-sent'><i class='fa fa-eye' aria-hidden='true'></i></button>"
		},
		{
			'targets': 9,
			'data': null,
			'defaultContent': "<button type='button' class='btn btn-primary btn-block sr-edit-sent'><i class='far fa-edit' aria-hidden='true'></i></button>"
		},
		{
			'targets': 10,
			'data': null,
			'defaultContent': "<button type='button' class='btn btn-primary btn-block sr-download-sent'><i class='fas fa-download' aria-hidden='true'></i></button>"
		}
	]
});

var srHashReceived = $('#sr-hash-received').DataTable({
    'dom':  '<"row"<"col-sm-12 info-margin"i>>' +
         	'<"row"<"col-sm-12"tr>>' +
			 '<"row"<"col-sm-12 pagination-margin"p>>',
	'pagingType': 'full_numbers',
	'bLengthChange': false,
	'bSort': false,
	'columnDefs': [
		{
			'targets': [0, 1, 2, 3],
			render: function (data, type, row) {
				return data.length > 40 ?
				data.substr(0, 40) +'…' :
				data;
			}
		},
		{
			'targets': 4,
			'data': null,
			'defaultContent': "<button type='button' class='btn btn-primary btn-block sr-viewed-received'><i class='fa fa-eye' aria-hidden='true'></i></button>"
		},
		{
			'targets': 5,
			'data': null,
			'defaultContent': "<button type='button' class='btn btn-primary btn-block sr-download-received'><i class='fas fa-download' aria-hidden='true'></i></button>"
		}
	]
});

$(document.body).on('click', '.sr-viewed-sent', function () {
	var to, doctors, insurances, providers, patient, description, note, hash;
	srHashSent.$('tr.selected').removeClass('selected');
	if (!$(this).closest('tr').hasClass('child')) $(this).closest('tr').addClass('selected');
	else $(this).closest('tr').prev().addClass('selected');
	description = srHashSent.row('.selected').data()[0];
	note = srHashSent.row('.selected').data()[1];
	hash = srHashSent.row('.selected').data()[2];
	doctors = srHashSent.row('.selected').data()[4];
	insurances = srHashSent.row('.selected').data()[5];
	providers = srHashSent.row('.selected').data()[6];
	patient = srHashSent.row('.selected').data()[7];
	to = '';
	if (doctors != 'N/A')
		to += '<p class="mb-2 font-weight-bold">Doctors: </p> <span class="ml-3">' + doctors + '</span>'; 
	if (providers != 'N/A')
		to += '<p class="mb-2 mt-4 font-weight-bold">Providers: </p> <span class="ml-3">' + providers + '</span>';
	if (insurances != 'N/A')
		to += '<p class="mb-2 mt-4 font-weight-bold">Insurances: </p> <span class="ml-3">' + insurances + '</span>';
	if (patient != 'N/A')
		to += '<p class="mb-2 mt-4 font-weight-bold">Patient: </p> <span class="ml-3">' + patient + '</span>';
	$('#sr-to').html(to);
	$('#sr-description').text(description);
	$('#sr-note').text(note);
	$('#sr-hash-sent-row').val(hash);
	$('#modal-sr-viewed-sent').modal('show');
});

$(document.body).on('click', '.sr-edit-sent', function () {
	var note, hash;
	srHashSent.$('tr.selected').removeClass('selected');
	if (!$(this).closest('tr').hasClass('child')) $(this).closest('tr').addClass('selected');
	else $(this).closest('tr').prev().addClass('selected');
	note = srHashSent.row('.selected').data()[1];
	hash = srHashSent.row('.selected').data()[2];
	$('#sr-note-edit').val(note);
	$('#sr-hash-sent-row-edit').val(hash);
	$('#modal-sr-edit-sent').modal('show');
});

$(document.body).on('click', '.sr-viewed-received', function () {
	var fromEmail, fromType, description, hash;
	srHashReceived.$('tr.selected').removeClass('selected');
	if (!$(this).closest('tr').hasClass('child')) $(this).closest('tr').addClass('selected');
	else $(this).closest('tr').prev().addClass('selected');
	fromEmail = srHashReceived.row('.selected').data()[0];
	fromType = srHashReceived.row('.selected').data()[1];
	description = srHashReceived.row('.selected').data()[2];
	hash = srHashReceived.row('.selected').data()[3];
	$('#sr-from-email').val(fromEmail);
	$('#sr-from-type').val(fromType);
	$('#sr-received-description').text(description);
	$('#sr-hash-received-row').val(hash);
	$('#modal-sr-viewed-received').modal('show');
});

$(document.body).on('click', '.sr-download-sent', function () {
	var hash;
	srHashSent.$('tr.selected').removeClass('selected');
	if (!$(this).closest('tr').hasClass("child")) $(this).closest('tr').addClass('selected');
	else $(this).closest('tr').prev().addClass('selected');
	hash = srHashSent.row('.selected').data()[2];
	downloadSRFile(hash);
});

$(document.body).on('click', '.sr-download-received', function () {
	var hash;
	srHashReceived.$('tr.selected').removeClass('selected');
	if (!$(this).closest('tr').hasClass("child")) $(this).closest('tr').addClass('selected');
	else $(this).closest('tr').prev().addClass('selected');
	hash = srHashReceived.row('.selected').data()[3];
	downloadSRFile(hash);
});

function downloadSRFile(hash) {
	let sendInfo = {
		'fileHash': hash
	};
	$.ajax({
		type: 'POST',
		url: '/services/secure-rec/download-register',
		data: sendInfo,
		dataType: 'json',
		error: function (xhr, ajaxOptions, thrownError) {
			$('#message-error-text').html(xhr.responseJSON.message);
			$('#message-error').removeClass('d-none');
			$('#message-error').show();
		},
		success: function(result) {
			let link = document.createElement('a');
			document.body.appendChild(link);
			link.download = result.imageName;
			link.href = result.image;
			link.click();
		}
	});
}

/* END DECLARATION OF TABLES */

$('.selectpicker').change(function () {
    $(this).valid();
});

$(function() {
    $('input[name="selfPayment"]').on('click', function() {
        if ($(this).val() == 'true')
            $('#insurance-companies-container').addClass('d-none');
        else
            $('#insurance-companies-container').removeClass('d-none');
    });
});

$('#secure-rec-recovery-btn').click(function() {
	if ($('#form-secure-rec-recovery').valid()){
		let sendInfo = {
			'privateKey': $('#privateKey').val()
		};

		$('#wait-response').removeClass('d-none');
		$('#recovery-secure-rec').addClass('d-none');

		$.ajax({
			type: 'POST',
			url: '/services/secure-rec/password-recovery',
			data: sendInfo,
			dataType: 'json',
			error: function (xhr, ajaxOptions, thrownError) {
				$('#form-secure-rec-recovery').trigger('reset');
				$('#recovery-secure-rec').removeClass('d-none');
				$('#wait-response').addClass('d-none');
				$('#message-error-text').html(xhr.responseJSON.message);
				$('#message-error').removeClass('d-none');
				$('#message-error').show();
			},
			success: function(result) {
				$('#form-secure-rec-recovery').trigger('reset');
				if(result.status == 'info') {
					$('#message-info-text').text(result.message);
					$('#message-info').removeClass('d-none');
					$('#recovery-secure-rec').removeClass('d-none');
					$('#wait-response').addClass('d-none');
					$('#message-info').show();
				}else{
					$('#message-error-text').text(result.message);
					$('#message-error').removeClass('d-none');
					$('#recovery-secure-rec').removeClass('d-none');
					$('#wait-response').addClass('d-none');
					$('#message-error').show();
				}
			}
		});
	} else
		secureRecRecoverInfo.focusInvalid();
});

$('#change-pass-btn').click(function() {
	if ($('#form-secure-rec-change-pass').valid()){
		let sendInfo = {
			'oldPassword': $('#oldPassword').val(),
			'newPassword': $('#password').val(),
		};

		$('#wait-response').removeClass('d-none');
		$('#change-pass-secure-rec').addClass('d-none');

		$.ajax({
			type: 'POST',
			url: '/services/secure-rec/change-password',
			data: sendInfo,
			dataType: 'json',
			error: function (xhr, ajaxOptions, thrownError) {
				$('#form-secure-rec-change-pass').trigger('reset');
				$('#change-pass-secure-rec').removeClass('d-none');
				$('#wait-response').addClass('d-none');
				$('#message-error-text').html(xhr.responseJSON.message);
				$('#message-error').removeClass('d-none');
				$('#message-error').show();
			},
			success: function(result) {
				if(result.success) {
					$('#form-secure-rec-change-pass').trigger('reset');
					$('#message-success-text').text(result.message);
					$('#message-success').removeClass('d-none');
					$('#change-pass-secure-rec').removeClass('d-none');
					$('#wait-response').addClass('d-none');
					$('#message-success').show();
				}
			}
		});
	} else
		secureRecChangePassword.focusInvalid();
});

function clearUploadData() {
	$image.attr('src', '../../images/general/upload.png');
	$('#file-name').text('');
	$('#file-name').addClass('d-none');
	if($('#providers'))
		$('#providers').val('');
}

function resetSelect(selectbox, title) {
	var selectpicker = selectbox;
	selectpicker.selectpicker();
	selectpicker.selectpicker({
		title: title
	}).selectpicker('render');
}

function resetTitles() {
	resetSelect($('#doctors'), 'No doctors selected');
	resetSelect($('#patients'), 'No patient selected');
	resetSelect($('#companies'), 'No insurance companies selected');
	resetSelect($('#providers'), 'No providers selected');
}

$('#sr-upload-btn').click(function() {
	if ($('#form-secure-rec-upload').valid()){
		var sendInfo, selfPayment, users, description, notes;

		sendInfo = new FormData();
		selfPayment = ($('input[name=selfPayment]:checked').val() === 'true');
		users = {
			'patient': 	$('#patients').val(),
			'doctors':  $('#doctors').val(),
			'insurances': $('#companies').val(),
			'providers': $('#providers').val()
		};
		description = $('#file-description').val();
		notes = $('#notes').val();

		sendInfo.append('pay', selfPayment);
		sendInfo.append('users', JSON.stringify(users));
		sendInfo.append('description', description);
		sendInfo.append('notes', notes);
		sendInfo.append('fileName', $('input[type=file]')[0].files[0].name);
		sendInfo.append('file', $('input[type=file]')[0].files[0]);

		$('#wait-response').removeClass('d-none');
		$('#div-secure-rec-upload').addClass('d-none');

		$.ajax({
			type: 'POST',
			url: '/services/secure-rec/upload-register',
			data: sendInfo,
			dataType: 'json',
			cache: false,
			contentType: false,
			processData: false,
			error: function (xhr, ajaxOptions, thrownError)
			{
				clearUploadData();
				$('#wait-response').addClass('d-none');
				$('#form-secure-rec-upload').trigger('reset');
				resetTitles();
				$('#div-secure-rec-upload').removeClass('d-none');
				$('#message-error-text').html(xhr.responseJSON.message);
				$('#message-error').removeClass('d-none');
				$('#message-error').show();
			},
			success: function(result) {
				if (result.success){
					clearUploadData();
					$('#wait-response').addClass('d-none');
					$('#form-secure-rec-upload').trigger('reset');
					resetTitles();
					$('#div-secure-rec-upload').removeClass('d-none');
					$('#message-success-text').html(result.message);
					$('#message-success').removeClass('d-none');
					$('#message-success').show();
				}
			}
		});
	} else
		secureRecTransaction.focusInvalid();
});

$('#edit-note-btn').click(function() {
	if ($('#form-secure-rec-edit-note').valid()){
		let sendInfo = {
			'notesId': srHashSent.row('.selected').data()[3],
			'newNote': $('#sr-note-edit').val(),
		};
		$.ajax({
			type: 'POST',
			url: '/services/secure-rec/edit-notes',
			data: sendInfo,
			dataType: 'json',
			error: function (xhr, ajaxOptions, thrownError) {
				$('#message-error-text').html(xhr.responseJSON.message);
				$('#message-error').removeClass('d-none');
				$('#message-error').show();
			},
			success: function(result) {
				if(result.success) {
					let test = srHashSent.row('.selected').data();
					test[1] = $('#sr-note-edit').val();
					srHashSent.row('.selected').data(test);
					srHashSent.draw();
					$('#modal-sr-edit-sent').modal('hide');
					$('#message-success-text').html(result.message);
					$('#message-success').removeClass('d-none');
					$('#message-success').show();
				}
			}
		});
	} else
		secureRecEditNote.focusInvalid();
});

/* Prescriptions */
$('#sr-new-prescription-btn').click(function() {
	if ($('#form-secure-rec-new-prescription').valid()){
		let sendInfo = new FormData();
		sendInfo.append('user', $('#patients').val());
		sendInfo.append('description', $('#description').val());
		if($('input[type=file]')[0].files.length){
			sendInfo.append('fileName', $('input[type=file]')[0].files[0].name);
			sendInfo.append('file', $('input[type=file]')[0].files[0]);
		}
		$('#wait-response').removeClass('d-none');
		$('#div-secure-rec-upload').addClass('d-none');
		$.ajax({
			type: 'POST',
			url: '/services/secure-rec/prescription/new',
			data: sendInfo,
			dataType: 'json',
			cache: false,
			contentType: false,
			processData: false,
			error: function (xhr, ajaxOptions, thrownError) {
				$image.attr('src', '../../../images/general/upload.png');
				$('#file-name').text('');
				$('#file-name').addClass('d-none');
				$('#wait-response').addClass('d-none');
				$('#form-secure-rec-new-prescription').trigger('reset');
				resetSelect($('#patients'), 'No patient selected');
				$('#div-secure-rec-upload').removeClass('d-none');
				$('#message-error-text').html(xhr.responseJSON.message);
				$('#message-error').removeClass('d-none');
				$('#message-error').show();
			},
			success: function(result) {
				if (result.success){
					$image.attr('src', '../../../images/general/upload.png');
					$('#file-name').text('');
					$('#file-name').addClass('d-none');
					$('#wait-response').addClass('d-none');
					$('#form-secure-rec-new-prescription').trigger('reset');
					resetSelect($('#patients'), 'No patient selected');
					$('#div-secure-rec-upload').removeClass('d-none');
					$('#message-success-text').html(result.message);
					$('#message-success').removeClass('d-none');
					$('#message-success').show();
				}
			}
		});
	} else
		secureRecNewPrescription.focusInvalid();
});

var srNewPrescriptionsDoctors = $('#sr-new-prescriptions-doctors').DataTable({
	'dom':  '<"row"<"col-sm-12 info-margin"i>>' +
         	'<"row"<"col-sm-12"tr>>' +
			 '<"row"<"col-sm-12 pagination-margin"p>>',
	'pagingType': 'full_numbers',
	'bLengthChange': false,
	'bSort': false,
	'columnDefs': [
		{
			'targets': [0, 1, 2],
			render: function (data, type, row) {
				return data.length > 40 ?
				data.substr(0, 40) +'…' :
				data;
			}
		},
		{
			'targets': 3,
			'data': null,
			'defaultContent': "<button type='button' class='btn btn-danger btn-block sr-prescriptions-delete sr-auto-pro-del'><i class='fas fa-trash-alt' aria-hidden='true'></i></button>"
		}
	]
});

var srHistoryPrescriptionsDoctors = $('#sr-history-prescriptions-doctors').DataTable({
	'dom':  '<"row"<"col-sm-12 info-margin"i>>' +
         	'<"row"<"col-sm-12"tr>>' +
			 '<"row"<"col-sm-12 pagination-margin"p>>',
	'pagingType': 'full_numbers',
	'bLengthChange': false,
	'bSort': false,
	'columnDefs': [
		{
			'targets': [0, 1, 2],
			render: function (data, type, row) {
				return data.length > 40 ?
				data.substr(0, 40) +'…' :
				data;
			}
		}
	]
});

var srNewPrescriptionsPatients = $('#sr-new-prescriptions-patients').DataTable({
	'dom':  '<"row"<"col-sm-12 info-margin"i>>' +
         	'<"row"<"col-sm-12"tr>>' +
			 '<"row"<"col-sm-12 pagination-margin"p>>',
	'pagingType': 'full_numbers',
	'bLengthChange': false,
	'bSort': false,
	'columnDefs': [
		{
			'targets': [0, 1, 2, 3, 4],
			render: function (data, type, row) {
				return data.length > 40 ?
				data.substr(0, 40) +'…' :
				data;
			}
		},
		{
			'targets': 5,
			'data': null,
			'defaultContent': "<button type='button' class='btn btn-primary btn-block sr-use-prescription'><i class='fas fa-check' aria-hidden='true'></i></button>"
		}
	]
});

var srHistoryPrescriptionsPatients = $('#sr-history-prescriptions-patients').DataTable({
	'dom':  '<"row"<"col-sm-12 info-margin"i>>' +
         	'<"row"<"col-sm-12"tr>>' +
			 '<"row"<"col-sm-12 pagination-margin"p>>',
	'pagingType': 'full_numbers',
	'bLengthChange': false,
	'bSort': false,
	'columnDefs': [
		{
			'targets': [0, 1, 2, 3, 4],
			render: function (data, type, row) {
				return data.length > 40 ?
				data.substr(0, 40) +'…' :
				data;
			}
		}
	]
});

var srNewPrescriptionsProviders = $('#sr-new-prescriptions-providers').DataTable({
	'dom':  '<"row"<"col-sm-12 info-margin"i>>' +
         	'<"row"<"col-sm-12"tr>>' +
			 '<"row"<"col-sm-12 pagination-margin"p>>',
	'pagingType': 'full_numbers',
	'bLengthChange': false,
	'bSort': false,
	'columnDefs': [
		{
			'targets': [0, 1, 2, 3, 4],
			render: function (data, type, row) {
				return data.length > 40 ?
				data.substr(0, 40) +'…' :
				data;
			}
		},
		{
			'targets': 5,
			'data': null,
			'defaultContent': "<button type='button' class='btn btn-primary btn-block sr-spend-prescription'><i class='fas fa-check' aria-hidden='true'></i></button>"
		}
	]
});

var srHistoryPrescriptionsProviders = $('#sr-history-prescriptions-providers').DataTable({
	'dom':  '<"row"<"col-sm-12 info-margin"i>>' +
         	'<"row"<"col-sm-12"tr>>' +
			 '<"row"<"col-sm-12 pagination-margin"p>>',
	'pagingType': 'full_numbers',
	'bLengthChange': false,
	'bSort': false,
	'columnDefs': [
		{
			'targets': [0, 1, 2, 3, 4],
			render: function (data, type, row) {
				return data.length > 40 ?
				data.substr(0, 40) +'…' :
				data;
			}
		}
	]
});

var srPrescriptionsInsurance = $('#sr-prescriptions-insurance').DataTable({
	'dom':  '<"row"<"col-sm-12 info-margin"i>>' +
         	'<"row"<"col-sm-12"tr>>' +
			 '<"row"<"col-sm-12 pagination-margin"p>>',
	'pagingType': 'full_numbers',
	'bLengthChange': false,
	'bSort': false,
	'columnDefs': [
		{
			'targets': [0, 1, 2, 3, 4],
			render: function (data, type, row) {
				return data.length > 40 ?
				data.substr(0, 40) +'…' :
				data;
			}
		}
	]
});

$(document.body).on('click', '.sr-prescriptions-delete', function () {
	srNewPrescriptionsDoctors.$('tr.selected').removeClass('selected');
	if (!$(this).closest('tr').hasClass('child')) $(this).closest('tr').addClass('selected');
	else $(this).closest('tr').prev().addClass('selected');
	let hash = srNewPrescriptionsDoctors.row('.selected').data()[0];
	$('#sr-prescription-delete-hash').val(hash);
	$('#sr-delete-prescription-modal').modal('show');
});

$('#sr-delete-prescription-btn').click(function() {
	let sendInfo = {
		'hash': $('#sr-prescription-delete-hash').val()
	};

	$.ajax({
		type: 'DELETE',
		url: '/services/secure-rec/prescription/delete',
		data: sendInfo,
		dataType: 'json',
		error: function (xhr, ajaxOptions, thrownError) {
			$('#message-error-text').html(xhr.responseJSON.message);
			$('#message-error').removeClass('d-none');
			$('#message-error').show();
		},
		success: function(result) {
			if(result.success) {
				srNewPrescriptionsDoctors.row('.selected').remove().draw(false);
				$('#sr-delete-prescription-modal').modal('hide');
				$('#message-success-text').text(result.message);
				$('#message-success').removeClass('d-none');
				$('#message-success').show();
			}
		}
	});
});

$(document.body).on('click', '.sr-use-prescription', function () {
	srNewPrescriptionsPatients.$('tr.selected').removeClass('selected');
	if (!$(this).closest('tr').hasClass('child')) $(this).closest('tr').addClass('selected');
	else $(this).closest('tr').prev().addClass('selected');
	let hash = srNewPrescriptionsPatients.row('.selected').data()[0];
	let provider = srNewPrescriptionsPatients.row('.selected').data()[3];
	let insurance = srNewPrescriptionsPatients.row('.selected').data()[4];
	
	if(insurance === ''){
		if(provider !== ''){
			$('input[name="selfPayment"][value="true"]').prop('checked', true);
			let pharmacy = $('#use-pharmacy');
			pharmacy.selectpicker('val', provider);
			pharmacy.selectpicker('refresh');
		}
	}else{
		$('input[name="selfPayment"][value="false"]').prop('checked', true);
		$('#insurance-companies-container').removeClass('d-none');
		let pharmacy = $('#use-pharmacy');
		pharmacy.selectpicker('val', provider);
		pharmacy.selectpicker('refresh');
		let companies = $('#use-companies');
		companies.selectpicker('val', insurance);
		companies.selectpicker('refresh');
	}
	$('#sr-prescription-use-hash').val(hash);
	$('#sr-use-prescription-modal').modal('show');
});

$('#sr-use-prescription-btn').click(function() {
	if ($('#sr-edit-prescription-form').valid()){
		let sendInfo = {
			'hash': $('#sr-prescription-use-hash').val(),
			'pharmacy': $('#use-pharmacy').val(),
			'selfPayment': ($('input[name=selfPayment]:checked').val() === 'true'),
			'insurance': $('#use-companies').val()
		};

		$.ajax({
			type: 'POST',
			url: '/services/secure-rec/prescription/edit-patient',
			data: sendInfo,
			dataType: 'json',
			error: function (xhr, ajaxOptions, thrownError) {
				$('#message-error-text').html(xhr.responseJSON.message);
				$('#message-error').removeClass('d-none');
				$('#message-error').show();
			},
			success: function(result) {
				if(result.success) {
					let test = srNewPrescriptionsPatients.row('.selected').data();
					// AQUI FALTARIA EL NUEVO ESTADO
					test[3] = $('#use-pharmacy').val();
					test[4] = $('#use-companies').val();
					srNewPrescriptionsPatients.row('.selected').data(test);
					srNewPrescriptionsPatients.draw();
					$('#sr-use-prescription-modal').modal('hide');
					$('#message-success-text').text(result.message);
					$('#message-success').removeClass('d-none');
					$('#message-success').show();
				}
			}
		});
	} else
		secureRecEditPrescription.focusInvalid();
});

$(document.body).on('click', '.sr-spend-prescription', function () {
	srNewPrescriptionsProviders.$('tr.selected').removeClass('selected');
	if (!$(this).closest('tr').hasClass('child')) $(this).closest('tr').addClass('selected');
	else $(this).closest('tr').prev().addClass('selected');
	let hash = srNewPrescriptionsProviders.row('.selected').data()[0];
	$('#sr-prescription-confirm-hash').val(hash);
	$('#sr-confirm-prescription-modal').modal('show');
});

$('#sr-confirm-prescription-btn').click(function() {
	let sendInfo = {
		'hash': $('#sr-prescription-confirm-hash').val()
	};

	$.ajax({
		type: 'POST',
		url: '/services/secure-rec/prescription/edit-provider',
		data: sendInfo,
		dataType: 'json',
		error: function (xhr, ajaxOptions, thrownError) {
			$('#message-error-text').html(xhr.responseJSON.message);
			$('#message-error').removeClass('d-none');
			$('#message-error').show();
		},
		success: function(result) {
			if(result.success) {
				let test = srNewPrescriptionsProviders.row('.selected').data();
				srHistoryPrescriptionsProviders.row.add(test).draw().node();
				srNewPrescriptionsProviders.row('.selected').remove().draw(false);
				$('#sr-confirm-prescription-modal').modal('hide');
				$('#message-success-text').text(result.message);
				$('#message-success').removeClass('d-none');
				$('#message-success').show();
			}
		}
	});
});