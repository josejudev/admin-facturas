
const InputFieldsOrder = (props) => {
    return (
        <>
            <div className="-mx-3 md:flex mb-6">
                <div className="md:w-full px-3 mb-6 md:mb-0">
                    <label className="block text-grey-darker text-sm font-bold mb-2 text-slate-700">

                        {props.label}

                    </label>
                    <input
                        type={props.type || "text"}
                        {...props.register(props.name, {
                            required: props.required || false,
                            minLength: props.minLength || 0,
                            maxLength: props.maxLength || 0,
                            pattern: props.pattern || null,
                        })}
                        onChange={props.onChange}
                        value={props.value}
                        className={
                            props.errors[props.name] ? "transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-red-200 border-red-300 appearance-none mt-1 px-3 py-2 border block w-64 rounded-md sm:text-sm " : "mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-64 rounded-md sm:text-sm focus:ring-1 "
                        }

                    />
                    {props.errors[props.name] && (
                        <span className="text-red-500 text-xs">
                            {props.errors[props.name].message}
                        </span>
                    )}
                </div>
            </div>

        </>
    )
}

export default InputFieldsOrder
