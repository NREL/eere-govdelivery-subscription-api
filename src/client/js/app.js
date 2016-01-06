/**
 *  Project: EERE GovDelivery Form Submission
 *  Description: Serializes the form and AJAx the data
 *  Author: Michael Oakley <moakley.oakley@nrel.gov>
 */

 /* jshint unused:false */
$(document).ready(function() {
    'use strict'

    $('#form-subscribe').submit(function() {
        $('input[type=submit]').attr('disabled', 'disabled')
        $('#response').addClass('hidden')

        var url = 'https://stage-api.govdelivery.com/api/add_script_subscription'
        var apikey = 't2iRUf5kNknlGQAO3H_XTbPrGg1sOIo_J1Me_d9vuzKXyiLzvjOakJOjuiJ4b4JinRWzNcik37EtO_zzEflbow'

        if (!document.getElementById('api') ) {
            $('<input />', {
                    'id': 'api',
                    'name': 'k',
                    'value': apikey,
                    'type': 'hidden'
                }).appendTo('#form-subscribe')
        }

        $.ajax({
            url: url,
            data: $('#form-subscribe').serializeArray(),
            dataType: 'jsonp',
            jsonp: 'c',
            jsonpCallback: 'jsonpcallback'
        })
        return false
    })

})


// Named callback function from the ajax call when jsonpbtn2 clicked
function jsonpcallback(response) {
    $('input[type=submit]').removeAttr('disabled')
    $('#response').removeClass('hidden')

    var text = JSON.stringify(response, null, '&nbsp;')

    $('#response').html('<strong>' + response.message + '</strong><br/>' + text)
}

