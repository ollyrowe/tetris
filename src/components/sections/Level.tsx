import React from "react";
import Section from "../layout/Section";
import { useGameContext } from "../../providers";

const Level: React.FC = () => {
  const { status, stats } = useGameContext();

  return (
    <Section title="Level">{status === "idle" ? "-" : stats.level}</Section>
  );
};

export default Level;
