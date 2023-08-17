import { useCallback, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import Select from "../../components/Inputs/Select";
import useApi from "../../utils/api";
import { renderSetting } from "../../utils/helpers/settings";
import { useUser } from "../../utils/hooks/useUser";

const clocks = ["start-shift", "end-shift", "start-break", "end-break"];

function ClockIn() {
    const user = useUser();

    const [job, setJob] = useState(user.jobs?.[0]?.id);
    const [location, setLocation] = useState(user.locations?.[0]?.id);
    const [project, setProject] = useState(user.projects?.[0]?.id);

    const { data, isLoading } = useSWR({
        url: "/clock"
    });
    const { authPost } = useApi();
    const { trigger, isMutating } = useSWRMutation(
        "/clock",
        useCallback((url, { arg }) => {
            const data = { type: arg, job, location, project };
            return authPost(url, { data });
        }, [authPost, job, location, project]),
        { revalidate: true },
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
