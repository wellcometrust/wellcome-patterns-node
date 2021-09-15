function template(
  { template },
  opts,
  { componentName, jsx, exports, interfaces, props }
) {
  const tpl = template.smart({ plugins: ['typescript'] });

  // This has to be added manually to the AST
  // See https://github.com/babel/babel/issues/10636
  componentName.typeAnnotation = {
    type: 'TSTypeAnnotation',
    typeAnnotation: {
      type: 'TSTypeReference',
      typeName: {
        type: 'Identifier',
        name: 'IconSvg',
      },
    },
  };

  return tpl.ast`
    import { IconSvg } from '../types';
    ${interfaces}

    const ${componentName} = (props) => ${jsx}

    ${exports}
  `;
}
module.exports = template;
