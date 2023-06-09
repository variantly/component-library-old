import styled from '@emotion/styled'
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';
import { Palette, Variable } from '../../types';
import { addImportantToStyles, formatPaletteAndVariables, setCSSValuesFromVariables } from '../../utilities';
import { useStyles, useVariables } from '../../Provider';
import { defaultStyles } from './styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  _styles?: Record<string, any>;
  _variables?: Variable[];
  _palette?: Palette;
}

const Button: React.FC<Props> = (props) => {
  const { variant, _palette, _styles, _variables, ...rest } = props;
  const component = useStyles('button');

  const variables = useVariables();
  const platformVars = formatPaletteAndVariables(_palette, _variables);

  const allVariables = {
    ...variables,
    ...platformVars,
  };

  const variantStyles = component?.variants
    ?.find(v => v.name === variant ?? 'primary')?.styles ?? {};

  const platformStyles = _styles ?? {};

  const allStyles = _omitBy(
    setCSSValuesFromVariables({
      ...defaultStyles,
      ...variantStyles,
      ...platformStyles,
    }, allVariables),
  _isNil);

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
