const modules = import.meta.globEager('./api/**/*.ts');
const result = {};
Object.keys(modules).map((key) => {Object.assign(result, modules[key].default)});
export default result;
