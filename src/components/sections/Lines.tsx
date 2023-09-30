import React from "react";
import Section from "../layout/Section";
import { useGameContext } from "../../providers";

const Lines: React.FC = () => {
  const { stats } = useGameContext();

  return <Section title="Lines">{stats.lines}</Section>;
};

export default Lines;
