/*global $*/

$(document).ready(function () {
  //jQuery loaded?
  'use strict';
  //alert("Assignment 8");
});

var tableTemplate, persons, ptableTemplate;

ptableTemplate = Handlebars.compile($('#tableTemplate').html());

  //=============================================================================
/*
  function showTable() {
    var data, html;
    persons = app.dataMgr.listItems(displayPersonTable, displayError);
    html = tableTemplate(persons);
    $('#tableTemplate').html(html);
  }
*/
  //=============================================================================
  function showPtable() {
    var data, html, persons;
    var baseUrl = 'https://pacific-meadow-64112.herokuapp.com/data-api/';
    var collection = 'rrutherford';
    //---------------------------------------------------------------------
    function handleListResult( persons ) {
        var personsArray = [], jsonResult;
        var personsY = { persons: []};
        var jsonS, i;
        if ( persons.error ) {
          alert("Data error: " + persons.error );
        } else {
          //alert("got to handleList Result" + persons);
          /*
          personsDump = persons;
          jsonResult = JSON.stringify(persons, null, 4);
          jsonDump = jsonResult;
          personsArray = $.parseJSON(jsonResult);  
          arrayDump = personsArray;
          jsonS = personsY.persons.
          jsonSDump = jsonS;
          */
          for (i = 0; i < persons.length; i = i + 1){
            personsY.persons.push(persons[i]);
          }
          personsYDump = personsY;
          html = ptableTemplate(personsY);
          htmlDump = html;
          $('#main').html(html);
        }
    }
    //---------------------------------------------------------------------
    function handleAjaxError( jqXHR, textStatus, errorThrown ) {
        reportAjaxError( onFailure, jqXHR, textStatus, errorThrown );
    }
    //---------------------------------------------------------------------
    function reportAjaxError(jqXHR, textStatus, errorThrown) {
      var msg = 'AJAX error.\n' +
          'Status Code: ' + jqXHR.status + '\n' +
          'Status: ' + textStatus;
      if (errorThrown) {
        msg += '\n' + 'Error thrown: ' + errorThrown;
      }
      if (jqXHR.responseText) {
        msg += '\n' + 'Response text: ' + jqXHR.responseText;
      }
      $('#main').text(msg);
    }
    //-----------------------------------------------------------------------------
    persons = 
              $.ajax( baseUrl + collection,
                {
                    method: 'GET',
                    success: handleListResult,
                    error: handleAjaxError
                } );

  }

  showPtable();

  $('#ptable-button').on('click', showPtable);