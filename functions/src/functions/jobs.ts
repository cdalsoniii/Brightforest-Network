import * as functions from "firebase-functions";
import { HttpService } from '@nestjs/common';
const parseJson = require('parse-json');

export const getUpwards = functions.https.onRequest(async (request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  
  const httpService = new HttpService();
  const responseT = await httpService.get('http://api.l5srv.net/job_search/api/web/find_jobs.srv?CID=4502&format=json&l=95054&r=25&s=relevance&a=2014-09-30&start=1&limit=18&highlight=off&userip=25.158.22.121&useragent=Mozilla%2F5.0&cid=4502&q=Sales').toPromise();

  //console.log("responseT: ", responseT.data);

  //var jobsResponse = responseT.data;
  let requestRaw = JSON.stringify(responseT.data);
  let requestParsed = parseJson(requestRaw);

  //console.log("requestParsed: ", requestParsed);

  //console.log("requestParsed. :", requestParsed[0]["response"]["results"]);

  //let jsonObj = JSON.parse(responseT.data)
  //console.log(jsonObj["response"]);
    
    /*
    then((v) => {
    console.log("v data: ", v.data);
  }));
  */

  // response.send("Hello from Firebase!");
  // response.send(requestParsed[0]["response"]["results"]);

  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');
  response.send({
    "status": "success",
    "data": requestParsed[0]["response"]["results"]
  });
});