"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[789],{9969:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var s=t(4848),i=t(8453);const r={sidebar_position:2},o="Representing Knowledge",a={id:"basics/knowledge-graph",title:"Representing Knowledge",description:"Explore the realm of knowledge representation.",source:"@site/docs/basics/knowledge-graph.md",sourceDirName:"basics",slug:"/basics/knowledge-graph",permalink:"/documentation/basics/knowledge-graph",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Neuro-Symbolic AI Systems",permalink:"/documentation/basics/neuro-symbolic"},next:{title:"Actions as Tools",permalink:"/documentation/basics/actions-as-tool"}},d={},l=[{value:"The Traditional Way to Represent Knowledge",id:"the-traditional-way-to-represent-knowledge",level:2},{value:"Representing Knowledge with Vectors",id:"representing-knowledge-with-vectors",level:2},{value:"Combining Vector and Graph Representations",id:"combining-vector-and-graph-representations",level:2}];function c(e){const n={h1:"h1",h2:"h2",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"representing-knowledge",children:"Representing Knowledge"}),"\n",(0,s.jsx)(n.p,{children:"Explore the realm of knowledge representation."}),"\n",(0,s.jsx)(n.h2,{id:"the-traditional-way-to-represent-knowledge",children:"The Traditional Way to Represent Knowledge"}),"\n",(0,s.jsx)(n.p,{children:"Knowledge representation is pivotal in any AI application. Traditionally, knowledge was encoded into graphs using ontologies or property graph systems."}),"\n",(0,s.jsx)(n.p,{children:"Due to the challenges in modeling a knowledge domain and the labor-intensive process of creating graph data, only specific domains with strict taxonomies still employ graph-based knowledge systems. Examples include biology or domains with highly interconnected data, such as social media and financial applications."}),"\n",(0,s.jsx)(n.h2,{id:"representing-knowledge-with-vectors",children:"Representing Knowledge with Vectors"}),"\n",(0,s.jsx)(n.p,{children:"With the advent of deep learning, unstructured knowledge (texts, posts, books, etc.) has become accessible to AI systems. However, neural networks represent data in a completely different way, using vectors."}),"\n",(0,s.jsx)("figure",{children:(0,s.jsx)("p",{align:"center",children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.img,{alt:"The embedding vectors represented in 3D",src:t(7768).A+"",width:"476",height:"440"}),"\n",(0,s.jsx)("figcaption",{align:"center",children:(0,s.jsx)("b",{children:"Fig.1 - Vectors of words represented in 3 dimensions, illustrating this concept; similar words are close together."})})]})})}),"\n",(0,s.jsx)(n.p,{children:"This novel approach to represent and work with unstructured knowledge has given rise to new applications such as vector databases and similarity-augmented generation."}),"\n",(0,s.jsx)(n.h2,{id:"combining-vector-and-graph-representations",children:"Combining Vector and Graph Representations"}),"\n",(0,s.jsx)(n.p,{children:"The fusion of these two types of representation is fundamental to our vision of the future and the neuro-symbolic approach. This hybrid representation allows for similarity-based data retrieval strategies combined with precise and efficient strategies provided by graphs."}),"\n",(0,s.jsx)(n.p,{children:"Our framework currently supports 3 types of knowledge store:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Filesystem:"})," Stores documents along with their folders, enabling the system to navigate its long-term memory using a shell."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Program Memory:"})," Stores the graph prompt programs and provides the dependency graph of HybridAGI's programs."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Trace Memory:"})," Stores the program traces and index each past action."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Both structures contain, at their leaves, content indexed by the embedding vectors, enabling the system to perform similarity-based searches."}),"\n",(0,s.jsx)("figure",{children:(0,s.jsx)("p",{align:"center",children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.img,{alt:"HybridAGI filesystem",src:t(9815).A+"",width:"532",height:"518"}),"\n",(0,s.jsx)("figcaption",{align:"center",children:(0,s.jsx)("b",{children:"Fig.2 - HybridAGI's long-term memory implements a file system-like structure of folders and files. This architecture enables the AI system to navigate and explore its vector store in a Unix-like fashion."})})]})})}),"\n",(0,s.jsx)("figure",{children:(0,s.jsx)("p",{align:"center",children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.img,{alt:"HybridAGI program memory",src:t(3880).A+"",width:"530",height:"492"}),"\n",(0,s.jsx)("figcaption",{align:"center",children:(0,s.jsx)("b",{children:"Fig.3 - HybridAGI's program memory implements the dependency graph of its prompt programs. This structure protects the main prompt program from being modified by the AI system."})})]})})}),"\n",(0,s.jsx)("figure",{children:(0,s.jsx)("p",{align:"center",children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.img,{alt:"HybridAGI trace memory",src:t(5153).A+"",width:"520",height:"515"}),"\n",(0,s.jsx)("figcaption",{align:"center",children:(0,s.jsx)("b",{children:"Fig.4 - HybridAGI's trace memory indexes each past action, allowing the AI system to recall past actions between sessions."})})]})})})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},7768:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/embeddings-4af6227061072e9961581b730a423349.png"},9815:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/filesystem-bb0103a7d456281392d31e75932c9135.png"},3880:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/program_memory-33129722d76d765bb5098bd477b679ba.png"},5153:(e,n,t)=>{t.d(n,{A:()=>s});const s=t.p+"assets/images/trace_memory-936cad36de064c55103bc02bf364cd47.png"},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>a});var s=t(6540);const i={},r=s.createContext(i);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);