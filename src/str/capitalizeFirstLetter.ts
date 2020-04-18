export function capitalizeFirstLetter (str: string): string {
  return str.length ? (str[0].toUpperCase() + str.slice(1)) : str
}
