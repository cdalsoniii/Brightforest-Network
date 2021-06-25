import 'package:easy_dynamic_theme/easy_dynamic_theme.dart';
import 'package:explore/utils/authentication.dart';
import 'package:explore/utils/theme_data.dart';
import 'package:explore/widgets/carousel.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'screens/home_page.dart';
import 'screens/general_page.dart';
import 'package:explore/components/multi_search/general.dart';
import 'package:explore/widgets/destination_heading.dart';

void main() async {
   //await Firebase.initializeApp();
  runApp(
    EasyDynamicThemeWidget(
      child: MyApp(),
    ),
  );
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  Future getUserInfo() async {
    await getUser();
    setState(() {});
    print(uid);
  }

  @override
  void initState() {
    getUserInfo();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Explore',
      theme: lightThemeData,
      darkTheme: darkThemeData,
      debugShowCheckedModeBanner: false,
      themeMode: EasyDynamicTheme.of(context).themeMode,
      //home: uid == null ? HomePage() : GeneralApp(),
      home: uid == null ? TodosScreen(test: "Test", mainApp: DestinationCarousel(),) : GeneralApp(),
    );
  }
}
