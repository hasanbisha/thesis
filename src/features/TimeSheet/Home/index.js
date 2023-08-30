import Content from "./Content";
import { DateRangeProvider } from "../DateRange/context";

function Home() {
    return (
        <DateRangeProvider>
            <Content />
        </DateRangeProvider>
    );
}

export default Home;
