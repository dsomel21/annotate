import React, { useEffect, useState } from 'react';
import AnnotateString from './AnnotateString';

const Annotate = (props) => {
  const [text, setText] = useState(
    props.children.map((element) => ({
      key: element.key,
      text: element.props.children,
      child: element,
    }))
  );

  return (
    <>
      {text.map((line) => (
        <AnnotateString line={line} selectionType={props.selectionType} />
      ))}
    </>
  );
};

export default Annotate;