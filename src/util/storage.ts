import { estimation } from "../types/estimations";

class Storage {
  constructor() {
    const localValue = localStorage.getItem("items") || "[]";
    if (!localValue) {
      this.cleanItems();
    }
  }

  getItems(): estimation[] {
    const localValue = localStorage.getItem("items") || "[]";
    return JSON.parse(localValue);
  }

  pushItem(validatedValue: estimation): estimation[] {
    const localValue = localStorage.getItem("items") || "[]";
    const array = JSON.parse(localValue);
    array.push(validatedValue);
    localStorage.setItem("items", JSON.stringify(array));
    return array;
  }

  changeItem(validatedValue: estimation, index: number): estimation[] {
    const localValue = localStorage.getItem("items") || "[]";
    const array = JSON.parse(localValue);
    array[index] = validatedValue;
    localStorage.setItem("items", JSON.stringify(array));
    return array;
  }

  cleanItems() {
    localStorage.setItem("items", "[]");
  }
}
export default new Storage();
