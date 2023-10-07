import React from "react";
import Section from "../layout/Section";
import { useGameContext } from "../../providers";

const Lines: React.FC = () => {
  const { status, stats } = useGameContext();

  return (
    <Section title="Lines">{status === "idle" ? "-" : stats.lines}</Section>
  );
};

export default Lines;
