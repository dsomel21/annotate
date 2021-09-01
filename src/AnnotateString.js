import React, { useState } from 'react';

const AnnotateString = (props) => {
  const [selectionType, setSelectionType] = useState(
    props.selectionType || 'FULL_STRING'
  );

  const onMouseUpHandler = (e) => {
    const selectionObj = window.getSelection && window.getSelection();
    const selection = selectionObj.toString();
    if (!selection) return;
    const anchorNode = selectionObj.anchorNode;
    const focusNode = selectionObj.focusNode;
    const anchorOffset = selectionObj.anchorOffset;
    const focusOffset = selectionObj.focusOffset;
    const position = anchorNode.compareDocumentPosition(focusNode);
    let forward = false;

    console.log('selectionType is: ', selectionType);
    debugger;
    highlight(selectionObj);
  };

  const highlight = (selectionObj) => {
    switch (selectionType) {
      case 'FULL_STRING':
        selectionObj.modify('extend', 'left', 'paragraphboundary');
        selectionObj.modify('extend', 'right', 'paragraphboundary');
        break;
      default:
        selectionObj.modify('extend', 'left', 'paragraphboundary');
        selectionObj.modify('extend', 'right', 'paragraphboundary');
        break;
    }
  };

  return (
    <>
      {React.cloneElement(props.line.child, {
        lineId: props.line.key,
        onMouseUp: onMouseUpHandler,
      })}
    </>
  );
};

export default AnnotateString;
