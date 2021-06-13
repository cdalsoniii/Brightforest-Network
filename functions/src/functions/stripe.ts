// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import * as functions from "firebase-functions";
const stripe = require('stripe')('sk_test_dg1Wv6WYLiW9A6Z5nGPaPey400vWWclcSe');
const admin = require('firebase-admin');

// Firestore Implementation
const db = admin.firestore();

const parseJson = require('parse-json');

exports.stripeAddUsage = functions.https.onRequest( async (request, response) => {
  
  let requestRaw = JSON.stringify(request.body.data)
  //console.log("test type: ", typeof (test), "test: ", test)
  var user_fb_email: string;
  var user_fb_id: string;

  if (request.body.data != null) {
    let requestParsed = parseJson(requestRaw);
    user_fb_email = requestParsed.user_email;
    user_fb_id = requestParsed.user_id;
    //console.log("test2: ", test2, "requestParsed props: ", requestParsed["test"], "requestParsed props: ", requestParsed.test,)
  } else {
    user_fb_email = "";
    user_fb_id = "";
  }

  console.log("user_fb_email: ", user_fb_email);
  console.log("user_fb_id: ", user_fb_id);

  if (user_fb_email != "") {

    await listCustomers(user_fb_email);

    console.log("document path: ", user_fb_email);
    const docRef = db.collection('users').doc(user_fb_email);
    await docRef.set({
      user_email: user_fb_email,
      user_id: user_fb_id,
      test: "test"
    });

  } else {

    console.log("user_fb_email is empty")
    const docRef = db.collection('users').doc("default");
    await docRef.set({
      user_email: "default",
      user_id: "default",
    });
  }

  
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');
  response.send({
    "status": "success",

    //"stripe_subscription": stripeSubItem()
  });
});

/*
async function listSubscriptionItems() {

  const subscriptionItems = await stripe.subscriptionItems.list({
    subscription: 'sub_AVC6C1t4waTAja',
  });

}

async function updateSpecificCustomer() {

  const customer = await stripe.customers.update(
    'cus_AUWSqhhbIcBNbz',
    {metadata: {order_id: '6735'}}
  );

}
async function retrieveSpecificCustomer() {
  
const customer = await stripe.customers.retrieve(
  'cus_JNbryYsNpeCs4v'
);
  
}
*/
// List Stripe customers
async function listCustomers(user_email:string) {
  
  let customersObj;
  let matchingEmail;
  const customers = await stripe.customers.list({
    limit: 10,
  }).then((v) => {
    //console.log("List all customers: ", v);
    customersObj = v;
    /*
    customersObj.data.map((item) => {
      console.log("item.object", item.object);
    });
    */
    matchingEmail = customersObj.data.filter(it => it.email.includes(user_email));

    

  });
  console.log("matchingEmail: ", matchingEmail);
  //console.log("customers: ", customers);
  
  //let res = customers.filter(cus => cus.data.email.includes(user_email));
  
  /*let res2 = customersObj.data.map((cus) => {
    console.log(cus);
  });
  */
  //console.log("res: ", res);
  //console.log("res: ", res2);
  //console.log("customers: ", customers);
  return customers;
}
/*
// Increment Stripe customer metered plan
async function incrementMeteredUsage() {

  
  const stripeSubItem = stripe.subscriptionItems.createUsageRecord(
    'si_JN1bj3n6C9hZvd',
    {
      quantity: 1,
      timestamp: 1619394449, // Need unix time function
      action: 'increment',
    }
  ).then((v) => {
    console.log("stripe response: ", v)
  });

}
*/

export const funcTemplate = functions.https.onRequest((request, response) => {
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
  /*
  const fruits = {
    "fruits":
      ["Apple", "Banana", "Cherry", "Date", "Fig", "Grapes"],
  };
  */
  functions.logger.info(data, { structuredData: true });
  //functions.logger.info(fruits, { structuredData: true });
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');
  response.send({
    "status": "success",
    //"data": fruits["fruits"]
    "data": data
  });
  // response.send(["Apple", "Banana", "Cherry", "Date", "Fig", "Grapes"]);
  // return ["Apple", "Banana", "Cherry", "Date", "Fig", "Grapes"];
  // return {"data": data, "context": context};
  // return {"data": data};
});

