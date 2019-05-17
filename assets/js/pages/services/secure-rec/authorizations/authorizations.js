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
		newAuthorization($('#autorize-provider').val(), 'provider');
	else
		srAutorizeProviderForm.focusInvalid();
});

$('#sr-insurances-auto-btn').click(function() {
	if ($('#sr-autorize-insurance-form').valid())
		newAuthorization($('#autorize-insurance').val(), 'insurance');
	else
		srAutorizeInsuranceForm.focusInvalid();
});

$('#sr-doctors-auto-btn').click(function() {
	if ($('#sr-autorize-doctor-form').valid())
		newAuthorization($('#autorize-doctor').val(), 'doctor');
	else
		srAutorizeDoctorForm.focusInvalid();
});

$('#sr-patients-auto-btn').click(function() {
	if ($('#sr-autorize-patient-form').valid())
		newAuthorization($('#autorize-patient').val(), 'patient');
	else
		srAutorizePatientForm.focusInvalid();
});

function newAuthorization(email, userType) {
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
				switch (userType) {
					case 'provider':
						let einp = result.user.provider['EIN'] === '' ? '00-0000000' : result.user.provider['EIN'];
						srProviders.row.add({ 
							'0': result.user['emailAddress'],
							'1': result.user.provider['name'],
							'2': einp,
							'3': result.user.provider['type']
						}).draw().node();
						break;
					case 'insurance':
						let eini = result.user.insurance['EIN'] === '' ? '00-0000000' : result.insurance['EIN'];
						srInsurances.row.add({ 
							'0': result.user['emailAddress'],
							'1': result.user.insurance['name'],
							'2': eini,
						}).draw().node();
						break;
					case 'doctor':
						let ssnd = result.user.doctor[0]['socialSecurityNumber'] === '' ? '000-00-0000' : result.user.doctor[0]['socialSecurityNumber'];
						srDoctors.row.add({ 
							'0': result.user['emailAddress'],
							'1': (result.user.doctor[0]['name'] + ' ' + result.user.doctor[0]['lastName']),
							'2': ssnd,
						}).draw().node();
						break;
					case 'patient':
						let ssnp = result.user.patient[0]['socialSecurityNumber'] === '' ? '000-00-0000' : result.user.patient[0]['socialSecurityNumber'];
						srPatients.row.add({ 
							'0': result.user['emailAddress'],
							'1': (result.user.patient[0]['name'] + ' ' + result.user.patient[0]['lastName']),
							'2': ssnp,
						}).draw().node();
						break;
				}
				$('#sr-autorize-'+userType+'-modal').modal('hide');
				$('#message-success-text').text(result.message);
				$('#message-success').removeClass('d-none');
				$('#message-success').show();
			}
		}
	});
}