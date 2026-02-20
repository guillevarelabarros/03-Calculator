import { useState } from 'react';


export const useCalculator = () => {

  const [ number, setNumber ] = useState( '0' );


  // Limpia la calculadora
  const clean = () => {
    setNumber('0')
  }


  const toggleSign = () => {
    if ( number.includes( '-' ) ) {
      return setNumber(number.replace('-', ''))
    }
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

  return {
    // Properties
    number,

    // Methods
    buildNumber,
    toggleSign,
    clean,
    deleteOperation
  };
};
 
