import styled from '@emotion/styled'
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';
import { Style } from '../../types';
import { addImportantToStyles } from '../../utilities';
import { useStyles } from '../../Provider';
import { defaultStyles } from './styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  _styles?: Style;
}

const Button: React.FC<Props> = (props) => {
  const { variant, _styles, ...rest } = props;
  const { variants } = useStyles('button');

  const variantStyles = variants
    .find(v => v.name === variant ?? 'primary')?.styles ?? {};

  const platformStyles = _styles?.variants
    .find(v => v.name === variant ?? 'primary')?.styles ?? {};

  const allStyles = {
    ...defaultStyles,
    ..._omitBy(variantStyles, _isNil),
    ..._omitBy(platformStyles, _isNil),
  };

  const Component = styled.button({
    ...allStyles,
    '&:hover': addImportantToStyles(allStyles['&:hover']),
    '&:disabled': addImportantToStyles(allStyles['&:disabled']),
  });

  return (
    <Component {...rest}>
      {props.children}
    </Component>
  );
};

export default Button;
