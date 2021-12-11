import { reactive, toRefs, VueElement } from 'vue'
import { objectFromStringKeyArray } from '@/utils/object'

export function useTemplateRefsWrap <ElementType extends HTMLElement | SVGElement | null> () {
  return function setTemplateNames <RefNames extends string = string > (refNames: RefNames[]) {
    return toRefs(reactive<{ [key in RefNames]: ElementType | undefined }>(objectFromStringKeyArray(refNames)))
  }
}

export const useHtmlTemplateRefs = useTemplateRefsWrap<HTMLElement>()
export const useSvgElementTemplateRefs = useTemplateRefsWrap<SVGElement>()
export const useVueElementTemplateRefs = useTemplateRefsWrap<VueElement>()
export const useHasHelloWorldTemplateRefs = useTemplateRefsWrap<HTMLElement & { helloWorld: () => void }>()
