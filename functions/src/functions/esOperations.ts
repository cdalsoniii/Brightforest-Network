import { Client } from '@elastic/elasticsearch';
import * as functions from "firebase-functions";

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// exports.listFruit = functions.https.onCall((data, context) => {
export const listFruit = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  functions.logger.info(request.body['test'], {structuredData: true});
  
  let data = request.body.data;
  // const localdata = data;
  // const localcontext = context;
  // console.log("red: ", localdata.data["red"]);
  // console.log("localdata value: ", localdata);
  // console.log("localdata value: ", localdata.value);
  // console.log("localdata data: ", localdata.data);
  // console.log("localcontext: ", localcontext);
  // console.log("request: ", request.body);
  
  const fruits = {
    "fruits":
      ["Apple", "Banana", "Cherry", "Date", "Fig", "Grapes"],
  };
  
  functions.logger.info(data, { structuredData: true });
  //functions.logger.info(fruits, { structuredData: true });
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');
  response.send({
    "status": "success",
    "data": fruits["fruits"]
    //"data": data
  });
  // response.send(["Apple", "Banana", "Cherry", "Date", "Fig", "Grapes"]);
  // return ["Apple", "Banana", "Cherry", "Date", "Fig", "Grapes"];
  // return {"data": data, "context": context};
  // return {"data": data};
});

async function run() {
  /*
  await client.index({
    index: 'kibana_sample_data_flights',
    id: '1',
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })
  */
  
  const client = new Client({
    node: 'https://search-brightforesttest-h6zl5244uqh5d56ovc442fqqvi.us-east-1.es.amazonaws.com',
    auth: {
      username: 'cdalson',
      password: 'Rumble1990!'
    }
  });

  const { body } = await client.search({
    index: "kibana_sample_data_flights",
    body: {
      query: {
        match_all: {}
      }
    }
 
  })

  //console.log("body: ", body)
  // outerbody = body;
  //console.log(body.hits.hits)
  return body;
}

export const getESData  = functions.https.onRequest(async (request, response) => {
  
  

  //functions.logger.info("Hello logs!", { structuredData: true });
  /* works
  const client = new Client({
    node: 'https://search-brightforesttest-h6zl5244uqh5d56ovc442fqqvi.us-east-1.es.amazonaws.com',
    auth: {
      username: 'cdalson',
      password: 'Rumble1990!'
    }
  });
  */
/*
  client.search({
    index: 'kibana_sample_data_flights',
    body: {
      query: {
        match_all: {}
      }
    }
  }, (err, result) => {
    if (err) console.log(err)
  })
*/
  
  const result = await run();
  // let outerbody;
  
  
  
  // run().catch(console.log);
  /*
  const responseObj = run().then(data => {
    console.log("data: ", data);
    return data;
  })
  */
    //.catch(console.log);

  //console.log("responseObj :", responseObj);

  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');
  response.send({
    "status": "success",
    "data": result
  });
});


export const getRelatedAssets = functions.https.onRequest( async (request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  var hi = await run();
  response.send(hi);
});
