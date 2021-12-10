import { reactive, ToRefs, toRefs } from 'vue'
import { objectFromStringKeyArray } from '@/utils/object'

export function useTemplateRefs <ElementType, RefNames extends string = string> (refNames: RefNames[]) {
  return toRefs(reactive<{ [key in RefNames]: ElementType | undefined }>(objectFromStringKeyArray(undefined, refNames)))
}

export function useTemplateRefsWrap <ElementType> () {
  return function useTemplateRefs <RefNames extends string = string> (refNames: RefNames[]) {
    return toRefs(reactive<{ [key in RefNames]: ElementType | undefined }>(objectFromStringKeyArray(undefined, refNames)))
  }
}

export function useTemplateRefs2 <T> () {
  return function maker <RefNames extends string = string> (refNames: RefNames[]) {
    return toRefs(reactive<{ [key in RefNames]?: T }>(objectFromStringKeyArray(undefined, refNames)))
  }
}

function hello () {
  const qwe = useTemplateRefs2<HTMLElement>()(['hello', 'world'])
  const zxc = useTemplateRefsWrap<HTMLElement>()(['hello', 'world'])
  const asd = useTemplateRefs<HTMLElement>(['hello', 'world'])
}
