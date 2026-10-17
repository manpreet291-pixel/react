import React from "react";
import ReactDOM from "react-dom/client";

const parent = React.createElement("div", { id: "parent" }, [
    React.createElement("div", { id: "child" },
        [React.createElement("h1", {}, "I am h1 tag"), React.createElement("h2", {}, "I am h2 tag")]),
    React.createElement("div", { id: "child2" },
        [React.createElement("h1", {}, "I am h1 tag"), React.createElement("h2", {}, "I am h2 tag")])
]);

const jsxheading = (<h1 id="heading" className="head">H1 tag via JSX</h1>);

const Title = () => (
    <h1 className="heading">H1 tag via Title compoonent</h1>
);
const number = 10000;
const HeadingCompnent =  () => (
    <div id="container">
        {number}
        <Title />
        <h1>H1 tag functional component</h1>
    </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(jsxheading);

root.render(<HeadingCompnent />);