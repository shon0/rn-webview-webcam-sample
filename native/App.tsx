import React, {useEffect} from 'react';
import {Linking, Alert, Platform, SafeAreaView} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {WebView} from 'react-native-webview';

const url = 'https://rn-webview-webcam-sample.vercel.app/';

const App = () => {
  const openLink = async () => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        Alert.alert(JSON.stringify(result));
      } else Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      openLink();
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        source={{uri: url}}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
      />
    </SafeAreaView>
  );
};

export default App;
