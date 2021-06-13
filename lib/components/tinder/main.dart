import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import './page/home_page.dart';
import './provider/feedback_position_provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) => ChangeNotifierProvider(
        create: (context) => FeedbackPositionProvider(),
        //child: HomePage()
       
        child: MaterialApp(
          title: 'PathX Finance',
          theme: ThemeData(
            primarySwatch: Colors.deepOrange,
            visualDensity: VisualDensity.adaptivePlatformDensity,
          ),
          home: HomePage(),
        ),
       
      );
      
}
