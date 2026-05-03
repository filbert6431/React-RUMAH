import { createRoot } from "react-dom/client";
import ListKarakterUser from "./ListKarakterUser";
import ResponsiveGrid from "./responsivegrid";
import "./tailwind.css";

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* { <ListKarakterUser/> } */}
            <ResponsiveGrid/>
        </div>
    )