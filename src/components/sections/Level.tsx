import React from "react";
import Section from "../layout/Section";

interface Props {
  level: number;
}

const Level: React.FC<Props> = ({ level }) => {
  return <Section title="Level">{level}</Section>;
};

export default Level;
