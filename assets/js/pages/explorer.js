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
				if(data !== 'N/A'){
					let address = data.substr(0, 20) + '…';
					return '<a href="../../address/'+ data +'">'+ address +'</a>';
				}
				return data;
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
				return '<a href="transaction/'+ data +'">'+ address +'</a>';
			}
		},
		{
			'targets': [3, 5],
			render: function (data, type, row) {
				if (data == 'N/A')
					return '<span>'+ data +'</span>';
				let address = data.substr(0, 20) + '…';
				return '<a href="address/'+ data +'">'+ address +'</a>';
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


io.socket.on('entry', function(notification) {
	switch (notification.verb) {
	  case 'created':
		renderData(notification.data);
		break;
	}
});

function animateRotate(element, d){
    $({deg: 0}).animate({deg: d}, {
        step: function(now, fx){
            element.css({
                 transform: 'rotate(' + now + 'deg)'
            });
        }
    });
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function renderData(data) {
	if (data.block) {
		let newBlock, list, nelemets;
		list = $('#block-ul');
		animateRotate($('#block-tag'), 360);
		newBlock = $('<li class="list-group-item align-items-center"><div class="row h-100"><div class="col-3 my-auto text-center block"><p class="explorer-p"><a href="explorer/block/' + (data.block.id - 1) + '">Block ' + (data.block.id - 1) + '</a></p></div><div class="col-9 my-auto block-info"><p class="p-word-break">Hash <a href="explorer/block/' + (data.block.id - 1) + '">' + (data.block.hash.substr(0, 22)) + '…</a></p><p class="explorer-p"><a class="tx-btn" href="explorer/block/' + (data.block.id - 1) + '/transactions">' + data.block.ntransactions + ' transactions</a> in this block</p></div></div></li>');
		nelemets = list.children().length;
		if (nelemets == 10) $('#block-ul li:last-child').remove();
		list.prepend(newBlock);
		$('#last-block-n').text(data.block.id - 1);
		$('#last-block-h').removeClass('font-weight-bold');
		$('#last-block-h').attr('href', 'explorer/block/' + (data.block.id - 1));
		$('#last-block-h').text((data.block.hash.substr(0, 17) + '…'));
		await sleep(1000);
	}

	if (data.transactions) {
		let newTransaction, list, fromTo, ntransactions;
		list = $('#transaction-ul');
		data.transactions.forEach(transaction => {
			animateRotate($('#tx-tag'), 360);
			if (transaction.imputsArgs.length > 0 && transaction.imputsArgs[0] == 'sendHash')
				fromTo = '<p class="explorer-p">From <a href="explorer/address/' + transaction.imputsArgs[1] + '">' + transaction.imputsArgs[1].substr(0, 22) + '… </a> To <a href="explorer/address/' + transaction.imputsArgs[2] + '">' + transaction.imputsArgs[2].substr(0, 22) + '…</a></p>' + '<p class="explorer-p">Message <span>' + transaction.imputsArgs[3].substr(0, 22) + '…</span></p>';
			else
				fromTo = '<p class="explorer-p">From <span class="font-weight-bold">N/A</span> To <span class="font-weight-bold">N/A</span></p><p class="explorer-p">Message <span class="font-weight-bold">N/A</span></p>'
			newTransaction = $('<li class="list-group-item align-items-center"><div class="row h-100"><div class="col-2 my-auto text-center rounded-circle block"><p class="explorer-p">Tx</p></div><div class="col-10 my-auto"><p class="explorer-p">TX# <a href="/explorer/transaction/' + (transaction.id) + '">' + (transaction.id.substr(0, 28)) + '…</a></p>' + fromTo + '</div></div></li>');
			nelemets = list.children().length;
			if (nelemets == 10) $('#transaction-ul li:last-child').remove();
			list.prepend(newTransaction);
		});
		ntransactions = data.transactions.length;
		$('#last-tx-n').text(parseInt($('#last-tx-n').text()) + ntransactions);
		$('#last-tx-h').removeClass('font-weight-bold');
		$('#last-tx-h').attr('href', 'explorer/transaction/' + (data.transactions[ntransactions - 1].id));
		$('#last-tx-h').text((data.transactions[ntransactions - 1].id.substr(0, 17) + '…'));
	}
}