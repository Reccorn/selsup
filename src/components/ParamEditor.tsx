import React, { useState } from "react";

export interface Param {
    id: number;
    name: string;
    type: "string" | "number" | "array";
}

interface ParamValue {
    paramId: number;
    value: string | number | any[];
}

export interface Model {
    paramValues: ParamValue[];
}

interface Props {
    params: Param[];
    model: Model;
}

const ParamEditor: React.FC<Props> = ({ params, model }) => {
    const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues);

    const handleParamValueChange = (paramId: number, value: string) => {
        const updatedParamValues = paramValues.map((paramValue) => {
            if (paramValue.paramId === paramId) {
                return { ...paramValue, value };
            }
            return paramValue;
        });
        setParamValues(updatedParamValues);
    };

    const getModel = (): Model => {
        return { paramValues };
    };

    return (
        <div>
            {params.map((param) => (
                <div key={param.id}>
                    <label>{param.name}</label>
                    <input
                        type="text"
                        value={paramValues.find((paramValue) => paramValue.paramId === param.id)?.value || ""}
                        onChange={(e) => handleParamValueChange(param.id, e.target.value)}
                    />
                </div>
            ))}
            <button onClick={() => console.log(getModel())}>Get Model</button>
        </div>
    );
};

export default ParamEditor;