# react
# episode-01
# episode-02
- npm init
- npm install -d parcel
- npm install
- npx parcel index.html
- npm install react
- npm i react-dem 

# episode-03
- JSX java script syntax which is easiest to create react element or Mix of HTMl and javascript. JSX is not HTML its look like HTML syntax
# const jsxheading = <h1>hello</h1>,
- Javascript code understand JS engine but JS engine not understand JSX code because Js engine understand ES6 or ECMA script - Parcel doing this. JSX transpiles (convert by parcel=>babel) before it reach the js engine
- Babel is javascript compiler. if need to give atteibute to JSX we need to used camel case
- React Component is baiscally javascript fuinction => Two type of component 
- 1.class base component => old way
- 2.Functional component => New Way 
- Function return React element know as functional element.
- const HeadingComponent = () => { return <h1>Hello</h1> }
- Component Composition using component between component like <Fn2 />, {Fn2} , <Fn2></Fn2> 