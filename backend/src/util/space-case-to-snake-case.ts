export const spaceCaseToSnakeCase = (str: string) => {
  return str.toUpperCase().split(' ').join('_');
};
