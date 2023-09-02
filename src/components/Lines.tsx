import React from "react";
import Section from "./Section";

interface Props {
  lines: number;
}

const Lines: React.FC<Props> = ({ lines }) => {
  return <Section title="Lines">{lines}</Section>;
};

export default Lines;
