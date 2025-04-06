import "./Input.css";

function Input({
  type,
  id,
  name,
  label,
  register,
  errors,
  classNameInputContainer = "",
  classNameContainer = "",
  classNameLabel = "",
  classNameInput = "",
  disabled = false,
}) {
  return (
    <div className={`input-container ${classNameContainer}`}>
      <label htmlFor={id} className={`form-label input-text ${classNameLabel}`}>
        {label}
      </label>
      <div
        className={`d-flex flex-column w-100 input-error-container ${classNameInputContainer}`}
      >
        <input
          type={type}
          name={name}
          id={id}
          {...register}
          className={`${errors?.[name] ? "is-invalid" : ""} ${classNameInput}`}
          disabled={disabled}
        />
        {errors?.[name] && (
          <span className="text-danger input-text">{errors[name].message}</span>
        )}
      </div>
    </div>
  );
}

export default Input;
