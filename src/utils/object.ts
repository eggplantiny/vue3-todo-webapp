export function objectFromStringKeyArray <T, K extends string = string> (defaultValue: T, keys: K[]) {
  const defaultObject: { [key in K]: T } = Object.create(null)
  return keys.reduce((r, key) => ({ ...r, [key]: defaultValue }), defaultObject)
}
