/**
 * Representa una entrada en el historial de cálculos
 */
export interface CalculationHistory {
  /** Identificador único de la entrada */
  id: string;
  /** Expresión matemática completa (ej: "150 + 25") */
  expression: string;
  /** Resultado del cálculo */
  result: string;
  /** Timestamp de cuando se calculó */
  timestamp: Date;
}
