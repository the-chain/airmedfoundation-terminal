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

var searchValidator = $('#form-explorer-search').validate({
	rules: {
		data: {
			required: true,
			maxlength: 924,
		}
	},
	errorPlacement: function(error,element) {
		return true;
	},
	highlight: function(element) {
		$(element).addClass('box-error');
	},
	unhighlight: function(element) {
		$(element).removeClass('box-error');
	}
});

$('#explorer-search-btn').click(function() {
	if ($('#form-explorer-search').valid())
		$('#form-explorer-search').submit();
	else
		searchValidator.focusInvalid();
});

var detailBlockTxTable = $('#block-txs-table').DataTable({
	'dom':  '<"row"<"col-sm-12 info-margin"i>>' +
         	'<"row"<"col-sm-12"tr>>',
	'language': 
    {
        'sInfo':  'A total of _TOTAL_ transactions found',
    },
    'pagingType': 'full_numbers',
	'bLengthChange': false,
	'bPaginate': false,
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
				return '<a href="../../address/'+ data +'">'+ address +'</a>';
			}
		}
	]
});

var detailTxsTable = $('#txs-table').DataTable({
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
				return '<a href="../../address/'+ data +'">'+ address +'</a>';
			}
		}
	]
});

var detailAddressTable = $('#address-table').DataTable({
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
				return '<a href="../transaction/'+ data +'">'+ address +'</a>';
			}
		},
		{
			'targets': [3, 5],
			render: function (data, type, row) {
				let address = data.substr(0, 20) + '…';
				return '<a href="../address/'+ data +'">'+ address +'</a>';
			}
		}
	]
});

var detailBlocksTable = $('#blocks-table').DataTable({
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
			'targets': 0,
			render: function (data, type, row) {
				return '<a href="block/'+ data +'">'+ data +'</a>';
			}
		},
		{
			'targets': 1,
			render: function (data, type, row) {
				let hash = data.substr(0, 20) + '…';
				return '<a href="block/' + row[0] +'">'+ hash +'</a>';
			}
		}
	]
});

$('.spinner').addClass('d-none');

$('#tx-chart-container').removeClass('d-none');

$('#address-table-container').removeClass('d-none');
detailAddressTable.responsive.recalc();

$('#block-txs-table-container').removeClass('d-none');
detailBlockTxTable.responsive.recalc();

$('#blocks-table-container').removeClass('d-none');
detailBlocksTable.responsive.recalc();

$('#txs-table-container').removeClass('d-none');
detailTxsTable.responsive.recalc();