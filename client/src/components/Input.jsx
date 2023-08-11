const Input = (props) => {
  return (
    <input
      {...props}
      className={
        "rounded-xl px-4 py-2 border-gray-300 border-2 focus:border-blue-400 outline-0" +
        (props.account ? " w-full md:w-2/3 mx-auto" : "")
      }
    />
  );
};
export default Input;
