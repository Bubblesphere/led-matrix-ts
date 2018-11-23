export class Exception {
  static throwIfNull(value: any, valueDescription: ExceptionValueDescription) {
    if (value == null) {
      throw `${valueDescription} property cannot be set to null`;
    }
  }

  static throwIfNegative(value: number, valueDescription: ExceptionValueDescription) {
    if (value < 0) {
      throw `${valueDescription} property cannot be set to a negative number (${value})`;
    }
  }

  static throwIfNotBetween(value: number, valueDescription: ExceptionValueDescription, rangeFrom: number, rangeTo: number) {
    if(value < rangeFrom || value > rangeTo) {
      throw `Seek expects a value between ${rangeFrom} and ${rangeTo}`;
    }
  }

  static getDescriptionForProperty(className: string, methodName: string): ExceptionValueDescription {
    return `${className}'s ${methodName}`;
  }
}

export type ExceptionValueDescription = string;