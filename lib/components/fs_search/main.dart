import 'package:flutter/material.dart';
import 'cloud_firestore.dart';
import 'searchDeligate.dart';

import 'localSearch.dart';

void main() {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false,
      home: SearchApp(),
    ),
  );
}

class SearchApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Search Feature"),
      ),
      body: ListView(
        children: <Widget>[
          RaisedButton(
            child: Text("using cloud firestore"),
            onPressed: () {
              Navigator.of(context).push(MaterialPageRoute(builder: (_) {
                return CloudFirestoreSearch();
              }));
            },
          ),
          RaisedButton(
            child: Text("Using SearchDeliate"),
            onPressed: () {
              Navigator.of(context).push(MaterialPageRoute(builder: (_) {
                return SearchAppBarDelegate();
              }));
            },
          ),
          RaisedButton(
            child: Text("uisng local search"),
            onPressed: () {
              Navigator.of(context).push(MaterialPageRoute(builder: (_) {
                return LocalSearch();
              }));
            },
          ),
        ],
      ),
    );
  }
}
