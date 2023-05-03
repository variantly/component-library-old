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
  const data =  variables.reduce((acc: Record<string, string | number>, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});

  return data;
};

export const formatPalette = (palette?: Palette): Record<string, string | number> => {
  if (!palette) return {};

  const data = palette.colors.reduce((acc: Record<string, string | number>, curr) => {
    acc[curr.key] = curr.rgb;
    return acc;
  }, {});

  return data;
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
  for (let k in styles) {
    if (typeof styles[k] === 'object') {
      for (let j in styles[k]) {
        if (styles[k][j]?.[0] === '$') {
          const cssStyle = variables[styles[k][j]];
          styles[k][j] = cssStyle;
        }
      }
    } else {
      if (styles[k]?.[0] === '$') {
        const cssStyle = variables[styles[k]];
        styles[k] = cssStyle;
      }
    }
  }

  return styles;
}