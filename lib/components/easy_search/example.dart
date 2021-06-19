import 'package:dio/dio.dart';
//import 'package:easy_search/easy_search.dart';
import 'package:flutter/material.dart';
import 'package:explore/services/repositories/cloud_functions.dart';
//import 'package:meet_network_image/meet_network_image.dart';
//import 'package:explore/components/fs_search/cloud_firestore_component.dart';

void main() {
  runApp(EasySearchApp());
}

class EasySearchApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Job Search',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Easy Search'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  SearchItem controllerStartWithValue = SearchItem(
    items: [
      Item(Job(snippet: "snippet", url: "url", date: "date", country: "Country", state: "State", city: "City", company: "Company Name", jobtitle: 'Tiago', zip: '37', logo: 'https://cdn.upward.net/company_logos/fa/4d/07/fa4d078331b71ff9e282ea3af1364784/20180105151005.png'), true),
      Item(Job(snippet: "snippet", url: "url", date: "date", country: "Country", state: "State", city: "City", company: "Company Name", jobtitle: 'Mel', zip: '3', logo: 'https://cdn.upward.net/company_logos/fa/4d/07/fa4d078331b71ff9e282ea3af1364784/20180105151005.png'), false),
      Item(Job(snippet: "snippet", url: "url", date: "date", country: "Country", state: "State", city: "City", company: "Company Name", jobtitle: 'Monique', zip: '30', logo: 'https://cdn.upward.net/company_logos/fa/4d/07/fa4d078331b71ff9e282ea3af1364784/20180105151005.png'), false),
      Item(Job(snippet: "snippet", url: "url", date: "date", country: "Country", state: "State", city: "City", company: "Company Name", jobtitle: 'Timothy', zip: '0', logo: 'https://cdn.upward.net/company_logos/fa/4d/07/fa4d078331b71ff9e282ea3af1364784/20180105151005.png'), false),
    ],
  );
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            buildInformation(information: 'Experiment'),
            EasySearch(
              multipleSelect: true,
              startWithValue: true,
              onChange: (value) {
                print("OnChange: ");
                print(value.length);
                print(value);
              },
              onSearch: (text) {
                print('Filter Query 4: $text');
                //return getData(name: text);
                return getJobs(name: text);
              },
               filterPageSettings: FilterPageSettings(
                searchOnShow: false,
                showBackButton: true,
                //title: LabelSettings.filterPageTitle(value: "Test filter page title"),
                unselectedAll: FilterActionButton.unselectedAll(),
                selectedAll: FilterActionButton.selectedAll(),
                waitingTimeToSearch: 300,
                listFilter: ListFilter(circularProgress: Colors.blue,),
                //buildItemFilter: BuildItemFilter.
              ),
              searchResultSettings: SearchResultSettings(
                padding: EdgeInsets.only(left: 8.0, top: 8.0, right: 8.0),
                label: LabelSettings.searchLabel(value: 'Everthang'),
                //labelHint: ,
                //prefix: ,
                //styleSearchPage: ,
                //buildItemResult: ,
              ),
               controller: controllerStartWithValue,
              
              customItemBuilder: (BuildContext context, Job item, bool isSelected) {

              //print("Image Url2: ");
              //Type type = item.runtimeType;
              //print(type);
              //print(item.jobtitle);
              //print(item.logo);

                return Container(
                  decoration: !isSelected
                      ? null
                      : BoxDecoration(
                          border: Border.all(color: Theme.of(context).primaryColor),
                          borderRadius: BorderRadius.circular(7),
                          color: Colors.white,
                        ),
                  child: 
                  //Text("Test")
                  
                  ListTile(
                    selected: isSelected,
                    title: Text(item.jobtitle),
                    subtitle: Text(item.zip.toString()),
                    leading: Icon(Icons.people),

                  ),
                  
                );
              },
            ),
            Center(
              child: ElevatedButton(
                onPressed: () {
                  
                  //1ª Create the new listToFill
                  List<Item<ModelExample>> listToFill = [
                    Item(ModelExample(name: 'ABC 123', age: 3), true),
                    Item(ModelExample(name: 'ACB 132', age: 13), false),
                    Item(ModelExample(name: 'BAC 213', age: 23), false),
                    Item(ModelExample(name: 'BCA 231', age: 33), false),
                    Item(ModelExample(name: 'CAB 312', age: 43), false),
                    Item(ModelExample(name: 'CBA 321', age: 53), false),
                    Item(ModelExample(name: 'ABC 123', age: 3), true),
                    Item(ModelExample(name: 'ACB 132', age: 13), false),
                    Item(ModelExample(name: 'BAC 213', age: 23), false),
                    Item(ModelExample(name: 'BCA 231', age: 33), false),
                    Item(ModelExample(name: 'CAB 312', age: 43), false),
                    Item(ModelExample(name: 'CBA 321', age: 53), false),
                  ];

                  //2ª Update controller with new listToFill
                  
                  controllerStartWithValue.changingValues(listToFill);
                  List<dynamic> getListItems = controllerStartWithValue.getListItems;
                  
                  print("controller list items: ");
                  print(controllerStartWithValue.getListItems);
                  List<String> nameList;

                  var thing = controllerStartWithValue.getListItems.map((v) => {
                   //v.itemValue.value.toString()
                   v.itemValue.value.toString()
                  });
                  print("thing: ");
                  print(thing);
                },
                child: Text('Changing list'),
              ),
            ),
         
            //CloudFirestoreSearch()
            
          ],
        ),
      ),
    );
  }

  Widget buildInformation({String information = "General Info"}) {
    return Column(
      children: [
        SizedBox(height: 20),
        Padding(
          padding: const EdgeInsets.only(left: 8.0, bottom: 0),
          child: Center(
            child: Text(
              information,
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ),
        ),
      ],
    );
  }

  Future<List<ModelExample>> getData({name}) async {
    var response = await Dio().get(
      "https://5f24717b3b9d35001620456b.mockapi.io/user",
      queryParameters: {"name": name},
    );

    //var responseTest = await Dio().get("http://localhost:5001/brightpath-1c68c/us-central1/listFruit");

    var result = ModelExample.fromJsonList(response.data);
    return result;
  }

  Future<List<Job>> getJobs({name}) async {
    var response = await Dio().get(
      "http://localhost:5001/brightpath-1c68c/us-central1/getUpwards",
      //queryParameters: {"name": name},
      options: Options(
        headers: {
          'content-type': 'application/json',
          'Access-Control-Allow-Origin':'true'
        },
    ));

    //var responseTest = await Dio().get("http://localhost:5001/brightpath-1c68c/us-central1/listFruit");
    //print(response.data["data"]);
    var result = Job.fromJsonList(response.data["data"]);

    //print(result);
    Type type = result.runtimeType;
    print(type);

    return result;
  }
}

class Job {

  final String jobtitle;
  final String zip;
  final String company;
  final String city;
  final String state;
  final String country;
  final String date;
  final String url;
  final String snippet;
  final String logo;


  Job({
    required this.jobtitle, 
    required this.zip, 
    required this.company, 
    required this.city, 
    required this.state, 
    required this.country,
    required this.date,
    required this.url,
    required this.snippet,
    required this.logo
     });

  @override
  String toString() {

    //print('$jobtitle $zip $company $city $snippet');
    print("zip from toString: ");
    print('$zip');

    return '$jobtitle';
  }

  factory Job.fromJson(Map<String, dynamic> json) {
    //if (json == null) return null;
    //if (json == null) return {};
    return Job(
      jobtitle: json["jobtitle"],
      zip: json["zip"],
      company: json["company"],
      city: json["city"],
      state: json["state"],
      country: json["country"],
      date: json["date"],
      url: json["url"],
      snippet: json["snippet"],
      logo: json["logo"],
    );
  }

  static List<Job> fromJsonList(List list) {
    //if (list == null) return null;
    return list.map((item) => Job.fromJson(item)).toList();
  }

  //@override
  //operator ==(object) => this.jobtitle.toLowerCase().contains(object.toLowerCase()) || this.zip.toString().contains(object);

  // @override
  // operator ==(o) =>
  //     o is ModelExample && this.name.toLowerCase().contains(o.name.toLowerCase()); // && this.hashCode == o.hashCode;

  // @override
  // operator ==(o) =>
  //     o is ModelExample &&
  //     (this.name.toLowerCase().contains(o.name.toLowerCase()) || this.age.toString().contains(o.age.toString()));

  @override
  int get hashCode => jobtitle.hashCode ^ zip.hashCode;
}

class ModelExample {
  final String name;
  final int age;

  ModelExample({required this.name, required this.age});

  @override
  String toString() {
    return '$name $age';
  }

  factory ModelExample.fromJson(Map<String, dynamic> json) {
    //if (json == null) return null;
    return ModelExample(
      name: json["name"],
      age: json["age"],
    );
  }

  static List<ModelExample> fromJsonList(List list) {
    //if (list == null) return null;
    return list.map((item) => ModelExample.fromJson(item)).toList();
  }

  //@override
  //operator ==(object) => this.name.toLowerCase().contains(object.toLowerCase()) || this.age.toString().contains(object);

  // @override
  // operator ==(o) =>
  //     o is ModelExample && this.name.toLowerCase().contains(o.name.toLowerCase()); // && this.hashCode == o.hashCode;

  // @override
  // operator ==(o) =>
  //     o is ModelExample &&
  //     (this.name.toLowerCase().contains(o.name.toLowerCase()) || this.age.toString().contains(o.age.toString()));

  @override
  int get hashCode => name.hashCode ^ age.hashCode;
}
