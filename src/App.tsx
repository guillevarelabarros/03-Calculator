

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { CalculatorScreen } from './presentation/screens/CalculatorScreen';
import { styles } from './config/theme/app-theme';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <View style={styles.background}>
        <StatusBar 
          barStyle="light-content"
          backgroundColor="#000000"
          translucent={false}
        />
        <CalculatorScreen />
      </View>
    </SafeAreaProvider>
  );
}


export default App;
