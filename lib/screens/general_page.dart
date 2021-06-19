import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:easy_dynamic_theme/easy_dynamic_theme.dart';
import 'package:explore/widgets/web_scrollbar.dart';
import 'package:explore/widgets/bottom_bar.dart';
import 'package:explore/widgets/carousel.dart';
import 'package:explore/widgets/destination_heading.dart';
import 'package:explore/widgets/explore_drawer.dart';
import 'package:explore/widgets/featured_heading.dart';
import 'package:explore/widgets/featured_tiles.dart';
import 'package:explore/widgets/floating_quick_access_bar.dart';
import 'package:explore/widgets/responsive.dart';
import 'package:explore/widgets/top_bar_contents.dart';

class Todo {
  final String title;
  final String description;

  Todo(this.title, this.description);
}

void main() {
  runApp(
    MaterialApp(
      title: 'Passing Data',
      home: TodosScreen(test: "Test", mainApp: DestinationCarousel(),),
    ),
  );
}

class TodosScreen extends StatelessWidget {

  static const String route = '/';
  late ScrollController _scrollController = ScrollController();
  double _scrollPosition = 0;
  double _opacity = 0;
  String test = "Test";
  Widget mainApp = DestinationCarousel();

  TodosScreen({Key? key, 
              required this.test,
              required this.mainApp
              }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var screenSize = MediaQuery.of(context).size;
    _opacity = _scrollPosition < screenSize.height * 0.40
        ? _scrollPosition / (screenSize.height * 0.40)
        : 1;

    return Scaffold(
      backgroundColor: Theme.of(context).backgroundColor,
      extendBodyBehindAppBar: true,
      appBar: ResponsiveWidget.isSmallScreen(context)
          ? AppBar(
              backgroundColor:
                  Theme.of(context).bottomAppBarColor.withOpacity(_opacity),
              elevation: 0,
              centerTitle: true,
              actions: [
                IconButton(
                  icon: Icon(Icons.brightness_6),
                  splashColor: Colors.transparent,
                  highlightColor: Colors.transparent,
                  onPressed: () {
                    EasyDynamicTheme.of(context).changeTheme();
                  },
                ),
              ],
              title: Text(
                //'EXPLORE',
                '${this.test}',
                style: TextStyle(
                  color: Colors.blueGrey[100],
                  fontSize: 20,
                  fontFamily: 'Montserrat',
                  fontWeight: FontWeight.w400,
                  letterSpacing: 3,
                ),
              ),
            )
          : PreferredSize(
              preferredSize: Size(screenSize.width, 1000),
              child: TopBarContents(_opacity),
            ),
      drawer: ExploreDrawer(),
      body: WebScrollbar(
        color: Colors.blueGrey,
        backgroundColor: Colors.blueGrey.withOpacity(0.3),
        width: 10,
        heightFraction: 0.3,
        controller: _scrollController,
        child: SingleChildScrollView(
          controller: _scrollController,
          physics: ClampingScrollPhysics(),
          child: Column(
            children: [
              Stack(
                children: [
                  /*
                  Container(
                    child: SizedBox(
                      height: screenSize.height * 0.45,
                      width: screenSize.width,
                      child: Image.asset(
                        'assets/images/cover.jpg',
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  */
                  Column(
                    children: [
                      // FloatingQuickAccessBar(screenSize: screenSize),
                      /*
                      Container(
                        child: Column(
                          children: [
                            Text("Hello"),
                            FeaturedHeading(
                              screenSize: screenSize,
                            ),
                            FeaturedTiles(screenSize: screenSize)
                          ],
                        ),
                        
                      ),
                      */
                    ],
                  )
                  
                ],
              ),
              //DestinationHeading(screenSize: screenSize),
              SizedBox(height: 50),
              //CloudFirestoreSearch(),
              //DestinationCarousel(),
              mainApp
              //SizedBox(height: screenSize.height / 10),
              //BottomBar(),
            ],
          ),
        ),
      ),
    );
  }
}

class DetailScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final todo = ModalRoute.of(context)!.settings.arguments as Todo;

    // Use the Todo to create the UI.
    return Scaffold(
      appBar: AppBar(
        title: Text(todo.title),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Text(todo.description),
      ),
    );
  }
}