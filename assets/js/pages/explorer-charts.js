var randomScalingFactor = function(){ return Math.round(Math.random()*1000)};

hljs.initHighlightingOnLoad();

window.onload = function () {
    if (document.getElementById('tx-chart')) {
        $.ajax({
            type: 'GET',
            url: '/explorer/charts',
            dataType: 'json',
            error: function (xhr, ajaxOptions, thrownError){
            },
            success: function(result) {
                var ctx = document.getElementById('tx-chart').getContext('2d');
                var txChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels : result.labels,
                        datasets : [
                            {
                                label: 'Transactions',
                                backgroundColor: 'rgba(48, 165, 255, 0.0)',
                                borderColor: 'rgba(48, 165, 255, 0.6)',
                                pointColor: 'rgba(48, 165, 255, 1.0)',
                                pointStrokeColor : '#fff',
                                pointHighlightFill : '#fff',
                                pointHighlightStroke : 'rgba(48, 165, 255, 1.0)',
                                data : result.dataTx
                            }
                        ]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                    stepSize: 1,
                                }
                            }]
                        },
                        legend: {
                            display: false
                        },
                        tooltips: {
                            enabled: true
                        }
                    }
                });
                var cblocks = document.getElementById('block-chart').getContext('2d');
                var blockChart = new Chart(cblocks, {
                    type: 'line',
                    data: {
                        labels : result.labels,
                        datasets : [
                            {
                                label: 'Block',
                                backgroundColor: 'rgba(48, 165, 255, 0.0)',
                                borderColor: 'rgba(48, 165, 255, 0.6)',
                                pointColor: 'rgba(48, 165, 255, 1.0)',
                                pointStrokeColor : '#fff',
                                pointHighlightFill : '#fff',
                                pointHighlightStroke : 'rgba(48, 165, 255, 1.0)',
                                data : result.dataBlocks
                            }
                        ]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    min: 0,
                                    stepSize: 1,
                                }
                            }]
                        },
                        legend: {
                            display: false
                        },
                        tooltips: {
                            enabled: true
                        }
                    }
                });
            }
        });
    }
};

$(document.body).on('click', '#block-chart-pill', function () {
    $('#block-chart-container').removeClass('d-none');
    $('#tx-chart-container').addClass('d-none');
    $('#tx-chart-pill').removeClass('active');
    $('#block-chart-pill').addClass('active');
});

$(document.body).on('click', '#tx-chart-pill', function () {
    $('#tx-chart-container').removeClass('d-none');
    $('#block-chart-container').addClass('d-none');
    $('#block-chart-pill').removeClass('active');
    $('#tx-chart-pill').addClass('active');
});