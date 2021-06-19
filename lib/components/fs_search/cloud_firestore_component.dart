import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:tiktoklikescroller/tiktoklikescroller.dart';
//import 'tiktokscroller.dart';
import 'package:explore/components/easy_search/example.dart';
//import 'package:explore/components/stacked_cards/stackedcards.dart';
import 'package:explore/components/swipable_stack/swipeable_stack.dart';
//import 'package:explore/components/swipable_stack/swipe_stack_ex.dart';
//import 'package:explore/components/tinder/widget/user_card_widget.dart';
import 'package:swipedetector/swipedetector.dart';
import 'package:explore/components/swipedetector_ex/swipedetector_ex.dart';


class CloudFirestoreSearch extends StatefulWidget {
  @override
  _CloudFirestoreSearchState createState() => _CloudFirestoreSearchState();
}

class _CloudFirestoreSearchState extends State<CloudFirestoreSearch> {
  String name = "";
  String _swipeDirection = "";
  int _index = 0;

  @override
  Widget build(BuildContext context) {

    var screenSize = MediaQuery.of(context).size;
    var width = screenSize.width;
    var height = screenSize.height;

    return Scaffold(
      //appBar: AppBar(title: Text("Hi")),
      body: SizedBox(
      height: height,
      width: width,
       child: Column(children: [
         
      /*
      SizedBox(
      height: 100,
      width: 400,
      child: Card(
          child: TextField(
            decoration: InputDecoration(
                prefixIcon: Icon(Icons.search), hintText: 'Search...'),
            onChanged: (val) {
              setState(() {
                name = val;
              });
            },
          ),
        )),
*/
        SizedBox(
      height: height * .9,
      width: width * 9,
      child: StreamBuilder<QuerySnapshot>(
        stream: (name != "" && name != null)
            ? FirebaseFirestore.instance
                .collection('stories')
                .where("tags", arrayContains: name)
                .snapshots()
            : FirebaseFirestore.instance.collection("stories").snapshots(),
        builder: (context, snapshot) {

          
          return (snapshot.connectionState == ConnectionState.waiting)
              ? Center(child: CircularProgressIndicator())
              : ListView.builder(
                  itemCount: snapshot.data?.docs.length,
                  //itemCount: 1,
                  itemBuilder: (context, index) {

                    var dataI = snapshot.data;
                    /*
                    if(dataI != null) {

                    DocumentSnapshot data = snapshot.data?.docs[index];
                    
                    }
                    */
                    return Column(
    children: <Widget>[
       Row(
        mainAxisSize: MainAxisSize.max,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          ElevatedButton(
            onPressed: () {
              if (_index <= 0) return;
              setState(() {
                _index -= 1;
              });
            },
            child: Text(
              "Prev",
              style: TextStyle(color: Colors.white)
            ),
          ),
          ElevatedButton(
            onPressed: () {
              if (_index >= 2) return;
              setState(() {
                _index += 1;
              });
            },
            child: Text(
              "Next",
              style: TextStyle(color: Colors.white)
            ),
          )
        ],
      ),
      Container(
        height: height,
        child: IndexedStack(
          index: _index,
          children: <Widget>[
            Container(
              color: Colors.pink,
              child: Center(
                child: SwipableStackEx(),
              ),
            ),
            Container(
              color: Colors.cyan,
              child: Center(
                child: Text("Hi")
                //child: StackedCards(title: "Test"),
              ),
            ),
            Container(
              color: Colors.deepPurple,
              child: Center(
                //child: EasySearchApp(),
                child: Text("Hi")
              ),
            ),
          ],
        ),
      ),
     
    ],
  );

                  },
                );
        },
      )),

    ])));
    
    /* 
    Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back_ios),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
        title: Card(
          child: TextField(
            decoration: InputDecoration(
                prefixIcon: Icon(Icons.search), hintText: 'Search...'),
            onChanged: (val) {
              setState(() {
                name = val;
              });
            },
          ),
        ),
      ),
      body: StreamBuilder<QuerySnapshot>(
        stream: (name != "" && name != null)
            ? FirebaseFirestore.instance
                .collection('stories')
                .where("tags", arrayContains: name)
                .snapshots()
            : FirebaseFirestore.instance.collection("stories").snapshots(),
        builder: (context, snapshot) {
          return (snapshot.connectionState == ConnectionState.waiting)
              ? Center(child: CircularProgressIndicator())
              : ListView.builder(
                  //itemCount: snapshot.data.docs.length,
                  itemCount: 1,
                  itemBuilder: (context, index) {
                    DocumentSnapshot data = snapshot.data.docs[index];

/*
                    return SwipeDetector(
    child: Center(child: AnimatedContainer(
      duration: Duration(milliseconds: 500),
      curve: Curves.easeOutQuint,
      margin: EdgeInsets.only(top: 5, bottom: 50, right: 30),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),

        //boxShadow: [BoxShadow(color: Colors.black87, blurRadius: blur, offset: Offset(offset, offset))]
      ),
      child: Center(
          child: Text('title', style: TextStyle(fontSize: 40, color: Colors.white))
        )
    )), //You Widget Tree here,
    onSwipeUp: () {
      print("Swipe Up");
        setState(() {
            _swipeDirection = "Swipe Up";
        });
    },
    onSwipeDown: () {
      print("Swipe Down");
        setState(() {
            _swipeDirection = "Swipe Down";
        });
    },
    onSwipeLeft: () {
      print("Swipe Left");
      setState(() {
        _swipeDirection = "Swipe Left";
      });
    },
    onSwipeRight: () {
      print("Swipe Right");
      setState(() {
        _swipeDirection = "Swipe Right";
      });
    },
);
*/

                    //return SwipeDet();
                    //return SizedBox(width: 400, height: 500, child: SwipeStack(children: ["test", "test"]));
                    //return SizedBox(width: 400, height: 500, child: SwipableStackEx());
                    /*
                    return Stack( children: [
                      
                      SizedBox(width: 400, height: 500, child: StackedCards(title: "Test")),
                      SizedBox(width: 400, height: 500, child: StackedCards(title: "Test"))
                    ]
                      );
                      */
                    return Column(
    children: <Widget>[
      Container(
        height: 300,
        child: IndexedStack(
          index: _index,
          children: <Widget>[
            Container(
              color: Colors.pink,
              child: Center(
                child: SwipableStackEx(),
              ),
            ),
            Container(
              color: Colors.cyan,
              child: Center(
                child: StackedCards(title: "Test"),
              ),
            ),
            Container(
              color: Colors.deepPurple,
              child: Center(
                child: Text('Page 3'),
              ),
            ),
          ],
        ),
      ),
      Row(
        mainAxisSize: MainAxisSize.max,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          FlatButton(
            onPressed: () {
              if (_index <= 0) return;
              setState(() {
                _index -= 1;
              });
            },
            child: Text(
              "Prev",
            ),
          ),
          FlatButton(
            onPressed: () {
              if (_index >= 2) return;
              setState(() {
                _index += 1;
              });
            },
            child: Text(
              "Next",
            ),
          )
        ],
      )
    ],
  );
                    //return SizedBox(width: 400, height: 100, child: TikTokScroller());
                    /*
                    Card(
                      child: Row(
                        children: <Widget>[
                          Image.network(
                            data['img'],
                            width: 150,
                            height: 100,
                            fit: BoxFit.fill,
                          ),
                          SizedBox(
                            width: 25,
                          ),
                          Text(
                            data['title'],
                            style: TextStyle(
                              fontWeight: FontWeight.w700,
                              fontSize: 20,
                            ),
                          ),
                        ],
                      ),
                    );
                  */
                  },
                );
        },
      ),
    );
    */
  }

}

class CondShow extends StatefulWidget {
  @override
  CondShowState createState() {
    return new CondShowState();
  }
}

class CondShowState extends State<CondShow> {
  bool pressed = false;

  @override
  Widget build(BuildContext context) {
    return  ListView(
        children: <Widget>[
          pressed ? Text("test") : SizedBox(),
          RaisedButton(
            child: Text("show text"),
            onPressed: () {
              setState(() {
                pressed = true;
              });
            },
          )
        ],
      );
    
  }
}