$(document.body).on('click', '#block-more', function () {
	let up, down;
	up = $('#up');
	down = $('#down');
	if($('#block-more').attr('aria-expanded') === 'false') {
		down.addClass('d-none');
		up.removeClass('d-none');
	}
	else{
		up.addClass('d-none');
		down.removeClass('d-none');
	}
});

var detailTable = $('#block-txs-table').DataTable({
	'dom':  '<"row"<"col-sm-12 info-margin"i>>' +
         	'<"row"<"col-sm-12"tr>>' +
         	'<"row"<"col-sm-12 pagination-margin"p>>',
	'language': 
    {
        'sInfo':  'A total of _TOTAL_ transactions found',
    },
    'pagingType': 'full_numbers',
    'bLengthChange': false,
	'bSort': false,
	'columnDefs': [
		{
			'targets': [0],
			render: function (data, type, row) {
				let address = data.substr(0, 20) + '…';
				return '<a href="../../transaction/'+ data +'">'+ address +'</a>';
			}
		},
		{
			'targets': [3, 5],
			render: function (data, type, row) {
				let address = data.substr(0, 20) + '…';
				return '<a href="address/'+ data +'">'+ address +'</a>';
			}
		}
	]
});

$('.spinner').addClass('d-none');
$('#block-txs-table-container').removeClass('d-none');
detailTable.responsive.recalc();