var srAutorizeProviderForm = $('#sr-autorize-provider-form').validate({
	rules: {
		provider: {
			required: true
		},
	},
	errorPlacement: function(error, element) {
		return true;
	},
	highlight: function(element) {
		$(element).parent().prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		$(element).parent().prev('label').removeClass('tag-error');
	}
});

var srAutorizeInsuranceForm = $('#sr-autorize-insurance-form').validate({
	rules: {
		insurance: {
			required: true
		},
	},
	errorPlacement: function(error, element) {
		return true;
	},
	highlight: function(element) {
		$(element).parent().prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		$(element).parent().prev('label').removeClass('tag-error');
	}
});

var srAutorizeDoctorForm = $('#sr-autorize-doctor-form').validate({
	rules: {
		doctor: {
			required: true
		},
	},
	errorPlacement: function(error, element) {
		return true;
	},
	highlight: function(element) {
		$(element).parent().prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		$(element).parent().prev('label').removeClass('tag-error');
	}
});

var srAutorizePatientForm = $('#sr-autorize-patient-form').validate({
	rules: {
		patient: {
			required: true
		},
	},
	errorPlacement: function(error, element) {
		return true;
	},
	highlight: function(element) {
		$(element).parent().prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		$(element).parent().prev('label').removeClass('tag-error');
	}
});


var srProviders = $('#sr-providers').DataTable({
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
			'defaultContent': "<button type='button' class='btn btn-danger btn-block sr-authorizations-delete'><i class='fas fa-trash-alt' aria-hidden='true'></i></button>"
		}
	]
});

var srInsurances = $('#sr-insurances').DataTable({
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
			'defaultContent': "<button type='button' class='btn btn-danger btn-block sr-authorizations-delete'><i class='fas fa-trash-alt' aria-hidden='true'></i></button>"
		}
	]
});

var srDoctors = $('#sr-doctors').DataTable({
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
			'defaultContent': "<button type='button' class='btn btn-danger btn-block sr-authorizations-delete'><i class='fas fa-trash-alt' aria-hidden='true'></i></button>"
		}
	]
});

var srPatients = $('#sr-patients').DataTable({
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
			'defaultContent': "<button type='button' class='btn btn-danger btn-block sr-authorizations-delete'><i class='fas fa-trash-alt' aria-hidden='true'></i></button>"
		}
	]
});


$('#sr-providers-auto-btn').click(function() {
	if ($('#sr-autorize-provider-form').valid())
		newAuthorization($('#autorize-provider').val());
	else
		srAutorizeProviderForm.focusInvalid();
});

$('#sr-insurances-auto-btn').click(function() {
	if ($('#sr-autorize-insurance-form').valid())
		newAuthorization($('#autorize-insurance').val());
	else
		srAutorizeInsuranceForm.focusInvalid();
});

$('#sr-doctors-auto-btn').click(function() {
	if ($('#sr-autorize-doctor-form').valid())
		newAuthorization($('#autorize-doctor').val());
	else
		srAutorizeDoctorForm.focusInvalid();
});

$('#sr-patients-auto-btn').click(function() {
	if ($('#sr-autorize-patient-form').valid())
		newAuthorization($('#autorize-patient').val());
	else
		srAutorizePatientForm.focusInvalid();
});

function newAuthorization(email) {
	let sendInfo = {
		'authorizationEmail': email
	};

	$.ajax({
		type: 'POST',
		url: '/services/secure-rec/authorizations/new',
		data: sendInfo,
		dataType: 'json',
		error: function (xhr, ajaxOptions, thrownError) {
			$('#message-error-text').html(xhr.responseJSON.message);
			$('#message-error').removeClass('d-none');
			$('#message-error').show();
		},
		success: function(result) {
			if(result.success) {
				// Insertar en tabla
				// Cambiar por generico $('#sr-autorize-patient-modal').modal('hide');
				$('#message-success-text').text(result.message);
				$('#message-success').removeClass('d-none');
				$('#message-success').show();
			}
		}
	});
}