(self.webpackChunkgapstack=self.webpackChunkgapstack||[]).push([[179],{"./node_modules/@nrwl/webpack/src/utils/webpack/plugins/raw-css-loader.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[4].use[2]!./packages/docs/src/lib/imperative-render/main.css":module=>{module.exports=[[module.id,".modal-container {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n\n  background-color: rgba(0, 0, 0, 0.2);\n}\n\n.modal {\n  background-color: #99ffc7;\n  border-radius: 5px;\n  padding: 1rem;\n\n  margin-top: 0.5rem;\n\n  position: absolute;\n  top: 1rem;\n  right: 5rem;\n  left: 5rem;\n  bottom: 1rem;\n}\n\n.modal > h4 {\n  margin-top: 0;\n}\n\n.alert-container {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  left: 5px;\n  overflow: visible;\n\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n\n  pointer-events: none;\n}\n\n.alert-container > * {\n  pointer-events: all;\n}\n\n.alert {\n  background-color: #99f0ff;\n  border-radius: 5px;\n  padding: 1rem;\n\n  margin-top: 0.5rem;\n  width: 25rem;\n}\n\n.space > * {\n  margin-right: 0.5rem;\n}\n\n.positive {\n  background-color: green;\n}\n\n.negative {\n  background-color: orangered;\n}\n","",{version:3,sources:["/Users/nick/dev/reactils/packages/docs/src/lib/imperative-render/main.css"],names:[],mappings:"AAAA;EACE,kBAAkB;EAClB,MAAM;EACN,QAAQ;EACR,OAAO;EACP,SAAS;;EAET,oCAAoC;AACtC;;AAEA;EACE,yBAAyB;EACzB,kBAAkB;EAClB,aAAa;;EAEb,kBAAkB;;EAElB,kBAAkB;EAClB,SAAS;EACT,WAAW;EACX,UAAU;EACV,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,UAAU;EACV,SAAS;EACT,iBAAiB;;EAEjB,aAAa;EACb,mBAAmB;EACnB,sBAAsB;;EAEtB,oBAAoB;AACtB;;AACA;EACE,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;EACzB,kBAAkB;EAClB,aAAa;;EAEb,kBAAkB;EAClB,YAAY;AACd;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,uBAAuB;AACzB;;AACA;EACE,2BAA2B;AAC7B",sourcesContent:[".modal-container {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n\n  background-color: rgba(0, 0, 0, 0.2);\n}\n\n.modal {\n  background-color: #99ffc7;\n  border-radius: 5px;\n  padding: 1rem;\n\n  margin-top: 0.5rem;\n\n  position: absolute;\n  top: 1rem;\n  right: 5rem;\n  left: 5rem;\n  bottom: 1rem;\n}\n\n.modal > h4 {\n  margin-top: 0;\n}\n\n.alert-container {\n  position: absolute;\n  top: 5px;\n  right: 5px;\n  left: 5px;\n  overflow: visible;\n\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n\n  pointer-events: none;\n}\n.alert-container > * {\n  pointer-events: all;\n}\n\n.alert {\n  background-color: #99f0ff;\n  border-radius: 5px;\n  padding: 1rem;\n\n  margin-top: 0.5rem;\n  width: 25rem;\n}\n\n.space > * {\n  margin-right: 0.5rem;\n}\n\n.positive {\n  background-color: green;\n}\n.negative {\n  background-color: orangered;\n}\n"],sourceRoot:""}]]},"./packages/docs/src/lib/imperative-render.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,CloseSelf:()=>CloseSelf,Confirmation:()=>Confirmation,MultipleRenderers:()=>MultipleRenderers,Timed:()=>Timed,__namedExportsOrder:()=>__namedExportsOrder,default:()=>imperative_render_stories});__webpack_require__("./node_modules/core-js/modules/es.object.assign.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.description.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function make(Component,code,opts){var story=function story(){return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("p",{style:{marginTop:0},children:opts.description}),(0,jsx_runtime.jsx)(Component,{})]})};return story.storyName=opts.title,story.parameters={title:opts.title,docs:{title:opts.title,source:{code,language:"tsx",type:"auto"}}},story}__webpack_require__("./node_modules/core-js/modules/web.timers.js"),__webpack_require__("./node_modules/core-js/modules/es.array.map.js");var react=__webpack_require__("./node_modules/react/index.js");__webpack_require__("./node_modules/core-js/modules/es.array.slice.js"),__webpack_require__("./node_modules/core-js/modules/es.array.iterator.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.iterator.js");function ProvideMultiple(_ref2){var Providers=_ref2.Providers,children=_ref2.children,Provider=Providers[0],RemainingProviders=Providers.slice(1);return 0===RemainingProviders.length?(0,jsx_runtime.jsx)(Provider,{children}):(0,jsx_runtime.jsx)(Provider,{children:(0,jsx_runtime.jsx)(ProvideMultiple,{Providers:RemainingProviders,children})})}try{ProvideMultiple.displayName="ProvideMultiple",ProvideMultiple.__docgenInfo={description:"",displayName:"ProvideMultiple",props:{Providers:{defaultValue:null,description:"",name:"Providers",required:!0,type:{name:"FC<{ children: ReactNode; }>[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/imperative-render/src/lib/Providers.tsx#ProvideMultiple"]={docgenInfo:ProvideMultiple.__docgenInfo,name:"ProvideMultiple",path:"packages/imperative-render/src/lib/Providers.tsx#ProvideMultiple"})}catch(__react_docgen_typescript_loader_error){}var defaultAlertOptions={timeout:1500};function createHooks(contexts){function useRender(){return(0,react.useContext)(contexts.Render).render}return{useRender,useTimed:function useTimed(staticOptions){void 0===staticOptions&&(staticOptions={});var render=useRender(),cachedStaticOptions=(0,react.useState)(staticOptions)[0];return(0,react.useCallback)((function(model,renderOptions){void 0===renderOptions&&(renderOptions={});var opts=Object.assign({},defaultAlertOptions,cachedStaticOptions,renderOptions),destroy=render(model);setTimeout(destroy,opts.timeout)}),[cachedStaticOptions,render])}}}try{createHooks.displayName="createHooks",createHooks.__docgenInfo={description:"",displayName:"createHooks",props:{Render:{defaultValue:null,description:"",name:"Render",required:!0,type:{name:"React.Context<RenderContextType<Model>>"}},Elements:{defaultValue:null,description:"",name:"Elements",required:!0,type:{name:"React.Context<ElementsContextType>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/imperative-render/src/lib/hooks.tsx#createHooks"]={docgenInfo:createHooks.__docgenInfo,name:"createHooks",path:"packages/imperative-render/src/lib/hooks.tsx#createHooks"})}catch(__react_docgen_typescript_loader_error){}__webpack_require__("./node_modules/core-js/modules/es.object.keys.js");function createRoot(contexts){return function ImperativeRenderRoot(_ref){var _ref$container=_ref.container,container=void 0===_ref$container?(0,jsx_runtime.jsx)(react.Fragment,{}):_ref$container,elements=(0,react.useContext)(contexts.Elements);return 0===Object.keys(elements).length?null:react.cloneElement(container,{children:Object.keys(elements).map((function(key){return(0,jsx_runtime.jsx)(react.Fragment,{children:elements[key]},key)}))})}}try{createRoot.displayName="createRoot",createRoot.__docgenInfo={description:"",displayName:"createRoot",props:{Render:{defaultValue:null,description:"",name:"Render",required:!0,type:{name:"React.Context<RenderContextType<Model>>"}},Elements:{defaultValue:null,description:"",name:"Elements",required:!0,type:{name:"React.Context<ElementsContextType>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/imperative-render/src/lib/Root.tsx#createRoot"]={docgenInfo:createRoot.__docgenInfo,name:"createRoot",path:"packages/imperative-render/src/lib/Root.tsx#createRoot"})}catch(__react_docgen_typescript_loader_error){}function createInstance(options){var contexts=function createContexts(){return{Render:(0,react.createContext)({render:function render(){return console.error("ImperativeRender Context not initialised. Is the Provider at the top of your app?"),function(){}}}),Elements:(0,react.createContext)({})}}(),Provider=function createProvider(contexts,options){return function Provider(_ref){var children=_ref.children,counter=(0,react.useRef)(0),_useState=(0,react.useState)({}),elements=_useState[0],setElements=_useState[1],render=(0,react.useCallback)((function(request){var key="EL_"+counter.current++,destroy=function destroy(){setElements((function(els){var nextEls=Object.assign({},els);return delete nextEls[key],nextEls}))},model="function"==typeof request?request({destroy}):request;return setElements((function(els){var _Object$assign;return Object.assign({},els,((_Object$assign={})[key]=options.renderElement(model,{destroy}),_Object$assign))})),destroy}),[]),renderContextValue=(0,react.useMemo)((function(){return{render}}),[render]);return(0,jsx_runtime.jsx)(contexts.Render.Provider,{value:renderContextValue,children:(0,jsx_runtime.jsx)(contexts.Elements.Provider,{value:elements,children})})}}(contexts,options),hooks=createHooks(contexts),Root=createRoot(contexts);return Object.assign({},hooks,{Provider,Root})}function createMergedProvider(instances){var Providers=instances.map((function(i){return i.Provider}));return function Provider(props){return(0,jsx_runtime.jsx)(ProvideMultiple,{Providers,children:props.children})}}try{createInstance.displayName="createInstance",createInstance.__docgenInfo={description:"",displayName:"createInstance",props:{renderElement:{defaultValue:null,description:"",name:"renderElement",required:!0,type:{name:"RenderCallback<Model>"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/imperative-render/src/lib/index.tsx#createInstance"]={docgenInfo:createInstance.__docgenInfo,name:"createInstance",path:"packages/imperative-render/src/lib/index.tsx#createInstance"})}catch(__react_docgen_typescript_loader_error){}try{createMergedProvider.displayName="createMergedProvider",createMergedProvider.__docgenInfo={description:"",displayName:"createMergedProvider",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/imperative-render/src/lib/index.tsx#createMergedProvider"]={docgenInfo:createMergedProvider.__docgenInfo,name:"createMergedProvider",path:"packages/imperative-render/src/lib/index.tsx#createMergedProvider"})}catch(__react_docgen_typescript_loader_error){}var ImperativeRenderer=createInstance({renderElement:function renderElement(model,params){return(0,jsx_runtime.jsxs)("li",{children:["Element ",model.count]})}});function Component(){var counter=(0,react.useRef)(0),render=ImperativeRenderer.useRender();return(0,jsx_runtime.jsx)("button",{onClick:function onClick(){var count=counter.current++,destroy=render({count});setTimeout(destroy,1e3)},children:"Add Element for 1000ms"})}var injectStylesIntoStyleTag=__webpack_require__("./node_modules/@nrwl/webpack/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/@nrwl/webpack/node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/@nrwl/webpack/node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/@nrwl/webpack/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/@nrwl/webpack/node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/@nrwl/webpack/node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),main=__webpack_require__("./node_modules/@nrwl/webpack/src/utils/webpack/plugins/raw-css-loader.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[9].oneOf[4].use[2]!./packages/docs/src/lib/imperative-render/main.css"),main_default=__webpack_require__.n(main),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(main_default(),options);main_default()&&main_default().locals&&main_default().locals;var AlertsRenderer=createInstance({renderElement:function renderElement(model,params){return(0,jsx_runtime.jsxs)("div",{className:"alert space",children:[(0,jsx_runtime.jsx)("span",{children:model.message}),(0,jsx_runtime.jsx)("button",{onClick:params.destroy,children:"Dismiss"})]})}}),ModalRenderer=createInstance({renderElement:function renderElement(model,params){return(0,jsx_runtime.jsxs)("div",{className:"modal space",children:[(0,jsx_runtime.jsx)("h4",{children:model.title}),(0,jsx_runtime.jsx)("span",{children:model.text}),(0,jsx_runtime.jsx)("button",{onClick:params.destroy,children:"Close Modal"})]})}}),MergedRendererProvider=createMergedProvider([AlertsRenderer,ModalRenderer]);function multiple_renderers_Component(){var renderAlert=AlertsRenderer.useRender(),renderModal=ModalRenderer.useRender();return(0,jsx_runtime.jsxs)("span",{className:"space",children:[(0,jsx_runtime.jsx)("button",{onClick:function onClick(){renderAlert({message:"Created by click. Will disapear when dismissed"})},children:"Create dismissable alert"}),(0,jsx_runtime.jsx)("button",{onClick:function onClick(){renderModal({title:"My Modal",text:"Modal with content"})},children:"Open a Modal"})]})}var close_self_ImperativeRenderer=createInstance({renderElement:function renderElement(model,params){return(0,jsx_runtime.jsxs)("li",{children:["Element ",model.count," ",(0,jsx_runtime.jsx)("button",{onClick:params.destroy,children:"Dismiss"})]})}});function close_self_Component(){var counter=(0,react.useRef)(0),render=close_self_ImperativeRenderer.useRender();return(0,jsx_runtime.jsx)("button",{onClick:function onClick(){var count=counter.current++;render({count})},children:"Add Element until dismissed"})}var timed_ImperativeRenderer=createInstance({renderElement:function renderElement(model,params){return(0,jsx_runtime.jsxs)("li",{children:["Element ",model.count]})}});function timed_Component(){var counter=(0,react.useRef)(0),render=timed_ImperativeRenderer.useTimed({timeout:1e3});return(0,jsx_runtime.jsx)("button",{onClick:function onClick(){var count=counter.current++;render({count})},children:"Add Element for 1000ms"})}var asyncToGenerator=__webpack_require__("./node_modules/@babel/runtime/helpers/asyncToGenerator.js"),asyncToGenerator_default=__webpack_require__.n(asyncToGenerator),regenerator=__webpack_require__("./node_modules/@babel/runtime/regenerator/index.js"),regenerator_default=__webpack_require__.n(regenerator),Renderer=(__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.promise.js"),createInstance({renderElement:function renderElement(model,params){return(0,jsx_runtime.jsxs)("div",{className:"alert space",children:[(0,jsx_runtime.jsx)("span",{children:model.message}),(0,jsx_runtime.jsxs)("span",{children:[(0,jsx_runtime.jsx)("button",{onClick:model.onConfirm,className:"positive",children:"Continue"}),(0,jsx_runtime.jsx)("button",{onClick:model.onCancel,className:"negative",children:"Cancel"})]})]})}}));function confirmation_dialogue_Component(){var _onClick,renderAlert=Renderer.useRender();return(0,jsx_runtime.jsx)("button",{onClick:(_onClick=asyncToGenerator_default()(regenerator_default().mark((function _callee(){return regenerator_default().wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:return _context.next=2,prepareDangerousChange();case 2:return _context.next=4,new Promise((function(resolve){renderAlert((function(params){return{message:"Dangerous change will take place. Continue?",onConfirm:function onConfirm(){resolve(!0),params.destroy()},onCancel:function onCancel(){resolve(!1),params.destroy()}}}))}));case 4:if(_context.sent){_context.next=9;break}return _context.next=8,abandonDangerousChange();case 8:return _context.abrupt("return");case 9:return _context.next=11,applyDangerousChange();case 11:case"end":return _context.stop()}}),_callee)}))),function onClick(){return _onClick.apply(this,arguments)}),children:"Start Operation"})}function prepareDangerousChange(){return _prepareDangerousChange.apply(this,arguments)}function _prepareDangerousChange(){return(_prepareDangerousChange=asyncToGenerator_default()(regenerator_default().mark((function _callee2(){return regenerator_default().wrap((function _callee2$(_context2){for(;;)switch(_context2.prev=_context2.next){case 0:case"end":return _context2.stop()}}),_callee2)})))).apply(this,arguments)}function applyDangerousChange(){return _applyDangerousChange.apply(this,arguments)}function _applyDangerousChange(){return(_applyDangerousChange=asyncToGenerator_default()(regenerator_default().mark((function _callee3(){return regenerator_default().wrap((function _callee3$(_context3){for(;;)switch(_context3.prev=_context3.next){case 0:case"end":return _context3.stop()}}),_callee3)})))).apply(this,arguments)}function abandonDangerousChange(){return _abandonDangerousChange.apply(this,arguments)}function _abandonDangerousChange(){return(_abandonDangerousChange=asyncToGenerator_default()(regenerator_default().mark((function _callee4(){return regenerator_default().wrap((function _callee4$(_context4){for(;;)switch(_context4.prev=_context4.next){case 0:case"end":return _context4.stop()}}),_callee4)})))).apply(this,arguments)}const imperative_render_stories={title:"React Imperative Render",parameters:{viewMode:"docs",previewTabs:{canvas:{hidden:!0}}}};var Basic=make((function BasicExample(){return(0,jsx_runtime.jsxs)(ImperativeRenderer.Provider,{children:[(0,jsx_runtime.jsx)(Component,{}),(0,jsx_runtime.jsx)(ImperativeRenderer.Root,{container:(0,jsx_runtime.jsx)("ul",{})})]})}),"import { createInstance } from '@gapstack/react-imperative-render'\nimport { useRef } from 'react'\n\ntype Model = {\n  count: number\n}\n\nconst ImperativeRenderer = createInstance<Model>({\n  renderElement: (model, params) => {\n    return <li>Element {model.count}</li>\n  },\n})\n\nexport default function BasicExample() {\n  return (\n    <ImperativeRenderer.Provider>\n      <Component />\n\n      <ImperativeRenderer.Root container={<ul />} />\n    </ImperativeRenderer.Provider>\n  )\n}\n\nexport function Component() {\n  const counter = useRef(0)\n\n  const render = ImperativeRenderer.useRender()\n\n  return (\n    <button\n      onClick={() => {\n        const count = counter.current++\n\n        const destroy = render({\n          count,\n        })\n\n        setTimeout(destroy, 1000)\n      }}\n    >\n      Add Element for 1000ms\n    </button>\n  )\n}\n",{title:"Basic Usage",description:(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"React Imperative Render is useful to manage information delivery and interactions as part of a callback or effect."}),(0,jsx_runtime.jsx)("p",{children:"Here we add an item to a list from a button click, and later destroy it automatically. You can imagine this being useful for creating your own Toast notifications or UI feedback while awaiting a Promise."})]})}),Timed=make((function TimedExample(){return(0,jsx_runtime.jsxs)(timed_ImperativeRenderer.Provider,{children:[(0,jsx_runtime.jsx)(timed_Component,{}),(0,jsx_runtime.jsx)(timed_ImperativeRenderer.Root,{container:(0,jsx_runtime.jsx)("ul",{})})]})}),"import { createInstance } from '@gapstack/react-imperative-render'\nimport { useRef } from 'react'\n\ntype Model = {\n  count: number\n}\n\nconst ImperativeRenderer = createInstance<Model>({\n  renderElement: (model, params) => {\n    return <li>Element {model.count}</li>\n  },\n})\n\nexport default function TimedExample() {\n  return (\n    <ImperativeRenderer.Provider>\n      <Component />\n\n      <ImperativeRenderer.Root container={<ul />} />\n    </ImperativeRenderer.Provider>\n  )\n}\n\nexport function Component() {\n  const counter = useRef(0)\n\n  const render = ImperativeRenderer.useTimed({\n    timeout: 1000,\n  })\n\n  return (\n    <button\n      onClick={() => {\n        const count = counter.current++\n\n        render({\n          count,\n        })\n      }}\n    >\n      Add Element for 1000ms\n    </button>\n  )\n}\n",{title:"Timed Render",description:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"You don't have to add a setTimeout yourself. There are dedicated hooks for common use cases."})}),Confirmation=make((function ConfirmationExample(){return(0,jsx_runtime.jsxs)(Renderer.Provider,{children:[(0,jsx_runtime.jsx)(confirmation_dialogue_Component,{}),(0,jsx_runtime.jsx)(Renderer.Root,{container:(0,jsx_runtime.jsx)("div",{className:"alert-container"})})]})}),'import { createInstance } from \'@gapstack/react-imperative-render\'\n\nimport \'./main.css\'\n\ntype ConfirmationModel = {\n  message: string\n  onConfirm: () => void\n  onCancel: () => void\n}\n\nexport const Renderer = createInstance<ConfirmationModel>({\n  renderElement: (model, params) => {\n    return (\n      <div className="alert space">\n        <span>{model.message}</span>\n\n        <span>\n          <button onClick={model.onConfirm} className="positive">\n            Continue\n          </button>\n          <button onClick={model.onCancel} className="negative">\n            Cancel\n          </button>\n        </span>\n      </div>\n    )\n  },\n})\n\nexport default function ConfirmationExample() {\n  return (\n    <Renderer.Provider>\n      <Component />\n\n      <Renderer.Root container={<div className="alert-container" />} />\n    </Renderer.Provider>\n  )\n}\n\nexport function Component() {\n  const renderAlert = Renderer.useRender()\n\n  return (\n    <button\n      onClick={async () => {\n        await prepareDangerousChange()\n\n        const confirmed = await new Promise<boolean>((resolve) => {\n          renderAlert((params) => {\n            return {\n              message: \'Dangerous change will take place. Continue?\',\n              onConfirm() {\n                resolve(true)\n                params.destroy()\n              },\n              onCancel() {\n                resolve(false)\n                params.destroy()\n              },\n            }\n          })\n        })\n\n        if (!confirmed) {\n          await abandonDangerousChange()\n          return\n        }\n\n        await applyDangerousChange()\n      }}\n    >\n      Start Operation\n    </button>\n  )\n}\n\nasync function prepareDangerousChange() {\n  //\n}\nasync function applyDangerousChange() {\n  //\n}\nasync function abandonDangerousChange() {\n  //\n}\n',{title:"Confirmation Dialogue",description:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"You can wrap the dialogue up in a Promise to await a user response, for instance for some confirmation of a dangerous operation."})}),CloseSelf=make((function CloseSelfExample(){return(0,jsx_runtime.jsxs)(close_self_ImperativeRenderer.Provider,{children:[(0,jsx_runtime.jsx)(close_self_Component,{}),(0,jsx_runtime.jsx)(close_self_ImperativeRenderer.Root,{container:(0,jsx_runtime.jsx)("ul",{})})]})}),"import { createInstance } from '@gapstack/react-imperative-render'\nimport { useRef } from 'react'\n\ntype Model = {\n  count: number\n}\n\nconst ImperativeRenderer = createInstance<Model>({\n  renderElement: (model, params) => {\n    return (\n      <li>\n        Element {model.count} <button onClick={params.destroy}>Dismiss</button>\n      </li>\n    )\n  },\n})\n\nexport default function CloseSelfExample() {\n  return (\n    <ImperativeRenderer.Provider>\n      <Component />\n\n      <ImperativeRenderer.Root container={<ul />} />\n    </ImperativeRenderer.Provider>\n  )\n}\n\nexport function Component() {\n  const counter = useRef(0)\n\n  const render = ImperativeRenderer.useRender()\n\n  return (\n    <button\n      onClick={() => {\n        const count = counter.current++\n\n        render({\n          count,\n        })\n      }}\n    >\n      Add Element until dismissed\n    </button>\n  )\n}\n",{title:"Closeable Elements",description:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"The Render function can take a callback which provides useful params to the content, for instance to add a dismiss button. Here the destroy() param is used to close the element on dismiss."})}),MultipleRenderers=make((function MultiplerRenderersExample(){return(0,jsx_runtime.jsxs)(MergedRendererProvider,{children:[(0,jsx_runtime.jsx)(multiple_renderers_Component,{}),(0,jsx_runtime.jsx)(AlertsRenderer.Root,{container:(0,jsx_runtime.jsx)("div",{className:"alert-container"})}),(0,jsx_runtime.jsx)(ModalRenderer.Root,{container:(0,jsx_runtime.jsx)("div",{className:"modal-container"})})]})}),"import {\n  createInstance,\n  createMergedProvider,\n} from '@gapstack/react-imperative-render'\n\nimport './main.css'\n\n//\n// Create multiple instances and then merge the Providers together\n\ntype AlertModel = {\n  message: string\n}\ntype ModalModel = {\n  title: string\n  text: string\n}\n\nexport const AlertsRenderer = createInstance<AlertModel>({\n  renderElement: (model, params) => {\n    return (\n      <div className=\"alert space\">\n        <span>{model.message}</span>\n\n        <button onClick={params.destroy}>Dismiss</button>\n      </div>\n    )\n  },\n})\n\nexport const ModalRenderer = createInstance<ModalModel>({\n  renderElement: (model, params) => {\n    return (\n      <div className=\"modal space\">\n        <h4>{model.title}</h4>\n        <span>{model.text}</span>\n\n        <button onClick={params.destroy}>Close Modal</button>\n      </div>\n    )\n  },\n})\n\nexport const MergedRendererProvider = createMergedProvider([\n  AlertsRenderer,\n  ModalRenderer,\n])\n\n//\n// Render the Provider and Roots\n\nexport default function MultiplerRenderersExample() {\n  return (\n    <MergedRendererProvider>\n      <Component />\n\n      <AlertsRenderer.Root container={<div className=\"alert-container\" />} />\n      <ModalRenderer.Root container={<div className=\"modal-container\" />} />\n    </MergedRendererProvider>\n  )\n}\n\nexport function Component() {\n  const renderAlert = AlertsRenderer.useRender()\n  const renderModal = ModalRenderer.useRender()\n\n  return (\n    <span className=\"space\">\n      <button\n        onClick={() => {\n          renderAlert({\n            message: 'Created by click. Will disapear when dismissed',\n          })\n        }}\n      >\n        Create dismissable alert\n      </button>\n\n      <button\n        onClick={() => {\n          renderModal({\n            title: 'My Modal',\n            text: 'Modal with content',\n          })\n        }}\n      >\n        Open a Modal\n      </button>\n    </span>\n  )\n}\n",{title:"Multiple Renderers",description:(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:"Multiple Renderer instances can be used in parallel to support differenct HTML/CSS needs. Here we have a simple Toast notification instance alongside a Modal instance."})});Basic.parameters=Object.assign({storySource:{source:"make(BasicExample, BasicExampleRaw, {\n  title: 'Basic Usage',\n  description: (\n    <>\n      <>\n        React Imperative Render is useful to manage information delivery and\n        interactions as part of a callback or effect.\n      </>\n\n      <p>\n        Here we add an item to a list from a button click, and later destroy it\n        automatically. You can imagine this being useful for creating your own\n        Toast notifications or UI feedback while awaiting a Promise.\n      </p>\n    </>\n  ),\n})"}},Basic.parameters),Timed.parameters=Object.assign({storySource:{source:"make(TimedExample, TimedExampleRaw, {\n  title: 'Timed Render',\n  description: (\n    <>\n      You don't have to add a setTimeout yourself. There are dedicated hooks for\n      common use cases.\n    </>\n  ),\n})"}},Timed.parameters),Confirmation.parameters=Object.assign({storySource:{source:"make(ConfirmationExample, ConfirmationExampleRaw, {\n  title: 'Confirmation Dialogue',\n  description: (\n    <>\n      You can wrap the dialogue up in a Promise to await a user response, for\n      instance for some confirmation of a dangerous operation.\n    </>\n  ),\n})"}},Confirmation.parameters),CloseSelf.parameters=Object.assign({storySource:{source:"make(CloseSelfExample, CloseSelfExampleRaw, {\n  title: 'Closeable Elements',\n  description: (\n    <>\n      The Render function can take a callback which provides useful params to\n      the content, for instance to add a dismiss button. Here the destroy()\n      param is used to close the element on dismiss.\n    </>\n  ),\n})"}},CloseSelf.parameters),MultipleRenderers.parameters=Object.assign({storySource:{source:"make(\n  MultipleRenderersExample,\n  MultipleRenderersExampleRaw,\n  {\n    title: 'Multiple Renderers',\n    description: (\n      <>\n        Multiple Renderer instances can be used in parallel to support\n        differenct HTML/CSS needs. Here we have a simple Toast notification\n        instance alongside a Modal instance.\n      </>\n    ),\n  }\n)"}},MultipleRenderers.parameters);var __namedExportsOrder=["Basic","Timed","Confirmation","CloseSelf","MultipleRenderers"];try{Meta.displayName="Meta",Meta.__docgenInfo={description:"Metadata to configure the stories for a component.",displayName:"Meta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/docs/src/lib/imperative-render.stories.tsx#Meta"]={docgenInfo:Meta.__docgenInfo,name:"Meta",path:"packages/docs/src/lib/imperative-render.stories.tsx#Meta"})}catch(__react_docgen_typescript_loader_error){}},"./packages/docs/.storybook/preview.js":()=>{},"./packages/docs/.storybook/preview.js-generated-config-entry.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__("./node_modules/core-js/modules/es.object.keys.js"),__webpack_require__("./node_modules/core-js/modules/es.symbol.js"),__webpack_require__("./node_modules/core-js/modules/es.array.filter.js"),__webpack_require__("./node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("./node_modules/core-js/modules/es.object.get-own-property-descriptor.js"),__webpack_require__("./node_modules/core-js/modules/es.array.for-each.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.for-each.js"),__webpack_require__("./node_modules/core-js/modules/es.object.get-own-property-descriptors.js"),__webpack_require__("./node_modules/core-js/modules/es.object.define-properties.js"),__webpack_require__("./node_modules/core-js/modules/es.object.define-property.js");var _Users_nick_dev_reactils_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/@storybook/client-api/dist/esm/ClientApi.js"),_Users_nick_dev_reactils_packages_docs_storybook_preview_js__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./packages/docs/.storybook/preview.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}Object.keys(_Users_nick_dev_reactils_packages_docs_storybook_preview_js__WEBPACK_IMPORTED_MODULE_10__).forEach((function(key){var value=_Users_nick_dev_reactils_packages_docs_storybook_preview_js__WEBPACK_IMPORTED_MODULE_10__[key];switch(key){case"args":return(0,_Users_nick_dev_reactils_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_11__.uc)(value);case"argTypes":return(0,_Users_nick_dev_reactils_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_11__.v9)(value);case"decorators":return value.forEach((function(decorator){return(0,_Users_nick_dev_reactils_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_11__.$9)(decorator,!1)}));case"loaders":return value.forEach((function(loader){return(0,_Users_nick_dev_reactils_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_11__.HZ)(loader,!1)}));case"parameters":return(0,_Users_nick_dev_reactils_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_11__.h1)(function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}({},value),!1);case"argTypesEnhancers":return value.forEach((function(enhancer){return(0,_Users_nick_dev_reactils_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_11__.My)(enhancer)}));case"argsEnhancers":return value.forEach((function(enhancer){return(0,_Users_nick_dev_reactils_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_11__._C)(enhancer)}));case"render":return(0,_Users_nick_dev_reactils_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_11__.$P)(value);case"globals":case"globalTypes":var v={};return v[key]=value,(0,_Users_nick_dev_reactils_node_modules_storybook_client_api__WEBPACK_IMPORTED_MODULE_11__.h1)(v,!1);case"__namedExportsOrder":case"decorateStory":case"renderToDOM":return null;default:return console.log(key+" was not supported :( !")}}))},"./storybook-init-framework-entry.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__("./node_modules/@storybook/react/dist/esm/client/index.js")},"./packages/docs/src/lib sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$":(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./imperative-render.stories.tsx":"./packages/docs/src/lib/imperative-render.stories.tsx"};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id="./packages/docs/src/lib sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$"},"./packages/docs/src/lib sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./packages/docs/src/lib sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$",module.exports=webpackEmptyContext},"?4f7e":()=>{},"./generated-stories-entry.cjs":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module=__webpack_require__.nmd(module),(0,__webpack_require__("./node_modules/@storybook/react/dist/esm/client/index.js").configure)([__webpack_require__("./packages/docs/src/lib sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$"),__webpack_require__("./packages/docs/src/lib sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$")],module,!1)}},__webpack_require__=>{var __webpack_exec__=moduleId=>__webpack_require__(__webpack_require__.s=moduleId);__webpack_require__.O(0,[206],(()=>(__webpack_exec__("./node_modules/@storybook/core-server/node_modules/@storybook/core-client/dist/esm/globals/polyfills.js"),__webpack_exec__("./node_modules/@storybook/core-server/node_modules/@storybook/core-client/dist/esm/globals/globals.js"),__webpack_exec__("./storybook-init-framework-entry.js"),__webpack_exec__("./node_modules/@storybook/react/dist/esm/client/docs/config-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/react/dist/esm/client/preview/config-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-docs/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-actions/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-backgrounds/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-measure/preview.js-generated-config-entry.js"),__webpack_exec__("./node_modules/@storybook/addon-outline/preview.js-generated-config-entry.js"),__webpack_exec__("./packages/docs/.storybook/preview.js-generated-config-entry.js"),__webpack_exec__("./generated-stories-entry.cjs"))));__webpack_require__.O()}]);