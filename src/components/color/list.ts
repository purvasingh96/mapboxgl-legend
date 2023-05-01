import { createElement, serializeLabel } from '../../utils';
import highlighter from '../../highlighter';
import type { Layer, Map, ParsedExpression, LayerOptions } from '../../types';

type Expression =  ParsedExpression<string | number | number[], string>;

export default (expression: Expression, layer: Layer, map: Map, options: LayerOptions) => {
  const { stops } = expression;
  const { events } = highlighter(expression, layer, map);
  return createElement('ul', {
    classes: ['list', 'list--color', `list--${options.highlight ? 'highlight' : ''}`],
    content: stops.map(([value, color], index) => {
      const content = serializeLabel(value, layer.metadata);
      const elem= createElement('li', {
        styles: { '--color': color },
        
        events: options.highlight ? events(value) : {},
        content,
      });
      elem.setAttribute('aria-label', 'shade '+index);
      return content && elem
    }),
  });
};
