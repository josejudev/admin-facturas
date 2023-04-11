const InputField = (props) => {
    return (
      <>
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor={props.name}
        >
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
          className={
            props.errors[props.name] 
              ? "transition duration-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-red-200 border border-red-300 appearance-none block w-full bg-grey-lighter text-grey-darker border-grey-lighter rounded py-3 px-4"
              : "appearance-none block w-full bg-grey-lighter text-grey-darker border border-red-500-lighter rounded py-3 px-4 mb-3"
          }
          onChange={props.onChange}
          value={props.value}
        />
        {props.errors[props.name] && (
          <span className="text-red-500 text-xs">
            {props.errors[props.name].message}
          </span>
        )}
        
      </>
    );
  }

  export default InputField;
  