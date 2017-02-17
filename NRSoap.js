//Import the `assert` module to validate results.
    var assert = require('assert');
    var SoapRequestXML='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:_5="http://clients.mindbodyonline.com/api/0_5">\r\n' +
                       '<soapenv:Header/>\r\n' +
                       '<soapenv:Body>\r\n' +
                       '<_5:GetClasses>\r\n' +
                       '<_5:Request>\r\n' +
                       '<_5:SourceCredentials>\r\n' +
                       '<_5:SourceName>SOURCENAME</_5:SourceName>\r\n' +
                       '<_5:Password>*PASSWORD*</_5:Password>\r\n' +
                       '<_5:SiteIDs>\r\n' +
                       '<_5:int>-99</_5:int>\r\n' +
                       '</_5:SiteIDs>\r\n' +
                       '</_5:SourceCredentials>\r\n' +
                       '</_5:Request>\r\n' +
                       '</_5:GetClasses>\r\n' +
                       '</soapenv:Body>\r\n' +
                       '</soap:Envelope>';
    
    
    var options = {
        //Define endpoint URL.
        url: "https://api.mindbodyonline.com/0_5/ClassService.asmx",
        //Define body of POST request.
        body: SoapRequestXML,
        //Define insert key and expected data type.
        headers: {
             'Content-Type': 'application/soap+xml;charset=UTF-8;action="http://clients.mindbodyonline.com/api/0_5/GetClasses"',
             'Host': 'api.mindbodyonline.com',
             'Accept-Encoding': 'gzip,deflate',
             'Connection': 'Keep-Alive',
             'User-Agent': 'EVANTEST'
             
            }
    };
    
    //Define expected results using callback function.
    function callback(error, response, body) {
        //Log status code to Synthetics console.
        console.log(response.statusCode + " status code");
        //Verify endpoint returns 200 (OK) response code.
        assert.ok(response.statusCode == 200, 'Expected 200 OK response');
        //Parse JSON received from Insights into variable.
        //
       var parseString = require('xml2js').parseString;
       var XMLReSULT = response.body;
       parseString(XMLReSULT, function (err, result) {
        console.dir(result);
         
       });
       
        //Log end of script.
        console.log("End reached");
    }
    
    //Make POST request, passing in options and callback.
    $http.post(options, callback);
