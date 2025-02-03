import 'handlebars';
import type {
    HelperDelegate as HelperDelegateFixed,
    TemplateDelegate as TemplateDelegateFixed,
    Template as TemplateFixed,
} from './types';

/**
 * A custom version of the Handlebars module with an extra `compileAST` function and fixed typings.
 */
declare module 'handlebars' {
    /**
     * Compiles the given Handlebars template without the use of `eval`.
     *
     * @returns A render function with the same API as the return value from the regular Handlebars `compile` function.
     */
    export function compileAST(input: string | hbs.AST.Program, options?: CompileOptions): TemplateDelegateFixed;

    // --------------------------------------------------------
    // Override/Extend inherited funcions and interfaces below that are incorrect.
    //
    // Any exported `const` or `type` types can't be overwritten, so we'll just
    // have to live with those and cast them to the correct types in our code.
    // Some of these fixed types, we'll instead export outside the scope of this
    // 'handlebars' module so consumers of @elastic/handlebars at least have a way to
    // access the correct types.
    // --------------------------------------------------------

    /**
     * A {@link https://handlebarsjs.com/api-reference/helpers.html helper-function} type.
     *
     * When registering a helper function, it should be of this type.
     */
    export interface HelperDelegate extends HelperDelegateFixed {} // eslint-disable-line @typescript-eslint/no-empty-interface

    /**
     * A template-function type.
     *
     * This type is primarily used for the return value of by calls to
     * {@link https://handlebarsjs.com/api-reference/compilation.html#handlebars-compile-template-options Handlebars.compile},
     * Handlebars.compileAST and {@link https://handlebarsjs.com/api-reference/compilation.html#handlebars-precompile-template-options Handlebars.template}.
     */
    export interface TemplateDelegate<T = any> extends TemplateDelegateFixed<T> {} // eslint-disable-line @typescript-eslint/no-empty-interface

    /**
     * Register one or more {@link https://handlebarsjs.com/api-reference/runtime.html#handlebars-registerpartial-name-partial partials}.
     *
     * @param spec A key/value object where each key is the name of a partial (a string) and each value is the partial (either a string or a partial function).
     */
    export function registerPartial(spec: Record<string, TemplateFixed>): void; // Ensure `spec` object values can be strings
}
