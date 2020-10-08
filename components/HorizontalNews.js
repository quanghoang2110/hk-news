import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Ripple from 'react-native-material-ripple';
import axios from 'axios';

function getImage(uri, imgHeight) {
  return (
    <View style={{width: 160, height: 90}}>
      <Image
        source={{uri}}
        defaultSource={require('../assets/noImageLarge.jpg')}
        resizeMode={'contain'}
        style={styles.imgFull}
      />
    </View>
  );
}

export function HorizontalNews({
  navigation,
  uri,
  itemWidth,
  imgHeight,
  numColumns,
}) {
  const [loading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get('https://app-news.starlingtech.work/app-news', {params: {uri}})
      .then(({data}) => {
        setIsLoading(false);
        // consoleLog(data);
        setList(data);
      })
      .catch((error) => error);
  }, [uri]);

  const renderItem = ({item}) => {
    const imgUri = item.img;
    return (
      <Ripple
        style={{width: 160, marginHorizontal: 5, backgroundColor: 'white'}}
        onPress={() =>
          navigation.navigate('News', {uri: item.uri, title: item.title})
        }>
        {(imgUri && getImage(imgUri, imgHeight)) || null}
        <View style={styles.itemContent}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
        </View>
      </Ripple>
    );
  };

  return (
    <View style={styles.root}>
      {(loading && (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.loading}>Loading...</Text>
        </View>
      )) || (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={list}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

const sWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  imgFull: {width: null, height: null, flex: 1},
  root: {paddingVertical: 10},
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  loading: {textAlign: 'center', marginTop: 10, color: '#999'},
  date: {color: '#666', marginVertical: 7, fontStyle: 'italic'},
  title: {color: '#000', fontWeight: '600'},
  description: {color: '#111'},
  item: {
    marginHorizontal: 5,
    marginVertical: 3,
    backgroundColor: '#FFF',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  itemContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
