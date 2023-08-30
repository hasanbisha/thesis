import Content from "./Content";
import { DateRangeProvider } from "../DateRange/context";

function Team() {
    return (
        <DateRangeProvider>
            <Content />
        </DateRangeProvider>
    );
}

export default Team;
