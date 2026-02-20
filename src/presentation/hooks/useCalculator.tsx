import { useState, useRef } from 'react';
import { formatNumber, getOperatorSymbol } from '../../utils/formatter';
import { CalculationHistory } from '../../types/calculator.types';

enum Operator { 
  add,
  subtract,
  multiply,
  divide,
}


export const useCalculator = () => {

  const [ number, setNumber ] = useState( '0' );
  const [ previusNumber, setPreviusNumber ] = useState( '0' );
  const [ history, setHistory ] = useState<CalculationHistory[]>([]);
  const [ activeOperator, setActiveOperator ] = useState<Operator | undefined>(undefined);

  const lastOperation = useRef<Operator | undefined>(undefined);


  // Limpia la calculadora
  const clean = () => {
    setNumber('0');
    setPreviusNumber('0');
    lastOperation.current = undefined;
    setActiveOperator(undefined);
  }


  const toggleSign = () => {
    if ( number.includes( '-' ) ) {
      return setNumber(number.replace('-', ''));
    }
    
    setNumber('-' + number);
  }

  // Borrar el último número
  const deleteOperation = () => {
    let currentSign = '';
    let temporalNumber = number;

    if ( number.includes( '-' ) ) {
      currentSign = '-';
      temporalNumber = number.substring( 1 );
      
      if ( temporalNumber.length > 1 ) {
        return setNumber(currentSign + temporalNumber.slice(0,-1));
      }
      
      return setNumber('0');
    }

    // Para números positivos
    if ( temporalNumber.length > 1 ) {
      return setNumber(temporalNumber.slice(0, -1));
    }
    
    setNumber('0');
  }




  const buildNumber = ( numberString: string ) => {

    if ( number.includes( '.' ) && numberString === '.' ) return;
    
    if ( number.startsWith( '0' ) || number.startsWith( '-0' ) ) {
      
      // Punto decimal.
      if ( numberString === '.' ) {
        return setNumber (number + numberString)
      }

      // Evaluar si es otro 0 y no hay punto

      if ( numberString === '0' && number.includes( '.' ) ) {
        return setNumber( number + numberString );
      }

      // Evaluar si es diferente de cero, no hay punto decimimal, y es el primer punto.
      if ( numberString !== '0' && number.includes( '' ) ) {
        return setNumber (numberString)
       }


      // Evitar el 000000

      if ( numberString === '0' && !number.includes( '.' ) ) {
        return;
      }
      ;



    }

    setNumber( number + numberString );

  }

  const setLastNumber = () => {
    if (number.endsWith('.')) {
      setPreviusNumber(number.slice(0, -1));
    } else {
      setPreviusNumber(number);
    }
    setNumber('0');
  };

  // Helper para calcular el resultado de una operación
  const calculateSubResult = (): number => {
    const num1 = Number(previusNumber);
    const num2 = Number(number);

    if (!lastOperation.current) return num2;

    switch (lastOperation.current as Operator) {
      case Operator.add:
        return num1 + num2;
      
      case Operator.subtract:
        return num1 - num2;
      
      case Operator.multiply:
        return num1 * num2;
      
      case Operator.divide:
        if (num2 === 0) return 0; // Evitar división por cero
        return num1 / num2;
      
      default:
        return num2;
    }
  };

  // Función genérica para manejar operaciones (elimina código duplicado)
  const setOperationHandler = (operator: Operator) => {
    if (lastOperation.current && previusNumber !== '0') {
      const result = calculateSubResult();
      setNumber(String(result));
      setPreviusNumber(String(result));
    } else {
      setLastNumber();
    }
    lastOperation.current = operator;
    setActiveOperator(operator);
  };

  // Operación de división
  const divideOperation = () => setOperationHandler(Operator.divide);

  // Operación de multiplicación
  const multiplyOperation = () => setOperationHandler(Operator.multiply);

  // Operación de resta
  const subtractOperation = () => setOperationHandler(Operator.subtract);

  // Operación de suma
  const addOperation = () => setOperationHandler(Operator.add);

  // Operación de porcentaje
  const percentOperation = () => {
    if (!lastOperation.current) {
      // Sin operación: dividir el número actual por 100
      const result = Number(number) / 100;
      setNumber(String(result));
    } else {
      // Con operación: calcular porcentaje del número anterior
      const percent = (Number(previusNumber) * Number(number)) / 100;
      setNumber(String(percent));
    }
  };

  // Calcular resultado final (botón =)
  const calculateResult = () => {
    if (!lastOperation.current) return;

    const result = calculateSubResult();
    const expression = `${previusNumber} ${getOperatorSymbol(lastOperation.current)} ${number}`;
    
    // Agregar al historial
    const newEntry: CalculationHistory = {
      id: Date.now().toString(),
      expression,
      result: String(result),
      timestamp: new Date(),
    };
    
    setHistory(prev => [newEntry, ...prev].slice(0, 50)); // Límite de 50 entradas
    
    setNumber(String(result));
    setPreviusNumber('0');
    lastOperation.current = undefined;
    setActiveOperator(undefined);
  };

  // Computed properties para display
  const formattedNumber = formatNumber(number);
  
  const displayExpression = lastOperation.current 
    ? `${formatNumber(previusNumber)} ${getOperatorSymbol(lastOperation.current)}`
    : formatNumber(previusNumber);


  return {
    // Properties
    number,
    previusNumber,
    formattedNumber,
    displayExpression,
    history,
    activeOperator,

    // Methods
    buildNumber,
    toggleSign,
    clean,
    deleteOperation,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    percentOperation,
    calculateResult,
  };
};
 
