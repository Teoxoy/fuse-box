import { parseTSScript } from 'buntis';

const AST = parseTSScript(`
import * as React from 'react';
import React from 'react';
import { foo, bar } from './foo';
import styled from '@emotion/styled';
import React, { Fragment } from 'react';
import { test as something, joo } from './superAwesome';
import './foo';
const bar = require('foo');
const baz = 'foo';
import _ = require('foo');
`);



function ImportSpecifiers(parent, specifiers) {
  const importSpecifiers = [];

  for (const specifier of specifiers) {
    if (specifier.type === 'ImportNamespaceSpecifier') {
      // import * as React from 'react'
      importSpecifiers.push({
        local: specifier.local.name,
        name: 'default',
        remove: function (i) {
          parent.specifiers.splice(i, 1);
          console.log('jooo', parent, i);
        }
      });
    } else if (specifier.type === 'ImportDefaultSpecifier') {
      // import styled from '@emotion/styled'
      importSpecifiers.push({
        local: specifier.local.name,
        name: 'default',
        remove: () => {
          parent.specifiers.slice(i, 1);
        }
      });

    } else if (specifier.type === 'ImportSpecifier') {
      // import { something } from 'some-module'
      importSpecifiers.push({
        local: specifier.local.name,
        name: specifier.imported.name,
        remove: () => {
          parent.specifiers.slice(i, 1);
        }
      });
    }
  }

  return importSpecifiers;
}



function ImportDeclaration(visit) {
  const node = visit.node;
  if (node.type === 'ImportDeclaration') {
    const specifiersLength = node.specifiers.length;
    if (specifiersLength === 0) {
      // import './foo';
      return {
        source: node.source.value,
        specifiers: false,
        type: 'SIDE_EFFECT_IMPORT'
      };
    }

    // import xx from 'xx';
    // import { yy, bb as cc } from 'yy';
    // import zz as aa from 'zz'
    return {
      removeSpec: function (spec) {
        console.log(this.specifiers);
      },
      source: node.source.value,
      specifiers: ImportSpecifiers(node, node.specifiers),
      type: 'IMPORT'
    }
  } else if (node.type === 'VariableDeclaration') {
    // const bar = require('foo');
    const [declaration] = node.declarations;
    if (
      declaration &&
      declaration.init.type === 'CallExpression' &&
      declaration.init.callee.name === 'require'
    ) {
      return {
        identifier: declaration.id.name, // not needed?
        source: declaration.init.arguments[0].value,
        specifiers: false,
        type: 'SIDE_EFFECT_IMPORT'
      };
    }
  } else if (node.type === 'ImportEqualsDeclaration') {
    // import _ = require('foo');
    return {
      identifier: node.id.name, // not needed?
      source: node.moduleReference.expression.value,
      specifiers: false,
      type: 'SIDE_EFFECT_IMPORT'
    };
  }
  return false;
}




const Tree = [];
for (const node of AST.body) {
  // console.log(node);
  const ImportReference = ImportDeclaration({ node, parent: AST.body });
  if (ImportReference) Tree.push(ImportReference);
}

for (const item of Tree) {
  item.removeSpec('React');
  break;
}
