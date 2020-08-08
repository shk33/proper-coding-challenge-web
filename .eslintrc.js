module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "plugin:vue/essential",
        "@vue/standard",
        "@vue/typescript/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        quotes: ["error", "double"],
        indent: ["error", 4],
        semi: ["error", "always"],
        "comma-dangle": ["error", "always-multiline"],
        "space-before-function-paren": ["error", "never"],
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
};
