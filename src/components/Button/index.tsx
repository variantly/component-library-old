interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<Props> = (props) => {
  return (
    <button {...props}>
      {props.children}
    </button>
  );
};

export default Button;
