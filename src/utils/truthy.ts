export function truthy(value: unknown): value is NonNullable<unknown> {
  return Boolean(value) && value !== '0' && value !== 'false'
}
