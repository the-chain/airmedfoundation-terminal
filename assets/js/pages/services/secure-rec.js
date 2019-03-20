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

// jQuery.validator.addMethod('ssnCheck',
// 	function(value, element, param) {
// 		var patt = new RegExp("\d{3}[\-]\d{2}[\-]\d{4}");
// 		var x = document.getElementById("ssn");
// 		var res = patt.test(x.value);
// 		if(!res){
// 		x.value = x.value
// 			.match(/\d*/g).join('')
// 			.match(/(\d{0,3})(\d{0,2})(\d{0,4})/).slice(1).join('-')
// 			.replace(/-*$/g, '');
// 		}
// 		return false;
// 	}, 
// 	'error'
// );
		
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
			maxLength: 120
		},
		website: {
            maxlength: 120
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
			maxLength: 120
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
			maxLength: 120
		},
		lastName: {
			required: true,
			maxLength: 120
		},
		specialty: {
			required: true,
			maxLength: 120
		},
		socialSecurityNumber: { //Check
			required: true,
			maxLength: 120
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
			maxLength: 120
		},
		lastName: {
			required: true,
			maxLength: 120
		},
		bloodType: {
			required: true,
			maxLength: 20
		},
		allergies: {
			required: true,
			maxLength: 350
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

$(document.body).on('focus', '#password', function () {
	$('#password-conditions').collapse('show');
});

$(document.body).on('keyup', '#password', function(){
	$('#uppCond').removeClass('tag-check');
	$('#lowCond').removeClass('tag-check');
	$('#numCond').removeClass('tag-check');
	$('#lenCond').removeClass('tag-check');
	$('#speCond').removeClass('tag-check');
	$("#form-secure-rec-primary").validate().element(':input[name="password"]');
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
				'address': $('#address').val(),
			};
	
			switch (userType) {
				case 'provider':
					if ($('#form-secure-rec-provider').valid()) {
						sendInfo.name = $('#legalNameProvider').val();
						sendInfo.website = $('#websiteProvider').val();
						sendInfo.providerType = $('input[name=providerType]:checked', '#form-secure-rec-provider').val();
					} else
						secureRecProviderInfo.focusInvalid();
					break;
			
				case 'insurance':
					if ($('#form-secure-rec-insurance').valid()) {
						sendInfo.name = $('#legalNameInsurance').val();
						sendInfo.website = $('#websiteInsurance').val();
					} else
						secureRecInsuranceInfo.focusInvalid();
					break;

				case 'doctor':
					if ($('#form-secure-rec-doctor').valid()) {
						sendInfo.name = $('#firstNameDoctor').val();
						sendInfo.lastName = $('#lastNameDoctor').val();
						sendInfo.specialty = $('#specialty').val();
						sendInfo.socialSecurityNumber = $('#socialSecurityNumber').val();
					} else
						secureRecDoctorInfo.focusInvalid();
					break;
				
				case 'patient':
					if ($('#form-secure-rec-patient').valid()) {
						sendInfo.name = $('#firstNamePatient').val();
						sendInfo.lastName = $('#lastNamePatient').val();
						sendInfo.bloodType = $('#bloodType').val();
						sendInfo.allergies = $('#allergies').val().split(',');
						sendInfo.organDonor = ($('input[name=organDonor]:checked', '#form-secure-rec-patient').val() === 'true');
					} else
						secureRecPatientInfo.focusInvalid();
					break;
			}

			// Send Form
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