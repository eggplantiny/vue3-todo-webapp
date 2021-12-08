import { BoxSizeTarget, BoxSizeUnit } from '@/types/css'

export function generateBoxSize (size: number, boxSizeUnit: BoxSizeUnit, boxSizeTarget: BoxSizeTarget) {
  return `${boxSizeTarget}: ${size}${boxSizeUnit};`
}
