import React, { useEffect, useState } from 'react';
import AnnotateString from './AnnotateString';

const Annotate = props => {
  const [text, setText] = useState(
    props.children.map(element => ({
      key: element.key,
      text: element.props.children,
      child: element,
    }))
  );

  return (
    <div className={`${props.selectionType}`}>
      {text.map(line => (
        <AnnotateString
          key={line.key}
          line={line}
          selectionType={props.selectionType}
          onSelectString={props.onSelect}
        />
      ))}
    </div>
  );
};

export default Annotate;
