/**
 * Formatea un número para mostrar con separadores de miles y límite de decimales
 * @param value - El número en formato string
 * @returns El número formateado con separadores de miles
 */
export const formatNumber = ( value: string ): string => {
  // Si es '0' o vacío, retornar como está
  if ( !value || value === '0' || value === '-0' ) return value;

  // Separar signo, parte entera y decimal
  const isNegative = value.startsWith( '-' );
  const absoluteValue = isNegative ? value.substring( 1 ) : value;

  const [ integerPart, decimalPart ] = absoluteValue.split( '.' );

  // Convertir a número para verificar si es muy grande
  const numValue = Number( absoluteValue );

  // Si el número es muy grande (> 999,999,999), usar notación científica
  if ( numValue > 999999999 ) {
    return ( isNegative ? -numValue : numValue ).toExponential( 6 );
  }

  // Agregar separadores de miles
  const formattedInteger = integerPart.replace( /\B(?=(\d{3})+(?!\d))/g, ',' );

  // Limitar decimales a 10 dígitos
  let formattedDecimal = decimalPart;
  if ( decimalPart ) {
    formattedDecimal = decimalPart.substring( 0, 10 );
    // Eliminar ceros finales innecesarios
    formattedDecimal = formattedDecimal.replace( /0+$/, '' );
  }

  // Construir número final
  let result = formattedInteger;
  if ( formattedDecimal && formattedDecimal.length > 0 ) {
    result += '.' + formattedDecimal;
  }

  return isNegative ? '-' + result : result;
};

/**
 * Obtiene el símbolo visual del operador
 * @param operator - El operador enum
 * @returns El símbolo como string (+, -, ×, /)
 */
export const getOperatorSymbol = ( operator: number ): string => {
  switch ( operator ) {
    case 0: // add
      return '+';
    case 1: // subtract
      return '-';
    case 2: // multiply
      return '×';
    case 3: // divide
      return '÷';
    default:
      return '';
  }
};
