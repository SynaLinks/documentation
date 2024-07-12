"use strict";(self.webpackChunksynalinks_website=self.webpackChunksynalinks_website||[]).push([[710],{3346:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var i=n(4848),s=n(8453);const r={sidebar_position:2},o="File System",a={id:"api/hybridstores/file-system",title:"File System",description:"HybridAGI document store",source:"@site/docs/api/hybridstores/file-system.md",sourceDirName:"api/hybridstores",slug:"/api/hybridstores/file-system",permalink:"/documentation/docs/api/hybridstores/file-system",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"apiSidebar",previous:{title:"Program Memory",permalink:"/documentation/docs/api/hybridstores/program-memory"},next:{title:"Trace Memory",permalink:"/documentation/docs/api/hybridstores/trace-memory"}},d={},l=[{value:"HybridAGI document store",id:"hybridagi-document-store",level:2},{value:"Usage",id:"usage",level:2}];function m(e){const t={code:"code",h1:"h1",h2:"h2",img:"img",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"file-system",children:"File System"}),"\n",(0,i.jsx)(t.h2,{id:"hybridagi-document-store",children:"HybridAGI document store"}),"\n",(0,i.jsx)(t.p,{children:"The File System is HybridAGI's document store, unlike vector-only databases, it preserves the structural integrity of the documents and folders. This allows the system to maintain the semantic separation between your documents."}),"\n",(0,i.jsx)(t.p,{children:"When combined with the tools we provide, the agent can navigate inside this document store in a Unix-like fashion, enhancing its ability to efficiently search for and retrieve information."}),"\n",(0,i.jsx)("figure",{children:(0,i.jsx)("p",{align:"center",children:(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.img,{alt:"HybridAGI filesystem",src:n(9013).A+"",width:"532",height:"518"}),"\n",(0,i.jsx)("figcaption",{align:"center",children:(0,i.jsx)("b",{children:"Fig.1 - HybridAGI's long-term memory implements a file system-like structure of folders and files. This architecture enables the AI system to navigate and explore its vector store in a Unix-like fashion."})})]})})}),"\n",(0,i.jsx)(t.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-python",children:'from hybridagi import ProgramMemory, FileSystem\nfrom hybridagi import GraphProgramInterpreter\nfrom hybridagi import SentenceTransformerEmbeddings\nfrom hybridAGI import AgentState\n# The tools to access the filesystem\nfrom hybridagi.tools import (\n    ReadFile, # Read document chunk by chunk\n    WriteFile, # Write into a file (override if existing)\n    AppendFile, # Append into a file (create one if non-existing)\n    DocumentSearch, # Perform a similarity based search \n    InternalShell, # Use the Unix-like shell to navigate into the hybridstore and organize it\n    Upload, # Zip and download a folder or file from the hybridstore\n)\n\nembeddings = SentenceTransformerEmbeddings(\n    dim = 384,\n    model_name_or_path = "sentence-transformers/all-MiniLM-L6-v2",\n)\n\nprogram_memory = ProgramMemory(\n    index_name = "hybrid_agi", \n    embeddings = embeddings,\n)\n\nagent_state = AgentState()\n\nfilesystem = FileSystem(\n    index_name = "hybrid_agi", # The global index\n    embeddings = embeddings, # The embeddings to use\n    graph_index = "filesystem", # The hybridstore index (default to filesystem)\n    hostname = "localhost", # FalkorDB hostname (default to localhost)\n    port = 6379, # FalkorDB port (default to 6379)\n    username = "", # FalkorDB username (empty by default)\n    password = "", # FalkorDB password (empty by default)\n    indexed_label = "Content", # The label of the indexed nodes (default to Content)\n    wipe_on_start = False, # Whether or not to wipe the hybridstore at start (default to False)\n)\n\ntools = [\n    ReadFile(\n        agent_state = agent_state,\n        filesystem = filesystem,\n    ),\n    WriteFile(\n        agent_state = agent_state,\n        filesystem = filesystem\n    ),\n    AppendFile(\n        agent_state = agent_state,\n        filesystem = filesystem,\n    ),\n    DocumentSearch(\n        filesystem = filesystem,\n    ),\n    InternalShell(\n        agent_state = agent_state,\n        filesystem = filesystem,\n    ),\n    Upload(\n        filesystem = filesystem,\n        # Where the system will save the zip archive (default to current working directory)\n        downloads_directory = "~/Downloads",\n    ),\n]\n\nagent = GraphProgramInterpreter(\n    program_memory = program_memory,\n    agent_state = agent_state,\n    tools = tools,\n)\n'})})]})}function c(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(m,{...e})}):m(e)}},9013:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/filesystem-bb0103a7d456281392d31e75932c9135.png"},8453:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>a});var i=n(6540);const s={},r=i.createContext(s);function o(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:o(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);