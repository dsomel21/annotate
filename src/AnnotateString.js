import React, { useState } from 'react';

const AnnotateString = props => {
  if (props) console.log('props.selectionType', props.selectionType);

  const [selectionType, setSelectionType] = useState(props.selectionType || 'FULL_STRING');

  const containsLineBreak = text => /\r|\n/.exec(text) !== null;

  const NON_VALUE_CHARS = [' ', ',', '.', ';', '?'];
  const startsEmpty = text => NON_VALUE_CHARS.includes(text[0]);
  const endsEmpty = text => NON_VALUE_CHARS.includes(text[text.length - 1]);
  const charIsEmpty = char => NON_VALUE_CHARS.includes(char);

  const onMouseUpHandler = e => {
    const selObj = window.getSelection && window.getSelection();
    if (!selObj.toString()) return;

    const finalSelObj = selectify(selObj);
    return {
      getSelection: finalSelObj,
      selectedText: finalSelObj.toString(),
      range: [finalSelObj.anchorOffset, finalSelObj.focusOffset],
      wholeText: finalSelObj.anchorNode.wholeText,
      target: e.target,
    };
  };

  /* NOTE: Selection.modify is not fully supported */
  const highlightFullLine = selObj => {
    const { anchorNode } = selObj;
    selObj.extend(anchorNode, anchorNode.textContent.length);
    // Selects everything to the LEFT of the beginning of the paragraph
    selObj.modify('extend', 'left', 'paragraphboundary');
  };

  /* 
    NOTE: The purpose of this method is to carefully SELECT the full words
    form the window.getSelection(). If will trim away any NON_VALUE_CHARS
    and may increase the characters on the LEFT or RIGHT if necessary to 
    complete the word. 

    NOTE: There is sometimes weird behaviour if the sentence has periods.
    For some reason, the anchorNode does not include ALL the text
  */
  const highlightFullWords = selObj => {
    const { anchorNode, anchorOffset, focusOffset } = selObj;
    const { wholeText } = anchorNode;
    const selectionText = selObj.toString();
    let leftOffset = anchorOffset;
    let rightOffset = focusOffset - 1;

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
      // Move the rightOffset forward, because there may be letters to the right of it
      while (!charIsEmpty(wholeText[rightOffset + 1]) && rightOffset < wholeText.length)
        rightOffset++;
    }

    // Change the Selection on the Browser
    const range = document.createRange();
    range.setStart(anchorNode, leftOffset);
    range.setEnd(anchorNode, Math.min(rightOffset + 1, wholeText.length));
    selObj.removeAllRanges();
    selObj.addRange(range);
  };

  // Modifies the existing window.Selection
  const selectify = selObj => {
    switch (selectionType) {
      case 'FULL_STRING':
        highlightFullLine(selObj);
        break;
      case 'FULL_WORDS': // No trailing, preceding whitespace, punctuation
        highlightFullWords(selObj);
        break;
      default:
        selObj.modify('extend', 'left', 'paragraphboundary');
        selObj.modify('extend', 'right', 'paragraphboundary');
        break;
    }
    return window.getSelection();
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
