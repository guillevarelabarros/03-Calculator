
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { colors, styles } from '../../config/theme/app-theme';
import { CalculatorButton } from '../components/CalculatorButton';
import { useCalculator } from '../hooks/useCalculator';

// Enum local para comparación (debe coincidir con el del hook)
enum Operator {
  add,
  subtract,
  multiply,
  divide,
}

export const CalculatorScreen = () => {

  const { 
    formattedNumber,
    displayExpression,
    history,
    activeOperator,
    buildNumber, 
    toggleSign, 
    clean, 
    deleteOperation,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    percentOperation,
    calculateResult 
  } = useCalculator();


  return (
    <View style={ styles.calculatorContainer }>

      {/* Historial de cálculos */}
      {history.length > 0 && (
        <ScrollView style={ styles.historyContainer }>
          {history.slice(0, 10).reverse().map((item) => (
            <Text key={item.id} style={ styles.historyItem }>
              {item.expression} = {item.result}
            </Text>
          ))}
        </ScrollView>
      )}

      {/* Display de números */}
      <View style={{paddingHorizontal: 30, paddingBottom: 20}}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={ styles.mainResult }>{ formattedNumber }</Text>
        <Text 
          adjustsFontSizeToFit
          numberOfLines={1}
          style={ styles.subResult}>{ displayExpression }</Text>
      </View>

      <View style={ styles.row}>
        <CalculatorButton onPress={ clean } label='C' blackText color={colors.lightGray}/>
        <CalculatorButton onPress={ toggleSign } label='+/-' blackText color={colors.lightGray} />
        <CalculatorButton onPress={ percentOperation } label='%' blackText color={colors.lightGray} />
        <CalculatorButton 
          onPress={ divideOperation } 
          label='/'
          isActive={activeOperator === Operator.divide}
          color={colors.orange} 
        />
      </View>
      <View style={ styles.row}>
        <CalculatorButton onPress={ ()=> buildNumber('7') } label='7' color={colors.darkGray}/>
        <CalculatorButton onPress={ ()=> buildNumber('8') } label='8' color={colors.darkGray} />
        <CalculatorButton onPress={ ()=> buildNumber('9') } label='9' color={colors.darkGray} />
        <CalculatorButton 
          onPress={ multiplyOperation } 
          label='x'
          isActive={activeOperator === Operator.multiply}
          color={colors.orange} 
        />
      </View>
      <View style={ styles.row}>
        <CalculatorButton onPress={ ()=> buildNumber('4') } label='4' color={colors.darkGray}/>
        <CalculatorButton onPress={ ()=> buildNumber('5') } label='5' color={colors.darkGray} />
        <CalculatorButton onPress={ ()=> buildNumber('6') } label='6' color={colors.darkGray} />
        <CalculatorButton 
          onPress={ subtractOperation } 
          label='-'
          isActive={activeOperator === Operator.subtract}
          color={colors.orange} 
        />
      </View>
      <View style={ styles.row}>
        <CalculatorButton onPress={ ()=> buildNumber('1') } label='1' color={colors.darkGray}/>
        <CalculatorButton onPress={ ()=> buildNumber('2') } label='2' color={colors.darkGray} />
        <CalculatorButton onPress={ ()=> buildNumber('3') } label='3' color={colors.darkGray} />
        <CalculatorButton 
          onPress={ addOperation } 
          label='+'
          isActive={activeOperator === Operator.add}
          color={colors.orange} 
        />
      </View>
      <View style={ styles.row}>
        <CalculatorButton onPress={ () => buildNumber('0') } label='0' doubleSize color={colors.darkGray}/>
        <CalculatorButton onPress={ () => buildNumber('.') } label='.' color={colors.darkGray} />
        <CalculatorButton onPress={ calculateResult } label='=' color={colors.orange} />
      </View>

    </View>
  );
};