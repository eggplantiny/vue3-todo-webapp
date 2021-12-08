import { useLoading } from '@/store/useLoading'

interface Options {
  useAlert: boolean
}

const defaultOptions: Options = {
  useAlert: true
}

export default async function useAsync <T> (
  asyncFunction: () => Promise<T>,
  options: Partial<Options> = {}
): Promise<T> {
  const { useAlert } = { ...defaultOptions, ...options }
  const { setLoading } = useLoading()

  try {
    setLoading(true)
    return await asyncFunction()
  } catch (e) {
    let message: string = ''
    if (typeof e === 'string') {
      message = e
    } else if (e instanceof Error) {
      message = e.message
    }

    if (useAlert) {
      window.alert(message)
    }
    throw e
  } finally {
    setLoading(false)
  }
}
