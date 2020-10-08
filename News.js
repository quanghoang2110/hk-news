import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions, SafeAreaView} from 'react-native';
import HTML from 'react-native-render-html';
import {ScrollView} from 'react-native-gesture-handler';

export default function News({navigation, route}) {
  console.log(route);

  useEffect(() => {
    const title = route.params ? route.params.title : 'Tin nông vụ';
    navigation.setOptions({title});
  }, [navigation, route]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <ScrollView style={styles.scrollView}>
          <HTML
            uri={`https://app-news.starlingtech.work/app-news/read?uri=${route.params.uri}`}
            imagesMaxWidth={Dimensions.get('window').width}
            tagsStyles={tagsStyles}
            classesStyles={classesStyles}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const tagsStyles = {
  p: {paddingHorizontal: 15, paddingVertical: 7},
  figcaption: {paddingHorizontal: 15, paddingVertical: 7},
  img: {
    marginBottom: 10,
    marginTop: 15,
  },
  figure: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 30,
  },
};

const classesStyles = {
  'article-embeded-caption': {
    marginBottom: 30,
    fontStyle: 'italic',
    padding: 10,
  },
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  fillRow: {
    flex: 1,
    backgroundColor: 'green',
  },
  item: {
    flex: 1,
    width: '100%',
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: 28,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
