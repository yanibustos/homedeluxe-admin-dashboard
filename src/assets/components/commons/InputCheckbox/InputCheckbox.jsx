import "./InputCheckbox.css";

function InputCheckbox({
  name,
  id,
  label,
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  spanClassName = "",
  register,
}) {
  return (
    <div
      className={`inputCheckbox-container d-flex align-items-center ${containerClassName}`}
    >
      <label htmlFor={id} className={`checkbox-label ${labelClassName}`}>
        <input
          type="checkbox"
          name={name}
          id={id}
          className={`${inputClassName}`}
          {...register}
        />
        <span className={`checkmark ${spanClassName}`}>
          {" "}
          <i className="bi bi-check-lg"></i>
        </span>
        {label}
      </label>
    </div>
  );
}

export default InputCheckbox;
