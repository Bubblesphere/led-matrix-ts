export class Exception {
  static throwOnNull(value: any, valueDescription: string) {
    if (value == null) {
      throw `${valueDescription} property cannot be set to null`;
    }
  }

  static throwIfNegative(value: number, valueDescription: string) {
    if (value < 0) {
      throw `${valueDescription} property cannot be set to a negative number (${value})`;
    }
  }

  static getDescriptionForProperty(className: string, methodName: string){
    return `${className}'s ${methodName}`;
  }
}