import React from "react";
import ReactDOM from "react-dom/client";

// const heading = React.createElement(
//   "h1",
//   { id: "heading", xyz: "abc" },
//   "Hello World from React!"
// );

// const parent = React.createElement(
//   "div",
//   { id: "parent" },
//   React.createElement("div", { id: "child" }, [
//     React.createElement("h1", {}, "I am h1 tag from nested"),
//     React.createElement("h2", {}, "I am h2 nested"),
//   ]),
//   React.createElement("div", { id: "child2" }, [
//     React.createElement("h1", {}, "I am h1 tag from nested"),
//     React.createElement("h2", {}, "I am h2 nested"),
//   ])
// );

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(parent);

// React Element

/* 
React Element
*/
const heading = React.createElement(
  "div",
  { id: "heading" },
  React.createElement("h1", { id: "heading" }, "Namste React"),
  React.createElement("h1", { id: "heading" }, "Namste React")
);
// console.log(heading); // It is JS object

// JSX = it is HTML/XML like structure
// jsx is transpiled by Parcel - with the help by Bable before it reaches to JS
//JSX => React.crateElement => ReactElement => JS object

const jsxHeading = <h1 id="heading">Namaste React from JSX</h1>;
// console.log(jsxHeading); it is also JS object

// React Components

// functional Components

const Title = () => (
  <>
    <h1 className="title">Namaste React Title</h1>
    <h3> Sub Title</h3>
  </>
);

// COMPONENTS COMPOSITION => if we use another components in other components that is called components composition
const HeadingComponents = () => (
  <div>
    <Title />
    <h3>Functional Components</h3>;
  </div>
);

console.log(HeadingComponents);

const root = ReactDOM.createRoot(document.getElementById("root"));

// this is how we render reactelement
// root.render(jsxHeading);

// This is how we render Functional Components
root.render(<HeadingComponents />);
