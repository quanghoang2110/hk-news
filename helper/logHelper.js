import Reactotron from 'reactotron-react-native';

function logThis(str1, ...str2) {
  Reactotron.log(str1, ...str2);
}

/**
 * custom console log
 * chi show log khi trang thai la DEBUG (=true)
 *
 * @memberof AppComponent
 */
export const consoleLog = (str1, ...str2) => {
  // console.log(settings.FOR_DEV, 'logEnabled');
  logThis(' --------- --------------- -------------- ----------');
  if (str2) {
    logThis(str1, ...str2);
  } else {
    logThis(str1);
  }
  logThis('----------------------------------------------------');
};
