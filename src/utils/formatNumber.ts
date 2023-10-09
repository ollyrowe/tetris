
/**
 * Converts a number to a string with commas.
 */
export const formatNumber = (number: number) => {
    return number
      .toString()
      .split("")
      .reverse()
      .map((digit, index) => {
        if (index % 3 === 0 && index !== 0) {
          return digit + ",";
        }
  
        return digit;
      })
      .reverse()
      .join("");
  };
  