var srLoginForm = $('#sr-login-form').validate({
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

$('#sr-login-btn').click(function() {
	if ($('#sr-login-form').valid()){
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
				$('#sr-login-form').trigger('reset');
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
        srLoginForm.focusInvalid();
});