import React from "react";
import Section from "../layout/Section";
import { useGameContext } from "../../providers";

const Level: React.FC = () => {
  const { stats } = useGameContext();

  return <Section title="Level">{stats.level}</Section>;
};

export default Level;
