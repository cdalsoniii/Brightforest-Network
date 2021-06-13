import * as functions from "firebase-functions";
const winkNLP = require('wink-nlp');
const its = require('wink-nlp/src/its.js');
const as = require('wink-nlp/src/as.js');
const model = require('wink-eng-lite-model');
const ner = require( 'wink-ner' );
const winkTokenizer = require('wink-tokenizer');
//const winkNER = require('wink-nlp-utils');
const fs = require('fs');
const cnlp = require('compromise');
import Fuse from 'fuse.js';

let skills = [];
let students = {};

async function fsDump() {
  
  await fs.readFile("skills.json", "utf8", (err, jsonString) => {
    
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    //console.log("File data:", jsonString);
    let student = JSON.parse(jsonString);
    let students = student['skills'];

    //console.log(student);
    /*
     students.forEach(obj => {
       Object.entries(obj).forEach(([key, value]) => {
         
         if (key == 'name') {
           //console.log(`${key} ${value}`);
           skills.push(value)
           //fruits.push("Kiwi"); 
           
         }
         
       })
       //console.log("skills list: ", skills);
     });
     */
    students.map((s) => {
      //console.log(s['name']);
      skills.push(s['name'])
    })

    //console.log("fruits: ", fruits);


  });

  //console.log("print skills: ", skills);

  return skills
  //return students;
}

async function fsDump2() {
  
  await fs.readFile("skills.json", "utf8", (err, jsonString) => {
    
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    //console.log("File data:", jsonString);
    let student = JSON.parse(jsonString);
    let students = student['skills'];

    //console.log(student);
    /*
     students.forEach(obj => {
       Object.entries(obj).forEach(([key, value]) => {
         
         if (key == 'name') {
           //console.log(`${key} ${value}`);
           skills.push(value)
           //fruits.push("Kiwi"); 
           
         }
         
       })
       //console.log("skills list: ", skills);
     });
     */
    students.map((s) => {
      //console.log(s['name']);
      skills.push(s['name'])
    })

    //console.log("fruits: ", fruits);


  });

  //console.log("print skills: ", skills);

  //return skills
  return students;
}

export const winkNLPTest = functions.https.onRequest(async (request, response) => {
  

  functions.logger.info("Hello logs!", { structuredData: true });
  
  //var fruits = ["Banana", "Orange", "Apple", "Mango"];

 
  var skills = await fsDump()
  console.log("skills object: ", skills);

  var students = await fsDump2()
  console.log("students object: ", students);

  
  // NLP Code.
  const nlp = winkNLP( model );
  const text = 'Hello   World🌎! How are you?';
  const doc = nlp.readDoc( text );

  console.log( doc.out() );
  // -> Hello   World🌎! How are you?

  console.log( doc.sentences().out() );
  // -> [ 'Hello   World🌎!', 'How are you?' ]

  console.log( doc.entities().out( its.detail ) );
  // -> [ { value: '🌎', type: 'EMOJI' } ]

  console.log( doc.tokens().out() );
  // -> [ 'Hello', 'World', '🌎', '!', 'How', 'are', 'you', '?' ]

  console.log( doc.tokens().out( its.type, as.freqTable ) );
  // -> [ [ 'word', 5 ], [ 'punctuation', 2 ], [ 'emoji', 1 ] ]


  //const text2 = 'I wish to order 1 small classic with corn topping and 2 large supreme with Olives, Onion topping.';
const pizza = [
  { name: 'Category', patterns: [ '[Classic|Supreme|Extravaganza|Favorite]' ] },
  { name: 'Qty', patterns: [ 'CARDINAL' ] },
  { name: 'Topping', patterns: [ '[Corn|Capsicum|Onion|Peppers|Cheese|Jalapenos|Olives]' ] },
  { name: 'Size', patterns: [ '[Small|Medium|Large|Chairman|Wedge]' ] }
 ];

nlp.learnCustomEntities( pizza, {
  matchValue: false,
  usePOS: true,
  useEntity: true
});
  

// Create your instance of wink ner & use default config.
  var myNER = ner();
  
// Define training data.
var trainingData = [
  { text: 'manchester united', entityType: 'club', uid: 'manu' },
  { text: 'manchester', entityType: 'city' },
  { text: 'U K', entityType: 'country', uid: 'uk' }
];
// Learn from the training data.
myNER.learn( trainingData );
// Since recognize() requires tokens, use wink-tokenizer.

// Instantiate it and extract tokenize() api.
var tokenize = winkTokenizer().tokenize;
// Tokenize the sentence.
  var tokens = tokenize(`The RoleTesla is seeking a Senior Full-Stack JavaScript Engineer to join the Options Management team – our applications and services support the sales and production of each and every Tesla product. In this role, you will design and develop mission-critical services and applications that require high availability, concurrency, multi-tenancy, and high scalability for a large global user base.
  Responsibilities:Work closely with Product Management, Engineering and DevOps to build features, resolve issues, and perform testing related to customer facing high traffic services and applications in a fast-paced and collaborative Agile team while owning your solution from development to productionDesign, write, test, and document applications while identifying solutions to complex problemsDefine optimal system performance at scale and at different layers while using system profiling tools and stress testing to find and fix weak spotsImplement continuous integration, regression and deployment while maintaining the existing system and codebaseDesign and build scalable, high-availability mission-critical systems and APIsEnsure feature quality through extensive testing (unit, integration, functional, performance and regression) with a focus towards automation
  Requirements:7+ years of experience in web application design and developmentBachelor’s Degree in Computer Science or related field, or equivalent experienceExperience in building micro-services architectures and API-first designDesign and development experience with applications that require high availability, concurrency, multi-tenancy, scalabilityStrong understanding of concepts related to data structure, algorithm, design patterns/practicesProficient in JavaScript/ES6+Deep understanding of JavaScript frameworks such as ReactSolid backend experience in NodeJS, MySQL (ORM framework), Redis to develop REST APIsIn-depth knowledge of web fundamentals (HTTP, HTML, REST, JSON)Experience with Docker and Kubernetes
  Good to have:Experience with Express, TypeScript, GraphQL, Splunk, Grafana, Kafka` );
  
  //console.log("Tokens: ", tokens);

  var bird = `Tesla Government is looking for a talented Full Stack Developer to join our team and build new features for our client-facing websites. We’re looking for a generalist who likes learning new technologies. You will get to work on a relatively new project with a modern microservice architecture using a tech stack that includes Java, Typescript, Spring Boot, React, MySQL and AWS. Our agile team has daily stand-ups, weekly sprint plannings, and bi-weekly deployments.


  Requirements:
  
          MUST BE US CITIZEN eligible for a security clearance
          Computer science or related engineering degree from a 4-year university
          Experience writing production code in a team setting
          Excellent communication skills
          Knowledge of Java web development, preferably with Spring Boot
          Experience working with a modern JavaScript framework, preferably React
          2+ years of Developer experience
  
  
  
  Desired:
  
          Familiarity with working in an IDE like IntelliJ
          Microservices or SOA experience
          Experience with Linux
          Strong SQL skills
  
  
  
  Tesla offers Flex PTO, flexible work schedule, health benefits, 4% matching on 401k contributions, competitive compensation, work from Home (telework), and an Apple MacBook Pro. We have a friendly, active environment, and our projects make a difference.`
  const testDoc = nlp.readDoc(bird);

  // Entities in winkNLP doc
  const entities = testDoc.entities().out();
  console.log( "entities: ", entities );
  // Simply Detect entities!
tokens = myNER.recognize(tokens);

  //console.log("skills: ", skills);
//console.log("tokens: ", tokens);
  //console.log("winkNER Result: ", winkNER.tokens.setOfWords(skills));
  //var tokenSet = winkNER.tokens.setOfWords(skills);
//console.log(winkNER.tokens.setOfWords(tokens, skills));

//console.log("tokens: ", tokenSet);
  let cdoc = cnlp(bird)
  console.log("cdoc: ", cdoc);
/*
  const options1 = {
    includeScore: true,
    keys: ['name']
  }
  
  const fuse1 = new Fuse(tokenSet, options1)
  */
 

console.log( "cnlp: ", cdoc.match('flexible work schedule').text())
  for (var j = 0; j < skills.length; j++) {
    //console.log("cdoc ", j, cdoc.match(skills[j]).text());
    //const resultFuzz1 = fuse1.search(skills[j])
    //console.log("fuzzy search: ", resultFuzz1);
    
  }
/*
  let intersection = skills.filter(x => tokens.includes(x));
  var arrays = [
    tokens,
    skills
    ];
*/
/*
var result = arrays.shift().filter(function(v) {
    return arrays.every(function(a) {
        return a.indexOf(v) !== -1;
    });
});
*/

  //console.log("result: ", result);
  //console.log("intersection: ", intersection);
//console.log(tokens);
//console.log(tokenize.setOfWords( tokens, [ 'football' ] ));
/*
let user = {
  name: 'John Doe',
  emai: 'john.doe@example.com',
  age: 27,
  gender: 'Male',
  profession: 'Software Developer'
};
*/
// convert JSON object to a string
//const data = JSON.stringify(user);

/* write file to disk
fs.writeFile('./user.json', data, 'utf8', (err) => {

  if (err) {
      console.log(`Error writing file: ${err}`);
  } else {
      console.log(`File is written successfully!`);
  }

});
*/

  //let students = []

  //var list = ["Old Man's War", "The Lock Artist"]

  const options = {
    includeScore: true,
    //keys: ['value']
  }
  
  var birdlist = [];
  birdlist.push(bird);

  const fuse = new Fuse(birdlist, options)
  
  const resultFuzz = fuse.search('Typescript')
  
  console.log("fuzzy search: ", resultFuzz);
  console.log("List of tokens: ", tokens);

  for (var j = 0; j < skills.length; j++) {

    const resultFuzz = fuse.search(skills[j])
    console.log("resultFuzz: ", resultFuzz);
    console.log("specific skill: ", skills[j]);
      /*
      if (resultFuzz[0].score > 0.9) {
        console.log("resultFuzz: ", resultFuzz);
      }
      */
    
    
    
  }
  
  response.send("Hello from WinkJS function!");
});

export const intersectTest = functions.https.onRequest(async (request, response) => {
  
  functions.logger.info("Hello logs!", { structuredData: true });
  // Instantiate it and extract tokenize() api.
  var tokenize = winkTokenizer().tokenize;
  var myNER2 = ner();
  // Tokenize the sentence.
  
  var tokens = tokenize(`The RoleTesla is seeking a Senior Full-Stack JavaScript Engineer to join the Options Management team – our applications and services support the sales and production of each and every Tesla product. In this role, you will design and develop mission-critical services and applications that require high availability, concurrency, multi-tenancy, and high scalability for a large global user base.
  Responsibilities:Work closely with Product Management, Engineering and DevOps to build features, resolve issues, and perform testing related to customer facing high traffic services and applications in a fast-paced and collaborative Agile team while owning your solution from development to productionDesign, write, test, and document applications while identifying solutions to complex problemsDefine optimal system performance at scale and at different layers while using system profiling tools and stress testing to find and fix weak spotsImplement continuous integration, regression and deployment while maintaining the existing system and codebaseDesign and build scalable, high-availability mission-critical systems and APIsEnsure feature quality through extensive testing (unit, integration, functional, performance and regression) with a focus towards automation
  Requirements:7+ years of experience in web application design and developmentBachelor’s Degree in Computer Science or related field, or equivalent experienceExperience in building micro-services architectures and API-first designDesign and development experience with applications that require high availability, concurrency, multi-tenancy, scalabilityStrong understanding of concepts related to data structure, algorithm, design patterns/practicesProficient in JavaScript/ES6+Deep understanding of JavaScript frameworks such as ReactSolid backend experience in NodeJS, MySQL (ORM framework), Redis to develop REST APIsIn-depth knowledge of web fundamentals (HTTP, HTML, REST, JSON)Experience with Docker and Kubernetes
  Good to have:Experience with Express, TypeScript, GraphQL, Splunk, Grafana, Kafka` );
  tokens = myNER2.recognize(tokens);
  let listofSkills = await fsDump()
  console.log("I ran:");
  //var givenStopWords = (listofSkills)
  //console.log("winkNER remove words: ", winkNER.tokens.removeWords(listofSkills));
  //console.log("winkNER remove words: ", winkNER.tokens.filter(givenStopWords.exclude)

  //console.log("fsDump: ", await fsDump());
  //console.log("fsDump2: ", await fsDump2());

  const nlp = winkNLP( model );
  /*
  //const text = 'Manchester United is a football club based in Manchester.';
  const patterns = [
    { name: 'club', patterns: [ 'manchester united' ] },
    { name: 'city', patterns: [ 'manchester' ] }
  ];
  nlp.learnCustomEntities(patterns);
  const doct = nlp.readDoc(text);
  doct.customEntities().out(its.detail)
*/
  var finalList: string = '[';

  //console.log("listofSkills: ", listofSkills.join("|"));
/*
  for (var h = 0; h < listofSkills.length; h++) {
    console.log("h: ", h);
    console.log(finalList + listofSkills[h] + '|');
    console.log("finalList: ", finalList, " ", listofSkills[h]);
  }
*/
  //finalList + ']'
  
  console.log("finalList: ", finalList);
  //console.log("output: ", '[' + listofSkills.join("|") + ']');
  const text = 'Typescript Javascript I wish to order 1 small classic with corn topping and 2 large supreme with Olives, Onion topping.';
const pizza = [
  { name: 'club', patterns: listofSkills },
  { name: 'Qty', patterns: [ 'CARDINAL' ] },
  //{ name: 'Topping', patterns: [ '[' + listofSkills.join("|") + ']' ] },
  { name: 'Size', patterns: [ '[Small|Medium|Large|Chairman|Wedge]' ] }
 ];

nlp.learnCustomEntities( pizza, {matchValue: false, usePOS: true, useEntity: true } );

const doc = nlp.readDoc( text );

// Custom Entities in winkNLP doc
const customEntities = doc.customEntities().out( its.detail );
console.log( customEntities );
  //console.log(doct.customEntities().out(its.detail));
// -> [ { value: 'Manchester United', type: 
  


  response.send("Hello, we intersected!");
});