/* INIT DECLARATION OF FORMS */
jQuery.validator.addMethod('passwordCheck',
	function(value, element, param) {
		let condition = true;
		if (!/[A-Z]/.test(value)) {
			condition = false;
		} else $('#uppCond').addClass('tag-check');
		
		if (!/[a-z]/.test(value)) {
			condition = false;
		} else $('#lowCond').addClass('tag-check');
		
		if (!/[0-9]/.test(value)) {
			condition = false;
		} else $('#numCond').addClass('tag-check');

		if (!/[!@#$/%^&*?.]/.test(value)) {
			condition = false;
		} else $('#speCond').addClass('tag-check');

		if (value.length <= 8) {
			condition = false;
		} else $('#lenCond').addClass('tag-check');

		if(condition) $('#password-conditions').collapse('hide');

		return condition;
	}, 
	'error'
);

var secureRecPrimaryInfo = $('#form-secure-rec-primary').validate({
	rules: {
		email: {
			required: true,
			maxlength: 200
		},
		password: {
            required: true,
            minlength: 8,
		},
		passwordRepeat: {
			required: true,
            equalTo : '#password',
            minlength: 8
        },
        userType: {
            required: true
        }
	},
	errorPlacement: function(error, element) {
		return true;
	},
	highlight: function(element) {
		if ($(element).attr('type') == 'radio')
			$(element).parent().parent().parent().parent().prev('label').addClass('tag-error');
		else
			$(element).prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		if ($(element).attr('type') == 'radio')
			$(element).parent().parent().parent().parent().prev('label').removeClass('tag-error');
		else
			$(element).prev('label').removeClass('tag-error');
	}
});

var secureRecSecundaryInfo = $('#form-secure-rec-secundary').validate({
	rules: {
		country: {
			required: true
		},
		state: {
            required: true,
            maxlength: 200
		},
		phone: {
			required: true,
			minlength: 12
        },
        address: {
			required: true,
			minlength: 20,
			maxlength: 250,
        }
	},
	errorPlacement: function(error,element) {
		return true;
	},
	highlight: function(element) {
		$(element).prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		$(element).prev('label').removeClass('tag-error');
	}
});

var secureRecProviderInfo = $('#form-secure-rec-provider').validate({
	rules: {
		legalName: {
			required: true,
			maxlength: 100
		},
		website: {
            maxlength: 100
		},
		providerType: {
			required: true
        }
	},
	errorPlacement: function(error,element) {
		return true;
	},
	highlight: function(element) {
		if ($(element).attr('type') == 'radio')
			$(element).parent().parent().parent().parent().prev('label').addClass('tag-error');
		else
			$(element).prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		if ($(element).attr('type') == 'radio')
			$(element).parent().parent().parent().parent().prev('label').removeClass('tag-error');
		else
			$(element).prev('label').removeClass('tag-error');
	}
});

var secureRecInsuranceInfo = $('#form-secure-rec-insurance').validate({
	rules: {
		legalName: {
			required: true,
			maxlength: 120
		},
		website: {
            maxlength: 120
		}
	},
	errorPlacement: function(error,element) {
		return true;
	},
	highlight: function(element) {
		$(element).prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		$(element).prev('label').removeClass('tag-error');
	}
});

var secureRecDoctorInfo = $('#form-secure-rec-doctor').validate({
	rules: {
		firstName: {
			required: true,
			maxlength: 120
		},
		lastName: {
			required: true,
			maxlength: 120
		},
		specialty: {
			required: true,
			maxlength: 120
		},
		socialSecurityNumber: {
			required: true,
			maxlength: 11
		}
	},
	errorPlacement: function(error,element) {
		return true;
	},
	highlight: function(element) {
		$(element).prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		$(element).prev('label').removeClass('tag-error');
	}
});

var secureRecPatientInfo = $('#form-secure-rec-patient').validate({
	rules: {
		firstName: {
			required: true,
			maxlength: 120
		},
		lastName: {
			required: true,
			maxlength: 120
		},
		bloodType: {
			required: true,
			maxlength: 20
		},
		allergies: {
			required: true,
			maxlength: 350
		},
		organDonor: {
			required: true
		}
	},
	errorPlacement: function(error,element) {
		return true;
	},
	highlight: function(element) {
		if ($(element).attr('type') == 'radio')
			$(element).parent().prev('label').addClass('tag-error');
		else
			$(element).prev('label').addClass('tag-error');
	},
	unhighlight: function(element) {
		if ($(element).attr('type') == 'radio')
			$(element).parent().prev('label').removeClass('tag-error');
		else
			$(element).prev('label').removeClass('tag-error');
	}
});

var secureRecLoginInfo = $('#form-secure-rec-login').validate({
	rules: {
		email: {
			required: true,
			maxlength: 200
		},
		password: {
            required: true,
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
			'targets': [3, 4, 5, 6],
			'visible': false,
            'searchable': false
		},
		{
			'targets': 7,
			'data': null,
			'defaultContent': "<button type='button' class='btn btn-primary btn-block sr-viewed-sent'><i class='fa fa-eye' aria-hidden='true'></i></button>"
		},
		{
			'targets': 8,
			'data': null,
			'defaultContent': "<button type='button' class='btn btn-primary btn-block sr-edit-sent'><i class='far fa-edit' aria-hidden='true'></i></button>"
		},
		{
			'targets': 9,
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
	doctors = srHashSent.row('.selected').data()[3];
	insurances = srHashSent.row('.selected').data()[4];
	providers = srHashSent.row('.selected').data()[5];
	patient = srHashSent.row('.selected').data()[6];
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
	hash = srHashSent.row('.selected').data()[1];
	console.log(hash);
});

$(document.body).on('click', '.sr-download-received', function () {
	var hash;
	srHashReceived.$('tr.selected').removeClass('selected');
	if (!$(this).closest('tr').hasClass("child")) $(this).closest('tr').addClass('selected');
	else $(this).closest('tr').prev().addClass('selected');
	hash = srHashReceived.row('.selected').data()[1];
	console.log(hash);
});
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

function clearSecureRecData() {
	$('.hidden-element').removeClass('hidden-element-active');
	$('#previus').addClass('d-none');
	$('#next').html('Next');
	$('#uppCond').removeClass('tag-check');
	$('#lowCond').removeClass('tag-check');
	$('#numCond').removeClass('tag-check');
	$('#lenCond').removeClass('tag-check');
	$('#speCond').removeClass('tag-check');
	$('#form-secure-rec-primary').trigger('reset');
	$('#state').val('');
	$('#phone').val('+1 ');
	$('#address').val('');
	$('#form-secure-rec-provider').trigger('reset');
	$('#form-secure-rec-insurance').trigger('reset');
	$('#form-secure-rec-doctor').trigger('reset');
	$('#form-secure-rec-patient').trigger('reset');
}

$(document.body).on('click', '.hidden-element', function () {
	$('.hidden-element').each(function(i, obj) {
		if (!$(this).find('input').is(':checked'))
			$(this).removeClass('hidden-element-active');
	});
	$(this).addClass('hidden-element-active');
});

$(document.body).on('focus', '#password', function () {
	$('#password-conditions').collapse('show');
});

$(document.body).on('keyup', '#password', function(){
	$('#uppCond').removeClass('tag-check');
	$('#lowCond').removeClass('tag-check');
	$('#numCond').removeClass('tag-check');
	$('#lenCond').removeClass('tag-check');
	$('#speCond').removeClass('tag-check');
	if($('#form-secure-rec-primary').validate() != undefined)
		$('#form-secure-rec-primary').validate().element(':input[name="password"]');
	else
		$('#form-secure-rec-change-pass').validate().element(':input[name="password"]');
});

$(document.body).on('click', '#next', function () {
	let step = $('#step').text();
	let userType = $('input[name=userType]:checked', '#form-secure-rec-primary').val();
	switch (step) {
		case '1':
			if ($('#form-secure-rec-primary').valid()) {
				$('#step').text('2');
				$('#form-secure-rec-primary').addClass('d-none');
				$('#form-secure-rec-secundary').removeClass('d-none');
				$('#previus').removeClass('d-none');
				$('html, body').animate({ scrollTop: 0 }, 'slow');
			} else
				secureRecPrimaryInfo.focusInvalid();
			break;

		case '2':
			if ($('#form-secure-rec-secundary').valid()) {
				$('#step').text('3');
				$('#form-secure-rec-secundary').addClass('d-none');
				$('#next').html('Sign up');
				switch (userType) {
					case 'provider':
						$('#form-secure-rec-provider').removeClass('d-none');
						break;
				
					case 'insurance':
						$('#form-secure-rec-insurance').removeClass('d-none');
						break;

					case 'doctor':
						$('#form-secure-rec-doctor').removeClass('d-none');
						break;
					
					case 'patient':
						$('#form-secure-rec-patient').removeClass('d-none');
						break;
				}
				$('html, body').animate({ scrollTop: 0 }, 'slow');
			} else
				secureRecSecundaryInfo.focusInvalid();
			break;
		case '3':
			let sendInfo = {
				'emailAddress': $('#email').val(),
				'password': $('#password').val(),
				'type': userType,
				'country': $('#countries_phone').val(),
				'state': $('#state').val(),
				'phone': $('#phone').val(),
				'address': $('#address').val()
			};
			
			switch (userType) {
				case 'provider':
					if ($('#form-secure-rec-provider').valid()) {
						sendInfo.name = $('#legalNameProvider').val();
						sendInfo.website = $('#websiteProvider').val();
						sendInfo.providerType = $('input[name=providerType]:checked', '#form-secure-rec-provider').val();
						$('#form-secure-rec-provider').addClass('d-none');
					} else {
						secureRecProviderInfo.focusInvalid();
						return;
					}
					break;
			
				case 'insurance':
					if ($('#form-secure-rec-insurance').valid()) {
						sendInfo.name = $('#legalNameInsurance').val();
						sendInfo.website = $('#websiteInsurance').val();
						$('#form-secure-rec-insurance').addClass('d-none');
					} else {
						secureRecInsuranceInfo.focusInvalid();
						return;
					}
					break;

				case 'doctor':
					if ($('#form-secure-rec-doctor').valid()) {
						sendInfo.name = $('#firstNameDoctor').val();
						sendInfo.lastName = $('#lastNameDoctor').val();
						sendInfo.specialty = $('#specialty').val();
						sendInfo.socialSecurityNumber = $('#socialSecurityNumber').val();
						$('#form-secure-rec-doctor').addClass('d-none');
					} else {
						secureRecDoctorInfo.focusInvalid();
						return;
					}	
					break;
				
				case 'patient':
					if ($('#form-secure-rec-patient').valid()) {
						sendInfo.name = $('#firstNamePatient').val();
						sendInfo.lastName = $('#lastNamePatient').val();
						sendInfo.bloodType = $('#bloodType').val();
						sendInfo.allergies = $('#allergies').val().split(',');
						sendInfo.donor = ($('input[name=organDonor]:checked', '#form-secure-rec-patient').val() === 'true');
						$('#form-secure-rec-patient').addClass('d-none');
					} else {
						secureRecPatientInfo.focusInvalid();
						return;
					}
					break;
			}
			
			$('#wait-response').removeClass('d-none');
			$('#signup-secure-rec').addClass('d-none');
			
			$.ajax({
				type: 'POST',
				url: '/services/secure-rec/user/new',
				data: sendInfo,
				dataType: 'json',
				error: function (xhr, ajaxOptions, thrownError) {
					clearSecureRecData();
					$('#step').text('1');
					$('#signup-secure-rec').removeClass('d-none');
					$('#form-secure-rec-primary').removeClass('d-none');
					$('#wait-response').addClass('d-none');
					$('#message-error-text').html(xhr.responseJSON.message);
					$('#message-error').removeClass('d-none');
					$('#message-error').show();
					$('html, body').animate({ scrollTop: 0 }, 'slow');
				},
				success: function(result) {
					if(result.success) {
						clearSecureRecData();
						$('#message-success-text').text(result.message);
						$('#secure-rec-secret-btn').attr('data-copy', result.secretKey);
						$('#secure-rec-secret-key').text(result.secretKey);
						$('#secure-rec-public-btn').attr('data-copy', result.publicKey);
						$('#secure-rec-public-key').text(result.publicKey);
						$('#wait-response').addClass('d-none');
						$('#signup-secure-rec-response').removeClass('d-none');
						$('#message-success').removeClass('d-none');
						$('#message-success').show();
					}
				}
			});
			break;
	}
});

$(document.body).on('click', '#previus', function () {
	let step = $('#step').text();
	let userType = $('input[name=userType]:checked', '#form-secure-rec-primary').val();
	switch (step) {
		case '2':
			$('#step').text('1');
			$('#form-secure-rec-secundary').addClass('d-none');
			$('#form-secure-rec-primary').removeClass('d-none');
			$('#previus').addClass('d-none');
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			break;
	
		case '3':
			$('#step').text('2');
			switch (userType) {
				case 'provider':
					$('#form-secure-rec-provider').addClass('d-none');
					break;
			
				case 'insurance':
					$('#form-secure-rec-insurance').addClass('d-none');
					break;

				case 'doctor':
					$('#form-secure-rec-doctor').addClass('d-none');
					break;
				
				case 'patient':
					$('#form-secure-rec-patient').addClass('d-none');
					break;
			}
			$('#form-secure-rec-secundary').removeClass('d-none');
			$('#next').html('Next');
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			break;
	}
});

$('#secure-rec-login-btn').click(function() {
	if ($('#form-secure-rec-login').valid()){
		let sendInfo = {
			'emailAddress': $('#email-login').val(),
			'password': $('#password-login').val(),
		};

		$('#wait-response').removeClass('d-none');
		$('#login-secure-rec').addClass('d-none');

		$.ajax({
			type: 'POST',
			url: '/services/secure-rec/session/new',
			data: sendInfo,
			dataType: 'json',
			error: function (xhr, ajaxOptions, thrownError) {
				$('#form-secure-rec-login').trigger('reset');
				$('#login-secure-rec').removeClass('d-none');
				$('#wait-response').addClass('d-none');
				$('#message-error-text').html(xhr.responseJSON.message);
				$('#message-error').removeClass('d-none');
				$('#message-error').show();
			},
			success: function(result) {
				if(result.success)
					window.location.replace('/services/secure-rec/dashboard');
			}
		});
	} else
		secureRecLoginInfo.focusInvalid();
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
	$('#providers').val('');
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
				$('#wait-response').addClass('d-none');
				$('#div-secure-rec-upload').removeClass('d-none'); //Check
				$('#message-error-text').html(xhr.responseJSON.message);
				$('#message-error').removeClass('d-none');
				$('#message-error').show();
			},
			success: function(result) {
				if (result.success){
					clearUploadData();
					$('#wait-response').addClass('d-none');
					$('#form-secure-rec-upload').trigger('reset'); //Check
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