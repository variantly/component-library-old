interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<Props> = (props) => {
  return (
    <input {...props} />
  );
};

export default Input;
