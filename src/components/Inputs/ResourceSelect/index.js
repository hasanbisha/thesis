import useSWR from "swr";
import Select from "../Select";

function ResourceSelect({ url, value, onChange, renderOption, multiple, valuePropName }) {
    const { data, isLoading } = useSWR({ url });

    return (
        <Select
            options={data?.[0]}
            loading={isLoading}
            value={value}
            onChange={onChange}
            renderOption={renderOption}
            multiple={multiple}
            valuePropName={valuePropName}
        />
    )
}

export default ResourceSelect;
