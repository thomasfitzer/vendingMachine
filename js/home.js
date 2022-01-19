$(document).ready(function() {
    loadItems();

    $('#moneyIn').val(0);

    $('#addDollar').on('click', function(event){
        var amount = parseFloat($('#moneyIn').val());
            amount += 1;
        $('#moneyIn').val(amount.toFixed(2));
    });

    $('#addQuarter').on('click', function(event){
        var amount = parseFloat($('#moneyIn').val());
            amount += 0.25;
        $('#moneyIn').val(amount.toFixed(2));
    });

    $('#addDime').on('click', function(event){
        var amount = parseFloat($('#moneyIn').val());
            amount += 0.10;
        $('#moneyIn').val(amount.toFixed(2));
    });

    $('#addNickel').on('click', function(event){
        var amount = parseFloat($('#moneyIn').val());
            amount += 0.05;
        $('#moneyIn').val(amount.toFixed(2));
    });

    $('#buyButton').on('click', function(event){
        var id = $('#itemIn').val();
        var amount = $('#moneyIn').val();
            $.ajax({
                type: 'POST',
                url: 'http://vending.us-east-1.elasticbeanstalk.com/money/' + amount + '/item/' + id,
                success: function(data, status){
                    var change = '';
                    var quarters = 'Quarters: ' + data.quarters;
                    var dimes = 'Dimes: ' + data.dimes;
                    var nickels = 'Nickels: ' + data.nickels;

                    if(data.quarters > 0)
                        change += quarters;
                    if(data.dimes > 0)
                        change += dimes;
                    if(data.nickels > 0)
                        change += nickels;

                    $('#returnChange').val(change);
                    $('#messageIn').val('Thank you!');
                },
                error: function(data, status) {
                    var message = data.responseJSON.message;
                    $('#messageIn').val(message);
                }
            });
    });
// Create method for this, as it is used in multiple places.
    $('#getMoneyBack').on('click', function(event){
        $('#moneyIn').val(0);
        $('#returnChange').val('');
        $('#messageIn').val('');
        $('#itemIn').val('');
        amount = 0;

        $('#availItems').empty();
        loadItems();
    });
});

    function loadItems(){
    var column = $('#availItems');
    $.ajax({
        type: 'GET',
        url: 'http://vending.us-east-1.elasticbeanstalk.com/items',
        success: function(itemArray){
            $.each(itemArray, function(index, item){
                var id = item.id;
                var name = item.name;
                var price = item.price;
                var quantity = item.quantity;

                var box = '<div class="col-md-4"><div class ="border m-2 p-2" id="itemBox" onclick="selectItem('+id+')">';
                    box += '<p>' + (index + 1) + '</p>'
                    box += '<p>'+ name + '</p>';
                    box += '<h3>$'+ price + '</h3>';
                    box += '<p>Quantity Left: ' + quantity + '</p>';
                    box += '</div></div>';


                    column.append(box);
            });
        },
        error: function(){
        }
    })
    }
    function selectItem(id){
        $('#itemIn').val(id);
    }
