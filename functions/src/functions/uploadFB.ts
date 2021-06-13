const functions = require('firebase-functions');
const admin = require('firebase-admin');
const PDFDocument = require('pdfkit');
const fs = require('fs');
//const fetch = require('node-fetch');
//const fetch = require('node-fetch');

admin.initializeApp();
/*
function getReads() {
  
  var _request = require('request');

var headers = {
    'apikey': '4BBithhP1wxxThB3X0Yvdm8YWqHCtCLM'
};

var options = {
    url: 'https://api.promptapi.com/resume_parser/url?url=https%3A%2F%2Fstorage.googleapis.com%2Ftest_drago%2FTest_Folder%2Fhello_world2.pdf',
    headers: headers
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}
 
_request(options, callback);

}
*/

export const uploadToStorage = functions.https.onRequest((request, response) => {
  
  functions.logger.info("Hello logs!", { structuredData: true });
  //response.send("Hello from Firebase!");
  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage();
  

  let pdfDoc = new PDFDocument;
  pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
  pdfDoc.text(`OB POSITION SUMMARY

  The Software Engineer in Test will work closely with an Agile team to ensure the quality of code and products. This role will be responsible for test planning, execution, and defect reporting. This person must have a keen eye for detail along with excellent organizational and communication skills.
  
  Role & Responsibility:
  
      Review documentation and requirements to determine intended functionality
      Create and execute test cases that will determine performance according to product specifications
      Conduct system, unit, regression, load, and user acceptance testing
      Analyze and document formal test results to triage defects, bugs, errors, and configuration issues
      Collaborate with analysts, developers, and product owners in the testing of software programs and applications
      Communicate test progress, test results, and other relevant information to the project team; escalate any issues in timely fashion
      Participate in daily scrum, sprint planning, sprint review, and retrospective meetings
      Support production deployments and perform “validation testing” during maintenance windows
  
  Requirements & Qualifications:
  
      Bachelor’s degree in Information Technology (or related subject)
      1 to 3 years experience as a Quality Assurance Tester or a similar role
      Must have experience with end to end testing within the Software Testing Life Cycle
      Experience with automated integration and unit testing software suites a plus
      Should have familiarity with Jira and Confluence
      Familiarity with Agile frameworks specifically Scrum is a plus
      Able to work in a fast-paced environment
      Ability to work both independently and in a team setting
      Result oriented with a passion to accomplish goals within project deadlines
      Must have an analytical mind and problem-solving aptitude
  
  Job Type: Full-time
  
  Pay: Up to $70,000.00 per year
  
  Benefits:
  
      401(k)
      401(k) matching
      Dental insurance
      Disability insurance
      Employee assistance program
      Flexible schedule
      Flexible spending account
      Health insurance
      Health savings account
      Life insurance
      Paid time off
      Parental leave
      Professional development assistance
      Referral program
      Tuition reimbursement
      Vision insurance
  
  Schedule:
  
      Monday to Friday
  
  COVID-19 considerations:
  Employees are encouraged to work remotely during this time.
  
  Ability to Commute/Relocate:
  
      Columbia, MD 21046 (Preferred)
  
  Experience:
  
      Quality assurance: 2 years (Preferred)
  
  Work Location:
  
      One location
  
  Visa Sponsorship Potentially Available:
  
      No: Not providing sponsorship for this job
  
  Company's website:
  
      www.mosaiclearning.com
  
  Benefit Conditions:
  
      Waiting period may apply
      Only full-time employees eligible
  
  Work Remotely:
  
      Temporarily due to COVID-19
  
  COVID-19 Precaution(s):
  
      Remote interview process
      Personal protective equipment provided or required
      Social distancing guidelines in place
      Virtual meetings
  
  19 days ago
  If you require alternative methods of application or screening, you must approach the employer directly to request this as Indeed is not responsible for the employer's application process.`);
  pdfDoc.end();
  var filename: string = 'hello_world2.pdf';
  const options = {
    destination: 'Test_Folder/' + filename
  };
  var file;
  const bucket = storage.bucket('test_drago');
  var finalUrl: string;
  bucket.upload('SampleDocument.pdf', options).then(function (data) {
    file = data[0];
    // console.log("bucket - file: ", file);
    console.log("selfLink: ", file["metadata"]["selfLink"]);
    console.log(file["metadata"]["mediaLink"].split("?"));
    let directURL: string = file["metadata"]["mediaLink"].split("?");
    console.log("directURL: ", directURL[0]);
    finalUrl = directURL[0];
    console.log("finalUrl: ", finalUrl);
    var hitURL: string = "https://storage.googleapis.com/test_drago/Test_Folder/" + filename;
    console.log("hitURL: ", hitURL);
    var requestURL: string = 'https://api.promptapi.com/resume_parser/url?url=' + encodeURIComponent(hitURL);
    console.log("requestURL: ", requestURL);
   
 
    /*
    fetch(requestURL, {
    headers: {
        'apikey': '4BBithhP1wxxThB3X0Yvdm8YWqHCtCLM'
    }
}).then(console.log("response: ", response));
*/
    
    //getReads();
/*
var _request = require('request');

var headers = {
    'apikey': '4BBithhP1wxxThB3X0Yvdm8YWqHCtCLM'
};

var options = {
    //url: 'https://api.promptapi.com/resume_parser/url?url=https%3A%2F%2Fstorage.googleapis.com%2Ftest_drago%2FTest_Folder%2Fhello_world2.pdf',
    url: requestURL,
    headers: headers
};

function callback(error, _response, body) {
    if (!error && _response.statusCode == 200) {
      console.log(body);
      return response.send("") 
    } else {
      console.log("Error on call");
      return {}
    }
}
 
_request(options, callback);
*/
    //response.send("Ending now");
    
  });
//response.send("Hello from Firebase!");
});

/*
exports.Storage = functions.firestore.document('Storage_Value').onUpdate((change, context) => {

  const {Storage} = require('@google-cloud/storage');
  const storage = new Storage();
  const bucket = storage.bucket('myapp.appspot.com');

  const options = {
    destination: 'Test_Folder/hello_world.dog'
  };

  bucket.upload('hello_world.ogg', options).then(function(data) {
    const file = data[0];
  });

  return 0;
});
*/