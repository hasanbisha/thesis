import { useCallback, useState, useMemo } from "react";
import useSWR, { mutate } from "swr";
import clsx from "clsx";
import useSWRMutation from "swr/mutation";
import moment from "moment";
import { ClockIcon } from "@heroicons/react/20/solid";
import Select from "../../components/Inputs/Select";
import Loading from "../../components/Loaders/Loading";
import useApi from "../../utils/api";
import { renderSetting } from "../../utils/helpers/settings";
import { useUser } from "../../utils/hooks/useUser";
import { useTime } from "../../utils/hooks/useTime";

const clockType = (value) => {
    switch (value) {
        case "start-shift":
            return "Clocked in";
        case "start-break":
            return "Started break";
        case "end-break":
            return "Ended break";
        case "end-shift":
            return "Clocked out";
        default:
            return "";
    }
}

function ClockIn() {
    const user = useUser();
    const time = useTime();

    const [job, setJob] = useState(user.jobs?.[0]?.id);
    const [location, setLocation] = useState(user.locations?.[0]?.id);
    const [project, setProject] = useState(user.projects?.[0]?.id);

    const { data, isLoading, mutate } = useSWR({
        url: "/clock"
    });

    const { authPost } = useApi();
    const { trigger, isMutating } = useSWRMutation(
        "/clock",
        useCallback(async (url, { arg }) => {
            const data = { type: arg, job, location, project };
            await authPost(url, { data });
            return mutate();
        }, [authPost, mutate, job, location, project]),
        { revalidate: true },
    );

    const greeting = useMemo(() => {
        const hour = moment(time).hour();
        if (hour >= 0 && hour < 12) {
            return "Good morning";
        } else if (hour >= 12 && hour < 20) {
            return "Good afternoon";
        } else {
            return "Good evening";
        }
    }, [time]);

    const lastClock = useMemo(() => {
        if (data?.length > 0) {
            return data[data.length - 1];
        } else {
            return undefined
        }
    }, [data]);

    const disabled = useMemo(() => {
        if (
            lastClock?.type === "start-shift"
            || lastClock?.type === "start-break"
            || lastClock?.type === "end-break"
        ) {
            return true;
        } else {
            return false;
        }
    }, [lastClock?.type]);

    const buttons = useMemo(() => {
        const type = lastClock?.type;
        if (type === "start-shift" || type === "end-break") {
            return (
                <div className="w-full flex gap-2">
                    <button
                        type="button"
                        className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => trigger("start-break")}
                    >
                        Start break
                    </button>

                    <button
                        type="button"
                        className="w-full rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => trigger("end-shift")}
                    >
                        Clock out
                    </button>
                </div>
            );
        } else if (type === "start-break") {
            return (
                <button
                    type="button"
                    className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => trigger("end-break")}
                >
                    End break
                </button>
            )
        } else {
            return (
                <button
                    type="button"
                    className="w-full rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => trigger("start-shift")}
                >
                    Clock in
                </button>
            );
        }
    }, [lastClock?.type, trigger]);

    return (
        isLoading
            ? (
                <div className="flex justify-center items-center h-full" >
                    <Loading />
                </div>
            ) : (
                <div className="bg-white" style={{ height: "93vh" }}>
                    <div className="w-full flex justify-between items-center p-7 border-b">
                        <div className="font-bold">
                            <h2 className="mb-0">
                                {greeting},{" "}
                                <span className="text-indigo-600">
                                    {user?.firstName}
                                </span>
                            </h2>

                            <small className="text-gray-500">
                                Have a great {moment().format("dddd").toLocaleLowerCase()}
                            </small>
                        </div>

                        <div>
                            <ClockIcon className="h-7 w-7 text-indigo-600" />
                        </div>
                    </div>

                    <div className="flex items-center justify-around p-24">
                        <div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-gray-500 text-lg mb-2">
                                    {moment().format("dddd, MMMM DD, yyyy")}
                                </span>

                                <h1 className="text-indigo-600 font-bold">
                                    {moment().format("HH:mm A")}
                                </h1>
                            </div>

                            <ClockIcon className="h-64 w-64 my-14 text-gray-800" aria-hidden="true" />
                        </div>

                        <div className="w-64">
                            <div className="mb-7">
                                <Select
                                    value={job}
                                    onChange={setJob}
                                    renderOption={renderSetting}
                                    options={user.jobs}
                                    disabled={disabled}
                                />
                            </div>

                            <div className="mb-7">
                                <Select
                                    value={location}
                                    onChange={setLocation}
                                    renderOption={renderSetting}
                                    options={user.locations}
                                    disabled={disabled}
                                />
                            </div>

                            <div className="mb-7">
                                <Select
                                    value={project}
                                    onChange={setProject}
                                    renderOption={renderSetting}
                                    options={user.projects}
                                    disabled={disabled}
                                />
                            </div>

                            {buttons}
                        </div>

                        <div
                            className="flex flex-col"
                            style={{
                                maxHeight: "500px",
                                overflow: "auto"
                            }}
                        >
                            {data?.map(({ timestamp, type }) => (
                                <span
                                    className={clsx(
                                        "border-l-4 mb-5 py-3 px-3",
                                        type === "start-break" || type === "end-break"
                                            ? "border-indigo-600"
                                            : "border-gray-800"
                                    )}
                                >
                                    <span className={clsx(
                                        "font-bold mx-1",
                                        type === "start-break" || type === "end-break"
                                            ? "text-indigo-600"
                                            : "text-gray-800"
                                    )}>
                                        {clockType(type)}
                                    </span>
                                    -
                                    <span className="mx-1 text-gray-600">
                                        {moment.unix(timestamp).format("DD-MM-YYYY, HH:mm A")}
                                    </span>
                                </span>
                            ))}
                        </div>
                    </div>
                </ div>
            ));
}

export default ClockIn;
