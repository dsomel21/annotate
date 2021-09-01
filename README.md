# annotate
ReactJS tool for highlighting text 📝 (to help create annotations 💭) 

## Getting Started 
This is a WIP. I am trying to create a tool that can help me get information when highlight/selecting text. 

## Goal

* Create a component that we can wrap around text that we want to *annotate*

```jsx
<Wrapper>
  <p>The enemy soldiers repidly run towards the fort's entrance.</p>
  <p className="extra-bold">Kotha Singh and Madan Singh embody fortitude and fire their guns towards them.</p>
</Wrapper>
```
* When a piece of text is selected in the `Wrapper` child, we should be get back some important information: `selectedText`, `startIdx`, `endIdx`, `anchorNode`, etc.
* Optional argument to highlight the text (like with CSS)



## Similar OSS

There are other great tools that deserve a shout-out.

* [react-highlight-selection](https://github.com/dheerajsuthar/react-highlight-selection)
* [react-text-annotate](https://github.com/mcamac/react-text-annotate)
* [react-text-selection](https://github.com/aaronshaf/react-text-selection)