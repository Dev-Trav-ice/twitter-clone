function Input({ type, className, onChange, name, placeholder, defaultValue }) {
  return (
    <input
      type={type}
      name={name}
      className={
        className + ` bg-transparent outline-none focus:border-[#1DA1F2]`
      }
      onChange={onChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
      autoComplete="off"
    />
  );
}

export default Input;
