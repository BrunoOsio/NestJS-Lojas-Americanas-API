import { isDeepStrictEqual } from "util";

function checkIfIsDuplicated<T>(itemsArray: T[], item: T): boolean {
  const isDuplicated = itemsArray.some(
    (itemOnArray) => 
      isDeepStrictEqual(itemOnArray, item)
  );

  return isDuplicated
}

export default checkIfIsDuplicated;