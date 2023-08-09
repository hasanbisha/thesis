import useSWR from "swr";
import Select from "../Select";

function ResourceSelect({ url, value, onChange, renderOption, multiple }) {
    const { data, isLoading } = useSWR({ url });

    return (
        <Select
            options={data?.data}
            loading={isLoading}
            value={value}
            onChange={onChange}
            renderOption={renderOption}
            multiple={multiple}
        />
    )
}

export default ResourceSelect;
