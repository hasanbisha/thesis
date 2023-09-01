import { useMemo } from "react";
import InfoRow from "./InfoRow";
import { renderSetting } from "../../utils/helpers/settings";
import { useUser } from "../../utils/hooks/useUser";
import { ROLE } from "../../utils/helpers/user";
import Header from "../../components/Layout/Header";

function Profile() {
    const user = useUser();


    const role = useMemo(() => {
        switch (user?.role) {
            case ROLE.Admin: {
                return "Admin";
            }
            case ROLE.Manager: {
                return "Manager";
            }
            case ROLE.User: {
                return "User";
            }
        }
    }, [user?.role])

    return (
        <div>
            <Header title="Profile" />

            <div
                className="w-full bg-white grid grid-cols-2 gap-4 place-items-center"
                style={{
                    height: "calc(100vh - 64px - 84px)"
                }}
            >
                <div className="h-full p-7 flex flex-col items-center justify-center">
                    <span
                        className="rounded-full p-11 bg-gray-800 text-white mb-5"
                        style={{
                            fontSize: "50px"
                        }}
                    >
                        {user?.firstName?.charAt(0) + " " + user?.lastName?.charAt(0)}
                    </span>

                    <div className="py-7">
                        <InfoRow label="Firstname" value={user?.firstName} />
                        <InfoRow label="Middlename" value={user?.middleName || "--"} />
                        <InfoRow label="Lastname" value={user?.lastName} />
                        <InfoRow label="E-mail" value={user?.email} />
                        <InfoRow label="Role" value={role} />
                    </div>
                </div>

                <div className="h-full p-7 flex flex-col justify-center">
                    <InfoRow label="Payment group" value={renderSetting(user?.paymentGroup)} />

                    <span className="font-bold text-lg my-1">Jobs:</span>
                    <div className="border px-7 rounded-lg bg-gray-200">
                        {user?.jobs?.map((job, i) => (
                            <InfoRow label={"Job" + (i + 1)} value={renderSetting(job)} />
                        ))}
                    </div>

                    <span className="font-bold text-lg my-1">Locations:</span>
                    <div className="border px-7 rounded-lg bg-gray-200">
                        {user?.locations?.map((location, i) => (
                            <InfoRow label={"Location" + (i + 1)} value={renderSetting(location)} />
                        ))}
                    </div>

                    <span className="font-bold text-lg my-1">Projects:</span>
                    <div className="border px-7 rounded-lg bg-gray-200">
                        {user?.projects?.map((project, i) => (
                            <InfoRow label={"Project" + (i + 1)} value={renderSetting(project)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
