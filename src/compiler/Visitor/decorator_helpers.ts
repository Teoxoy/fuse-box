import { ASTNode } from '../interfaces/AST';

const __DECORATE__ = {
  type: 'MemberExpression',
  object: {
    type: 'Identifier',
    name: '__fuse_decorate',
  },
  computed: false,
  property: {
    type: 'Identifier',
    name: 'd',
  },
};
export function createPropertyDecorator(props: {
  helperModule: string;
  className: ASTNode;
  propertyName: string;
  decorators: Array<ASTNode>;
}): ASTNode {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: props.helperModule,
        },
        computed: false,
        property: {
          type: 'Identifier',
          name: 'd',
        },
      },
      arguments: [
        {
          type: 'ArrayExpression',
          elements: props.decorators,
          optional: false,
        },
        {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: props.className,
          },
          computed: false,
          property: {
            type: 'Identifier',
            name: 'prototype',
          },
        },
        {
          type: 'Literal',
          value: props.propertyName,
        },
        {
          type: 'UnaryExpression',
          operator: 'void',
          argument: {
            type: 'Literal',
            value: 0,
          },
          prefix: true,
        },
      ],
    },
  };
}

export function createDecoratorRequireHelperStatement(moduleName: string, params: Array<string>) {
  const properties = [];
  for (const name of params) {
    properties.push({
      type: 'Property',
      key: {
        type: 'Identifier',
        name: name,
      },
      value: {
        type: 'Identifier',
        name: name,
      },
      kind: 'init',
      computed: false,
      method: false,
      shorthand: true,
    });
  }
  return {
    type: 'VariableDeclaration',
    kind: 'const',
    declare: false,
    declarations: [
      {
        type: 'VariableDeclarator',
        init: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'require',
          },
          arguments: [
            {
              type: 'Literal',
              value: './hey',
            },
          ],
        },
        id: {
          type: 'ObjectPattern',
          properties: properties,
        },
      },
    ],
  };
}

export function createClassDecorators(props: {
  className: string;
  helperModule: string;
  decorators: Array<ASTNode>;
}): ASTNode {
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      left: {
        type: 'Identifier',
        name: props.className,
      },
      operator: '=',
      right: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: props.helperModule,
          },
          computed: false,
          property: {
            type: 'Identifier',
            name: 'd',
          },
        },
        arguments: [
          {
            type: 'ArrayExpression',
            elements: props.decorators,
            optional: false,
          },
          {
            type: 'Identifier',
            name: props.className,
          },
        ],
      },
    },
  };
}
export function createMethodDecorator(props: {
  helperModule: string;
  className: ASTNode;
  isStatic?: boolean;
  methodName: string;
  decorators: Array<ASTNode>;
}): ASTNode {
  let id: ASTNode;
  if (props.isStatic) {
    id = {
      type: 'Identifier',
      name: props.className,
    };
  } else {
    id = {
      type: 'MemberExpression',
      object: {
        type: 'Identifier',
        name: props.className,
      },
      computed: false,
      property: {
        type: 'Identifier',
        name: 'prototype',
      },
    };
  }
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: props.helperModule,
        },
        computed: false,
        property: {
          type: 'Identifier',
          name: 'd',
        },
      },
      arguments: [
        {
          type: 'ArrayExpression',
          elements: props.decorators,
          optional: false,
        },
        id,
        {
          type: 'Literal',
          value: props.methodName,
        },
        {
          type: 'Identifier',
          name: 'null',
        },
      ],
    },
  };
}

export function createMethodArgumentParam(props: {
  index?: number;
  decorator: ASTNode;
  helperModule: string;
}): ASTNode {
  return {
    type: 'CallExpression',
    callee: {
      type: 'MemberExpression',
      object: {
        type: 'Identifier',
        name: props.helperModule,
      },
      computed: false,
      property: {
        type: 'Identifier',
        name: 'p',
      },
    },
    arguments: [
      {
        type: 'Literal',
        value: props.index,
      },
      props.decorator,
    ],
  };
}

export function createMethodPropertyDecorator(props: {
  index?: number;
  helperModule: string;
  className: ASTNode;
  isStatic: boolean;
  methodName: string;
  elements: Array<ASTNode>;
}): ASTNode {
  let id: ASTNode;
  if (props.isStatic) {
    id = {
      type: 'Identifier',
      name: props.className,
    };
  } else {
    id = {
      type: 'MemberExpression',
      object: {
        type: 'Identifier',
        name: props.className,
      },
      computed: false,
      property: {
        type: 'Identifier',
        name: 'prototype',
      },
    };
  }
  return {
    type: 'ExpressionStatement',
    expression: {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: props.helperModule,
        },
        computed: false,
        property: {
          type: 'Identifier',
          name: 'd',
        },
      },
      arguments: [
        {
          type: 'ArrayExpression',
          elements: props.elements,
          typeAnnotation: [],
          optional: false,
        },
        id,
        {
          type: 'Literal',
          value: props.methodName,
        },
        {
          type: 'Literal',
          value: null,
        },
      ],
    },
  };
}