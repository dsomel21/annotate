import React from 'react';

const AnnotateString = (props) => {
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  console.log(props);

  const onMouseUpHandler = (e) => {
    const selectionObj = window.getSelection && window.getSelection();
    const selection = selectionObj.toString();
    const anchorNode = selectionObj.anchorNode;
    const focusNode = selectionObj.focusNode;
    const anchorOffset = selectionObj.anchorOffset;
    const focusOffset = selectionObj.focusOffset;
    const position = anchorNode.compareDocumentPosition(focusNode);
    let forward = false;

    debugger;
  };

  return (
    <>
      {React.cloneElement(props.line.child, {
        onMouseUp: onMouseUpHandler,
      })}
    </>
  );
};

export default AnnotateString;
