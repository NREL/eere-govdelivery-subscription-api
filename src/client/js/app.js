/**
 *  Project: EERE GovDelivery Form Submission
 *  Description: Serializes the form and AJAX the data
 *  Author: Michael Oakley <moakley.oakley@nrel.gov>
 */

 /* jshint unused:false, debug:true */
$(document).ready(function() {
    'use strict'

    /**
     * Takes an array of objects and merges objects with common names. Values are merged as a comma sep string
     *
     * @param  {Array} objArray Array of objects
     * @return {Array}          Array of objects with unique name properties
     */
    var mergeParams = function( objArray ) {
        var resultsArray = []

        // sort by name
        objArray.sort( function( a, b ){
            return a.name - b.name
        })

        // prime the results array
        resultsArray.push( objArray.shift() )

        // merge
        objArray.forEach( function( o, i, a ){
            var last  = resultsArray[resultsArray.length - 1]
            if ( o.name === last.name ) {
                last.value += ',' + o.value
            } else {
                resultsArray.push( o )
            }

        })

        return resultsArray
    }

    /**
     * Enable the submit button and show some debugging
     *
     * @param  {Object} response JSON returned from AJAX
     * @return none
     */
    var jsonpcallback = function(response) {
        $('input[type=submit]').removeAttr('disabled')
        $('#response').removeClass('hidden')

        var text = JSON.stringify(response, null, '&nbsp;')

        $('#response').html('<strong>' + response.message + '</strong><br>' + text)
    }

    /**
     *
     * Send the form data by AJAX
     *
     */
    $('#form-subscribe').submit(function(e) {

        e.preventDefault()

        $('input[type=submit]').attr('disabled', 'disabled')
        $('#response').addClass('hidden')

        var url = 'https://stage-api.govdelivery.com/api/add_script_subscription'
          , apikey = 't2iRUf5kNknlGQAO3H_XTbPrGg1sOIo_J1Me_d9vuzKXyiLzvjOakJOjuiJ4b4JinRWzNcik37EtO_zzEflbow'
          , data

        if (!document.getElementById('api') ) {
            $('<input />', {
                    'id': 'api'
                  , 'name': 'k'
                  , 'value': apikey
                  , 'type': 'hidden'
                }).appendTo('#form-subscribe')
        }

        data = $('#form-subscribe').serializeArray()

        data = mergeParams( data )

        $.ajax({
            url: url
          , data: data
          , dataType: 'jsonp'
          , jsonp: 'c'
          , jsonpCallback: 'jsonpcallback'
        })

        return false
    })

})



