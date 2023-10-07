import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useHighScores = () => {
  const [scores, setScores] = useLocalStorage<number[]>("high-scores", []);

  const recordScore = useCallback(
    (score: number) => {
      // Append the score to the end of the scores array and sort it
      const updatedScores = [...scores, score].sort((a, b) => b - a);

      // Update the scores state with the top 5 scores
      setScores(updatedScores.slice(0, 5));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scores]
  );

  return { highScores: scores, recordScore };
};
