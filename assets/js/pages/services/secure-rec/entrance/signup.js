/* INIT DECLARATION OF FORMS */

var srPrimaryForm, srSecundaryForm, srProviderForm, srInsuranceForm, srDoctorForm, srPatientForm;

function highlightErrors(element) {
	if ($(element).attr('type') == 'radio')
		$(element).parent().parent().parent().parent().prev('label').addClass('tag-error');
	else
		$(element).prev('label').addClass('tag-error');
}

function unhighlightErrors(element) {
	if ($(element).attr('type') == 'radio')
		$(element).parent().parent().parent().parent().prev('label').removeClass('tag-error');
	else
		$(element).prev('label').removeClass('tag-error');
}

srPrimaryForm = $('#sr-primary-form').validate({
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
		highlightErrors(element);
	},
	unhighlight: function(element) {
		unhighlightErrors(element);
	}
});

srSecundaryForm = $('#sr-secundary-form').validate({
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
		highlightErrors(element);
	},
	unhighlight: function(element) {
		unhighlightErrors(element);
	}
});

srProviderForm = $('#sr-provider-form').validate({
	rules: {
		legalName: {
			required: true,
			maxlength: 100
		},
		website: {
            maxlength: 100
		},
		EIN: {
			maxlength: 10
		},
		providerType: {
			required: true
        }
	},
	errorPlacement: function(error,element) {
		return true;
	},
	highlight: function(element) {
		highlightErrors(element);
	},
	unhighlight: function(element) {
		unhighlightErrors(element);
	}
});

srInsuranceForm = $('#sr-insurance-form').validate({
	rules: {
		legalName: {
			required: true,
			maxlength: 120
		},
		website: {
            maxlength: 120
		},
		EIN: {
			maxlength: 10
		}
	},
	errorPlacement: function(error,element) {
		return true;
	},
	highlight: function(element) {
		highlightErrors(element);
	},
	unhighlight: function(element) {
		unhighlightErrors(element);
	}
});

srDoctorForm = $('#sr-doctor-form').validate({
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
			maxlength: 11
		}
	},
	errorPlacement: function(error,element) {
		return true;
	},
	highlight: function(element) {
		highlightErrors(element);
	},
	unhighlight: function(element) {
		unhighlightErrors(element);
	}
});

srPatientForm = $('#sr-patient-form').validate({
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
		socialSecurityNumber: {
			maxlength: 11
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

/* END DECLARATION OF FORMS */


/* INIT CONDITIONS FUNCTIONS */

$('.birthdate').datepicker({
	format: 'yyyy-mm-dd',
    endDate: '-18y'
});

jQuery.validator.addMethod('passwordCheck',
	function(value, element, param) {
		let condition = true;
		if (!/[A-Z]/.test(value)) condition = false;
		else $('#upp-condition').addClass('tag-check');
		
        if (!/[a-z]/.test(value)) condition = false;
        else $('#low-condition').addClass('tag-check');
		
		if (!/[0-9]/.test(value)) condition = false;
		else $('#number-condition').addClass('tag-check');

		if (!/[!@#$/%^&*?.]/.test(value)) condition = false;
		else $('#special-condition').addClass('tag-check');

		if (value.length < 8) condition = false;
		else $('#length-condition').addClass('tag-check');

		if(condition) $('#password-conditions').collapse('hide');

		return condition;
	}, 
	'error'
);

function removePasswordConditionsCheck() {
	$('#upp-condition').removeClass('tag-check');
	$('#low-condition').removeClass('tag-check');
	$('#number-condition').removeClass('tag-check');
	$('#length-condition').removeClass('tag-check');
	$('#special-condition').removeClass('tag-check');
}

$(document.body).on('focus', '#password', function () {
	$('#password-conditions').collapse('show');
});

$(document.body).on('keyup', '#password', function(){
	removePasswordConditionsCheck();
	if($('#sr-primary-form').validate() != undefined)
		$('#sr-primary-form').validate().element(':input[name="password"]');
	else
		$('#sr-change-password-form').validate().element(':input[name="password"]');
});

/* END PASSWORD CONDITIONS FUNCTIONS */

/* INIT PROFILE PICTURE FUNCTIONS */

$('#profile-img-d').click(function(){
    $('#profile-img-hidden-doctor').trigger('click');
});

$('#profile-img-p').click(function(){
    $('#profile-img-hidden-patient').trigger('click');
});

$('.profile-img-hidden').change(function(){
    readURL(this);
});

function readURL(input) {
    if (input.files && input.files[0]) {
		var reader = new FileReader();
        reader.onload = function (e) {
			if($(input).attr('id') == 'profile-img-hidden-patient')
				$('#profile-img-preview-patient').attr('src', e.target.result).fadeIn('slow');
			else
				$('#profile-img-preview-doctor').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
    }
}

/* INIT PROFILE PICTURE FUNCTIONS */


/* INIT SIGNUP FUNCTIONS */

$(document.body).on('click', '.hidden-element', function () {
	$('.hidden-element').each(function(i, obj) {
		if (!$(this).find('input').is(':checked'))
			$(this).removeClass('hidden-element-active');
	});
	$(this).addClass('hidden-element-active');
});

function clearSecureRecData() {
	$('.hidden-element').removeClass('hidden-element-active');
	$('#previous').addClass('d-none');
	$('#next').html('Next');	
	removePasswordConditionsCheck();
	$('#sr-primary-form').trigger('reset');
	$('#state').val('');
	$('#phone').val('+1 ');
	$('#address').val('');
	$('#sr-provider-form').trigger('reset');
	$('#sr-insurance-form').trigger('reset');
	$('#sr-doctor-form').trigger('reset');
	$('#sr-patient-form').trigger('reset');
}

$(document.body).on('click', '#next', function () {
	let step = $('#step').text();
	let userType = $('input[name=userType]:checked', '#sr-primary-form').val();
	switch (step) {
		case '1':
			if ($('#sr-primary-form').valid()) {
				$('#step').text('2');
				$('#sr-primary-form').addClass('d-none');
				$('#sr-secundary-form').removeClass('d-none');
				$('#previous').removeClass('d-none');
				$('html, body').animate({ scrollTop: 0 }, 'slow');
			} else {
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                srPrimaryForm.focusInvalid();
            }
			break;

		case '2':
			if ($('#sr-secundary-form').valid()) {
				$('#step').text('3');
				$('#sr-secundary-form').addClass('d-none');
				$('#next').html('Sign up');
				switch (userType) {
					case 'provider':
						$('#sr-provider-form').removeClass('d-none');
						break;
				
					case 'insurance':
						$('#sr-insurance-form').removeClass('d-none');
						break;

					case 'doctor':
						$('#sr-doctor-form').removeClass('d-none');
						break;
					
					case 'patient':
						$('#sr-patient-form').removeClass('d-none');
						break;
				}
				$('html, body').animate({ scrollTop: 0 }, 'slow');
			} else {
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                srSecundaryForm.focusInvalid();
            }
			break;
		case '3':
			var formData;
			formData = new FormData();
			formData.append('emailAddress', $('#email').val());
			formData.append('password', $('#password').val());
			formData.append('type', userType);
			formData.append('country', $('#country').val());
			formData.append('state', $('#state').val());
			formData.append('phone', $('#phone').val());
			formData.append('address', $('#address').val());
			
			switch (userType) {
				case 'provider':
					if ($('#sr-provider-form').valid()) {
						formData.append('name', $('#legal-name-provider').val());
                        formData.append('website', $('#website-provider').val());
                        formData.append('ein', $('#EIN-provider').val());
						formData.append('providerType', $('input[name=providerType]:checked', '#sr-provider-form').val());
						$('#sr-provider-form').addClass('d-none');
					} else {
                        $('html, body').animate({ scrollTop: 0 }, 'slow');
						srProviderForm.focusInvalid();
						return;
					}
					break;
			
				case 'insurance':
					if ($('#sr-insurance-form').valid()) {
						formData.append('name', $('#legal-name-insurance').val());
                        formData.append('website', $('#website-insurance').val());
                        formData.append('ein', $('#EIN-insurance').val());
						$('#sr-insurance-form').addClass('d-none');
					} else {
                        $('html, body').animate({ scrollTop: 0 }, 'slow');
						srInsuranceForm.focusInvalid();
						return;
					}
					break;

				case 'doctor':
					if ($('#sr-doctor-form').valid()) {
						formData.append('name', $('#first-name-doctor').val());
						formData.append('lastName', $('#last-name-doctor').val());
						formData.append('birthdate', $('#birthdate-doctor').val());
						formData.append('specialty', $('#specialty').val());
						formData.append('socialSecurityNumber', $('#social-security-number-doctor').val());
						if ($('#profile-img-hidden-doctor')[0].files[0]){
							formData.append('profileImageType', $('#profile-img-hidden-doctor')[0].files[0].type);
							formData.append('profileImageData', $('#profile-img-hidden-doctor')[0].files[0]);
						}
						$('#sr-doctor-form').addClass('d-none');
					} else {
						$('html, body').animate({ scrollTop: 0 }, 'slow');
						srDoctorForm.focusInvalid();
						return;
					}	
					break;
				
				case 'patient':
					if ($('#sr-patient-form').valid()) {
						formData.append('name', $('#first-name-patient').val());
						formData.append('lastName', $('#last-name-patient').val());
						formData.append('birthdate', $('#birthdate-patient').val());
						formData.append('socialSecurityNumber', $('#social-security-number-patient').val());
						formData.append('bloodType', $('#blood-type').val());
						formData.append('allergies', $('#allergies').val().split(','));
						formData.append('donor', ($('input[name=organDonor]:checked', '#sr-patient-form').val() === 'true'));
						if ($('#profile-img-hidden-patient')[0].files[0]){
							formData.append('profileImageType', $('#profile-img-hidden-patient')[0].files[0].type);
							formData.append('profileImageData', $('#profile-img-hidden-patient')[0].files[0]);
						}
						$('#sr-patient-form').addClass('d-none');
					} else {
						$('html, body').animate({ scrollTop: 0 }, 'slow');
						srPatientForm.focusInvalid();
						return;
					}
					break;
			}
			
			$('#wait-response').removeClass('d-none');
			$('#signup-sr').addClass('d-none');
			
			$.ajax({
				type: 'POST',
				url: '/services/secure-rec/user/new',
				data: formData,
				dataType: 'json',
				cache: false,
				contentType: false,
				processData: false,
				error: function (xhr, ajaxOptions, thrownError) {
					console.log(xhr.responseJSON);
					clearSecureRecData();
					$('#step').text('1');
					$('#signup-sr').removeClass('d-none');
					$('#sr-primary-form').removeClass('d-none');
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
						$('#sr-secret-btn').attr('data-copy', result.secretKey);
						$('#sr-secret-key').text(result.secretKey);
						$('#sr-public-btn').attr('data-copy', result.publicKey);
						$('#sr-public-key').text(result.publicKey);
						$('#wait-response').addClass('d-none');
						$('#signup-sr-response').removeClass('d-none');
						$('#message-success').removeClass('d-none');
						$('#message-success').show();
					}
				}
			});
			break;
	}
});

$(document.body).on('click', '#previous', function () {
	let step = $('#step').text();
	let userType = $('input[name=userType]:checked', '#sr-primary-form').val();
	switch (step) {
		case '2':
			$('#step').text('1');
			$('#sr-secundary-form').addClass('d-none');
			$('#sr-primary-form').removeClass('d-none');
			$('#previous').addClass('d-none');
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			break;
	
		case '3':
			$('#step').text('2');
			switch (userType) {
				case 'provider':
					$('#sr-provider-form').addClass('d-none');
					break;
			
				case 'insurance':
					$('#sr-insurance-form').addClass('d-none');
					break;

				case 'doctor':
					$('#sr-doctor-form').addClass('d-none');
					break;
				
				case 'patient':
					$('#sr-patient-form').addClass('d-none');
					break;
			}
			$('#sr-secundary-form').removeClass('d-none');
			$('#next').html('Next');
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			break;
	}
});

/* END SIGNUP FUNCTIONS */