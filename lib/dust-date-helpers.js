if (typeof exports !== 'undefined')
{
  require('sugar')
}

(function(dust){

// Note: all error conditions are logged to console and failed silently

/* make a safe version of console if it is not available
 * currently supporting:
 *   _console.log
 * */
var _console = (typeof console !== 'undefined')? console: {
  log: function(){
     /* a noop*/
   }
};

var helpers = dust.helpers || {};

  /**
   * date helper
   * @param date is the date
   * @param format is the output of the date
   * @param locale is the locale code to use
   */
helpers.formatDate = function ( chunk, context, bodies, params ) {
  //key is required for further processing
  if (params && typeof params.date !== "undefined")
  {
    var date = params.date;
    date = new Date(date);

    var formattedDate;

    if (typeof date.format !== "undefined")
    {
      formattedDate = date.format(params.format, params.locale);
    }
    else
    {
      formattedDate = date.toString();
      _console.log("Sugar is not present, falling back to Date.toString();");
    }

    return chunk.write(formattedDate);
  }
  // no key parameter and no method
  else {
    _console.log( "''date' is a required parameter for date helper!" );
  }
  return chunk;
};

dust.helpers = helpers;

})(typeof exports !== 'undefined' ? module.exports = require('dustjs-linkedin') : dust);
