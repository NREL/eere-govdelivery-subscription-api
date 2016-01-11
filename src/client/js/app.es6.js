/**
 *  Project: EERE GovDelivery Form Submission
 *  Description: Serializes the form and AJAX the data
 *  Author: Michael Oakley <moakley.oakley@nrel.gov>
 */


$(document).ready(function() {
    'use strict'

    /**
     * Takes an array of objects and merges objects with common names. Values are merged as a comma sep string
     *
     * @param  {Array} objArray Array of objects
     * @return {Array}          Array of objects with unique name properties
     */
    const mergeParams = function( objArray ) {
        let resultsArray = []

        // sort by name
        objArray.sort( ( a, b ) => {
            return (a.name > b.name) ? 1 : ( (b.name > a.name) ? -1 : 0)
        })

        // prime the results array
        resultsArray.push( objArray.shift() )

        // merge
        objArray.forEach( o => {
            let last  = resultsArray[resultsArray.length - 1]

            if ( o.name === last.name ) {
                last.value += `, ${o.value}`
            } else {
                resultsArray.push( o )
            }

        })

        return resultsArray
    }


    /**
     *
     * Validate the form
     *
     */
    $('#form-subscribe').validate({
        rules: {
            q_15675: {
                required: true
              , minlength: 1
            }
          , q_15655: {
                required: true
              , minlength: 1
            }
        }
      , messages: {
            e: 'A valid email is required'
          , q_15675: 'At least one topic is required.'
          , q_15655: 'At least one sector is required.'
        }
      , errorPlacement: function(error, element) {
            if ( $(element).hasClass('require-one') ) {

                $(element).parents('.form-group').children('.error-holder').append(error)
            } else {
                error.insertAfter(element);
            }
        }
      , submitHandler: SendData
    })

    /**
     *
     * Send the form data by AJAX
     *
     */
    //$('#form-subscribe').submit( e => {
    function SendData(form) {
        //e.preventDefault()

        $('input[type=submit]').attr('disabled', 'disabled')
        $('#response').addClass('hidden')

        const url = 'https://stage-api.govdelivery.com/api/add_script_subscription'
          , apikey = 't2iRUf5kNknlGQAO3H_XTbPrGg1sOIo_J1Me_d9vuzKXyiLzvjOakJOjuiJ4b4JinRWzNcik37EtO_zzEflbow'

        let data = $.Deferred()

        const showMessage = function(msg) {
            $('input[type=submit]').removeAttr('disabled')
            $('#response').removeClass('hidden')

            $('#response').html(msg)
        }


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

        const dfd = $.ajax({
            url: url
          , data: data
          , dataType: 'jsonp'
          , jsonp: 'c'
          , jsonpCallback: 'jsonpcallback'
        })


        dfd.done( response => {
            let msg

            // handle API returning error messages inside JSON with server 200 response
            if( response.errors ) {

                msg = '<div class="bg-danger"><p><strong>There was a problem submitting the form.</strong></p>'
                msg += '<ul>'

                Object.keys( response.errors ).forEach( function( k ) {
                        response.errors[k].forEach( function(txt){
                            msg += '<li>' + txt + '</li>'
                        })
                })

                msg += '</ul></div>'

            } else if ( response.message === 'Topic not found.') {

                msg = '<p class="bg-danger"><strong>There was a problem with the form. Topic not found.</strong></p>'

            } else {
                // actual success!
                $('#form-subscribe').fadeOut('fast')
                msg = '<p><strong>You have been successfully subscribed. You should receive a confirmation email shortly.</strong></p>'
            }


            showMessage(msg)

            // var text = JSON.stringify( response )


        })


        dfd.fail( response => {
            showMessage('<p class="bg-danger"><strong>There was a problem submitting your information. Please contact the webmaster.</strong></p>')

            const text = JSON.stringify( response, null, '&nbsp;' )
            console.debug( 'ajax error:', response, text )
        })

        return false
    }
    //})

})



