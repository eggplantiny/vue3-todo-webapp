import { BoxSizeTarget, BoxSizeUnit } from '@/types/base'

export function generateBoxSize (size: number, boxSizeUnit: BoxSizeUnit, boxSizeTarget: BoxSizeTarget) {
  return `${boxSizeTarget}: ${size}${boxSizeUnit};`
}
