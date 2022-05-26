/* https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md */
module.exports = {
  customSyntax: 'postcss-html',
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
  overrides: [
    {
      files: ['**/*.vue'],
      extends: ['stylelint-config-html'],
    },
  ],
  rules: {
    'color-no-invalid-hex': true, // 禁止无效的十六进制颜色。

    'font-family-no-duplicate-names': true, // 不允许重复的字体系列名称。
    // "font-family-no-missing-generic-family-keyword": true, // 不允许在字体名称列表中缺少通用。

    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,

    'string-no-newline': true,

    'unit-no-unknown': true, // 禁止未知单位。

    'property-no-unknown': true, // 禁止未知属性

    'keyframe-declaration-no-important': true,

    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates-with-different-values'],
      },
    ],
    'declaration-block-no-shorthand-property-overrides': true,

    // "block-no-empty": true, // 禁止空的选择器
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page'],
      },
    ],

    'media-feature-name-no-unknown': true,

    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          // 允许 scss
          'include',
          'mixin',
        ],
      },
    ],

    'comment-no-empty': true,

    // "no-descending-specificity": true,
    'no-duplicate-at-import-rules': true, // 禁止@import样式表中的重复规则
    'no-duplicate-selectors': true, // 不允许重复的选择器
    'no-empty-source': true, // 禁止空的 <style>
    'no-extra-semicolons': true, // 不允许多余的分号。
    // "no-invalid-double-slash-comments": true, //...CSS不支持的双斜线注释（）。

    // 空格规则
    'at-rule-name-space-after': 'always-single-line',
    'at-rule-semicolon-space-before': 'never',

    // 来自 stylelint-config-standard
    // https://github.com/stylelint/stylelint-config-standard/blob/master/index.js
    'at-rule-name-case': 'lower',
    'at-rule-semicolon-newline-after': 'always',
    'block-closing-brace-empty-line-before': 'never',
    'block-closing-brace-newline-after': 'always',
    'block-closing-brace-newline-before': 'always-multi-line',
    'block-closing-brace-space-before': 'always-single-line',
    'block-opening-brace-newline-after': 'always-multi-line',
    'block-opening-brace-space-after': 'always-single-line',
    'block-opening-brace-space-before': 'always',
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['stylelint-commands'],
      },
    ],
    'comment-whitespace-inside': 'always',
    'custom-property-empty-line-before': [
      'always',
      {
        except: ['after-custom-property', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block'],
      },
    ],
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-block-semicolon-newline-after': 'always-multi-line',
    'declaration-block-semicolon-space-after': 'always-single-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 1,

    // 交给 prittier
    // 'declaration-block-trailing-semicolon': 'always',
    // 'declaration-colon-newline-after': 'always-multi-line',

    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'declaration-empty-line-before': [
      'always',
      {
        except: ['after-declaration', 'first-nested'],
        ignore: ['after-comment', 'inside-single-line-block'],
      },
    ],
    'function-comma-newline-after': 'always-multi-line',
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',
    'function-max-empty-lines': 0,
    'function-name-case': 'lower',
    'function-parentheses-newline-inside': 'always-multi-line',
    'function-parentheses-space-inside': 'never-single-line',
    'function-whitespace-after': 'always',
    indentation: 2,
    'length-zero-no-unit': true,
    'max-empty-lines': 1,
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-case': 'lower',
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',
    'media-query-list-comma-newline-after': 'always-multi-line',
    'media-query-list-comma-space-after': 'always-single-line',
    'media-query-list-comma-space-before': 'never',
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': true,
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,
    'property-case': 'lower',
    'selector-attribute-brackets-space-inside': 'never',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-descendant-combinator-no-non-space': true,
    'selector-list-comma-newline-after': 'always',
    'selector-list-comma-space-before': 'never',
    'selector-max-empty-lines': 0,
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-element-case': 'lower',
    'selector-pseudo-element-colon-notation': 'double',
    'selector-type-case': 'lower',
    'unit-case': 'lower',
    'value-keyword-case': 'lower',
    'value-list-comma-newline-after': 'always-multi-line',
    'value-list-comma-space-after': 'always-single-line',
    'value-list-comma-space-before': 'never',
    'value-list-max-empty-lines': 0,
  },
}
