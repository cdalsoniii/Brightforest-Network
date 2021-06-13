import 'package:sentiment_dart/sentiment_dart.dart';
import 'package:http/http.dart';
import 'package:dio/dio.dart';
import 'dart:convert';


class Company {
  String? name;
  Company.fromJson(Map json)
  {
    this.name = json['name'];
  }
}

Future  getFruit() async {
  var dio = Dio();
  final response = await dio.get('https://google.com');
  print(response.data);

  return response.data;
}


Future<void> getWitAI() async {
  // Wit.AI
//final wit = Wit(accessToken: 'VYZDBKVHWOPHWE5QB3XOG6NBSUF4GBJF');

//dynamic response = await wit.message("Hello");
print("response: ");
//print(response);
}

Future<void> sentimentAnalysis() async {

   final sentiment = Sentiment();
  var customLang = {'i': 1, 'love': 1, 'dart': 5, 'car': 2};
  print(sentiment.analysis('i love dart', customLang: customLang));

  print(sentiment.analysis('i hate you piece of shit 💩'));

  print(sentiment.analysis('i hate you piece of shit 💩', emoji: true));

  print(sentiment.analysis('ti odio un pezzo di merda 💩', languageCode: 'it'));

  print(sentiment.analysis('ti odio un pezzo di merda 💩',
      emoji: true, languageCode: 'it'));

  print(sentiment.analysis('je te déteste merde 💩', languageCode: 'fr'));

  print(sentiment.analysis('je te déteste merde 💩',
      emoji: true, languageCode: 'fr'));

}