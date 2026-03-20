import { createRoot } from "react-dom/client";
import './custom.css';
import Container from "./Container.jsx";
import BioDataDiri from "./BioDataDiri.jsx";

createRoot(document.getElementById("root"))
    .render(
        <div>   
            <Container>
                <BioDataDiri/>
            </Container>
        </div>
    )