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
			'defaultContent': "<button type='button' class='btn btn-danger btn-block sr-authorizations-delete sr-auto-pro-del'><i class='fas fa-trash-alt' aria-hidden='true'></i></button>"
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
			'defaultContent': "<button type='button' class='btn btn-danger btn-block sr-authorizations-delete sr-auto-in-del'><i class='fas fa-trash-alt' aria-hidden='true'></i></button>"
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
			'defaultContent': "<button type='button' class='btn btn-danger btn-block sr-authorizations-delete sr-auto-doc-del'><i class='fas fa-trash-alt' aria-hidden='true'></i></button>"
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
			'defaultContent': "<button type='button' class='btn btn-danger btn-block sr-authorizations-delete sr-auto-pat-del'><i class='fas fa-trash-alt' aria-hidden='true'></i></button>"
		}
	]
});

$(document.body).on('click', '.sr-authorizations-delete', function () {
	var email, name, userTypeClass, userTable, userType;
	userTypeClass = $(this)[0].classList[4];
	switch (userTypeClass) {
		case 'sr-auto-pro-del':
			userTable = srProviders;
			userType = 'provider';
			break;
		case 'sr-auto-in-del':
			userTable = srInsurances;
			userType = 'insurance';
			break;
		case 'sr-auto-doc-del':
			userTable = srDoctors;
			userType = 'doctor';
			break;
		case 'sr-auto-pat-del':
			userTable = srPatients;
			userType = 'patient';
			break;
	}
	userTable.$('tr.selected').removeClass('selected');
	if (!$(this).closest('tr').hasClass('child')) $(this).closest('tr').addClass('selected');
	else $(this).closest('tr').prev().addClass('selected');
	email = userTable.row('.selected').data()[0];
	name = userTable.row('.selected').data()[1];
	$('#sr-unauthorize-user-email').val(email);
	$('#sr-unauthorize-user-name').val(name);
	$('#sr-unauthorize-user-type').val(userType);
	$('#sr-unauthorize-modal').modal('show');
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

$('#sr-unauthorize-btn').click(function() {
	let sendInfo = {
		'emailAddress': $('#sr-unauthorize-user-email').val()
	};

	$.ajax({
		type: 'DELETE',
		url: '/services/secure-rec/authorizations/delete',
		data: sendInfo,
		dataType: 'json',
		error: function (xhr, ajaxOptions, thrownError) {
			$('#message-error-text').html(xhr.responseJSON.message);
			$('#message-error').removeClass('d-none');
			$('#message-error').show();
		},
		success: function(result) {
			if(result.success) {
				let email, name, userType;
				email = $('#sr-unauthorize-user-email').val();
				name = $('#sr-unauthorize-user-name').val();
				userType = $('#sr-unauthorize-user-type').val();
				switch (userType) {
					case 'provider':
						srProviders.row('.selected').remove().draw(false);
						break;
					case 'insurance':
						srInsurances.row('.selected').remove().draw(false);
						break;
					case 'doctor':
						srDoctors.row('.selected').remove().draw(false);
						break;
					case 'patient':
						srPatients.row('.selected').remove().draw(false);
						break;
				}
				let groupFilter = $('#autorize-'+userType);
				groupFilter.append('<option value="'+email+'">'+name+' - '+email+'</option>');
				groupFilter.selectpicker('refresh');
				$('#sr-add-'+userType+'s').prop('disabled', false);
				$('#sr-add-'+userType+'s-text').addClass('d-none');
				$('#sr-unauthorize-modal').modal('hide');
				$('#message-success-text').text(result.message);
				$('#message-success').removeClass('d-none');
				$('#message-success').show();
			}
		}
	});
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
						let einp = result.user.provider[0]['EIN'] === '' ? '00-0000000' : result.user.provider[0]['EIN'];
						srProviders.row.add({ 
							'0': result.user['emailAddress'],
							'1': result.user.provider[0]['name'],
							'2': einp,
							'3': result.user.provider[0]['type']
						}).draw().node();
						break;
					case 'insurance':
						let eini = result.user.insurance[0]['EIN'] === '' ? '00-0000000' : result.insurance[0]['EIN'];
						srInsurances.row.add({ 
							'0': result.user['emailAddress'],
							'1': result.user.insurance[0]['name'],
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
				let groupFilter = $('#autorize-'+userType);
				groupFilter.selectpicker('val', '');
				groupFilter.find('option[value="'+email+'"]').remove();
				groupFilter.selectpicker('refresh');
				if ($('#autorize-'+userType+' option').length == 1) {
					$('#sr-add-'+userType+'s').prop('disabled', true);
					$('#sr-add-'+userType+'s-text').removeClass('d-none');
				}
				$('#sr-autorize-'+userType+'-modal').modal('hide');
				$('#message-success-text').text(result.message);
				$('#message-success').removeClass('d-none');
				$('#message-success').show();
			}
		}
	});
}