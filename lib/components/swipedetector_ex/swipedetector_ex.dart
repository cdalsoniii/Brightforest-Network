import 'package:flutter/material.dart';
import 'package:swipedetector/swipedetector.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new SwipeDet(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class SwipeDet extends StatefulWidget {
  @override
  _SwipeDetState createState() => new _SwipeDetState();
}

class _SwipeDetState extends State<SwipeDet> {
  String _swipeDirection = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: Container(
          child: Row(
            children: <Widget>[
              Expanded(
                child: SwipeDetector(
                  child: Card(
                    child: Container(
                      padding: EdgeInsets.only(
                        top: 80.0,
                        bottom: 80.0,
                        left: 16.0,
                        right: 16.0,
                      ),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          Text(
                            'Swipe Me!',
                            style: TextStyle(
                              fontSize: 40.0,
                            ),
                          ),
                          Text(
                            '$_swipeDirection',
                            style: TextStyle(),
                          ),
                        ],
                      ),
                    ),
                  ),
                  onSwipeUp: () {
                    setState(() {
                      _swipeDirection = "Swipe Up";
                    });
                  },
                  onSwipeDown: () {
                    setState(() {
                      _swipeDirection = "Swipe Down";
                    });
                  },
                  onSwipeLeft: () {
                    setState(() {
                      _swipeDirection = "Swipe Left";
                    });
                  },
                  onSwipeRight: () {
                    setState(() {
                      _swipeDirection = "Swipe Right";
                    });
                  },
                  swipeConfiguration: SwipeConfiguration(
                      verticalSwipeMinVelocity: 100.0,
                      verticalSwipeMinDisplacement: 50.0,
                      verticalSwipeMaxWidthThreshold:100.0,
                      horizontalSwipeMaxHeightThreshold: 50.0,
                      horizontalSwipeMinDisplacement:50.0,
                      horizontalSwipeMinVelocity: 200.0),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}