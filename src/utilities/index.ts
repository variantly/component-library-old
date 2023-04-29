import _cloneDeepWith from 'lodash/cloneDeepWith';
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

export const formatPaletteAndVariables = (palette?: Palette, variables?: Variable[]): Record<string, string | number> => {
  const formattedVariables = formatVariables(variables ?? []);
  const formattedPalette = formatPalette(palette);

  return {
    ...formattedVariables,
    ...formattedPalette,
  }
}

export const setCSSValuesFromVariables = (styles: Record<string, any>, variables: Record<string, string | number>) => {
  return _cloneDeepWith(styles, (value) => {
    if (typeof value === 'string' && value[0] === '$') {
      return variables[value];
    }

    return value;
  });
};
