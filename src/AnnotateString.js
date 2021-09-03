import React, { useState } from 'react';

const AnnotateString = (props) => {
  if (props) console.log('props.selectionType', props.selectionType);

  const [selectionType, setSelectionType] = useState(props.selectionType || 'FULL_STRING');
  //  /\r|\n/
  const containsLineBreak = (text) => /\r|\n/.exec(text) !== null;

  const NON_VALUE_CHARS = [' ', ',', '.', ';', '?'];
  const startsEmpty = (text) => NON_VALUE_CHARS.includes(text[0]);
  const endsEmpty = (text) => NON_VALUE_CHARS.includes(text[text.length - 1]);
  const charIsEmpty = (char) => NON_VALUE_CHARS.includes(char);

  const isBeginningOfWord = (str, index) => {
    if (index <= 0 || str[index - 1]) return true;
  };

  const onMouseUpHandler = (e) => {
    const selectionObj = window.getSelection && window.getSelection();
    if (!selectionObj.toString()) return;
    const anchorNode = selectionObj.anchorNode;
    const focusNode = selectionObj.focusNode;
    const anchorOffset = selectionObj.anchorOffset;
    const focusOffset = selectionObj.focusOffset;
    const position = anchorNode.compareDocumentPosition(focusNode);
    let forward = false;

    console.log('selectionType is: ', selectionType);

    selectify(selectionObj);
  };

  // Modifies the existing window.Selection
  const selectify = (selectionObj) => {
    const { anchorNode, anchorOffset, focusOffset } = selectionObj;
    const { wholeText } = anchorNode;
    const selectionText = selectionObj.toString();
    switch (selectionType) {
      case 'FULL_STRING':
        selectionObj.extend(anchorNode, anchorNode.textContent.length);
        // Selects everything to the LEFT of the beginning of the paragraph
        selectionObj.modify('extend', 'left', 'paragraphboundary');
        break;
      case 'FULL_WORDS': // No trailing, preceding whitespace, punctuation
        let leftOffset = anchorOffset;
        let rightOffset = focusOffset;
        if (startsEmpty(selectionText)) {
          // Move the leftOffset forward, because there may be preceding whitespace, punctuation, etc.
          while (charIsEmpty(wholeText[leftOffset])) leftOffset++;
        } else if (leftOffset > 0) {
          // Move the leftOffset back, because there may be letters towards the left of it
          while (!charIsEmpty(wholeText[leftOffset - 1]) && leftOffset > 0) leftOffset--;
        }

        if (endsEmpty(selectionText)) {
          // Move the rightOffset back, because there may be TRAILING whitespace, punctuation, etc.
          while (charIsEmpty(wholeText[rightOffset])) rightOffset--;
        } else if (rightOffset < wholeText.length) {
          while (!charIsEmpty(wholeText[rightOffset + 1]) && rightOffset < wholeText.length)
            rightOffset++;
        }

        debugger;
        let range = document.createRange();
        range.setStart(anchorNode, leftOffset);
        range.setEnd(anchorNode, Math.min(rightOffset + 1, wholeText.length));
        selectionObj.removeAllRanges();
        selectionObj.addRange(range);
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
        lineid: props.line.key,
        onMouseUp: onMouseUpHandler,
        onMouseDown: onMouseUpHandler,
      })}
    </>
  );
};

export default AnnotateString;
