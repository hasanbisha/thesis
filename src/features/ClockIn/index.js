import { useCallback, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import Select from "../../components/Inputs/Select";
import { renderSetting } from "../../utils/helpers/settings";
import { useUser } from "../../utils/hooks/useUser";

const clocks = ["start-shift", "end-shift", "start-break", "end-break"];

function ClockIn() {
    const user = useUser();

    const [job, setJob] = useState(null);
    const [location, setLocation] = useState(null);
    const [project, setProject] = useState(null);

    const { data, isLoading } = useSWR({
        url: "/clock"
    });
    const { trigger, isMutating } = useSWRMutation(
        "/clock",
        useCallback((url, { arg }) => {
            console.log({ url, arg, job, location, project });
        }, [job, location, project]),
    );

    console.log(data);

    return (
        <div>
            <Select
                value={job}
                onChange={setJob}
                renderOption={renderSetting}
                options={user.jobs}
            />

            <Select
                value={location}
                onChange={setLocation}
                renderOption={renderSetting}
                options={user.locations}
            />

            <Select
                value={project}
                onChange={setProject}
                renderOption={renderSetting}
                options={user.projects}
            />

            {clocks.map((clock) => (
                <button className="mr-4" onClick={() => trigger(clock)}>
                    {clock}
                </button>
            ))}
        </div>
    );
}

export default ClockIn;
