import { Palette, Variable } from '../types';

export const addImportantToStyles = (styles: Record<string, string>) => {
  return Object.entries(styles).reduce((acc: Record<string, any>, [k, v]) => {
    let val = typeof v === 'string' ? v : `${v}px`;

    acc[k] = `${val}!important`;
    return acc;
  }, {});
};

export const formatVariables = (variables: Variable[]): Record<string, string | number> => {
  return variables.reduce((acc: Record<string, string | number>, curr) => {
    acc[curr.key] = acc[curr.value];
    return acc;
  }, {});
};

export const formatPalette = (palette?: Palette): Record<string, string | number> => {
  if (!palette) return {};

  return palette.colors.reduce((acc: Record<string, string | number>, curr) => {
    acc[curr.key] = acc[curr.rgb];
    return acc;
  }, {});
};
